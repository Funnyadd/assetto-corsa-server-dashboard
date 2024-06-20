const makeApp = require('./app');
const PORT = process.env.PORT || 3001;

const app = makeApp();

app.listen(PORT, () => 
    console.log(`Server listening on ${PORT}`)
)
