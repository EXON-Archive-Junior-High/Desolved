import path from 'path'
import fetch from 'node-fetch'
import { Client } from 'discord.js'
import { readJSONSync } from 'fs-extra'

import register from './command/register'
import contest from './command/codeforces/contest'

const PATH = path.resolve()
const { bot_token : token, mariadb, prefix } = readJSONSync(PATH + '/settings.json')
export const client = new Client()
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
    contest(client, '818059613756325921')
    client.user.setActivity('\"' + prefix + ' help\" 를 입력하세요', { type: 'PLAYING' })
})

client.on('message', async (msg) => {
    if (msg.author.bot) return
    if (!msg.content.startsWith(prefix)) return

    if (msg.content.startsWith(prefix + ' register')) await register(msg, prefix)
})

client.login(token)