import { Fragment } from "react";
import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { Divider } from "antd";

const App: () => JSX.Element = () => {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Divider style={{ margin: "0px" }} />
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
