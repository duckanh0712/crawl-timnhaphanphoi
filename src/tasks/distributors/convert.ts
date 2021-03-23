import DistributorModel from '../../models/distributors';
import filterUrl from '../../untils/urlFilter';
import filterEmail from '../../untils/emailFilter';
import { TIMNHAPHANPHOI_API } from '../../constants/api';
export default async (distributor) => {
    try {
        const links = await filterUrl(distributor.content);
        const emails = await filterEmail(distributor.content)
        // console.log('links', distributor);
        // console.log('email',emails);
        const postId = distributor.info[0];
        let images = [];
        distributor.images.map((item, index) => {
            images.push({
                image_url: `${TIMNHAPHANPHOI_API}${item}`,
                sort: index
            });
        })
        const data = {
            _id: postId,
            title: distributor.title,
            category: distributor.info[1],
            priority_area: distributor.info[2],
            phone: distributor.phone,
            images: images,
            links: links,
            emails: emails,
            content: distributor.content

        }
        await DistributorModel.create(data).catch(_e =>{
            console.log(_e);
        })
        console.log(data);

    } catch (e) {
        console.log(e);
    }


}