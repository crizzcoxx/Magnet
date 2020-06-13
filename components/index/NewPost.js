import styled from 'styled-components';
import Link from 'next/link';
import { Button, Header, Form, Comment, Input, Icon } from 'semantic-ui-react';

const NewPostCommentBox = styled.div`
  &&&& {
    display: inline-block;
    width: 50px;
    height: 50px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    justify-content: space-around;
  }
`
const NewPostCommentAvatar = styled(Comment.Avatar)`
  &#new-post-comment-avatar {
    width: 100%;
    height: auto;
    margin-top: -3px;
  }
`

const UserNameBox = styled(Comment.Content)`
  &#new-post-username-box {
    position: relative;
    left: 62px;
    bottom: 36px;
  }
`

const UserCommentInputBox = styled(Form)`
    &&&&.ui {
      margin-top: -7px;
    }
    &&&& textarea {
      height: 5.3em;
    }
  `
const PostButtonBox = styled.div`
  &{
    bottom: 3.5em;
    left: 1em;
    position: absolute;
    top: 40px;
  }
  i.image.large.icon {
    color: #c2e0f3;
    margin-top: 6px;
  }
`;

const PostButton = styled(Button)`
  &&&&&&&& {
    left: 0.5em;
    height: 23px;
    min-width: 78px;
    max-width: 78px;
    width: 100%;
    font-size: 1em;
    border-radius: 2px;
    color: white;
    padding: 0px 8px 0px 0px !important;
    text-align: end;
    vertical-align: middle;
    line-height: 8px;
  }
`;

const CommentsHeader = styled(Header)`
  &&{
    margin-top: 6px
  }
`;

const NewPost = ({
  auth,
  text,
  image,
  isAddingPost,
  isVisible,
  handleChange,
  handleAddPost,
  fileInputRef,
  setVisible,
  // onKeyDown,
}) => (
  <Comment.Group>
    <Comment>
      <NewPostCommentBox>
        <NewPostCommentAvatar
          src={auth.user.avatar}
          id="new-post-comment-avatar"
        ></NewPostCommentAvatar>
      </NewPostCommentBox>
      <UserNameBox id="new-post-username-box">
        <Comment.Author as="a" right>
          {auth.user.name}
        </Comment.Author>
      </UserNameBox>
    </Comment>
    <UserCommentInputBox reply onSubmit={setVisible}>
      <Form.TextArea
        placeholder={`Tell me ${auth.user.name}`}
        type="text"
        value={text}
        name="text"
        onClick={setVisible}
        onChange={handleChange}
        // onKeyDown={onKeyDown}
      >
      </Form.TextArea>

      {isVisible ? (
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
      ) : null}
    </UserCommentInputBox>
    <CommentsHeader dividing as="h3" dividing>
      Comments
    </CommentsHeader>
  </Comment.Group>
);
export default NewPost;