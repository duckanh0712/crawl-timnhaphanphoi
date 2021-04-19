import { TTS_API } from '../../constants/api';
import WholesaleProductModel from '../../models/wholeesaleProduct';
import { Platforms } from '../../constants/common';
import wholeesaleProduct from '../../models/wholeesaleProduct';


const saveProduct = (page, data, shopId) => {
    return new Promise(async (resolve, _reject) => {
        try {
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                const url: string = `${TTS_API}${data[i]}`;
                await page.goto(url);
                console.log("product", url);
                const productDetail = await page.evaluate(() => {
                    let productPrice;
                    const productName = document.querySelector("h1").textContent;
                    const productMinimum = document.querySelector(".css-4bsvdr > div > strong").textContent;
                    let productImages = document.querySelectorAll(".jsx-929251746.css-whm7bm > div > div > div > img");
                    const productDescription = document.querySelector(".tab-pane.active >.css-52n5xd").textContent;

                    let images = [];
                    productImages.forEach(item => {
                        images.push(item.getAttribute("src"));
                    });
                    try {
                        productPrice = document.querySelector(".jsx-1704392005.multiple-price > div").textContent;
                    } catch (error) {
                        productPrice = document.querySelector(".jsx-1922897821.single-price").textContent;
                    }
                    if (images.length < 1) {
                        productImages = document.querySelectorAll(".col-2 > div > div > img");
                        productImages.forEach(item => {
                            images.push(item.getAttribute("src"));
                        });
                    }
                    const product = {
                        productName,
                        productPrice,
                        productMinimum,
                        images,
                        productDescription
                    }
                    return product;
                });
                const price: number = Number(productDetail.productPrice.split(',')[0])*1000;
                const minimum: number = Number(productDetail.productMinimum.split(' ')[0]);
                const product = {
                    name: productDetail.productName,
                    price: price,
                    minimum: minimum,
                    category: {
                        category_name: 'khanh',
                        category_id: "1"
                    },
                    shop_id: shopId,
                    depcription: productDetail.productDescription,
                    images: productDetail.images,
                }
                console.log(product);
                // await wholeesaleProduct.create(product);
                // }

            }
            resolve(1);

        } catch (error) {
            console.log(error);

        }
    });

}

export const getUrlProduct = async (page, productUrl, shop) => {

    try {

        const shopId = `${Platforms.tts}.${shop}`;
        let nextPage: string = productUrl;
        while (nextPage) {
            await page.goto(nextPage);
            const data = await page.evaluate(() => {
                const productSelector = document.querySelectorAll(".productName > a");
                let productlinks = [];
                productSelector.forEach(item => {
                    productlinks.push(item.getAttribute('href'));
                });
                try {
                    nextPage = document.querySelector(".page-item.active + li > a").getAttribute("href");
                } catch (error) {
                    nextPage = null;
                }
                return productlinks;

            });
            await saveProduct(page, data, shopId);
        }

    } catch (error) {
        console.log(error);

    }

}