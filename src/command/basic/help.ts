import { MessageEmbed, Message } from 'discord.js'

export default async function help(msg: Message, prefix: string) {
    msg.channel.send(new MessageEmbed({
        title: 'Help',
        description: 'codeforces, solved.ac 봇',
        fields: [
            {
                name: `${prefix} register \`"solved.ac name"\``,
                value: '가입 명령어'
            },
            {
                name: `${prefix} cp`,
                value: '코드포스 대회 알림 명령어'
            }
        ]
    }))
}