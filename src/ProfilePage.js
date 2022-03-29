import React from "react";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2>Profile</h2>
      {user ? <p>{user.student.student_name}</p> : <p>Not logged in yet!</p>}
    </div>
  );
}

export default ProfilePage;
