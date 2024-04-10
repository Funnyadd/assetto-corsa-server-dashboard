import data from "../data.json";
import Container from 'react-bootstrap/Container';
import ServerTile from '../components/ServerTile';
import NavBar from '../components/navigation/Nav';
import { Button, RadialProgress } from 'react-daisyui';

function Servers() {
  const serverList = data

  return (
    <>
      <NavBar/>
      <div className='flex flex-col items-center mt-6 mb-16'>
        <Container>
          <div className='ps-3 pe-2 grid grid-cols-serversGridHeader gap-x-3'>
            <span className="self-center">Port</span>
            <span className="self-center">Name</span>
            <span className="self-center">Slots</span>
            <Button size="sm"></Button>
            <Button size="sm"><RadialProgress value={100}>60</RadialProgress></Button>
            <Button className="justify-self-end" size="sm" color="error">
              Stop All
            </Button>
          </div>
          {serverList.map((server, index) => 
            <ServerTile
              key={index}
              name={server.name}
              port={server.port}
            />
          )}
        </Container>
      </div>
    </>
  )
}

export default Servers