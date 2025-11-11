import dotenv from "dotenv";
dotenv.config();
import { ChatGroq } from "@langchain/groq";
import { RetrievalQAChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "@langchain/core/prompts";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

export async function loadKnowledgeBase(filePath: string): Promise<FaissStore> {
  const loader = new TextLoader(filePath);
  const rawDocs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const chunks = await splitter.splitDocuments(rawDocs);

  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HF_API_KEY!,
    model: "sentence-transformers/all-MiniLM-L6-v2",
  } as any);

  // @ts-ignore
  embeddings.client.baseUrl = "https://router.huggingface.co/hf-inference";

  const vectordb = await FaissStore.fromDocuments(chunks, embeddings);
  return vectordb;
}

export async function buildRagChain(db: FaissStore): Promise<RetrievalQAChain> {
  const retriever = db.asRetriever({ k: 3 });

  const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY!,
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
  });

  const prompt = PromptTemplate.fromTemplate(
    `
You are a helpful AI assistant for a travel platform called XploreMate.

You answer user questions specifically using the context below.

Be clear and concise. Avoid generic intros like "Based on the provided context."

If the context includes a list of features or steps, summarize up to 2–3 key points.

Stay relevant to the user's question. Do NOT include marketing fluff or phrases like "Additionally, you can..."

If the question includes "how to" or "how can I use", give a step-by-step answer in numbered points (1, 2, etc.).

**Bold important XploreMate-related terms** (e.g.,**XploreMate**, **guide**, **tour**, **booking**, **location**, **trip**, **visa**, **city**, **hotel**, etc.).

If the question is outside the scope of the context (i.e., not related to: "guide", "travel", "tour", "xploremate", "visa", "hotel", "booking", "trip", "city", "location", or "places"), respond with:
"I'm built only to help with XploreMate-related queries. Please ask something relevant."

Context:
{context}

Question:
{question}

Answer:
  `.trim()
  );

  const chain = await RetrievalQAChain.fromLLM(llm, retriever, {
    returnSourceDocuments: false,
    prompt,
  });

  return chain;
}
