let button = document.getElementById("boton-calcular");

button.addEventListener("click", calcular);
const input = document.getElementById("peso");
input.addEventListener("keydown", function(event) {
    if (event.key === "-") {
        event.preventDefault();
    } else if (event.key === "Enter") {
        button.click();
    }
});

input.addEventListener("keypress", function(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
});
function calcular() {
    const input = document.getElementById("peso");
    const peso = parseInt(input.value);
    const FLU = document.getElementById("flu");
    const MAN = document.getElementById("man");
    const hollyday= document.getElementById("hollyday");
    const superficie = document.getElementById("superficie");
    const info = document.getElementById("info");
    if (isNaN(peso)) {
        const ERROR = document.getElementById("error");
        ERROR.style.display = "block";
        hollyday.style.display = "none";
        superficie.style.display = "none";
        FLU.style.display = "none";
        MAN.style.display = "none";
        return;
    }
    if (peso <= 30 && peso > 0) {
        const VOLUMEN_DIARIO = HollydaySegar(peso);
        const MANTENIMIENTO = Math.round(VOLUMEN_DIARIO / 24);
        const MM2 = Math.round(MANTENIMIENTO * 1.5);
        FLU.innerHTML = ("Dosis: ") + MANTENIMIENTO + ("cc/hr");
        MAN.innerHTML = ("Mantenimiento: ")+ "m+m/2:" + MM2 + "cc/hr";
        FLU.style.display = "block";
        MAN.style.display = "block";
        hollyday.style.display = "block";
        superficie.style.display = "none";
        info.style.display = "none";
    } else if (peso <= 0) {
        const ERROR = document.getElementById("error");
        ERROR.style.display = "block";
        hollyday.style.display = "none";
        superficie.style.display = "none";
        FLU.style.display = "none";
        MAN.style.display = "none";
        return;
    } else {
        const SC1500 = Math.round(superficieCorporal(peso) * 1500);
        const sc2000 = Math.round(superficieCorporal(peso) * 2000);
        FLU.innerHTML = ("Dosis: ")+ SC1500 + ("cc/hr");
        MAN.innerHTML = ("Mantenimiento: ") + sc2000 + ("cc/hr");
        FLU.style.display = "block";
        MAN.style.display = "block";
        superficie.style.display = "block";
        hollyday.style.display = "none";
        info.style.display = "none";
    }
}

function HollydaySegar(peso) {
    let volumenDiario;
    if (peso <= 10) {
        volumenDiario = peso * 100;
    } else if (peso <= 20) {
        volumenDiario = 1000 + ((peso - 10) * 50);
    } else if (peso <= 30) {
        volumenDiario = 1500 + ((peso - 20) * 20);
    }
    return volumenDiario;
}

function superficieCorporal(peso) {
    let superficieCorporal = ((peso * 4) + 7) / (peso + 90);
    return superficieCorporal;
}