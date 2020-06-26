import Link from "next/link";
import styled from "styled-components";
import {
  Feed,
  Button,
  Icon,
  Image
} from "semantic-ui-react";
import { formatDistanceToNow, parseISO, format } from "date-fns";

class FollowTab extends React.Component {

  formatDate = date => format(new Date(), "MMM do, yyyy");

  render() {
    const { users, auth } = this.props;

    const UserBox = styled(Feed.Label)`
      &&&& {
        width: 50px;
        height: 50px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
      }
    `;

    const UserFeedImage = styled(Image)`
      width: 100%;
      height: auto;
    `;

    return (
      <div>
        <Feed>
          {users.map((user, i) => (
            <Feed.Event key={user._id}>
              {console.log("user list being mapped in profile followtab", user)}
              <UserBox>
                <UserFeedImage src={user.avatar} size="tiny"></UserFeedImage>
              </UserBox>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>
                    <Link href={`/profile/${user._id}`}>
                      <a>{user.name}</a>
                    </Link>
                  </Feed.User>
                  <Feed.Date>{`Joined: ${this.formatDate(
                    auth.user.createdAt
                  )}`}</Feed.Date>
                </Feed.Summary>
                <Button onClick={() => this.handleFollow(user, i)}>
                  Follow
                </Button>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="bookmark outline" />4 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          ))}
        </Feed>
      </div>
    );
  }
};

export default FollowTab;
