import fs from 'fs';
import path from 'path';
import { sleep } from '../utils/common';
import  { downloadSitemapShop }  from '../tasks/wholesale/dowloadSitemapShop';
import saveCatZS from '../utils/saveCategoryZasi';
import tss from './wholesale/tss';
export const rootPath: string = process.cwd();
export const sitemapPath = path.join(rootPath, 'sitemaps')
export default async () => {

    try {
        if (!fs.existsSync(sitemapPath)) {
            fs.mkdirSync(sitemapPath);
        }
    }
    catch (e) {
        console.log(e);

        return;
    }
    await sleep(2000);

    try {
        // await saveCatZS();
        // await downloadSitemapShop();
        await tss();
        
    } catch (e) {
        console.log(e);

    }

// const str = '160d';
// const strArr: any = str.split(',');

// if (isNaN(strArr[0]) == true) 
// console.log('loi me may roi');
// console.log(strArr);
// const price = str.split('d');
// console.log(price[0]);


}
