import path from "path";
import { loadKnowledgeBase, buildRagChain } from "../chatbot/chatbot";

let chain: any;

const filePath = path.resolve("data", "../chatbot/knowledge.txt");

(async () => {
  try {
    const db = await loadKnowledgeBase(filePath);
    chain = await buildRagChain(db);
    console.log("RAG chain initialized.");
  } catch (err) {
    console.error("Failed to load RAG chain:", err);
  }
})();

export const askRag = async (req: any, res: any) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required." });
  }

  try {
    const result = await chain.call({ query: question });
    res.status(200).json({ answer: result.text });
  } catch (err) {
    console.error("RAG error:", err);
    res.status(500).json({ error: "Failed to process question." });
  }
};
