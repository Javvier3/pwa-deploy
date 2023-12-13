import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space, Image, Empty } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons";
import "./Table.css";
import defaultimg from "../../assets/images/default.jpg";
import { useNavigate } from "react-router-dom";
import { deleteConductorById, getAllConductores } from "../../service/conductores/serviceConductores";
import Swal from "sweetalert2";

const ConductoresTable = () => {
  const hoy = new Date();

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

  const handleDeleteUnidad = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro de que deseas eliminar a este conductor?",
        showDenyButton: true,
        confirmButtonText: "Sí, eliminar",
        denyButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await deleteConductorById(id)
          .then((response) => {
            console.log(response)
            if (response.data.error === false) {
              Swal.fire("Eliminación exitosa", "", "success")
                .then(()=>{ window.location.href = "/conductores";})
            } else {
              Swal.fire("Error al eliminar la unidad", response.data.message || "", "error")
              .then(()=>{ window.location.href = "/conductores";})
            }
          })
          .catch((error) => {
            console.error("Error al eliminar al conductor:", error);
            Swal.fire("Error al eliminar al conductor", "", "error")
            .then(()=>{ window.location.href = "/conductores";})
          });
      } else if (result.isDenied) {
        Swal.fire("Eliminación cancelada", "", "info");
      }
    } catch (error) {
      console.error("Error al procesar la eliminación:", error);
      Swal.fire("Error al procesar la eliminación", "", "error")
      .then(()=>{ window.location.href = "/conductores";})
    }
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
      dataIndex: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={handleClick} />
          <Button icon={<DeleteOutlined/>} onClick={()=>{handleDeleteUnidad(record.key)}} />
        </Space>
      ),
      responsive: ["xs", "sm", "md"],
    },
  ];

  const data = conductoresData.map((conductor) => ({
    key: conductor.idConductor.toString(),
    imgp: conductor.usuario.fotoPerfil || defaultimg,
    name: conductor.usuario.nombre,
    age: Math.floor((new Date() - new Date(conductor.usuario.fechaNacimiento)) / (365.25 * 24 * 60 * 60 * 1000)) || "No especificada",
    phone: conductor.usuario.numeroTelefono || "No especificado",
    email: conductor.usuario.correo,
  })
  );
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
