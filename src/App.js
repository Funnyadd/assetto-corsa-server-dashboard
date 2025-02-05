import './App.scss';
import data from "./data.json";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ServerTile from './components/ServerTile';

function App() {
  const serverList = data

  return (
    <Container>
      <h1 className='text-center text-danger my-5'>Assetto Corsa Server Dashboard</h1>
      <Row className='text-white'>
        <Col sm="2">
          <p className='px-3'>ID</p>
        </Col>
        <Col sm="7">
          <p className='px-1'>Name</p>
        </Col>
        <Col sm="3">
          <p className='text-end px-3'>Slots</p>
        </Col>
      </Row>
      <Stack gap={3}>
        {serverList.map((server, index) => 
          <ServerTile 
            key={index}
            name={server.name}
            port={server.port}
          />
        )}
      </Stack>
    </Container>
  );
}

export default App;
