import express from "express";
import http from 'http';
import mongoose from 'mongoose';

// configs 
const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);


//database 
const mongoSettings = {
    autoIndex: process.env.AUTO_INDEX === 'true' ? true : false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.MONGODB_URI, mongoSettings);
mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!');
    
})


import { getUrlCategories } from './tasks/distributors';
getUrlCategories();

// import { filterUrl} from './tasks/featRegex';
// filterUrl();



server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

// handle uncaught exceotions
process.on('uncaughtException',err => {
    console.error('There was an uncaught error', err);
    
});