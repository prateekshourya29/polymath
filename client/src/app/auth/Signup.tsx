import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import { backgroundStyle } from "../styles";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
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
      password1: password1,
      password2: password2,
    };

    fetch("http://localhost:8000/api/users/auth/register/", {
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
          setPassword1("");
          setPassword2("");
          localStorage.clear();
        }
      });
  };

  return (
    <Fragment>
      {!loading && (
        <div style={backgroundStyle}>
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
                    name="password1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      value={password1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword1(e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name="password2"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm Password"
                      value={password2}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword2(e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0" }}>
                    <Button block type="primary" htmlType="submit">
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                <Button
                  type="link"
                  onClick={() =>
                    window.location.replace("http://localhost:3000/")
                  }
                >
                  Login
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      )}
    </Fragment>
  );
};

export default Signup;
