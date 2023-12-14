import React from "react";
import { Row, Col } from "antd";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Layout } from "antd";
import CardUnidadesEdit from "../../../components/Cards/CardUnidadesEdit";

const UnidadesEdit = () => {
 const id = localStorage.getItem("idUnidad");
  return (
    <>
      <Sidebar>
        <Layout>
          <Row justify="center" style={{ minHeight: "100vh" }}>
            <Col span={24} style={{ maxWidth: "100%" }}>
              <CardUnidadesEdit id={id}/>
            </Col>
          </Row>
        </Layout>
      </Sidebar>
    </>
  );
};

export default UnidadesEdit;
