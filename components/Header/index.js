import styles from "./Header.module.css";
import { signOut } from "next-auth/react";
import { Menu } from 'antd'

function getItem(
    label,
    key,
    icon,
    children,
    theme
  ) {
    return {
      key,
      icon,
      children,
      label,
      theme,
    };
  }

const style = { 
    width: "5rem", 
    borderRadius: "6px", 
    height: "3rem",
    padding: "0", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    alignItems: "center", 
    border: "none"
}
  

export default function Header({ name }) {

      const items = [
        getItem(
            <p className={styles.avatar}>{name.split('')[0]}</p>,
          'sub1',
          null,
          [getItem(<button className={styles.btn} onClick={() => signOut()}>Sign out</button>)]
        ),
      ];

    return (
        <header className={styles.header}>
            <div>
                <h3>Event Manager</h3>
            </div>

            <div className={styles.user}>
                    
                     <h3 className={styles.name}>{name}</h3>
                     
                    <Menu
                        style={style}
                        selectedKeys={['sub1']}
                        mode="vertical"
                        theme="light"
                        items={items}
                    />

            </div>
        </header>

    )
}