import { Telegraf } from 'telegraf';
import { Chat } from 'telegraf/typings/telegram-types';
import {chatList } from '../chatList'
import { existsSync, readFileSync, writeFileSync } from 'fs';
// tslint:disable: no-expression-statement
const token = readFileSync(process.cwd() + '/token.env').toString();
if(!token) {
  throw new Error('Bot token is required');
}
const bot = new Telegraf(token);
bot.start(ctx => AddChatId(ctx.getChat()));
export const sendMessage = async (text: string) => {
  let chats = GetChatList();
  if(!chats) {
    return;
  }
  await chats.chats.forEach(chat => {
    bot.telegram.sendMessage(chat, text).catch( ex => {console.log(ex)});
  });
};

export const AddChatId = async (chat: Promise<Chat>) => {
  let chatObj = await chat;
  if (chatObj.type != 'group') {
    return;
  }
  let chats = GetChatList();
  if (!chats) {
    chats = { chats: [chatObj.id.toString()] };
  } else {
    if(!chats.chats.includes(chatObj.id.toString())) {
      chats.chats.push(chatObj.id.toString());
    }

  }
  writeFileSync(process.cwd() + '/chatList.json', JSON.stringify(chats));
  console.log(`Add chatId ${(await chat).id.toString()}`);
};

export const GetChatList = (): chatList => {
  if (existsSync(process.cwd() + '/chatList.json')) {
    return JSON.parse(
      readFileSync(process.cwd() + '/chatList.json').toString()
    ) as chatList;
  } else {
    return null;
  }
};
bot.launch();
