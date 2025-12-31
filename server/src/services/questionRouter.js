import { SystemMessage } from "@langchain/core/messages";
import { groq } from "../config/groq.js";
import { ROUTER_PROMPT } from "../prompts/router.prompt.js";

export const routerQuestion = async (question) => {
    const response = await groq.invoke([
        new SystemMessage(
            ROUTER_PROMPT.replace("{question}" , question)
        )
    ])

    return JSON.parse(response.content);
}