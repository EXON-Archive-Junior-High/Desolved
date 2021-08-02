import fetch from 'node-fetch'
import { MessageEmbed, Message } from 'discord.js'

const get = async (str: string) => await (await fetch(str)).json()

export default async function register(msg: Message, prefix: string) {
    let msg_list = msg.content.split(' ').slice(1)
    try {
        if (await get('https://solved.ac/api/v3/user/problem_stats?handle=' + msg_list[1])) {
            msg.channel.send(new MessageEmbed({
                title: '⭕ \"' + msg_list[1] + '\" 님이 가입하셨습니다.',
                description: '\"' + prefix + ' help\" 를 입력해서 많은 명령어를 살펴보세요!',
                color: '#00FF00'
            }))
        }
    } catch(err) {
        msg.channel.send(new MessageEmbed({
            title: '❌ \"' + msg_list[1] + '\" 이라는 유저가 존재하지 않습니다.',
            description: '정확한 아이디로 다시 가입해주세요.',
            color: '#FF0000'
        }))
    }
}