import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button
} from "semantic-ui-react";
import axios from "axios";
import Content from "../../components/Content"
import appContext from '../../contexts/AppContext';
import { saveCurrentUser, saveHeaders } from '../../commonFunctions/functions';


const RegistrationForm = props => {

  const initialData = {
    email: "",
    username: "",
    password: "",
    password_confirmation: ""
  };

  const [data, setData] = useState(initialData);
  const {setCurrentUser} = useContext(appContext);
  const history = useHistory();

  const handleChange = (e, { name, value }) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    const { email, username, password, password_confirmation } = data;

    axios
      .post("/users", {
        user: {
          email: email,
          username: username,
          password: password,
          password_confirmation: password_confirmation
        },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://instantgram6-frontend.herokuapp.com/'
        }
      })
      .then(function(response) {
        saveHeaders(response.headers);
        let user = response.data.data;
        history.push("/login");
      })
      .catch(function(error) {
        console.log(error);;
      });
  };

  return (
    <Content>
      <Form onSubmit={handleSubmit} style={{paddingTop: "100px"}} >
          <h1>Register and start posting grams!</h1> 
          <Form.Input
            label="E-mail"
            name="email"
            type="email"
            placeholder="E-mail"
            value={data.email}
            onChange={handleChange}
            required
          />
          <Form.Input
            label="User Name"
            name="username"
            type="username"
            placeholder="User Name"
            value={data.username}
            onChange={handleChange}
            required
          />
          <Form.Input
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <Form.Input
          label="Password Confirmation"
          name="password_confirmation"
          type="password"
          placeholder="Password Confirmation"
          value={data.password_confirmation}
          onChange={handleChange}
          required
        />
          <Button primary type="submit">
            Submit
          </Button>
        </Form>
        <p>Already have an account? <a href="/login">Login!</a></p>
      </Content>
  )
}

export default RegistrationForm;