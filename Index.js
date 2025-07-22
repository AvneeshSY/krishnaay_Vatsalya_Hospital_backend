const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db.js')
const SignupRoutes=require("./Router/SignupRouter.js")
const addSpecialization=require("./Router/AddSpecialization.js")

dotenv.config();

const app = express();


connectDB();


app.use(cors());
app.use(express.json());



app.use('/api', SignupRoutes,);
app.use('/api', addSpecialization);


// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
