import React from "react";
import { Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import "./CardStyle.css";

const { Meta } = Card;

const CardViajes = () => {
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
              <CalendarOutlined style={{ fontSize: "36px", color: "#FB1506" }} />
            </div>
          }
          title={
            <span
              className="card-title"
              style={{ color: "#8A92A6", fontWeight: "200" }}
            >
              Viajes
            </span>
          }
          description={
            <span className="card-desc" style={{ color: "#232D42" }}>
              100
            </span>
          }
        />
      </Card>
    </>
  );
};

export default CardViajes;
