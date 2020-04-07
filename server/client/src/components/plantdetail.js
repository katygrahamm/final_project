import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import EcoIcon from '@material-ui/icons/Eco';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import PetsIcon from '@material-ui/icons/Pets';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';




class PlantDetail extends Component {  
    constructor(props) {
     super(props)

    }

componentDidMount() {
    let plantId = sessionStorage.getItem('plant')
    this.props.fetchPlantDetail(plantId)
 }

 handleChange() {
   console.log('hi')
 }

 render() {
    console.log(this.props.plant)
    if (this.props.plant.length == 0) {
     return (
       <div>Loading ... </div>
     )
   } else {
    return(
      <div>
        <div className="plant-library-container">
           <h2 className="common-name-detail">{this.props.plant.common_name}</h2>
           <p className="botanical-name-detail">{this.props.plant.botanical_name}</p>
           <hr />
           <br></br>
          <div className="row">
            <img height="450px" src="" width="auto" alt="plant-image-detail" src={this.props.plant.image_url}></img>
            <div className="col-md-6">
              <h5 className="plant-detail-title">ABOUT</h5>
              <p className="plant-detail-info">{this.props.plant.about}</p>
              <br></br>
              <h5 className="plant-detail-title">CARE</h5>
              <p className="plant-detail-info">{this.props.plant.care}</p>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="icon-detail-row">
           <InvertColorsIcon style={{ fontSize: 60,  color: '#696969', padding: 6 }}  /><h6 className="icon-detail">{this.props.plant.water} Water</h6>
           <SwapVertIcon style={{ fontSize: 60,  color: '#696969', padding: 6 }} /><h6 className="icon-detail">{this.props.plant.max_height} Feet Tall</h6>
           <SwapHorizIcon style={{ fontSize: 60,  color: '#696969', padding: 6 }} /><h6 className="icon-detail">{this.props.plant.max_width} Feet Wide</h6>
           <EcoIcon style={{ fontSize: 60,  color: '#696969', padding: 6 }} /><h6 className="icon-detail">Difficulty-Level {this.props.plant.difficulty}</h6>
          </div>
          <br></br>
          <div className="icon-detail-row">
          <WbSunnyIcon style={{ fontSize: 60,  color: '#696969', padding: 6 }} /><h6 className="icon-detail">{this.props.plant.light} Light</h6>
          <ChildFriendlyIcon style={{ fontSize: 60,  color: '#696969', padding: 6 }} /><h6 className="icon-detail">Kid-Friendly {this.props.plant.kid_friendly}</h6>
          <PetsIcon style={{ fontSize: 60,  color: '#696969', padding: 6 }} /><h6 className="icon-detail">Pet-Friendly {this.props.plant.pet_friendly}</h6>
          <LocalFloristIcon style={{ fontSize: 60,  color: '#696969', padding: 6 }} /><h6 className="icon-detail">Growth Habit {this.props.plant.habit}</h6>
          </div>
          <hr />
        </div>
      </div>
    )
   }
  }
}


 function mapStateToProps(state) {
    return ({
      plant: state.plant,
      spaces: state.spaces
    })
  }
  
  export default connect(
    mapStateToProps,
    actions
  )(PlantDetail);