
import path from 'path';
import puppeteer from 'puppeteer';
import { sitemapPath } from '../index';
import axios from 'axios';
import { createGunzip } from 'zlib';
import { createWriteStream } from 'fs';
import fs from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { ReadStream, createReadStream } from 'fs';
import xmlFlow from 'xml-flow';
import { Stats } from 'fs';
import SendoShopModel from '../../models/sendoShops';
import { sleep } from '../../utils/common';
import { getFileStat } from '../../utils/common';
import RetryFileModel from '../../models/retryFile';
import { Platforms } from '../../constants/common';
import getLocationTTS from '../../utils/getLocationTTS';
import { getProductsItem } from './product';

const SENDO_HTTP = `https://www.sendo.vn`
const crawlShopsPromise = (shopSitemapPath: string) => {
    return new Promise((resolve, reject) => {
        console.log('crawling:', shopSitemapPath);
        const shopQueue: string[] = [];
        try {
            let readStream: ReadStream = createReadStream(shopSitemapPath);
            readStream.setEncoding('utf8');

            let xmlStream = xmlFlow(readStream);
            xmlStream.on('tag:loc', shopTag => {
                const shopName = new URL(shopTag.$text).pathname.substring(6);
                shopQueue.push(shopName);
            });

            xmlStream.on('end', async () => {

                readStream.close();
                await crawlShop(shopQueue);
                resolve(1);
            });
        }
        catch (e) {
            reject(e);
        }
    })
}

const crawlShop = async (shopQueue) => {
    return new Promise(async (resolve, reject) => {

        const browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized',
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });

        try {
            let shopName: string = shopQueue.shift();
            while (shopName) {
                const url = `https://www.sendo.vn/shop/${shopName}/thong-tin-shop`
                const page = await browser.newPage();
                await page.goto(url);
                // await page.waitForNavigation({
                //     waitUntil: 'networkidle0',
                // });
                const data = await page.evaluate(() => {


                });
                // const items: any = await page.$$('li._00f63 da3bc._99802 a2337')
                // await items[4].click();
                page.click("li._00f63 da3bc._99802 a2337")
                await page.close();
                shopName = shopQueue.shift();
            }

            await browser.close();
            resolve(1)
        } catch (e) {
            await browser.close();
            console.log(e);
            reject(e)
        }


    });
}

const convertShop = async (shopUsername, shopDetail) => {
    try {
        const add = shopDetail.shopAddress.split(',').slice(-2);
        const addString = `${add[0]},${add[1]}`
        // const address = await getLocationTTS(addString);
        const address_detail = 'Số 272 Phố Nguyễn Lân, Phường Phương Liệt, Quận Thanh Xuân, Thành phố Hà Nội';
        const address = {
            province: {
                province_id: 24,
                province_name: 'Thành phố Hà Nội'
            },
            district: {
                district_id: 9,
                district_name: 'Quận Thanh Xuân'
            },
            ward: {
                ward_id: 123,
                ward_name: 'Phường Phương Liệt'
            },
            address_detail: address_detail
        }
        const shop = {
            _id: `${Platforms.sendo}.${shopDetail.shopPhone}`,
            username: shopDetail.shopPhone,
            name: shopDetail.shopNameQuery,
            phone_number: shopDetail.shopPhone,
            email: shopDetail.shopEmail,
            description: shopDetail.shopDescription,
            img_avatar_url: shopDetail.shopAvatar,
            img_cover_url: shopDetail.shopCover,
            link: `${SENDO_HTTP}/shop/${shopUsername}`,
            platforms: `${Platforms.sendo}`,
            address: address
        }
        console.log(shop,addString);
        await SendoShopModel.create(shop);

    } catch (error) {
        console.log('can not creat shop by', error);

    }
}

export const crawlShopTmp = async () => {
    const shopUsername = `sinh-vat-canh-manh-hung`;
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                headless: false,
                args: ['--start-maximized',
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            });

            const url = `${SENDO_HTTP}/shop/${shopUsername}/thong-tin-shop`
            const page = await browser.newPage();
            await page.goto(url);
            // await page.waitForNavigation({
            //     waitUntil: 'networkidle0',
            // });
            const data = await page.evaluate(() => {

                const shopNameQuery = document.querySelector(".shop-summary-info__shop-name_20VH > div > span ").textContent;
                const shopDetailQuerys = document.querySelectorAll(".textDesc_1ut7");
                let shopAvatar = "";
                try {
                    shopAvatar = document.querySelector(".shop-summary-info__left_2eyn > img").getAttribute("src");
                } catch (error) {
                    console.log(error);

                }
                let shopCover = "";
                try {
                    shopCover = document.querySelector(".shop-cover_3xVE > img ").getAttribute("src");
                } catch (error) {
                    console.log(error);

                }
                const shopDescription = document.querySelector(".slogan_3Zay > p").textContent;
                const shopAddress = shopDetailQuerys[2].textContent;
                const shopPhone = shopDetailQuerys[3].textContent;
                const shopEmail = shopDetailQuerys[4].textContent;
                const data = {
                    shopNameQuery,
                    shopAddress,
                    shopPhone,
                    shopEmail,
                    shopDescription,
                    shopAvatar,
                    shopCover,
                }
                return data
            });

            console.log(data);
            await convertShop(shopUsername, data);
            await getProductsItem(browser, shopUsername)
            resolve(1)
        } catch (e) {

            console.log(e);
            reject(e)
        }


    });
}

const pipe = promisify(pipeline);
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
        // fs.unlink(filePath, (e) => { console.log('can not delete:', filePath, ' because:', e); });
    }
}

export const downloadSitemapShopSendo = async () => {
    // try {
    //     await RetryFileModel.create({ _id: `sendo`, name: "https://www.sendo.vn/sitemaps/shop.xml.gz" });

    // } catch (error) {
    //     console.log(error);

    // }
    // const item: any = await RetryFileModel.findById(`sendo`);
    // // const index = item.name.split('-')[1].split('.')[0];
    // const sitemapUrl = new URL(item.name);
    // console.log(sitemapUrl);

    // const sitemap = sitemapUrl.pathname.slice(1, -3);
    // return
    // for (let i = 0; i <= 40; i++) {

    // const url = `https://sitemap.shopee.vn/sitemap.shops-${i}.xml.gz`;
    const url = `https://www.sendo.vn/sitemaps/shop1.xml.gz`
    console.log('url', url);
    // await RetryFileModel.updateOne({ _id: 1 }, { name: url });
    const sitemapUrl = new URL(url); console.log(sitemapUrl);

    const sitemap = sitemapUrl.pathname.slice(10, -3);
    const currentSitemapPath = path.join(sitemapPath, sitemap);
    try {
        await downloadSitemap(url, currentSitemapPath)
    }
    catch (e) {
        // break;
    }
    try {

        console.log('currentSitemapPath', currentSitemapPath);
        const fileStat: Stats = await getFileStat(currentSitemapPath);
        if (fileStat.isFile) {
            try {
                await crawlShopsPromise(currentSitemapPath);
                await fs.unlink(currentSitemapPath, (e) => { console.log('can not deleteeeeeeeeeeeee:', currentSitemapPath, ' because:', e); });

            }
            catch (e) {
                console.log(e);
            }
        }


    }
    catch (e) {

        console.log(e);

    }


    // }

}


