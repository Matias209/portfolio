// Tres interacciones: el menú en el celular, el cambio de idioma y la profundidad del inicio.
// Todo lo demás (las órbitas, los links) funciona solo con HTML y CSS.

const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu");

// Abre o cierra el menú y avisa a los lectores de pantalla si está abierto.
function alternarMenu() {
    const estaAbierto = menu.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", String(estaAbierto));
}

// Cierra el menú. Se usa al elegir una sección o al apretar Escape.
function cerrarMenu() {
    menu.classList.remove("abierto");
    botonMenu.setAttribute("aria-expanded", "false");
}

botonMenu.addEventListener("click", alternarMenu);

// Al tocar un link del menú, lo cerramos para que no tape la sección.
menu.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) {
        cerrarMenu();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        cerrarMenu();
    }
});

// ---------- Cambio de idioma (español / inglés) ----------
// El HTML está escrito en español. Cada elemento traducible lleva su texto en inglés
// en un atributo: data-en="..." (para el contenido) o data-en-alt / data-en-aria-label.
// Al cambiar de idioma guardamos el original en español la primera vez y lo restauramos al volver.

const botonIdioma = document.getElementById("boton-idioma");

// Los textos del <head> no están en la página, así que se traducen desde acá.
const textosCabecera = {
    es: {
        titulo: document.title,
        descripcion: document.querySelector('meta[name="description"]').content,
    },
    en: {
        titulo: "Matías Samuel Díaz | Technology, automation and CX",
        descripcion:
            "Portfolio of Matías Samuel Díaz: technology, team leadership, automation and customer experience. Includes OrbitCX, a suite of four tools for contact centers.",
    },
};

function aplicarIdioma(idioma) {
    const esIngles = idioma === "en";
    document.documentElement.lang = idioma;

    // Contenido: guardamos el español la primera vez y alternamos
    document.querySelectorAll("[data-en]").forEach((elemento) => {
        if (elemento.dataset.es === undefined) {
            elemento.dataset.es = elemento.innerHTML;
        }
        elemento.innerHTML = esIngles ? elemento.dataset.en : elemento.dataset.es;
    });

    // Atributos que leen los lectores de pantalla (alt y aria-label)
    ["alt", "aria-label"].forEach((atributo) => {
        document.querySelectorAll(`[data-en-${atributo}]`).forEach((elemento) => {
            // dataset no admite guiones seguidos de minúscula, por eso usamos nombres en camelCase
            const guardado = atributo === "alt" ? "esAlt" : "esAriaLabel";
            if (elemento.dataset[guardado] === undefined) {
                elemento.dataset[guardado] = elemento.getAttribute(atributo);
            }
            elemento.setAttribute(
                atributo,
                esIngles ? elemento.getAttribute(`data-en-${atributo}`) : elemento.dataset[guardado]
            );
        });
    });

    document.title = textosCabecera[idioma].titulo;
    document.querySelector('meta[name="description"]').content = textosCabecera[idioma].descripcion;

    // El botón muestra el idioma al que se puede cambiar (el texto lo cambia el bucle de arriba)
    botonIdioma.lang = esIngles ? "es" : "en";

    // Recordamos la elección. Puede fallar (por ejemplo, navegación privada): no pasa nada.
    try {
        localStorage.setItem("idioma", idioma);
    } catch (error) {
        // Sin almacenamiento, la página simplemente vuelve a español al recargar.
    }
}

botonIdioma.addEventListener("click", () => {
    const idiomaActual = document.documentElement.lang;
    aplicarIdioma(idiomaActual === "en" ? "es" : "en");
    cerrarMenu();
});

// Al cargar, usamos el idioma guardado (si hay uno)
try {
    if (localStorage.getItem("idioma") === "en") {
        aplicarIdioma("en");
    }
} catch (error) {
    // Sin almacenamiento, se queda en español.
}

// ---------- Profundidad en el inicio ----------
// Mide dónde está el mouse dentro de la pantalla y se lo pasa al CSS
// como dos números entre -1 y 1. El CSS decide cuánto mueve cada capa.
// En celular no hay mouse, así que ahí queda solo la animación lenta.

const escena = document.getElementById("escena");
const quiereMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

let cuadroPendiente = false;

function moverCapas(evento) {
    // Usamos requestAnimationFrame para actualizar una sola vez por cuadro
    if (cuadroPendiente) {
        return;
    }
    cuadroPendiente = true;

    requestAnimationFrame(() => {
        const x = (evento.clientX / window.innerWidth) * 2 - 1;
        const y = (evento.clientY / window.innerHeight) * 2 - 1;
        escena.style.setProperty("--mx", x.toFixed(3));
        escena.style.setProperty("--my", y.toFixed(3));
        cuadroPendiente = false;
    });
}

if (escena && !quiereMenosMovimiento.matches) {
    window.addEventListener("mousemove", moverCapas);
}
