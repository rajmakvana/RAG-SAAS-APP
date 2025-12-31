import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { routerQuestion } from "../services/questionRouter.js";
import { genrateSearchQuery } from "../services/searchQuery.js";
import { similaritySearch } from "../services/similaritySearch.js";
import { webSearch } from "../services/webSearch.js";
import { FINAL_SYSTEM_PROMPT } from "../prompts/system.prompt.js";
import { groq } from "../config/groq.js";

export const userChat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "question is required" });
    }

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
      new HumanMessage(searchQuery)
    ]

    const response = await groq.invoke(messages)
    console.log(searchQuery)
    console.log(context)
    console.log(response)


    res.status(200).json({ success: true, message: "Chat API is working", result : response.content });
  } catch (error) {
    console.error("chat error:", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
