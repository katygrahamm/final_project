import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import { IconButton } from '@material-ui/core';
import { Grid, Tooltip } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InvertColorsOffIcon from '@material-ui/icons/InvertColorsOff';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import PetsIcon from '@material-ui/icons/Pets';
import Crop75Icon from '@material-ui/icons/Crop75';
import Crop54Icon from '@material-ui/icons/Crop54';
import Crop32Icon from '@material-ui/icons/Crop32';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { Button } from 'react-bootstrap';
import {Alert, AlertTitle} from '@material-ui/lab';


class Recommendations extends Component {  
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      water: '',
      light: '', 
      kid_friendly: 'No',
      pet_friendly: 'No',
      difficulty: '', 
      room_size: '',
      room_height: '',
      clickedWater1: '',
      clickedWater2: '',
      clickedLight1: '',
      clickedLight2: '',
      clickedLight3: '',
      clickedChild: '',
      clickedPet: '',
      clickedRoom1: '',
      clickedRoom2: '',
      clickedRoom3: '',
      clickedSpace1: '',
      clickedSpace2: '',
      clickedSpace3: '',
      clickedHeight1: '',
      clickedHeight2: '',
      clickedHeight3: '',
      clickedDifficulty1: '',
      clickedDifficulty2: '',
      clickedDifficulty3: '',
    }
  }

  handleSubmit() {
    let userId = localStorage.getItem('userid')
    console.log(this.state)
    this.props.createSpace(userId, this.state.name, this.state.water, this.state.light, this.state.pet_friendly, this.state.kid_friendly, this.state.difficulty,
        this.state.room_size, this.state.room_height)
  }

  handlePet() {
    if (this.state.clickedPet == 'clickedPet') {
    this.setState({clickedPet: ''})
  } else if (this.state.clickedPet == '') {
    this.setState({clickedPet: 'clickedPet'})
    this.setState({ kid_friendly: "Yes", pet_friendly: "Yes" })
  }
}

handleChild() {
  if (this.state.clickedChild == 'clickedChild') {
  this.setState({ clickedChild: '' })
  } else if (this.state.clickedChild == '') {
  this.setState({ clickedChild: 'clickedChild'})
  this.setState({ kid_friendly: "Yes", pet_friendly: "Yes" })
  }
}

  handleAdd(plant){
    console.log(plant)
  }

