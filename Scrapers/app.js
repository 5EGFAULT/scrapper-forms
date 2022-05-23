
const express = require('express')
const puppeteer = require('puppeteer');
var bodyParser = require('body-parser')
var cors = require('cors')
const ObjectsToCsv = require('objects-to-csv');
const app = express()
const port = 3333

sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
app.use(cors());
app.use(bodyParser.json());
app.use("/csv", express.static('../Csv'))

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
    } = req.body;
    // console.log("origin", origin);
    // console.log("origin_dh", origin_dh);
    // console.log("destination", destination);
    // console.log("destination_dh", destination_dh);
    // console.log("general_specifc", general_specifc);
    // console.log("truck_type_general", truck_type_general);
    // console.log("truck_type_specific", truck_type_specific);
    // console.log("length", length);
    // console.log("weight", weight);
    // console.log("full_partial", full_partial);
    // console.log("startDate", startDate);
    // console.log("endDate", endDate);
    (async () => {
        const startDateFormt = new Date(startDate).toLocaleDateString("en-US")
        const endDateFormt = new Date(endDate).toLocaleDateString("en-US")
        const login = "Dispatcher@thejpoperations.com";
        const password = "Fiverrextension1!";
        const browser = await puppeteer.launch({
            headless: false, args: ['--window-size=1920,1080'],
            defaultViewport: null
        });
        const page = await browser.newPage();
        // page.setDefaultNavigationTimeout(10000);
        await page.goto('https://www.dat.com/login', { waitUntil: "networkidle2" });
        await page.waitForSelector('body > main > div > div > section.elementor-nested-section.elementor-section.elementor-top-section.elementor-element.elementor-element-b40c250.mt-0.elementor-section-boxed.section-vm-md.section-vp-default.elementor-section-height-default.elementor-section-height-default > div > div > div > section.elementor-section.elementor-inner-section.elementor-element.elementor-element-7514f17.mb-0.elementor-section-boxed.section-vm-md.section-vp-default.elementor-section-height-default.elementor-section-height-default > div > div.elementor-column.elementor-col-33.elementor-inner-column.elementor-element.elementor-element-0c795ec > div > div.elementor-element.elementor-element-0cfbfbc.cl1.elementor-widget.elementor-widget-text-editor > div > ul > li:nth-child(1) > a');
        await page.click('body > main > div > div > section.elementor-nested-section.elementor-section.elementor-top-section.elementor-element.elementor-element-b40c250.mt-0.elementor-section-boxed.section-vm-md.section-vp-default.elementor-section-height-default.elementor-section-height-default > div > div > div > section.elementor-section.elementor-inner-section.elementor-element.elementor-element-7514f17.mb-0.elementor-section-boxed.section-vm-md.section-vp-default.elementor-section-height-default.elementor-section-height-default > div > div.elementor-column.elementor-col-33.elementor-inner-column.elementor-element.elementor-element-0c795ec > div > div.elementor-element.elementor-element-0cfbfbc.cl1.elementor-widget.elementor-widget-text-editor > div > ul > li:nth-child(1) > a')
        await page.waitForNavigation()
        await page.waitForSelector('#mat-input-1')
        await page.type("#mat-input-1", login);
        await page.waitForSelector('#mat-input-0')
        await page.type("#mat-input-0", password);
        await page.click('#submit-button')
        await page.waitForNavigation()
        await page.goto('https://truckersedge.dat.com/search-loads', { waitUntil: "networkidle2" })

        await page.waitForSelector('#cdk-overlay-0').then(async () => {
            let producttype = (await page.$('#mat-dialog-0 > dat-prewarn-dialog-component > div > mat-dialog-actions > button.mat-focus-indicator.mat-raised-button.mat-button-base.mat-primary')) || "";
            if (producttype)
                await page.click('#mat-dialog-0 > dat-prewarn-dialog-component > div > mat-dialog-actions > button.mat-focus-indicator.mat-raised-button.mat-button-base.mat-primary')
        }).then(async () => {
            await sleep(2000)
            await page.type("#searchform-city-origin", origin, { delay: 100 })
            await page.waitForSelector('#searchform-dho')
            await page.evaluate((origin_dh) => {
                document.querySelector("#searchform-dho").value = origin_dh != "" ? origin_dh : "100"
                document.querySelector("#searchform-dho").dispatchEvent(new Event('input'))
            }, origin_dh)

            await page.waitForSelector('#searchform-city-destination')
            await page.type("#searchform-city-destination", (destination == null) ? "" : destination.toUpperCase(), { delay: 100 }).then(async () => {
                // #mat-option-31 > span
                if (destination != null) {
                    await sleep(1500)
                    await page.waitForSelector('#mat-option-33 > span')
                    await page.click('#mat-option-33 > span')
                }
                // console.log("span clicked");
            })
            if (destination_dh != null) {
                await page.waitForSelector("#searchform-dhd")
                await page.evaluate((destination_dh) => {
                    document.querySelector("#searchform-dhd").value = destination_dh != "" ? destination_dh : "100"
                    document.querySelector("#searchform-dhd").dispatchEvent(new Event('input'))
                }, destination_dh)
            }

            if (general_specifc == "General") {
                await page.waitForSelector('#General')
                await page.click('#General')
                await page.click("#searchform-general")
                await page.waitForSelector('#searchform-general-panel')
                await page.evaluate((truck_type_general) => {
                    document.querySelectorAll('#searchform-general-panel > mat-option').forEach(async element => {
                        let op = element?.querySelector('.mat-option-text').innerText.split('\n')[0]
                        if (truck_type_general.includes(op)) {
                            await element?.click()
                        }
                    })
                }, truck_type_general);
            }
            else {
                await page.waitForSelector('#Specific')
                await page.click('#Specific')
                await page.waitForSelector("#search-truck-type")
                await page.click("#search-truck-type")
                await page.waitForSelector('#searchform-specific-panel')
                await page.evaluate((truck_type_specific) => {
                    document.querySelectorAll('#searchform-specific-panel > mat-option').forEach(async element => {
                        let op = element?.querySelector('.mat-option-text').innerText.split('\n')[0]
                        if (truck_type_specific.includes(op)) {
                            await element?.click()
                        }
                    })
                }, truck_type_specific);
            }

            await page.waitForSelector('#searchform-length')
            await page.type('#searchform-length', length);

            await page.waitForSelector('#searchform-weight')
            await page.type('#searchform-weight', weight);

            await page.waitForSelector('#searchform-loadtype')
            await page.click("#searchform-loadtype")
            await page.evaluate((full_partial) => {
                if (full_partial == "Both") {
                    document.querySelector(".cdk-overlay-pane > div > div").querySelectorAll("mat-option")[2].click()
                } else if (full_partial == "Full") {
                    document.querySelector(".cdk-overlay-pane > div > div").querySelectorAll("mat-option")[0].click()
                } else {
                    document.querySelector(".cdk-overlay-pane > div > div").querySelectorAll("mat-option")[1].click()
                }
            }, full_partial)

            await page.waitForSelector('#startdate-input')
            await page.evaluate((startDateFormt) => {
                document.querySelector('#startdate-input').value = startDateFormt
            }, startDateFormt);

            await page.waitForSelector('#enddate-input')
            await page.evaluate((endDateFormt) => {
                document.querySelector('#enddate-input').value = endDateFormt
            }, endDateFormt);
            try {
                await page.waitForFunction('document.querySelector("#searchform-search").disabled==false')
                await page.click('#searchform-search')
                await Promise.race([
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                    page.waitForFunction('document.querySelector("#cards-list-loads  .cdk-virtual-scroll-content-wrapper").querySelectorAll("div[id^=search-card-row]").length>0')
                ]);
                await page.waitForSelector("#select-all-alarms")
                await page.click("#select-all-alarms")
                await page.waitForFunction('document.querySelector("#print-selected").disabled==false')
                await page.click("#print-selected")
                await page.waitForSelector("#next-print-select")
                await page.click("#next-print-select")
                await page.waitForSelector("#print-body > div.table-container > table")
                let data = await page.evaluate(async () => {
                    console.log(document.querySelector("#search-cards-title > span:nth-child(2)"))
                    let header = []
                    let data = []
                    Array.from(document.querySelector("#print-body > div.table-container > table").querySelector(".print-table-header").children).forEach(el => header.push(el.textContent))
                    let rows = document.querySelector("#dat-print-summary-dialog").querySelectorAll("tr.table-row.ng-star-inserted");
                    rows.forEach(row => {
                        let obj = {}
                        Array.from(row.children).forEach(cols => {
                            obj[header[cols.cellIndex]] = cols.textContent
                        })
                        data.push(obj)
                    })
                    return data
                })
                const csv = new ObjectsToCsv(data);
                await csv.toDisk(`../Csv/Truckers_Edge.csv`);
                await browser.close();
                res.sendStatus(200);
            } catch (error) {
                console.log("There no truckes in this search\n")
                res.sendStatus(500)
            }
            finally {
                await browser.close();
            }
        })
    })().catch(async (err) => {
        console.log(err)
        res.sendStatus(500);
    })
})

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})