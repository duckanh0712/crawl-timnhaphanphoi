import puppeteer from 'puppeteer';
import { SENDO_HTTP } from '../../constants/api';
import { sleep } from '../../utils/common';
import CateSenDoModel from '../../models/cateSendos';
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


export const getCategories = async (browser) => {
    const url = `${SENDO_HTTP}/sitemap`;
    try {


        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 })
        await page.goto(url);
        await autoScroll(page);
        const data = await page.evaluate(() => {
            const cat2 = document.querySelectorAll(".cat_2URx");
            const data = {
                itemCount: cat2.length
            }
            return data;

        });
        const items = await page.$$('.cat_2URx');
        for (let index = 0; index < items.length; index++) {
            await items[index].click();

            const data = await page.evaluate(() => {
                const categoriesQuery = document.querySelectorAll(".mounted_YTF6");
                let categories = []
                categoriesQuery.forEach(element => {
                    categories.push(element.textContent);
                });
                const data = {
                    categories
                }
                return data;

            });
            // await sleep(1000);
            for (let index = 0; index < data.categories.length; index++) {

                try {
                    await CateSenDoModel.create({ _id: data.categories[index], name: data.categories[index] })

                } catch (error) {
                    console.log(error);

                }

            }

        }


    } catch (error) {
        console.log(error);

    }
}


export const startBrowser = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized',
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    await getCategories(browser);
}