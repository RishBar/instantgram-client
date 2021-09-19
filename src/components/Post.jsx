import React from 'react';
import styled, {css} from 'styled-components';


const Post = styled.div `
${props => props.many && css`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-basis: 33.333333%;
  justify-content: space-around;
  border: 2px solid;
  padding: 5px;
  margin: 10px 0px 10px 0px
`}
${props => props.one && css`
  width: 313px;
  border: 2px solid;
  padding: 5px;
  margin: 10px 0px 10px 0px;
  margin: auto;

`}`

export default Post;