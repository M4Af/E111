const express = require('express');
const path = require('path');
const passwordsRouter = require('./routes/passwordsRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..' ,'public')));  

app.use(express.urlencoded({ extended: true }));

app.use('/', passwordsRouter);

app.use((req, res) => {
    res.status(404).render('pages/error', { message: 'Strona nie istnieje' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('pages/error', { message: 'Błąd serwera' });
});

module.exports = app;
