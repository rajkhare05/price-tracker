// This worker runs the scrape request in a given interval
const mongoose = require('mongoose');
const scraper = require('./scraper.js');
const trackMod = require('./models/track.model');
const sendEmail = require('./mail.js');
require('dotenv').config();

const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/price-tracker';
const INTERVAL_TIME = process.env.INTERVAL_TIME || (1000 * 10);
const SENDER = process.env.USER_EMAIL;
const PASSWORD = process.env.PASS;

const HTMLMessage = (name, url, price) => {
    return `<a href="${url}">${name}</a> price dropped to ${price}`
}

const textMessage = (name, url, price) => {
    return `${name} price dropped to ${price}. Link: ${url}`;
}

const scrape = async (platform, url) => {
    if (platform == 'amazon') return scraper.amazon(url);
    else if (platform == 'flipkart') return scraper.flipkart(url);
    else if (platform == 'snapdeal') return scraper.snapdeal(url);
    else if (platform == 'myntra') return scraper.myntra(url);
    else if (platform == 'meesho') return scraper.meesho(url);
    return scraper.dummy(url);
}

const run = async () => {
    try {
        const trackData = await trackMod.find({});
        for (const data of trackData) {
            for (const track of data.trackList) {
                if (track.hit) {
                    const scrapedData = await scrape(track.platform, track.url);
                    if (scrapedData.price <= track.targetPrice) {
                        await trackMod.updateOne(
                            { email: data.email, 'trackList.url': track.url },
                            { $set: { 'trackList.$.originalPrice': Number(scrapedData.price), 'trackList.$.hit': false } }
                        );
                        const textMsg = textMessage(track.label, track.url, scrapedData.price);
                        const HTMLMsg = HTMLMessage(track.label, track.url, scrapedData.price);
                        sendEmail(SENDER, PASSWORD, data.email, 'Price Drop', HTMLMsg, textMsg);
                    }
                }
            }
        }
        setTimeout(run, INTERVAL_TIME);

    } catch (err) {
        console.error(err);
    }
}

console.log('worker.js is running');

mongoose.connect(DB_URI)
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('worker DB connected !');
});

run();
