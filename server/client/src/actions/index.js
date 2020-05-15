import axios from "axios";
import { FETCH_RECOMMENDATIONS, FETCH_WISHLIST, FETCH_PLANTS, ADD_COLLECTION, FETCH_PLANTDETAIL, ADD_USER, FETCH_DASHBOARD, ADD_SPACE, FETCH_SPACES, ADD_PLANTTOSPACE, ADD_EVENT, FETCH_EVENTS, REMOVE_PLANT, ADD_WISHLIST } from './types';


export const createSpace = (userId, name, water, light, kid_friendly, pet_friendly, difficulty, room_size, room_height) => dispatch => {
  
  const body = {"name":name, "water": water, "light": light, "kid_friendly": kid_friendly, "pet_friendly": pet_friendly, "difficulty": difficulty, "room_size": room_size, "room_height": room_height}
  
  console.log(body)

  axios.post(`/api/${userId}/createSpace`, body).then(function (response) {
    console.log(response)
    dispatch({ type: ADD_SPACE , payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchPlants = () => dispatch => {
  axios.get(`/api/plantlibrary`
  ).then(function (response) {
    console.log('response from fetchplants', response)
    dispatch({ type: FETCH_PLANTS, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

//add plant to space plant_collection array
export const addPlantToSpace = (userId, plantId, spaceId) => dispatch => {

  const body = { 'plantId': plantId, 'spaceId': spaceId }
  console.log(body)

  axios.post(`/api/${userId}/addplanttospace`, body
  ).then(function (response) {
    console.log('response from appPlantToSpace', response)
    dispatch({ type: ADD_PLANTTOSPACE, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchPlantDetail = (plant) => dispatch => {

  axios.get(`/api/${plant}/plantdetail`

  ).then(function (response) {
    console.log('response from fetchplants', response)
    dispatch({ type: FETCH_PLANTDETAIL , payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const addUser = (userId) => dispatch => {

  const body = {"userId": userId}

  axios.post(`/api/adduser`, body

  ).then(function (response) {
    console.log('response from addUser', response)
    dispatch({ type: ADD_USER , payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const addCollection = (plant, userId) => dispatch => {

  const body = {'plant': plant, 'userId': userId }
  console.log(body)

  axios.post(`/api/createspace`, body
  ).then(function (response) {
    console.log('response from addCollection', response)
    dispatch({ type: ADD_COLLECTION, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};


export const fetchSpaces = (userId) => dispatch => {

  axios.get(`/api/${userId}/userspaces`
  ).then(function (response) {
    console.log('response from fetchspaces', response)
    dispatch({ type: FETCH_SPACES , payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const createEvent = (userId, plantId, spaceId) => dispatch => {

  const body = {'spaceId': spaceId }

  console.log(body)

  axios.post(`/api/${userId}/${plantId}/createevent`, body
  ).then(function (response) {
    console.log('response from createEvent', response)
    dispatch({ type: ADD_EVENT, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchEvents = (userId) => dispatch => {

  axios.get(`/api/${userId}/events`
  ).then(function (response) {
    console.log('response from fetchEvents', response)
    dispatch({ type: FETCH_EVENTS , payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const addWishlist = (plantid, userid) => dispatch => {

  const body = {'plantid': plantid, 'userid': userid }
  console.log(body)

  axios.post(`/api/addwishlist`, body
  ).then(function (response) {
    console.log('response from addCollection', response)
    dispatch({ type: ADD_WISHLIST, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchWishlist = (userId) => dispatch => {

  axios.get(`/api/${userId}/wishlist`
  ).then(function (response) {
    console.log('response from fetchEvents', response)
    dispatch({ type: FETCH_WISHLIST , payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};