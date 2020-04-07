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
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    let userId = localStorage.getItem('userid')
    console.log(this.state)
    this.props.createSpace(userId, this.state.name, this.state.water, this.state.light, this.state.pet_friendly, this.state.kid_friendly, this.state.difficulty,
        this.state.room_size, this.state.room_height)
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
      <form onSubmit={ event => {this.handleSubmit(event)}}>
        <div className="row">
        <p className="recomm-label-water">Water</p>
        <Tooltip title="Low-Water">
          <IconButton aria-label="low-water">
            <InvertColorsOffIcon style={{ fontSize: 60 }} className="water" onClick={event=> this.setState({ water: "Minimal" })}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Regular-Water">
          <IconButton aria-label="low-water">
            <InvertColorsIcon style={{ fontSize: 60 }}  className="water" onClick={event=> this.setState({ water: "Regular" })}/>
          </IconButton>
        </Tooltip>
        </div>
      <div className="row">
       <p className="recomm-label-light">Light</p>
        <Tooltip title="Low-Light">
          <IconButton aria-label="low-light">
            <BrightnessLowIcon style={{ fontSize: 60 }} className="light" onClick={event=> this.setState({ light: "Low" })}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Medium-Light">
          <IconButton aria-label="med-light">
            <BrightnessMediumIcon style={{ fontSize: 60 }} className="light" onClick={event=> this.setState({ light: "Medium" })}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Bright-Light">
          <IconButton aria-label="bright-light">
            <Brightness7Icon style={{ fontSize: 60 }} className="light" onClick={event=> this.setState({ light: "Bright" })}/>
          </IconButton>
        </Tooltip>
      </div>
      <div className="row">
      <p className="recomm-label-kid">Kid-Friendly</p>
        <Tooltip title="Kid-Friendly">
          <IconButton aria-label="kid-friendly">
            <ChildFriendlyIcon style={{ fontSize: 60 }} className="child" onClick={event=> this.setState({ kid_friendly: "Yes", pet_friendly: "Yes" })}/>
          </IconButton>
        </Tooltip>
        </div>
        <div className="row">
        <p className="recomm-label-pet">Pet-Friendly</p>
        <Tooltip title="Pet-Friendly">
          <IconButton aria-label="Pet-friendly">
            <PetsIcon style={{ fontSize: 60 }} className="pet" onClick={event=> this.setState({ kid_friendly: "Yes", pet_friendly: "Yes" })}/>
          </IconButton>
        </Tooltip>
      </div>
      <div className="row">
      <p className="recomm-label-size">Space-Size </p>
        <Tooltip title="Small-Room">
          <IconButton aria-label="Small-Room">
            <Crop75Icon style={{ fontSize: 60 }} className="room" onClick={event=> this.setState({ room_size: "Small" })}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Medium-Room">
          <IconButton aria-label="Medium-Room">
            <Crop54Icon style={{ fontSize: 60 }} className="room" onClick={event=> this.setState({ room_size: "Medium" })}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Large-Room">
          <IconButton aria-label="Large-Room">
            <Crop32Icon style={{ fontSize: 60 }} className="room" onClick={event=> this.setState({ room_size: "Large" })}/>
          </IconButton>
        </Tooltip>
      </div>
      <div className="row">
      <p className="recomm-label">Space-Height</p>
      <Tooltip title="Low-Ceiling">
        <IconButton aria-label="Difficulty-Expert">
          <HomeIcon style={{ fontSize: 60 }} className="height" onClick={event=> this.setState({ room_height: 8 })}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Average-Ceiling">
        <IconButton aria-label="Difficulty-Expert">
          <HomeWorkIcon style={{ fontSize: 60 }} className="height" onClick={event=> this.setState({ room_height: 10 })}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="High-Ceiling">
        <IconButton aria-label="Difficulty-Expert">
          <LocationCityIcon style={{ fontSize: 60 }} className="height" onClick={event=> this.setState({ room_height: 20 })}/>
        </IconButton>
      </Tooltip>
      </div>
      <div className="row">
      <p className="recomm-label">Difficulty-Level</p>
      <Tooltip title="Difficulty-Easy">
        <IconButton aria-label="Difficulty-Easy">
          <DoneIcon style={{ fontSize: 60 }}  className="difficulty" onClick={event=> this.setState({ difficulty: "Easy" })}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Difficulty-Moderate">
        <IconButton aria-label="Difficulty-Easy">
          <DoneAllIcon style={{ fontSize: 60 }} className="difficulty" onClick={event=> this.setState({ difficulty: "Moderate" })}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Difficulty-Expert">
        <IconButton aria-label="Difficulty-Expert">
          <DoneOutlineIcon style={{ fontSize: 60 }} className="difficulty" onClick={event=> this.setState({ difficulty: "Challenging" })}/>
        </IconButton>
      </Tooltip>
      </div>
      <div className="row text-center">
        <TextField id="filled-basic" label="Name this Space" variant="filled" onChange= {event=> this.setState({ name: event.target.value })} />
      </div>
      <br></br>
      <div className="row">
       <Button type="Submit" className="save-space-btn">Save Space</Button>
       </div>
      </form>
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

