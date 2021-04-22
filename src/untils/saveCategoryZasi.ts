import ZasiCategoriesmodel from '../models/zasiCategoires';
import axios from 'axios';
export default async () => {
    try {
        const catApi = `https://dev.api.zasi.vn/v1/product/category`;
        const responseCat = await axios.get(catApi);
        const categorires = responseCat.data.categories;
        for (let i = 0; i < categorires.length; i++) {
            if (categorires[i].level == 3) {
                const category = {
                    _id: Number(categorires[i].id),
                    parent_id: Number(categorires[i].parentId),
                    level: Number(categorires[i].level),
                    sort: Number(categorires[i].sort),
                    name: categorires[i].name,
                }
                console.log(categorires[i].name);
                await ZasiCategoriesmodel.create(category);
            }

        }

    } catch (error) {
        console.log(error);

    }

}