const express = require("express");
const routerAPI = require('./routes/index.js');
const cors = require('cors')

const app = express();
app.use(express.json());
//app.use(cors())
app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200}));

routerAPI(app);

app.listen(80, () => {
  console.log("Servidor iniciado en el puerto 80");
});