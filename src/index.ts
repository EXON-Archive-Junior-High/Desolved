import path from 'path'
import fetch from 'node-fetch'
import { Client } from 'discord.js'
import { readJSONSync } from 'fs-extra'

const PATH = path.resolve()
const { bot_token : token } = readJSONSync(PATH + '/settings.json')
export const client = new Client()

const get = async (str: string) => await (await fetch(str)).json()

client.on('ready', async () => {
    console.log('[*] Ready')
    
})

client.login(token)