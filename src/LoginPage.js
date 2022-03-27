import React, { Component } from "react";
import { Button, Input, Form } from "semantic-ui-react";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      username: "",
    };
  }

  passwordHandler = (event) => {
    const password = event.target.value;
    this.setState({ password: password });
  };

  usernameHandler = (event) => {
    const username = event.target.value;
    this.setState({ username: username });
  };

  loginHandler = (event) => {
    var output = document.getElementById("output");
    const student_data = require("./student_info.json");
    const handleSubmit = student_data.filter((element) => {
      if (
        this.state.password === element.password &&
        this.state.username === element.username
      ) {
        output.innerHTML = element.student_name;
        console.log(element);
        return element;
      }
    });
    return handleSubmit;
  };

  render() {
    const FormID = "LOGIN PLS";
    console.log(this.state.username);

    return (
      <div className="LoginPage" style={{ marginTop: "20px" }}>
        <div class="ui huge header">Login</div>
        <Form name="login" onSubmit={this.loginHandler} id={FormID}>
          <div class="ui stacked segment">
            <div class="field">
              <label>Username</label>
              <Input
                type="text"
                placeholder="Username"
                onChange={this.usernameHandler}
              />
            </div>
            <div class="field">
              <label>Password</label>
              <Input
                type="password"
                placeholder="Password"
                onChange={this.passwordHandler}
              />
            </div>
          </div>
          <Button type="submit" Form={FormID}>
            Log In
          </Button>
        </Form>
        <div id="output"></div>
      </div>
    );
  }
}

export default LoginPage;
