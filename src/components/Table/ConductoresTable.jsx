import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space, Image } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./Table.css";
import defaultimg from "../../assets/images/default.jpg"

const ConductoresTable = () => {
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
      title: "Nombre",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Edad",
      dataIndex: "age",
      sorter: (a, b) => a.age.localeCompare(b.age),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Celular",
      dataIndex: "phone",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.year.localeCompare(b.year),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      render: (text, record) => (
        <Space size="middle">
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
      imgp: defaultimg,
      name: "Francisco Javier García Espinoza",
      age: "21",
      phone: "7772315540",
      email: "20203tn021@utez.edu.mx"
    },
    {
        key: "1",
        imgp: defaultimg,
        name: "Angel Omar Díaz Salgado",
        age: "21",
        phone: "7772314789",
        email: "20203tn356@utez.edu.mx"
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
          Añadir conductor
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

export default ConductoresTable;
