import React from "react";
import { Card, Select, DatePicker, Col, Row } from "antd";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  CarOutlined,
} from "@ant-design/icons";
import "../../screens/Viajes/Viajes.css";

const { Meta } = Card;

const CardViajesRegisterEdit = () => {
  return (
    <>
      <Col xs={0} sm={10} md={10} lg={10} xl={10}>
        <Card className="cardsita" title="Información general del viaje" style={{ height: "100%" }}>
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
              description="Sin asignar"
              style={{ marginRight: "25px" }}
            />

            <EnvironmentOutlined
              style={{
                fontSize: "24px",
                color: "#FB1506",
                marginRight: "10px",
              }}
            />
            <Meta title="Punto de Destino" description="Sin asignar" />
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
            <DatePicker style={{ width: "100%" }} />
          </Row>
        </Card>
      </Col>

      <Col xs={0} sm={14} md={14} lg={14} xl={14}>
        <Card className="cardsita" title="Información general del transporte" style={{ height: "100%" }}>
          <Row style={{ marginBottom: "18px" }}>
            <Col style={{marginRight:"110px", marginLeft:"30px"}}>
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
                defaultValue="Sin asignar"
                style={{
                  width: 150,
                  marginTop:"5px",
                  marginLeft:"35px"
                }}
                options={[]}
              />
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
                <Meta
                  title="Unidad asignada"
                  style={{ marginRight: "25px" }}
                />
              </Row>

              <Select
                defaultValue="Sin asignar"
                style={{
                  width: 150,
                  marginTop:"5px",
                  marginLeft:"35px"
                }}
                options={[]}
              />
            </Col>
          </Row>


        </Card>
      </Col>
    </>
  );
};

export default CardViajesRegisterEdit;
