const app = require('./app');

const PORT = process.env.PORT || 3000;
// Servidor
app.listen(PORT, () => console.log(`Servidor en linea, puerto ${PORT}!!`));

