import path from 'path'
import fetch from 'node-fetch'
import { Client } from 'discord.js'
import { readJSONSync } from 'fs-extra'
import schedule from 'node-schedule'

import register from './command/register'
import match from './command/match/match'
import contest from './command/codeforces/contest'

const PATH = path.resolve()
const { bot_token : token, mariadb, prefix, codeforces_time } = readJSONSync(PATH + '/settings.json')
export const client = new Client()
const job = schedule.scheduleJob(codeforces_time, () => {
    contest(client, '818059613756325921')
})
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

const get = async (str: string) => await (await fetch(str)).json()

client.on('ready', async () => {
    console.log('[*] Ready')
    client.user.setActivity('\"' + prefix + ' help\" 를 입력하세요', { type: 'PLAYING' })
    contest(client, '818059613756325921')
    match(client, '818059613756325921', ['exon', 'lighton'], 'b5..b1')
})

client.on('message', async (msg) => {
    if (msg.author.bot) return
    if (!msg.content.startsWith(prefix)) return

    if (msg.content.startsWith(prefix + ' register')) await register(msg, prefix)
})

client.login(token)