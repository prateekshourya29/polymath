import React, { useState, useEffect } from "react";
import { backgroundStyle } from "../styles";

const Dashboard: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.replace("http://localhost:3000/");
    } else {
      fetch("http://localhost:8000/api/users/auth/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserEmail(data.email);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div>
      {!loading && (
        <div style={backgroundStyle}>
          <h1>Dashboard</h1>
          <h2>Hello {userEmail}</h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
