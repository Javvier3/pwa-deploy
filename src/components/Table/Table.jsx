import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./Table.css";

const CustomTable = () => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Conductor",
      dataIndex: "conductor",
      sorter: (a, b) => a.conductor.localeCompare(b.conductor),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Origen",
      dataIndex: "origen",
      sorter: (a, b) => a.origen.localeCompare(b.origen),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Destino",
      dataIndex: "destino",
      sorter: (a, b) => a.destino.localeCompare(b.destino),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Puntos Intermedios",
      dataIndex: "puntosIntermedios",
      sorter: (a, b) => a.puntosIntermedios.localeCompare(b.puntosIntermedios),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Tipo de Unidad",
      dataIndex: "tipoUnidad",
      sorter: (a, b) => a.tipoUnidad.localeCompare(b.tipoUnidad),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
        </Space>
      ),
      responsive: ["xs", "sm", "md"],
    },
  ];

  const data = [
    {
      key: "1",
      nombre: "Nombre 1",
      conductor: "Conductor 1",
      origen: "Origen 1",
      destino: "Destino 1",
      puntosIntermedios: "Puntos 1",
      tipoUnidad: "Tipo 1",
    },
    {
      key: "2",
      nombre: "Nombre 2",
      conductor: "Conductor 2",
      origen: "Origen 2",
      destino: "Destino 2",
      puntosIntermedios: "Puntos 2",
      tipoUnidad: "Tipo 2",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Link to="/viajesRegister">
        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontWeight: "bold" }} />}
          style={{
            marginBottom: "16px",
            fontFamily: "CircularSTD",
            background: "#3B4276",
          }}
        >
          Añadir viaje
        </Button>
      </Link>

      <Table
        className="tbl-font"
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{ responsive: true }}
      />
      
    </div>
  );
};

export default CustomTable;
