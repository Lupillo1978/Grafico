let chart;

// plugin líneas verticales (eventos)
const verticalLines = {
    id: "verticalLines",
    afterDraw(chart, args, opts) {

        const { ctx, chartArea: { top, bottom }, scales: { x } } = chart;

        ctx.save();
        ctx.strokeStyle = "gray";
        ctx.setLineDash([6, 6]);

        (opts.lines || []).forEach(v => {
            const xPos = x.getPixelForValue(v);

            ctx.beginPath();
            ctx.moveTo(xPos, top);
            ctx.lineTo(xPos, bottom);
            ctx.stroke();
        });

        ctx.restore();
    }
};

Chart.register(verticalLines);

async function cargar() {

    const res = await fetch("/api/data");
    const data = await res.json();

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("chart"), {

        data: {

            labels: data.labels,

            datasets: [

                // BARRAS - alimentación
                {
                    type: "bar",
                    label: "Alimentación",
                    data: data.alimentacion,
                    backgroundColor: "#5a1ee5",
                    barThickness: 3,
                    yAxisID: "y2"
                },

                // ÁREA ROJA - respuesta
                {
                    type: "line",
                    label: "Respuesta del camarón",
                    data: data.respuesta,
                    borderColor: "red",
                    backgroundColor: "rgba(255,0,0,0.3)",
                    fill: true,
                    pointRadius: 0,
                    tension: 0.2,
                    yAxisID: "y2"
                },

                // TIEMPO DE GIRO
                {
                    type: "line",
                    label: "Tiempo de giro",
                    data: data.giro,
                    borderColor: "blue",
                    pointRadius: 0,
                    tension: 0.3,
                    yAxisID: "y"
                },

                // OXÍGENO
                {
                    type: "line",
                    label: "Oxígeno",
                    data: data.oxigeno,
                    borderColor: "gold",
                    pointRadius: 0,
                    tension: 0.3,
                    yAxisID: "y"
                },

                // TEMPERATURA
                {
                    type: "line",
                    label: "Temperatura",
                    data: data.temperatura,
                    borderColor: "green",
                    pointRadius: 0,
                    tension: 0.3,
                    yAxisID: "y"
                }
            ]
        },

        options: {

            responsive: true,
            interaction: {
                mode: "index",
                intersect: false
            },

            plugins: {
                verticalLines: {
                    lines: data.eventos
                },
                legend: {
                    position: "bottom"
                }
            },

            scales: {

                x: {
                    title: {
                        display: true,
                        text: "Tiempo"
                    }
                },

                y: {
                    position: "left",
                    min: 0,
                    max: 40,
                    title: {
                        display: true,
                        text: "Sensores"
                    }
                },

                y2: {
                    position: "right",
                    min: 0,
                    max: 600,
                    grid: {
                        drawOnChartArea: false
                    },
                    title: {
                        display: true,
                        text: "Respuesta / Alimentación"
                    }
                }
            }
        },

        plugins: [verticalLines]
    });
}

cargar();