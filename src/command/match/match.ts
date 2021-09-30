import fetch from 'node-fetch'
import { MessageEmbed, Client, TextChannel } from 'discord.js'

const get = async (str: string) => await (await fetch(str)).json()


export default async function match(client: Client, channel_id: string, users: readonly string[], level: string) {
    let problemList: Set<number> = new Set<number>([])
    let i = 1
    users.forEach(async (user: string) => {
        while (true) {
            const data = await get(`https://solved.ac/api/v3/search/problem?query=solved_by%3A${user}&page=${i}`)
            data.items.forEach((problem: any) => problemList.add(problem.problemId))
            if (!data.items) break
            i++
        }
    })
    i = 1
    while (true) {
        const problems = await get(`https://solved.ac/api/v3/search/problem?query=tier%3A${level}&page=${i}&sort%3Arandom`)
        let success: boolean = false
        problems.items.forEach(async (problem: any) => {
            if (!problemList.has(problem.problemId)) {
                success = true
                await (client.channels.cache.get(channel_id) as TextChannel).send(problem.problemId)
                return false
            }
        })
        if (success) break
        i++
    }
    
}
