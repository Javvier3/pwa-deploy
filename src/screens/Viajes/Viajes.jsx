import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Layout, Row, Col} from "antd";
import CardInARow from "../../components/CardInARow/CardInARow";


const Viajes = () => {
  return (
    <Sidebar>
      <Layout>
        <Row gutter={70}>
          <CardInARow/>
        </Row>

        <Row>
          <Col span={24}>
          </Col>
        </Row>
      </Layout>
    </Sidebar>
  );
};

export default Viajes;
