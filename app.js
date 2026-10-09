// ============================================
// TOUCHGRASS AI
// ============================================

const state = {

    time: "15",

    environment: "park",

    mood: "explore",

    mission: null,

    timer: null,

    seconds: 0

};


// ============================================
// LOCAL STORAGE
// ============================================

function getData(key, fallback) {

    try {

        return JSON.parse(
            localStorage.getItem(key)
        ) ?? fallback;

    } catch {

        return fallback;

    }

}


function saveData(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}


// ============================================
// NAVIGATION
// ============================================

function scrollToCreate() {

    document
        .getElementById("create")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ============================================
// CHOICE BUTTONS
// ============================================

document.querySelectorAll(".choice")
    .forEach(button => {

        button.addEventListener("click", () => {

            const group =
                button.dataset.group;

            document
                .querySelectorAll(
                    `.choice[data-group="${group}"]`
                )
                .forEach(item => {

                    item.classList.remove("active");

                });


            button.classList.add("active");


            state[group] =
                button.dataset.value;

        });

    });


// ============================================
// AI REQUEST
// ============================================

async function askAI(prompt) {

    const response = await fetch(
        "/api/ai",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                prompt: prompt
            })
        }
    );


    if (!response.ok) {

        throw new Error(
            "AI request failed"
        );

    }


    return await response.json();

}


// ============================================
// GENERATE MISSION
// ============================================

document
    .getElementById("generateBtn")
    .addEventListener("click", async () => {


        const button =
            document.getElementById("generateBtn");


        const extra =
            document.getElementById("extraInput")
                .value;


        button.disabled = true;

        button.innerText =
            "🤖 AI is planning your adventure...";


        const prompt = `

You are TouchGrass AI.

Your job is to create a safe, realistic
outdoor activity that makes a person
spend LESS time on their phone.

Create a ${state.time}-minute outdoor mission.

Environment:
${state.environment}

Mood:
${state.mood}

Additional request:
${extra || "None"}

Rules:

- Make it practical.
- Keep it safe.
- Do not suggest dangerous activities.
- Do not require expensive equipment.
- The user should spend most of the time outside.
- Use simple instructions.
- Give exactly 4 tasks.
- Return JSON only.

JSON format:

{
  "title": "short mission title",
  "intro": "short description",
  "tasks": [
    "task 1",
    "task 2",
    "task 3",
    "task 4"
  ]
}

`;


        try {

            const result =
                await askAI(prompt);


            let mission =
                result.text;


            // Remove markdown JSON fences
            mission =
                mission
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();


            const parsed =
                JSON.parse(mission);


            state.mission = parsed;


            showMission(parsed);


        } catch (error) {

            console.error(error);

            // Fallback
            const fallback =
                createFallbackMission();


            state.mission =
                fallback;


            showMission(fallback);


            alert(
                "AI couldn't respond right now, so TouchGrass used its built-in backup mission generator."
            );

        }


        button.disabled = false;

        button.innerText =
            "✨ Generate My Adventure";

    });


// ============================================
// SHOW MISSION
// ============================================

