import  { Schema } from 'mongoose';
import mongoose from './index';

const DistributorSchema: Schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: [ true, 'ID is required!']
        },
        title: String,
        contact_name: String,
        category: String,
        priority_area: String,
        phone: String,
        image: Array
    }
);