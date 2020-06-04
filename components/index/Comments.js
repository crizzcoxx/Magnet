import Link from 'next/link';
import styled from 'styled-components';
import { Comment, Form, Icon, Header, Feed, List, Image, Button } from 'semantic-ui-react';

// const NewComment = styled(Comment)`
//   &&&& {
//     overflow: hidden;
//   }
// `

const CommentList = styled(Comment)`
  &&&& {
    height: 50px;
  }
`

const NewCommentAvatarBox = styled.div`
  &&&& {
    display: inline-block;
    width: 50px;
    height: 50px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }
`
const NewCommentAvatar = styled(Comment.Avatar)`
  &#new-post-comment-avatar {
    width: 100%;
    height: auto;
    margin-top: -3px;
  }
`

const UserCommentInputBox = styled(Form)`
    &&&&.ui {
      float: right;
      max-width: 494px;
      width: 100%;
      min-width: 100px;
}
    }
    &&&& textarea {
      height: 2.9em;
    }
`

class Comments extends React.Component {
  state = {
    text: ''
  };

  handleChange = event => {
    this.setState({ text: event.target.value })
  }

  handleSubmit = event => {
    const { text } = this.state;
    const { postId, handleAddComment } = this.props;

    event.preventDefault();
    if (event.key === 'Enter') {
      alert('enter press here! ')
    }
    handleAddComment(postId, text);
    this.setState({
      text: ''
    });
  }

  showComment = comment => {
    const { postId, auth } = this.props;
    const isCommentCreator = comment.postedBy._id === auth.user._id;

    return (
      <div>
        <Comment.Content>
          <Comment.Author>
            <Link href={`/profile/${comment.postedBy._id}`}>
              <a>{comment.postedBy.name}</a>
            </Link>
          </Comment.Author>
          <Comment.Text>{comment.postedBy.text}</Comment.Text>
        </Comment.Content>

        <br />
        <span>
          {
            isCommentCreator && (
              <Icon
                name="trash alternate outline"
                size="large"
              />
          )}
        </span>
      </div>
    )
  }

  render() {
    const { auth, comments } = this.props;
    const { text } = this.state;

    return (
      <Comment.Group>
        {
          comments.map(eachComment => (
            <CommentList
              key={eachComment._id}
              //title={this.showComment(eachComment)}
            >
              <Comment.Avatar
                src={eachComment.postedBy.avatar}
              >
              </Comment.Avatar>
              <Comment.Content>
                <Comment.Action>
                  {this.showComment(eachComment)}
                </Comment.Action>
                <Comment.Metadata>
                  <div>
                    {`Joined: ${eachComment.createdAt}`}
                  </div>
                </Comment.Metadata>
                <Comment.Text>
                  {eachComment.postedBy.text}
                </Comment.Text>
              </Comment.Content>
            </CommentList>
          ))
        }
        <div>
          <NewCommentAvatarBox>
            <NewCommentAvatar
              src={auth.user.avatar}
              id="new-post-comment-avatar"
            >
            </NewCommentAvatar>
          </NewCommentAvatarBox>
          <UserCommentInputBox
            onSubmit={this.handleSubmit}
          >
            <Form.Field>
              <Form.TextArea
                placeholder={`Go ahead, comment ${auth.user.name}`}
                value={text}
                name="text"
                onChange={this.handleChange}
              >
              </Form.TextArea>
              <Button
                type="submit"
              >
              </Button>
            </Form.Field>
          </UserCommentInputBox>
        </div>


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
