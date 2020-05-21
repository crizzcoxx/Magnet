import React from 'react'
import styled from 'styled-components'

import { navGray } from '../.semantic/src/site/variables';

const LogoDiv = styled.div`
  #logo-end {
    margin-top: -7.5px;
    margin-left: 54px;
    color: #fff;
    font-size: 115%;
    font-style: normal;
    font-variant: normal;
    font-weight: 500;
    position: relative;
  }

  #last-m {
    margin-left: -18px;
    color: ${navGray};
  }

  .magnet-tip {
    width: 10px;
    height: 7.9px;
    display: -webkit-inline-box;
    position: relative;
    background-color: #fff;
    top: -11px;
    border-radius: 0px 0px 2px 2px;
  }

  #magnet-tip-1 {
    margin-left: 2.2px;
    margin-right: 8.7px;
  }

  #magnet-tip-2 {
    margin-right: 8.3px;
  }

  i.magnet.big.icon {
    transform: rotate(180deg);
    line-height: 0;
    font-size: 28px;
    margin-top: -11px;
    color: ${navGray};
  }
`;

const Logo = () => {
  return (
    <LogoDiv>
      <i
        className="magnet big icon"
        size="large"
      />
      <i
        id="last-m"
        className="magnet big icon"
        size="large"
      />
      <div id="logo-end">
        agnet.io
      </div>
      <div className="magnet-tip" id="magnet-tip-1">

      </div>
      <div className="magnet-tip" id="magnet-tip-2">

      </div>
      <div className="magnet-tip">

      </div>
    </LogoDiv>
  )
}

export default Logo
