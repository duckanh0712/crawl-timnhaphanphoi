import ZasiCategoriesmodel from '../models/zasiCategoires';
import axios from 'axios';
export default async () => {
    try {
        const catApi = `https://dev.api.zasi.vn/v1/product/category`;
        const responseCat = await axios.get(catApi);
        const categorires = responseCat.data.categories;
        let cate = categorires.shift();
        while (cate) {
            if (cate.level == 3) {
                const category = {
                    _id: Number(cate.id),
                    parent_id: Number(cate.parentId),
                    level: Number(cate.level),
                    sort: Number(cate.sort),
                    name: cate.name,
                }
                console.log(cate.name);
                await ZasiCategoriesmodel.create(category);
            }
            cate = categorires.shift();
        }

    } catch (error) {
        console.log(error);

    }

}