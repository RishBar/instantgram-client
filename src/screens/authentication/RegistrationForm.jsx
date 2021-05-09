import React, { useState } from "react";
import {
  Form,
  Button
} from "semantic-ui-react";
import axios from "axios";
import Content from "../../components/Content"


const RegistrationForm = props => {

  const initialData = {
    email: "",
    username: "",
    password: "",
    password_confirmation: ""
  };

  const [data, setData] = useState(initialData);

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
        }
      })
      .then(function(response) {
        console.log("signed uppp!!!");
      })
      .catch(function(error) {
        console.log(error.response);;
      });
  };

  return (
    <Content>
      <Form onSubmit={handleSubmit} style={{paddingTop: "100px"}} >
          <h1>Register</h1> 
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
          type="password_confirmation"
          placeholder="Password Confirmation"
          value={data.password_confirmation}
          onChange={handleChange}
          required
        />
          <Button primary type="submit">
            Submit
          </Button>
        </Form>
      </Content>
  )
}

export default RegistrationForm;