import React, { useState, useContext } from "react";
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


const LandingPage = props => {
  const [data, setData] = useState({caption: "", preview: ""});
  const {currentUser} = useContext(appContext);

  const handleChange = (e, { name, value }) => {
    setData({ ...data, [name]: value });
  };

  const handleUpload = async (e, { name }) => {
    const file = e.target.files[0];
    setData({ ...data, [name]: file });
  };

  const handleSubmit = () => {
    const { caption, preview } = data;
    const formData = new FormData();
    formData.append('caption', caption)
    formData.append('images', preview)
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
        console.log(response)
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };
  return (
    console.log(data.preview),
    <Content>
      { currentUser?
        <>
          <h3 style={{paddingTop: "100px"}}>Make a post!</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                label="Caption"
                name="caption"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
                  {data.preview && (
                    <Image
                      src={URL.createObjectURL(data.preview)}
                      size="medium"
                      alt="image to upload"
                    />
                  )}
                  <Input
                    name="preview"
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                  />
            </Form.Field>
            <Button primary type="submit" >
              Upload
            </Button>
          </Form>
        </>
        :
        <RegisterForm/>
      
      }
    </Content>
  )
  
}

export default LandingPage;