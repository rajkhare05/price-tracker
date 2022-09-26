// This worker runs the scrape request in a given interval
const mongoose = require('mongoose');
const scraper = require('./scraper.js');
const trackMod = require('./models/track.model');
require('dotenv').config();

// const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/price-tracker';
const DB_URI = 'mongodb://127.0.0.1:27017/price-tracker';
const INTERVAL_TIME = process.env.INTERVAL_TIME || (1000 * 10) // default: 1hr

const getTrackData = async () => {
    const data = await trackMod.find({});
    return data;
}

const scrape = async (platform, url) => {
    if (platform == 'amazon') return scraper.amazon(url);
    else if (platform == 'flipkart') return scraper.flipkart(url);
    else if (platform == 'snapdeal') return scraper.snapdeal(url);
    else if (platform == 'myntra') return scraper.myntra(url);
    else if (platform == 'meesho') return scraper.meesho(url);
    return scraper.dummy(url);
}

const getPrice = async (platform, url, targetPrice) => {
    const product = await scrape(platform, url);
    return product.price;
}

const run = async () => {
    try {
        const trackData = await getTrackData();
        if (trackData == null || trackData.length < 1) {
            return;
        }

        for (const data of trackData) {
            for (const track of data.trackList) {
                const scrapedPrice = await getPrice(track.platform, track.url, track.targetPrice);
                console.log(scrapedPrice);
                if (scrapedPrice <= track.targetPrice) {
                    // update db and notify
                    await trackMod.findOneAndUpdate({ email: data.email }, { originalPrice: scrapedPrice });
                    // then delete
                    // await trackMod.updateOne({ email: data.email }, { $pull: { url: track.url } });
                }
            }
        }
        setTimeout(run, INTERVAL_TIME);

    } catch (err) {
        console.error(err);
    }
}

mongoose.connect(DB_URI)
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB connected');
});

run();
