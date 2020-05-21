import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import FunnelStages from './FunnelStages'

export default class FunnelStageDropDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'active-reqs',
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state
    const FunnelMenu = styled(Menu)`
      &&&&&& {
        border-bottom: none;
        position: relative;
        top: -67px;
      }
    `;

    return (
      <FunnelMenu tabular>
        <FunnelStages />
      </FunnelMenu>
    )
  }
}
