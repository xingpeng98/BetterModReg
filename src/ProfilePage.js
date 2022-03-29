import React from "react";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2>Profile</h2>
      {user ? <p>{user.student_name}</p> : null}
    </div>
  );
}

export default ProfilePage;
