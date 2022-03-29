import React, { useState, useEffect } from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    async function logIn() {
      if (loggedIn) {
        await delay(1000);
        return navigate("/");
      }
    }
    logIn();
  }, [loggedIn]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const passwordHandler = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const usernameHandler = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const loginHandler = (event) => {
    var user;

    var output = document.getElementById("output");
    const student_data = require("./student_info.json");
    student_data.filter((student, id) => {
      if (password === student.password && username === student.username) {
        user = {
          id,
          student,
        };
      }
      if (user != null) {
        setErrorMessage("Log in successful!");
        localStorage.setItem("user", JSON.stringify(user));
        setLoggedIn(true);
      } else {
        setErrorMessage("Incorrect username or password!");
      }
    });
  };

  const FormID = "LOGIN PLS";

  return (
    <div className="LoginPage" style={{ marginTop: "20px" }}>
      <h2>Login</h2>
      <p>{errorMessage}</p>
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
