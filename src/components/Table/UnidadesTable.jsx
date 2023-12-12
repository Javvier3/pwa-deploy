import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./Table.css";
import defaultimg from "../../assets/images/default.jpg"
import { useNavigate } from 'react-router-dom';



const UnidadesTable = () => {

  /*THIS NAVIGATE IS A HARDCODE TO GO TO EDIT */
  /* START NAVIGATE */
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/unidadesEdit');
  };
  /* END NAVIGATE */
  const columns = [
    {
      title: "",
      dataIndex: "imgp",
      render: (text, record) => (
          <img
            src={text}
            alt={`Imagen de conductor`}
            width={50}
            style={{ borderRadius: "50%" }}
          />
        ),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Alias",
      dataIndex: "alias",
      sorter: (a, b) => a.alias.localeCompare(b.alias),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Tipo",
      dataIndex: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Placa",
      dataIndex: "plate",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Año",
      dataIndex: "year",
      sorter: (a, b) => a.year.localeCompare(b.year),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Marca",
      dataIndex: "marca",
      sorter: (a, b) => a.marca.localeCompare(b.marca),
      responsive: ["md", "lg", "xl"],
    },
    {
        title: "Modelo",
        dataIndex: "model",
        sorter: (a, b) => a.model.localeCompare(b.model),
        responsive: ["md", "lg", "xl"],
      },
    {
      title: "Acciones",
      dataIndex: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={handleClick} />
          <Button icon={<DeleteOutlined />} />
        </Space>
      ),
      responsive: ["xs", "sm", "md"],
    },
  ];

  const data = [
    {
      key: "1",
      imgp: defaultimg,
      alias: "VV-001",
      type: "Automovil",
      plate: "AB-123CD",
      year: "2018",
      marca: "Toyota",
      model: "Corolla",
    },
    {
      key: "2",
      imgp: defaultimg,
      alias: "VV-002",
      type: "Van",
      plate: "XYZ-987AB",
      year: "2015",
      marca: "Toyota",
      model: "Corolla",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Link to="/unidadesRegister">
        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontWeight: "bold" }} />}
          style={{
            marginBottom: "16px",
            fontFamily: "CircularSTD",
            background: "#3B4276",
          }}
        >
          Añadir unidad
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

export default UnidadesTable;
