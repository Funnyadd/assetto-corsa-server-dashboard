import data from "../data.json";
import Container from 'react-bootstrap/Container';
import ServerTile from '../components/ServerTile';
import NavBar from '../components/navigation/Nav';
import { Button } from 'react-daisyui';

function Servers() {
  const serverList = data

  return (
    <>
      <NavBar/>
      <div className='flex flex-col items-center mt-6 mb-16'>
        <Container>
          <div className='p-2 grid grid-cols-serversGridHeader gap-x-3 text-neutral bg-neutral-content rounded-lg'>
            <span className="self-center">Id</span>
            <span className="self-center">Name</span>
            <span className="self-center">Port</span>
            <span className="self-center">Slots</span>
            <Button className="w-24 justify-self-end" size="sm" variant="outline" color="error">
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