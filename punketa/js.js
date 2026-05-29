function AgeCounter() {
    var startYear = new Date("2004-07-11");
    var now = new Date();
    var years = now.getTime() - startYear.getTime();
    var msPerYear = 1000 * 60 * 60 * 24 * 365.25;
    var age = years / msPerYear;
    var ageElement = document.getElementById("years-counter");
    if (ageElement) {
        ageElement.textContent = "I am " + age.toFixed(9) + " years";
    }
}
setInterval(AgeCounter, 50);

async function loadSteamWidget() {

    const widget =
    document.getElementById("steam-widget");

    const res =
    await fetch("http://localhost:3000/api/steam");

    const data =
    await res.json();

    const states = {

        0: "Offline",
        1: "Online",
        2: "Busy",
        3: "Away",
        4: "Snooze",
        5: "Looking to trade",
        6: "Looking to play"

    };

    const lastLogoff =
    new Date(data.lastlogoff * 1000)
    .toLocaleString();

    widget.innerHTML = `

        <div class="steam-card">

            <img
                class="steam-avatar"
                src="${data.avatar}"
            >

            <div class="steam-user">

                <h2>${data.username}</h2>

                <div class="steam-realname">
                    ${data.realname}
                </div>

                <div class="steam-status">

                    ${data.game !== "Offline"
                        ? `Playing : ${data.game}`
                        : states[data.personastate]
                    }

                </div>

                <div class="steam-details">

                    <div>
                        <span>SteamID:</span>
                        ${data.steamid}
                    </div>

                    <div>
                        <span>GameID:</span>
                        ${data.gameid || "None"}
                    </div>

                    <div>
                        <span>Country:</span>
                        ${data.country}
                    </div>

                    <div>
                        <span>Last Logoff:</span>
                        ${lastLogoff}
                    </div>

                </div>

            </div>

            <div class="steam-right">

                <h3>
                    ${data.game !== "Offline"
                        ? "Playing:"
                        : "Favorite Game:"
                    }
                </h3>

                <img
                    class="steam-banner"
                    src="${data.banner}"
                >

            </div>

            <div class="steam-bottom">

                <div class="steam-level">

                    ${data.level}

                </div>

                <div class="steam-games">

                    ${data.totalGames} Games

                </div>

            </div>

        </div>

    `;
}

loadSteamWidget();