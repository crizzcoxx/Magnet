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
import ProfileTabs from '../components/profile/ProfileTabs';
import { authInitialProps, getUserScript } from '../lib/auth';
import {
  getUser,
  getPostsByUser
} from '../lib/api.js';

const ProfileCard = styled(Card)`
  &&&& {
    margin: 0 auto;
    position: relative;
    top: 100px;
    width: 30rem;
  }
`;

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
    posts: [],
    isAuth: false,
    isFollowing: false,
    isLoading: true
  };

  componentDidMount() {
    const { userId, auth } = this.props;

    getUser(userId).then(async user => {
      const isAuth = auth.user._id === userId;
      const isFollowing = this.checkFollow(auth, user);
      const posts = await getPostsByUser(userId);
      this.setState({
        user,
        posts,
        isAuth,
        isFollowing,
        isLoading: false
      });
    });
  }

  checkFollow(auth, user) {
    user.followers.findIndex(follower => follower._id == auth.user._id) > -1;
  }

  toggleFollow = sendRequest => {
    const { userId } = this.props;
    const { isFollowing } = this.state;

    sendRequest(userId).then(() => {
      this.setState({
        isFollowing: !isFollowing
      });
    });
  };

  handleDeletePost = deletedPost => {
    this.setState({
      isDeletingPost: true
    });
    deletePost(deletedPost._id)
      .then(postData => {
        const postIndex = this.state.posts.findIndex(
          post => post._id === postData._id
        );
        const updatedPosts = [
          ...this.state.posts.slice(0, postIndex),
          ...this.state.posts.slice(postIndex + 1)
        ];
        this.setState({
          posts: updatedPosts,
          isDeletingPost: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ isDeletingPost: false });
      });
  };

  handleToggleLike = post => {
    const { auth } = this.props;

    const isPostLiked = post.likes.includes(auth.user._id);
    const sendRequest = isPostLiked ? unlikePost : likePost;
    sendRequest(post._id)
      .then(postData => {
        const postIndex = this.state.posts.findIndex(
          post => post._id === postData._id
        );
        const updatedPosts = [
          ...this.state.posts.slice(0, postIndex),
          postData,
          ...this.state.posts.slice(postIndex + 1)
        ];
        this.setState({
          posts: updatedPosts
        });
      })
      .catch(err => console.error(err));
  };

  handleAddComment = (postId, text) => {
    const comment = { text };
    addComment(postId, comment)
      .then(postData => {
        const postIndex = this.state.posts.findIndex(
          post => post._id === postData._id
        );
        const updatedPosts = [
          ...this.state.posts.slice(0, postIndex),
          postData,
          ...this.state.posts.slice(postIndex + 1)
        ];
        this.setState({
          posts: updatedPosts
        });
      })
      .catch(err => console.error(err));
  };

  handleDeleteComment = (postId, comment) => {
    deleteComment(postId, comment)
      .then(postData => {
        const postIndex = this.state.posts.findIndex(
          post => post._id === postData._id
        );
        const updatedPosts = [
          ...this.state.posts.slice(0, postIndex),
          postData,
          ...this.state.posts.slice(postIndex + 1)
        ];
        this.setState({
          posts: updatedPosts
        });
      })
      .catch(err => console.error(err));
  };

  render() {
    const { auth } = this.props;
    const {
      isLoading,
      user,
      posts,
      isAuth,
      isFollowing,
      activeItem
    } = this.state;
    console.log("props coming from profile", this.props);
    console.log("props from auth", user);
    return (
      <div>
        {isLoading ? (
          <Loading>
            <Dimmer active inverted>
              <Loader active size="massive">
                Loading
              </Loader>
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
                  <Link href="/edit-profile">
                    <a>
                      <Button>Edit</Button>
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
              )}
            </Card.Content>
            <ProfileTabs
              auth={auth}
              user={user}
              posts={posts}
            />
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