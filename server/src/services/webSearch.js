import { tavily } from "@tavily/core";

const tvly =tavily({apiKey : process.env.TAVILY_API_KEY});

export const webSearch = async(searchQuery) => {
    const response = await tvly.search(searchQuery);
    const finalResponse = response.results.map((doc) => doc.content).join("\n");
    return finalResponse;
}