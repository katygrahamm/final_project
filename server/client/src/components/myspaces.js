import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions';
import { Button } from 'react-bootstrap';
import {Grid} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Row from 'react-bootstrap/Col';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import DropdownMenu from "react-bootstrap/DropdownMenu";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Tooltip } from '@material-ui/core';



class MySpaces extends Component {  
  constructor(props) {
    super(props)

  }

componentDidMount() {
  let userid = localStorage.getItem('userid')
  this.props.fetchSpaces(userid)
  this.props.fetchPlants()
 }

 handleOnClick (plantid, spaceId) {
   let userid = localStorage.getItem('userid')
   console.log(plantid, spaceId, userid)
   this.props.addPlantToSpace(userid, plantid, spaceId)
   this.props.createEvent(userid, plantid, spaceId)
  }

  handleImgClick(plantId) {
    sessionStorage.removeItem('plant')
    sessionStorage.setItem('plant', plantId)
  }

  handleAddWishlist(plantid) {
    let userid = localStorage.getItem('userid')
    this.props.addWishlist(plantid, userid)
  }

 handleRemove () {

 }

 render () {
   if(this.props.plants.length == 0) {
     return(
      <div>Loading ... </div>
     )
   } else if (this.props.spaces.length == 0) {
    return (
      <div>
          <div className="row">
            <h3 className="no-space-title">You currently don't have any spaces</h3>
          </div>

          <div className="row new-space-2">
          <br></br>
          <h4 className="no-space">Add New Space</h4>
          
          <Tooltip title="Add a Space" className="icon-add">
           <IconButton aria-label="add-space">
             <Link to="/create" className="link"><AddCircleIcon style={{ fontSize: 40 }}/></Link>
           </IconButton>
          </Tooltip>
         
        </div>
      </div>
    )
    } else {
    return (
      <div>
      <div className="row new-space-2">
      <h4 className="no-space">Add New Space</h4>
        <Tooltip title="Add a Space" className="icon-add">
           <IconButton aria-label="add-space">
            <Link to='/create' className="link"><AddCircleIcon style={{ fontSize: 40 }}/></Link>
           </IconButton>
        </Tooltip>
        </div>
      <div>
              
      {
      
      this.props.spaces.map(space => (
        <div>
          <Paper className="paper-myspaces">
            <div className="recommendations row">
            <h2 className="space-name">{space.name}</h2>
            </div>
            <hr />
                      
            <div>
            <h4 className="title-space">Our Recommendations </h4>
            </div>
            <div className="row"> 
              {
              space.recommended_plants.map(plant => (
                <div className="plant-library-container">
                <p className="common-name-library">{plant.common_name}</p>
                <p className="botanical-name-library">{plant.botanical_name}</p>
                <Link to={`/${plant._id}/plantdetail`}><img height="150px" src="" width="auto" alt="plant-image-library" src={plant.image_url} onClick={event => this.handleImgClick(plant._id)}></img></Link>
                <br></br>
                <IconButton aria-label="Favorite" onClick={event => this.handleAddWishlist(plant._id)}>
                  <FavoriteIcon style={{ fontSize: 20 }} />
                </IconButton>
                <DropdownButton id="dropdown-basic-button" variant="outline-secondary" title="Add to Space">
                {this.props.spaces.map((space) => <Dropdown.Item href="/myspaces" onSelect={event => this.handleOnClick(plant._id, space._id)} >{space.name}</Dropdown.Item>)}
                </DropdownButton>
                <hr />
              </div>
                  ))
                }
              </div>

            <div>
            <h4 className="title-space"> {space.name} Plant Collection</h4>
            </div>
            <div className="row">
              {
              space.plant_collection.map(plant => (
                <div className="plant-library-container">
                <p className="common-name-library">{plant.common_name}</p>
                <p className="botanical-name-library">{plant.botanical_name}</p>
                <Link to={`/${plant._id}/plantdetail`}><img height="150px" src="" width="auto" alt="plant-image-library" src={plant.image_url} onClick={event => this.handleImgClick(plant._id)}></img></Link>
                <br></br>
                <hr />
              </div>
    
                  ))
                }


                
         
                </div>
                </Paper>
                </div>
              )) 
            }
         
          </div>
         </div>
        )
      }
    }
  }

function mapStateToProps(state) {
  return ({
    spaces: state.spaces,
    plants: state.plants
  })
}

export default connect(
  mapStateToProps,
  actions
)(MySpaces);

