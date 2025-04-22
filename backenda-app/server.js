const express = require('express');
const cors = require('cors');
const app = express();
const env = require('dotenv');

env.config();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const UserRouter = require('./router/userRouter');
const ProductoRouter = require('./router/productoRouter');
app.use('/api', UserRouter);
app.use('/api', ProductoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor en el puerto:', PORT);
});