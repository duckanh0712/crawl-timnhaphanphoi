import puppeteer from 'puppeteer';
import { TTS_API } from '../../constants/api';
import { Platforms } from '../../constants/common';
import WholesaleModel from '../../models/wholesaleShop';
// import { getUrlProduct } from '../../tasks/wholesale/saveProduct';
import { createShop } from '../wholesale/saveShop';
const loginTTS = async (page) => {
    const form = await page.$('.align-self-center > .as-action');
    await form.evaluate(form => form.click());
    const phoneNumber = await page.waitForSelector("#Email");
    await phoneNumber.type("0931295666");
    const password = await page.waitForSelector("#Password");
    await password.type("hizhizkeke123");
    await page.keyboard.press('Enter');
}

export const getUrlProduct = async (page, productUrl) => {


    try {
        


        let nextPage: string = productUrl;

        while (nextPage) {
            await page.goto(nextPage);
            await page.waitForSelector('.item', { visible: true });
            const data = await page.evaluate(() => {
                let pageAfter;
                const productSelector = document.querySelectorAll(".item > a");
                let productlinks = [];
                productSelector.forEach(item => {
                    productlinks.push(item.getAttribute('href'));
                });
                try {
                    pageAfter = document.querySelector(".page-item.active + li > a").getAttribute("href");
                } catch (error) {
                    console.log(error);

                }
                const data = {
                    productlinks,
                    pageAfter
                }
                return data;
            });
            console.log("data",data);
            
            nextPage = data.pageAfter ? `${TTS_API}${data.pageAfter}` : null;
            // await saveProduct(page, data.productlinks, shopId);
        }



    } catch (error) {
        console.log(error);

    }

}

// const getShop = async (browser, shopUrls) => {
//     console.log(7);

//     try {
//         const page = await browser.newPage();
//         for (let i = 0; i < shopUrls.length; i++) {
//             try {
//                 const shopUrl = `${TTS_API}${shopUrls[i]}`
//                 await page.goto(shopUrl);
//                 const data = await page.evaluate(() => {

//                     const shopName = document.querySelector(".shop-intro__name").textContent;
//                     const shopAvatar = document.querySelector(".shop-intro__avatar").getAttribute('src');
//                     const shopDescription = document.querySelectorAll(".jsx-898174646 > div  > p ");
//                     const shopStatistic = document.querySelectorAll(".jsx-2057245010.mr-4 > .jsx-2057245010");
//                     const shopMetaNames = document.querySelectorAll(".shop-meta__name");
//                     const shopMetaValues = document.querySelectorAll(".shop-meta__value");
//                     const operationTimes = document.querySelectorAll(".css-1t42tx8 > div > span");
//                     const shopImages = document.querySelectorAll(".image-lightbox > img");
//                     const addressString = document.querySelector(".text-truntcate.text-muted").textContent;
//                     const productsShow = document.querySelector(".border-bottom.border-dark").getAttribute("href");
//                     let shopDescriptions: string, businessType: string, imageCoverUrl: string;
//                     try {

//                         shopDescriptions = document.querySelector(".shop-description").textContent;

//                     } catch (e) {

//                         shopDescriptions = null;
//                     }
//                     try {

//                         imageCoverUrl = document.querySelector(".css-7b2ct2 > img").getAttribute("src");

//                     } catch (e) {

//                         imageCoverUrl = null;
//                     }
//                     try {

//                         businessType = document.querySelector(".jsx-2057245010.shop-intro .p-2 .jsx-2057245010 > img").getAttribute('src');

//                     } catch (e) {

//                         businessType = null;
//                     }
//                     let operationTime: number = Number(operationTimes[1].textContent);
//                     if (operationTimes.length >= 3) {
//                         operationTime = Number(operationTimes[2].textContent);
//                     }
//                     let images = [];
//                     shopImages.forEach(item => {
//                         images.push(item.getAttribute("src"));
//                     });
//                     let companyName: string, businessModel: string, taxCode: string;
//                     let contactName: string, area: string, industry: string, addressDetail: string;

