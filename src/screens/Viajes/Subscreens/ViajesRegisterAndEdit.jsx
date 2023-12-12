import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Layout, Row, Col, ConfigProvider as AntdConfigProvider } from "antd";
import CardViajesRegisterEdit from "../../../components/Cards/CardViajesRegisterEdit";
import ParadasTable from "../../../components/Table/ParadasTable";
import { useParams } from 'react-router-dom';
import { getViajeById } from "../../../service/Viajes/serviceViajes";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { Formik, Form } from "formik";

import locale from "antd/es/date-picker/locale/es_ES";
import "dayjs/locale/es";

dayjs.extend(customParseFormat);

const ViajesRegisterAndEdit = ({ isNew }) => {
  const [paradasData, setParadasData] = useState([]);
  const [viajeData, setViajeData] = useState(null);
  const [fecha, setFecha] = useState("0000-00-00");
  let [nuevoViajeData, setNuevoViajeData] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [nombreViaje, setNombreViaje] = useState("")
  const [selectedConductor, setSelectedConductor] = useState(viajeData ? viajeData.conductor.idConductor : "Sin asignar");
  const [selectedUnidad, setSelectedUnidad] = useState(viajeData ? `${viajeData.vehiculo.marca} ${viajeData.vehiculo.modelo} ${viajeData.vehiculo.alias}` : "Sin asignar");
  const { idViaje } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isNew && idViaje) {
          const response = await getViajeById(idViaje);
          setViajeData(response.data.object);
        } else {

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isNew, idViaje]);


    nuevoViajeData = {
    "fechaViaje": dayjs(fecha).format("YYYY-MM-DD"),
    "nombre": nombreViaje,
    "num_asientos_disponibles": 0,
    "vehiculo": selectedUnidad,
    "conductor": selectedConductor
  };
  

  return (
    <>
    <AntdConfigProvider locale={locale}>
      <Sidebar>
        <Layout>
          <Formik >
            <Form>
              <Row gutter={60}>
                <CardViajesRegisterEdit 
                nombreViaje={nombreViaje}
                setNombreViaje={setNombreViaje}
                paradasData={paradasData}
                viajeData={viajeData}
                selectedConductor={selectedConductor}
                setSelectedConductor={setSelectedConductor}
                selectedUnidad={selectedUnidad}
                setSelectedUnidad={setSelectedUnidad}
                setFecha={setFecha}
                fecha={fecha}
                />
              </Row>
            </Form>
          </Formik>
          

          <Row gutter={10} style={{ marginBottom: "35px" }}>
            <Col xs={24} sm={24} md={0} lg={0} xl={0}>
              <h1 style={{ textAlign: "center", fontFamily: "CircularSTD" }}>
                Listado de rutas
              </h1>
            </Col>
          </Row>

          <Row>
            <Col xs={24}>
              <ParadasTable paradasData={paradasData} 
              setParadasData={setParadasData} 
              setViajeData={setViajeData}
              viajeData={viajeData}
              selectedRowKeys={selectedRowKeys}
              setSelectedRowKeys={setSelectedRowKeys}
              isNew={isNew}
              idViaje={idViaje}
              nuevoViajeData={nuevoViajeData}
              setNuevoViajeData={setNuevoViajeData}
              />
            </Col>
          </Row>
          
        </Layout>
      </Sidebar>
      </AntdConfigProvider>
    </>
  );
};

export default ViajesRegisterAndEdit;
