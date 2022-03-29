import React from "react";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { student, id } = user;

  const keys = require("./keys.json");
  const address = Object.keys(keys.addresses)[id];
  console.log(keys);
  console.log(address);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <h4>Name: {student.student_name}</h4>
          <h4>Username: {student.username}</h4>
          <h4>Seniority: {student.seniority}</h4>
          <h4>Email: {student.email}</h4>
          <h4>Major: {student.major}</h4>
          <h4>Minor: {student.minor}</h4>
          <h2>Wallet</h2>
          <h4>Address: {address}</h4>
        </div>
      ) : (
        <p>Not logged in yet!</p>
      )}
    </div>
  );
}

export default ProfilePage;
