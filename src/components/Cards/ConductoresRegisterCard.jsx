import React, { useState } from 'react';
import { Card, Select, DatePicker, Col, Row, Input, Upload, Button } from 'antd';
import {
  NumberOutlined,
  FontColorsOutlined,
  PictureOutlined,
  PlusOutlined,
  MailOutlined,
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Formik, Field, Form } from 'formik';
import { Link } from "react-router-dom";
import defaultimg from "../../assets/images/default.jpg"
import '../../screens/Viajes/Viajes.css';
import { saveOrUpdateConductor } from '../../service/conductores/serviceConductores';
import dayjs from 'dayjs';

const { Option } = Select;
const { Meta } = Card;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[A-Za-z\s]+$/,
      "El nombre solo puede contener letras"
    )
    .required("El campo Nombre es requerido"),
  bdayDate: Yup.date()
    .required("La fecha de cumpleaños es requerida")
    .test(
      'valid-age',
      'El conductor debe tener entre 18 y 55 años',
      (value) => {
        if (value) {
          const selectedDate = new Date(value);
          const today = new Date();

          const ageDifference = today.getFullYear() - selectedDate.getFullYear();
          selectedDate.setFullYear(today.getFullYear());
          return ageDifference >= 18 && ageDifference < 55;
        }
        return true;
      }
    )
    .required("El campo Fecha de nacimiento es requerido"),
  phone: Yup.string()
    .matches(
      /^[0-9]*[1-9][0-9]*(?:\s*[0-9]*[1-9][0-9]*)*$/,
      "El telefono solo debe estar compuesto por numeros"
    )
    .min(10, "El numero telefonico debe contener al menos 10 caracteres")
    .max(15, "El numero telefonico debe contener maximo 15 caracteres")
    .required("El campo Telefono es requerido"),
  email: Yup.string()
    .email("Por favor, introduce un correo electrónico válido")
    .required("El campo Correo Electrónico es requerido"),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      'La contraseña debe contener al menos una letra, un número y un carácter especial'
    )
    .required('El campo Contraseña es requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('El campo Repetir contraseña es requerido'),
});

const ConductoresRegisterCard = () => {

  const [markers, setMarkers] = useState([]);

  const initialValues = {
    name: "",
    bdayDate: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        const result = await Swal.fire({
          title: "Seguro de que quieres registrar el conductor?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Registrar",
          confirmButtonColor: "#7280FF",
          denyButtonText: `Cancelar`,
          cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
          console.log(            values.name,
            null,
            null,
            0,
            values.email,
            values.password,
            dayjs(values.bdayDate).format('YYYY-MM-DDTHH:mm:ss'),
            parseInt(values.phone))

          await saveOrUpdateConductor(

            //nombre, rfc, foto, puntuacion, correo, clave, bday, phone
            values.name,
            null,
            null,
            0,
            values.email,
            values.password,
            dayjs(values.bdayDate).format('YYYY-MM-DDTHH:mm:ss'),
            values.phone
          )
            .then((res) => {
              if (res.data.message === "Ok") {
                Swal.fire("Registro realizado con éxito", "", "success").then(() => {
                  window.location.href = "/conductoresRegister";
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card
        className="cardsita"
        title="Informacion del conductor"
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
                      borderRadius: '50%',
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
                          borderRadius: '12px',
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
                          borderRadius: '12px',
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
                    <Col xs={24}>
                      <Meta
                        title={
                          <Row>
                            Nombre<span style={{ color: 'red' }}>*</span>
                          </Row>
                        }
                        description={
                          <Row>
                            <Field
                              type="text"
                              name="name"
                              as={Input}
                              placeholder="Sin asignar"
                              prefix={<FontColorsOutlined style={{ color: 'red' }} />}
                              style={{ width: '100%' }}
                            />
                          </Row>
                        }
                      />
                    </Col>

                    <Col xs={24}>
                      <Meta
                        title={
                          <Row>
                            Fecha de nacimiento<span style={{ color: 'red' }}>*</span>
                          </Row>
                        }
                        description={
                          <Row>
                            <Field name="bdayDate">
                              {({ field, form }) => (
                                <DatePicker
                                  {...field}
                                  placeholder="Fecha de nacimiento"
                                  style={{ width: '100%' }}
                                  onChange={(date) => form.setFieldValue('bdayDate', date)}
                                />
                              )}
                            </Field>
                          </Row>
                        }
                      />
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: '18px' }} gutter={[16, 16]}>

                    <Col xs={24}>
                      <Meta
                        title={
                          <Row>
                            Telefono<span style={{ color: 'red' }}>*</span>
                          </Row>
                        }
                        description={
                          <Row>
                            <Field
                              type="text"
                              name="phone"
                              as={Input}
                              placeholder="Sin asignar"
                              prefix={<NumberOutlined style={{ color: 'red' }} />}
                              style={{ width: '100%' }}
                            />
                          </Row>
                        }
                      />
                    </Col>

                    <Col xs={24}>
                      <Meta
                        title={
                          <Row>
                            Correo<span style={{ color: 'red' }}>*</span>
                          </Row>
                        }
                        description={
                          <Row>
                            <Field
                              type="email"
                              name="email"
                              as={Input}
                              placeholder="Sin asignar"
                              prefix={<MailOutlined style={{ color: 'red' }} />}
                            />
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
                            Contraseña<span style={{ color: 'red' }}>*</span>
                          </Row>
                        }
                        description={
                          <Row>
                            <Field
                              type="password"
                              name="password"
                              as={Input.Password}
                              placeholder="Sin asignar"
                              iconRender={(visible) => (visible ? <EyeInvisibleOutlined style={{ color: 'red' }} /> : <EyeOutlined style={{ color: 'red' }} />)}
                            />
                          </Row>
                        }
                      />
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Meta
                        title={
                          <Row>
                            Repetir contraseña<span style={{ color: 'red' }}>*</span>
                          </Row>
                        }
                        description={
                          <Row>
                            <Field
                              type="password"
                              name="confirmPassword"
                              as={Input.Password}
                              placeholder="Sin asignar"
                              iconRender={(visible) => (visible ? <EyeInvisibleOutlined style={{ color: 'red' }} /> : <EyeOutlined style={{ color: 'red' }} />)}
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

                  <Row gutter={16} style={{ marginBottom: '18px', justifyContent: 'center', alignItems: 'center', }}>
                    <Col>
                      <Link to="/unidades">
                        <Button
                          type="primary"
                          style={{
                            fontFamily: 'CircularSTD',
                            background: '#FB1506',
                          }}
                        >
                          Cancelar registro
                        </Button>
                      </Link>
                    </Col>

                    <Col>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        htmlType="submit"
                        style={{
                          fontFamily: 'CircularSTD',
                          background: isValid ? '#7280FF' : '#B9C0FF',
                        }}
                        disabled={!isValid}
                      >
                        Agregar conductor
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

export default ConductoresRegisterCard;
