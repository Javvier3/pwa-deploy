import React, {useState} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Layout, Row, Col } from "antd";
import CardInARow from "../../components/CardInARow/CardInARow";
import CustomTable from "../../components/Table/Table";

const Viajes = () => {
  const [viajesData, setViajesData] = useState([]);
  

  return (
    <Sidebar>
      <Layout>
        
        {/* Primera fila con las tarjetas */}
        <Row gutter={60}>
          <CardInARow />
        </Row>

        {/* Espacio considerable abajo de las tarjetas */}
        <Row gutter={16} style={{ marginBottom: "35px" }}>
          {/* Puedes agregar más contenido aquí si es necesario */}
        </Row>

        {/* Segunda fila con la tabla */}
        <Row>
          <Col xs={24}>
            <CustomTable viajesData={viajesData} setViajesData={setViajesData} />
          </Col>
        </Row>

      </Layout>
    </Sidebar>
  );
};

export default Viajes;
