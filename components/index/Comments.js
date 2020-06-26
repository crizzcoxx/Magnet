import Link from 'next/link';
import styled from 'styled-components';
import { Comment, Form, Icon, Header, Feed, List, Image, Button } from 'semantic-ui-react';
import { formatDistanceToNow, parseISO } from "date-fns";

const NewComment = styled(Comment)`
  &&&& {
    overflow: hidden;
  }
`

const NewCommentBlock = styled.div`
  &{
    margin: 1px 0px 0px -42px;
  }
`;

const CommentList = styled(Comment)`
  &&&&& {
    position: relative;
    top: -17px;
    width: 22rem;
    left: 46px;
  }
`;

const DeleteIcon = styled(Icon)`
  &&&&&&{
    color: green;
    position: relative;
    float: right;
    bottom: 9px;
  }
  ${CommentList}:hover & {
    background-color: pink;
    visibility: visible;
  }
`;

// const Icon = styled.svg`
//   transition: fill 0.25s;
//   width: 48px;
//   height: 48px;

//   ${Link}:hover & { // <-- This is what we can do now.
//     fill: rebeccapurple;
//   }
// `;

const CommentAvatarBox = styled.div`
  &&&& {
    width: 38px;
    height: 38px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    float: left;
  }
`
const CommentAvatar = styled(Comment.Avatar)`
  &#post-comment-avatar {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    border-radius: .25rem;
  }
`

const CommentName = styled(Comment.Author)`
 &&&&& {
  padding: 8px 0px 0px 48px;
 }
`

const CommentedWhen = styled(Comment.Metadata)`
  &&&&&{
    position: relative;
    top: -17px;
    margin-left: 50px;
  }
`

const CommentText = styled(Comment.Text)`
  &&&&&&{
    margin: -8px 0px 0px 0px;
  }
`

const NewCommentAvatarBox = styled.div`
  &&&&{
    display: inline-block;
    width: 38px;
    height: 38px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }
`
const NewCommentAvatar = styled(Comment.Avatar)`
  &#new-post-comment-avatar {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    border-radius: .25rem;
  }
`

const UserCommentInputBox = styled(Form)`
    &&&&.ui {
      float: right;
      width: 100%;
      max-width: 392px;
      min-width: 200px;
      margin: relative;
      margin: 0px 11em 0 39px;
}
    }
    &&&& textarea {
      height: 2.9em;
    }
`

const CommentSubButton = styled.button`
  &&{
    position: relative;
    top: -48px;
    left: 150px;
    color: green;
  }
`

// const CommentSubLink = CommentSubButton.withComponent('a')
// const CommentDelete = styled(Icon)`
//   &#comment-delete{
//     visibility: hidden;
//   }
// `


class Comments extends React.Component {
  state = {
    text: ""
  };

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = event => {
    const { text } = this.state;
    const { postId, handleAddComment, handleDeleteComment } = this.props;

    event.preventDefault();
    if (event.key === "Enter") {
      alert("enter press here! ");
    }
    handleAddComment(postId, text);
    this.setState({
      text: ""
    });
  };

  showComment = comment => {
    const { postId, auth, handleDeleteComment } = this.props;
    const isCommentCreator = comment.postedBy._id === auth.user._id;

    return (
      <div>
        <Comment.Content>
          <CommentName>
            <Link href={`/profile/${comment.postedBy._id}`}>
              <a>{comment.postedBy.name}</a>
            </Link>
          </CommentName>
          <CommentedWhen>
            <span>{this.formatTimeCreated(comment.createdAt)}</span>
          </CommentedWhen>
          {isCommentCreator && (
            <DeleteIcon
              onClick={() => handleDeleteComment(postId, comment)}
              id="comment-delete"
              name="trash alternate outline"
              size="large"
            ></DeleteIcon>
          )}
          <CommentText>{comment.text}</CommentText>
        </Comment.Content>
      </div>
    );
  };

  formatTimeCreated = time => {
    const timeSince = formatDistanceToNow(
      parseISO(time, {
        includeSeconds: true,
        addSuffix: true
      })
    );
    return timeSince;
  };

  render() {
    const { auth, comments } = this.props;
    const { text } = this.state;

    return (
      <Comment.Group>
        {comments.map(eachComment => (
          <CommentList
            key={eachComment._id}
            //title={this.showComment(eachComment)}
          >
            <CommentAvatarBox>
              <CommentAvatar
                id="post-comment-avatar"
                src={eachComment.postedBy.avatar}
                size="tiny"
              ></CommentAvatar>
            </CommentAvatarBox>
            <Comment.Content>
              <Comment.Action>{this.showComment(eachComment)}</Comment.Action>
            </Comment.Content>
          </CommentList>
        ))}
        <NewCommentBlock>
          <NewCommentAvatarBox>
            <NewCommentAvatar
              src={auth.user.avatar}
              id="new-post-comment-avatar"
            ></NewCommentAvatar>
          </NewCommentAvatarBox>
          <UserCommentInputBox onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.TextArea
                placeholder={`Go ahead, comment ${auth.user.name}`}
                value={text}
                name="text"
                onChange={this.handleChange}
              ></Form.TextArea>
              <CommentSubButton type="submit"></CommentSubButton>
            </Form.Field>
          </UserCommentInputBox>
        </NewCommentBlock>

        {/* {isVisible ? (
            <PostButtonBox>
              <Icon
                input
                name="image"
                component="span"
                size="large"
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  ref={fileInputRef}
                  accept="image/"
                  name="image"
                  id="image"
                  hidden
                  onChange={handleChange}
                  type="file"
                />
              </Icon>
              <span>{image && image.name}</span>
              <PostButton
                labelPosition="middle"
                icon="edit"
                primary
                disabled={!text || isAddingPost}
                onClick={handleAddPost}
              >
                {isAddingPost ? "Sending" : "Comment"}
              </PostButton>
            </PostButtonBox>
          ) : null} */}
      </Comment.Group>
    );
  }
}

export default Comments;
