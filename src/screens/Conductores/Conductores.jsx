import React from 'react'
import Sidebar from "../../components/Sidebar/Sidebar";
import { Layout, Row, Col} from "antd";
import CardInARowUnidades from '../../components/CardInARow/CardInARowUnidades';
import UnidadesTable from '../../components/Table/UnidadesTable';
import ConductoresTable from '../../components/Table/ConductoresTable';
import CardInARowConductores from '../../components/CardInARow/CardInARowConductores';

const Conductores = () => {
  return (
    <Sidebar>
      <Layout>
        
        {/* Primera fila con las tarjetas */}
        <Row gutter={60}>
          <CardInARowConductores />
        </Row>

        {/* Espacio considerable abajo de las tarjetas */}
        <Row gutter={16} style={{ marginBottom: "35px" }}>
          {/* Puedes agregar más contenido aquí si es necesario */}
        </Row>

        {/* Segunda fila con la tabla */}
        <Row>
          <Col xs={24}>
            <ConductoresTable />
          </Col>
        </Row>

      </Layout>
    </Sidebar>
  )
}

export default Conductores


