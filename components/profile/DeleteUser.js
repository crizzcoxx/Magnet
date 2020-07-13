import IconButton from "@material-ui/core/IconButton";
//import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Delete from "@material-ui/icons/Delete";

import styled from 'styled-components'
import { Button, Modal } from 'semantic-ui-react'

import { signoutUser } from '../../lib/auth';
import { deleteUser } from '../../lib/api';

class DeleteUser extends React.Component {
  state = {
    open: false,
    isDeleting: false
  };

  handleDeleteUser = () => {
    const { user } = this.props;

    this.setState({
      isDeleting: true
    })
    deleteUser(user._id)
      .then(() => {
        signoutUser();
        //Router.push('/signup') Keeping as an example
      }).catch(err => {
        console.error(err)
        this.setState({
          isDeleting: false
        })
      });
  }

  handleOpen = () =>
    this.setState({
      open: true
    })

  handleClose = () =>
    this.setState({
      open: false
    })

  render() {
    const { open, isDeleting } = this.state;

    return (
      <div>
        {/* <Button onClick={this.show('small')}>Small</Button> */}
        {/* <Button
          onClick={this.handleOpen}
        >
        </Button> */}

        <Modal size={'mini'} open={open} onClose={this.handleClose}>
          <Modal.Header>Delete Account</Modal.Header>
          <Modal.Content>
            <p>You Sure You Wanna Delete Your Account?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative
              onclick={this.handleClose}
            >No, I can't quit you
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes'
              onClick={this.handleDeleteUser}
              disabled={isDeleting}
            />
          </Modal.Actions>
        </Modal>
        {/* Delete User Button */}
        <Button
          onClick={this.handleOpen}
          color="secondary"
        >
          <Delete />
        </Button>
        {/* Delete User Dialogue */}
        {/* <Dialog
          open={open}
          onClose={this.handleClose}
        >
          <DialogTitle>
            Delete Account
            <DialogContent>
              <DialogContentText>
                Confirm to delete your account
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onclick={this.handleClose}
                color="primary"
              >
                Cancel, I can't quit you.
              </Button>
              <Button
                onClick={this.handleDeleteUser}
                color="secondary"
                disabled={isDeleting}
              >
                {isDeleting ? "You'll be sad" : "Confirm"}
              </Button>
            </DialogActions>
          </DialogTitle>
        </Dialog> */}
      </div>
    )
  }
}

export default DeleteUser;
