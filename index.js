const express = require('express');
const cors = require('cors');
const path = require('path');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// models
const userMod = require('./models/user.model');
const trackMod = require('./models/track.model');

const app = express();

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'somesecretkey';
const COOKIE_LIFETIME = process.env.COOKIE_LIFETIME || (1000 * 60 * 60 * 24);
const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/price-tracker';

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessions({
    secret: SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: COOKIE_LIFETIME },
    resave: false
}));

app.set('view engine', 'ejs');

mongoose.connect(DB_URI);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB connected !');
});

const getTrackList = async (session, model) => {
    if (session.userid) {
        const data = await model.find({ email: session.userid }, { _id: 0, trackList: 1 });
        if (data != null) {
            return data[0]['trackList'];
        }
    }
    return [];
}

app.get('/', async(req, res) => {
    if (req.session.userid) {
        const trackList = await getTrackList(req.session, trackMod);
        return res.render('dashboard', { trackList: trackList });
    }
    return res.render('signin');
});

app.route('/signup')
    .get((req, res) => {
        return res.render('signup');
    })
    .post(async (req, res) => {
        try {
            await userMod.create({ 
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // initialize the tracks collection with empty array of trackList
            await trackMod.create({
                email: req.body.email,
                trackList: []
            });
            const session = req.session;
            session.userid = req.body.email;
            return res.render('dashboard');

        } catch (err) {
            if (err.code == 11000) {
                return res.render('signup', { message: 'user already exists' });
            }
            console.error(err);
            return res.status(500).send('Something went wrong');
        }
    });

app.route('/signin')
    .get(async (req, res) => {
        if (req.session.userid) {
            const trackList = await getTrackList(req.session, trackMod);
            return res.render('dashboard', { trackList: trackList });
        }
        return res.render('signin');
    })
    .post(async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = await userMod.findOne({email: email, password: password});
        if (user != null) {
            const session = req.session;
            session.userid = req.body.email;
            const trackList = await getTrackList(req.session, trackMod);
            return res.render('dashboard', { trackList: trackList });

        } else {
            return res.render('signin', { message: 'incorrect email or password' });
        }
    });

app.get('/signout', (req, res) => {
    req.session.destroy();
    return res.render('signin');
});

app.route('/track')
    .get(async (req, res) => {
        if (req.session.userid) {
            const trackList = await getTrackList(req.session, trackMod);
            return res.render('track', { trackList: trackList });
        }
        return res.render('signin', { message: 'must be signed in' });
    })
    .post(async (req, res) => {
        if (req.session.userid) {
            const email = req.session.userid;
            const platform = req.body.platform;
            const url = req.body.url;
            const targetPrice = Number(req.body.targetPrice);
            const originalPrice = Number(req.body.originalPrice);
            const label = req.body.label;
            const hit = true;

            const trackObj = { platform, url, targetPrice, originalPrice, label, hit };
            const docExists = await trackMod.findOne({ email: email });

            if (docExists != null) {
                await trackMod.updateOne({ email: email }, { $push: { trackList: trackObj }});
                const trackList = await getTrackList(req.session, trackMod);
                return res.render('dashboard', { trackList: trackList });
                
            } else {
                console.log('document does not exist');
                return res.render('dashboard', { message: 'invalid' });
            }
        }
        return res.render('signin', { message: 'must be signed in' });
    });

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
