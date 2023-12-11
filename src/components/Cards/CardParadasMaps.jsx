import React from "react";
import { useState } from "react";
import { Card, Col, Row, Input, Button } from "antd";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { saveOrUpdateParada } from "../../service/Paradas/serviceParadas";
import {
  PushpinOutlined,
  ScheduleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../screens/Viajes/Viajes.css";

import Mapita from "../Map/Mapita";

const { Meta } = Card;

const validationSchema = Yup.object().shape({
  nombreParada: Yup.string()
    .min(5, "El nombre de la parada debe contener al menos 5 letras")
    .max(50, "El nombre de la parada es muy grande")
    .matches(
      /^[a-zA-Z\s]+$/,
      "El nombre de la parada solo puede contener letras y espacios"
    )
    .required("Este campo es requerido"),

  descripcionParada: Yup.string()
    .min(5, "La descripción de la parada debe contener al menos 5 letras")
    .max(50, "La descripción de la parada es muy grande")
    .matches(
      /^[a-zA-Z\s]+$/,
      "La descripción de la parada solo puede contener letras y espacios"
    )
    .required("Este campo es requerido"),
});

const CardParadasMaps = () => {

  const [markers, setMarkers] = useState([]);

  const initialValues = {
    nombreParada: "",
    descripcionParada: "",
  };


  const handleFormSubmit = async (values) => {
    try {
      if (markers && markers.length > 0) {
        const result = await Swal.fire({
          title: "Seguro de que quieres registrar la parada?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Registrar",
          confirmButtonColor: "#7280FF",
          denyButtonText: `Cancelar`,
          cancelButtonText: "Cancelar",
        });
  
        if (result.isConfirmed) {
          await saveOrUpdateParada(
            values.nombreParada,
            values.descripcionParada,
            markers[0].lat,
            markers[0].lng
          )
            .then((res) => {
              if (res.data.message === "Ok") {
                Swal.fire("Registro realizado con éxito", "", "success").then(() => {
                  window.location.href = "/viajesRegister";
                });
              } else {
                Swal.fire("No se pudo realizar el registro", "", "error");
              }
            })
            .catch((error) => {
              console.error(error);
              Swal.fire("No se pudo realizar el registro", "", "error");
            });
        } else if (result.isDenied) {
          Swal.fire("Cambios cancelados", "", "info");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: "No puedes registrar una parada sin coordenadas, por favor, ingresa una ubicación válida.",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <Card
        className="cardsita"
        title="Información general de la parada"
        style={{ height: "100%" }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          <Form>
            <Row
              gutter={100}
              style={{ marginBottom: "18px", justifyContent: "center" }}
            >
              <Col>
                <Row style={{ marginBottom: "8px" }}>
                  <PushpinOutlined
                    style={{
                      fontSize: "24px",
                      color: "#FB1506",
                      marginRight: "8px",
                    }}
                  />
                  <Meta
                    title="Nombre de la parada"
                    style={{ marginRight: "8px" }}
                  />
                </Row>
                <Field
                  type="text"
                  name="nombreParada"
                  as={Input}
                  placeholder="Sin asignar"
                  style={{ marginTop: "5px", marginLeft: "8px" }}
                />
                <ErrorMessage
                  name="nombreParada"
                  component="div"
                  style={{
                    color: "#FB1506",
                    marginLeft: "8px",
                    marginTop: "10px",
                    fontFamily: "CircularSTD",
                  }}
                />
                <Link to="/viajesRegister">
                  <Button
                    type="primary"
                    style={{
                      marginTop: "15px",
                      marginLeft: "8px",
                      marginBottom: "16px",
                      fontFamily: "CircularSTD",
                      background: "#FB1506",
                    }}
                  >
                    Cancelar registro
                  </Button>
                </Link>
              </Col>
              <Col>
                <Row style={{ marginBottom: "8px" }}>
                  <ScheduleOutlined
                    style={{
                      fontSize: "24px",
                      color: "#FB1506",
                      marginRight: "8px",
                    }}
                  />
                  <Meta
                    title="Descripción de la parada"
                    style={{ marginRight: "8px" }}
                  />
                </Row>
                <Field
                  type="text"
                  name="descripcionParada"
                  as={Input.TextArea}
                  placeholder="Sin asignar"
                  style={{ marginTop: "5px", marginLeft: "8px" }}
                />
                <ErrorMessage
                  name="descripcionParada"
                  component="div"
                  style={{
                    color: "#FB1506",
                    marginLeft: "8px",
                    marginTop: "10px",
                    fontFamily: "CircularSTD",
                  }}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  htmlType="submit"
                  style={{
                    marginTop: "15px",
                    marginLeft: "8px",
                    marginBottom: "16px",
                    fontFamily: "CircularSTD",
                    background: "#7280FF",
                  }}
                >
                  Agregar parada
                </Button>
              </Col>
            </Row>
          </Form>
        </Formik>

        <Mapita markers={markers} setMarkers={setMarkers} />
      </Card>
    </>
  );
};

export default CardParadasMaps;
