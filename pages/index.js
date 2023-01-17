import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Users from "../components/Users";
import { Col, Row } from 'antd';
import { Modal } from "modal-rt";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    router.push("/signin")
  }

  if(status === "authenticated") {
    return (
      <div>
        <Header name={session?.user?.user?.name} />

        <Row>
          <Col xs={24} xl={12}><Users /></Col>
          <Col xs={24} xl={12}>Events</Col>
        </Row>

        <Modal />
      </div>
    );
  }

}
