import { MessageEmbed, Message, MessageActionRow, MessageButton } from 'discord.js'

export default async function button(msg: Message, prefix: string) {
    const rows = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('button1')
                .setLabel('Confirm')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('button1')
                .setLabel('Cancel')
                .setStyle('DANGER')
        )
    msg.channel.send({
        content: 'Hi',
        components: [rows]
    })

}