import { Card } from "antd";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import "./Users.module.css";
import { List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import Edit from "../Edit";
import AddUser from "../AddUser";
import styles from "./Users.module.css";

const count = 3;
const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api/users`;

export default function Users() {
  const [initLoading, setInitLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const { users, deleteUser, addUsers } = useContext(GlobalContext);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        addUsers(res.users);
      });
  }, []);

  const deleteUserById = async (id) => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          deleteUser(id);
        }
      });
  };

  const editToggle = async (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const addUserToggler = () => {
    setAddIsModalOpen(true);
  };

  return (
    <div>
      <Modal
        title="Edit User"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Edit user={selectedUser} editToggle={() => setIsModalOpen(false)} />
      </Modal>

      <Modal
        title="Add User"
        open={isAddModalOpen}
        onOk={() => setAddIsModalOpen(false)}
        onCancel={() => setAddIsModalOpen(false)}
      >
        <AddUser toggle={() => setAddIsModalOpen(false)} />
      </Modal>

      <div className={styles.card}>
        <Card
          type="inner"
          title="Users"
          extra={<a onClick={addUserToggler}>Add User</a>}
        >
          <List
            className="demo-loadmore-list"
            style={{ width: "100%" }}
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a onClick={() => editToggle(item)} key="list-loadmore-edit">
                    Edit
                  </a>,
                  <a
                    key="list-loadmore-more"
                    onClick={() => deleteUserById(item._id)}
                  >
                    Delete
                  </a>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta title={item.name} description={item.email} />
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
}
