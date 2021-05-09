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
  const [data, setData] = useState({preview: ""});
  const {currentUser} = useContext(appContext);

  const handleUpload = async (e, { name }) => {
    const file = e.target.files[0];
    setData({ ...data, [name]: file });
  };

  const handleSubmit = () => {
    const { preview } = data;
    axios
      .post(`/users/${currentUser.id}/upload_image`, {
        preview
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };
  return (
    console.log(localStorage.getItem(
      "token-type")),
    <Content>
      { currentUser?
        <Form onSubmit={handleSubmit} style={{paddingTop: "100px"}}>
          <Form.Field>
                <label>Upload an image!</label>
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
        :
        <RegisterForm/>
      }
    </Content>
  )
  
}

export default LandingPage;