const express = require("express");
const router = express.Router();

// genera dataset tipo sistema de alimentación
function generarDatos() {

    const labels = [];
    const alimentacion = [];
    const respuesta = [];
    const giro = [];
    const oxigeno = [];
    const temperatura = [];

    for (let i = 0; i < 120; i++) {

        labels.push(i);

        // disparos de alimentador cada 10 pasos
        const feed = i % 10 === 0 ? 550 : 0;
        alimentacion.push(feed);

        // respuesta tipo decaimiento exponencial
        const ciclo = i % 10;
        respuesta.push(300 * Math.exp(-ciclo / 2));

        // tiempo de giro
        giro.push(18 + Math.sin(i / 30) * 4);

        // sensores ambientales
        oxigeno.push(6.8 + Math.sin(i / 25) * 0.3);
        temperatura.push(28 + Math.sin(i / 40));
    }

    return {
        labels,
        alimentacion,
        respuesta,
        giro,
        oxigeno,
        temperatura,
        eventos: [15, 30, 55, 80, 100] // líneas verticales
    };
}

router.get("/data", (req, res) => {
    res.json(generarDatos());
});

module.exports = router;
