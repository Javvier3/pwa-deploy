import React from "react";
import { Row, Col } from "antd";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Layout } from "antd";
import ConductoresRegisterCard from "../../../components/Cards/ConductoresRegisterCard";

const ConductoresRegister = () => {
  return (
    <>
      <Sidebar>
        <Layout>
          <Row justify="center" style={{ minHeight: "100vh" }}>
            <Col span={24} style={{ maxWidth: "100%" }}>
              <ConductoresRegisterCard />
            </Col>
          </Row>
        </Layout>
      </Sidebar>
    </>
  );
};

export default ConductoresRegister;
