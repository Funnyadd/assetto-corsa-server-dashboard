import data from "../data.json";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ServerTile from '../components/ServerTile';
import NavBar from '../components/navigation/Nav';

function Servers() {
  const serverList = data

  return (
    <>
      <NavBar/>
      <Container className='my-16'>
        <div className='grid text-neutral bg-neutral-content'>
          <div>
            <p className='px-3'>ID</p>
          </div>
          <div>
            <p className='px-1'>Name</p>
          </div>
          <div>
            <p className='text-end px-3'>Slots</p>
          </div>
        </div>
        <div>
          {serverList.map((server, index) => 
            <ServerTile 
              key={index}
              name={server.name}
              port={server.port}
            />
          )}
        </div>
      </Container>
    </>
  )
}

export default Servers