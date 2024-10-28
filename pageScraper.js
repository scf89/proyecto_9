const fs = require('fs');

const scraperObject = {
    url: 'https://dungeonmarvels.com/220--50',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        
        // Navega a la URL principal
        await page.goto(this.url);
        
        

        let scrapedData = [];

        async function scrapeCurrentPage() {
            await page.waitForSelector('#js-product-list .products');

            // Obtiene los enlaces de los productos
            let urls = await page.$$eval('#js-product-list .products .product-miniature', links => {
                links = links.map(el => el.querySelector('.product-title a').href);
                return links;
            });

            // Procesa cada producto
            let pagePromise = (link) => new Promise(async (resolve, reject) => {
                let dataObj = {};
                let newPage = await browser.newPage();
                await newPage.goto(link);

                dataObj['title'] = await newPage.$eval('.product-title', text => text.textContent.trim());
                dataObj['price'] = await newPage.$eval('.current-price span[itemprop="price"]', text => text.textContent.trim());
                dataObj['discount'] = await newPage.$eval('.discount-percentage', text => text.textContent.trim(), {timeout: 1000}).catch(() => 'N/A');
                dataObj['description'] = await newPage.$eval('.soyproduct-description', text => text.textContent.trim());
                dataObj['imageUrl'] = await newPage.$eval('.product-thumbnail img', img => img.src);

                resolve(dataObj);
                await newPage.close();
            });

            for (let link of urls) {
                let currentPageData = await pagePromise(link);
                scrapedData.push(currentPageData);
            }

            // Verifica si hay un botón de siguiente para avanzar a la siguiente página
           let nextButtonExist = false;
            try {
                const nextButton = await page.$eval('.next', a => a.textContent);
                nextButtonExist = true;
            } catch (err) {
                nextButtonExist = false;
            }

            if (nextButtonExist) {
                await page.click('.next');
                return scrapeCurrentPage(); // Llama a esta función recursivamente
            }

            await page.close();
            return scrapedData;
        }

        let data = await scrapeCurrentPage();
        console.log(data);

        // Escribe los datos en un archivo products.json
        fs.writeFileSync('products.json', JSON.stringify(data, null, 2), 'utf-8');
        console.log('Datos guardados en products.json');
        return data;
    }
}

module.exports = scraperObject;
