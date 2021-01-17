import Link from "next/link";
import styled from 'styled-components'
import { Icon, Button, Menu, Popup, Dropdown } from 'semantic-ui-react'

import NavLinks from './NavLinks';
import ActiveLink from '../ActiveLink';
import { signoutUser } from '../../lib/auth';
import { appGrayLight } from '../../.semantic/src/site/variables'
import Logo from '../../pages/Logo'

const TopNavDiv = styled.div`
  .ui.top.fixed.menu {
    align-items: center;
    background-color: rgba(217, 59, 96);
    height: 52px;
  }
  .ui.bottom.fixed.menu {
    z-index: 102;
  }

  .ui.menu .item:before {
    &:before {
      content: none;
    }
  }
  #logo-box {
    margin-left: 190px;
    padding: .6em 2em;
  }
  #user-dropdown {
    margin-right: 1em;
    height: 40px;
    cursor: pointer;
    &:before {
      background: none !important;
    }
  }
`;

const Navbar = ({ classes, router, pageProps: { auth } }) => {
  const { user = {} } = auth || {};
  //const { pageProps } = this.props;

  return (
    <TopNavDiv position={router.pathname === "/" ? "fixed" : "static"}>
      <Menu className="ui top fixed menu">
        <Menu.Menu className='item' id='logo-box' position='left'>
          <ActiveLink href='/'>
            <Logo />
          </ActiveLink>
        </Menu.Menu>
          {user._id ? (
            //Auth Navigation
            <div>
              {/* <HeaderLink>
                  <ActiveLink href={`/profile/${user._id}`}>Profile</ActiveLink>
                </HeaderLink>
                <HeaderLink onClick={signoutUser} variant="outlined">
                  Sign Out
                </HeaderLink> */}

            </div>
          ) : (
              //UnAuth Navigation
              <div>
                <Button>
                  <ActiveLink href="/signin">Sign In</ActiveLink>
                </Button>
                <Button>
                  <ActiveLink href="/signup">Sign Up</ActiveLink>
                </Button>
              </div>
          )}
            <Dropdown
              direction='left'
              pointing='top'
              item icon='large setting'
              simple
              id='user-dropdown'
              borderless
            >
              <Dropdown.Menu
                >
                <Dropdown.Item>
                  <NavLinks user={user} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
      </Menu>
    </TopNavDiv>
  );

}

export default Navbar;