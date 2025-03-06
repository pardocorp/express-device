const express = require('express');
const cors = require('cors');  // 👈 Importamos CORS
const device = require('express-device');
const DeviceDetector = require('device-detector-js');

const app = express();
const port = process.env.PORT || 3000;
const deviceDetector = new DeviceDetector();

// 🔥 Habilitar CORS correctamente 🔥
app.use(cors({
    origin: '*',  // 👈 Permitir TODAS las solicitudes (puedes cambiarlo a tu dominio)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(device.capture());

app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent'];
    const deviceInfo = deviceDetector.parse(userAgent);

    res.json({
        deviceType: req.device.type || "Desconocido",
        brand: deviceInfo.device ? deviceInfo.device.brand || "Desconocido" : "Desconocido",
        model: deviceInfo.device ? deviceInfo.device.model || "Desconocido" : "Desconocido",
        os: deviceInfo.os ? deviceInfo.os.name || "Desconocido" : "Desconocido",
        browser: deviceInfo.client ? deviceInfo.client.name || "Desconocido" : "Desconocido",
        userAgent: userAgent
    });
});

app.listen(port, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
