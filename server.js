const express = require('express');
const device = require('./lib/device.js'); // Importar express-device manualmente

const app = express();
const port = process.env.PORT || 3000; // Render asigna el puerto dinámicamente

app.use(device.capture()); // Middleware para detectar el dispositivo

app.get('/', (req, res) => {
    res.json({
        device: req.device.type, // Tipo de dispositivo: phone, tablet, desktop
        userAgent: req.headers['user-agent']
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
