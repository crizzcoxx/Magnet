import { Icon, Header, Feed, List, Image, Button } from 'semantic-ui-react';
import NewPost from './NewPost';
import Post from './Post';
import { addPost, deletePost, likePost, unlikePost, getPostFeed, addComment, deleteComment } from '../../lib/api';
import styled from 'styled-components';

class PostFeed extends React.Component {
  state = {
    posts: [],
    text: "",
    image: "",
    isAddingPost: false,
    isDeletingPost: false,
    isVisible: false
  };

  fileInputRef = React.createRef();

  componentDidMount() {
    this.postData = new FormData();
    this.getPosts();
  }

  getPosts = () => {
    const { auth } = this.props;

    getPostFeed(auth.user._id).then(posts => this.setState({ posts }));
  };

  handleChange = event => {
    let inputValue;

    if (event.target.name === "image") {
      inputValue = event.target.files[0];
    } else {
      inputValue = event.target.value;
    }
    this.postData.set(event.target.name, inputValue);
    this.setState({
      [event.target.name]: inputValue
    });
  };

  setVisible = () => {
    this.setState({
      isVisible: !this.state.visible
    });
  };

  handleAddPost = () => {
    const { auth } = this.props;

    this.setState({
      isAddingPost: true,
      isVisible: this.state.visible
    });
    addPost(auth.user._id, this.postData)
      .then(postData => {
        const updatedPosts = [postData, ...this.state.posts];
        this.setState({
          posts: updatedPosts,
          isAddingPost: false,
          text: '',
          image: ''
        });
        this.postData.delete('image');
      })
      .catch(err => {
        console.error(err);
        this.setState({
          isAddingPost: false
        });
      });
  };

  handleDeletePost = deletedPost => {
    this.setState({
      isDeletingPost: true
    });
    deletePost(deletedPost._id)
      .then(postData => {
        const postIndex = this.state.posts.findIndex(post => post._id === postData._id)
        const updatedPosts = [
          ...this.state.posts.slice(0, postIndex),
          ...this.state.posts.slice(postIndex + 1)
        ];
        this.setState({
          posts: updatedPosts,
          isDeletingPost: false
        });
      }).catch(err => {
        console.error(err)
        this.setState({ isDeletingPost: false });
      })
  };

  // handleKeyDown = (e) => {
  //   // Reset field height
  //   e.target.style.height = "inherit";

  //   // Get the computed styles for the element
  //   const computed = window.getComputedStyle(e.target);

  //   // Calculate the height
  //   const height =
  //     parseInt(computed.getPropertyValue("border-top-width"), 10) +
  //     parseInt(computed.getPropertyValue("padding-top"), 10) +
  //     e.target.scrollHeight +
  //     parseInt(computed.getPropertyValue("padding-bottom"), 10) +
  //     parseInt(computed.getPropertyValue("border-bottom-width"), 10);

  //   e.target.style.height = `${height}px`;
  // }

  handleToggleLike = post => {
    const { auth } = this.props;

    const isPostLiked = post.likes.includes(auth.user._id)
    const sendRequest = isPostLiked ? unlikePost: likePost;
    sendRequest(post._id)
      .then(postData => {
        const postIndex = this.state.posts.findIndex(
          post => post._id === postData._id
        )
        const updatedPosts = [
          ...this.state.posts.slice(0, postIndex),
        postData,
          ...this.state.posts.slice(postIndex + 1)
        ]
        this.setState({
          posts: updatedPosts
        })
      }).catch(err => console.error(err))
  }

  handleAddComment = (postId, text) => {
    const comment = { text };
    addComment(postId, comment)
      .then(postData => {
        const postIndex = this.state.posts.findIndex(
          post => post._id === postData._id
        )
        const updatedPosts = [
          ...this.state.posts.slice(0, postIndex),
          postData,
          ...this.state.posts.slice(postIndex + 1)
        ]
        this.setState({
          posts: updatedPosts
        })
      }).catch(err => console.error(err))
  }

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
      }).catch(err => console.error(err));
  }

  render() {
    const { classes, auth } = this.props;
    const { posts, text, image, isAddingPost, isVisible, isDeletingPost } = this.state;

    const CommentFeed = styled(Feed)`
      display: flex;
      justify-content: space-around;
    `

    return (
      <div>
        <Feed>
          <NewPost
            auth={auth}
            text={text}
            image={image}
            isAddingPost={isAddingPost}
            isVisible={isVisible}
            handleChange={this.handleChange}
            handleAddPost={this.handleAddPost}
            fileInputRef={this.fileInputRef}
            setVisible={this.setVisible}
            // handleKeyDown={this.handleKeyDown}
          ></NewPost>
          {posts.map(post => (
            <Post
              key={post._id}
              auth={auth}
              post={post}
              isDeletingPost={isDeletingPost}
              handleDeletePost={this.handleDeletePost}
              handleAddPost={this.handleAddPost}
              handleToggleLike={this.handleToggleLike}
              handleAddComment={this.handleAddComment}
              handleDeleteComment={this.handleDeleteComment}
            ></Post>
          ))}
        </Feed>
      </div>
    );
  }
}

export default PostFeed;