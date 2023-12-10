import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "./Table.css";

const ParadasTable = () => {
  const columns = [
    {
      title: "Nombre de la parada",
      dataIndex: "nombreParada",
      sorter: (a, b) => a.nombreRuta.localeCompare(b.nombreParada),
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Descripción de la parada",
      dataIndex: "descParada",
      sorter: (a, b) => a.descRuta.localeCompare(b.descParada),
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

  const data = [
    {
      key: "1",
      nombreParada: "Nombre parada",
      descParada: "desc parada",
    },
    {
      key: "2",
      nombreParada: "Nombre parada 2",
      descParada: "desc parada 2",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div style={{ overflowX: "auto" }}>

      <Link to="/viajes" style={{marginRight:"10px"}}>
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

export default ParadasTable;
