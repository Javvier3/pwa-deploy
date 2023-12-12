import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Table, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "./Table.css";
import { getAllParadas } from "../../service/Paradas/serviceParadas";
import { retrieveRutas } from "../../service/Rutas/serviceRutas";


const ParadasTable = ({nuevoViajeData, paradasData, setParadasData, setViajeData, viajeData, selectedRowKeys, setSelectedRowKeys, isNew, idViaje}) => {

  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(false)

  console.log(nuevoViajeData)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isNew && idViaje && viajeData && viajeData.ruta) {
          const res = await retrieveRutas(viajeData.ruta.idRuta);
          setRutas(res.data.object);
    
          // Extrae los idParada de cada elemento en rutas.paradas
          const paradasExtracted = res.data.object.paradas.map(parada => parada.idParada);
    
          // Configura los idParada como las selectedRowKeys
          setSelectedRowKeys(paradasExtracted);
        } else {
          // En caso de que no sea nuevo o falte el idViaje, puedes manejarlo aquí
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [isNew, idViaje, setSelectedRowKeys, viajeData]);



  useEffect(() => {
    const fetchParadasData= async () => {
      try {
        const res = await getAllParadas();
        setParadasData(Array.isArray(res.data.object) ? res.data.object : []); // Asegura que res sea un array
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchParadasData();
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
  };

  const onSelectChange = (selectedKeys, selectedRows) => {
    // Actualiza el estado con las claves seleccionadas
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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

      <Link to="/">
        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontWeight: "bold" }} />}
          style={{
            marginBottom: "16px",
            fontFamily: "CircularSTD",
            background: "#FB1506",
          }}
        >
          {viajeData ? "Actualizar Viaje" : "Añadir Viaje"}
        </Button>
      </Link>

      <Table
        className="tbl-font"
        columns={columns}
        dataSource={paradasData}
        loading={loading}
        onChange={onChange}
        pagination={{
          responsive: true,
          pageSize: 4, 
        }}
        rowKey={(record) => record.idParada}
        rowSelection={rowSelection}
        locale={{
          emptyText: <div style={{ textAlign: "center" }}>{noDataMessage}</div>,
        }}
      />


    </div>
  );
};

export default ParadasTable;
