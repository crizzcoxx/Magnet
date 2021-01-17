import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import styled from 'styled-components'

// border: 5px solid ${ lightestBlueBorder } !important;
import { medBlue, lightestBlueBorder, appGrayLightest } from '../../../../../.semantic/src/site/variables'

import ResumeReview from './ResumeReview';
const FunnelDiv = styled.div`
  `
const FunnelStage = styled.div`
  {
    margin-top: 45px;
    height: 49px;
    color: #FFFFFF;
    font-size: 91%;
    font-weight: 500;
    padding-top: 3px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    overflow: visible;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 110px;
    position: relative;
    &:hover {
      background-color: #FFFFFF !important;
      color: ${appGrayLightest};
      & i {
      top: -2px;
      position: relative;
      color: #FFFFFF;
      &:hover {
      color: ${appGrayLightest};
    }
    }
      &:after {
        top: 50%;
        left: 78px;
        border: solid transparent;
        content: " ";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 25px 0 23px 13px;
        position: absolute;
        pointer-events: none;
        border-color: rgba(136,183,213,0);
        border-left-color: #FFFFFF !important;
        z-index: 30px;
      }
    }
  }
  p {
    line-height: 1.1em;
    margin-top: -1px;
    text-align: center;
    margin-bottom: 0px;
  }
  .funnel-number {
    color: ${appGrayLightest};

  }
  i {
      top: -2px;
      position: relative;
      color: #FFFFFF;
      &:hover {
      color: ${appGrayLightest};
    }
    }
  .icons-n-numbers {
    position: relative;
    padding-top: 1px;
    &:hover {
      color: ${appGrayLightest};
    }
    & i {
      top: -2px;
      position: relative;
      color: #FFFFFF;
    } &:hover {
      color: ${appGrayLightest};
    }
  }
  &#resume-review {
    background-color: #F4594A;
    border-radius: 3px 0 0 3px;
    &:after {
      border-color: transparent transparent transparent #F4594A;
    }
  }
  &#recruiter-subbed {
    background-color: #FBAB5A;
    &:after {
      border-color: transparent transparent transparent #FBAB5A;
    }
  }
  &#hiring-screens {
    background-color: #A1C7E5;
    &:after {
      border-color: transparent transparent transparent #A1C7E5;
    }
  }
  &#interviews {
    background-color: ${medBlue};
    &:after {
      border-color: transparent transparent transparent ${medBlue};
    }
  }
  &#offers-extended {
    background-color: ${appGrayLightest};
    &:after {
      border-color: transparent transparent transparent ${appGrayLightest};
    }
  }
  &#offers-accepted {
    background-color: #B5DA78;
    &:after {
      border-color: transparent transparent transparent #B5DA78;
    }
  }
  &#hired {
    background-color: #2CA569;
    border-radius: 0 3px 3px 0;
    &:after {
      color: transparent !important;
      border-color: transparent !important;
      background-color: transparent !important;
    }
    & p {
      margin-top: 3px;
    }
  }
  &.funnel-stage {
    &:after {
      white-space: none;
      text-overflow: none;
      top: 0px;
      left: 110px;
      content: " ";
      position: absolute;
      pointer-events: none;
      z-index: 10;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 25px 0 23px 13px;
      &:hover {
        margin-top: 15px;
      }
    }
    &:hover {

    }
  }
`;

const FunnelStages = () => (
  <FunnelDiv>
    <Popup
      trigger={
        <FunnelStage
          id="resume-review"
          className="funnel-stage"
        >
          <p>Resume</p>
          <p>Review</p>
          <div
            className="icons-n-numbers"
          >
            <Icon
              size="large"
              name="users"
              className="funnel-number"
            />12,300
          </div>
        </FunnelStage>}
        inverted
        content={<ResumeReview />}
        position="bottom center"
        verticalOffset={-5}
        on="hover"
      />
    <FunnelStage
      id="recruiter-subbed"
      className="funnel-stage"
    >
      <p>Subbed to</p>
      <p>Recruiter</p>
      <div
        className="icons-n-numbers"
      >
        <Icon
          size="large"
          name="users"
          className="funnel-number"
        />12,300
      </div>
    </FunnelStage>
    <FunnelStage
      id="hiring-screens"
      className="funnel-stage"
    >
      <p>Hiring </p>
      <p>Team Screens</p>
      <div
        className="icons-n-numbers"
      >
        <Icon
          size="large"
          name="users"
          className="funnel-number"
        />12,300
      </div>
    </FunnelStage>
    <FunnelStage
      id="interviews"
      className="funnel-stage"
    >
      <p>Onsite</p>
      <p>Interviews</p>
      <div
        className="icons-n-numbers"
      >
        <Icon
          size="large"
          name="users"
          className="funnel-number"
        />12,300
      </div>
    </FunnelStage>
    <FunnelStage
      id="offers-extended"
      className="funnel-stage"
    >
      <p>Offers</p>
      <p>Extended</p>
      <div
        className="icons-n-numbers"
      >
        <Icon
          size="large"
          name="users"
          className="funnel-number"
        />12,300
      </div>
    </FunnelStage>
    <FunnelStage
      id="offers-accepted"
      className="funnel-stage"
    >
      <p>Offers</p>
      <p>Accepted</p>
      <div
        className="icons-n-numbers"
      >
        <Icon
          size="large"
          name="users"
          className="funnel-number"
        />12,300
      </div>
    </FunnelStage>
    <FunnelStage
      id="hired"
      className="funnel-stage"
    >
      <p>Hired</p>
      <div
        className="icons-n-numbers"
      >
        <Icon
          size="large"
          name="users"
          className="funnel-number"
        />12,300
      </div>
    </FunnelStage>
  </FunnelDiv>
)

export default FunnelStages

