import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { background } from "../styles";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { Text } = Typography;

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      window.location.replace("http://localhost:3000/dashboard");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    fetch("http://localhost:8000/api/users/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem("token", data.key);
          window.location.replace("http://localhost:3000/dashboard");
        } else {
          setEmail("");
          setPassword("");
          localStorage.clear();
        }
      });
  };

  return (
    <div style={background}>
      {!loading && (
        <Card style={{ width: 400, margin: "auto" }}>
          <Row>
            <Col
              span={22}
              offset={1}
              style={{ textAlign: "center", paddingBottom: "40px" }}
            >
              <Text style={{ fontSize: "20px" }}>Polymath</Text>
            </Col>
            <Col span={22} offset={1} style={{ textAlign: "center" }}>
              <Form name="login-form" onSubmitCapture={onSubmit}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="E-mail"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: "0" }}>
                  <Button block type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col>
              <Button
                type="link"
                onClick={() =>
                  window.location.replace("http://localhost:3000/signup")
                }
              >
                Sign Up
              </Button>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default Login;
