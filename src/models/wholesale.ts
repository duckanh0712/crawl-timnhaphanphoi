import  { Schema } from 'mongoose';
import mongoose from './index';

const WholesaleSchema: Schema = new mongoose.Schema(
    {
        
        name: String,
        email: String,
        detail_address: String,
        phone_number: String,
        contact_name: String,
        avatar_url: String,
        sort_description: String,
        views: Number,
        followers: Number,
        product_total: Number,
        product_crawled: Number,
        operation_time: Number,
        businessType: String,
        businessModel: String,
        tax_code: String,
        area: String,
        industry: String,
        images: Array,
        description: String,
        address: {
            province:{
                province_id: Number,
                province_name: String
            } ,
            district: {
                district_id: Number,
                district_name: String
            },
            ward: {
                ward_id: Number,
                ward_name: String
            },
            address_detail: String,
        },
        
      
    },{
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

export default mongoose.model('tts_shops', WholesaleSchema)