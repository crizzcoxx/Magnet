import styled from 'styled-components';
import { Button, Checkbox, Form, Grid, Menu, Sidebar, Segment } from 'semantic-ui-react'

import PostFeed from '../../../../index/PostFeed';
import UserFeed from '../../../../index/UserFeed'

class MainFeed extends React.Component {
  state = {
    validForm: false,
    isLoggedIn: false
  }

  componentDidMount() {
    const auth = this.props
    console.log('user object including auth yo', auth)
  }

  render() {
    const auth = this.props.auth;

    const FeedGrid = styled(Grid)`
      &#feed-container {
        top: -460px;
        position: relative;
        width: 92%;
        margin: 1em 1em 1em 6em;
      }
    `

    return (
      <FeedGrid
          id={"feed-container"}
        >
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <PostFeed
                auth={auth}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <UserFeed
              auth={auth}
            />
          </Grid.Column>
        </Grid.Row>
        {/* <Grid.Row columns={3}>
          <Grid.Column only="computer">
            <Segment>Computer</Segment>
          </Grid.Column>
          <Grid.Column only="tablet mobile">
            <Segment>Tablet and Mobile</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>All Sizes</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>All Sizes</Segment>
          </Grid.Column>
        </Grid.Row> */}
          {/* <Grid.Row columns={2}>
            <Grid.Column
              width={10}
            >
              <Segment>
                <UserFeed
                  auth={auth}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column
              width={10}
            >
              <Segment>
                <PostFeed
                  auth={auth}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row> */}
       </FeedGrid>
    )
  }
}

export default MainFeed
