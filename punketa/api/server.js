require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const API_KEY =
process.env.STEAM_API_KEY;

const STEAM_ID =
process.env.STEAM_ID;

app.get("/api/steam", async (req, res) => {

    try {

        // PLAYER

        const playerResponse =
        await fetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${STEAM_ID}`
        );

        const playerJson =
        await playerResponse.json();

        const player =
        playerJson.response.players[0];

        // LEVEL

        const levelResponse =
        await fetch(
            `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${API_KEY}&steamid=${STEAM_ID}`
        );

        const levelJson =
        await levelResponse.json();

        // GAMES

        const gamesResponse =
        await fetch(
            `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${API_KEY}&steamid=${STEAM_ID}`
        );

        const gamesJson =
        await gamesResponse.json();

        const totalGames =
        gamesJson.response.game_count || 0;

        // GAME BANNER

        const appid =
        player.gameid || "730";

        const banner =
        `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_616x353.jpg`;

        // RESPONSE

        res.json({

            username:
            player.personaname,

            realname:
            player.realname || "",

            avatar:
            player.avatarfull,

            game:
            player.gameextrainfo || "Offline",

            steamid:
            player.steamid,

            gameid:
            player.gameid || null,

            personastate:
            player.personastate,

            level:
            levelJson.response.player_level,

            totalGames,

            country:
            player.loccountrycode || "Unknown",

            lastlogoff:
            player.lastlogoff,

            banner

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "failed"
        });

    }

});

app.listen(3000, () => {

    console.log("running");

});