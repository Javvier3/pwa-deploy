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
import { deleteVehiculoById, getAllVehiculos } from "../../service/unidades/serviceUnidades";
import Swal from "sweetalert2";

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

  const handleClick = (id) => {
    navigate(`/unidadesEdit`);
    localStorage.setItem("idUnidad",id);
  };

  const handleDeleteUnidad = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro de que quieres eliminar esta unidad?",
        showDenyButton: true,
        confirmButtonText: "Sí, eliminar",
        denyButtonText: "Cancelar",
      });
  
      if (result.isConfirmed) {
        await deleteVehiculoById(id)
          .then((response) => {
            console.log(response)
            if (response.data.error === false) {
              Swal.fire("Eliminación exitosa", "", "success")
                .then(()=>{ window.location.href = "/unidades";})
            } else {
              Swal.fire("Error al eliminar la unidad", response.data.message || "", "error")
              .then(()=>{ window.location.href = "/unidades";})
            }
          })
          .catch((error) => {
            console.error("Error al eliminar la unidad:", error);
            Swal.fire("Error al eliminar la unidad", "", "error")
            .then(()=>{ window.location.href = "/unidades";})
          });
      } else if (result.isDenied) {
        Swal.fire("Eliminación cancelada", "", "info");
      }
    } catch (error) {
      console.error("Error al procesar la eliminación:", error);
      Swal.fire("Error al procesar la eliminación", "", "error")
      .then(()=>{ window.location.href = "/unidades";})
    }
  };
  
  

  const data = unidadesData.map((unidad) => ({
    key: unidad.idVehiculo.toString(),
    imgp: unidad.foto || defaultimg,
    marca: unidad.marca,
    model: unidad.modelo,
    alias: unidad.alias,
    year: unidad.anio.toString(),
    type: unidad.tipo,
    seats: unidad.numAsientos,
  }));

  const columns = [
    {
      title: "Marca",
      dataIndex: "marca",
      sorter: (a, b) => a.marca.localeCompare(b.marca),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Modelo",
      dataIndex: "model",
      sorter: (a, b) => a.model.localeCompare(b.model),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Alias",
      dataIndex: "alias",
      sorter: (a, b) => a.alias.localeCompare(b.alias),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Año",
      dataIndex: "year",
      sorter: (a, b) => a.year.localeCompare(b.year),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Tipo",
      dataIndex: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Número de Asientos",
      dataIndex: "seats",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={()=>{handleClick(record.key)}} />
          <Button icon={<DeleteOutlined/>} onClick={()=>{handleDeleteUnidad(record.key)}} />
        </Space>
      ),
      responsive: ["xs", "sm", "md"],
    },
  ];

  const components = {
    body: {
      wrapper: (props) =>
          <tbody {...props} />
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
        pagination={{ responsive: true, pageSize:4 }}
        components={components}
        locale={{
          emptyText: <div style={{ textAlign: "center" }}>No existen unidades disponibles</div>,
        }}
      />
    </div>
  );
};

export default UnidadesTable;
