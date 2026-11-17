// --- 1. LÓGICA DE NAVEGACIÓN SPA ---
const botonesNav = document.querySelectorAll('.nav-btn');
const secciones = document.querySelectorAll('section');

function cambiarSeccion(evento) {
    const botonPresionado = evento.currentTarget;
    const idSeccionDestino = botonPresionado.getAttribute('data-target');

    // Ocultar todas las secciones
    secciones.forEach(seccion => {
        seccion.classList.remove('seccion-activa');
        seccion.classList.add('seccion-oculta');
    });

    // Quitar "active" de la navbar
    botonesNav.forEach(boton => {
        boton.classList.remove('active');
    });

    // Mostrar sección solicitada
    const seccionMostrar = document.getElementById(idSeccionDestino);
    seccionMostrar.classList.remove('seccion-oculta');
    seccionMostrar.classList.add('seccion-activa');

    // Activar botón de la navbar correspondiente
    const botonNavDestino = document.querySelector(`.nav-btn[data-target="${idSeccionDestino}"]`);
    if(botonNavDestino) {
        botonNavDestino.classList.add('active');
    }
}

botonesNav.forEach(boton => {
    boton.addEventListener('click', cambiarSeccion);
});

// --- 2. LÓGICA DE LOS BOTONES DE INICIO ---

// A. Botón "Quiero saber más" (Navega a la sección Mao)
const btnSaberMas = document.getElementById('btn-saber-mas');
btnSaberMas.addEventListener('click', () => {
    // Simulamos un clic en el botón de la navbar que apunta a "mao"
    const botonMao = document.querySelector('.nav-btn[data-target="mao"]');
    botonMao.click();
});

// B. Botón evasivo "No, gracias" (Se escapa del cursor)
const btnNoGracias = document.getElementById('btn-no-gracias');

// Usamos el evento 'mouseover' que detecta cuando el mouse pasa sobre el elemento
btnNoGracias.addEventListener('mouseover', function() {
    // Cambiamos su posición a 'fixed' para poder moverlo libremente por toda la pantalla
    this.style.position = 'fixed';
    
    // Obtenemos las dimensiones máximas de la ventana restando el tamaño del botón
    // para que no se salga de la pantalla
    const maxX = window.innerWidth - this.clientWidth;
    const maxY = window.innerHeight - this.clientHeight;
    
    // Generamos coordenadas X e Y aleatorias
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    // Aplicamos las nuevas coordenadas al botón
    this.style.left = randomX + 'px';
    this.style.top = randomY + 'px';
});
// --- 3. LÓGICA DE LA CRONOLOGÍA (ESTRUCTURA DE DATOS Y DOM) ---

// A. Estructura de datos (Requisito CCOMP): Objeto que funciona como base de datos histórica
const datosCronologia = {
    "1934": {
        titulo: "La Larga Marcha",
        descripcion: "Retirada militar masiva del Ejército Rojo chino de más de 9,000 kilómetros para evadir al ejército nacionalista. Elevó a Mao al liderazgo indiscutible del Partido."
    },
    "1949": {
        titulo: "Proclamación de la República Popular China",
        descripcion: "Mao Zedong declara la fundación de la RPC en la Plaza de Tiananmen tras la victoria comunista, marcando el fin del 'Siglo de Humillación'."
    },
    "1958": {
        titulo: "El Gran Salto Adelante",
        descripcion: "Campaña económica masiva para industrializar el país. Su mala planificación y desvío de recursos agrícolas resultó en la Gran Hambruna (15-45 millones de muertes)."
    },
    "1966": {
        titulo: "Inicio de la Revolución Cultural",
        descripcion: "Mao moviliza a los Guardias Rojos para purgar elementos 'burgueses' y recuperar el control absoluto, provocando persecución política y parálisis educativa."
    },
    "1976": {
        titulo: "Muerte de Mao y fin de una era",
        descripcion: "Tras la muerte de Mao, la cúpula radical es arrestada. Deng Xiaoping asciende al poder, cerrando el maoísmo ortodoxo e iniciando la apertura capitalista."
    }
};

// B. Seleccionar los elementos de la interfaz
const botonesAnio = document.querySelectorAll('.btn-anio');
const eventoTitulo = document.getElementById('evento-titulo');
const eventoDesc = document.getElementById('evento-desc');
const displayEvento = document.getElementById('display-evento');

