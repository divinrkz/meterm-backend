require('dotenv').config();

require('./src/models/db');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');

//Routes
const TOKEN_ROUTES = require('./src/routes/token.route');


const PORT = process.env.SERVER_PORT;


app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());

app.use(TOKEN_ROUTES);


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));