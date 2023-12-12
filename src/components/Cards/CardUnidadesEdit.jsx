import React, { useState } from 'react';
import { Card, Select, DatePicker, Col, Row, Input, Upload, Button } from 'antd';
import {
  CarOutlined,
  NumberOutlined,
  FontColorsOutlined,
  PictureOutlined,
  EditOutlined,
} from '@ant-design/icons';
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Formik, Field, Form } from 'formik';
import { Link } from "react-router-dom";
import defaultimg from "../../assets/images/default.jpg"

import '../../screens/Viajes/Viajes.css';

const { Option } = Select;
const { Meta } = Card;

const validationSchema = Yup.object().shape({
  ak: Yup.string()
    .min(5, "El alias de la unidad debe contener al menos 5 caracteres")
    .max(12, "El alias de la unidad es muy grande")
    .matches(
      /^[a-zA-Z0-9]*$/,
      "El alias de la unidad solo puede contener letras y numeros"
    )
    .required("El campo Alias es requerido"),
  year: Yup.date()
    .required("El campo Año es requerido"),
  type: Yup.string()
    .required("El campo Tipo es requerido"),
  plate: Yup.string()
    .min(6, "La descripción de la parada debe contener al menos 5 letras")
    .max(8, "La descripción de la parada es muy grande")
    .matches(
      /^[a-zA-Z0-9]*$/,
      "La placa de la unidad solo puede estar compuesta por letras y numeros"
    )
    .required("El campo Placa es requerido"),
  marca: Yup.string()
    .min(5, "La marca de la unidad debe contener al menos 5 letras")
    .max(16, "La marca de la unidad es muy grande")
    .matches(
      /^[a-zA-Z\s]+$/,
      "La marca de la unidad solo puede contener letras y espacios"
    )
    .required("El campo Marca es requerido"),
  model: Yup.string()
    .min(5, "El modelo de la unidad debe contener al menos 5 letras")
    .max(16, "El modelo de la unidad es muy grande")
    .matches(
      /^[a-zA-Z\s]+$/,
      "El modelo de la unidad solo puede contener letras y espacios"
    )
    .required("El campo Modelo es requerido"),
});

