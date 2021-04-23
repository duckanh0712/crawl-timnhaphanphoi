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

import crawl from './tasks/index';
crawl();
// import { getUrlCategories } from './tasks/distributors';
// try{
//     getUrlCategories();
// }catch(e){
//     console.log(e);
    
// }
// import thitruonsi from './tasks/wholesale/index';
// thitruonsi();
// import {getCategory} from './untils/getCategory';
// getCategory(`Giày Dép - Túi Xách`);




server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

// handle uncaught exceotions
process.on('uncaughtException',err => {
    console.error('There was an uncaught error', err);
    
});