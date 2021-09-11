import fs from 'fs'
import fetch from 'node-fetch'

const get = async (str: string) => await (await fetch(str)).json()


export default async function getProblemsByLevel(level: string) {
    let i = 1
    while (true) {
        const problems = await get(`https://solved.ac/api/v3/search/problem?query=tier%3A${level}&page=${i}&sort%3Arandom`)
        problems.items.forEach(async (problem: any) => {
            fs.appendFileSync('./problems.json', `\t\t\t"${problem.problemId}",\n`)
        })
        if (!problems.items) break
        i++
    }
}

getProblemsByLevel('b5')