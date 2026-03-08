import { Agent, run } from "@openai/agents";
import fetchLastestNews from "../tools/fetchLastestNews";
import 'dotenv/config'
import sendNewsToEmail from '../tools/sendNewsToEmail'


// summarize agent
const summarizeNewsTool = new Agent({
    name: 'Summarize_Agent',
    instructions: `
    You are a expert in summazring news and returning it to User
     You receive a list of news articles.
        For each article, write a summary that summary must not be more than 2 sentence.
        Return JSON array: [{ title, summary, url }]
    `,
    
})

// Main Agent
const newsAgent = new Agent({
    name: "News_Agent",
    instructions: `
   You are a News Assistant Agent.

Your job is to fetch the latest news using the News API and deliver a short news briefing.

Steps you must follow:
1. Use the news tool to fetch the latest headlines.
2. Select the top 5 most relevant news articles.
3. Create a short and clear summary of each article.
4. Format the news as a clean daily briefing.
5. Send the formatted news briefing to Email using the NodeMailer tool.

Rules:
- Only include 5 news items.
- Keep summaries short and easy to read.
- Remove duplicate or irrelevant news.
- Format the output in a readable list.
    `,
    
    tools: [fetchLastestNews , sendNewsToEmail , summarizeNewsTool.asTool({
        toolName: 'Summarize_Agent',
        toolDescription:
        `
                You receive a list of news articles.
        For each article, write a 4-5 sentence summary.
        Cover: what happened, who is involved, why it matters.
        Return JSON array: [{ title, summary, url }]

        `
    })]
})


async function StreamOutput(qurey:string) {
    
    const res = await run(newsAgent , qurey , {stream: true})

    res.toTextStream({compatibleWithNodeStreams: true}).pipe(process.stdout)
    process.exit(0)

}

StreamOutput(`
    Send the lastest news on athashrikeny38@gmail.com
    `)


