"use client";

import { useCallback } from "react";
import Header from "@/components/header";
import {
  Canvas,
  Tldraw,
  Editor,
  StyleProp,
  track,
  useEditor,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { exportAs } from "@/lib/utils";

import axios from "axios";
import * as ByteScale from "@bytescale/sdk";
import StoryPage from "./story-page";

// export default StoryPage;

const DefaultSizeStyle = StyleProp.defineEnum("tldraw:size", {
  defaultValue: "m",
  values: ["s", "m", "l", "xl"],
});

const StoryIdeaPage = () => {
  const handleMount = useCallback((editor: Editor) => {
    editor.batch(() => {
      if (editor.isIn("select")) {
        editor.setStyleForSelectedShapes(DefaultSizeStyle, "m", {
          squashing: false,
        });
      }
      editor.setStyleForNextShapes(DefaultSizeStyle, "m", {
        squashing: false,
      });
      editor.updateInstanceState({ isChangingStyle: true });
    });

    editor.setCurrentTool("draw");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Header />

      <div className="w-[745px] h-full grow flex flex-col items-center py-10 px-15 border-2">
        <div className="relative mb-20">
          <img
            src="scribee1.svg"
            className="w-20 absolute left-[-65px] top-[50px]"
            alt="scribee"
          />

          <div className="shadow-md rounded-xl p-6 border-2 text-lg">
            <p>It&apos;s great to meet you, Amy 🌈.</p>
            <p>What are you interested in?</p>
          </div>
        </div>

        <div className="w-[745px] h-[190px] mt-50 mb-5 relative">
          <Tldraw hideUi onMount={handleMount} className="rounded-lg">
            <Canvas />

            <div className="w-full flex gap-4 justify-end z-[300] fixed top-[520px] right-[225px]">
              <NextButton />
            </div>
          </Tldraw>
        </div>
      </div>
    </main>
  );
};

export default StoryIdeaPage;

const uploadManager = new ByteScale.UploadManager({
  apiKey: "public_W142iLu7Bprevy3B942MBWvx28Gy", // This is your API key.
});

const NextButton = track(() => {
  const editor = useEditor();

  const handleClick = async () => {
    const img = await exportAs(editor);
    if (!img) throw new Error("img is null");
    // console.log("imgUrl", imgUrl);

    const res1 = await uploadManager.upload({ data: img });
    // console.log("res", res1);
    const { fileUrl } = res1;
    console.log("fileUrl", fileUrl);
    const resizedUrl = fileUrl.replace("/raw/", "/image/") + "?w=512&h=512";
    console.log("resizedUrl", resizedUrl);

    // return;

    const res = await axios.post("/api/feedback", {
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              // text: "Give me feedback on mechanics for my story writing in the image attached",
              text: "What's written in the image? Keep in mind its written by a kid in grades 2-4 and so the handwriting is very bad. Just return the text, no other message",
            },
            {
              type: "image_url",
              // image_url: resizedUrl,
              image_url: {
                url: resizedUrl,
                detail: "low",
              },
            },
          ],
        },
      ],
    });

    const text = res.data.response.choices[0].message.content;
    console.log("text", text);

    const storiesResponse = await axios.post("/api/feedback", {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Generate 3 short story titles for picture books that will be written by kids in grades 2-4 based on the following interest: ${text}. Give output as 3 titles separated in 3 lines without numbers for representing the order and dont add any extra messages. Keep the story titles short, creative, and easy to understand for kids in grades 2-4.`,
        },
      ],
    });
    const stories = storiesResponse.data.response.choices[0].message.content;
    console.log("stories", stories.split("\n"));
  };

  return (
    <Button onClick={handleClick}>
      Next <ArrowRightIcon className="ml-2" />
    </Button>
  );
});
