const express = require('express');
const morgan = require('morgan');
const apps = require('./apps/playstore');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
    const {genres, sort} = req.query;
    
    if(genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res.status(400).send(`Genres must be one of Action, Puzzle, Strategy, Casual, Arcade or Card.`);
        }
    }

    if(sort) {
        if(!['Rating', 'App'].includes(sort)) {
            return res.status(400).send('sort must be one of Rating or App');
        }
    }

    let results = apps.filter(app => 
        app.Genres.includes(genres)
    );

    if(sort && sort === 'App') {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
        });
    }

    if(sort && sort === 'Rating') {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0
        });
    }

    res.json(results)
})

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});

