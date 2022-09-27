const puppeteer = require('puppeteer');

const amazon = async (URI) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(URI, { timeout: 0 });

  const name = (await page.$eval('#productTitle', el => el.textContent)).trim();
  const price = (await page.$eval('.a-price-whole', el => el.textContent)).replace(/(₹)|(,)|\./g, '');

  await browser.close();

  return { name, price };
}

const flipkart = async (URI) => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(URI, { timeout: 0 });

  const name = (await page.$eval('.B_NuCI', el => el.textContent)).trim();
  const price = (await page.$eval('._30jeq3', el => el.textContent)).replace(/(₹)|(,)|\./g, '');

  await browser.close();

  return { name, price };
}

const myntra = async (URI) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(URI);

  const name = (await page.$eval('.pdp-name', el => el.textContent)).trim();
  const price = (await page.$eval('.pdp-price', el => el.textContent)).replace(/(₹)|(,)|\./g, '');

  await browser.close();
  return { name, price };
}

const snapdeal = async (URI) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(URI);

  const name = (await page.$eval('.pdp-e-i-head', el => el.textContent)).trim();
  const price = (await page.$eval('.payBlkBig', el => el.textContent)).replace(/(₹)|(,)|\./g, '');

  await browser.close();
  return { name, price };
}

const meesho = async (URI) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(URI);

  const name = (await page.$eval('.gpVzIL', el => el.textContent)).trim();
  const price = (await page.$eval('.fka-Dwo', el => el.textContent)).replace(/(₹)|(,)|\./g, '');

  await browser.close();

  return { name, price };
}

const dummy = async (URI) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(URI);

  const name = (await page.$eval('.p-name', el => el.textContent)).trim();
  const price = (await page.$eval('.p-price', el => el.textContent)).replace(/(₹)|(,)|\./g, '');

  await browser.close();

  return { name, price };
}

module.exports = { amazon, flipkart, snapdeal, myntra, meesho, dummy };