// C. Función que actualiza la información al hacer clic
function cambiarAnio(evento) {
    const boton = evento.currentTarget;
    const anioSeleccionado = boton.getAttribute('data-anio');

    // 1. Manejo visual de los botones
    botonesAnio.forEach(b => b.classList.remove('activo'));
    boton.classList.add('activo');

    // 2. Efecto visual de desvanecimiento para el texto
    displayEvento.classList.remove('animar-cambio');
    void displayEvento.offsetWidth; // Un pequeño truco de JS para forzar al navegador a reiniciar la animación
    displayEvento.classList.add('animar-cambio');

    // 3. Extraer datos de la estructura y actualizar el HTML (El DOM)
    eventoTitulo.textContent = datosCronologia[anioSeleccionado].titulo;
    eventoDesc.textContent = datosCronologia[anioSeleccionado].descripcion;
}

// D. Asignar el evento 'click' a todos los botones de la cronología
botonesAnio.forEach(boton => {
    boton.addEventListener('click', cambiarAnio);
});
// --- 4. LÓGICA DE LA RED HISTÓRICA (VIS.JS) ---

// A. Estructuras de Datos: Base de datos histórica
const baseNodos = [
    { id: 1, label: "Revolución\nComunista (1949)", group: "Politica", shape: "box" },
    { id: 2, label: "Reforma Agraria", group: "Economia", shape: "box" },
    { id: 3, label: "Planificación\nEconómica", group: "Economia", shape: "box" },
    { id: 4, label: "Gran Salto\nAdelante (1958)", group: "Politica", shape: "circle" }, // Círculo para destacar
    { id: 5, label: "Hambruna y\nCrisis", group: "Sociedad", shape: "box" }
];

const baseAristas = [
    // El 'title' es lo que aparece si pasas el ratón, pero programaremos el clic para la ficha
    { id: "e1", from: 1, to: 2, label: "Consolidación", font: {align: 'middle'}, explicacion: "El nuevo Estado necesitaba eliminar el poder de los terratenientes para ganar el apoyo campesino." },
    { id: "e2", from: 2, to: 3, label: "Colectivización", font: {align: 'middle'}, explicacion: "La transformación de la propiedad rural permitió al Estado controlar la producción para financiar la industria." },
    { id: "e3", from: 3, to: 4, label: "Radicalización", font: {align: 'middle'}, explicacion: "Mao rechazó el modelo soviético lento y forzó una industrialización acelerada mediante la voluntad de las masas." },
    { id: "e4", from: 4, to: 5, label: "Fracaso productivo", font: {align: 'middle'}, explicacion: "La alteración de la producción agrícola y las cuotas irreales provocaron la mayor hambruna del siglo XX." }
];

// Diccionario con los detalles de cada ficha
const datosFichas = {
    1: { actor: "Mao Zedong y Ejército Rojo", objetivo: "Tomar el poder y unificar China tras la guerra civil.", consecuencias: "Establecimiento de un régimen totalitario de partido único." },
    2: { actor: "Campesinado y Cuadros del PCCh", objetivo: "Redistribuir la tierra a 300 millones de campesinos.", consecuencias: "Eliminación violenta de la clase terrateniente." },
    3: { actor: "Burocracia estatal", objetivo: "Centralizar la economía imitando los planes quinquenales soviéticos.", consecuencias: "El Estado asume el monopolio de compra y venta de granos." },
    4: { actor: "Mao Zedong y las Comunas Populares", objetivo: "Acelerar la industrialización y transformar la producción agrícola en tiempo récord.", consecuencias: "Alteraciones productivas catastróficas y destrucción económica." },
    5: { actor: "Población rural", objetivo: "(Consecuencia involuntaria)", consecuencias: "Muerte de entre 15 y 45 millones de personas debido a la escasez y las políticas coercitivas." }
};

// B. Configuración de colores por categoría
const opcionesRed = {
    groups: {
        Politica: { color: { background: '#ffcccc', border: '#b30000' }, font: { color: '#333' } },
        Economia: { color: { background: '#cce5ff', border: '#0056b3' }, font: { color: '#333' } },
        Sociedad: { color: { background: '#d4edda', border: '#155724' }, font: { color: '#333' } }
    },
    edges: {
        arrows: 'to', // Las flechas indican dirección de causa-consecuencia
        color: '#666',
        width: 2
    },
    physics: { enabled: true, solver: 'repulsion' } // Hace que los nodos floten orgánicamente
};

