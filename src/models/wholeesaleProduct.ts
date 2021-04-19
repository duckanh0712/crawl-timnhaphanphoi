import { Schema } from 'mongoose';
import mongoose from './index';

const WholesaleProductSchema: Schema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        minimum: Number,
        stock: Number,
        images: Array,
        shop_id: String,
        category: {
            category_name: String,
            category_id: Number
        }



    }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
);

export default mongoose.model('tts_products', WholesaleProductSchema)