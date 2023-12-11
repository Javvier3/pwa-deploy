// ViajesRegisterAndEdit.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Layout, Row, Col } from "antd";
import CardViajesRegisterEdit from "../../../components/Cards/CardViajesRegisterEdit";
import ParadasTable from "../../../components/Table/ParadasTable";
import { useParams } from 'react-router-dom';
import { getViajeById } from "../../../service/Viajes/serviceViajes";

const ViajesRegisterAndEdit = ({ isNew }) => {
  const [paradasData, setParadasData] = useState([]);
  const [viajeData, setViajeData] = useState(null);
  const { idViaje } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isNew && idViaje) {
          const response = await getViajeById(idViaje);
          setViajeData(response.data.object);
          setParadasData(response.data.object.ruta.paradas);
        } else {

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isNew, idViaje]);


  return (
    <>
      <Sidebar>
        <Layout>
          <Row gutter={60}>
            <CardViajesRegisterEdit paradasData={paradasData} viajeData={viajeData} />
          </Row>

          <Row gutter={10} style={{ marginBottom: "35px" }}>
            <Col xs={24} sm={24} md={0} lg={0} xl={0}>
              <h1 style={{ textAlign: "center", fontFamily: "CircularSTD" }}>
                Listado de rutas
              </h1>
            </Col>
          </Row>

          <Row>
            <Col xs={24}>
              <ParadasTable paradasData={paradasData} setParadasData={setParadasData} />
            </Col>
          </Row>
          
        </Layout>
      </Sidebar>
    </>
  );
};

export default ViajesRegisterAndEdit;
