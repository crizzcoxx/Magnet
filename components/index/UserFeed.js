import styled from 'styled-components';
import { Grid, Segment, Sidebar, Menu, Icon, Header, Feed, List, Image, Button } from 'semantic-ui-react';
import Link from 'next/link';

import MainFeed from '../UserHome/LeftNav/HomeDashboard/MainFeed/MainFeed';
import { getUserFeed, followUser } from '../../lib/api';

class UserFeed extends React.Component {
  state = {
    visible: true,
    users: [],
    openSucess: false,
    //followingMessage: '',
    following: ''
  };

  componentDidMount() {
    const { auth } = this.props;
    console.log('user feed auth props', auth);
    console.log('following', auth.user.following);
    getUserFeed(auth.user._id).then(users => this.setState({ users }))
  }

  handleFollow = (user, userIndex) => {
    followUser(user._id).then(user => {
      const updatedUsers = [
        ...this.state.users.slice(0, userIndex),
        ...this.state.users.slice(userIndex + 1)
      ]
      this.setState({
        users: updatedUsers,
        openSuccess: true,
        //followingMessage: `Following ${users.createdAt}`
      })
    })
  }

  setVisible() {
    this.setState({
      visible: !this.state.visible
    })
  }

  handleClose = () => this.setState({
    openSuccess: false
  })

  render() {
    const {
      visible,
      users,
      openSuccess,
      //followingMessage
    } = this.state;

    const FeedExpandRight = styled.div `
      &#user-feed-right {
        height: 600px;
        curser: pointer;
      }
    `
    const FeedExpandIcon = styled(Icon)`
      &#feed-expand {
        position: relative;
        height: 425px;
        width: 92%;
        margin: 17px 0px 0px 49%;
      }
    `
    const UserBox = styled(Feed.Label) `
      &&&& {
        width: 50px;
        height: 50px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
      }
    `
    const FeedMinIcon = styled(Icon)`
      &#feed-min {
        position: relative;
        margin: -11px 0 0 94%;
        cursor: pointer;
        height: 40px;
        width: 40px;
      }
    `
    const UserFeedImage = styled(Image)`
      width: 100%;
        height: auto;
    `

    return (
      <FeedExpandRight
        id={"user-feed-right"}
      >
        { visible ?
          <Sidebar.Pushable
            as={Segment}
            id={"user-feed-right"}
            animation='overlay'
          >
            <Sidebar.Pusher>
              <Segment basic>
                <FeedMinIcon
                  id={"feed-min"}
                  name="window minimize"
                  size="large"
                  corner="top right"
                  onClick={() => this.setVisible()}
                />
                  <Feed>
                    <label><b>Browse Users to Follow</b></label>
                      {users.map((user, i) => (
                        <Feed.Event key={user._id}>
                          {console.log('user list being mapped', user)}
                          <UserBox>
                            <UserFeedImage
                              src={user.avatar}
                              size="tiny"
                            >
                            </UserFeedImage>
                          </UserBox>
                          <Feed.Content>
                            <Feed.Summary>
                              <Feed.User><Link href={`/profile/${user._id}`} ><a>{user.name}</a></Link>
                              </Feed.User> {/*is following you.*/}
                              <Feed.Date>{`Joined: ${users.createdAt}`}</Feed.Date>
                            </Feed.Summary>
                            <Button
                              onClick={() => this.handleFollow(user, i)}
                            >Follow
                            </Button>
                            <Feed.Meta>
                              <Feed.Like>
                                <Icon name='bookmark outline' />4 Likes
                              </Feed.Like>
                            </Feed.Meta>
                          </Feed.Content>
                        </Feed.Event>
                      ))}
                  </Feed>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          :
          <FeedExpandIcon
            id={"feed-expand"}
            name="window maximize outline"
            size="large"
            corner="top right"
            onClick={() => this.setVisible()}
          />
        }
      </ FeedExpandRight>
    )
  }
}

export default UserFeed;
