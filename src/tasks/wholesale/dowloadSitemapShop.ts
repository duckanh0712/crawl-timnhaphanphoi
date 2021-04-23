import path from 'path';
import axios from 'axios';
import { createGunzip } from 'zlib';
import { createWriteStream } from 'fs';
import fs from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { ReadStream, createReadStream } from 'fs';
import { Stats } from 'fs';
import shopCrawl from '../wholesale/index';

export const rootPath: string = process.cwd();
export const sitemapPath = path.join(rootPath, 'sitemaps')
const pipe = promisify(pipeline);
const getFileStat = promisify(fs.stat);
export const downloadSitemap = async (url: string, filePath: string) => {
    const gunzip = createGunzip();
    const fileWriteStream = createWriteStream(filePath);
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            timeout: 25000
        });

        await pipe(response.data, gunzip, fileWriteStream);
    }
    catch (e) {
        fileWriteStream.close();
    }
}


const readfileXML = async (sitemapPath: string) => {
    console.log(5);
    
    try {
        
        let readStream: ReadStream = createReadStream(sitemapPath);
        readStream.setEncoding('utf-8');
        let searchLinks = [];

        await  readStream.on('data', searchLink => {
            searchLinks.push(searchLink);
        });
        readStream.on('error', err => {

            console.log(err);

        });
        await  readStream.on('close', async () => {

            if (searchLinks.length > 0) {
                const shops = searchLinks[0].split('\n');
                let shop = shops.shift();
                while (shop) {

                    await shopCrawl(shop);

                    shop = shops.shift();

                }
            }

        });


    } catch (error) {
        console.log(error);

    }
}

export const downloadSitemapShop = async () => {

    for (let index = 1; index <= 1; index++) {
        const url = `https://s3.thitruongsi.com/sitemaps/shop_search_${index}.xml.gz`;
        console.log(url);
        console.log(1);

        const sitemapUrl = new URL(url)
        const sitemap = sitemapUrl.pathname.slice(10, -3)
        const currentSitemapPath = path.join(sitemapPath, sitemap);

        try {
            console.log(2);
            await downloadSitemap(url, currentSitemapPath);
        }
        catch (e) {
        
            break;
        }
        try {
            console.log(3);
            const fileStat: Stats = await getFileStat(currentSitemapPath);

            try {
                console.log(4);

                await readfileXML(currentSitemapPath);
                // await fs.unlink(currentSitemapPath, () => { });

            }
            catch (e) {
                console.log(e);
            }

        }
        catch (e) {

            console.log(e);

        }
        console.log(5);
        

    }

}