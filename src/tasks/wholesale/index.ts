import puppeteer from 'puppeteer';
import { TTS_API } from '../../constants/api';
import { sleep } from '../../untils/common';
const loginTTS = async (page) => {
    const form = await page.$('.align-self-center > .as-action');
    await form.evaluate(form => form.click());
    const phoneNumber = await page.waitForSelector("#Email");
    await phoneNumber.type("0931295666");
    const password = await page.waitForSelector("#Password");
    await password.type("hizhizkeke123");
    await page.keyboard.press('Enter');
}

const getShop = async (browser, shopUrls) => {
    try {
        const page = await browser.newPage();
        for (let i = 0; i < shopUrls.length; i++) {
            try {
                const shopUrl = `${TTS_API}${shopUrls[i]}`
                await page.goto(shopUrl);

                const data = await page.evaluate(() => {
                    
                    const shopName = document.querySelector(".shop-intro__name").textContent;
                    const shopAvatar = document.querySelector(".shop-intro__avatar").getAttribute('src');
                    const shop = {
                        shopName,
                        shopAvatar
                    }
                    return shop;

                });
                // const form = await page.$('.btn-outline-link');
                // await form.evaluate(form => form.click());
                await page.$$eval('.btn-outline-link', elements => elements[1].click());
                // await page.waitForSelector('.modal-body', {
                //     visible: true,
                //   });
                // const phoneNumber: any = document.querySelectorAll;("textarea");
                // let images = [];
                // phoneNumber.forEach(item => {
                //     images.push(item.getAttribute('src'));
                // });
                // console.log('phoneNumber', images);
                console.log('data', data);

            } catch (error) {
                console.log(error);

            }
            await sleep(1500);


        }
    } catch (e) {
        console.log(e);

    }
}


export default () => {
    const searchUrl = `https://thitruongsi.com/shop/search?keyword=%C3%A1o%20ba%20l%E1%BB%97%20nam`;
    console.log(searchUrl);
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
            await page.goto(searchUrl);
           

            const data = await page.evaluate(() => {
                const shopsLink = document.querySelectorAll('.shop-item > a');
                let shopsLinks = [];
                shopsLink.forEach(item => {
                    shopsLinks.push(item.getAttribute("href"));
                });
                // shopsLinks.push(`/shop/jbstore-5d5d393a77f4d`);
                return shopsLinks;

            });
            console.log(data);
            await loginTTS(page); console.log(121213132);
            await page.waitForNavigation({
                waitUntil: 'networkidle0',
              });
            await getShop(browser, data)
            resolve(1)


        } catch (e) {
            console.log(e);
            reject(e)
        }


    });
}
