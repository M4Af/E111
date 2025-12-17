const app = require('./app');
const { connectDB } = require('./data/connection');

const PORT = 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Błąd połączenia z bazą:', err);
});
