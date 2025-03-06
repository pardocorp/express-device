const express = require('express');
const device = require('express-device');
const DeviceDetector = require('device-detector-js');
const useragent = require('express-useragent'); // Nueva librería para mejorar detección

const app = express();
const port = process.env.PORT || 3000;
const deviceDetector = new DeviceDetector();

app.use(device.capture());
app.use(useragent.express()); // Middleware para mejorar detección

app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent'];
    const deviceInfo = deviceDetector.parse(userAgent);

    res.json({
        deviceType: req.device.type || "Desconocido",
        brand: deviceInfo.device ? deviceInfo.device.brand || req.useragent.platform : "Desconocido",
        model: deviceInfo.device ? deviceInfo.device.model || "Desconocido" : "Desconocido",
        os: deviceInfo.os ? deviceInfo.os.name || req.useragent.os : "Desconocido",
        browser: deviceInfo.client ? deviceInfo.client.name || req.useragent.browser : "Desconocido",
        userAgent: userAgent
    });
});

app.listen(port, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
