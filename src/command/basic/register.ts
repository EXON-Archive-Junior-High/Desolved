import fetch from 'node-fetch'
import { MessageEmbed, Message, Client } from 'discord.js'

const get = async (str: string) => await (await fetch(str)).json()

export default async function register(client: Client, msg: Message, prefix: string) {
    let args = msg.content.split(' ').slice(1)
    try {
        const r = await get('https://solved.ac/api/v3/user/problem_stats?handle=' + args[1])
        if (r) {
            msg.channel.send(new MessageEmbed({
                title: '⭕ \"' + args[1] + '\" 님이 가입하셨습니다.',
                description: '\"' + prefix + ' help\" 를 입력해서 많은 명령어를 살펴보세요!',
                color: '#00FF00'
            }))
        }
    } catch (err) {
        msg.channel.send(new MessageEmbed({
            title: '❌ 오류가 생겼습니다.',
            description: '\"' + args[1] + '\" 가 정확한 아이디인지 확인해주세요.',
            color: '#FF0000'
        }))
    }
}