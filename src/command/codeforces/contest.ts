import fetch from 'node-fetch'
import { MessageEmbed, Client, TextChannel } from 'discord.js'

const get = async (str: string) => await (await fetch(str)).json()


export default async function contest(client: Client, channel_id: string) {
    const data = await get('https://codeforces.com/api/contest.list?gym=false')
    const contests: any = []
    data.result.forEach((e: any) => {
        if (e.phase !== 'BEFORE') return false
        let date: Date = new Date(1970, 0, 1)
        date.setSeconds(date.getSeconds() + +e.startTimeSeconds + 9 * 60 * 60)
        const date_kr: string = date.getFullYear() + '년 ' + (+date.getMonth()+1) + '월 ' + date.getDate() + '일 ' + date.getHours() + '시 ' + date.getMinutes() + '분';
        contests.push(new MessageEmbed({
            title: e.name,
            url: 'https://codeforces.com/contests/' + e.id,
            description: date_kr
        }))
    })
    
    for (let i = 0; i < contests.length; i++) {
        setTimeout(async () => {
            (client.channels.cache.get(channel_id) as TextChannel).send(contests.pop())
        }, 1000)
    }
    
}
