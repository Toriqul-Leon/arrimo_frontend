import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {useContext} from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import styles from "../SignUp/SignUp.module.css";

export default function AddUser({ toggle }) {
    const { addUser } = useContext(GlobalContext);
  // signup
  const signUp = async (values) => {
    if(values.password !== values.confirm_password) {
        return alert("Password does not match")
    }
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.name,
      }),
    });
    const data = await res.json();

    if(data.success) {
        addUser(data.user)
        toggle();
    } else {
        alert(data.message)
    }
  };


  return (
    <section>
      <article>
        <div>
          <h1>Welcome</h1>
          <Form
            name="normal_signup"
            initialValues={{
              remember: true,
            }}
            onFinish={signUp}
          >

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                className={styles.input}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                status="error"
              />
            </Form.Item>

            <Form.Item
                name="name"
                rules={[
                    {
                    required: true,
                    message: "Your Full Name!",
                    },
                ]}
                >
                <Input
                    className={styles.input}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Name"
                />
            </Form.Item>

            

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                className={styles.input}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
                name="confirm_password"
                rules={[
                    {
                    required: true,
                    message: "Confirm your Password!",
                    },
                ]}
                >
                <Input
                    className={styles.input}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginButton}
              >
                Add User
              </Button>
            </Form.Item>
          </Form>
        </div>
      </article>
    </section>
  );
}
