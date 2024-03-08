import './App.scss';
import Stack from 'react-bootstrap/Stack';
import ServerTile from './components/ServerTile';

function App() {
  const serverList = [
    {
      name: "Cool Klutch Kicking with friends",
      port: 8081
    }
  ]

  return (
    <div className="App">
      <Stack gap={3}>
        {serverList.map(server => 
          <ServerTile 
            name={server.name}
            port={server.port}
          />
        )}
      </Stack>
    </div>
  );
}

export default App;
