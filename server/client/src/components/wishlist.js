import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions';
import { Button } from 'react-bootstrap';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import DropdownMenu from "react-bootstrap/DropdownMenu";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';


class Wishlist extends Component {  

componentDidMount() {
  let userid = localStorage.getItem('userid')
  this.props.fetchWishlist(userid)
  this.props.fetchSpaces(userid)
 }

 handleOnClick (plantid, spaceId) {
    let userid = localStorage.getItem('userid')
    this.props.addPlantToSpace(userid, plantid, spaceId)
    this.props.createEvent(userid, plantid, spaceId)
   }

handleImgClick(plantId) {
  sessionStorage.removeItem('plant')
  sessionStorage.setItem('plant', plantId)
}

 render () {
   console.log(this.props.wishlist)
   if (this.props.wishlist == undefined) {
    return (
      <div>Loading ... </div>
    )
  } else {
    return (
        <div>
        <div className="row">
          <h2 className="space-name">Wish List</h2>
        </div>
        <hr />
      {
      this.props.wishlist.map(plant => ( 
        <div className="plant-library-container">
          <p className="common-name-library">{plant.common_name}</p>

          <p className="botanical-name-library">{plant.botanical_name}</p>
          <Link to={`/${plant._id}/plantdetail`}><img height="150px" src="" width="auto" alt="plant-image-wishlist" src={plant.image_url} onClick={event => this.handleImgClick(plant._id)}></img></Link>
          <br></br>
          <br></br>
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
    spaces: state.spaces,
    wishlist: state.wishlist
  })
}

export default connect(
  mapStateToProps,
  actions
)(Wishlist);
