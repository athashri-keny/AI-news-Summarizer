import { tool  } from "@openai/agents";
import z from "zod";

import 'dotenv/config'
import { SendEmailToUserAboutSummarizeNews } from "../helpers/SendEmail";



export default tool({
    name: 'Send_News',
    description: `Send the summzaries news to user via email`,

    parameters: z.object({
        articles: z.array(
            z.object({
                title: z.string().describe("News Title"),
                 summary: z.string().describe("2-sentence summary of the article"),
               url: z.string().describe("news Url")
            })
        ),
        UserEmail: z.string().describe("User Email which has to send the news updates")
    }),

    // function that executes
    execute: async function ({articles , UserEmail}) {

        await SendEmailToUserAboutSummarizeNews(articles , UserEmail)
    }

})