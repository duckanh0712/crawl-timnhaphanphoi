import puppeteer from 'puppeteer';
import { SENDO_HTTP } from '../../constants/api';
 async function autoScroll(page) {
    try {
        await page.evaluate(async () => {
            await new Promise((resolve, _reject) => {
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve(1);
                    }
                }, 100);
            });
        });
    } catch (error) {

        console.log(error);

    }
}

export const getProductDetail = async (browser, productUrls: string[]) => {
    try {
        const page = await browser.newPage();
        const products = productUrls;
        let productUrl = products.shift();
        while (productUrl) {
            await page.goto(productUrl);



        }
    } catch (error) {
        console.log(error);

    }
}

export const getproduct = async () => {
// const a =`https://www.sendo.vn/quan-short-nam-levi-cha-t-luo-ng-khong-xuo-ng-ma-u-jn235d-10803701.html`;
// const productIdTmp = new URL(a);
// const productId = productIdTmp.pathname.split("-")[productIdTmp.pathname.split("-").length-1].split(".")[0];
// console.log(productId);

// return
    const url = `${SENDO_HTTP}/khoi-pin-lithium-48v-12ah-cho-xe-dien-luu-tru-dien-thay-binh-acquy-32087979.html`;
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized',
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        const page = await browser.newPage();
        await page.goto(url);
        await autoScroll(page);
        const data = await page.evaluate(() => {
            const productCateQuery = document.querySelectorAll(".item_1WT2")
            const productName = document.querySelector(".productName_3Cdc").textContent;
            const price = document.querySelector(".currentPrice_2zpf").textContent.split('đ')[0].replace('.', '').replace(".","");
            const imageProductsQuery = document.querySelectorAll(".item_R9_c.thumb_T50V > img");
            let images = [];
            imageProductsQuery.forEach(item => {
                images.push(item.getAttribute("data-src").replace("50x50","500x500").slice(2));
            });
            let productDes = document.querySelectorAll(".details-block > div > div , .details-block > div > div > div > div ");
            if(productDes.length == 0) {
                productDes = document.querySelectorAll(".details-block > div > p");
            }
            let cate = [];
            productCateQuery.forEach( item => {
                cate.push(item.textContent);
            });
            let des = "";
            productDes.forEach( item => {
                des = `${des}/n${item.textContent}`;
            });
            const data = {
                productName,
                price,
                des,
                images,
                category: cate.slice(-1)[0]
            }
            return data;

        });
        console.log(data);

    } catch (error) {
        console.log(error);

    }

}


export const getProductsItem = async (browser, shopUsername) => {
    try {
        const url: string = `${SENDO_HTTP}/shop/${shopUsername}/san-pham`;
        const page = await browser.newPage();

        await page.goto(url);
        await autoScroll(page);
        await page.click(".aa34b._1b946._665b8.f99ea.dc4b7");
        await page.waitForSelector('.item_3x07', { visible: true });
        await autoScroll(page);
        const currentUrl = await page.url();
        const shopId = currentUrl.split('=')[2];
        const data = await page.evaluate(() => {
            const pageItem = document.querySelector(".paginationForm_c7Tb > input ").getAttribute("max");

            const getProductsItem = document.querySelectorAll(".item_3x07");
            let productUrls = [];
            getProductsItem.forEach(item => {
                productUrls.push(item.getAttribute("href"));
            });
            const data = {
                productUrls,
                pageItem
            }
            return data
        });

        // await page.close();
        if (data.pageItem >= 2) {
            for (let i = 2; i <= data.pageItem; i++) {
                const urlProducts: string = `${SENDO_HTTP}/tim-kiem?page=${i}&platform=2&seller_admin_id=${shopId}`
                await page.goto(urlProducts);
                await page.waitForSelector('.item_3x07', { visible: true });
                await autoScroll(page);
                const data = await page.evaluate(() => {
                    const getProductsItem = document.querySelectorAll(".item_3x07");
                    let productUrls = [];
                    getProductsItem.forEach(item => {
                        productUrls.push(item.getAttribute("href"));
                    });
                    const data = {
                        productUrls,

                    }
                    return data;
                });

            }
        }

    } catch (error) {
        console.log(error);

    }

}