// Variables para la red
let redHistorica = null;
const contenedorRed = document.getElementById('mi-red-grafica');

// C. Función para inicializar/actualizar la red
function dibujarRed(categoriaFiltro) {
    // 1. Filtrar nodos según el botón presionado
    let nodosFiltrados = baseNodos;
    if (categoriaFiltro !== 'todas') {
        nodosFiltrados = baseNodos.filter(nodo => nodo.group === categoriaFiltro);
    }
    
    // Convertimos los arrays a formatos que la librería entienda
    const datosVis = {
        nodes: new vis.DataSet(nodosFiltrados),
        edges: new vis.DataSet(baseAristas) // Las flechas que no conecten nada se ocultan solas
    };

    // 2. Crear la red
    if (redHistorica !== null) { redHistorica.destroy(); }
    redHistorica = new vis.Network(contenedorRed, datosVis, opcionesRed);

    // 3. EVENTO CLIC (El más importante para CCOMP)
    redHistorica.on("click", function (propiedades) {
        const idNodoClic = propiedades.nodes[0];
        const idAristaClic = propiedades.edges[0];

        // Referencias al DOM
        const fichaDetalles = document.getElementById('ficha-detalles');
        const txtConexion = document.getElementById('ficha-conexion-texto');
        
        // Limpiamos la conexión previa
        txtConexion.textContent = "Haz clic en una flecha para ver por qué se relacionan estos hechos.";
        txtConexion.parentElement.style.display = "none";

        if (idNodoClic) {
            // El usuario hizo clic en un NODO (Acontecimiento)
            const nodoData = baseNodos.find(n => n.id === idNodoClic);
            const fichaData = datosFichas[idNodoClic];

            document.getElementById('ficha-titulo').textContent = nodoData.label.replace('\n', ' ');
            document.getElementById('ficha-categoria').textContent = nodoData.group;
            document.getElementById('ficha-actor').textContent = fichaData.actor;
            document.getElementById('ficha-objetivo').textContent = fichaData.objetivo;
            document.getElementById('ficha-consecuencias').textContent = fichaData.consecuencias;
            
            fichaDetalles.style.display = "block"; // Mostrar contenido

        } else if (idAristaClic && !idNodoClic) {
            // El usuario hizo clic directamente en una FLECHA (Conexión)
            const aristaData = baseAristas.find(a => a.id === idAristaClic);
            document.getElementById('ficha-titulo').textContent = "Relación histórica";
            fichaDetalles.style.display = "none"; // Ocultamos los datos de actor/objetivo
            
            txtConexion.textContent = aristaData.explicacion;
            txtConexion.parentElement.style.display = "block";
            fichaDetalles.style.display = "block";
        }
    });
}

// D. Lógica de los botones de filtrado
const botonesFiltro = document.querySelectorAll('.btn-filtro');
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', (e) => {
        // Quitar clase active a todos
        botonesFiltro.forEach(b => b.classList.remove('active'));
        // Ponerla al presionado
        e.currentTarget.classList.add('active');
        // Redibujar la red con el filtro seleccionado
        const categoria = e.currentTarget.getAttribute('data-categoria');
        dibujarRed(categoria);
    });
});

// E. Truco SPA: Vis.js necesita saber las dimensiones exactas para dibujar.
// Si dibujamos cuando la sección está oculta (display:none), se rompe.
// Debemos llamar a dibujarRed() solo cuando el usuario entra a la sección "Red".
const botonNavRed = document.querySelector('.nav-btn[data-target="red"]');
botonNavRed.addEventListener('click', () => {
    // Usamos setTimeout para darle 100 milisegundos a CSS para que cambie el display a 'flex'
    // antes de que Vis.js intente medir el contenedor.
    setTimeout(() => {
        dibujarRed('todas');
    }, 100);
});
// --- 5. LÓGICA DEL EXPLORADOR INTERACTIVO ---

