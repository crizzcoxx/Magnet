import Link from 'next/link';
import styled from "styled-components";
import {
  Card,
  Image,
  Icon,
  Segment,
  Dimmer,
  Loader,
  Menu,
  Button
} from "semantic-ui-react";


import DeleteUser from '../components/profile/DeleteUser';
import FollowUser from '../components/profile/FollowUser';
import FollowTab from '../components/profile/FollowTab';
import ProfileTabs from '../components/profile/ProfileTabs';
import { authInitialProps, getUserScript } from '../lib/auth';
import { getUser } from '../lib/api.js';

const ProfileCard = styled(Card)`
  &&&& {
    margin: 0 auto;
    position: relative;
    top: 100px;
  }
`

const Loading = styled(Segment)`
  &&&& {
    height: 600px;
    margin: 0 auto;
    position: fixed;
    display: flex;
    width: 100%;
  }
`

class Profile extends React.Component {
  state = {
    user: null,
    isAuth: false,
    isFollowing: false,
    isLoading: true
  };

  componentDidMount() {
    const { userId, auth } = this.props

    const isAuth = auth.user._id === userId;
    getUser(userId).then(user => {
      const isFollowing = this.checkFollow(auth, user)
      this.setState({
        user,
        isAuth,
        isFollowing,
        isLoading: false
      })
    })
  }

  checkFollow(auth, user) {
    user.followers.findIndex(follower => follower._id == auth.user._id) > -1
  }

  toggleFollow = sendRequest => {
    const { userId } = this.props;
    const { isFollowing } = this.state;

    sendRequest(userId).then(() => {
      this.setState({
        isFollowing: !isFollowing
      })
    })
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { classes, auth } = this.props;
    const { isLoading, user, isAuth, isFollowing, activeItem } = this.state;
    console.log('props coming from profile', this.props)
    console.log('props from auth', user)
    return (
      <div>
        {isLoading ? (
          <Loading>
            <Dimmer active inverted>
              <Loader active size="massive">Loading</Loader>
            </Dimmer>
          </Loading>
        ) : (
            <ProfileCard>
              <Image src={user.avatar} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{user.name}</Card.Header>
                <Card.Meta>
                  <span className="date">{user.createdAt}</span>
                </Card.Meta>
                <Card.Description>{user.about}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  placeholder text
                </a>
              {isAuth ? (
                <div>
                  <Link href="/edit-profile" >
                  <a>
                    <Button>
                      Edit
                    </Button>
                  </a>
                </Link>
                <DeleteUser user={user}></DeleteUser>
                </div>
                ) : (
                  <div>
                    <FollowUser
                      isFollowing={isFollowing}
                      toggleFollow={this.toggleFollow}
                    />
                  </div>
                  )
              }
              </Card.Content>
                <Menu stackable>
                  <Menu.Item
                    name="posts"
                    active={activeItem === "posts"}
                    onClick={this.handleItemClick}
                  >
                    Posts
                  </Menu.Item>
                  <Menu.Item
                    name="following"
                    active={activeItem === "following"}
                    onClick={this.handleItemClick}
                  >
                    Following
                  </Menu.Item>
                  <Menu.Item
                    name="followers"
                    active={activeItem === "followers"}
                    onClick={this.handleItemClick}
                  >
                    Followers
                  </Menu.Item>
                </Menu>
                {this.state.activeItem === "posts" ? <ProfileTabs auth={auth}/> : null}
                {this.state.activeItem === "following" ? <FollowUser auth={auth}/> : null}
                {this.state.activeItem === "followers" ? <FollowTab auth={auth} /> : null}
            </ProfileCard>

                // <List dense>
          //   <ListItem>
          //     <ListItemAvatar>
          //       <Avatar src={user.avatar} className={classes.bigAvatar} />
          //     </ListItemAvatar>
          //     <ListItemText primary={user.name} secondary={user.email} />
               /* Auth - Edit Buttons / UnAuth - Follow Button */
                //  {isAuth ? (
          //       <ListItemSecondaryAction>
          //         <Link href="/edit-profile">
          //           <a>
          //             <IconButton color="primary">
          //               <Edit />
          //             </IconButton>
          //           </a>
          //         </Link>
          //         <DeleteUser user={user} />
          //       </ListItemSecondaryAction>
          //     ) : (
          //       <div>
          //         <FollowUser
          //           isFollowing={isFollowing}
          //           toggleFollow={this.toggleFollow}
          //         />
          //       </div>
          //     )}
          //   </ListItem>
          //   <Divider />
          //   <ListItem>
          //     <ListItemText
          //       primary={user.about}
          //       secondary={`Joined: ${user.createdAt}`}
          //     />
          //   </ListItem>
          // </List>
        )}
      </div>
    );
  }
}

Profile.getInitialProps = authInitialProps(true);

export default Profile;