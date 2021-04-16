import AddressModel from '../models/address';
import DistrictModel from '../models/district';
import { CHOZOI_API } from '../constants/api';
import axios from 'axios';
export default async (place) => {
    try {
        let province_id: number;
        let district_id: number;
        let ward_id: Number;
        let address_detail: string;
        let address;
        const district_name = place.split(',')[0];
        const province_name = place.split(',')[1];
        const proAdrs: any = await AddressModel.findOne({ $text: { $search: province_name } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).limit(1);
        province_id = Number(proAdrs.cz_id);
        const disAdrs: any = await DistrictModel.find({ $text: { $search: district_name } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).limit(2);
        const result = disAdrs.find(item => item.province_id === province_id);
        district_id = result._id;
        const apiUrl = `${CHOZOI_API}/v1/wards?districtId=${district_id}`;
        const wardResponse: any = await axios.get(apiUrl, { timeout: 10000 });
        const ward = wardResponse.data.wards[0];
        ward_id = ward.id;
        address_detail = `${ward.wardName}, ${district_name}, ${province_name}`;
        console.log(province_id, district_id, ward_id, address_detail);
        address = {
            province: {
                province_id: province_id,
                province_name: province_name
            },
            district: {
                district_id: district_id,
                district_name: district_name
            },
            ward: {
                ward_id: ward_id,
                ward_name: ward.wardName
            },
            address_detail: address_detail
        }
        console.log(address);
        
        return address;

    } catch (e) {

        console.log(e)

    }

}