import withStyles from "@material-ui/core/styles/withStyles";
import styled from 'styled-components'
import {
  Menu,
  Image,
  Icon,
  Button,
} from 'semantic-ui-react'

import { medBlue, darkerWhite, lightBlue, hangryGrayBtn, navGray } from '../../../.semantic/src/site/variables'
import AddProfilePhoto from '../../../static/images/upload-photo-only.png'
// import AddProfilePhoto from "../../../static/images/profile-image.jpg";
import EditProfilePhoto from '../../../static/images/upload-photo-hover-dark.png';
import ProfilePicHover from './ProfilePicHover'
//import Auth from '../../../src/pages/Auth'
//import Navbar from '../../../src/components/Navbar'
import HomeMain from './HomeDashboard/HomeMain'
import Jobs from './HomeDashboard/Jobs/Jobs'
import MainFeed from './HomeDashboard/MainFeed/MainFeed'
import { authInitialProps } from "../../../lib/auth";

const imageMaxSize = 10000000000 //bytes
const acceptedFileTypes = 'image/x-png, , image/png,image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(',').map(item => item.trim())
class LeftNav extends React.Component {
  state = {
    activeItem: 'home',
    userData: '',
    isLoggedIn: false,
    isHovering: false,
    file: ''
    //imagePreviewUrl: '',
  };

