import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button,
  Input
} from "semantic-ui-react";
import axios from "axios";
import Content from "../../components/Content";
import Post from "../../components/Post";
import Image from "../../components/Image";
import appContext from '../../contexts/AppContext';
import { saveCurrentUser } from '../../commonFunctions/functions';
import RegisterForm from '../../screens/authentication/RegistrationForm';
import styled, {css} from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  flex-basis: 33.333333%;
  justify-content: space-between;
`

const CenterDiv = styled.div`
  width: 100%;
  text-align: center;
`

const LandingPage = props => {
  const [data, setData] = useState({preview: []});
  const [posts, setPosts] = useState([])
  const {currentUser} = useContext(appContext);
  const history = useHistory()

  useEffect(() => {
    axios.get(`/posts`, {
      headers: {
        'Access-Control-Allow-Origin': 'https://instantgram6-frontend.herokuapp.com/'
      }
    })
    .then((response) => {
      for (let post of response.data) {
        let postsObj = {user: post.user.username, 
          date: post.created_at.slice(0, 10),
          pics: []};
        if (post.images.length > 1) {
          for (let url of post.images) {
            postsObj.pics.push(url)
          }
        } else {
          postsObj.pics.push(post.images[0])
        }
        setPosts(prev => {
          setPosts([...prev, postsObj])
        })
      }
    })
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setData({ preview: [...data.preview, file] });
  };
  
  const handleSubmit = () => {
    const { preview } = data;
    const formData = new FormData();
    preview.forEach(pic => {
      formData.append('images[]', pic)
    })
    let baseURL = process.env.REACT_APP_INSTANTGRAM_API || 'http://localhost:3001'
    fetch(`${baseURL}posts`, {
      method: 'POST',
      headers: new Headers({
        'access-token': localStorage.getItem(
          "access-token"
        ), 
        'token-type': localStorage.getItem(
          "token-type"
        ),
        'client': localStorage.getItem(
          "client"
        ),
        'expiry': localStorage.getItem(
          "expiry"
        ),
        'uid': localStorage.getItem(
          "uid"
        ),
        'Access-Control-Allow-Origin': 'https://instantgram6-frontend.herokuapp.com/',
      }),
      body: formData
    })
      .then(function(response) {
        history.go(0)
      })
      .catch(function(error) {
      });
  };
  
  const images = posts? posts.map(post => {
    const pics = post.pics.map(pic => {
      return (<Image  src={pic} />)
    })
    return (post.pics.length > 1?
      <>
        <h1 style={{"display": "flex", "justifyContent": "center"}}>
          Posted by: {post.user}
        </h1>
        <h1 style={{"display": "flex", "justifyContent": "center"}}>
          At: {post.date}
        </h1>
        <Post many> 
          {pics} 
        </Post>
      </>
        :
      <>
        <h1 style={{"display": "flex", "justifyContent": "center"}}>
          Posted by: {post.user}
        </h1>
        <h1 style={{"display": "flex", "justifyContent": "center"}}>
          At: {post.date}
        </h1>
        <Post one> 
          {pics} 
        </Post>
      </>
    )  
  }) : []

  const previews = data.preview? data.preview.map(preview => {
    return(
      <img style={{width: "100px", height:"100px"}}src={URL.createObjectURL(preview)}></img>
    )
  }) : []
  return (
    <Content>
      { currentUser?
        <>
          <CenterDiv><h3 style={{paddingTop: "100px"}}>Make a post!</h3></CenterDiv>
          <Form onSubmit={handleSubmit} style={{paddingBottom: "30px", paddingTop:"30px"}}>
            <CenterDiv>
              <Form.Field>
                    {data.preview && (
                      previews
                    )}
                    <input
                      name="preview"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleUpload}
                    />
              </Form.Field>
              <Button primary type="submit" >
                Upload
              </Button>
            </CenterDiv>
          </Form>

            {images}
        
        </>
        :
        <RegisterForm/>
      
      }
    </Content>
  )
  
}

export default LandingPage;