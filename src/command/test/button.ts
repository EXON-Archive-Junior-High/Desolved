import { MessageEmbed, Message } from 'discord.js'
import { MessageButton } from 'discord-buttons'

export default async function button(msg: Message, prefix: string) {
    const button1 = new MessageButton()
        .setLabel('Confirm')
        .setStyle('green')
        .setID("button1")
    const button2 = new MessageButton()
        .setLabel('Cancel')
        .setStyle('red')
        .setID("button2")
    msg.channel.send(new MessageEmbed({
        title: 'Resister',
        description: '가입하시겠습니까?',
        fields: [
            {
                name: '테스트',
                value: '테스트'
            }
        ],
        color: '#ffffff'
    }), { buttons: [button1, button2] })
}