//                     for (let i = 0; i < shopMetaNames.length; i++) {

//                         if (shopMetaNames[i].textContent == `Tên doanh nghiệp:`) {
//                             companyName = shopMetaValues[i].textContent
//                         }
//                         if (shopMetaNames[i].textContent == `Mô hình kinh doanh`) {
//                             businessModel = shopMetaValues[i].textContent;
//                         }
//                         if (shopMetaNames[i].textContent == `Mã số thuế`) {
//                             taxCode = shopMetaValues[i].textContent;
//                         }
//                         if (shopMetaNames[i].textContent == `Đại diện`) {
//                             contactName = shopMetaValues[i].textContent;
//                         }
//                         if (shopMetaNames[i].textContent == `Thị trường`) {
//                             area = shopMetaValues[i].textContent;
//                         }
//                         if (shopMetaNames[i].textContent == `Ngành hàng`) {
//                             industry = shopMetaValues[i].textContent;
//                         }
//                         if (shopMetaNames[i].textContent == `Địa chỉ`) {
//                             addressDetail = shopMetaValues[i].textContent;
//                         }

//                     }


//                     const shopViews = Number(shopStatistic[0].textContent);
//                     const shopfollowers = Number(shopStatistic[2].textContent);
//                     const products = Number(shopStatistic[4].textContent);
//                     let description = '';
//                     shopDescription.forEach(item => {
//                         description = `${description}${item.textContent}\n`;
//                     });

//                     const shop = {

//                         imageCoverUrl,
//                         shopName,
//                         shopAvatar,
//                         description,
//                         shopViews,
//                         shopfollowers,
//                         products,
//                         operationTime,
//                         companyName,
//                         businessModel,
//                         businessType,
//                         taxCode,
//                         contactName,
//                         area,
//                         industry,
//                         addressDetail,
//                         images,
//                         shopDescriptions,
//                         addressString,
//                         productsShow

//                     }
//                     return shop;

//                 });
//                 await page.$$eval('.btn-outline-link', elements => elements[2].click());
//                 await page.waitForSelector('textarea', { visible: true });
//                 const getPhoneNumber = await page.evaluate(() => {

//                     const phoneNumber = document.querySelectorAll('textarea');
//                     let images = [];
//                     phoneNumber.forEach(item => {
//                         images.push(item.textContent);
//                     });
//                     return images
//                 });
//                 console.log('=======================', getPhoneNumber);

//                 const shop = await WholesaleModel.findById(`${Platforms.tts}.${getPhoneNumber}`);
//                 if (!shop) {
//                     await createShop(data, getPhoneNumber);
//                     const productUrl = `${TTS_API}${data.productsShow}`;

//                     await getUrlProduct(page, productUrl, getPhoneNumber)

//                 } else {
//                     continue;
//                 }

//             } catch (error) {
//                 console.log(error);

//             }


//         }
//         page.close();
//     } catch (e) {
//         console.log(e);

//     }
// }

