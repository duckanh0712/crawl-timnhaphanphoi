import puppeteer from 'puppeteer';

export default () => {
    const THITRUONGSI = `https://thitruongsi.com/`;
    console.log(THITRUONGSI);
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
            await page.goto(THITRUONGSI);
            const form = await page.$('.align-self-center > .as-action');
            await form.evaluate(form => form.click());
            const phoneNumber = await page.waitForSelector("#Email");
            await phoneNumber.type("0931295666");
            const password = await page.waitForSelector("#Password");
            await password.type("hizhizkeke123");
            await page.keyboard.press('Enter');
            // await page.screenshot({ path: './images/tfghfdh.png' });
            // const data = await page.evaluate(() => {
            //     const columns = document.querySelectorAll(".shop-item > a");
            //     let haha;
            //     columns.forEach(item => {
            //         haha.push(item.getAttribute('src'));
            //     });
            //     return data;
            // });
            // await page.close();


            resolve(1)

        } catch (e) {
            console.log(e);
            reject(e)
        }


    });
}


//  export default  async () => {
//     const browser = await puppeteer.launch(/*{headless: false}*/);
//     const page = await browser.newPage();
//     await page.goto('https://www.southwest.com/', { waitUntil: 'domcontentloaded' });
//     await page.waitFor('#LandingAirBookingSearchForm_originationAirportCode');
//     await page.evaluate(() => {
//         document.getElementById('LandingAirBookingSearchForm_originationAirportCode').textContent='Dallas'; 
//         document.getElementById('LandingAirBookingSearchForm_originationAirportCode').dispatchEvent(new Event('input',{bubbles:!0}));
//     });
//     await browser.close();
// };