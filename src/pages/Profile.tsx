// src/pages/Profile.tsx

import React from "react";

//
// Profile Page Component
// A simple page that shows a heading and a paragraph.
// Feel free to tweak the text or styling as you like!
//

const Profile = () => {
  // In a real app, you might fetch user data here
  // but for now, we just show some static text.

  return (
    <div style={{ padding: "20px" }}>
      {/* A big heading for the Profile page */}
      <h1>Profile Page</h1>

      {/* A little paragraph to welcome the user */}
      <p>
        Welcome to your profile. You can customize this page with user info,
        settings, and more! 🙂
      </p>
    </div>
  );
};

export default Profile;
