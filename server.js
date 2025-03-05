const express = require('express');
const device = require('express-device');
const DeviceDetector = require('device-detector-js');

const app = express();
const port = process.env.PORT || 3000;
const deviceDetector = new DeviceDetector();

app.use(device.capture());

app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent'];
    const deviceInfo = deviceDetector.parse(userAgent);

    res.json({
        deviceType: req.device.type || "Desconocido",
        brand: deviceInfo.device.brand || "Desconocido",
        model: deviceInfo.device.model || "Desconocido",
        os: deviceInfo.os.name || "Desconocido",
        browser: deviceInfo.client.name || "Desconocido",
        userAgent: userAgent
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});