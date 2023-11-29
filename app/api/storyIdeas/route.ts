import OpenAI from "openai";

// Set the runtime to edge for best performance
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { text } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.chat.completions.create({
    // model: "gpt-4-vision-preview",
    model: "gpt-3.5-turbo",
    stream: false,
    messages: [
      {
        role: "user",
        content: `Generate 3 short story titles for picture books that will be written by kids in grades 2-4 based on the following interest: ${text}. Give output as 3 titles separated in 3 lines without numbers for representing the order and dont add any extra messages. Keep the story titles short, creative, and easy to understand for kids in grades 2-4.`,
      },
    ],
  });

  const stories = response.choices[0].message.content?.split("\n") || [];

  if (stories.length !== 3)
    throw new Error("Could not generate 3 story titles");

  const images = await Promise.all(
    stories.map((storyTitle) =>
      openai.images.generate({
        model: "dall-e-3",
        prompt: `Cover for a picture book titled: ${storyTitle}. This book is written by kids in grades 2-4 so adjust the style accordingly. The aesthetics should be disney style.`,
        n: 1,
        size: "1024x1024",
      })
    )
  );
  const imgUrls = images.map((img) => img.data[0].url);

  return Response.json({ stories, images: imgUrls });
}
