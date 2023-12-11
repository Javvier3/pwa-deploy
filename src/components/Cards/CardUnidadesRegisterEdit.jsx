import React, { useState } from 'react';
import { Card, Select, DatePicker, Col, Row, Input, Upload, Button } from 'antd';
import {
  CarOutlined,
  NumberOutlined,
  FontColorsOutlined,
  PictureOutlined,
  PlusOutlined
} from '@ant-design/icons';

import '../../screens/Viajes/Viajes.css';

const { Option } = Select;
const { Meta } = Card;

const CardUnidadesRegisterEdit = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      // La imagen se cargó con éxito
      setImage(info.file.originFileObj);
    }
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

  return (
    <Card
      className="cardsita"
      title="Informacion sobre la nueva unidad"
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Row>
        <Col span={24}>
          <Row style={{ marginBottom: '18px' }} gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Meta
                title="Imagen*"
                description={
                  <Upload
                    customRequest={dummyRequest}
                    showUploadList={true}
                    onChange={handleImageChange}
                    beforeUpload={beforeUpload}
                    accept="image/*"
                    multiple={false}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, seleccione una imagen',
                      },
                    ]}
                  >
                    <Button
                      icon={<PictureOutlined />}
                      style={{ width: '100%' }}
                    >
                      Seleccionar Imagen
                    </Button>
                  </Upload>
                }
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: '18px' }} gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Meta
                title="Alias*"
                description={
                  <Input
                    prefix={<FontColorsOutlined />}
                    placeholder="Alias"
                    style={{ width: '100%' }}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, ingrese un Alias',
                      },
                    ]}
                  />
                }
              />
            </Col>

            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Meta
                title="Año*"
                description={
                  <DatePicker
                    picker="year"
                    placeholder="Año"
                    style={{ width: '100%' }}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, seleccione un Año',
                      },
                    ]}
                  />
                }
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: '18px' }} gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Meta
                title="Tipo*"
                description={
                  <Select
                    prefix={<CarOutlined />}
                    placeholder="Tipo"
                    style={{ width: '100%' }}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, seleccione un Tipo',
                      },
                    ]}
                  >
                    <Option value="Automovil">Automóvil</Option>
                    <Option value="Van">Van</Option>
                  </Select>
                }
              />
            </Col>

            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Meta
                title="Placa*"
                description={
                  <Input
                    prefix={<NumberOutlined />}
                    placeholder="Placa"
                    style={{ width: '100%' }}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, ingrese una Placa',
                      },
                    ]}
                  />
                }
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: '18px' }} gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Meta
                title="Marca*"
                description={
                  <Input
                    prefix={<CarOutlined />}
                    placeholder="Marca"
                    style={{ width: '100%' }}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, ingrese una Marca',
                      },
                    ]}
                  />
                }
              />
            </Col>

            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Meta
                title="Modelo*"
                description={
                  <Input
                    prefix={<CarOutlined />}
                    placeholder="Modelo"
                    style={{ width: '100%' }}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, ingrese un Modelo',
                      },
                      {
                        pattern: /^[a-zA-Z0-9\s]*$/,
                        message: 'Solo se permiten letras y números',
                      },
                    ]}
                  />
                }
              />
            </Col>
          </Row>

          <Button type="primary" icon={<PlusOutlined />} htmlType="submit" style={{ marginTop: "15px", marginLeft: "8px", marginBottom: "16px", fontFamily: "CircularSTD", background: "#7280FF" }}>
            Agregar unidad
          </Button>

        </Col>
      </Row>
    </Card>
  );
};

export default CardUnidadesRegisterEdit;
