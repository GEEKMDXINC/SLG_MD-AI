const fs = require("fs").promises;
const axios = require("axios");
const path = require("path");
const { SESSION_ID } = require("../config");
const PastebinAPI = require("pastebin-js");

const sessionPath = path.resolve(__dirname, "../session");
const pastebin = new PastebinAPI("bR1GcMw175fegaIFV2PfignYVtF0b_Bl");

async function ensureSessionDirectory() {
  try {
    await fs.mkdir(sessionPath, { recursive: true });
  } catch (error) {
    console.error("Error creating session directory:", error);
  }
}
async function writeSession(sessionId = SESSION_ID) {
  await ensureSessionDirectory();

  const cleanedSessionId = ("" + sessionId).replace(/SLG~/gi, "").trim();

  if (cleanedSessionId.length > 20) {
    const decodedSession = decodeBase64(cleanedSessionId);
    if (!decodedSession) return;

    try {
      const parsedSession = JSON.parse(decodedSession);

      if (parsedSession["creds.json"]) {
        for (const [fileName, fileData] of Object.entries(parsedSession)) {
          const fileContent =
            typeof fileData === "string"
              ? fileData
              : JSON.stringify(fileData, null, 2);
          await writeFile(path.join(sessionPath, fileName), fileContent);
        }
      } else {
        await writeFile(
          path.join(sessionPath, "creds.json"),
          JSON.stringify(parsedSession, null, 2),
        );
      }
    } catch (error) {
      console.error("Error processing session data:", error);
    }
  } else {
    try {
      const response = await axios.get('https://pastebin.com/raw/' + cleanedSessionId);
        const data = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        const filePath = path.join(__dirname, 'auth', 'creds.json');
        await fs.writeFileSync(filePath, data, 'utf8');
    } catch (error) {
      console.error("Error fetching or writing Pastebin data:", error);
    }
  }
}

module.exports = { writeSession };























/* const fs = require("fs").promises;
const path = require("path");
const { SESSION_ID } = require("../config");
const PastebinAPI = require("pastebin-js");

const sessionPath = path.resolve(__dirname, "../session");
const pastebin = new PastebinAPI("bR1GcMw175fegaIFV2PfignYVtF0b_Bl");

async function ensureSessionDirectory() {
  try {
    await fs.mkdir(sessionPath, { recursive: true });
  } catch (error) {
    console.error("Error creating session directory:", error);
  }
}

function decodeBase64(encodedString) {
  try {
    return Buffer.from(encodedString, "base64").toString("utf-8");
  } catch (error) {
    console.error("Error decoding base64:", error);
    return null;
  }
}

async function writeFile(filePath, data) {
  try {
    await fs.writeFile(filePath, data);
    console.log("Saved file:", filePath);
  } catch (error) {
    console.error(`Error writing file: ${filePath}`, error);
  }
}

async function writeSession(sessionId = SESSION_ID) {
  await ensureSessionDirectory();

  const cleanedSessionId = ("" + sessionId).replace(/SLG~/gi, "").trim();

  if (cleanedSessionId.length > 20) {
    const decodedSession = decodeBase64(cleanedSessionId);
    if (!decodedSession) return;

    try {
      const parsedSession = JSON.parse(decodedSession);

      if (parsedSession["creds.json"]) {
        for (const [fileName, fileData] of Object.entries(parsedSession)) {
          const fileContent =
            typeof fileData === "string"
              ? fileData
              : JSON.stringify(fileData, null, 2);
          await writeFile(path.join(sessionPath, fileName), fileContent);
        }
      } else {
        await writeFile(
          path.join(sessionPath, "creds.json"),
          JSON.stringify(parsedSession, null, 2),
        );
      }
    } catch (error) {
      console.error("Error processing session data:", error);
    }
  } else {
    try {
      const decodedData = await pastebin.getPaste(cleanedSessionId);
      await writeFile(
        path.join(sessionPath, "creds.json"),
        decodedData.toString(),
      );
    } catch (error) {
      console.error("Error fetching or writing Pastebin data:", error);
    }
  }
}

module.exports = { writeSession }; */















/* const fs = require("fs").promises;
const path = require("path");
const { SESSION_ID } = require("../config");
const PastebinAPI = require("pastebin-js");

const sessionPath = path.resolve(__dirname, "../session");
const credsPath = path.join(__dirname, "../SLG-SESSION/creds.json");
const pastebin = new PastebinAPI("bR1GcMw175fegaIFV2PfignYVtF0b_Bl");

async function ensureSessionDirectory() {
  try {
    await fs.mkdir(sessionPath, { recursive: true });
  } catch (error) {
    console.error("Error creating session directory:", error);
  }
}

async function writeFile(filePath, data) {
  try {
    await fs.writeFile(filePath, data);
    console.log("Saved file:", filePath);
  } catch (error) {
    console.error(`Error writing file: ${filePath}`, error);
  }
}

async function writeSession(sessionId = SESSION_ID) {
  await ensureSessionDirectory();

  // Vérifiez si un sessionId est présent
  if (!sessionId) {
    console.log("No SESSION_ID found, loading credentials from creds.json...");

    try {
      const credsData = await fs.readFile(credsPath, "utf-8");
      await writeFile(path.join(sessionPath, "creds.json"), credsData); // Sauvegarde des données dans le dossier de session
      return JSON.parse(credsData); // Retourne les données sous forme d'objet
    } catch (error) {
      console.error("Error reading creds.json:", error);
      return null;
    }
  }

  // Si un sessionId est présent, continuez avec la logique d'origine
  const cleanedSessionId = ("" + sessionId).replace(/SLG~/gi, "").trim();

  if (cleanedSessionId.length > 20) {
    const decodedSession = Buffer.from(cleanedSessionId, "base64").toString("utf-8");
    if (!decodedSession) return;

    try {
      const parsedSession = JSON.parse(decodedSession);
      await writeFile(path.join(sessionPath, "creds.json"), JSON.stringify(parsedSession, null, 2));
    } catch (error) {
      console.error("Error processing session data:", error);
    }
  } else {
    try {
      const decodedData = await pastebin.getPaste(cleanedSessionId);
      await writeFile(path.join(sessionPath, "creds.json"), decodedData.toString());
    } catch (error) {
      console.error("Error fetching or writing Pastebin data:", error);
    }
  }
}

module.exports = { writeSession };
 */ 









/* const { File } = require('megajs');
const fs = require('fs');
const path = require('path');

const prefix = "SLG&"; // Your prefix same as in config.PREFIX
const output = path.join(__dirname, './session/'); // Path where creds.json will save

async function ensureSessionDirectory() {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }
}

async function saveCreds(id) {
  if (!id.startsWith(prefix)) {
    throw new Error(`Prefix doesn't match, check if "${prefix}" is correct`);
  }

  const megaUrl = `https://mega.nz/file/${id.replace(prefix, "")}`;
  const file = File.fromURL(megaUrl);
  await file.loadAttributes();

  const credsPath = path.join(output, "creds.json");

  const data = await file.downloadBuffer();
  fs.writeFileSync(credsPath, data);
  console.log('Credentials saved to :', credsPath);
}

module.exports = {
  saveCreds,
  ensureSessionDirectory,
}; */
