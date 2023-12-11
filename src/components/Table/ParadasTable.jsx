import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import "./Table.css";
import { getRutaById } from "../../service/Rutas/serviceRutas";

const ParadasTable = ({paradasData, setParadasData}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRutaById = async () => {
      try {
        const res = await getRutaById();
        console.log(res.data);
        setParadasData(Array.isArray(res.data.object) ? res.data.object : []); // Asegura que res sea un array
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRutaById();
  }, []); 

  const columns = [
    {
      title: "Nombre de la parada",
      dataIndex: "nombre",
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Descripción de la parada",
      dataIndex: "descripcion",
      sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
      responsive: ["md"],
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const noDataMessage = "No hay paradas registradas";

  return (
    <div style={{ overflowX: "auto" }}>
      <Link to="/viajes" style={{ marginRight: "10px" }}>
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          style={{
            marginBottom: "16px",
            background: "#FB1506",
          }}
        />
      </Link>

      <Link to="/paradasRegister">
        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontWeight: "bold" }} />}
          style={{
            marginBottom: "16px",
            fontFamily: "CircularSTD",
            background: "#FB1506",
          }}
        >
          Añadir Parada
        </Button>
      </Link>

      <Link to="/paradasRegister">
        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontWeight: "bold" }} />}
          style={{
            marginBottom: "16px",
            marginLeft: "61vw",
            fontFamily: "CircularSTD",
            background: "#3B4276",
          }}
        >
          Añadir Viaje
        </Button>
      </Link>

      <Table
        className="tbl-font"
        columns={columns}
        dataSource={paradasData}
        loading={loading}
        onChange={onChange}
        pagination={{ responsive: true }}
        rowKey={(record) => record.idParada} // Proporciona una clave única para cada fila
        locale={{
          emptyText: <div style={{ textAlign: "center" }}>{noDataMessage}</div>,
        }}
      />
    </div>
  );
};

export default ParadasTable;
