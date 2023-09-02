import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Divider } from "antd";
import "antd/dist/antd.min.css";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

const App: React.FunctionComponent = () => {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Divider className="divider" style={{ margin: "0px" }} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
