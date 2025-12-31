import { SystemMessage } from "@langchain/core/messages";
import { groq } from "../config/groq.js";
import { SEARCH_QUERY_PROMPT  } from "../prompts/searchQuery.prompt.js";

export const genrateSearchQuery = async (question) => {
    const response = await groq.invoke([
        new SystemMessage(
            SEARCH_QUERY_PROMPT.replace("{question}" , question)
        )
    ])

    return response.content.trim();
}