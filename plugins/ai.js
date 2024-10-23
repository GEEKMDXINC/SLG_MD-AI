const { command, mode, askAi } = require("../lib");
const aiResponse = require("../lib/scraper");

command(
  {
    pattern: "codeai",
    fromMe: mode,
    desc: "Code With Copliot Mirror",
    type: "ai",
  },
  async (message, match) => {
    if (!match)
      return await message.sendReply("_Hello What Code Do You Help For?_");
    await message.reply("_Analyzing Request_");
    const processedMsg = await aiResponse.coderAi(match);
    return await message.send(processedMsg, {
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363327841612745@newsletter",
          newsletterName: "ᴄᴏᴅᴇᴀɪ",
        },
      },
    });
  },
);

command(
  {
    pattern: "gpt4",
    fromMe: mode,
    desc: "Chat With Gpt4 AI Model",
    type: "ai",
  },
  async (message, match) => {
    if (!match)
      return await message.sendReply("_Hello How Can I Assist You Today?_");
    await message.reply("_Hold On!_");
    const processedMsg = await aiResponse.gpt4(match);
    return await message.send(processedMsg, {
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363327841612745@newsletter",
          newsletterName: "ᴄʜᴀᴛ ɢᴘᴛ𝟺",
        },
      },
    });
  },
);

command(
  {
    pattern: "lamda",
    fromMe: mode,
    desc: "Chat With Lamda AI Model",
    type: "ai",
  },
  async (message, match) => {
    if (!match) return await message.sendReply("_Hmm Commo'n type something_");
    await message.reply("_Thinking_");
    const processedMsg = await aiResponse.lamda(match);
    return await message.send(processedMsg, {
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363327841612745@newsletter",
          newsletterName: "ʟᴀᴍᴅᴀ ᴀɪ",
        },
      },
    });
  },
);

command(
  {
    pattern: "sdimg",
    fromMe: mode,
    desc: "Stable Diffusion Image",
    type: "ai",
  },
  async (message, match) => {
    if (!match)
      return await message.sendReply("_Provide Me Image to Generate_");
    await message.reply("_Generating Image_");
    const processedImg = await aiResponse.stableDiff(match);
    const ImgMessage = `*_Generated BY FXOP_BOT_*`;
    return await message.send(processedImg, {
      caption: ImgMessage,
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363327841612745@newsletter",
          newsletterName: "sᴛᴀʙʟᴇ ᴅɪғғᴜsɪᴏɴ",
        },
      },
    });
  },
);

command(
  {
    pattern: "hd",
    fromMe: mode,
    desc: "Enhance Image",
    type: "ai",
  },
  async (message, match, m) => {
    if (!message.reply_message && !message.reply_image) {
      return await message.sendReply("*_Reply to an Image Only!_*");
    }
    await message.sendReply("_Enhancing Image Wait_");
    const imgBuffer = await m.quoted.download();
    const upscaledBuffer = await askAi("upscale", imgBuffer);

    const upscaleMsg = `*_UPSCALED BY FXOP_*`;
    return await message.send(upscaledBuffer, {
      caption: upscaleMsg,
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363327841612745@newsletter",
          newsletterName: "ɪᴍᴀɢᴇ ᴇɴʜᴀɴᴄᴇʀ",
        },
      },
    });
  },
);

command(
  {
    pattern: "dalle",
    fromMe: mode,
    desc: "Generate Images With Dalle",
    type: "ai",
  },
  async (msg, match) => {
    if (!match) return await msg.send("_Provide me query!_");
    await msg.sendReply("_Generating Images!_");
    const dalleImg = await aiResponse.dalle(match);
    const dalleMsg = `*_Generated By FXOP_*`;
    return msg.send(dalleImg, {
      caption: dalleMsg,
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363327841612745@newsletter",
          newsletterName: "ᴅᴀʟʟᴇ ɪᴍᴀɢᴇ",
        },
      },
    });
  },
);

command(
  {
    pattern: "bing",
    fromMe: mode,
    desc: "Chat with MS Bing Copliot",
    type: "ai",
  },
  async (message, match) => {
    if (!match) return message.sendReply("_Hey You Gave Me An Empty Prompt_");
    await message.sendReply("_Processing Request_");
    const bingResponse = await aiResponse.bing(match);
    return message.send(bingResponse, {
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363327841612745@newsletter",
          newsletterName: "ʙɪɴɢ ᴀɪ",
        },
      },
    });
  },
);

command(
  {
    pattern: "elabs",
    fromMe: mode,
    desc: "Generate Audio with Ai",
    type: "ai",
  },
  async (message, match) => {
    if (!match) return message.sendReply("_provide text_");
    await message.sendReply("_Wait_");
    const audio = await aiResponse.elevenlabs(match);
    return message.sendFile(audio);
  },
);
