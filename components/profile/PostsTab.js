import Post from '../../components/index/Post';
import {
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} from '../../lib/api.js';

class PostsTab extends React.Component {

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
    const {
      auth,
      posts,
      user,
      isDeletingPost,
      handleDeletePost,
      handleToggleLike,
      handleAddComment,
      handleDeleteComment
    } = this.props;
    //const { activeItem } = this.state;
    return (
      <div>
        {posts.map(post => (
          <Post
            auth={auth}
            post={post}
            isDeletingPost={isDeletingPost}
            handleDeletePost={this.handleDeletePost}
            handleAddPost={this.handleAddPost}
            handleToggleLike={this.handleToggleLike}
            handleAddComment={this.handleAddComment}
            handleDeleteComment={this.handleDeleteComment}
            >
          </Post>
        ))}
      </div>
    );
  }
}

export default PostsTab;