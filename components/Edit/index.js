import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import styles from "./Edit.module.css";

export default function Edit({ user, editToggle }) {
  const { editUser } = useContext(GlobalContext);

  // Sign In
  const editUserFunc = async (values) => {
    if (!values.name && !values.email) {
      return alert("Please fill in the form");
    }

    if (user.name === values.name) {
      return alert("Please change your name");
    }

    if (user.email === values.email) {
      return alert("Please change your email");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/edit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          id: user._id,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      editUser(data.user, user._id);
      editToggle();
    }
  };

  return (
    <section>
      <article>
        <div>
          <Form
            name="normal_login"
            initialValues={{
              remember: false,
            }}
            onFinish={editUserFunc}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: false,
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
              name="name"
              rules={[
                {
                  required: false,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input
                className={styles.input}
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="text"
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginButton}
              >
                Edit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </article>
    </section>
  );
}
