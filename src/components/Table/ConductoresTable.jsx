import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space, Image, Empty } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./Table.css";
import defaultimg from "../../assets/images/default.jpg";
import { useNavigate } from "react-router-dom";
import { getAllConductores } from "../../service/conductores/serviceConductores";

const ConductoresTable = () => {
  const [conductoresData, setConductoresData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    retrieveAllConductores();
  }, []);

  const retrieveAllConductores = async () => {
    try {
      const response = await getAllConductores();
      setConductoresData(response.data.object || []);
    } catch (error) {
      console.error("Error al intentar obtener los conductores:", error);
    }
  };

  const handleClick = () => {
    navigate("/conductoresEdit");
  };

  const columns = [
    {
      title: "",
      dataIndex: "imgp",
      render: (text, record) => (
        <img
          src={defaultimg}
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
      title: "Correo",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
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

  const data = conductoresData.map((conductor) => ({
    key: conductor.idConductor.toString(),
    imgp: conductor.usuario.fotoPerfil || defaultimg,
    name: conductor.usuario.nombre,
    age: conductor.usuario.fechaNacimiento || "No especificada",
    phone: conductor.usuario.numeroTelefono || "No especificado",
    email: conductor.usuario.correo,
  }));

  return (
    <div style={{ overflowX: "auto" }}>
      <Link to="/conductoresRegister">
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
        pagination={{ responsive: true }}
        locale={{
          emptyText: <Empty description="No existen conductores registrados" />,
        }}
      />
    </div>
  );
};

export default ConductoresTable;
