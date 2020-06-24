import {
  Button
} from 'semantic-ui-react'

import { followUser, unFollowUser } from '../../lib/api'

const FollowUser = ({ isFollowing, toggleFollow}) => {
  const request = isFollowing ? unFollowUser : followUser

  return (
    <Button
      variant="contained"
      color={isFollowing ? "secondary" : "primary"}
      onClick={() => toggleFollow(request)}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
};

export default FollowUser;
