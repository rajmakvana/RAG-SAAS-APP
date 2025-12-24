import { RecursiveCharacterTextSplitter  } from "@langchain/textsplitters";

export const chunkText = async (text) => {
    const splitter = new RecursiveCharacterTextSplitter(
        {
            chunkSize : 800,
            chunkOverlap : 200,
        }
    )

    const chunk = await splitter.splitText(text);
    return chunk;
}