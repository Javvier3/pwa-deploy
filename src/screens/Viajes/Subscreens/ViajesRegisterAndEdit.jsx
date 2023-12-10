import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Layout, Row, Col } from "antd";
import CardViajesRegisterEdit from "../../../components/Cards/CardViajesRegisterEdit";
import ParadasTable from "../../../components/Table/RutasTable";
import '../Viajes.css';
const ViajesRegisterAndEdit = () => {
  return (
    <>
      <Sidebar>
        <Layout>

          <Row gutter={60}>
            <CardViajesRegisterEdit/>
          </Row>

          {/* Espacio considerable abajo de las tarjetas */}
          <Row gutter={10} style={{ marginBottom: "35px" }}>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                <h1 style={{textAlign:"center", fontFamily:"CircularSTD"}}>
                    Listado de rutas</h1>
          </Col>
          </Row>

          {/* Segunda fila con la tabla */}
          <Row>
            <Col xs={24}>
                <ParadasTable/>
            </Col>
          </Row>
          
        </Layout>
      </Sidebar>
    </>
  );
};

export default ViajesRegisterAndEdit;
