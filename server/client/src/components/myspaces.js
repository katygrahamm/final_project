import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions';
import { Button } from 'react-bootstrap';
import {Grid} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Col';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx';


class MySpaces extends Component {  

componentDidMount() {
  let userid = localStorage.getItem('userid')
  this.props.fetchSpaces(userid)
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

 handleRemove () {

 }

 render () {
   console.log(this.props)
   if (this.props.spaces === []) {
    return (
      <div>Loading ... </div>
    )
  } else {
    return (
      <div>
        
      {
      this.props.spaces.map(space => (
        <div>
          <Paper className="paper-myspaces">
            <div className="recommendations row">
            <h2 className="space-name">{space.name}</h2>
            <Link to='/myplants' className="view-btn-link"><Button className="view-collection-btn" variant="outline-secondary">View Collection</Button></Link>
            </div>
            <hr />
            
            <div>
            <h4 className="title-space">Plant Recommendations </h4>
            </div>
            <div className="row"> 
              {
              space.recommended_plants.map(plant => (
                <div className="col-md-3">
                <Card style={{ width: '15rem' }} className="text-center" float="left">
                <Link to={`/${plant._id}/plantdetail`}><Card.Img alt="plant-image-space" className="plant-image-space" src={plant.image_url} onClick={event => this.handleImgClick(plant._id)}/></Link>
                <Card.Title className="common-name">{plant.common_name}</Card.Title>
                <Card.Text>{plant.botanical_name}</Card.Text>
                <Card.Body>
                <Button className="remove-plant" variant="outline-secondary" onClick={event => this.handleOnClick(plant._id, space._id)}>Add To Collection</Button>
                </Card.Body>
                </Card>
                </div>
                  ))
                }
                </div>



                </Paper>
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
    spaces: state.spaces
  })
}

export default connect(
  mapStateToProps,
  actions
)(MySpaces);

