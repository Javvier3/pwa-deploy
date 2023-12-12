import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space, Empty } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./Table.css";
import defaultimg from "../../assets/images/default.jpg";
import { useNavigate } from "react-router-dom";
import { getAllVehiculos } from "../../service/unidades/serviceUnidades";

const UnidadesTable = () => {
  const [unidadesData, setUnidadesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    retrieveAllUnidades();
  }, []);

  const retrieveAllUnidades = async () => {
    try {
      const response = await getAllVehiculos();
      setUnidadesData(response.data.object || []);
    } catch (error) {
      console.error("Error al intentar obtener los conductores:", error);
    }
  };

  const handleClick = () => {
    navigate("/unidadesEdit");
  };

  const data = unidadesData.map((unidad) => ({
    key: unidad.idVehiculo.toString(),
    imgp: unidad.foto || defaultimg,
    alias: unidad.alias,
    type: unidad.tipo,
    seats: unidad.numAsientos, // Cambiado de 'plate' a 'seats'
    year: unidad.anio.toString(),
    marca: unidad.marca,
    model: unidad.modelo,
  }));

  const columns = [
    {
      title: "Imagen",
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
      title: "Número de Asientos", // Cambiado de 'Placa' a 'Número de Asientos'
      dataIndex: "seats",
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
      responsive: ["xs","sm","md", "lg", "xl"],
    },
    {
      title: "Modelo",
      dataIndex: "model",
      sorter: (a, b) => a.model.localeCompare(b.model),
      responsive: ["xs","sm","md", "lg", "xl"],
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

  const components = {
    body: {
      wrapper: (props) =>
        unidadesData.length === 0 ? (
          <Empty description="No existen unidades registradas" />
        ) : (
          <tbody {...props} />
        ),
    },
  };

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
        components={components}
      />
    </div>
  );
};

export default UnidadesTable;
