import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Grid,
  Icon,
  Segment,
  Menu
} from 'semantic-ui-react'

import { authInitialProps, getUserScript } from '../../lib/auth';
import { getAuthUser } from "../../lib/api";
import ActiveLink from '../ActiveLink';
import { signoutUser } from '../../lib/auth';

const SettingLinksBox = styled.div` {
  font-size: 115%;
}
`;
const SettingSelect = styled(Menu.Item)` {
  position: initial !important;
}
`;

class NavLinks extends React.Component {

state = {
  // user: null,
  // isAuth: false,
  // isFollowing: false,
  // isLoading: true,
  activeIndex: 0
};

componentDidMount() {
  //const { userId, auth } = this.props
  const { user } = this.props;
  console.log("this is the props in hover", this.props);

  // getAuthUser(auth.user._id)
  //   .then(user => {
  //     this.setState({
  //       ...user,
  //       isLoading: false
  //     });
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     this.setState({
  //       isLoading: false
  //     });
  //   });
}

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  };

  render() {
    const { activeIndex } = this.state;
    const { user } = this.props;

    return (
      <SettingLinksBox>
        <SettingSelect>
          <ActiveLink
            href={`/profile/${user._id}`}>
            Profile
          </ActiveLink>
        </SettingSelect>
        <SettingSelect
          onClick={signoutUser}
        >
          Sign Out
        </SettingSelect>
      </SettingLinksBox>
      )
    }
  }

export default NavLinks;