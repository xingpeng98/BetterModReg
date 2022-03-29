import React from "react";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <h4>Name: {user.student.student_name}</h4>
          <h4>Username: {user.student.username}</h4>
          <h4>Seniority: {user.student.seniority}</h4>
          <h4>Email: {user.student.email}</h4>
          <h4>Major: {user.student.major}</h4>
          <h4>Minor: {user.student.minor}</h4>
        </div>
      ) : (
        <p>Not logged in yet!</p>
      )}
    </div>
  );
}

export default ProfilePage;
