import { Button, Checkbox, Form, Input } from "antd";
import { blue } from "@ant-design/colors";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    router.push("/");
  }

  // signup
  const signUp = async (values) => {
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
    if (data.success !== false) {
      router.push("/signin");
    } else {
      alert("Email already exists");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <Form
        name="normal_signup"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={signUp}
      >
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
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>

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
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign Up
          </Button>
          or <Link href="/signin">Sign In</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
