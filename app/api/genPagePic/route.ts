import OpenAI from "openai";

// Set the runtime to edge for best performance
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { story } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: false,
    messages: [
      {
        role: "user",
        content: `Generate a short description of the next page of a picture book, given the story so far. Story: ${story}. Don't respond with any extra message, just the description of the next page.`,
      },
    ],
  });

  const description = response.choices[0].message.content;
  console.log("story", story);
  console.log("description", description);

  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Generate a picture for a page of a picture book given the story so far and a description of the new page. Do not add any text to the generated image. The aesthetics should be disney style. Story: ${story}. Page Description: ${description}`,
    n: 1,
    size: "1024x1024",
  });

  return Response.json({ image: image.data[0].url });
}
