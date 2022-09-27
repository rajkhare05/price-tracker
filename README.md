# price-tracker

### Setup on your local machine
- `git clone https://github.com/rajkhare05/price-tracker`
-  cd `price-tracker`
- `npm i`
- Create a database `price-tracker` on your local mongoDB server
- Set your environment variables (refer to `.env_sample` file)
- Don't forget to write your outlook email and password if you want to send emails
- `npm run dev_server+worker`

### Examples

<a href="https://freeimage.host/i/s6FONV"><img src="https://iili.io/s6FONV.md.png" alt="s6FONV.md.png" ></a>

Sign up first 

<a href="https://freeimage.host/i/s6FeDB"><img src="https://iili.io/s6FeDB.md.png" alt="s6FeDB.md.png" ></a>

Click on `Add new track`

<a href="https://freeimage.host/i/s6FNAQ"><img src="https://iili.io/s6FNAQ.md.png" alt="s6FNAQ.md.png" ></a>

Select the product from the site.

<a href="https://freeimage.host/i/s6FPHv"><img src="https://iili.io/s6FPHv.md.png" alt="s6FPHv.md.png" ></a>

Copy URL

<a href="https://freeimage.host/i/s6FgKg"><img src="https://iili.io/s6FgKg.md.png" alt="s6FgKg.md.png" ></a>

Select the platform (here `dummy` for dummy ecommerce site) and fill all the details then hit `Save` button

<a href="https://freeimage.host/i/s6F8V1"><img src="https://iili.io/s6F8V1.md.png" alt="s6F8V1.md.png" ></a>

See your tracks on the dashboard. Notice the `Active` status of the track.

<a href="https://freeimage.host/i/s6Frla"><img src="https://iili.io/s6Frla.md.png" alt="s6Frla.md.png" ></a>

When price drops come back to your dashboard or refresh the page. \
You'll receive an email.

<a href="https://freeimage.host/i/s6F4UJ"><img src="https://iili.io/s6F4UJ.md.png" alt="s6F4UJ.md.png" ></a>

Here is the email

<a href="https://freeimage.host/i/s6FsNp"><img src="https://iili.io/s6FsNp.md.png" alt="s6FsNp.md.png" ></a>

Click on the link to visit the site.

<a href="https://freeimage.host/i/s6FiRR"><img src="https://iili.io/s6FiRR.md.png" alt="s6FiRR.md.png" ></a><br />

NOTE: Above site is used as a dummy ecommerce store to show instant changes in the price, \
as waiting on other sites will take a lot of time.

### Setup dummy e-commerce site

- `git clone https://github.com/rajkhare05/dummy-ecommerce-app`
- cd `dummy-ecommerce-app`
- Now expose this directory on your desired port (here `5500` because the above example uses it)
- After adding the track, set price lower in the source code, so that track can see changes in the price
- Now `worker.js` will update the DB and it will send an email to your email address to notify the price drop
- Thats all
- Tracker will work for the rest of the platforms provided like amazon, flipkart, snapdeal.
