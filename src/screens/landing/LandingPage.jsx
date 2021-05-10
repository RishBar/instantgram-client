import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button,
  Image,
  Input
} from "semantic-ui-react";
import axios from "axios";
import Content from "../../components/Content";
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
    axios.get(`/posts`)
    .then((response) => {
      console.log(response);
      for (let post of response.data) {
        setPosts(prev => {
          setPosts([...prev, post.images.url])
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
    // for (let pic of preview) {
    //   formData.append('images', pic)
    // }
    preview.forEach(pic => {
      formData.append('images[]', pic)
    })
    fetch('http://localhost:3001/posts', {
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
      }),
      body: formData
    })
      .then(function(response) {
        history.go(0)
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };
  
  const images = posts? posts.map(image => {
    return(
      <img style={{width: "300px", height:"300px", paddingBottom:"20px", marginLeft:"auto", marginRight:"auto"}}src={image}></img>
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
          <CenterDiv>
            <Flex>
              {images}
            </Flex>
          </CenterDiv>
        </>
        :
        <RegisterForm/>
      
      }
    </Content>
  )
  
}

export default LandingPage;