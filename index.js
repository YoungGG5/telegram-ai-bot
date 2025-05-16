const TelegramBot = require('node-telegram-bot-api');
const { OpenAI } = require('openai');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: msg.text }],
    });

    bot.sendMessage(chatId, completion.choices[0].message.content);
  } catch (error) {
    bot.sendMessage(chatId, `❌ Error: ${error.message}`);
  }
});

console.log('Bot started!');
