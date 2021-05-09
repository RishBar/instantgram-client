import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button
} from "semantic-ui-react";
import axios from "axios";
import Content from "../../components/Content";
import appContext from '../../contexts/AppContext';
import { saveCurrentUser } from '../../commonFunctions/functions';


const LoginForm = props => {

  const initialData = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialData);
  const {setCurrentUser} = useContext(appContext);
  const history = useHistory();

  const handleChange = (e, { name, value }) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    const { email, password } = data;

    axios
      .post("/auth/sign_in", {
        email: email,
        password: password
      })
      .then(function(response) {
        let user = response.data.data;
        saveCurrentUser(user);
        setCurrentUser(user);
        history.push("/");
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };

  return (
    <Content>
      <Form onSubmit={handleSubmit} style={{paddingTop: "100px"}} >
          <h1>Login</h1> 
          <Form.Input
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
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
          <Button primary type="submit">
            Submit
          </Button>
        </Form>
        <p>Dont have an account? <a href="/register">Sign up!</a></p>
      </Content>
  )
}

export default LoginForm;