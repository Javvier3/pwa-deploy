import React, {useEffect, useState} from "react";
import { Card } from "antd";
import { CarOutlined } from "@ant-design/icons";
import "./CardStyle.css";
import { getAllVehiculos } from "../../service/unidades/serviceUnidades";

const { Meta } = Card;

const CardUnidades = () => {
  const [unidadesTotal, setUnidadesTotal] = useState(0);

  const retrieveAllUnidades = async () => {
    try {
      const response = await getAllVehiculos()
      setUnidadesTotal(response.data.object.length);
    } catch (error) {
      console.error("Error al intentar obtener los conductores:", error);
    }
  };

  useEffect(() => {
    retrieveAllUnidades();
  }, []);


  return (
    <>
      <Card style={{ marginTop: 12 }}>
        <Meta
          avatar={
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                display: "flex",
                justifyContent: "center", // Ahora centra el ícono horizontalmente
                alignItems: "center",
                border: "3.5px solid #3B4276",
              }}
            >
              <CarOutlined style={{ fontSize: "36px", color: "#FB1506" }} />
            </div>
          }
          title={
            <span
              className="card-title"
              style={{ color: "#8A92A6", fontWeight: "200" }}>
              Unidades
            </span>
          }
          description={<span className="card-desc"
          style={{ color: "#232D42"}}
          >{unidadesTotal}</span>}
        />
      </Card>
    </>
  );
};

export default CardUnidades;
