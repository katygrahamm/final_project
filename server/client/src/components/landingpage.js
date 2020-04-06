import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from "lodash";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'


class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }

  }


handleSubmit(name) {
  console.log(this.state.name)
  localStorage.removeItem('userid')

   let userid = Math.random().toString(36).substring(7);
      console.log("random", userid);

    localStorage.setItem('userid', userid)
    localStorage.setItem('name', name)

    this.props.addUser(this.state.name, userid)
}

render() {
  return (
    <div>
     <h6 className="tell-us text-center">Tell Us Your Name</h6>
     <br></br>
      <form className="landing-page-form text-center" onSubmit={event => {this.handleSubmit()}}>
        <input type="text" className="landing-input" onChange={event => {this.setState({ name: event.target.value})}}></input>
        <br></br>
        <br></br>
        <Button type="Submit" className="button-landing" variant="outline-secondary">Submit</Button>
        <br></br>
        <br></br>
        <Link to='/create'>Start Exploring</Link>
      </form>
    </div>
    ) 
  }
}

function mapStateToProps(state) {
  return ({
    user: state.user
  })
}

export default connect(
  mapStateToProps,
  actions
)(LandingPage);