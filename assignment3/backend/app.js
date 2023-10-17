const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors())

const routes = require('./api_routes/routes');
routes(app);
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
});