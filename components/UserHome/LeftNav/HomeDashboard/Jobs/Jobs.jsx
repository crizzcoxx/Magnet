import React, { Component } from 'react'
//import axios from 'axios'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class Jobs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      validForm: false,
      isLoggedIn: false,
    }
  }

  render() {
    return (
      <div className="ui text container">
       Got some jobs up in here
      </div>
    )
  }
}

export default Jobs
