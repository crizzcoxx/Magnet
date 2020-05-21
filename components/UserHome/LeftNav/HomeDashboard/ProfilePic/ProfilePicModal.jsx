import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Image,
  Button,
  Modal,
  Header,
} from 'semantic-ui-react'

import ProfilePic from './ProfilePic'
import { medBlue, darkerWhite, lightBlue, hangryGrayBtn } from '../../../../../.semantic/src/site/variables'

class ProfilePicModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.show = dimmer => () => this.setState({ dimmer, open: true })
    this.close = () => this.setState({ open: false })
  }
  render() {
    const {
      open,
      dimmer,
    } = this.state
    const ProfilePicModalDiv = styled(Modal)`
      margin-top: 100px !important;
    `
    return (
      <div>
        <Button onClick={this.show('blurring')}>Blurring</Button>
        <ProfilePicModalDiv dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Upload a Photo</Modal.Header>
          <Modal.Content image>
            <ProfilePic />
          </Modal.Content>
          <Modal.Actions>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yes I look awesome"
              onClick={this.close}
            />
            <Button color="black" onClick={this.close}>
              Nope Try Again
            </Button>
          </Modal.Actions>
        </ProfilePicModalDiv>
      </div>
    )
  }
}
export default ProfilePicModal
//export default withRouter(ProfilePicModal)
