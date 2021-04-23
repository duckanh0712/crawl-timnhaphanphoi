import fs from 'fs';
import path from 'path';
import { sleep } from '../untils/common';
import  { downloadSitemapShop }  from '../tasks/wholesale/dowloadSitemapShop';
import saveCatZS from '../untils/saveCategoryZasi';

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
        await downloadSitemapShop();

    } catch (e) {
        console.log(e);

    }


}
