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

> FYI, this application is not yet ready to be used by the public. A lot of the needed configuration is not documented and it is not properly tested yet  
>**!!THIS IS STILL A WORK IN PROGRESS !!**

## Requirements

- 64bit Linux
- Postgres database

## Getting started 

1. It is important to note that this application needs to be connected to a firebase authentication service (it's free) that can be created [here](https://console.firebase.google.com/).\
Once this is done, you may add the environment variables to the `.env` files in the frontend (`./client`) and backend (project root folder).

2. Then, you need to generate a private key file for your firebase service account:
    * In the [Firebase console](https://console.firebase.google.com), open Settings > Service Accounts.
    * Click Generate New Private Key, then confirm by clicking Generate Key.
    * Securely store the JSON file containing the key in the root of the `./server` folder and name it : `assetto-corsa-server-dashboard-firebase-adminsdk.json` or go to the `./server/utils/firebaseConfig.js` file and change the `serviceAccount` constant to the path of the location of the file followed by the name of the file.

3. After that, initialize your own postgres database by adding the right variables in the `.env` file in the backend (project root folder).\
<strong>!!! COMMAND TO BE ADDED !!!</strong> You can then run the `npm run createTables` command and make sure that 4 tables were created: `allocated_ports, servers, users and roles`.

4. Lastly, run the `npm install` in both the `./client` and `root` directories.\
Then, start both applications.

 > To add the right environment variables, copy the `.env.example` file contents to a `.env` file and fill in the variables.

## RoadMap

### v0.2
  - [x] Update README [#11](/../../issues/11)
  - [ ] Make app PWA ready and responsive [#22](/../../issues/22)
  - [x] Add exception handling for refreshToken API call to firebase admin [#15](/../../issues/15)
  - [x] Add MODIFY functionnality for users [#19](/../../issues/19)
  - [x] Add loading bars / spinners [#25](/../../issues/25)
  - [x] Add Whitelist feature on server-side [#26](../../26)
### v0.3
  - [ ] Add MODIFY/ADD allocated port range [#23](/../../issues/23)
  - [ ] Add DELETE server functionnality [#17](/../../issues/17)
  - [ ] Rework exception handling system in the backend [#12](/../../issues/12)
  - [ ] Create testing database config [#13](/../../issues/13)
  - [ ] Add tests for the backend API [#14](/../../issues/14)

### v0.4
  - [ ] Add ADD server functionnality [#16](/../../issues/16)
  - [ ] Add possibility to add cars and tracks with pictures and useful data for a better ADD and MODIFY server experience.
  - [ ] Add MODIFY server functionnality [#20](/../../issues/20)
  - [ ] Add account settings (Delete and modify account) [#27](/../../issues/27)

### IDEAS
- [ ] Add possibility to add traffic to a server
- [ ] Read more stats from server info and logs
- [ ] Automatic coordinates and timeZone fetching for new maps
- [ ] Weather change in server without having to stop it
- [ ] Add description to servers https://assettoserver.org/docs/faq#server-description
- [ ] Add more server details? https://assettoserver.org/docs/misc/server-details
- [ ] Have download links for cars and tracks per server
- [ ] Add a page to see stats with potentially graphs and some sort of history

If you have any ideas for a cool new feature, please let me know by [creating a new issue](https://github.com/Funnyadd/assetto-corsa-server-dashboard/issues/new) with the tag `idea`.

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
