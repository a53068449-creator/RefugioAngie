
/* =====================================================
   REFUGIO — EXPLORA
   6 mundos independientes
   Narnia: quiz de conocimientos
   Boys Over Flowers: decisiones y 3 finales
   Hidden Love: historia de decisiones
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const detail = document.getElementById("detalle-mundo");

if (!detail) {
  console.error("Falta el elemento #detalle-mundo en el HTML.");
  return;
}

  const imagePaths = {
    magia: "../img/mundo-harry-potter.png",
    narnia: "../img/mundo-narnia.png",
    brujas: "../img/mundo-asesino-brujas.png",
    "boys-over-flowers": "../img/mundo-boys-over-flowers.png",
    macondo: "../img/mundo-macondo.png",
    "hidden-love": "../img/mundo-hidden-love.png"
  };

  const worlds = {
    magia: {
      name: "La biblioteca mágica",
      category: "MAGIA Y MISTERIO",
      description: "Entre libros antiguos y luces flotantes hay una habitación que no aparece en ningún mapa.",
      portalTitle: "Una puerta entre libros",
      portalDescription: "Una biblioteca iluminada por velas. Un libro acaba de abrirse solo sobre una mesa.",
      enterLabel: "Acercarme al libro",
      activities: [
        {
          title: "El libro sin título",
          text: "Sobre la mesa hay tres libros: uno azul, uno dorado y uno negro. ¿Cuál te gustaría abrir?",
          hint: "No hay una elección incorrecta. Escoge el que te llame la atención."
        },
        {
          title: "Un objeto encantado",
          text: "Una pluma escribe palabras en el aire y una llave brilla en la oscuridad. ¿Qué poder tendría uno de estos objetos?",
          hint: "Imagina algo que te gustaría poder hacer con magia."
        },
        {
          title: "La sala secreta",
          text: "Detrás de una estantería aparece una habitación con un sillón, una manta y una ventana hacia el cielo nocturno.",
          hint: "Quizá esta habitación sea simplemente un lugar para descansar."
        }
      ]
    },

    narnia: {
      name: "Más allá del armario",
      category: "LAS CRÓNICAS DE NARNIA",
      description: "El bosque guarda secretos que solo alguien que conoce bien los libros puede descubrir.",
      portalTitle: "La prueba del armario",
      portalDescription: "El bosque está cubierto de nieve. El farol ilumina un sendero y, al fondo, hay un libro abierto.",
      enterLabel: "Comenzar el desafío"
    },

    brujas: {
      name: "El secreto de las brujas",
      category: "FANTASÍA OSCURA",
      description: "Símbolos antiguos aparecen sobre una mesa de piedra. Una luz violeta ilumina un círculo de runas.",
      portalTitle: "El círculo de las runas",
      portalDescription: "Una habitación oculta entre árboles. Sobre una mesa hay un mapa, una vela violeta y tres símbolos.",
      enterLabel: "Examinar los símbolos",
      activities: [
        {
          title: "El símbolo perdido",
          text: "Encuentras una luna, una llave y una hoja. Escoge uno para descubrir qué historia imaginaria guarda.",
          hint: "La luna representa la noche, la llave los secretos y la hoja los cambios."
        },
        {
          title: "El mapa antiguo",
          text: "El mapa señala una torre abandonada, un jardín oculto y una biblioteca. ¿Cuál explorarías?",
          hint: "La biblioteca parece tener una pequeña luz en una de sus ventanas."
        },
        {
          title: "La vela violeta",
          text: "La llama cambia de color cuando te acercas. En la pared aparece una frase: «Incluso la noche tiene rincones tranquilos».",
          hint: "Puedes quedarte con esa frase o seguir explorando."
        }
      ]
    },

    "boys-over-flowers": {
      name: "Boys Over Flowers",
      category: "ROMANCE · DECISIONES · DESTINO",
      description: "Eres Geum Jan-di. En el instituto Shinhwa, tus decisiones pueden cambiar tu historia.",
      portalTitle: "Esta vez decides tú",
      portalDescription: "Un nuevo día en el instituto Shinhwa. Una decisión puede cambiar lo que ocurre después.",
      enterLabel: "Vivir la historia"
    },

    macondo: {
      name: "Cartas que cruzan distancias",
      category: "GABRIEL GARCÍA MÁRQUEZ",
      description: "Un viaje literario entre recuerdos, cartas y amores que intentan sobrevivir al tiempo y la distancia.",
      portalTitle: "La casa de las cartas",
      portalDescription: "Sobre una mesa antigua descansa una carta sin destinatario. Una mariposa amarilla entra por la ventana.",
      enterLabel: "Abrir la carta",
      activities: [
        {
          title: "Una carta sin destino",
          text: "La carta contiene tres palabras: recuerdo, espera y regreso. ¿Cuál seguirías para descubrir su historia?",
          hint: "Cada palabra puede abrir un camino distinto."
        },
        {
          title: "El mensaje escondido",
          text: "Entre las páginas de un libro encuentras una fotografía antigua con una fecha escrita detrás.",
          hint: "La fecha podría ser la pista para entender quién escribió la carta."
        },
        {
          title: "La última página",
          text: "El libro termina con una página en blanco. Puedes imaginar el final que la historia todavía no ha contado.",
          hint: "A veces, una historia continúa en lo que cada lector imagina."
        }
      ]
    },

    "hidden-love": {
      name: "Hidden Love",
      category: "ROMANCE · PEQUEÑOS GESTOS",
      description: "Mensajes, conversaciones y sentimientos que crecen poco a poco. Tus decisiones darán forma a esta aventura.",
      portalTitle: "Un mensaje inesperado",
      portalDescription: "Una tarde tranquila. Tu teléfono se ilumina con un mensaje de Duan Jiaxu.",
      enterLabel: "Descubrir la historia"
    }
  };

  let currentKey = null;
  let activityIndex = 0;

  /* =====================================================
     UTILIDADES
  ===================================================== */

  function shuffle(items) {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  function getAccent(key) {
    const colors = {
      magia: "#e7c67d",
      narnia: "#9edcff",
      brujas: "#c6a0ff",
      "boys-over-flowers": "#f3b6d7",
      macondo: "#f2dc83",
      "hidden-love": "#f5b6d5"
    };

    return colors[key] || "#c5b4ff";
  }

  function openWorld(key) {
    if (!worlds[key]) return;

    currentKey = key;
    createPortal();
  }

  function closeWorld() {
    detail.hidden = true;
    currentKey = null;

    document.getElementById("mundos").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  /* =====================================================
     PORTAL DE CADA MUNDO
  ===================================================== */

  function createPortal() {
    const world = worlds[currentKey];

    detail.className = "world-detail portal-stage";
    detail.style.setProperty("--portal-accent", getAccent(currentKey));

    detail.innerHTML = `
      <button class="close-world" id="cerrar-mundo" type="button">
        ← Volver a los mundos
      </button>

      <div class="portal-content">
        <span class="eyebrow">${world.category}</span>
        <h2>${world.portalTitle}</h2>

        <div class="scene-frame">
          <img
            class="portal-scene-image"
            src="${imagePaths[currentKey]}"
            alt="Escena de ${world.name}"
            onerror="this.style.display='none'"
          >
          <div class="scene-vignette"></div>
          <span class="scene-caption">${getCaption(currentKey)}</span>
        </div>

        <p class="portal-description">${world.portalDescription}</p>

        <button class="world-button portal-enter" id="entrar-mundo" type="button">
          ${world.enterLabel} <span aria-hidden="true">→</span>
        </button>

        <p class="portal-note">
          Explora a tu ritmo. Puedes regresar cuando quieras.
        </p>
      </div>
    `;

    document.getElementById("cerrar-mundo").addEventListener("click", closeWorld);
    document.getElementById("entrar-mundo").addEventListener("click", enterWorld);

    detail.hidden = false;
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function getCaption(key) {
    const captions = {
      magia: "LOS SECRETOS DE LA BIBLIOTECA",
      narnia: "EL ARMARIO ENTRE DOS MUNDOS",
      brujas: "EL CÍRCULO DE LAS RUNAS",
      "boys-over-flowers": "UNA HISTORIA QUE PUEDES CAMBIAR",
      macondo: "CARTAS QUE CRUZAN DISTANCIAS",
      "hidden-love": "HAY MENSAJES QUE LO CAMBIAN TODO"
    };

    return captions[key] || "UNA PUERTA A LO DESCONOCIDO";
  }

  function enterWorld() {
    if (!currentKey) return;

    if (currentKey === "narnia") {
      startNarniaQuiz();
    } else if (currentKey === "boys-over-flowers") {
      startBoysOverFlowers();
    } else if (currentKey === "hidden-love") {
      startHiddenLove();
    } else {
      startSimpleWorld();
    }
  }

  /* =====================================================
     MUNDOS DE EXPLORACIÓN TRANQUILA
  ===================================================== */

  function startSimpleWorld() {
    activityIndex = 0;
    const world = worlds[currentKey];

    detail.className = "world-detail";
    detail.style.setProperty("--portal-accent", getAccent(currentKey));

    detail.innerHTML = `
      <button class="close-world" id="cerrar-mundo" type="button">
        ← Salir de este mundo
      </button>

      <div class="detail-content">
        <span class="eyebrow">${world.category}</span>
        <h2>${world.name}</h2>
        <p>${world.description}</p>

        <div class="activity-panel">
          <span class="activity-icon" aria-hidden="true">✦</span>
          <h3 id="actividad-titulo"></h3>
          <p id="actividad-texto"></p>

          <div class="activity-actions">
            <button class="world-button" id="nueva-actividad" type="button">
              Descubrir algo ✧
            </button>
            <button class="quiet-button" id="mostrar-pista" type="button">
              Dame una pista
            </button>
          </div>

          <p class="activity-feedback" id="actividad-respuesta" hidden></p>
        </div>
      </div>
    `;

    document.getElementById("cerrar-mundo").addEventListener("click", closeWorld);
    document.getElementById("nueva-actividad").addEventListener("click", showNextActivity);
    document.getElementById("mostrar-pista").addEventListener("click", showHint);

    showActivity();
  }

  function showActivity() {
    const activity = worlds[currentKey].activities[activityIndex];

    document.getElementById("actividad-titulo").textContent = activity.title;
    document.getElementById("actividad-texto").textContent = activity.text;

    const response = document.getElementById("actividad-respuesta");
    response.hidden = true;
    response.textContent = "";

    document.getElementById("nueva-actividad").innerHTML =
      activityIndex === worlds[currentKey].activities.length - 1
        ? 'Volver a explorar <span aria-hidden="true">↻</span>'
        : 'Descubrir algo <span aria-hidden="true">✧</span>';
  }

  function showNextActivity() {
    const activities = worlds[currentKey].activities;
    activityIndex = (activityIndex + 1) % activities.length;
    showActivity();
  }

  function showHint() {
    const activity = worlds[currentKey].activities[activityIndex];
    const response = document.getElementById("actividad-respuesta");

    response.textContent = activity.hint;
    response.hidden = false;
  }

  /* =====================================================
     NARNIA — QUIZ DE CONOCIMIENTOS
     Independiente de los otros mundos.
  ===================================================== */

  const narniaQuestions = [
    {
      level: "La historia comienza",
      question: "En «El sobrino del mago», ¿qué objeto hace sonar Jadis en Charn?",
      options: ["Una campana", "Un cuerno", "Una flauta", "Una llave"],
      answer: 0,
      hint: "Es un objeto que se puede hacer sonar para que produzca un repique.",
      explanation: "Jadis hace sonar una campana en Charn. Su sonido despierta a la reina y desencadena los acontecimientos."
    },
    {
      level: "La historia comienza",
      question: "¿Qué relación tiene el árbol que nace de la manzana plantada por Digory con el armario?",
      options: [
        "Su madera se utiliza para construirlo",
        "Sus raíces llevan directamente a Narnia",
        "Sus hojas permiten viajar en el tiempo",
        "Sus frutos convierten a Lucy en reina"
      ],
      answer: 0,
      hint: "Piensa en el material con el que se construye el armario.",
      explanation: "La madera del árbol nacido de la manzana se utiliza años después para construir el armario."
    },
    {
      level: "Los secretos del reino",
      question: "¿Qué criatura es el señor Tumnus?",
      options: ["Un fauno", "Un centauro", "Un enano", "Un grifo"],
      answer: 0,
      hint: "Lucy lo encuentra cerca del farol, llevando un paraguas.",
      explanation: "El señor Tumnus es un fauno que se hace amigo de Lucy."
    },
    {
      level: "Los secretos del reino",
      question: "¿Qué instrumento recibe Susan de Papá Noel?",
      options: ["Un arco y flechas", "Una espada", "Un escudo", "Una flauta"],
      answer: 0,
      hint: "Susan es especialmente hábil con un arma que se utiliza a distancia.",
      explanation: "Susan recibe un arco, flechas y un cuerno mágico."
    },
    {
      level: "Más allá del armario",
      question: "¿Cómo se llama el valiente ratón parlante de Narnia?",
      options: ["Reepicheep", "Puddleglum", "Trumpkin", "Glenstorm"],
      answer: 0,
      hint: "Es un pequeño espadachín que sueña con llegar al país de Aslan.",
      explanation: "Reepicheep es el valiente ratón espadachín de las historias de Narnia."
    },
    {
      level: "Más allá del armario",
      question: "En «La travesía del Viajero del Alba», ¿a quién busca Caspian?",
      options: [
        "A los siete lores enviados al este",
        "A los cuatro reyes antiguos",
        "A la familia de la Bruja Blanca",
        "A los guardianes del armario"
      ],
      answer: 0,
      hint: "Son siete nobles que desaparecieron durante el reinado de Miraz.",
      explanation: "Caspian emprende el viaje para encontrar a los siete lores enviados al este."
    },
    {
      level: "Memoria de Narnia",
      question: "¿Quién acompaña a Jill y Eustace en «La silla de plata» y suele ser pesimista?",
      options: ["Puddleglum", "Reepicheep", "Doctor Cornelius", "Glenstorm"],
      answer: 0,
      hint: "Es un meneo de la ciénaga que siempre encuentra motivos para preocuparse.",
      explanation: "Puddleglum acompaña a Jill y Eustace en la búsqueda del príncipe Rilian."
    },
    {
      level: "Memoria de Narnia",
      question: "¿Quién mantiene hechizado al príncipe Rilian en «La silla de plata»?",
      options: [
        "La Dama de la Saya Verde",
        "La reina Lucy",
        "La madre de Caspian",
        "La reina de Archenland"
      ],
      answer: 0,
      hint: "Es una hechicera que vive bajo tierra y trata de convencerlos de que el mundo exterior no existe.",
      explanation: "La Dama de la Saya Verde mantiene hechizado a Rilian."
    },
    {
      level: "El desafío final",
      question: "¿Quién se disfraza de Aslan usando una piel de león en «La última batalla»?",
      options: ["Puzzle, el burro", "Shift, el mono", "Tirian, el rey", "Rishda Tarkaan"],
      answer: 0,
      hint: "Es un animal que acepta ponerse el disfraz preparado por Shift.",
      explanation: "Puzzle, el burro, es convencido para llevar la piel de león."
    },
    {
      level: "El desafío final",
      question: "¿De dónde proceden los hermanos Pevensie?",
      options: ["De la Tierra", "De Charn", "De Telmar", "De Archenland"],
      answer: 0,
      hint: "Su aventura comienza en nuestro mundo, antes de entrar en el armario.",
      explanation: "Los hermanos Pevensie proceden de la Tierra."
    },
    {
      level: "Una última prueba",
      question: "¿Cuál es el nombre del león que ocupa un lugar central en las historias de Narnia?",
      options: ["Aslan", "Rilian", "Caspian", "Miraz"],
      answer: 0,
      hint: "Es el personaje que representa la esperanza y guía a los protagonistas.",
      explanation: "Aslan es el gran león de Narnia."
    },
    {
      level: "Una última prueba",
      question: "¿Cómo se llama el príncipe que aparece en «La silla de plata» y necesita ser rescatado?",
      options: ["Rilian", "Caspian", "Edmund", "Peter"],
      answer: 0,
      hint: "Es el hijo del rey Caspian.",
      explanation: "El príncipe Rilian es el hijo de Caspian y el personaje que Jill y Eustace deben encontrar."
    }
  ];

  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;
  let quizLives = 3;
  let quizHints = 3;
  let quizAnswered = false;
  let quizUsedHint = false;

  function startNarniaQuiz() {
    quizQuestions = shuffle(narniaQuestions);
    quizIndex = 0;
    quizScore = 0;
    quizLives = 3;
    quizHints = 3;
    quizAnswered = false;
    quizUsedHint = false;

    renderNarniaQuestion();
  }

  function renderNarniaQuestion() {
    if (quizLives <= 0 || quizIndex >= quizQuestions.length) {
      renderNarniaEnd();
      return;
    }

    quizAnswered = false;
    quizUsedHint = false;

    const q = quizQuestions[quizIndex];

    const shuffledOptions = shuffle(
      q.options.map((text, originalIndex) => ({ text, originalIndex }))
    );

    detail.className = "world-detail narnia-game";
    detail.style.setProperty("--portal-accent", "#9edcff");

    detail.innerHTML = `
      <button class="close-world" id="cerrar-mundo" type="button">
        ← Salir del desafío
      </button>

      <div class="detail-content">
        <span class="eyebrow">NARNIA · LA PRUEBA DEL ARMARIO</span>
        <h2>Demuestra lo que sabes.</h2>
        <p>Los libros guardan secretos. Cada respuesta correcta te acerca al desafío final.</p>

        <div class="quiz-status">
          <div class="quiz-stat">
            <span class="quiz-stat-label">PUNTOS</span>
            <strong id="quiz-score">${quizScore}</strong>
          </div>
          <div class="quiz-stat">
            <span class="quiz-stat-label">VIDAS</span>
            <strong id="quiz-lives">${"♥ ".repeat(quizLives)}${"♡ ".repeat(3 - quizLives)}</strong>
          </div>
          <div class="quiz-stat">
            <span class="quiz-stat-label">PREGUNTA</span>
            <strong>${quizIndex + 1}/${quizQuestions.length}</strong>
          </div>
        </div>

        <div class="quiz-progress">
          <span style="width:${quizIndex / quizQuestions.length * 100}%"></span>
        </div>

        <div class="quiz-card">
          <span class="quiz-level">${q.level}</span>
          <h3>${q.question}</h3>

          <div class="quiz-options">
            ${shuffledOptions.map((option, i) => `
              <button
                class="quiz-option"
                type="button"
                data-answer="${option.originalIndex}"
              >
                <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
                <span>${option.text}</span>
              </button>
            `).join("")}
          </div>

          <div class="quiz-feedback" id="quiz-feedback" hidden aria-live="polite"></div>

          <div class="quiz-actions">
            <button class="quiet-button" id="quiz-hint" type="button">
              Usar pista (${quizHints})
            </button>
            <button class="world-button" id="quiz-next" type="button" hidden>
              Siguiente pregunta →
            </button>
          </div>
        </div>

        <p class="quiz-footnote">
          Una respuesta incorrecta consume una vida. Tienes tres pistas durante la aventura.
        </p>
      </div>
    `;

    document.getElementById("cerrar-mundo").addEventListener("click", closeWorld);

    document.querySelectorAll(".quiz-option").forEach(button => {
      button.addEventListener("click", () => {
        checkNarniaAnswer(Number(button.dataset.answer));
      });
    });

    document.getElementById("quiz-hint").addEventListener("click", showNarniaHint);
    document.getElementById("quiz-next").addEventListener("click", nextNarniaQuestion);
  }

  function checkNarniaAnswer(selected) {
    if (quizAnswered) return;
    quizAnswered = true;

    const q = quizQuestions[quizIndex];
    const isCorrect = selected === q.answer;
    const feedback = document.getElementById("quiz-feedback");

    document.querySelectorAll(".quiz-option").forEach(button => {
      button.disabled = true;

      const answer = Number(button.dataset.answer);

      if (answer === q.answer) {
        button.classList.add("correct");
      } else if (answer === selected) {
        button.classList.add("incorrect");
      }
    });

    if (isCorrect) {
      quizScore += quizUsedHint ? 50 : 100;
      feedback.innerHTML = `
        <strong>¡Respuesta correcta! +${quizUsedHint ? 50 : 100} puntos</strong>
        <p>${q.explanation}</p>
      `;
    } else {
      quizLives -= 1;
      feedback.innerHTML = `
        <strong>Esta vez no era esa respuesta.</strong>
        <p>${q.explanation}</p>
        <p>Te quedan ${quizLives} ${quizLives === 1 ? "vida" : "vidas"}.</p>
      `;
    }

    feedback.hidden = false;
    document.getElementById("quiz-score").textContent = quizScore;
    document.getElementById("quiz-lives").textContent =
      `${"♥ ".repeat(quizLives)}${"♡ ".repeat(3 - quizLives)}`;

    document.getElementById("quiz-hint").disabled = true;

    const next = document.getElementById("quiz-next");
    next.hidden = false;
    next.textContent =
      quizLives <= 0 || quizIndex === quizQuestions.length - 1
        ? "Ver mi resultado →"
        : "Siguiente pregunta →";
  }

  function showNarniaHint() {
    if (quizHints <= 0 || quizAnswered) return;

    quizHints -= 1;
    quizUsedHint = true;

    const q = quizQuestions[quizIndex];
    const feedback = document.getElementById("quiz-feedback");

    feedback.innerHTML = `<strong>Una pista:</strong><p>${q.hint}</p>`;
    feedback.hidden = false;

    const button = document.getElementById("quiz-hint");
    button.textContent = `Usar pista (${quizHints})`;
    button.disabled = quizHints <= 0;
  }

  function nextNarniaQuestion() {
    if (!quizAnswered) return;

    quizIndex += 1;
    renderNarniaQuestion();
  }

  function renderNarniaEnd() {
    const rank = quizScore >= 900
      ? "Guardiana de Narnia"
      : quizScore >= 600
        ? "Gran exploradora"
        : quizScore >= 300
          ? "Viajera de Narnia"
          : "Visitante del bosque";

    detail.innerHTML = `
      <button class="close-world" id="cerrar-mundo" type="button">
        ← Volver a los mundos
      </button>

      <div class="quiz-end">
        <span class="quiz-end-symbol">✦</span>
        <span class="eyebrow">EL BOSQUE RECUERDA TU VISITA</span>
        <h2>${rank}</h2>
        <p class="quiz-final-score">${quizScore} puntos</p>

        <p>
          ${quizLives > 0
            ? "Has recorrido los caminos de Narnia. Sus historias siempre guardan nuevos secretos."
            : "El bosque todavía guarda secretos. Puedes regresar y volver a intentarlo cuando quieras."}
        </p>

        <div class="quiz-result-stats">
          <div><strong>${Math.min(quizIndex + 1, quizQuestions.length)}</strong><span>Preguntas</span></div>
          <div><strong>${quizLives}</strong><span>Vidas restantes</span></div>
          <div><strong>${quizHints}</strong><span>Pistas restantes</span></div>
        </div>

        <div class="quiz-end-actions">
          <button class="world-button" id="quiz-restart" type="button">
            Intentarlo otra vez ↻
          </button>
          <button class="quiet-button" id="quiz-back" type="button">
            Volver al portal
          </button>
        </div>
      </div>
    `;

    document.getElementById("cerrar-mundo").addEventListener("click", closeWorld);
    document.getElementById("quiz-restart").addEventListener("click", startNarniaQuiz);
    document.getElementById("quiz-back").addEventListener("click", createPortal);
  }

    /* =====================================================
     BOYS OVER FLOWERS — NOVELA VISUAL
     8 capítulos · decisiones · celos · drama · 3 finales
     NARNIA PERMANECE INTACTA
  ===================================================== */

  const boysStory = [
    {
      chapter: "CAPÍTULO 1 DE 8 · EL PRIMER ENCUENTRO",
      title: "La chica que desafió al heredero",
      image: "bof-escena-01.png",
      caption: "SHINHWA · EL PRINCIPIO DEL CAOS",
      text: "Eres Geum Jan-di, una estudiante becada en Shinhwa. Cuando ves a Gu Jun-pyo humillando a otro estudiante, decides intervenir. Todo el pasillo se queda mirando. Jun-pyo no está acostumbrado a que alguien lo contradiga, y mucho menos una chica que no tiene miedo de mirarlo a los ojos.",
      choices: [
        {
          label: "Le digo que su peinado no le da derecho a tratar mal a nadie.",
          result: "Woo-bin se gira para esconder una carcajada. Yi-jung sonríe. Jun-pyo está rojo de rabia y promete que te arrepentirás de haberlo desafiado. Sin embargo, no consigue dejar de pensar en ti.",
          points: { junpyo: 2, jihoo: 0 },
          cruel: false
        },
        {
          label: "Ayudo al estudiante y me marcho sin darle importancia a Jun-pyo.",
          result: "Tu indiferencia lo irrita todavía más. Está acostumbrado a que todos reaccionen ante él; tú simplemente sigues con tu vida. Ji-hoo, en cambio, se fija en tu manera de actuar.",
          points: { junpyo: 0, jihoo: 2 },
          cruel: false
        },
        {
          label: "Le digo delante de todos que es un niño rico malcriado.",
          result: "El comentario corre por todo el instituto. Jun-pyo lo vive como una humillación pública. En lugar de reconocer que se equivocó, decide que necesita recuperar el control.",
          points: { junpyo: -1, jihoo: 1 },
          cruel: true
        },
        {
          label: "Me río de él y le digo que jamás saldría con alguien tan insoportable.",
          result: "Jun-pyo se queda helado. Luego vuelve a su actitud arrogante, fingiendo que tu opinión no le importa. Pero el golpe a su orgullo es más fuerte de lo que quiere admitir.",
          points: { junpyo: -2, jihoo: 1 },
          cruel: true
        }
      ]
    },

    {
      chapter: "CAPÍTULO 2 DE 8 · LA TARJETA ROJA",
      title: "Ahora todo el colegio va contra ti",
      image: "bof-escena-02.png",
      caption: "LA TARJETA ROJA · EL PRECIO DEL DESAFÍO",
      text: "La tarjeta roja convierte tu vida en un espectáculo. Aparecen burlas, trampas y compañeros que prefieren mirar hacia otro lado. Jun-pyo podría detenerlo todo, pero su orgullo le impide admitir que se ha equivocado. Tú empiezas a preguntarte si vale la pena intentar comprenderlo.",
      choices: [
        {
          label: "Me enfrento a quienes me acosan y no permito que me intimiden.",
          result: "Tu valentía no hace desaparecer los problemas, pero dejas claro que no aceptarás que te humillen. Jun-pyo empieza a comprender que no puede controlar cada cosa que sucede en el instituto.",
          points: { junpyo: 1, jihoo: 1 },
          cruel: false
        },
        {
          label: "Busco a Ji-hoo y a mis amigos para no afrontar esto sola.",
          result: "Encuentras apoyo cuando más lo necesitas. Ji-hoo no promete arreglarlo todo, pero te acompaña. Su presencia empieza a significar algo especial.",
          points: { junpyo: 0, jihoo: 2 },
          cruel: false
        },
        {
          label: "Le digo a Jun-pyo que es un cobarde por esconderse detrás de sus amigos.",
          result: "Tu acusación le duele porque toca algo que no quiere reconocer. Reacciona con furia y se marcha. Ninguno de los dos está preparado para hablar sin convertirlo en una batalla.",
          points: { junpyo: -1, jihoo: 1 },
          cruel: true
        },
        {
          label: "Finjo que no me importa y dejo que crea que ha conseguido destruirme.",
          result: "Dejas de buscar una explicación. Jun-pyo interpreta tu silencio como una derrota, pero cuando ya no te ve reaccionar, descubre que no sabe si te ha perdido o si nunca llegó a conocerte.",
          points: { junpyo: -2, jihoo: 1 },
          cruel: true
        }
      ]
    },

    {
      chapter: "CAPÍTULO 3 DE 8 · EL ORGULLO DE JUN-PYO",
      title: "¿Una disculpa o una orden?",
      image: "bof-escena-03.png",
      caption: "EL HEREDERO NO SABE PEDIR PERDÓN",
      text: "Jun-pyo intenta acercarse, pero no sabe cómo hacerlo. Organiza un plan carísimo, habla como si estuviera dando órdenes y espera que tú olvides lo ocurrido. Hay algo casi cómico en verlo intentar ser romántico sin renunciar a su orgullo.",
      choices: [
        {
          label: "Le digo que puede empezar por disculparse de verdad.",
          result: "Jun-pyo se queda sin su respuesta habitual. Por primera vez, entiende que impresionarte no es lo mismo que reparar el daño. La conversación resulta incómoda, pero abre una pequeña puerta.",
          points: { junpyo: 2, jihoo: 0 },
          cruel: false
        },
        {
          label: "Me río de su plan absurdo y le propongo algo sencillo.",
          result: "Jun-pyo protesta porque su idea era perfecta. Tú sigues riéndote y él termina intentando justificar hasta el último detalle. La tensión se rompe por un momento.",
          points: { junpyo: 2, jihoo: 0 },
          cruel: false
        },
        {
          label: "Acepto la invitación solo para dejarlo esperando.",
          result: "Jun-pyo llega al lugar convencido de que por fin tendrán una buena tarde. Espera, revisa el teléfono y vuelve a mirar la entrada. Cuando comprende que no vas a aparecer, se marcha furioso y avergonzado.",
          points: { junpyo: -3, jihoo: 0 },
          cruel: true
        },
        {
          label: "Le digo que su dinero no me interesa y que él tampoco.",
          result: "La expresión de Jun-pyo cambia. Intenta responder con arrogancia, pero no encuentra una frase que esconda del todo el golpe. Desde ese momento, empieza a protegerse manteniendo distancia.",
          points: { junpyo: -3, jihoo: 1 },
          cruel: true
        }
      ]
    },

    {
      chapter: "CAPÍTULO 4 DE 8 · JI-HOO",
      title: "El chico que siempre está ahí",
      image: "bof-escena-04.png",
      caption: "JI-HOO · UNA CALMA DIFERENTE",
      text: "Después de un día agotador, Ji-hoo se queda contigo. No te exige explicaciones ni intenta decidir por ti. Su tranquilidad contrasta con el torbellino que suele acompañar a Jun-pyo. Empiezas a preguntarte si alguien puede enamorarte sin hacer tanto ruido.",
      choices: [
        {
          label: "Le cuento lo que siento y dejo que me escuche.",
          result: "La conversación se vuelve íntima. Ji-hoo no necesita tener una solución para todo; simplemente te permite hablar. La confianza entre ustedes crece.",
          points: { junpyo: 0, jihoo: 3 },
          cruel: false
        },
        {
          label: "Le propongo hacer algo divertido para olvidarnos del drama.",
          result: "Por una tarde, todo parece más sencillo. Se ríen, comparten un momento agradable y descubres que la tranquilidad también puede despertar sentimientos.",
          points: { junpyo: 0, jihoo: 2 },
          cruel: false
        },
        {
          label: "Le digo que solo me sirve cuando Jun-pyo me hace daño.",
          result: "Ji-hoo guarda silencio. No esperaba que lo vieras como un refugio al que acudir únicamente cuando las cosas salen mal con otra persona. Empieza a preguntarse si realmente lo conoces.",
          points: { junpyo: 0, jihoo: -3 },
          cruel: true
        },
        {
          label: "Le cuento cosas íntimas para darle celos a Jun-pyo.",
          result: "Tu plan provoca una reacción, pero no la que esperabas. Ji-hoo descubre que lo has involucrado en una competencia sentimental y se siente utilizado.",
          points: { junpyo: -1, jihoo: -3 },
          cruel: true
        }
      ]
    },

    {
      chapter: "CAPÍTULO 5 DE 8 · LOS CELOS",
      title: "Nadie dijo que esto sería sencillo",
      image: "bof-escena-05.png",
      caption: "CELOS · ORGULLO · MALENTENDIDOS",
      text: "Jun-pyo te ve compartiendo un momento agradable con Ji-hoo. Su expresión cambia de inmediato. Empieza a hacer comentarios sarcásticos, exige explicaciones y actúa como si tuviera derecho a decidir con quién puedes pasar tiempo. La tensión aumenta y todos parecen esperar tu reacción.",
      choices: [
        {
          label: "Le digo que sentir celos no le da derecho a controlarme.",
          result: "Jun-pyo reacciona mal al principio. Está acostumbrado a conseguir lo que quiere, pero tu respuesta le obliga a enfrentarse a una realidad incómoda: no puedes pertenecerle a nadie.",
          points: { junpyo: 1, jihoo: 1 },
          cruel: false
        },
        {
          label: "Le explico lo que pasó, pero le pido que confíe en mí.",
          result: "La conversación es tensa, aunque consigues que te escuche. No todo queda resuelto, pero al menos intentas construir algo que no dependa de vigilarse mutuamente.",
          points: { junpyo: 2, jihoo: 0 },
          cruel: false
        },
        {
          label: "Coqueteo con Ji-hoo delante de Jun-pyo solo para hacerlo sufrir.",
          result: "Jun-pyo se marcha antes de que puedas ver cuánto le afecta. Ji-hoo también nota que estás utilizando el momento para provocar a otra persona. La victoria dura muy poco.",
          points: { junpyo: -3, jihoo: -2 },
          cruel: true
        },
        {
          label: "Le digo a Jun-pyo que jamás será suficiente para mí.",
          result: "Sus celos se transforman en rabia y después en silencio. En vez de discutir, se aleja. Has encontrado una manera de herirlo, pero también has debilitado la posibilidad de que vuelva a confiar en ti.",
          points: { junpyo: -3, jihoo: 0 },
          cruel: true
        }
      ]
    },

    {
      chapter: "CAPÍTULO 6 DE 8 · EL BESO",
      title: "Lo que Ji-hoo se atreve a decir",
      image: "bof-escena-06.png",
      caption: "UN BESO · MUCHAS CONSECUENCIAS",
      text: "La cercanía entre Ji-hoo y tú cambia durante un momento inesperado. Se acerca y te besa. Por unos segundos, no sabes qué hacer. Lo que decidas ahora puede acercarlos, distanciarlos o dejar sentimientos sin resolver.",
      choices: [
        {
          label: "Le correspondo porque quiero descubrir lo que siento por él.",
          result: "Ji-hoo se sorprende, pero no intenta apresurarte. El beso deja claro que entre ustedes existe algo que merece una conversación honesta.",
          points: { junpyo: 0, jihoo: 3 },
          cruel: false
        },
        {
          label: "Me aparto con cariño y le digo que necesito tiempo.",
          result: "Ji-hoo acepta que estés confundida. El momento resulta incómodo, pero la sinceridad evita que ambos hagan promesas que todavía no pueden cumplir.",
          points: { junpyo: 1, jihoo: 1 },
          cruel: false
        },
        {
          label: "Le digo que no significa nada y me voy sin dejarlo hablar.",
          result: "Ji-hoo se queda solo, intentando entender por qué lo apartaste de esa manera. No insiste. Por primera vez, eres tú quien nota cuánto pesa su silencio.",
          points: { junpyo: 0, jihoo: -3 },
          cruel: true
        },
        {
          label: "Le correspondo y después se lo cuento a Jun-pyo para hacerlo sufrir.",
          result: "La noticia llega como una bomba. Jun-pyo se siente traicionado y Ji-hoo descubre que has convertido un momento íntimo en un arma. Los tres terminan heridos.",
          points: { junpyo: -3, jihoo: -2 },
          cruel: true
        }
      ]
    },

    {
      chapter: "CAPÍTULO 7 DE 8 · LA NIEVE",
      title: "¿Lo dejarías esperando toda la noche?",
      image: "bof-escena-07.png",
      caption: "JUN-PYO · UNA ESPERA QUE DUELE",
      text: "La nieve cae mientras Jun-pyo espera verte. Está acostumbrado a que el mundo vaya a su ritmo, pero esta vez no puede hacer que aparezcas. Cada minuto lo vuelve más inseguro. Tú sabes que está allí y debes decidir si vas a buscarlo, si hablarás con él o si lo dejarás marcharse sin ti.",
      choices: [
        {
          label: "Voy a buscarlo. No quiero que siga pasando frío.",
          result: "Jun-pyo levanta la mirada al verte. Está congelado y trata de disimularlo con una frase orgullosa que no le sale demasiado bien. El momento es emotivo, aunque todavía quedan muchas cosas por resolver.",
          points: { junpyo: 3, jihoo: 0 },
          cruel: false
        },
        {
          label: "Voy, pero le digo que una espera no arregla todo lo que pasó.",
          result: "Jun-pyo esperaba que tu presencia significara que todo estaba perdonado. En cambio, tiene que escucharte hablar de lo que te dolió. La conversación es difícil, pero puede ser el principio de un cambio.",
          points: { junpyo: 2, jihoo: 0 },
          cruel: false
        },
        {
          label: "Lo dejo esperando. Si de verdad le importo, que aprenda a sufrir.",
          result: "Pasan las horas. Jun-pyo mira el camino una última vez antes de marcharse. Se siente humillado y empieza a creer que insistir en buscarte solo hará que vuelvas a rechazarlo. Cuando descubres que se fue, ya no puedes deshacer esa noche.",
          points: { junpyo: -4, jihoo: 0 },
          cruel: true
        },
        {
          label: "Le mando un mensaje diciendo que no voy a aparecer y lo bloqueo.",
          result: "Jun-pyo lee el mensaje bajo la nieve. Esperaba una discusión, una explicación o incluso un rechazo en persona. El mensaje le deja claro que has decidido cerrar la puerta sin escucharlo. Se marcha sin intentar buscarte otra vez.",
          points: { junpyo: -5, jihoo: 0 },
          cruel: true
        }
      ]
    },

    {
      chapter: "CAPÍTULO 8 DE 8 · LAS CONSECUENCIAS",
      title: "Ya no puedes fingir que nada pasó",
      image: "bof-escena-08.png",
      caption: "TU HISTORIA · TU ÚLTIMA DECISIÓN",
      text: "Los momentos que compartiste con Jun-pyo y Ji-hoo han dejado huella. Algunas decisiones construyeron confianza; otras abrieron heridas. Ninguno puede borrar lo que ocurrió. Te queda una última oportunidad de actuar, pero esta vez tendrás que vivir con las consecuencias de lo que has elegido durante toda la historia.",
      choices: [
        {
          label: "Busco a Jun-pyo y le digo que quiero reconstruir nuestra relación.",
          result: "Te acercas a Jun-pyo sin prometer que todo será perfecto. Lo que suceda ahora dependerá de la confianza que aún quede entre ustedes y de las decisiones que tomaste antes.",
          points: { junpyo: 2, jihoo: 0 },
          cruel: false
        },
        {
          label: "Busco a Ji-hoo y le confieso que quiero estar con él.",
          result: "Hablas con Ji-hoo con la esperanza de que todavía exista un camino para ustedes. Pero él también recuerda tus decisiones: no basta con decir que lo quieres, tendrás que demostrar que eres sincera.",
          points: { junpyo: 0, jihoo: 2 },
          cruel: false
        },
        {
          label: "Me marcho sola. No quiero seguir lastimando a ninguno.",
          result: "Te alejas para recuperar tu tranquilidad. Por primera vez, no intentas conseguir una reacción de ninguno de los dos. La decisión no borra el pasado, pero abre un camino distinto.",
          points: { junpyo: 0, jihoo: 0 },
          cruel: false
        },
        {
          label: "Les digo que ninguno fue suficiente y desaparezco sin mirar atrás.",
          result: "Tus palabras cierran las últimas posibilidades de reconciliación. Jun-pyo y Ji-hoo dejan de buscar explicaciones. Esta vez, la distancia no es un malentendido: es el resultado de cómo decidiste terminar las cosas.",
          points: { junpyo: -3, jihoo: -3 },
          cruel: true
        }
      ]
    }
  ];

  let romanceStep = 0;
  let romanceChoices = [];
  let romancePoints = { junpyo: 0, jihoo: 0 };

  function startBoysOverFlowers() {
    romanceStep = 0;
    romanceChoices = [];
    romancePoints = { junpyo: 0, jihoo: 0 };
    renderBoysRules();
  }

  
function renderBoysRules() {
  detail.className = "world-detail romance-game boys-game";
  detail.style.setProperty("--portal-accent", "#f3b6d7");

  detail.innerHTML = `
    <button class="close-world" id="cerrar-mundo" type="button">
      ← Volver a los mundos
    </button>

    <div class="romance-content bof-welcome">
      <span class="eyebrow">BOYS OVER FLOWERS · NOVELA VISUAL</span>

      <h2>Esta vez, la historia es tuya.</h2>

      <p class="romance-intro">
        Un encuentro, una tarjeta roja y dos corazones muy diferentes.
        En Shinhwa, cada decisión puede cambiarlo todo.
      </p>

      <div class="bof-cover">
        <img
          src="../img/bof-portada.png"
          alt="Angie como protagonista de Boys Over Flowers, junto a Jun-pyo y Ji-hoo"
        >
        <div class="bof-cover-caption">
          <span>🌸 TU HISTORIA COMIENZA AQUÍ 🌸</span>
          <p>Orgullo, celos, secretos y decisiones que dejan huella.</p>
        </div>
      </div>

      <div class="story-card">
        <span class="story-chapter">TRES DESENLACES POSIBLES</span>
        <h3>El final no se elige: se construye</h3>
        <p>
          ♥ Gu Jun-pyo: reconstruir una relación llena de conflictos.<br><br>
          ♡ Yoon Ji-hoo: descubrir si la tranquilidad se convierte en amor.<br><br>
          ✦ Jan-di: elegirse a sí misma y escribir su propio destino.
        </p>
      </div>

      <div class="story-card">
        <span class="story-chapter">ANTES DE ENTRAR</span>
        <h3>Tus decisiones tienen consecuencias</h3>
        <p>
          Encontrarás momentos románticos, situaciones incómodas,
          celos y opciones crueles. Tus elecciones afectarán la relación
          con ambos personajes y determinarán el desenlace.
        </p>
      </div>

      <button class="world-button romance-next" id="comenzar-boys" type="button">
        Entrar a Shinhwa ♡
      </button>

      <p class="romance-footnote">
        Ocho capítulos. Cuatro decisiones por escena. Una historia diferente cada vez.
      </p>
    </div>
  `;

  document
    .getElementById("cerrar-mundo")
    .addEventListener("click", closeWorld);

  document
    .getElementById("comenzar-boys")
    .addEventListener("click", renderBoysChapter);
}


  function renderBoysChapter() {
    const chapter = boysStory[romanceStep];

    detail.className = "world-detail romance-game boys-game";
    detail.style.setProperty("--portal-accent", "#f3b6d7");

    detail.innerHTML = `
      <button class="close-world" id="cerrar-mundo" type="button">
        ← Salir de la historia
      </button>

      <div class="romance-content">
        <span class="eyebrow">BOYS OVER FLOWERS · TU HISTORIA</span>
        <h2>¿Qué harías tú, Jan-di?</h2>

        <div class="romance-progress">
          ${boysStory.map((_, i) =>
            `<span class="${i <= romanceStep ? "active" : ""}"></span>`
          ).join("")}
        </div>

        <div class="story-scene-image">
          <img
            src="../img/${chapter.image}"
            alt="${chapter.caption}"
            onerror="this.onerror=null;this.src='${imagePaths["boys-over-flowers"]}'"
          >
          <span>${chapter.caption}</span>
        </div>

        <article class="story-card">
          <span class="story-chapter">${chapter.chapter}</span>
          <h3>${chapter.title}</h3>
          <p>${chapter.text}</p>
        </article>

        <div class="decision-heading">
          <span>♡</span>
          <div>
            <strong>Tu decisión</strong>
            <small>Elige con cuidado: algunas cosas no se pueden deshacer.</small>
          </div>
        </div>

        <div class="decision-options">
          ${chapter.choices.map((choice, i) => `
            <button class="decision-option" type="button" data-choice="${i}">
              <span class="decision-letter">${String.fromCharCode(65 + i)}</span>
              <span>${choice.label}</span>
              <span class="decision-arrow">↗</span>
            </button>
          `).join("")}
        </div>

        <div id="romance-feedback" class="romance-feedback" hidden aria-live="polite"></div>

        <button class="world-button romance-next" id="romance-next" type="button" hidden>
          Continuar la historia →
        </button>

        <p class="romance-footnote">
          Capítulo ${romanceStep + 1} de ${boysStory.length}
        </p>
      </div>
    `;

    document.getElementById("cerrar-mundo").addEventListener("click", closeWorld);

    document.querySelectorAll(".decision-option").forEach(button => {
      button.addEventListener("click", () => {
        chooseBoysOption(Number(button.dataset.choice));
      });
    });
  }

  function chooseBoysOption(index) {
    const chapter = boysStory[romanceStep];
    const choice = chapter.choices[index];

    if (!choice || romanceChoices.length !== romanceStep) return;

    document.querySelectorAll(".decision-option").forEach(button => {
      button.disabled = true;
    });

    romancePoints.junpyo += choice.points.junpyo;
    romancePoints.jihoo += choice.points.jihoo;
    romanceChoices.push(choice);

    document.querySelectorAll(".decision-option")[index].classList.add("selected");

    const feedback = document.getElementById("romance-feedback");

    feedback.innerHTML = `
      <span class="feedback-heart">${choice.cruel ? "💔" : "♡"}</span>
      <strong>${choice.cruel ? "Esta decisión deja una herida" : "Así responde la historia"}</strong>
      <p>${choice.result}</p>
    `;

    feedback.hidden = false;

    const next = document.getElementById("romance-next");
    next.hidden = false;
    next.textContent = romanceStep === boysStory.length - 1
      ? "Descubrir las consecuencias →"
      : "Continuar la historia →";

    next.addEventListener("click", advanceBoysStory, { once: true });
  }

  function advanceBoysStory() {
    if (romanceStep < boysStory.length - 1) {
      romanceStep += 1;
      renderBoysChapter();
      return;
    }

    renderBoysEnding();
  }

  function renderBoysEnding() {
    const cruelCount = romanceChoices.filter(choice => choice.cruel).length;
    const junpyo = romancePoints.junpyo;
    const jihoo = romancePoints.jihoo;

    let ending;

    if (junpyo >= 5 && junpyo > jihoo) {
      ending = "junpyo";
    } else if (jihoo >= 5 && jihoo > junpyo) {
      ending = "jihoo";
    } else {
      ending = "independiente";
    }

    // Si la historia acumuló demasiadas decisiones crueles,
    // las relaciones pueden quedar rotas aunque alguien tenga más puntos.
    if (cruelCount >= 4 || (junpyo <= -5 && jihoo <= -5)) {
      ending = "independiente";
    }

    const endings = {
      junpyo: {
        title: "Final: Gu Jun-pyo",
        subtitle: "Todavía queda algo por reconstruir",
        symbol: "♥",
        text: "A pesar de los conflictos, la relación con Jun-pyo conserva suficiente confianza para intentar un nuevo comienzo. Eso no significa que los celos o las humillaciones desaparezcan por arte de magia. Si quieren estar juntos, tendrán que aprender a respetarse y a comunicarse de otra manera."
      },
      jihoo: {
        title: "Final: Yoon Ji-hoo",
        subtitle: "Una conexión que sobrevivió al ruido",
        symbol: "♡",
        text: "La confianza con Ji-hoo se volvió el vínculo más fuerte de tu historia. Después de tantas decisiones, ambos tienen la oportunidad de hablar con sinceridad y descubrir si lo que sienten puede convertirse en una relación. El pasado no desaparece, pero todavía hay espacio para avanzar."
      },
      independiente: {
        title: "Final: Jan-di se elige a sí misma",
        subtitle: "No todas las historias terminan en pareja",
        symbol: "✦",
        text: cruelCount >= 4
          ? "Tus decisiones han dejado demasiadas heridas para fingir que todo está bien. Jun-pyo y Ji-hoo toman distancia, y tú decides marcharte sin perseguirlos. Tendrás que aprender de lo ocurrido y construir una vida que no dependa de la atención de ninguno."
          : "Los sentimientos no siempre bastan para construir una relación. Después de todo lo ocurrido, decides concentrarte en ti misma, tus sueños y tus amistades. No necesitas elegir a un chico para que tu historia tenga un final significativo."
      }
    };

    const result = endings[ending];

    detail.className = "world-detail romance-game boys-game";
    detail.style.setProperty("--portal-accent", "#f3b6d7");

    detail.innerHTML = `
      <button class="close-world" id="cerrar-mundo" type="button">
        ← Volver a los mundos
      </button>

      <div class="romance-ending">
        <span class="ending-symbol">${result.symbol}</span>
        <span class="eyebrow">BOYS OVER FLOWERS · DESENLACE</span>
        <h2>${result.title}</h2>
        <h3>${result.subtitle}</h3>
        <p>${result.text}</p>

        <div class="story-card">
          <span class="story-chapter">RESUMEN DE TUS DECISIONES</span>
          <p>
            Jun-pyo: ${junpyo} puntos.<br><br>
            Ji-hoo: ${jihoo} puntos.<br><br>
            Decisiones crueles: ${cruelCount} de ${romanceChoices.length}.
          </p>
        </div>

        <div class="romance-ending-actions">
          <button class="world-button" id="romance-restart" type="button">
            Volver a jugar ↻
          </button>
          <button class="quiet-button" id="romance-portal" type="button">
            Volver al portal
          </button>
        </div>
      </div>
    `;

    document.getElementById("cerrar-mundo").addEventListener("click", closeWorld);
    document.getElementById("romance-restart").addEventListener("click", startBoysOverFlowers);
    document.getElementById("romance-portal").addEventListener("click", createPortal);
  }
  

/* =====================================================
   HIDDEN LOVE — ROMPECABEZAS DE 100 PIEZAS
   Sin spoilers | Dos ayudas | Tablero compacto
===================================================== */

const HL_TOTAL = 100;
const HL_COLS = 10;
const HL_ROWS = 10;
const HL_MAX_HELP = 4;
const HL_HELP_AMOUNT = 10;
const HL_IMAGE_PATH = "../img/angie-duan-hidden-love.png";

let hlImage = null;
let hlPieces = [];
let hlPlaced = 0;
let hlHelpUsed = 0;
let hlSelected = null;
let hlOffsetX = 0;
let hlOffsetY = 0;
let hlBoardW = 720;
let hlBoardH = 450;
let hlPieceW = 60;
let hlPieceH = 45;
let hlTab = 8;
let hlReady = false;
let hlDpr = 1;
let hlResizeHandler = null;

function startHiddenLove() {
  hlReady = false;
  hlPieces = [];
  hlPlaced = 0;
  hlHelpUsed = 0;
  hlSelected = null;

  detail.className = "world-detail hidden-love-game";

  detail.innerHTML = `
    <button class="close-world" id="hl-back" type="button">
      ← Volver a los mundos
    </button>

    <section class="hl-game">
      <header class="hl-header">
        <span class="hl-eyebrow">UN RECUERDO POR DESCUBRIR</span>
        <h2>Hidden <span>Love</span> ♡</h2>
        <p>100 piezas para descubrir una sorpresa.</p>
      </header>

      <div class="hl-panel">
        <div class="hl-toolbar">
          <div class="hl-progress-area">
            <span class="hl-label">PROGRESO</span>
            <strong id="hl-counter">0 / 120</strong>
            <div class="hl-progress-track">
              <div id="hl-progress"></div>
            </div>
            <small id="hl-help-count">Ayudas disponibles: 2</small>
          </div>

          <div class="hl-actions">
            <button class="hl-btn hl-help" id="hl-help" type="button">
              ✨ Ayuda
            </button>
            <button class="hl-btn" id="hl-reset" type="button">
              Reiniciar
            </button>
          </div>
        </div>

        <div class="hl-tip">
          <strong>Empieza por los bordes</strong>
          <span>Las piezas del borde tienen un pequeño punto dorado.</span>
        </div>

        <div class="hl-board-frame">
          <canvas id="hl-board" aria-label="Rompecabezas de Hidden Love"></canvas>
        </div>

        <p class="hl-hint">
          Arrastra las piezas. No hay imagen de referencia:
          el recuerdo se descubrirá al completar el juego. ♡
        </p>

        <div class="hl-finish" id="hl-finish" hidden>
          <h3>¡Lo lograste! ♡</h3>
          <p>Has reconstruido el recuerdo pieza por pieza.</p>
          <img id="hl-reveal-image" alt="Imagen completa de Hidden Love">
          <button class="hl-btn" id="hl-again" type="button">
            Volver a jugar
          </button>
        </div>
      </div>
    </section>
  `;

  detail.hidden = false;

  document.getElementById("hl-back").addEventListener("click", closeWorld);

  document.getElementById("hl-reset").addEventListener("click", () => {
    if (confirm("¿Reiniciar y recuperar las dos ayudas?")) hlResetGame();
  });

  document.getElementById("hl-again").addEventListener("click", hlResetGame);
  document.getElementById("hl-help").addEventListener("click", hlUseHelp);

  hlImage = new Image();

  hlImage.onload = hlInitialize;

  hlImage.onerror = () => {
    alert("No se encontró img/angie-duan-hidden-love.png. Revisa la ruta.");
  };

  hlImage.src = HL_IMAGE_PATH;

  detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hlInitialize() {
  const canvas = document.getElementById("hl-board");
  if (!canvas || !hlImage) return;

  hlBoardW = Math.min(720, Math.max(300, canvas.parentElement.clientWidth - 16));
  hlBoardH = hlBoardW * hlImage.naturalHeight / hlImage.naturalWidth;

  hlPieceW = hlBoardW / HL_COLS;
  hlPieceH = hlBoardH / HL_ROWS;
  hlTab = Math.min(hlPieceW, hlPieceH) * 0.20;
  hlDpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(hlBoardW * hlDpr);
  canvas.height = Math.round(hlBoardH * hlDpr);
  canvas.style.width = hlBoardW + "px";
  canvas.style.height = hlBoardH + "px";
  canvas.getContext("2d").setTransform(hlDpr, 0, 0, hlDpr, 0, 0);

  canvas.onpointerdown = hlPointerDown;
  canvas.onpointermove = hlPointerMove;
  canvas.onpointerup = hlPointerUp;
  canvas.onpointercancel = hlPointerUp;

  if (hlResizeHandler) window.removeEventListener("resize", hlResizeHandler);

  hlResizeHandler = () => {
    if (!detail.hidden && currentKey === "hidden-love") hlInitialize();
  };

  window.addEventListener("resize", hlResizeHandler);

  hlReady = true;
  hlResetGame();
}

function hlCreatePieces() {
  hlPieces = [];

  for (let row = 0; row < HL_ROWS; row++) {
    for (let col = 0; col < HL_COLS; col++) {
      const p = {
        row, col,
        homeX: col * hlPieceW,
        homeY: row * hlPieceH,
        x: 0, y: 0,
        top: 0, right: 0, bottom: 0, left: 0,
        placed: false
      };

      p.top = row === 0 ? 0 : -hlPieces[(row - 1) * HL_COLS + col].bottom;
      p.left = col === 0 ? 0 : -hlPieces[row * HL_COLS + col - 1].right;
      p.right = col === HL_COLS - 1 ? 0 : (Math.random() < .5 ? 1 : -1);
      p.bottom = row === HL_ROWS - 1 ? 0 : (Math.random() < .5 ? 1 : -1);

      hlPieces.push(p);
    }
  }

  /* Mezcla de posiciones, sin imagen fantasma */
  const positions = [];

  for (let row = 0; row < HL_ROWS; row++) {
    for (let col = 0; col < HL_COLS; col++) {
      positions.push({ x: col * hlPieceW, y: row * hlPieceH });
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  hlPieces.forEach((p, i) => {
    p.x = positions[i].x;
    p.y = positions[i].y;
  });
}

function hlPiecePath(p) {
  const x = p.x, y = p.y, w = hlPieceW, h = hlPieceH, r = hlTab;
  const path = new Path2D();

  path.moveTo(x, y);

  if (!p.top) path.lineTo(x + w, y);
  else {
    const d = p.top;
    path.lineTo(x + w * .32, y);
    path.bezierCurveTo(x + w * .39, y, x + w * .34, y - r * d, x + w * .5, y - r * d);
    path.bezierCurveTo(x + w * .66, y - r * d, x + w * .61, y, x + w * .68, y);
    path.lineTo(x + w, y);
  }

  if (!p.right) path.lineTo(x + w, y + h);
  else {
    const d = p.right;
    path.lineTo(x + w, y + h * .32);
    path.bezierCurveTo(x + w, y + h * .39, x + w + r * d, y + h * .34, x + w + r * d, y + h * .5);
    path.bezierCurveTo(x + w + r * d, y + h * .66, x + w, y + h * .61, x + w, y + h * .68);
    path.lineTo(x + w, y + h);
  }

  if (!p.bottom) path.lineTo(x, y + h);
  else {
    const d = p.bottom;
    path.lineTo(x + w * .68, y + h);
    path.bezierCurveTo(x + w * .61, y + h, x + w * .66, y + h + r * d, x + w * .5, y + h + r * d);
    path.bezierCurveTo(x + w * .34, y + h + r * d, x + w * .39, y + h, x + w * .32, y + h);
    path.lineTo(x, y + h);
  }

  if (!p.left) path.lineTo(x, y);
  else {
    const d = p.left;
    path.lineTo(x, y + h * .68);
    path.bezierCurveTo(x, y + h * .61, x - r * d, y + h * .66, x - r * d, y + h * .5);
    path.bezierCurveTo(x - r * d, y + h * .34, x, y + h * .39, x, y + h * .32);
    path.lineTo(x, y);
  }

  path.closePath();
  return path;
}

function hlDrawPiece(ctx, p) {
  const path = hlPiecePath(p);

  ctx.save();
  ctx.clip(path);

  ctx.drawImage(
    hlImage,
    p.col * hlImage.naturalWidth / HL_COLS,
    p.row * hlImage.naturalHeight / HL_ROWS,
    hlImage.naturalWidth / HL_COLS,
    hlImage.naturalHeight / HL_ROWS,
    p.x, p.y, hlPieceW, hlPieceH
  );

  ctx.restore();

  ctx.save();
  ctx.strokeStyle = p.placed ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.95)";
  ctx.lineWidth = p.placed ? .5 : 1;
  ctx.stroke(path);

  if (!p.placed && (
    p.row === 0 || p.row === HL_ROWS - 1 ||
    p.col === 0 || p.col === HL_COLS - 1
  )) {
    ctx.fillStyle = "#f5d58a";
    ctx.beginPath();
    ctx.arc(p.x + hlPieceW / 2, p.y + hlPieceH / 2, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function hlDrawBoard() {
  const canvas = document.getElementById("hl-board");
  if (!canvas || !hlImage) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, hlBoardW, hlBoardH);
  ctx.fillStyle = "#171329";
  ctx.fillRect(0, 0, hlBoardW, hlBoardH);

  hlPieces.filter(p => p !== hlSelected).forEach(p => hlDrawPiece(ctx, p));
  if (hlSelected) hlDrawPiece(ctx, hlSelected);
}

function hlResetGame() {
  if (!hlImage || !hlReady) return;

  hlSelected = null;
  hlHelpUsed = 0;
  hlPlaced = 0;
  hlCreatePieces();

  document.getElementById("hl-finish").hidden = true;
  document.getElementById("hl-reveal-image").removeAttribute("src");

  hlUpdateProgress();
  hlUpdateHelp();
  hlDrawBoard();
}

function hlUpdateProgress() {
  const counter = document.getElementById("hl-counter");
  const bar = document.getElementById("hl-progress");
  const finish = document.getElementById("hl-finish");
  if (!counter || !bar || !finish) return;

  counter.textContent = `${hlPlaced} / ${HL_TOTAL}`;
  bar.style.width = `${hlPlaced / HL_TOTAL * 100}%`;

  if (hlPlaced === HL_TOTAL) {
    document.getElementById("hl-reveal-image").src = hlImage.src;
    finish.hidden = false;
  }
}

function hlUpdateHelp() {
  const count = document.getElementById("hl-help-count");
  const button = document.getElementById("hl-help");
  if (!count || !button) return;

  const remaining = HL_MAX_HELP - hlHelpUsed;
  count.textContent = `Ayudas disponibles: ${remaining} de ${HL_MAX_HELP}`;
  button.disabled = remaining === 0;
  button.textContent = remaining ? "✨ Ayuda: 10 piezas" : "Ayudas agotadas";
}

function hlUseHelp() {
  if (!hlReady || hlHelpUsed >= HL_MAX_HELP) return;

  hlPieces.filter(p => !p.placed).slice(0, HL_HELP_AMOUNT).forEach(p => {
    p.x = p.homeX;
    p.y = p.homeY;
    p.placed = true;
    hlPlaced++;
  });

  hlHelpUsed++;
  hlUpdateProgress();
  hlUpdateHelp();
  hlDrawBoard();
}

function hlPointerDown(event) {
  if (!hlReady) return;

  const canvas = document.getElementById("hl-board");
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * hlBoardW / rect.width;
  const y = (event.clientY - rect.top) * hlBoardH / rect.height;
  const ctx = canvas.getContext("2d");

  hlSelected = null;

  for (let i = hlPieces.length - 1; i >= 0; i--) {
    const p = hlPieces[i];
    if (!p.placed && ctx.isPointInPath(hlPiecePath(p), x, y)) {
      hlSelected = p;
      break;
    }
  }

  if (!hlSelected) return;

  hlOffsetX = x - hlSelected.x;
  hlOffsetY = y - hlSelected.y;
  canvas.setPointerCapture(event.pointerId);
  hlDrawBoard();
}

function hlPointerMove(event) {
  if (!hlSelected) return;

  const canvas = document.getElementById("hl-board");
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * hlBoardW / rect.width;
  const y = (event.clientY - rect.top) * hlBoardH / rect.height;

  hlSelected.x = Math.max(-hlTab, Math.min(hlBoardW - hlPieceW + hlTab, x - hlOffsetX));
  hlSelected.y = Math.max(-hlTab, Math.min(hlBoardH - hlPieceH + hlTab, y - hlOffsetY));

  hlDrawBoard();
}

function hlPointerUp() {
  if (!hlSelected) return;

  const p = hlSelected;

  if (
    Math.abs(p.x - p.homeX) <= hlPieceW * .8 &&
    Math.abs(p.y - p.homeY) <= hlPieceH * .8
  ) {
    p.x = p.homeX;
    p.y = p.homeY;
    p.placed = true;
    hlPlaced++;
    hlUpdateProgress();
  }

  hlSelected = null;
  hlDrawBoard();
}

/* CONEXIÓN DE LOS MUNDOS — CONSERVAR */

document.querySelectorAll("[data-world]").forEach(button => {
  button.addEventListener("click", () => {
    openWorld(button.dataset.world);
  });
});

detail.hidden = true;
});
