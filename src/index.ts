import path from 'path'
import fetch from 'node-fetch'
import { Client, Channel } from 'discord.js'
import schedule from 'node-schedule'
import { readJSONSync } from 'fs-extra'

import register from './command/basic/register'
import help from './command/basic/help'
import match from './command/match/match'
import contest from './command/codeforces/contest'

import button_msg from './command/test/button'

const PATH = path.resolve()
const { bot_token : token, mariadb, prefix, codeforces_time } = readJSONSync(PATH + '/settings.json')
export const client = new Client()
const job = schedule.scheduleJob(codeforces_time, () => contest(client, '818059613756325921'))
const db = require('knex') ({
    client: 'mysql2',
    connection: {
        host     : mariadb.host,
        port     : mariadb.port,
        user     : mariadb.user,
        password : mariadb.password,
        database : mariadb.database
    }
})

client.on('ready', async () => {
    console.log('[*] Ready')
    client.user.setActivity('\"' + prefix + ' help\" 를 입력하세요', { type: 'LISTENING' })
})

client.on('message', async (msg) => {
    if (msg.author.bot) return
    if (!msg.content.startsWith(prefix)) return
    
    if (msg.content.startsWith(prefix + ' help')) help(msg, prefix)
    if (msg.content.startsWith(prefix + ' register')) await register(client, msg, prefix)
    if (msg.content.startsWith(prefix + ' cp') || msg.content.startsWith(prefix + ' codeforces')) contest(client, '818059613756325921')

    if (msg.content.startsWith(prefix + ' button')) button_msg(msg, prefix)
})

client.on('clickButton', async (button) => {
    if (button.id === 'button1') console.log('d')
})

client.login(token)