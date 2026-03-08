import { tool, Tool } from "@openai/agents";
import z from "zod";
import axios from "axios";


interface NewsApiResponse {
    totalResults: number,
    articles: [{
        title: string,
        description: string,
        url: string
    }]
}


export default tool({
    name: "Lastest_News_Fetcher",
    description: 'Fetch the lastest news from the news api',
    parameters: z.object({}),
    execute: async function () {

        try {
            const res = await axios.get<NewsApiResponse>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_APIKEY}`)
            return {
      articles: res.data.articles
    }

        } catch (error) {
            console.log("Error while fetching articules" , error)
        }
    }
})