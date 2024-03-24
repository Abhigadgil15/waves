require('dotenv').config();
const PORT = 3001;


const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`


module.exports = { 
    PORT, mongoUri
 };