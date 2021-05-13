import ZasiCategoriesModel from '../models/zasiCategoires';

export const getCategory = async (catName) => {
    try {

        const categorydata: any = await ZasiCategoriesModel.find({ $text: { $search: catName } }, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .limit(1);

        const category = {
            category_name: categorydata.name,
            category_id: categorydata._id
        }
        return category;

    } catch (error) {
        console.log(error);

    }
}