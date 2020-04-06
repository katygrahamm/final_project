  
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions';
import { Button } from 'react-bootstrap';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import DropdownMenu from "react-bootstrap/DropdownMenu";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';


class PlantLibrary extends Component {  

componentDidMount() {
  let userid = localStorage.getItem('userid')
  this.props.fetchSpaces(userid)
  this.props.fetchPlants()
 }

 handleOnClick (plantid, spaceId) {
  let userid = localStorage.getItem('userid')
  this.props.addPlantToSpace(userid, plantid, spaceId)
  this.props.createEvent(userid, plantid, spaceId)
 }

 handleAddWishlist(plantid) {
   let userid = localStorage.getItem('userid')
   this.props.addWishlist(plantid, userid)
 }

handleImgClick(plantId) {
  sessionStorage.removeItem('plant')
  sessionStorage.setItem('plant', plantId)
}

 render () {
   console.log(this.props)
   if (this.props.plants.plants == undefined) {
    return (
      <div>Loading ... </div>
    )
  } else {
    return (
      <div>
        <div className="row">
          <h2 className="space-name">Plant Library</h2>
        </div>
        <hr />
      {
      this.props.plants.plants.map(plant => ( 
        <div className="plant-library-container">

          <p className="common-name-library">{plant.common_name}</p>

          <p className="botanical-name-library">{plant.botanical_name}</p>
          <Link to={`/${plant._id}/plantdetail`}><img height="150px" src="" width="auto" alt="plant-image-library" src={plant.image_url} onClick={event => this.handleImgClick(plant._id)}></img></Link>
          <br></br>
          <IconButton aria-label="Favorite" onClick={event => this.handleAddWishlist(plant._id)}>
            <FavoriteIcon style={{ fontSize: 20 }} />
          </IconButton>
          <DropdownButton id="dropdown-basic-button" variant="outline-secondary" title="Add to Space">
          {this.props.spaces.map((space) => <Dropdown.Item href="/myplants" onSelect={event => this.handleOnClick(plant._id, space._id)} >{space.name}</Dropdown.Item>)}
          </DropdownButton>
          <hr />
        </div>
          ))    
        } 
        </div>
        )
      }
    }
  }

function mapStateToProps(state) {
  return ({
    plants: state.plants,
    spaces: state.spaces
  })
}

export default connect(
  mapStateToProps,
  actions
)(PlantLibrary);
