import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { background, buttonStyles } from "../styles";

const Dashboard: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [addFriendModal, SetAddFriendModal] = useState<boolean>(false);

  const { Text } = Typography;

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

  const handleAddFriendModal = () => {
    SetAddFriendModal(!addFriendModal);
  };

  return (
    <div style={background}>
      {!loading && (
        <div>
          <Card
            title={
              <div style={{ display: "flex" }}>
                <Text style={{ fontSize: "28px", flex: "1 1 auto" }}>
                  Dashboard
                </Text>
                <Space size="large">
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleAddFriendModal}
                    style={{
                      ...buttonStyles,
                      flex: "0 0 auto",
                    }}
                  >
                    <PlusOutlined />
                    Add Friends
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      ...buttonStyles,
                      flex: "0 0 auto",
                      backgroundColor: "green",
                      borderColor: "green",
                    }}
                  >
                    <PlusOutlined /> Add Expenses
                  </Button>
                </Space>
              </div>
            }
            style={{
              width: "75%",
              margin: "auto",
              borderRadius: "15px",
            }}
          >
            <h2>Hello {userEmail}</h2>
          </Card>
          <Modal
            title="Add Friend"
            visible={addFriendModal}
            onCancel={handleAddFriendModal}
            footer={null}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