const CardUnidadesRegisterEdit = () => {

  const [markers, setMarkers] = useState([]);

  const initialValues = {
    ak: "",
    year: "",
    type: "",
    plate: "",
    marca: "",
    model: "",
  };
  const [image, setImage] = useState(null);

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };
  
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const beforeUpload = (file) => {
    // Permite solo un archivo
    if (image) {
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (values) => {
    try {
      if (markers && markers.length > 0) {
        const result = await Swal.fire({
          title: "Seguro de que quieres registrar la unidad?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Registrar",
          confirmButtonColor: "#7280FF",
          denyButtonText: `Cancelar`,
          cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
          /*
          CONSUMO

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
          */
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
        title="Editar informacion de la unidad"
        style={{ height: "100%" }}
      >

        <Row style={{ marginBottom: "18px", justifyContent: "center" }} gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={8} xl={6}>
          <Meta
              title="Imagen"
              description={
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px', // Ajusta el valor según tus preferencias
                      overflow: 'hidden',
                      margin: '0 auto',
                    }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt="Preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '12px', // Ajusta el valor igual que arriba
                        }}
                      />
                    ) : (
                      <img
                        src={defaultimg}
                        alt="Default"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '12px', // Ajusta el valor igual que arriba
                        }}
                      />
                    )}
                  </div>

                  {/* Botón para seleccionar imagen */}
                  <Upload
                    customRequest={dummyRequest}
                    showUploadList={true}
                    onChange={handleImageChange}
                    onRemove={handleRemoveImage}
                    beforeUpload={beforeUpload}
                    accept="image/*"
                    multiple={false}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, seleccione una imagen',
                      },
                    ]}
                    style={{ marginTop: '8px' }}
                  >
                    <Button icon={<PictureOutlined />} style={{ width: '100%' }}>
                      Seleccionar Imagen
                    </Button>
                  </Upload>
                </div>
              }
            />
          </Col>
        </Row>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, isValid }) => (
            <Form>
              <Row
                gutter={100}
                style={{ marginBottom: "18px", justifyContent: "center" }}
              >
                <Col>

                  <Row style={{ marginBottom: '18px' }} gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Meta
                        title={
                          <Row>
                            Alias<span style={{ color: 'red' }}>*</span>
                          </Row>
                        }
                        description={
                          <Row>
                            <Field
                              type="text"
                              name="ak"
                              as={Input}
                              placeholder="Sin asignar"
                              prefix={<FontColorsOutlined style={{ color: 'red' }} />}
                              style={{ width: '100%' }}
                            />
                          </Row>
                        }
                      />
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Meta
                        title={
                          <Row>
                            Año<span style={{ color: 'red' }}>*</span>
                          </Row>
                        }
                        description={
                          <Row>
                            <Field name="year">
                              {({ field, form }) => (
                                <DatePicker
                                  {...field}
                                  placeholder="Año"
                                  style={{ width: '100%' }}
                                  onChange={(date) => form.setFieldValue('year', date)}
                                />
                              )}
                            </Field>
                          </Row>
                        }
                      />
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: '18px' }} gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Meta
                        title={
                          <Row>
                            Tipo<span style={{ color: 'red' }}>*</span>
                          </Row>
                        }
                        description={
                          <Row>
                            <Field name="type">
                              {({ field, form }) => (
                                <Select
                                  {...field}
                                  placeholder="Tipo"
                                  style={{ width: '100%' }}
                                  onSelect={(value) => form.setFieldValue('type', value)}
                                >
                                  <Option value="Automovil">Automóvil</Option>
                                  <Option value="Van">Van</Option>
                                </Select>
                              )}
                            </Field>
                          </Row>
                        }
                      />
                    </Col>

                  </Row>

                  <Row style={{ marginBottom: '18px' }} gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Meta
                        title={
                          <Row>
                            Marca<span style={{ color: 'red' }}>*</span>
                          </Row>
                        }
                        description={
                          <Row>
                            <Field
                              type="text"
                              name="marca"
                              as={Input}
                              placeholder="Sin asignar"
                              prefix={<CarOutlined style={{ color: 'red' }} />}
                            />
                          </Row>
                        }
                      />
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Meta
                        title={
                          <Row>
                            Modelo<span style={{ color: 'red' }}>*</span>
                          </Row>
                        }
                        description={
                          <Row>
                            <Field
                              type="text"
                              name="model"
                              as={Input}
                              placeholder="Sin asignar"
                              prefix={<CarOutlined style={{ color: 'red' }} />}
                            />
                          </Row>
                        }
                      />
                    </Col>
                  </Row>

                  {Object.keys(errors).length > 0 && (
                    <div style={{ color: 'red', background: '#BDC3FF', padding: '10px', marginBottom: '10px', borderRadius: '10px' }}>
                      <p style={{ fontWeight: 'bold' }}>Hay errores en el formulario. Por favor, revísalos:</p>
                      <ul>
                        {Object.keys(errors).map((fieldName, index) => (
                          <li key={index}>{errors[fieldName]}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Row
                    gutter={16}
                    style={{
                      marginBottom: '18px',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Col>
                      <Link to="/unidades">
                        <Button
                          type="primary"
                          style={{
                            fontFamily: 'CircularSTD',
                            background: '#FB1506',
                          }}
                        >
                          Cancelar
                        </Button>
                      </Link>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        htmlType="submit"
                        style={{
                          fontFamily: 'CircularSTD',
                          background: isValid ? '#7280FF' : '#B9C0FF',
                        }}
                        disabled={!isValid}
                      >
                        Editar unidad
                      </Button>
                    </Col>
                  </Row>

                </Col>
              </Row>
            </Form>
          )}
        </Formik>

      </Card>
    </>
  );
};

export default CardUnidadesRegisterEdit;