render() {
  return ( 
    <div>
    <div>
    <div className="plant-form row">
      <h2 className="create-space-title"> Create a Space </h2>
    </div>
    </div>
    <hr />
    <Grid
    container
    justify="center"
    >
      <div>
        <div className="row">
        <p className="recomm-label-water">Water</p>
        <Tooltip title="Low-Water">
          <IconButton aria-label="low-water">
            <InvertColorsOffIcon style={{ fontSize: 60 }} className={this.state.clickedWater1} onClick={event=> {this.setState({ water: "Minimal" }); this.setState({ clickedWater1: 'clickedWater1'}); this.setState({ clickedWater2: ''})}}/>
          </IconButton>                                                                   
        </Tooltip>
        <Tooltip title="Regular-Water">
          <IconButton aria-label="low-water">
            <InvertColorsIcon style={{ fontSize: 60 }}  className={this.state.clickedWater2} onClick={event=> {this.setState({ water: "Regular" }); this.setState({ clickedWater2: 'clickedWater2'}); this.setState({ clickedWater1: ''})}}/>
          </IconButton>
        </Tooltip>
        </div>
      <div className="row">
       <p className="recomm-label-light">Light</p>
        <Tooltip title="Low-Light">
          <IconButton aria-label="low-light">
            <BrightnessLowIcon style={{ fontSize: 60 }} className={this.state.clickedLight1} onClick={event=> {this.setState({ light: "Low" }); this.setState({ clickedLight1: 'clickedLight1'}); this.setState({clickedLight2: ''}); this.setState({clickedLight3: '' })}}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Medium-Light">
          <IconButton aria-label="med-light">
            <BrightnessMediumIcon style={{ fontSize: 60 }} className={this.state.clickedLight2} onClick={event=> {this.setState({ light: "Medium" }); this.setState({ clickedLight2: 'clickedLight2'}); this.setState({clickedLight1: ''}); this.setState({clickedLight3: '' })}}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Bright-Light">
          <IconButton aria-label="bright-light">
            <Brightness7Icon style={{ fontSize: 60 }} className={this.state.clickedLight3} onClick={event=> {this.setState({ light: "Bright" }); this.setState({ clickedLight3: 'clickedLight3'}); this.setState({clickedLight1: ''}); this.setState({clickedLight2: '' })}}/>
          </IconButton>
        </Tooltip>
      </div>
      <div className="row">
      <p className="recomm-label-kid">Kid-Friendly</p>
        <Tooltip title="Kid-Friendly">
          <IconButton aria-label="kid-friendly">
            <ChildFriendlyIcon style={{ fontSize: 60 }} className={this.state.clickedChild} onClick={event=> {this.setState({ kid_friendly: "Yes", pet_friendly: "Yes" }); this.handleChild()}}/>
          </IconButton>
        </Tooltip>
        </div>
        <div className="row">
        <p className="recomm-label-pet">Pet-Friendly</p>
        <Tooltip title="Pet-Friendly">
          <IconButton aria-label="Pet-friendly">
            <PetsIcon style={{ fontSize: 60 }} className={this.state.clickedPet} onClick={event=> {this.setState({ kid_friendly: "Yes", pet_friendly: "Yes" }); this.handlePet()}}/>
          </IconButton>
        </Tooltip>
      </div>
      <div className="row">
      <p className="recomm-label-size">Space-Size </p>
        <Tooltip title="Small-Room">
          <IconButton aria-label="Small-Room">
            <Crop75Icon style={{ fontSize: 60 }} className={this.state.clickedRoom1} onClick={event=> {this.setState({ room_size: "Small" }); this.setState({ clickedRoom1: 'clickedRoom1'}); this.setState({clickedRoom2: ''}); this.setState({clickedRoom3: ''})}}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Medium-Room">
          <IconButton aria-label="Medium-Room">
            <Crop54Icon style={{ fontSize: 60 }} className={this.state.clickedRoom2} onClick={event=> {this.setState({ room_size: "Medium" }); this.setState({ clickedRoom2: 'clickedRoom2'}); this.setState({clickedRoom1: ''}); this.setState({clickedRoom3: ''})}}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Large-Room">
          <IconButton aria-label="Large-Room">
            <Crop32Icon style={{ fontSize: 60 }} className={this.state.clickedRoom3} onClick={event=> {this.setState({ room_size: "Large" }); this.setState({ clickedRoom3: 'clickedRoom3'}); this.setState({clickedRoom1: ''}); this.setState({clickedRoom2: ''})}}/>
          </IconButton>
        </Tooltip>
      </div>
      <div className="row">
      <p className="recomm-label">Space-Height</p>
      <Tooltip title="Low-Ceiling">
        <IconButton aria-label="Difficulty-Expert">
          <HomeIcon style={{ fontSize: 60 }} className={this.state.clickedHeight1} onClick={event=> {this.setState({ room_height: 8 }); this.setState({ clickedHeight1: 'clickedHeight1'}); this.setState({clickedHeight2: ''}); this.setState({clickedHeight3: ''})}}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Average-Ceiling">
        <IconButton aria-label="Difficulty-Expert">
          <HomeWorkIcon style={{ fontSize: 60 }} className={this.state.clickedHeight2} onClick={event=> {this.setState({ room_height: 10 }); this.setState({ clickedHeight2: 'clickedHeight2'}); this.setState({clickedHeight1: ''}); this.setState({clickedHeight3: ''})}}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="High-Ceiling">
        <IconButton aria-label="Difficulty-Expert">
          <LocationCityIcon style={{ fontSize: 60 }} className={this.state.clickedHeight3} onClick={event=> {this.setState({ room_height: 20 }); this.setState({ clickedHeight3: 'clickedHeight3'}); this.setState({clickedHeight1: ''}); this.setState({clickedHeight2: ''})}}/>
        </IconButton>
      </Tooltip>
      </div>
      <div className="row">
      <p className="recomm-label">Difficulty-Level</p>
      <Tooltip title="Difficulty-Easy">
        <IconButton aria-label="Difficulty-Easy">
          <DoneIcon style={{ fontSize: 60 }}  className={this.state.clickedDifficulty1} onClick={event=> {this.setState({ difficulty: "Easy" }); this.setState({ clickedDifficulty1: 'clickedDifficulty1'}); this.setState({clickedDifficulty2: ''}); this.setState({clickedDifficulty3: ''})}}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Difficulty-Moderate">
        <IconButton aria-label="Difficulty-Easy">
          <DoneAllIcon style={{ fontSize: 60 }} className={this.state.clickedDifficulty2} onClick={event=> {this.setState({ difficulty: "Moderate" }); this.setState({ clickedDifficulty2: 'clickedDifficulty2'}); this.setState({clickedDifficulty3: ''}); this.setState({clickedDifficulty1: ''})}}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Difficulty-Expert">
        <IconButton aria-label="Difficulty-Expert">
          <DoneOutlineIcon style={{ fontSize: 60 }} className={this.state.clickedDifficulty3} onClick={event=> {this.setState({ difficulty: "Challenging" }); this.setState({ clickedDifficulty3: 'clickedDifficulty3'}); this.setState({clickedDifficulty2: ''}); this.setState({clickedDifficulty1: ''})}}/>
        </IconButton>
      </Tooltip>
      </div>
      <div className="row text-center">
        <TextField id="filled-basic" label="Name this Space" variant="filled" onChange= {event=> this.setState({ name: event.target.value })} />
      </div>
      <br></br>
      <div className="row">
       <a href='/myspaces'><Button onClick={ event => {this.handleSubmit(event)}} href='/myspaces' variant="outline-secondary" className="save-space-btn">Save Space</Button></a>
       </div>
      </div>
    </Grid>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return ({
    recommendations: state.recommendations,
    user: state.user
  })
}

export default connect(
  mapStateToProps,
  actions
)(Recommendations);

