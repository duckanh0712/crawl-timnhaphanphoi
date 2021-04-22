import puppeteer from 'puppeteer';

// export default () => {

//     const searchUrl = `https://thitruongsi.com/vo-nam-nu-1333568.html`;
//     console.log(searchUrl);
//     return new Promise(async (resolve, reject) => {

//         try {
//             const browser = await puppeteer.launch({
//                 headless: false,
//                 args: ['--start-maximized',
//                     '--no-sandbox',
//                     '--disable-setuid-sandbox'
//                 ]


//             });
//             const page = await browser.newPage();
//             await page.goto(searchUrl);
//             const productDetail = await page.evaluate(() => {
//                 let productPrice;
//                     const productName = document.querySelector("h1").textContent;
//                     const productMinimum = document.querySelector(".css-4bsvdr > div > strong").textContent;
//                     let productImages = document.querySelectorAll(".jsx-929251746.css-whm7bm > div > div > div > img");
//                     const productDescription = document.querySelector(".tab-pane.active >.css-52n5xd").textContent;
//                     let images = [];
//                     productImages.forEach(item => {
//                         images.push(item.getAttribute("src"));
//                     });
//                     try {
//                         productPrice = document.querySelector(".jsx-1704392005.multiple-price > div").textContent;
//                     } catch (error) {
//                         productPrice = document.querySelector(".jsx-1922897821.single-price").textContent;
//                     }
//                     if (images.length < 1) {
//                         productImages = document.querySelectorAll(".col-2 > div > div > img");
//                         productImages.forEach(item => {
//                             images.push(item.getAttribute("src"));
//                         });
//                     }
//                 const product = {
//                     productName,
//                     productPrice,
//                     productMinimum,
//                     productDescription,
//                     images
//                 }
//                 return product;
//             });
//             console.log(productDetail);

//             resolve(1)


//         } catch (e) {
//             console.log(e);
//             reject(e)
//         }


//     });
// }


// export const hamtest = async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         args: ['--start-maximized',
//             '--no-sandbox',
//             '--disable-setuid-sandbox'
//         ]
//     });
//     const page = await browser.newPage();
//     await page.goto(`https://thitruongsi.com/shop/xuong-chuyen-si-thoi-trang-thien-huu/product?filter_category_lv1=577628f5d54542290d000001`);
//     const data = await page.evaluate(() => {
//         let pageAfter;
//         const productSelector = document.querySelectorAll(".productName > a");
//         let productlinks = [];
//         productSelector.forEach(item => {
//             productlinks.push(item.getAttribute('href'));
//         });
//         try {
//             pageAfter = document.querySelector(".page-item.active + li > a").getAttribute("href");
//         } catch (error) {
//             console.log(error);

//         }
//         return productlinks;

//     });
//     console.log('11111111111111111111111111111111111111111111111111111111111111111111', pageAfter);
// }