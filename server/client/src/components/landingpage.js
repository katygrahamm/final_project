import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from "lodash";
import { Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
import Link from '@material-ui/core/Link'


class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }

  }

componentDidMount() {
  let userId = Math.random().toString(36).substring(7);

  localStorage.setItem('userid', userId)

   this.props.addUser(userId)
}

handleSubmit() {

}

render() {
  return (
    <div>
     <h6 className="tell-us text-center">Tell Us Your Name</h6>
     <br></br>
      <form className="landing-page-form text-center" onSubmit={event => {this.handleSubmit()}}>
        <input type="text" className="landing-input"></input>
        <br></br>
        <br></br>
        <Button type="Submit" href="/myspaces" className="button-landing" variant="outline-secondary">Start Exploring</Button>
        <br></br>
        <br></br>
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