import fetch from 'node-fetch'
import { MessageEmbed, Client, TextChannel } from 'discord.js'

const get = async (str: string) => await (await fetch(str)).json()


export default async function contest(client: Client, channel_id: string) {
    const data = await get('https://codeforces.com/api/contest.list?gym=false')
    const contests: any = []
    data.result.forEach((e: any) => {
        if (e.phase !== 'BEFORE') return false
        const date: Date = new Date(1970, 0, 1)
        date.setSeconds(date.getSeconds() + +e.startTimeSeconds + 9 * 60 * 60)
        const until: Date = new Date()
        const msec = date.getTime() - until.getTime()
        const hour2msec = 1000 * 60 * 60
        const days = Math.floor(msec / (hour2msec * 24))
        const hours = Math.floor((msec - (days * hour2msec * 24)) / hour2msec)
        const minutes = Math.floor((msec - (days * hour2msec * 24 + hours * hour2msec)) / (1000 * 60))
        const seconds = Math.floor((msec - (days * hour2msec * 24 + hours * hour2msec + minutes * 1000 * 60)) / 1000)
        const date_kr: string = days + '일 '  + hours + '시간 ' + minutes + '분 ' + seconds + '초 남음'
        if (days > 10) return
        contests.push(new MessageEmbed({
            title: e.name,
            url: 'https://codeforces.com/contests/' + e.id,
            description: date_kr,
            footer: {
                text: date.getFullYear() + '년 ' + (+date.getMonth()+1) + '월 ' + date.getDate() + '일 ' + date.getHours() + '시 ' + date.getMinutes() + '분'
            },
            timestamp: new Date()
        }))
    })
    
    for (let i = 0; i < contests.length; i++) setTimeout(async () => await (client.channels.cache.get(channel_id) as TextChannel).send(contests.pop()), 1000)
}
