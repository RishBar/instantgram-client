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


const LandingPage = props => {
  const [data, setData] = useState({preview: ""});
  const handleUpload = async (e, { name }) => {
    const file = e.target.files[0];
    setData({ ...data, [name]: file });
  };
  const handleSubmit = async (e, { name }) => {
    const file = e.target.files[0];
    setData({ ...data, [name]: file });
  };
  return (
    <Content>
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
      </Form>
      <p>yoooo</p>
    </Content>
  )
  
}

export default LandingPage;