function showMission(mission) {

    document
        .getElementById("resultSection")
        .classList.remove("hidden");


    document
        .getElementById("missionTitle")
        .innerText =
        mission.title;


    document
        .getElementById("missionIntro")
        .innerText =
        mission.intro;


    document
        .getElementById("missionDuration")
        .innerText =
        state.time;


    const list =
        document.getElementById("taskList");


    list.innerHTML = "";


    mission.tasks.forEach(
        (task, index) => {

            const item =
                document.createElement("div");

            item.className =
                "task";


            item.innerHTML =
                `${index + 1}. ${task}`;


            list.appendChild(item);

        }
    );


    document
        .getElementById("resultSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ============================================
// FALLBACK
// ============================================

function createFallbackMission() {

    return {

        title:
            "The Mini Nature Hunt",

        intro:
            "Explore your surroundings and notice things you normally walk past.",

        tasks: [

            "Walk slowly for five minutes and notice three different sounds.",

            "Find three different leaves, plants, or natural objects.",

            "Find something with an interesting colour or pattern.",

            "Spend two minutes simply observing your surroundings without your phone."

        ]

    };

}


// ============================================
// START MISSION
// ============================================

document
    .getElementById("startMissionBtn")
    .addEventListener("click", () => {


        document
            .getElementById("activeSection")
            .classList.remove("hidden");


        document
            .getElementById("currentMissionText")
            .innerText =
            state.mission.tasks.join(" • ");


        document
            .getElementById("activeSection")
            .scrollIntoView({
                behavior: "smooth"
            });


        startTimer();

    });


// ============================================
// TIMER
// ============================================

function startTimer() {

    clearInterval(state.timer);

    state.seconds = 0;


    state.timer =
        setInterval(() => {

            state.seconds++;


            const minutes =
                Math.floor(
                    state.seconds / 60
                );


            const seconds =
                state.seconds % 60;


            document
                .getElementById("timer")
                .innerText =
                `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

        }, 1000);

}


// ============================================
// FINISH MISSION
// ============================================

document
    .getElementById("finishBtn")
    .addEventListener("click", () => {


        clearInterval(state.timer);


        let xp =
            getData("touchgrass_xp", 0);


        let missions =
            getData(
                "touchgrass_missions",
                0
            );


        xp += 30;

        missions++;


        saveData(
            "touchgrass_xp",
            xp
        );


        saveData(
            "touchgrass_missions",
            missions
        );


        saveJournal();


        updateStats();


        alert(
            "🌿 Mission completed!\n\n+30 XP"
        );


        document
            .getElementById("journal")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


// ============================================
// JOURNAL
// ============================================

function saveJournal() {

    const journal =
        getData(
            "touchgrass_journal",
            []
        );


    journal.unshift({

        title:
            state.mission.title,

        date:
            new Date()
                .toLocaleDateString(),

        duration:
            state.time,

        xp: 30

    });


    saveData(
        "touchgrass_journal",
        journal
    );


    displayJournal();

}


function displayJournal() {

    const journal =
        getData(
            "touchgrass_journal",
            []
        );


    const container =
        document.getElementById(
            "journalList"
        );


    if (!journal.length) {

        container.innerHTML = `

            <div class="journal-entry">

                <div>

                    <h3>
                        🌱 No adventures yet
                    </h3>

                    <p>
                        Complete your first mission
                        to create your journal.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    journal.forEach(entry => {

        const div =
            document.createElement("div");


        div.className =
            "journal-entry";


        div.innerHTML = `

            <div>

                <h3>
                    🌿 ${entry.title}
                </h3>

                <p>
                    ${entry.date}
                    • ${entry.duration} minutes
                </p>

            </div>

            <div class="journal-xp">
                +${entry.xp} XP
            </div>

        `;


        container.appendChild(div);

    });

}


// ============================================
// STATS
// ============================================

function updateStats() {

    document
        .getElementById("xpValue")
        .innerText =
        getData(
            "touchgrass_xp",
            0
        );


    document
        .getElementById("missionValue")
        .innerText =
        getData(
            "touchgrass_missions",
            0
        );


    const missions =
        getData(
            "touchgrass_missions",
            0
        );


    document
        .getElementById("streakValue")
        .innerText =
        Math.min(missions, 7);

}


// ============================================
// IMAGE PREVIEW
// ============================================

const photoInput =
    document.getElementById(
        "photoInput"
    );


photoInput.addEventListener(
    "change",
    () => {

        const file =
            photoInput.files[0];


        if (!file) return;


        const reader =
            new FileReader();


        reader.onload =
            event => {

                document
                    .getElementById(
                        "imagePreview"
                    )
                    .innerHTML = `

                    <img
                        src="${event.target.result}"
                        alt="Nature discovery">

                `;

            };


        reader.readAsDataURL(file);

    }
);


// ============================================
// IMAGE AI
// ============================================

document
    .getElementById("analyzeBtn")
    .addEventListener("click", async () => {


        const file =
            photoInput.files[0];


        if (!file) {

            alert(
                "Please choose a photo first."
            );

            return;

        }


        const button =
            document.getElementById(
                "analyzeBtn"
            );


        const resultBox =
            document.getElementById(
                "analysisResult"
            );


        button.disabled = true;

        button.innerText =
            "🤖 AI is looking at it...";


        try {

            const base64 =
                await fileToBase64(file);


            const result =
                await fetch(
                    "/api/analyze-image",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            image: base64
                        })
                    }
                );


            if (!result.ok) {

                throw new Error(
                    "Image analysis failed"
                );

            }


            const data =
                await result.json();


            resultBox.innerHTML = `

                <div class="task">

                    <strong>
                        🔍 AI Discovery
                    </strong>

                    <br><br>

                    ${escapeHTML(data.text)}

                </div>

            `;

        } catch (error) {

            console.error(error);


            resultBox.innerHTML = `

                <div class="task">

                    The AI couldn't analyze
                    this image right now.

                </div>

            `;

        }


        button.disabled = false;

        button.innerText =
            "🔍 Analyze Discovery";

    });


// ============================================
// FILE → BASE64
// ============================================

function fileToBase64(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload =
                () => resolve(
                    reader.result
                );


            reader.onerror =
                reject;


            reader.readAsDataURL(file);

        }
    );

}


// ============================================
// ESCAPE HTML
// ============================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ============================================
// DARK MODE
// ============================================

document
    .getElementById("themeBtn")
    .addEventListener("click", () => {

        document.body
            .classList.toggle("dark");


        const dark =
            document.body
                .classList.contains("dark");


        document
            .getElementById("themeBtn")
            .innerText =
            dark ? "☀️" : "🌙";


        localStorage.setItem(
            "touchgrass_dark",
            dark
        );

    });


if (
    localStorage.getItem(
        "touchgrass_dark"
    ) === "true"
) {

    document.body
        .classList.add("dark");

    document
        .getElementById("themeBtn")
        .innerText = "☀️";

}


// ============================================
// INITIALIZE
// ============================================

updateStats();

displayJournal();