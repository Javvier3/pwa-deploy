import React, {useEffect, useState} from "react";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./CardStyle.css";
import { getAllConductores } from "../../service/conductores/serviceConductores";

const { Meta } = Card;

const CardConductores = () => {
  const [conductoresTotal, setConductoresTotal] = useState(0);


  const retrieveAllConductores = async () => {
      try {
        const response = await getAllConductores();
        setConductoresTotal(response.data.object.length);
      } catch (error) {
        console.error("Error al intentar obtener los conductores:", error);
      }
    };

    useEffect(() => {
      retrieveAllConductores();
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
              <UserOutlined style={{ fontSize: "36px", color: "#FB1506" }} />
            </div>
          }
          title={
            <span
              className="card-title"
              style={{ color: "#8A92A6", fontWeight: "200" }}
            >
              Conductores
            </span>
          }
          description={
            <span className="card-desc" style={{ color: "#232D42" }}>
              {conductoresTotal}
            </span>
          }
        />
      </Card>
    </>
  );
};

export default CardConductores;
