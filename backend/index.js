const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');
const app = express();

const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());
app.use('/api', employeeRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

