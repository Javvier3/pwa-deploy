import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Table, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "./Table.css";
import { getAllParadas } from "../../service/Paradas/serviceParadas";
import { retrieveRutas, saveRuta, saveRutaByIdRuta } from "../../service/Rutas/serviceRutas";
import Swal from "sweetalert2";
import { insertNewViaje, updateViajeById } from "../../service/Viajes/serviceViajes";


const ParadasTable = ({nuevoViajeData, setNuevoViajeData,paradasData, setParadasData, setViajeData, viajeData, selectedRowKeys, setSelectedRowKeys, isNew, idViaje}) => {

  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(false)

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
  }, [setParadasData]);


 console.log(nuevoViajeData)

  const handleViajeRegisterEdit = async () => {
    try {
      setLoading(true);
  
      if (isNew) {
        if (selectedRowKeys && selectedRowKeys.length >= 2) {
          await saveRuta(selectedRowKeys)
            .then(async (responseRegistroRuta) => {
              if (responseRegistroRuta.data.error === false) {
                await insertNewViaje(
                  nuevoViajeData.fechaViaje,
                  nuevoViajeData.nombre,
                  responseRegistroRuta.data.object.idRuta,
                  nuevoViajeData.vehiculo,
                  nuevoViajeData.conductor
                ).then((responseViaje) => {
                  // Swal de success de viaje
                  Swal.fire({
                    icon: "success",
                    title: "Viaje añadido exitosamente",
                    showConfirmButton: true,
                  }).then(() => {
                    console.log(responseViaje)
                    window.location.href = "/viajes";
                  });
                }).catch((error) => {
                  // Swal de error de viaje
                  console.log(error);
                });
              }
            }).catch((e) => console.log("Error al registrar la ruta" + e));
        } else if (
          selectedRowKeys === undefined ||
          selectedRowKeys.length === 0 ||
          selectedRowKeys === null ||
          Array.isArray(selectedRowKeys)
        ) {
          Swal.fire({
            icon: "error",
            title: "Error al registrar un nuevo viaje...",
            text: "Debes seleccionar al menos dos paradas antes de poder registrar un nuevo viaje",
            fontFamily: "CircularSTD",
          });
        }
      } else {
        console.log(viajeData)
        if (selectedRowKeys && selectedRowKeys.length >= 2) {
          await saveRutaByIdRuta(viajeData.ruta.idRuta, selectedRowKeys)
            .then(async (responseRegistroRuta) => {
              if (responseRegistroRuta.data.error === false) {
                  await updateViajeById(
                    nuevoViajeData.fechaViaje,
                    nuevoViajeData.nombre,
                    nuevoViajeData.ruta,
                    nuevoViajeData.vehiculo,
                    nuevoViajeData.conductor,
                    viajeData.idViaje
                  ).then(async (responseUpdateViaje) => {
                    await Swal.fire({
                      icon: "success",
                      title: "Viaje actualizado exitosamente",
                      showConfirmButton: true,
                    }).then(() => {
                      console.log(responseUpdateViaje)
                      window.location.href = "/viajes";
                    });
                  })
                  .catch((e)=>{
                    console.log(e);
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.",
                    });
                  })
            
                  console.log("Viaje actualizado");
              }
            }).catch((e) => console.log("Error al registrar la ruta" + e));

        }else if (
          selectedRowKeys === undefined ||
          selectedRowKeys.length === 0 ||
          selectedRowKeys === null ||
          Array.isArray(selectedRowKeys)
        ) {
          Swal.fire({
            icon: "error",
            title: "Error al registrar un nuevo viaje...",
            text: "Debes seleccionar al menos dos paradas antes de poder registrar un nuevo viaje",
            fontFamily: "CircularSTD",
          });
        }


      }
    } catch (error) {
      console.error("Error al registrar o actualizar el viaje:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };
  



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

        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontWeight: "bold" }} />}
          style={{
            marginBottom: "16px",
            fontFamily: "CircularSTD",
            background: "#FB1506",
          }}
          onClick={handleViajeRegisterEdit}
        >
          {viajeData ? "Actualizar Viaje" : "Añadir Viaje"}
          
        </Button>

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
