import Post from '../../components/index/Post';
import {
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment
} from '../../lib/api.js';

class PostsTab extends React.Component {

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
            handleDeletePost={handleDeletePost}
            handleToggleLike={handleToggleLike}
            handleAddComment={handleAddComment}
            handleDeleteComment={handleDeleteComment}
            >
          </Post>
        ))}
      </div>
    );
  }
}

export default PostsTab;