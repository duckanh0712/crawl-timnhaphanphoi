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
    const url = `${SENDO_HTTP}/cay-si-ro-giong-27980543.html?source_block_id=search_products&source_info=desktop2_60___session_key___ac9eebc7-8238-42d1-b359-7cd75102eb44_0_algo6_0_181_0_-1&source_page_id=search_rank`
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
        const data = await page.evaluate(() => {
            const data = {

            }
            return data;
        });
    } catch (error) {

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