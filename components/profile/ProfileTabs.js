import Link from 'next/link';
import styled from "styled-components";
import {
  Menu
} from "semantic-ui-react";

import PostsTab from './PostsTab';
import FollowTab from './FollowTab';

class ProfileTabs extends React.Component {
  state = {
    activeItem: 'posts'
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

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
    const { activeItem } = this.state;

    return (
      <div>
        <Menu tabular>
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
        {this.state.activeItem === "posts" ?
          <PostsTab
            auth={auth}
            posts={posts}
            user={user}
            isDeletingPost={isDeletingPost}
            handleDeletePost={handleDeletePost}
            handleToggleLike={handleToggleLike}
            handleAddComment={handleAddComment}
            handleDeleteComment={handleDeleteComment}
          />: null}
        {this.state.activeItem === "following" ? <FollowUser auth={auth} /> : null}
        {this.state.activeItem === "followers" ? <FollowTab auth={auth} /> : null}
      </div>
    )
  }
}

export default ProfileTabs;
