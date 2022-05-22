
const express = require('express')
const puppeteer = require('puppeteer');
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 3333

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    // console.log(`server started on port ${port}`)
})
sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
app.post('/truckersedge', (req, res) => {

    const {
        origin,
        origin_dh,
        destination,
        destination_dh,
        general_specifc,
        truck_type_general,
        truck_type_specific,
        length,
        weight,
        full_partial,
        startDate,
        endDate
    } = req.body
    console.log(origin, origin_dh, destination, destination_dh, general_specifc, truck_type_general, truck_type_specific, length, weight, full_partial, startDate, endDate);

    (async () => {
        const login = "Dispatcher@thejpoperations.com";
        const password = "Fiverrextension1!";
        const browser = await puppeteer.launch({
            headless: false, args: ['--window-size=1920,1080'],
            defaultViewport: null
        });
        const page = await browser.newPage();
        await page.goto('https://login.dat.com/', { waitUntil: "networkidle2" });
        await page.waitForSelector('#menu-item-12886 > a');
        await page.click('#menu-item-12886 > a');
        await page.waitForNavigation()
        await page.waitForSelector('body > main > div > div > section.elementor-nested-section.elementor-section.elementor-top-section.elementor-element.elementor-element-b40c250.mt-0.elementor-section-boxed.section-vm-md.section-vp-default.elementor-section-height-default.elementor-section-height-default > div > div > div > section.elementor-section.elementor-inner-section.elementor-element.elementor-element-7514f17.mb-0.elementor-section-boxed.section-vm-md.section-vp-default.elementor-section-height-default.elementor-section-height-default > div > div.elementor-column.elementor-col-33.elementor-inner-column.elementor-element.elementor-element-0c795ec > div > div.elementor-element.elementor-element-0cfbfbc.cl1.elementor-widget.elementor-widget-text-editor > div > ul > li:nth-child(1) > a');
        await page.click('body > main > div > div > section.elementor-nested-section.elementor-section.elementor-top-section.elementor-element.elementor-element-b40c250.mt-0.elementor-section-boxed.section-vm-md.section-vp-default.elementor-section-height-default.elementor-section-height-default > div > div > div > section.elementor-section.elementor-inner-section.elementor-element.elementor-element-7514f17.mb-0.elementor-section-boxed.section-vm-md.section-vp-default.elementor-section-height-default.elementor-section-height-default > div > div.elementor-column.elementor-col-33.elementor-inner-column.elementor-element.elementor-element-0c795ec > div > div.elementor-element.elementor-element-0cfbfbc.cl1.elementor-widget.elementor-widget-text-editor > div > ul > li:nth-child(1) > a')
        await page.waitForNavigation()
        await page.waitForSelector('#mat-input-1')
        await page.type("#mat-input-1", login, { delay: 15 });
        await page.waitForSelector('#mat-input-0')
        await page.type("#mat-input-0", password, { delay: 15 });
        await page.click('#submit-button')
        await page.waitForNavigation()
        await page.goto('https://truckersedge.dat.com/search-loads', { waitUntil: "networkidle2" })
        await page.waitForSelector('#searchform-city-origin')
        await page.type('#searchform-city-origin', origin, { delay: 15 });
        await page.waitForSelector('#searchform-city-destination')
        await page.type('#searchform-city-destination', destination, { delay: 15 });
        try {

            await page.waitForSelector('#mat-dialog-0 > dat-prewarn-dialog-component > div > mat-dialog-actions > button.mat-focus-indicator.mat-raised-button.mat-button-base.mat-primary')
            await page.click('#mat-dialog-0 > dat-prewarn-dialog-component > div > mat-dialog-actions > button.mat-focus-indicator.mat-raised-button.mat-button-base.mat-primary')

        } catch (error) {
            //
        }
        await page.waitForSelector('#General') && await page.waitForSelector('#Specific')
        if (general_specifc == "General") {
            await page.click('#General')
            await page.click("#searchform-general")
            await page.waitForSelector('#searchform-general-panel')
            await page.evaluate((truck_type_general) => {
                document.querySelectorAll('#searchform-general-panel > mat-option').forEach(async element => {
                    let op = element?.querySelector('.mat-option-text').innerText.split('\n')[1]
                    console.log(op);
                    if (truck_type_general.includes(op)) {
                        if (op == "Vans,Standard" && truck_type_general.includes("Vans,Standard")) {
                            await element?.click()
                        }
                        await element?.click()
                    }
                })
            }, truck_type_general);
            sleep(10000)
        }
        // } else {
        //     await page.click('#Specific')
        // }
        await page.waitForSelector('#searchform-length')
        await page.type('#searchform-length', length, { delay: 15 });
        await page.waitForSelector('#searchform-weight')
        await page.type('#searchform-weight', weight, { delay: 15 });
        // await browser.close();
    })();
    res.sendStatus(200);
})