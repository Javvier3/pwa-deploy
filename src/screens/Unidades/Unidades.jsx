import React from 'react'
import Sidebar from "../../components/Sidebar/Sidebar";
import { Layout, Row, Col} from "antd";
import CardInARowUnidades from '../../components/CardInARow/CardInARowUnidades';
import UnidadesTable from '../../components/Table/UnidadesTable';

const Unidades = () => {
  return (
    <Sidebar>
      <Layout>
        
        {/* Primera fila con las tarjetas */}
        <Row gutter={60}>
          <CardInARowUnidades />
        </Row>

        {/* Espacio considerable abajo de las tarjetas */}
        <Row gutter={16} style={{ marginBottom: "35px" }}>
          {/* Puedes agregar más contenido aquí si es necesario */}
        </Row>

        {/* Segunda fila con la tabla */}
        <Row>
          <Col xs={24}>
            <UnidadesTable />
          </Col>
        </Row>

      </Layout>
    </Sidebar>
  )
}

export default Unidades
