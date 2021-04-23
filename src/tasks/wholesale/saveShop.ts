import WholesaleModel from '../../models/wholesaleShop';
import getLocationTTS from '../../untils/getLocationTTS';
import filterEmails from '../../untils/emailFilter';
import { Platforms } from '../../constants/common';
export const createShop = async (data,phone) => {
    console.log(8);
    
    try {
        const address = await getLocationTTS(data.addressString);
        const emails = await filterEmails(data.shopDescription);

        const shop = {
            _id: `${Platforms.tts}.${phone}`,
            name: data.shopName,
            emails: emails,
            address_detail: !data.addressDetail ? null : data.addressDetail,
            phone_number: phone,
            contact_name: data.contactName,
            avatar_url: data.shopAvatar,
            sort_description: data.description,
            views: data.shopViews,
            followers: data.shopfollowers,
            product_total: data.products,
            operation_time: data.operationTime,
            businessType: !data.businessType ? null : data.businessType,
            businessModel: !data.businessModel ? null : data.businessModel,
            tax_code: !data.taxCode ? null : data.taxCode ,
            area: !data.area ?  null : data.area ,
            industry: data.industry ? data.industry : null,
            images: (!data.images) ? null : data.images ,
            description: (!data.shopDescriptions) ? null : data.shopDescriptions,
            address: address
        }
        console.log(shop);
        await WholesaleModel.create(shop);
    } catch (e) {
        console.log(e);

    }

}