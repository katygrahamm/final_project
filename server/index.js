const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const User = require('./models/user')
const Plant = require('./models/plant')
const Space = require('./models/space')
const Event = require('./models/event')
const cookieSession = require('cookie-session')



// DB Setup
mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true });

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(
    cors({
      origin: '*', // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['benny']
  })
)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('http://localhost:3000');
  res.end()
});

app.get('/current_user', (req, res) => {
  const id = req.user
  User
  .findById(id).exec((error, user) => {
    if (error){
      res.writeHead(404);	
      return res.end("No user is signed in.");
    } else{
      return res.send(user)
    }
  })
});

app.post('/:userId/createspace',  (req, res) => {

  let userId = req.params.userId
  let roomSize = 0

    if (req.body.room_size === "Small"){
       roomSize = 2 
    } else if (req.body.room_size === "Medium") {
       roomSize = 4
    } else if (req.body.room_size === "Large") {
       roomSize = 12
    }

      Plant.find({ 
            max_height: {$lt : req.body.room_height},
            max_width: { $lte: roomSize},
            water: req.body.water,
            light: req.body.light, 
            $or:[ {kid_friendly: req.body.kid_friendly}, {pet_friendly: req.body.pet_friendly} ],
            difficulty: req.body.difficulty
            }).exec((error, plants) => {
                if (error){
                  res.writeHead(404);	
                  res.end("error");
                } else {
                  let newSpace = new Space()
                    newSpace.name = req.body.name
                    newSpace.room_size = req.body.room_size
                    newSpace.room_height = req.body.room_height
                    newSpace.water = req.body.water
                    newSpace.light = req.body.light
                    newSpace.kid_friendly = req.body.kid_friendly
                    newSpace.pet_friendly = req.body.pet_friendly
                    newSpace.plant_collection = []
                    let recommendedPlants = []

                    plants.forEach((plant) => {
                       recommendedPlants.push(plant)
                    })
                    newSpace.recommended_plants = recommendedPlants

                    newSpace.save(function (err, space) {
                    if (err) {
                      res.send(err);
                    } else {
                      User.find({clientId: userId}).exec((err, user) => {
                        if (err) {
                          res.send(err)
                        } else {
                          user[0].spaces.push(space)
                          user[0].save()
                          res.send('success')
                 }     
              }) 
            }
          })
        }
     })
  })
  

app.get('/plantlibrary', (req, res) => {
    Plant.find({}).exec((err, plants) => {
      if (err) {
        res.send(err)
      } else {
        res.send({plants})
      }
   })
})


app.post('/:userId/addplanttospace', (req, res) => {

  const plantId = req.body.plantId
  const userId = req.params.userId
  const spaceId = req.body.spaceId

  Plant.findById(plantId).exec((err, plant) => {
    if (err) {
      res.send(err)
    } else {
      Space.findById(spaceId).exec((err, space) => {
        if (err) {
          res.send(err)
        } else {
            space.plant_collection.push(plant)
            space.save()
            User.find({ clientId: userId}).exec((err, user) => {
                if (err) {
                  res.send(err)
                } else {
                  user[0].save()
                  res.send('success')
                }
              })
             }
           })
         }
      })
  })

app.post('/:userId/:plantId/createevent', (req, res) => {
  const userId = req.params.userId 
  const plantId = req.params.plantId
  const spaceId = req.body.spaceId

  let todaysDate = new Date()


  User.find({ clientId: userId }).exec((err, user) => {
    if (err) {
      res.send(err)
    } else {
      Space.findById(spaceId).exec((err, space) => {
        if (err) {
          res.send(err)
        } else {
      Plant.findById(plantId).exec((err, plant) => {
        if (err) {
          res.send(err)
        } else {
          if(plant.water === "Minimal") {
            let newEvent = new Event()
              newEvent.title = `Water the ${plant.common_name} in ${space.name}`
              newEvent.priorityId = 2
              newEvent.startDate = new Date();
              newEvent.endDate = todaysDate.setTime(todaysDate.getTime() + (5*60*1000))
              newEvent.recurrenceRule = 'FREQ=WEEKLY;BYDAY=TU;UNTIL=20230101'
              newEvent.save()
              user[0].events.push(newEvent)
              user[0].save()
              res.send('successfully created')
          } else {
            let newEvent = new Event()
              newEvent.title = `Water the ${plant.common_name} in ${space.name}`
              newEvent.priorityId = 1
              newEvent.startDate = todaysDate.setDate(todaysDate.getDate() + 3);
              newEvent.endDate = todaysDate.setTime(todaysDate.getTime() + (5*60*1000))
              newEvent.recurrenceRule = 'FREQ=WEEKLY;BYDAY=TU,FR;UNTIL=20230101'
              newEvent.save()
              user[0].events.push(newEvent)
              user[0].save()
              res.send('successfully created')
            }
          }
        })
      }
    })
    }
  })
})

app.get('/:userId/events', (req, res) => {
    const userId = req.params.userId

    User.find({clientId: userId}).populate({path:'events'}).exec((err, user) => {
      if (err) {
        res.send(err)
      } else {
        res.send(user[0].events)
      }
   })
})

app.get('/:userId/userspaces', (req, res) => {
    const userId = req.params.userId

    User.find({clientId: userId}).populate({path:'spaces', populate: [{path: 'recommended_plants'}, {path: 'plant_collection'}]}).exec((err, user) => {
      if (err) {
        res.send(err)
      } else {
        res.send(user[0].spaces)
      }
  })
}) 

app.get('/:plantId/plantdetail', (req, res) => {
  const plantId = req.params.plantId

  Plant.findById(plantId).exec((err, plant) => {
    if (err) {
      res.send(err)
    } else {
      res.send(plant)
    }
 })
})

app.post('/adduser', (req, res) => {
  
  let newUser = new User()

    newUser.clientId = req.body.userId
    newUser.plant_collection = []
    newUser.wish_list = []
    newUser.spaces =[]

    newUser.save(function (err, user) {
      if (err) {
        res.send(err);
      } else {
        res.send({user})
    }
  })
})

app.post('/addwishlist', (req, res) => {

  let userid = req.body.userid
  let plantid = req.body.plantid
  
    User.find({clientId: userid}).exec((err, user) => {
      if (err) {
        res.send(err);
      } else {
        Plant.findById(plantid).exec((err, plant) => {
         if(err) {
           res.send(err);
         } else {
           user[0].wish_list.push(plant)
           user[0].save()
           res.send('success')
         }
        })
      }
    })
  })

  app.get('/:userId/wishlist', (req, res) => {

    const userId = req.params.userId

    User.find({clientId: userId}).populate({path:'wish_list'}).exec((err, user) => {
      if (err) {
        res.send(err)
      } else {
        res.send(user[0].wish_list)
      }
  })
}) 


// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);