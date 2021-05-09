import React from 'react';
import styled, {css} from 'styled-components';

const Content = styled.div`
  max-width: 1100px;
  padding-left: 50px;
  padding-right: 50px;
  margin: auto;
  ${props => props.padding && css`
    padding-top: 50px;
    padding-bottom: 50px;
  `}
  ${props => props.paddingBottom && css`
    padding-bottom: 50px;
  `}
  @media only screen and (max-width: 480px) {
    padding: 20px;
  }
`;

export default Content;