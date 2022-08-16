import { LogoutOutlined } from "@ant-design/icons";
import { Button, Popover, Typography } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { Fragment, useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const { Text } = Typography;

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setIsAuth(true);
    }
  }, []);

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  const close = () => {
    setVisible(false);
  };

  const handleLogout = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/users/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        window.location.replace("http://localhost:3000/");
      });
  };

  return (
    <Header
      style={{
        zIndex: 1,
        width: "100%",
        marginBottom: "5px",
        backgroundColor: "white",
        display: "flex",
      }}
    >
      <Text style={{ fontSize: "24px", flex: "1 1 auto" }}>Polymath</Text>
      {isAuth && (
        <Popover
          placement="bottomRight"
          title="Are you sure you want to logout?"
          visible={visible}
          onVisibleChange={handleVisibleChange}
          content={
            <Fragment>
              <Button
                type="primary"
                ghost
                style={{ marginRight: "15px" }}
                onClick={handleLogout}
              >
                Yes
              </Button>
              <Button danger onClick={close}>
                No
              </Button>
            </Fragment>
          }
          trigger="click"
        >
          <Button
            type="text"
            size="large"
            style={{
              fontSize: "18px",
              flex: "0 0 auto",
              margin: "auto",
            }}
          >
            Logout <LogoutOutlined style={{ fontSize: "16px" }} />
          </Button>
        </Popover>
      )}
    </Header>
  );
};

export default Navbar;