// A. Estructura de Datos (Base de datos de las políticas)
const datosPoliticas = {
    "agraria": {
        titulo: "Reforma Agraria (1950-1952)",
        objetivo: "Eliminar a la clase terrateniente y redistribuir la tierra equitativamente entre los campesinos pobres.",
        aplicacion: "Mediante juicios populares orquestados, expropiaciones masivas y movilización de odio de clases impulsada por cuadros del partido.",
        consecuencias: "Consolidación total del apoyo campesino al nuevo Estado, con un baño de sangre sistemático contra los propietarios y cimentación de la futura estatización."
    },
    "flores": {
        titulo: "Campaña de las Cien Flores (1956)",
        objetivo: "Fomentar la libertad de expresión intelectual para que la ciudadanía criticara pacíficamente al gobierno y aportara ideas de mejora.",
        aplicacion: "Invitación estatal a la intelectualidad a manifestarse. Al surgir críticas severas contra el monopolio del Partido, Mao frenó abruptamente la campaña.",
        consecuencias: "Lanzamiento inmediato de la 'Campaña Antiderechista', que resultó en el arresto, exilio y tortura de cientos de miles de intelectuales y disidentes."
    },
    "salto": {
        titulo: "Gran Salto Adelante (1958-1962)",
        objetivo: "Acelerar la industrialización y aumentar exponencialmente la producción agrícola para alcanzar a potencias occidentales.",
        aplicacion: "Creación de inmensas 'Comunas Populares', hornos de acero de patio trasero y movilización masiva de trabajo descentralizado.",
        consecuencias: "La mala planificación, el desvío de recursos y las cuotas irreales provocaron una catastrófica caída productiva, desencadenando la 'Gran Hambruna China'."
    },
    "cultural": {
        titulo: "Revolución Cultural (1966-1976)",
        objetivo: "Purgar elementos capitalistas de la sociedad y recuperar el poder absoluto de Mao tras las críticas por el fracaso del Gran Salto.",
        aplicacion: "Movilización paramilitar de la juventud (Guardias Rojos), culto a la personalidad, persecución de maestros/intelectuales y destrucción de patrimonio histórico.",
        consecuencias: "Parálisis del sistema educativo, caos sociopolítico, destrucción económica y una persecución masiva que dejó profundas cicatrices culturales."
    }
};

// B. Elementos del DOM
const botonesPolitica = document.querySelectorAll('.btn-politica');
const panelPolitica = document.getElementById('panel-politica');

const polTitulo = document.getElementById('pol-titulo');
const polObjetivo = document.getElementById('pol-objetivo');
const polAplicacion = document.getElementById('pol-aplicacion');
const polConsecuencias = document.getElementById('pol-consecuencias');

// C. Función para cambiar el contenido
function cambiarPolitica(evento) {
    const boton = evento.currentTarget;
    const polSeleccionada = boton.getAttribute('data-politica');

    // 1. Efecto visual de los botones
    botonesPolitica.forEach(b => b.classList.remove('active'));
    boton.classList.add('active');

    // 2. Animación de desvanecimiento suave para el texto (usamos la misma clase que en cronología)
    panelPolitica.classList.remove('animar-cambio');
    void panelPolitica.offsetWidth; // Truco para reiniciar la animación
    panelPolitica.classList.add('animar-cambio');

    // 3. Extraer datos del objeto e inyectarlos en el HTML
    const data = datosPoliticas[polSeleccionada];
    polTitulo.textContent = data.titulo;
    polObjetivo.textContent = data.objetivo;
    polAplicacion.textContent = data.aplicacion;
    polConsecuencias.textContent = data.consecuencias;
}

// D. Asignar el evento a los botones
botonesPolitica.forEach(boton => {
    boton.addEventListener('click', cambiarPolitica);
});
// --- 6. LÓGICA DEL MODAL (DECLARACIÓN DE IA) ---
const modalIa = document.getElementById('modal-ia');
const btnAbrirIa = document.getElementById('btn-abrir-ia');
const btnCerrarIa = document.getElementById('btn-cerrar-ia');

// Abrir el modal
btnAbrirIa.addEventListener('click', () => {
    // Usamos display flex para que se centre automáticamente según nuestro CSS
    modalIa.style.display = 'flex'; 
});

// Cerrar el modal desde la X
btnCerrarIa.addEventListener('click', () => {
    modalIa.style.display = 'none';
});

// Cerrar el modal haciendo clic fuera de la caja blanca
modalIa.addEventListener('click', (evento) => {
    if (evento.target === modalIa) {
        modalIa.style.display = 'none';
    }
});