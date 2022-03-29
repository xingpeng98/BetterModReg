import React from "react";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { student } = user;

  return (
    <div>
      <h2>Profile</h2>
      {user ? <p>{student.student_name}</p> : null}
    </div>
  );
}

export default ProfilePage;
