import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Layout, Row, Col } from "antd";
import CardParadasMaps from "../../../components/Cards/CardParadasMaps";



const ParadasRegisterAndEdit = () => {
  return (
    <>
      <Sidebar>
        <Layout>
          <Row gutter={60}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <CardParadasMaps/>
            </Col>
          </Row>

        </Layout>
      </Sidebar>
    </>
  );
};

export default ParadasRegisterAndEdit;
