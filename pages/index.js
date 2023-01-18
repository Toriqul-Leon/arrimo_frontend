import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Users from "../components/Users";
import { Col, Row } from "antd";
import Calender from "../components/Calender";
import SideNav from "../components/SideNav";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { display } = useContext(GlobalContext);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  if (status === "authenticated") {
    return (
      <div>
        <Header name={session?.user?.user?.name} />

        <SideNav />

        <Row style={{ marginLeft: "8rem", marginTop: "4rem" }}>
          {display === "users" ? (
            <Col xs={24} xl={24}>
              <Users />
            </Col>
          ) : (
            <Col xs={24} xl={24}>
              <Calender></Calender>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}
