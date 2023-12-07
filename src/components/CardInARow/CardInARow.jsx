import React from "react";
import { Col } from "antd";
import "../../screens/Viajes/Viajes.css"; // Importa el archivo de estilos
import CardUnidades from "../Cards/CardUnidades";
import CardViajes from "../Cards/CardViajes";
import CardConductores from "../Cards/CardConductores";

const CardInARow = () => {
  return (
    <>
      
      <Col xs={0} sm={12} md={8} lg={8} xl={8}>
        <CardUnidades />
      </Col>
      
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <CardViajes />
      </Col>

      
      <Col xs={0} sm={12} md={8} lg={8} xl={8}>
        <CardConductores />
      </Col>
    </>
  );
};

export default CardInARow;