  componentDidMount() {
    const { userData, isAuthenticated, activeItem } = this.state;
    const auth = this.props.auth;
    // const { history } = this.props
    //console.log('Auth state when home component loads', Auth.isAuthenticated)
    console.log("this is the props in home after comp did mount", this.props);
    console.log("props for auth comp did mount", auth.user.avatar);
    // history.listen((e) => {
    //   console.log('listen to your history in home', e.pathname)
    // })
    //   axios({
    //     method: 'get',
    //     url: '/api/home',
    //     withCredentials: true,
    //     credentials: 'same-origin',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //     .then((response) => {
    //       const seshFromServer = response.data.myHomeSesh
    //       console.log('works - home page looking at all the user response data', response.data)
    //       console.log('home page looking at user response data', this.props.children)
    //       // console.log('home page looking whether logged in from server data', response.data.authenticated)
    //       console.log('this is my props from server coming back after data in home', this.props)
    //       console.log('what is my response status in home', response.status)
    //       this.setState({
    //         userData: response.data.user,
    //       })
    //       if (response.data.authenticated) {
    //         Auth.authenticate(() => {
    //           this.setState(() => ({
    //             isLoggedIn: response.data.authenticated,
    //             userData: response.data.user,
    //           }))
    //         })
    //       }
    //       if (this.props.children.props.user) {
    //         this.setState(() => ({
    //           isLoggedIn: true,
    //           userData: this.props.children.props.user,
    //         }))
    //       }
    //       console.log('this state, you r logged in home after load true?', this.state.isLoggin)
    //       console.log('user data from the apps current state after everything in home', this.state.userData)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  fileChangedHandler(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file
        //imagePreviewUrl: reader.result,
      });
    };
    console.log("file state in change", this.state.file);
    reader.readAsDataURL(file);
  }
  // handleProfilePicUpload(e) {
  //   e.preventDefault();
  //   console.log("you are friggen awesome");
  //   console.log("checking the sate of selectedfile");
  //   const object = this.ProfilePicFocus.current;
  //   object.focus();
  //   const image = object.files[0];
  //   console.dir(image);
  //   const formData = new FormData();
  //   formData.append("imgUploader", image);
  //   const formData = new FormData()
  //     formData.append('file', this.state.selectedFile, this.state.selectedFile.name)
  //     axios.post('/api/file/upload', this.state.file,
  //     {
  //   		onUploadProgress: progressEvent => {
  //   			console.log(progressEvent.loaded / progressEvent.total)
  //   		}
  //     }
  //   )
  // }
  // handleMouseHover() {
  //   this.setState(this.toggleHoverState)
  // }
  // toggleHoverState(state) {
  //   return {
  //     isHovering: !state.isHovering,
  //   }
  // }
  handleMouseHover = (event) => {
    event.preventDefault();
    const { isHovering } = this.state;
    this.setState({
      isHovering: !isHovering
    });
  };

  render() {
    const {
      visible,
      activeItem,
      isAuthenticated,
      file,
      ProfilePicFocus,
      imgSrc
    } = this.state;

    const auth = this.props.auth;
    // if (imagePreviewUrl) {
    //   $imagePreview = <img src={imagePreviewUrl} />
    // } else {
    //   $imagePreview = (<div className="previewText">Please select an Image for Preview</div>)
    // }
    const StyledWrapper = styled.div`
      margin-top: 415px;
    `;
    const LeftNavMenu = styled(Menu)`
      #profile-pic-hover {
        color: #ffffff;
        bottom: 1px; /* For IE8 and earlier */
        opacity: 0.6;
      }
      #side-user-pic {
        position: relative;
        min-width: 7.5em;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        color: #fff;
        background: 0 0;
        color: rgba(255, 255, 255, 0.9);
        height: auto;
        text-align: center;
        /* color: #1b1c1d; */
        display: block;
        background: 0 0;
        border: none;
        padding: 16px;
        :hover {
          background-color: transparent !important;
          color: white;
          height: 106px;
          cursor: pointer;
        }
      }
      img#nav-profile-image {
        width: 100%;
        height: auto;
      }
      &#leftNav {
        position: fixed;
      }
      &&&& {
        width: 0%;
        min-width: 7.5em;
        background-color: ${navGray};
        position: relative;
        border-radius: 5px 5px 5px 5px;
        -webkit-box-shadow: 17px 25px 94px -10px rgba(48, 72, 97, 1);
        -moz-box-shadow: 17px 25px 94px -10px rgba(48, 72, 97, 1);
      }
    `;

    const LeftNavMenuPicFrame = styled.div`
      width: 73px;
      height: 76px;
      position: relative;
      overflow: hidden;
      border-radius: 50%;
    `;

    const LeftNavMenuItem = styled(Menu.Item)`
      &&&&&& {
        color: #f0f0f0;
        min-width: 6em;
        background-color: ${navGray} !important;
        font-weight: 400;
        &:last-child {
          -webkit-box-shadow: rgba(223, 242, 250, 0.59);
          -moz-box-shadow: rgba(223, 242, 250, 0.59);
          box-shadow: rgba(223, 242, 250, 0.59);
        }
        &:before {
          -webkit-box-shadow: inset -1px 19px 21px -24px
            rgba(223, 242, 250, 0.59);
          -moz-box-shadow: inset -1px 19px 21px -24px rgba(223, 242, 250, 0.59);
          box-shadow: inset -1px 19px 21px -24px rgba(223, 242, 250, 0.59);
          padding-bottom: 70px;
          background: rgba(34, 36, 38, 0);
          &:hover {
            background-color: #ffffff !important;
            z-index: 555;
          }
        }
        &.active {
          height: 70px;
          font-size: 104%;
          font-weight: 900;
          background-color: #565656 !important;
          color: transparent !important;
          text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
          -webkit-background-clip: text;
          -moz-background-clip: text;
          background-clip: text;
          .left-nav-icons {
            background-color: #565656 !important;
            color: transparent !important;
            text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
            -webkit-background-clip: text;
            -moz-background-clip: text;
            background-clip: text;
          }
          &:after {
            height: 18px;
            width: 18px;
            background-color: #ffffff !important;
            left: 87px;
            &:hover {
              height: 18px;
              width: 18px;
              background-color: #ffffff !important;
            }
          }
          &:before {
            height: 70px;
            background-color: #ffffff !important;
            z-index: -1;
            &:hover {
              background-color: #ffffff !important;
            }
          }
        }
        &:hover {
          &:after {
            height: 18px;
            width: 18px;
            background-color: #ffffff !important;
          }
          background-color: #ffffff !important;
          font-size: 104%;
          font-weight: 900;
          background-color: #565656 !important;
          color: transparent !important;
          text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
          -webkit-background-clip: text;
          -moz-background-clip: text;
          background-clip: text;
          .left-nav-icons {
            background-color: #565656 !important;
            color: transparent !important;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
            -webkit-background-clip: text;
            -moz-background-clip: text;
            background-clip: text;
          }
        }
      }
    `;
    return (
      <StyledWrapper>
        <LeftNavMenu
          id="leftNav"
          className="vertical inverted pointing icon menu"
          pointing
          vertical
          icon="labeled"
          inverted
          fixed="left"
        >
          {/* <EditProfilePhoto /> */}

          <LeftNavMenuItem
            name="user pic"
            id="side-user-pic"
            // id="imgUploader"
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}
            // onClick={this.handleProfilePicUpload}
          >
            <LeftNavMenuPicFrame

            >
              {auth.user.avatar
                ? <Image src={auth.user.avatar} id="nav-profile-image" />
                : <Image src={AddProfilePhoto} size="large" />
              }
              {this.state.isHovering && (
                <Image
                  src={EditProfilePhoto}
                  size="large"
                  id="profile-pic-hover"
                  circular
                />
              )}
            </LeftNavMenuPicFrame>
          </ LeftNavMenuItem>
            {/* {
                imagePreviewUrl ?
                  <input
                    type="file"
                    onChange={e => this.fileChangedHandler(e)}
                    img
                    src={imagePreviewUrl}
                  />
                  :
                  <Image
                    src={AddProfilePhoto}
                    size="large"
                    circular
                    onChange={e => this.fileChangedHandler(e)}
                  />
              }
              {
                this.state.isHovering &&
                imagePreviewUrl ?
                  <Image
                    src={imagePreviewUrl}
                    size="large"
                    id="profile-pic-hover"
                    circular
                  >
                  <Button className="submitButton"
            type="submit"
            onClick={(e)=>this._handleSubmit(e)}>Upload Image </Button></Image>
                :
                  <Image
                    src={EditProfilePhoto}
                    size="large"
                    id="profile-pic-hover"
                    circular
                    >
                    <input
                      type="file"
                      ref={this.ProfilePicFocus}
                    />
                  </Image>
              } */}

          <LeftNavMenuItem
            name="home"
            className="menu-names"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          >
            <Icon name="home" className="left-nav-icons" />
            Home
          </LeftNavMenuItem>
          {/* <NavLink to="/jobs"> */}
          <LeftNavMenuItem
            name="jobs"
            className="menu-names"
            active={activeItem === "jobs"}
            onClick={this.handleItemClick}
          >
            <Icon name="suitcase" className="left-nav-icons" />
            My Jobs
          </LeftNavMenuItem>
          {/* </NavLink> */}
          <LeftNavMenuItem
            name="candidates"
            className="menu-names"
            active={activeItem === "candidates"}
            onClick={this.handleItemClick}
          >
            <Icon name="users" className="left-nav-icons" />
            Candidates
          </LeftNavMenuItem>
          <LeftNavMenuItem
            name="metrics"
            className="menu-names"
            active={activeItem === "metrics"}
            onClick={this.handleItemClick}
          >
            <Icon name="bar chart" className="left-nav-icons" />
            Metrics
          </LeftNavMenuItem>
          <LeftNavMenuItem
            name="feed"
            className="menu-names"
            active={activeItem === "feed"}
            onClick={this.handleItemClick}
          >
            <Icon name="comments outline" className="left-nav-icons" />
            Feed
          </LeftNavMenuItem>
          {/* <LeftNavMenuItem
            className="menu-names"
          /> */}
        </LeftNavMenu>
        {this.state.activeItem === "home" ? <HomeMain /> : null}
        {this.state.activeItem === "jobs" ? <Jobs /> : null}
        {this.state.activeItem === "feed" ? <MainFeed auth={ auth } /> : null}
      </StyledWrapper>
    );
  }
}

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      width: 600
    }
  },
  title: {
    color: theme.palette.primary.main
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
});

LeftNav.getInitialProps = authInitialProps(true);

export default withStyles(styles)(LeftNav);

