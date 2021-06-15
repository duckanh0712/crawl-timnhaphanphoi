import fs from 'fs';
import path from 'path';
import { sleep } from '../utils/common';
import  { downloadSitemapShop }  from '../tasks/wholesale/dowloadSitemapShop';
import saveCatZS from '../utils/saveCategoryZasi';
import tss from './wholesale/tss';
import {tesst} from '../tasks/wholesale/index';
import { downloadSitemapShopSendo, crawlShopTmp } from '../tasks/sendos/index';
export const rootPath: string = process.cwd();
export const sitemapPath = path.join(rootPath, 'sitemaps');
import { startBrowser } from '../tasks/sendos/getCategories';
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
        // await startBrowser();
        // await saveCatZS();
        // await downloadSitemapShop();
        // await tss();
        // await tesst();
        // await downloadSitemapShopSendo();
        await crawlShopTmp();
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
