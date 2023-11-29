import OpenAI from "openai";

// Set the runtime to edge for best performance
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.chat.completions.create({
    // model: "gpt-4-vision-preview",
    model,
    stream: false,
    messages,
  });

  console.log("response", response);

  return Response.json({ response });
}
