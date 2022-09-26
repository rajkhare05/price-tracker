const puppeteer = require('puppeteer');

const amazon = async (URI) => {
  const browser = await puppeteer.launch({executablePath: '/usr/bin/brave', headless: true });
  const page = await browser.newPage();

  await page.goto(URI, {timeout: 0});

  const name = (await page.$eval('#productTitle', el => el.textContent)).trim();
  const price = (await page.$eval('.a-price-whole', el => el.textContent)).replace(/(₹)|(,)|\./g, '');
  
//   console.log(name)
//   console.log(price)

  await browser.close();

  return { name, price };
}

const flipkart = async (URI) => {
  
  const browser = await puppeteer.launch({executablePath: '/usr/bin/brave', headless: true });
  const page = await browser.newPage();

  await page.goto(URI, {timeout: 0});

  const name = (await page.$eval('.B_NuCI', el => el.textContent)).trim();
  const price = (await page.$eval('._30jeq3', el => el.textContent)).replace(/(₹)|(,)|\./g, '');
  
//   console.log(name)
//   console.log(price)

  await browser.close();

  return { name, price };
}

const myntra = async (URI) => {
  const browser = await puppeteer.launch({executablePath: '/usr/bin/brave', headless: true });
  const page = await browser.newPage();

  await page.goto(URI);

  const name = (await page.$eval('.pdp-name', el => el.textContent)).trim();
  const price = (await page.$eval('.pdp-price', el => el.textContent)).replace(/(₹)|(,)|\./g, '');

  // const name = await page.$('.pdp-name');
  // const price = await page.$('.pdp-price');
  
//   console.log(name)
//   console.log(price)

  await browser.close();
  return { name, price };
}

const snapdeal = async (URI) => {
  const browser = await puppeteer.launch({executablePath: '/usr/bin/brave', headless: true });
  const page = await browser.newPage();

  await page.goto(URI);

  const name = (await page.$eval('.pdp-e-i-head', el => el.textContent)).trim();
  const price = (await page.$eval('.payBlkBig', el => el.textContent)).replace(/(₹)|(,)|\./g, '');
  
//   console.log(name)
//   console.log(price)

  await browser.close();
  return { name, price };
}

const meesho = async (URI) => {
  const browser = await puppeteer.launch({executablePath: '/usr/bin/brave', headless: false });
  const page = await browser.newPage();

  await page.goto(URI);

  const name = (await page.$eval('.gpVzIL', el => el.textContent)).trim();
  const price = (await page.$eval('.fka-Dwo', el => el.textContent)).replace(/(₹)|(,)|\./g, '');
  
//   console.log(name)
//   console.log(price)

  await browser.close();
  
  return { name, price };
}

const dummy = async (URI) => {
  const browser = await puppeteer.launch({executablePath: '/usr/bin/brave', headless: true });
  const page = await browser.newPage();

  await page.goto(URI);

  const name = (await page.$eval('.p-name', el => el.textContent)).trim();
  const price = (await page.$eval('.p-price', el => el.textContent)).replace(/(₹)|(,)|\./g, '');
  
//   console.log(name)
//   console.log(price)

  await browser.close();
  
  return { name, price };
}

// const x = amazon('https://www.amazon.in/Dennis-Lingo-Checkered-Casual-C442_Olive_L/dp/B082G9MWVV/ref=sr_1_7?keywords=shirt&qid=1664040968&sr=8-7'); // works
// console.log(x);
// const y = flipkart('https://www.flipkart.com/highlander-men-checkered-casual-dark-blue-beige-shirt/p/itmf3x6umrqnzhd2?pid=SHTEVS4M5GAGZZTD&lid=LSTSHTEVS4M5GAGZZTD855DD4&marketplace=FLIPKART&q=shirt&store=clo%2Fash%2Faxc&srno=s_1_3&otracker=search&otracker1=search&fm=Search&iid=a798d543-e5b0-4e36-91a1-517e2d1a5fd5.SHTEVS4M5GAGZZTD.SEARCH&ppt=sp&ppn=sp&ssid=txzqqmbg0w0000001664040978741&qH=c9507f538a6e79c9'); // works
// console.log(y);
// const z = snapdeal('https://www.snapdeal.com/product/hangup-orange-solid-casual-blazers/652624200602'); //works
// console.log(z);

// myntra('https://www.myntra.com/jeans/levis/levis-men-blue-512-slim-fit-mid-rise-light-fade-stretchable-jeans/18074834/buy');
// meesho('https://www.meesho.com/stylish-retro-men-shirts/p/18mh80?page=1');

module.exports = { amazon, flipkart, snapdeal, myntra, meesho, dummy };
