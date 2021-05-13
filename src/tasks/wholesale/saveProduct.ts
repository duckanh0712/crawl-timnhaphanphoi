import { TTS_API } from '../../constants/api';
import WholesaleProductModel from '../../models/wholeesaleProduct';
import { Platforms } from '../../constants/common';
import  { getCategory } from '../../utils/getCategory';
import WholesaleShopModel from '../../models/wholesaleShop';

const saveProduct = (page, data, shopId, cateName) => {
    console.log(11);
    
    return new Promise(async (resolve, _reject) => {
        try {
            
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
                let price: number = Number(productDetail.productPrice.split(',')[0]) * 1000;
                if(!price) {
                    price = 5000;
                    
                }
                const minimum: number = Number(productDetail.productMinimum.split(' ')[0]);
                const category = await getCategory(cateName);
                const product = {
                    name: productDetail.productName,
                    price: price,
                    minimum: minimum,
                    category: category,
                    shop_id: shopId,
                    depcription: productDetail.productDescription,
                    images: productDetail.images,
                    link: url
                }
                await WholesaleProductModel.create(product);
            }
            const products = await WholesaleProductModel.find({shop_id: shopId });
            await WholesaleShopModel.updateOne({_id: shopId },{ product_crawled: products.length });
            resolve(1);

        } catch (error) {
            console.log(error);

        }
    });
}

export const getUrlProduct = async (page, productUrl, shop) => {
    console.log(9);
    
    try {

        const shopId = `${Platforms.tts}.${shop}`;
        await page.goto(productUrl);
        const productCategoriesData = await page.evaluate(() => {
            const productCategories = document.querySelectorAll(".css-gk0dxy > .css-q2y3yl > a");
            let categories = [];
            productCategories.forEach(item => {
                categories.push(item.getAttribute('href'));
            });
            const productCategoriesName = document.querySelectorAll(".css-gk0dxy > .css-q2y3yl > a > span");
            let categoriesName = [];
            productCategoriesName.forEach(item => {
                categoriesName.push(item.textContent);
            });
            const category = {
                categories,
                categoriesName
            }
            return category;


        });
        console.log(productCategoriesData);
        for (let i = 0; i < productCategoriesData.categories.length; i++) {
            let nextPage: string = `${TTS_API}${productCategoriesData.categories[i]}`;

            while (nextPage) {
                console.log('nextPage', nextPage);

                await page.goto(nextPage);
                const data = await page.evaluate(() => {
                    let pageAfter;
                    const productSelector = document.querySelectorAll(".productName > a");
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
                    return data

                });
                nextPage = data.pageAfter ? `${TTS_API}${data.pageAfter}` : null;
                await saveProduct(page, data.productlinks, shopId, productCategoriesData.categoriesName[i]);
            }
        }


    } catch (error) {
        console.log(error);

    }

}