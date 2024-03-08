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
        <Col sm="9">
          <p>Name</p>
        </Col>
        <Col sm="3">
          <p className='text-end'>Slots</p>
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
