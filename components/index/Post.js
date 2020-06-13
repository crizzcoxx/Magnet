import Link from 'next/link';
import styled from 'styled-components';
import { Comment, Icon, Header, Feed, List, Image, Button } from 'semantic-ui-react';
import Comments from './Comments'

const CommentPostBox = styled(Comment.Group)`
  &&&&{
    overflow: hidden;
    margin-bottom: -4em;
  }
`;

const CommentPostImg = styled.img`
  width: 25em;
  min-width: 20px;
  max-width: 25em;
  height: auto;
`;

const CommentBox = styled.div`
  &&&& {
    display: inline-block;
    width: 50px;
    height: 50px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }
`
const CommentAvatar = styled(Comment.Avatar)`
  &#new-post-comment-avatar {
    width: 100%;
    height: auto;
    margin-top: -3px;
  }
`

const CommentDelete = styled.div`
  {
    float: right;
    position: relative;
    top: 1px;
  }
`;

const CommentUserNameBox = styled(Comment.Content)`
  &#new-post-username-box {
    position: relative;
    left: 62px;
    bottom: 36px;
  }
`

const CommentPostDivider = styled(Header)`
  &&&&&&&& {
    margin-bottom: 3em;
    margin-top: -1em;
  }
`;

const LoveCommentLine = styled.div`
  & {

    margin-top: 1em;
  }
`;

const CommentLove = styled(Icon)`
  &&&&&& {
    color: rgba(217, 59, 96);
  }
`;

const CommentIcon = styled(Icon)`
  &#comment-icon {
    margin: -24px 8px 0px 18px;
  }
`;

class Post extends React.PureComponent {
  state = {
    isLiked: false,
    numLikes: 0,
    comments: []
  };

  componentDidMount() {
    this.setState({
      isLiked: this.checkLiked(this.props.post.likes),
      numLikes: this.props.post.likes.length,
      comments: this.props.post.comments
    })
  }

  componentDidUpdate(prevProps) {
    console.log({ prevProps }, { props: this.props });
    if (prevProps.post.likes.length !== this.props.post.likes.length) {
      console.log('UPDATING', { prevProps }, { props: this.props });
      this.setState({
        isLiked: this.checkLiked(this.props.post.likes),
        numLikes: this.props.post.likes.length
      });
    }

    if (prevProps.post.comments.length !== this.props.post.comments.length)
      {
        this.setState({
          comments: this.props.post.comments
        });
      }
    // } else {
    //   console.log('prev props', prevProps)
    // }

  }

  checkLiked = likes => likes.includes(this.props.auth.user._id)

  render() {
    const {
      post,
      auth,
      isDeletingPost,
      handleDeletePost,
      handleToggleLike,
      handleAddComment,
      handleDeleteComment
    } = this.props;

    const { isLiked, numLikes, comments } = this.state;
    const isPostCreator = post.postedBy._id === auth.user._id;

    let loveIconWord;
    if (numLikes === 0) {
      loveIconWord = 'No Love'
    } else if ( numLikes === 1) {
      loveIconWord = 'Love'
    } else {
      loveIconWord = 'Loves'
    }

    return (
      <CommentPostBox>
        <Comment>
          <CommentBox>
            <CommentAvatar
              src={post.postedBy.avatar}
              id="new-post-comment-avatar"
            />
          </CommentBox>
          <CommentDelete>
            {isPostCreator && (
              <Icon
                name="trash alternate outline"
                size="large"
                disabled={isDeletingPost}
                onClick={() => handleDeletePost(post)}
              />
            )}
          </CommentDelete>
          <CommentUserNameBox id="new-post-username-box">
            <Comment.Author as="a">{post.postedBy.name}</Comment.Author>
            <Comment.Metadata>
              <span>{post.createdAt}</span>
            </Comment.Metadata>
            <Comment.Text>{post.text}</Comment.Text>
            {post.image && <CommentPostImg src={post.image} />}
            <Comment.Actions>
              <a>Reply</a>
            </Comment.Actions>
            <LoveCommentLine onClick={() => handleToggleLike(post)}>
              {isLiked ? (
                <CommentLove name="heart" size="large" color="red" />
              ) : (
                <CommentLove name="heart outline" size="large" color="red" />
              )}
              {numLikes === 0
                ? ` ${loveIconWord}`
                : ` ${numLikes} ${loveIconWord}`}

              <CommentIcon name="comment" size="large" id="comment-icon" />
              {comments.length}
            </LoveCommentLine>
            <Comments
              auth={auth}
              postId={post._id}
              comments={comments}
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
            />
          </CommentUserNameBox>
        </Comment>
        <CommentPostDivider dividing></CommentPostDivider>
      </CommentPostBox>
    );
  }
}

export default Post;
