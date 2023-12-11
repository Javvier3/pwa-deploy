// CardViajesRegisterEdit.jsx
import React, { useState, useEffect } from "react";
import { Card, Select, DatePicker, Col, Row } from "antd";
import { ConfigProvider } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import dayjs from "dayjs";
import "dayjs/locale/es";

import {
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  CarOutlined,
} from "@ant-design/icons";
import "../../screens/Viajes/Viajes.css";
import { getAllConductores } from "../../service/conductores/serviceConductores";
import { getAllVehiculos } from "../../service/unidades/serviceUnidades";

const { Meta } = Card;

const CardViajesRegisterEdit = ({ viajeData }) => {
  const [conductores, setConductores] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [selectedConductor, setSelectedConductor] = useState("Sin asignar");
  const [selectedUnidad, setSelectedUnidad] = useState("Sin asignar");

  useEffect(() => {
    // Cargar datos de conductores y unidades al montar el componente
    const fetchConductores = async () => {
      try {
        const res = await getAllConductores();
        setConductores(res.data.object || []);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUnidades = async () => {
      try {
        const res = await getAllVehiculos();
        console.log(res.data.object);
        setUnidades(res.data.object || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConductores();
    fetchUnidades();
  }, []);

  return (
    <>
      <Col xs={0} sm={10} md={10} lg={10} xl={10}>
        <Card
          className="cardsita"
          title="Información general del viaje"
          style={{ height: "100%" }}
        >
          <Row
            style={{
              marginBottom: "18px",
              justifyContent: "", // Distribuye los elementos horizontalmente
            }}
          >
            <EnvironmentOutlined
              style={{
                fontSize: "24px",
                color: "#FB1506",
                marginRight: "10px",
              }}
            />
            <Meta
              title="Punto de Origen"
              description={
                viajeData ? viajeData.ruta.paradas[0].nombre : "Sin asignar"
              }
              style={{ marginRight: "25px" }}
            />

            <EnvironmentOutlined
              style={{
                fontSize: "24px",
                color: "#FB1506",
                marginRight: "10px",
              }}
            />
            <Meta
              title="Punto de Destino"
              description={
                viajeData
                  ? viajeData.ruta.paradas.slice(-1)[0].nombre
                  : "Sin asignar"
              }
            />
          </Row>

          <Row>
            <CalendarOutlined
              style={{
                fontSize: "24px",
                color: "#FB1506",
                marginBottom: "10px",
              }}
            />
            <Meta title="Fecha de Viaje" style={{ marginLeft: "10px" }} />

            <ConfigProvider locale={locale}>
              <DatePicker
                style={{ width: "100%" }}
                value={
                  viajeData
                    ? dayjs(viajeData.fechaViaje, "YYYY-MM-DD")
                    : undefined
                }
              />
            </ConfigProvider>
          </Row>
        </Card>
      </Col>

      <Col xs={0} sm={14} md={14} lg={14} xl={14}>
        <Card
          className="cardsita"
          title="Información general del transporte"
          style={{ height: "100%" }}
        >
          <Row style={{ marginBottom: "18px" }}>
            <Col style={{ marginRight: "110px", marginLeft: "30px" }}>
              <Row>
                <UserOutlined
                  style={{
                    fontSize: "24px",
                    color: "#FB1506",
                    marginRight: "10px",
                  }}
                />
                <Meta
                  title="Conductor asignado"
                  style={{ marginRight: "25px" }}
                />
              </Row>

              <Select
                value={(viajeData ? viajeData.conductor.usuario.nombre : selectedConductor)}
                style={{ width: 200, marginTop: "5px", marginLeft: "35px" }}
                onChange={(value) => setSelectedConductor(value)}
              >
                <Select.Option value="Sin asignar">Sin asignar</Select.Option>
                {conductores.map((conductor) => (
                  <Select.Option
                    key={conductor.idConductor}
                    value={conductor.usuario.nombre}
                  >
                    {conductor.usuario.nombre}
                  </Select.Option>
                ))}
              </Select>

            </Col>

            <Col>
              <Row>
                <CarOutlined
                  style={{
                    fontSize: "24px",
                    color: "#FB1506",
                    marginRight: "10px",
                  }}
                />
                <Meta title="Unidad asignada" style={{ marginRight: "25px" }} />
              </Row>

              <Select
                value={ viajeData? `${viajeData.vehiculo.marca} ${viajeData.vehiculo.modelo} ${viajeData.vehiculo.alias}` : selectedUnidad}
                style={{
                  width: 200,
                  marginTop: "5px",
                  marginLeft: "35px",
                }}
                onChange={(value) => setSelectedUnidad(value)}
              >
                <Select.Option value="Sin asignar">Sin asignar</Select.Option>
                {unidades.map((unidad) => (
                  <Select.Option
                    key={unidad.idVehiculo}
                    value={unidad.idVehiculo.toString()}
                  >
                    {`${unidad.marca} ${unidad.modelo} (${unidad.alias})`}
                  </Select.Option>
                ))}
              </Select>


            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default CardViajesRegisterEdit;
