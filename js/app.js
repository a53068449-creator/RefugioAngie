
"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // NAVEGACIÓN
    // ==========================================

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const currentId = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${currentId}`
                    );
                });
            });
        }, {
            rootMargin: "-20% 0px -65% 0px"
        });

        sections.forEach(section => observer.observe(section));
    }

    // ==========================================
    // ELEMENTOS DEL ESCRITORIO
    // ==========================================

    const feelings = document.getElementById("feelings");
    const downloadButton = document.getElementById("download-writing");
    const clearButton = document.getElementById("clear-writing");
    const shatterButton = document.getElementById("shatter-writing");
    const saveStatus = document.getElementById("save-status");

    // ==========================================
    // DESCARGAR ESCRITO
    // ==========================================

    if (feelings && downloadButton && saveStatus) {
        downloadButton.addEventListener("click", () => {
            const content = feelings.value;

            if (!content.trim()) {
                saveStatus.textContent =
                    "Escribe algo primero, si te apetece.";
                feelings.focus();
                return;
            }

            const file = new Blob(
                ["Mi espacio de escritura\n\n", content],
                { type: "text/plain;charset=utf-8" }
            );

            const url = URL.createObjectURL(file);
            const link = document.createElement("a");

            link.href = url;
            link.download = "mi-escrito.txt";

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);

            saveStatus.textContent =
                "Tu archivo está listo para conservarlo.";
        });
    }

    // ==========================================
    // BORRAR ESCRITO NORMAL
    // ==========================================

    if (feelings && clearButton && saveStatus) {
        clearButton.addEventListener("click", () => {
            if (!feelings.value) {
                saveStatus.textContent = "El campo ya está vacío.";
                return;
            }

            const confirmed = window.confirm(
                "¿Quieres borrar lo que has escrito en este campo?"
            );

            if (!confirmed) return;

            feelings.value = "";
            saveStatus.textContent =
                "El campo está vacío. Puedes empezar de nuevo.";

            feelings.focus();
        });
    }

    // ==========================================
    // ROMPER LO ESCRITO
    // No depende de la animación CSS anterior.
    // ==========================================

    if (feelings && shatterButton && saveStatus) {
        let breakingText = false;

        shatterButton.addEventListener("click", async () => {
            if (breakingText) return;

            if (!feelings.value.trim()) {
                saveStatus.textContent =
                    "No hay nada escrito que tengas que soltar.";

                feelings.focus();
                return;
            }

            const confirmed = window.confirm(
                "Este gesto borrará el texto de este campo. " +
                "Si quieres conservarlo, descárgalo antes. " +
                "¿Quieres continuar?"
            );

            if (!confirmed) return;

            breakingText = true;
            shatterButton.disabled = true;

            if (clearButton) clearButton.disabled = true;
            if (downloadButton) downloadButton.disabled = true;

            saveStatus.textContent = "Soltando lo escrito...";

            // Elimina posibles efectos anteriores.
            feelings.classList.remove("symbolic-break");
            feelings.style.opacity = "1";
            feelings.style.transform = "none";

            try {
                // Animación directa sobre el cuadro de escritura.
                // No necesita reglas @keyframes en el CSS.
                const animation = feelings.animate([
                    {
                        transform: "translateX(0) rotate(0deg)",
                        opacity: 1,
                        offset: 0
                    },
                    {
                        transform: "translateX(-9px) rotate(-1deg)",
                        opacity: 1,
                        offset: 0.12
                    },
                    {
                        transform: "translateX(9px) rotate(1deg)",
                        opacity: 1,
                        offset: 0.24
                    },
                    {
                        transform: "translateX(-7px) rotate(-1deg)",
                        opacity: 0.9,
                        offset: 0.36
                    },
                    {
                        transform: "translateX(7px) rotate(1deg)",
                        opacity: 0.75,
                        offset: 0.48
                    },
                    {
                        transform: "scale(0.97)",
                        opacity: 0.45,
                        offset: 0.75
                    },
                    {
                        transform: "scale(0.93)",
                        opacity: 0,
                        offset: 1
                    }
                ], {
                    duration: 700,
                    easing: "ease-in-out",
                    fill: "forwards"
                });

                await animation.finished;

                // Borrar únicamente cuando termine la animación.
                feelings.value = "";

                // Restablecer el cuadro para volver a utilizarlo.
                animation.cancel();

                feelings.style.opacity = "";
                feelings.style.transform = "";
                feelings.classList.remove("symbolic-break");

                saveStatus.textContent =
                    "Ya está. Puedes empezar de nuevo cuando quieras.";

                feelings.focus();

            } catch (error) {
                // Si la animación falla, el botón sigue permitiendo
                // completar el borrado sin bloquear la página.
                feelings.value = "";
                feelings.classList.remove("symbolic-break");
                feelings.style.opacity = "";
                feelings.style.transform = "";

                saveStatus.textContent =
                    "El texto se ha borrado. Puedes empezar de nuevo.";

            } finally {
                breakingText = false;
                shatterButton.disabled = false;

                if (clearButton) clearButton.disabled = false;
                if (downloadButton) downloadButton.disabled = false;
            }
        });
    }

    // ==========================================
    // ESPACIO DE DESAHOGO
    // ==========================================

    const releaseButton = document.getElementById("release-button");
    const releaseActivity = document.getElementById("release-activity");
    const closeRelease = document.getElementById("close-release");

    if (releaseButton && releaseActivity && closeRelease) {
        releaseButton.addEventListener("click", () => {
            releaseActivity.classList.remove("hidden");

            releaseActivity.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            closeRelease.focus({ preventScroll: true });
        });

        closeRelease.addEventListener("click", () => {
            releaseActivity.classList.add("hidden");
            releaseButton.focus();
        });
    }

    // ==========================================
    // PAUSA DE RESPIRACIÓN
    // ==========================================

    const breathingOrb = document.getElementById("breathing-orb");
    const breathingText = document.getElementById("breathing-text");
    const breathingInstruction =
        document.getElementById("breathing-instruction");

    const startBreathing = document.getElementById("start-breathing");
    const stopBreathing = document.getElementById("stop-breathing");

    let breathingTimer = null;
    let breathingPhase = 0;

    const phases = [
        {
            text: "Inhala suavemente",
            instruction: "Deja que el aire entre con naturalidad.",
            className: "inhale",
            duration: 4000
        },
        {
            text: "Exhala suavemente",
            instruction: "Suelta el aire sin forzarte.",
            className: "exhale",
            duration: 4000
        }
    ];

    function showBreathingPhase() {
        if (!breathingOrb || !breathingText || !breathingInstruction) {
            return;
        }

        const phase = phases[breathingPhase];

        breathingText.textContent = phase.text;
        breathingInstruction.textContent = phase.instruction;

        breathingOrb.classList.remove("inhale", "exhale");
        breathingOrb.classList.add(phase.className);

        breathingTimer = window.setTimeout(() => {
            breathingPhase = (breathingPhase + 1) % phases.length;
            showBreathingPhase();
        }, phase.duration);
    }

    if (startBreathing) {
        startBreathing.addEventListener("click", () => {
            if (breathingTimer !== null) return;

            breathingPhase = 0;
            showBreathingPhase();

            startBreathing.textContent = "Pausa en curso";
        });
    }

    if (stopBreathing) {
        stopBreathing.addEventListener("click", () => {
            if (breathingTimer !== null) {
                window.clearTimeout(breathingTimer);
            }

            breathingTimer = null;

            if (breathingOrb) {
                breathingOrb.classList.remove("inhale", "exhale");
            }

            if (breathingText) {
                breathingText.textContent = "Pausa";
            }

            if (breathingInstruction) {
                breathingInstruction.textContent =
                    "Puedes descansar, moverte o volver a tu ritmo habitual.";
            }

            if (startBreathing) {
                startBreathing.textContent = "Empezar pausa";
            }
        });
    }

    // ==========================================
    // ACTIVIDADES PARA DISTRAERSE
    // ==========================================

    const exploreTiles = document.querySelectorAll(".explore-tile");
    const activityResult = document.getElementById("activity-result");

    exploreTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            if (!activityResult) return;

            activityResult.textContent = tile.dataset.activity || "";
            activityResult.classList.remove("hidden");

            activityResult.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        });
    });

    // ==========================================
    // ESPACIO PERSONAL: ELEGIR QUÉ NECESITA
    // ==========================================

    const moodButtons = document.querySelectorAll(".mood-button");
    const moodResult = document.getElementById("mood-result");

    const moodMessages = {
        "Necesito soltarlo":
            "Puedes ir a Desahógate. No hace falta que ordenes tus pensamientos.",

        "Quiero distraerme":
            "Ve a Explora y elige algo pequeño. También puedes dejarlo a medias.",

        "Quiero descansar":
            "Puedes hacer una pausa sin convertirla en otra obligación.",

        "No sé qué necesito":
            "No tienes que averiguarlo ahora. Puedes quedarte aquí un momento."
    };

    moodButtons.forEach(button => {
        button.addEventListener("click", () => {
            moodButtons.forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            const choice = button.dataset.mood;

            if (moodResult) {
                moodResult.textContent =
                    moodMessages[choice] ||
                    "Puedes quedarte aquí sin decidir nada todavía.";
            }
        });
    });

});
