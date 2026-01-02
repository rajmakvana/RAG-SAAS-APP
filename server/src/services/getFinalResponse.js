import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { routerQuestion } from "./questionRouter.js";
import { genrateSearchQuery } from "./searchQuery.js";
import { similaritySearch } from "./similaritySearch.js";
import { webSearch } from "./webSearch.js";
import { FINAL_SYSTEM_PROMPT } from "../prompts/system.prompt.js";
import { groq } from "../config/groq.js";

export const getFinalResponse = async (question , chatHistory) => {

    const { source } = await routerQuestion(question);

    let context = "";
    let searchQuery = "";

    searchQuery = await genrateSearchQuery(question);

    if (source === "internal" || source === "both") {
      const internalContext = await similaritySearch(searchQuery);
      context += `INTERNAL CONTEXT:\n${internalContext}\n\n`;
    }

    if (source === "web" || source === "both") {
      const webSearchContext = await webSearch(searchQuery);
      context += `WEBSEARCH CONTEXT:\n${webSearchContext}\n\n`;
    }

    const messages = [
      new SystemMessage(FINAL_SYSTEM_PROMPT),
      new SystemMessage(context),
      ...chatHistory,
      new HumanMessage(searchQuery)
    ]

    const response = await groq.invoke(messages)
    return response;
}