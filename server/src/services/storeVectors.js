import pinecone from "./pinecone.js";
import { NomicEmbeddings } from "@langchain/nomic";

export const nomicEmbeddings = new NomicEmbeddings({
  apiKey: process.env.NOMIC_API_KEY,
  model: "nomic-embed-text-v1",
});

const index = pinecone.index("rag-datasets");

export async function storeChunkInPinecone(chunks) {
  try {
    const index = pinecone.Index("rag-datasets");
    const vectors = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      const embedding = await nomicEmbeddings.embedQuery(chunk);

      vectors.push({
        id: `rag-datasets-${i}`,
        values: embedding,
        metadata: {
          text: chunk,
          chunkIndex: i,
        },
      });
    }

    await index.upsert(vectors);
    console.log("Stored vectors using Nomic embeddings");
  } catch (error) {
    console.error("Upload error:", error);
  }
}
