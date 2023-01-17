import { Button, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./SignIn.module.css";

export default function SignIn({ setShow }) {

  // Sign In
  const onSubmit = async (values) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: "",
    });
    console.log("result", result);
  };

  return (
    <section className={styles.signInForm}>
      <article className={styles.signInCard}>
        <div>
          <h1>Welcome</h1>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onSubmit}
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginButton}
              >
                Log in
              </Button>
            </Form.Item>
            Or{" "}
            <div onClick={() => setShow("signup")} className={styles.registerNow}>
              register now!
            </div>
          </Form>
        </div>
      </article>
    </section>
  );
}
