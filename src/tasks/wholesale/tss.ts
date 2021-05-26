import puppeteer from 'puppeteer';

export default () => {

    const searchUrl = `https://thitruongsi.com/keo-chuoi-vi-cay-tui-5kg-1149846.html`;
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
            const productDetail = await page.evaluate(() => {
                let productPrices, productNumbers;
                let prices = [];
                const productName = document.querySelector("h1").textContent;
                const productMinimum = document.querySelector(".css-4bsvdr > div > strong").textContent;
                let productImages = document.querySelectorAll(".jsx-929251746.css-whm7bm > div > div > div > img");
                const productDescriptions = document.querySelectorAll(".tab-pane.active >.css-52n5xd > p");
                const cateQuyery = document.querySelectorAll(".breadcrumb-item");
                const categoryName = cateQuyery[2].textContent;
                let images = [];
                productImages.forEach(item => {
                    images.push(item.getAttribute("src"));
                });
                let productDescription = "";
                productDescriptions.forEach(item => {
                    productDescription = (`${productDescription}${item.textContent}\n`)
                })
                try {
                    productPrices = document.querySelectorAll(".jsx-1704392005.multiple-price");
                    productNumbers = document.querySelectorAll(" .jsx-1704392005.font-90");
                    for (let index = 0; index < productPrices.length; index++) {
                        let price, temptNumbers, temptPrices;
                        try {
                            let temptNumbers = productNumbers[index].textContent.split(' ')[0];
                            if (isNaN(temptNumbers) == true) {
                                temptNumbers = productNumbers[index].textContent.split(' ')[1];
                            }
                            temptPrices = productPrices[index].textContent.split(',');
                            let priceTmp = Number(temptPrices[0]) * 1000;
                            if (temptPrices.length > 2) {
                                priceTmp = Number(`${temptPrices[0]}${temptPrices[1]}`) * 1000;
                            } else if (temptPrices.length == 1) {
                                priceTmp = Number(temptPrices[0].split('đ')[0]);

                            }
                            price = {
                                number: Number(temptNumbers) >= 2 ? Number(temptNumbers) : 2,
                                price: priceTmp
                            }
                        } catch (error) {
                            price = {
                                number: Number(temptNumbers),
                                price: 0
                            }
                        }

                        prices.push(price);

                    }
                } catch (error) {

                    console.log(error);

                }
                if (prices.length < 1) {
                    const productPrice = document.querySelector(".jsx-1922897821.single-price").textContent;
                    const priceArr = productPrice.split(',');
                    let priceTmp: number;
                    if (priceArr.length == 1) {
                        priceTmp = Number(priceArr[0].split('đ')[0]);
                    }
                    else if (priceArr.length == 2) {
                        priceTmp = Number(priceArr[0]) * 1000
                    } else if (priceArr.length >= 3) {
                        priceTmp = Number(`${priceArr[0]}${priceArr[1]}`) * 1000;
                    }
                    const price = {
                        number: Number(productMinimum.split(' ')[0]) >= 2 ? Number(productMinimum.split(' ')[0]) : 2,
                        price: priceTmp
                    }
                    prices.push(price);
                }
                if (!prices[0].price) {
                    prices = [];
                    productPrices = document.querySelectorAll(".jsx-1704392005.multiple-price--discount");
                    productNumbers = document.querySelectorAll(" .jsx-1704392005.font-90");
                    for (let index = 0; index < productPrices.length; index++) {
                        let price, temptNumbers, temptPrices;
                        try {
                            let temptNumbers = productNumbers[index].textContent.split(' ')[0];
                            if (isNaN(temptNumbers) == true) {


                                temptNumbers = productNumbers[index].textContent.split(' ')[1];
                            }
                            temptPrices = productPrices[index].textContent.split(',');
                            let priceTmp = Number(temptPrices[0]) * 1000;
                            if (temptPrices.length > 2) {
                                priceTmp = Number(`${temptPrices[0]}${temptPrices[1]}`) * 1000;
                            } else if (temptPrices.length == 1) {
                                priceTmp = Number(temptPrices[0].split('đ')[0]);
                            }
                            price = {
                                number: Number(temptNumbers) >= 2 ? Number(temptNumbers) : 2,
                                price: priceTmp
                            }
                        } catch (error) {
                            price = {
                                number: Number(temptNumbers),
                                price: 0
                            }
                        }

                        prices.push(price);

                    }

                }

                if (images.length < 1) {
                    productImages = document.querySelectorAll(".col-2 > div > div > img");
                    productImages.forEach(item => {
                        images.push(item.getAttribute("src"));
                    });
                }

                const product = {
                    productName,
                    prices,
                    productMinimum,
                    images,
                    productDescription,
                    categoryName,

                }
                return product;
            });


            console.log(productDetail);

            resolve(1)


        } catch (e) {
            console.log(e);
            reject(e)
        }
    });

    //     });
}


// // export const hamtest = async () => {
// //     const browser = await puppeteer.launch({
// //         headless: false,
// //         args: ['--start-maximized',
// //             '--no-sandbox',
// //             '--disable-setuid-sandbox'
// //         ]
// //     });
// //     const page = await browser.newPage();
// //     await page.goto(`https://thitruongsi.com/shop/xuong-chuyen-si-thoi-trang-thien-huu/product?filter_category_lv1=577628f5d54542290d000001`);
// //     const data = await page.evaluate(() => {
// //         let pageAfter;
// //         const productSelector = document.querySelectorAll(".productName > a");
// //         let productlinks = [];
// //         productSelector.forEach(item => {
// //             productlinks.push(item.getAttribute('href'));
// //         });
// //         try {
// //             pageAfter = document.querySelector(".page-item.active + li > a").getAttribute("href");
// //         } catch (error) {
// //             console.log(error);

// //         }
// //         return productlinks;

// //     });
// //     console.log('11111111111111111111111111111111111111111111111111111111111111111111', pageAfter);
// // }