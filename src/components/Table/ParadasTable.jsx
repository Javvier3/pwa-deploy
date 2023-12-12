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
import { deleteParadasById, getAllParadas } from "../../service/Paradas/serviceParadas";
import { retrieveRutas, saveRuta, saveRutaByIdRuta } from "../../service/Rutas/serviceRutas";
import Swal from "sweetalert2";
import { insertNewViaje, updateViajeById } from "../../service/Viajes/serviceViajes";


const ParadasTable = ({nuevoViajeData, setNuevoViajeData,paradasData, setParadasData, setViajeData, viajeData, selectedRowKeys, setSelectedRowKeys, isNew, idViaje,
  onChangedConductor, setOnChangedConductor,
  onChangedUnidad, setOnChangedUnidad,
  onChangedDate, setOnChangedDate,
  onChangedViajeName, setOnChangedViajeName}) => {

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


 console.log(paradasData)

 const handleViajeRegisterEdit = async () => {
  try {
    setLoading(true);

    if (isNew) {
      if (selectedRowKeys && selectedRowKeys.length >= 2) {
        await saveRuta(selectedRowKeys)
          .then(async (responseRegistroRuta) => {
            if (!responseRegistroRuta.data.error) {
              const conductorAssigned = nuevoViajeData.conductor !== null && nuevoViajeData.conductor !== undefined && nuevoViajeData.conductor !== 0 && nuevoViajeData.conductor !== "0" && nuevoViajeData.conductor !== "Sin asignar";
              const vehiculoSelected = nuevoViajeData.vehiculo !== null && nuevoViajeData.vehiculo !== undefined && nuevoViajeData.vehiculo !== 0 && nuevoViajeData.vehiculo !== "0" && nuevoViajeData.vehiculo !== "Sin asignar";
              const fechaViajeSelected = nuevoViajeData.fechaViaje !== null && nuevoViajeData.fechaViaje !== undefined && nuevoViajeData.fechaViaje !== "" && nuevoViajeData.fechaViaje !== "1899-11-30" && nuevoViajeData.fechaViaje !== "Invalid Date";

              if (!conductorAssigned) {
                Swal.fire({
                  icon: "error",
                  title: "Error al registrar un nuevo viaje...",
                  text: "Debe seleccionar un conductor para registrar el viaje",
                  fontFamily: "CircularSTD",
                });
                return; // Stop execution if conductor is not assigned
              }

              if (!vehiculoSelected) {
                Swal.fire({
                  icon: "error",
                  title: "Error al registrar un nuevo viaje...",
                  text: "Debe seleccionar un vehículo para registrar el viaje",
                  fontFamily: "CircularSTD",
                });
                return; // Stop execution if vehiculo is not selected
              }

              if (!fechaViajeSelected) {
                Swal.fire({
                  icon: "error",
                  title: "Error al registrar un nuevo viaje...",
                  text: "La fecha seleccionada no es válida",
                  fontFamily: "CircularSTD",
                });
                return; // Stop execution if fechaViaje is not valid
              }

              const selectedDate = new Date(nuevoViajeData.fechaViaje);
              const currentDate = new Date();

              if (selectedDate < currentDate) {
                Swal.fire({
                  icon: "error",
                  title: "Error al registrar un nuevo viaje...",
                  text: "Solo puedes ingresar fechas superiores al día actual",
                  fontFamily: "CircularSTD",
                });
                return; // Stop execution if fechaViaje is earlier than the current date
              }

              await insertNewViaje(
                nuevoViajeData.fechaViaje,
                nuevoViajeData.nombre,
                responseRegistroRuta.data.object.idRuta,
                nuevoViajeData.vehiculo,
                nuevoViajeData.conductor
              ).then((responseViaje) => {
                if (responseViaje.status === 201) {
                  Swal.fire({
                    icon: "success",
                    title: "Viaje añadido exitosamente",
                    showConfirmButton: true,
                  }).then(() => {
                    console.log(responseViaje);
                    window.location.href = "/viajes";
                  });
                }
              }).catch((error) => {
                console.log(error);
                Swal.fire({
                  icon: "error",
                  title: "Error al registrar el viaje",
                  text: "Hubo un error al registrar el viaje, por favor inténtalo de nuevo",
                }).then(() => {
                  window.location.href = "/viajes";
                });
              });
            }
          }).catch((e) => {
            console.log("Error al registrar la ruta" + e);
            Swal.fire({
              icon: "error",
              title: "Error al registrar la ruta",
              text: "Hubo un error al registrar la ruta, por favor inténtalo de nuevo",
            }).then(() => {
              window.location.href = "/viajes";
            });
          });

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
      console.log(viajeData);
      if (selectedRowKeys && selectedRowKeys.length >= 2) {
        await saveRutaByIdRuta(viajeData.ruta.idRuta, selectedRowKeys)
          .then(async (responseRegistroRuta) => {
            if (!responseRegistroRuta.data.error) {
              const conductorAssigned = nuevoViajeData.conductor !== null && nuevoViajeData.conductor !== undefined && nuevoViajeData.conductor !== 0 && nuevoViajeData.conductor !== "0" && nuevoViajeData.conductor !== "Sin asignar";
              const vehiculoSelected = nuevoViajeData.vehiculo !== null && nuevoViajeData.vehiculo !== undefined && nuevoViajeData.vehiculo !== 0 && nuevoViajeData.vehiculo !== "0" && nuevoViajeData.vehiculo !== "Sin asignar";
              const fechaViajeSelected = nuevoViajeData.fechaViaje !== null && nuevoViajeData.fechaViaje !== undefined && nuevoViajeData.fechaViaje !== "" && nuevoViajeData.fechaViaje !== "1899-11-30" && nuevoViajeData.fechaViaje !== "Invalid Date";

              if (!conductorAssigned) {
                Swal.fire({
                  icon: "error",
                  title: "Error al actualizar el viaje...",
                  text: "Debe seleccionar un conductor para actualizar el viaje",
                  fontFamily: "CircularSTD",
                });
                return; // Stop execution if conductor is not assigned
              }

              if (!vehiculoSelected) {
                Swal.fire({
                  icon: "error",
                  title: "Error al actualizar el viaje...",
                  text: "Debe seleccionar un vehículo para actualizar el viaje",
                  fontFamily: "CircularSTD",
                });
                return; // Stop execution if vehiculo is not selected
              }

              if (!fechaViajeSelected) {
                Swal.fire({
                  icon: "error",
                  title: "Error al actualizar el viaje...",
                  text: "La fecha seleccionada no es válida",
                  fontFamily: "CircularSTD",
                });
                return; // Stop execution if fechaViaje is not valid
              }

              const selectedDate = new Date(nuevoViajeData.fechaViaje);
              const currentDate = new Date();

              if (selectedDate <= currentDate) {
                Swal.fire({
                  icon: "error",
                  title: "Error al actualizar el viaje...",
                  text: "Solo puedes ingresar fechas superiores al día actual",
                  fontFamily: "CircularSTD",
                });
                return; // Stop execution if fechaViaje is earlier than the current date
              }

              await updateViajeById(
                nuevoViajeData.fechaViaje,
                nuevoViajeData.nombre,
                responseRegistroRuta.data.object.idRuta,
                nuevoViajeData.vehiculo,
                nuevoViajeData.conductor,
                viajeData.idViaje
              ).then(async (responseUpdateViaje) => {
                if (responseUpdateViaje.status === 201) {
                  await Swal.fire({
                    icon: "success",
                    title: "Viaje actualizado exitosamente",
                    showConfirmButton: true,
                  }).then(() => {
                    console.log(responseUpdateViaje);
                    window.location.href = "/viajes";
                  });
                } else {
                  await Swal.fire({
                    icon: "error",
                    title: "Error al actualizar el viaje",
                    text: "Hubo un error al actualizar el viaje, por favor inténtalo de nuevo",
                  }).then(() => {
                    console.log(responseUpdateViaje);
                    window.location.href = "/viajes";
                  });
                }
              })
              .catch((e) => {
                console.log(e);
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.",
                }).then(() => {
                  window.location.href = "/viajes";
                });
              });

              console.log("Viaje actualizado");
            }
          }).catch((e) => {
            console.log("Error al registrar la ruta" + e);
            Swal.fire({
              icon: "error",
              title: "Error al actualizar la ruta",
              text: "Hubo un error al actualizar la ruta, por favor inténtalo de nuevo",
            }).then(() => {
              window.location.href = "/viajes";
            });
          });

      } else if (
        selectedRowKeys === undefined ||
        selectedRowKeys.length === 0 ||
        selectedRowKeys === null ||
        Array.isArray(selectedRowKeys)
      ) {
        Swal.fire({
          icon: "error",
          title: "Error al actualizar el viaje...",
          text: "Debes seleccionar al menos dos paradas antes de poder actualizar el viaje",
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
    }).then(() => {
      window.location.href = "/viajes";
    });
  } finally {
    setLoading(false);
  }
};


const handleDeleteParada = async (id) => {
  try {
    const confirmDeletion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmDeletion.isConfirmed) {
      await deleteParadasById(id)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Parada eliminada correctamente',
              showConfirmButton: true,
            }).then(() => {
              window.location.href = window.location.href; // Reload the current page
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar la parada',
              text: 'Hubo un error al eliminar la parada, no puedes eliminar una parada que ya pertenezca a un viaje',
            });
          }
        })
        .catch((error) => {
          console.error('Error al eliminar la parada:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar la parada',
            text: 'Hubo un error al eliminar la parada, por favor inténtalo de nuevo',
          });
        });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.',
    }).then(() => {
      //window.location.href = window.location.href; // Reload the current page
    });
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
          <Button icon={<DeleteOutlined />} onClick={()=>{handleDeleteParada(record.idParada)}}/>
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
          pageSize: 5, 
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
