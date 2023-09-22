document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const jogarBtn = document.getElementById("jogarBtn");
    const resultado = document.getElementById("resultado");
    const body = document.body;

    const moeda = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 50,
        rotating: false,
    };

    const imagensMoeda = {
        cara: new Image(),
        coroa: new Image(),
    };
    imagensMoeda.cara.src = "cara.png";
    imagensMoeda.coroa.src = "coroa.png";

    jogarBtn.addEventListener("click", function () {
        if (moeda.rotating) return;

        moeda.rotating = true;
        resultado.textContent = "";

        setTimeout(function () {
            const ladoMoeda = Math.random() < 0.5 ? "cara" : "coroa";

            const angleIncrement = Math.PI / 20;
            let currentAngle = 0;

            const rotateCoin = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.save();
                ctx.translate(moeda.x, moeda.y);
                ctx.rotate(currentAngle);
                ctx.drawImage(imagensMoeda[ladoMoeda], -moeda.radius, -moeda.radius, moeda.radius * 2, moeda.radius * 2);
                ctx.restore();

                currentAngle += angleIncrement;

                if (currentAngle < Math.PI * 2) {
                    requestAnimationFrame(rotateCoin);
                } else {
                    moeda.rotating = false;
                    if (ladoMoeda === "cara") {
                        resultado.textContent = "Caiu Cara!";
                        body.style.backgroundColor = "#9400d3";
                    } else {
                        resultado.textContent = "Caiu Coroa!";
                        body.style.backgroundColor = "#daa520";
                    }
                }
            };

            rotateCoin();
        }, 1000);
    });
});
