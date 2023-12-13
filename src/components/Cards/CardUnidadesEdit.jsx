import React, { useState, useEffect } from 'react';
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
import { getVehiculoById, saveVehiculo, updateVehiculo } from '../../service/unidades/serviceUnidades';

import dayjs from 'dayjs'
import es from 'dayjs/locale/es'

dayjs.locale('es')


const { Option } = Select;
const { Meta } = Card;

const validationSchema = Yup.object().shape({
  alias: Yup.string()
    .min(3, "El alias de la unidad debe contener al menos 3 caracteres")
    .max(12, "El alias de la unidad es muy grande")
    .matches(
      /^[a-zA-Z0-9]*$/,
      "El alias de la unidad solo puede contener letras y numeros"
    )
    .required("El campo Alias es requerido"),
  anio: Yup.date()
    .required("El campo Año es requerido"),
  tipo: Yup.string()
    .required("El campo Tipo es requerido"),
  marca: Yup.string()
    .min(3, "La marca de la unidad debe contener al menos 3 letras")
    .max(16, "La marca de la unidad es muy grande")
    .matches(
      /^[a-zA-Z\s]+$/,
      "La marca de la unidad solo puede contener letras y espacios"
    )
    .required("El campo Marca es requerido"),
  modelo: Yup.string()
    .min(3, "El modelo de la unidad debe contener al menos 3 letras")
    .max(16, "El modelo de la unidad es muy grande")
    .matches(
      /^[a-zA-Z\s]+$/,
      "El modelo de la unidad solo puede contener letras y espacios"
    )
    .required("El campo Modelo es requerido"),
});

const CardUnidadesEdit = () => {

  const [vehiculoData, setVehiculoData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVehiculoById(localStorage.getItem('idUnidad'));
        setVehiculoData(response.data.object);
      } catch (error) {
        // Handle error here
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Use default values or provide fallbacks for the properties to avoid potential errors
  const initialValues = {
    alias: vehiculoData.alias || '',
    anio: dayjs().set('year', vehiculoData.anio).startOf('year') || dayjs(),
    tipo: vehiculoData.tipo,
    marca: vehiculoData.marca || '',
    modelo: vehiculoData.modelo || '',
    
  };

  console.log(vehiculoData)
  
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
      
      const result = await Swal.fire({
        title: "Seguro de que quieres editar la unidad?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        confirmButtonColor: "#7280FF",
        denyButtonText: `Cancelar`,
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        let numAsientos = values.tipo === "Carro" ? 4 : 20;

        console.log(localStorage.getItem('idUnidad'))
        const res = await updateVehiculo(
          values.anio.year(),
          values.marca,
          values.modelo,
          values.tipo,
          numAsientos,
          values.alias,
          localStorage.getItem('idUnidad')
        );

        console.log(res);

        if (!res.data.error) {
          Swal.fire("Actualización realizada con éxito", "", "success").then(() => {
            window.location.href = "/unidades";
          });
        } else {
          Swal.fire("No se pudo realizar la actualización", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Cambios cancelados", "", "info");
      }
        
    } catch (error) {
      console.error(error);
      Swal.fire("No se pudo realizar la actualización", "", "error");
    }
  };
  

  return (
    <>
      <Card
        className="cardsita"
        title="Informacion de la unidad"
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
          enableReinitialize
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
                              name="alias"
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
                          <Field name="anio">
                            {({ field, form }) => (
                              <DatePicker
                              locale={es}
                                picker='year'
                                {...field}
                                placeholder="Año"
                                style={{ width: '100%' }}
                                onChange={(value) => form.setFieldValue(field.name, value)}
                              />
                            )}
                          </Field>
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
                            <Field name="tipo">
                              {({ field, form }) => (
                                <Select
                                  placeholder="Sin asignar"
                                  style={{ width: '100%' }}
                                  onSelect={(value) => form.setFieldValue('tipo', value)}

                                >
                                  <Option value="Carro">Carro</Option>
                                  <Option value="Camioneta">Camioneta</Option>
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
                              name="modelo"
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
                          Cancelar edición
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

export default CardUnidadesEdit;
