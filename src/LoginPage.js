import React, { useState } from "react";
import { Button, Input, Form } from "semantic-ui-react";

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const passwordHandler = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const usernameHandler = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const loginHandler = (event) => {
    var output = document.getElementById("output");
    const student_data = require("./student_info.json");
    student_data.filter((student, id) => {
      if (password === student.password && username === student.username) {
        const user = {
          id,
          student,
        };
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
  };

  const FormID = "LOGIN PLS";

  return (
    <div className="LoginPage" style={{ marginTop: "20px" }}>
      <h2>Login</h2>
      <Form name="login" onSubmit={loginHandler} id={FormID}>
        <div class="ui stacked segment">
          <div class="field">
            <label>Username</label>
            <Input
              type="text"
              placeholder="Username"
              onChange={usernameHandler}
            />
          </div>
          <div class="field">
            <label>Password</label>
            <Input
              type="password"
              placeholder="Password"
              onChange={passwordHandler}
            />
          </div>
        </div>
        <Button type="submit" Form={FormID}>
          Log In
        </Button>
      </Form>
      {/* <div id="output"></div> */}
    </div>
  );
};

export default LoginPage;