export const tesst = async () => {

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized',
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]


    });
    const page = await browser.newPage();
    try {
        const shopUrl = `https://thitruongsi.com/shop/tienthanhtienthanh-5bdbe9c79a52d`
        await page.goto(shopUrl);
        const data = await page.evaluate(() => {

            const shopName = document.querySelector(".shop-intro__name").textContent;
            const shopAvatar = document.querySelector(".shop-intro__avatar").getAttribute('src');
            const shopDescription = document.querySelectorAll(".jsx-898174646 > div  > p ");
            const shopStatistic = document.querySelectorAll(".jsx-2057245010.mr-4 > .jsx-2057245010");
            const shopMetaNames = document.querySelectorAll(".shop-meta__name");
            const shopMetaValues = document.querySelectorAll(".shop-meta__value");
            const operationTimes = document.querySelectorAll(".css-1t42tx8 > div > span");
            const shopImages = document.querySelectorAll(".image-lightbox > img");
            const addressString = document.querySelector(".text-truntcate.text-muted").textContent;
            const productsShow = document.querySelector(".border-bottom.border-dark").getAttribute("href");
            let shopDescriptions: string, businessType: string, imageCoverUrl: string;
            try {

                shopDescriptions = document.querySelector(".shop-description").textContent;

            } catch (e) {

                shopDescriptions = null;
            }
            try {

                imageCoverUrl = document.querySelector(".css-7b2ct2 > img").getAttribute("src");

            } catch (e) {

                imageCoverUrl = null;
            }
            try {

                businessType = document.querySelector(".jsx-2057245010.shop-intro .p-2 .jsx-2057245010 > img").getAttribute('src');

            } catch (e) {

                businessType = null;
            }
            let operationTime: number = Number(operationTimes[1].textContent);
            if (operationTimes.length >= 3) {
                operationTime = Number(operationTimes[2].textContent);
            }
            let images = [];
            shopImages.forEach(item => {
                images.push(item.getAttribute("src"));
            });
            let companyName: string, businessModel: string, taxCode: string;
            let contactName: string, area: string, industry: string, addressDetail: string;

            for (let i = 0; i < shopMetaNames.length; i++) {

                if (shopMetaNames[i].textContent == `Tên doanh nghiệp:`) {
                    companyName = shopMetaValues[i].textContent
                }
                if (shopMetaNames[i].textContent == `Mô hình kinh doanh`) {
                    businessModel = shopMetaValues[i].textContent;
                }
                if (shopMetaNames[i].textContent == `Mã số thuế`) {
                    taxCode = shopMetaValues[i].textContent;
                }
                if (shopMetaNames[i].textContent == `Đại diện`) {
                    contactName = shopMetaValues[i].textContent;
                }
                if (shopMetaNames[i].textContent == `Thị trường`) {
                    area = shopMetaValues[i].textContent;
                }
                if (shopMetaNames[i].textContent == `Ngành hàng`) {
                    industry = shopMetaValues[i].textContent;
                }
                if (shopMetaNames[i].textContent == `Địa chỉ`) {
                    addressDetail = shopMetaValues[i].textContent;
                }

            }


            const shopViews = Number(shopStatistic[0].textContent);
            const shopfollowers = Number(shopStatistic[2].textContent);
            const products = Number(shopStatistic[4].textContent);
            let description = '';
            shopDescription.forEach(item => {
                description = `${description}${item.textContent}\n`;
            });

            const shop = {

                imageCoverUrl,
                shopName,
                shopAvatar,
                description,
                shopViews,
                shopfollowers,
                products,
                operationTime,
                companyName,
                businessModel,
                businessType,
                taxCode,
                contactName,
                area,
                industry,
                addressDetail,
                images,
                shopDescriptions,
                addressString,
                productsShow

            }
            return shop;

        });
        const productUrl = `${TTS_API}${data.productsShow}`;
        console.log(data);
       await getUrlProduct(page, productUrl,);
   
    }
    catch (e) {

    }
}



export default () => {
    console.log(6);
    // console.log(searchUrl);
    return new Promise(async (resolve, reject) => {

        try {
            const browser = await puppeteer.launch({
                headless: false,
                args: ['--start-maximized',
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]


            });
            const page = await browser.newPage();
            // await page.goto(searchUrl);


            const data = await page.evaluate(() => {
                let shopsLinks = [];
                shopsLinks.push(`/shop/tienthanhtienthanh-5bdbe9c79a52d`)
                // const shopsLink = document.querySelectorAll('.shop-item > a');
                // shopsLink.forEach(item => {
                //     shopsLinks.push(item.getAttribute("href"));
                // });

                return shopsLinks;

            });
            console.log(data);
            await loginTTS(page);
            await page.waitForNavigation({
                waitUntil: 'networkidle0',
            });
            // await getShop(browser, data);
            await browser.close();
            resolve(1)


        } catch (e) {
            console.log(e);
            reject(e)
        }


    });
}
