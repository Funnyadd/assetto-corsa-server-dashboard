<p align="center">
  <a href="https://www.assetto.adammihajlovic.ca">
    <img alt="logo" src="./client/public/logo512.png" width="80" />
  </a>
</p>
<h1 align="center">
  Assetto Corsa Server Dashboard
</h1>

Dashboard application made to manage assetto corsa dedicated servers.
At the moment, it can start and stop them as well as add and remove people from the servers whitelists.
The frontend of this application is done in React with tailwindCSS and daisy UI for styling.
The backend of this application is in ExpressJS with sequalize for database requests and firebase for its authentication services.

## Getting started 

It is important to note that this application needs to be connected to a firebase authentication service (it's free) that can be created [here](https://console.firebase.google.com/).\
Once this is done, you may add the environment variables to the `.env` files in the frontend (`./client`) and backend (project root folder).

After that, initialize your own postgres database by adding the right variables in the `.env` file in the backend (project root folder).\
<strong>!!! COMMAND TO BE ADDED !!!</strong> You can then run the `npm run createTables` command and make sure that 4 tables were created: `allocated_ports, servers, users and roles`.

Lastly, run the `npm install` in both the `./client` and `root` directories.\
Then, start both applications.

## Available Scripts

### `npm start`

- <ins>In the project directory:</ins> Runs the backend application.\
By default, it will run on [http://localhost:3001](http://localhost:3001) but, you can change the port in the server's environment variables by changing the `PORT` variable.

- <ins>In the client directory:</ins> Runs the frontend application.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
\
The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

- <ins>In the client directory:</ins> Builds the application for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.\
\
The build is minified and the filenames include the hashes.\
The application is ready to be deployed!
