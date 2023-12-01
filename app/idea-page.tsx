"use client";

import { useCallback, useState } from "react";
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
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { b64_json_to_dataUrl, exportAs, toDataURL } from "@/lib/utils";

import axios from "axios";
import * as ByteScale from "@bytescale/sdk";
import StoryPage from "./story-page";
import Toolbar from "@/components/toolbar";
import { StageSetter, StoryStateItem } from "@/app/types";

// export default StoryPage;

const DefaultSizeStyle = StyleProp.defineEnum("tldraw:size", {
  defaultValue: "m",
  values: ["s", "m", "l", "xl"],
});

const StoryIdeaPage = ({
  setStage,
  setStories,
}: {
  setStories: (stories: StoryStateItem[] | null) => void;
  setStage: StageSetter;
}) => {
  const [generatingIdeas, setGeneratingIdeas] = useState(false);

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
      editor.setCurrentTool("draw");
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Header setStage={setStage} />

      <div className="w-[745px] h-full grow flex flex-col items-center py-10 px-15">
        <div className="relative mb-20">
          <img
            src="scribee1.svg"
            className="w-20 absolute left-[-65px] top-[50px]"
            alt="scribee"
          />

          <div className="shadow-md rounded-xl p-6 border-2 text-lg">
            <p>It&apos;s great to meet you, 🌈.</p>
            <p>What are you interested in?</p>
          </div>
        </div>

        <div className="w-[745px] h-[190px] mt-50 mb-5 relative">
          <Tldraw hideUi onMount={handleMount} className="rounded-lg">
            <Canvas />

            <div className="w-full flex gap-4 justify-end z-[300] fixed top-[520px] right-[225px]">
              <NextButton
                loading={generatingIdeas}
                setLoading={setGeneratingIdeas}
                setStories={setStories}
              />
            </div>

            <Toolbar />
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

const NextButton = track(({ loading, setLoading, setStories }) => {
  const editor = useEditor();

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    setStories(null);

    try {
      const img = await exportAs(editor);
      if (!img) throw new Error("img is null");
      // console.log("imgUrl", imgUrl);

      const res1 = await uploadManager.upload({ data: img });
      // console.log("res", res1);
      const { fileUrl } = res1;
      console.log("fileUrl", fileUrl);
      // const resizedUrl = fileUrl.replace("/raw/", "/image/") + "?w=512&h=512";
      // console.log("resizedUrl", resizedUrl);

      const res = await axios.post(
        "https://api.mathpix.com/v3/text",
        {
          src: fileUrl,
          formats: ["text"],
        },
        {
          headers: {
            app_id: process.env.NEXT_PUBLIC_MATHPIX_APP_ID,
            app_key: process.env.NEXT_PUBLIC_MATHPIX_API_KEY,
          },
        }
      );
      console.log("res", res);
      // return;

      const text = res.data.text;

      // const res = await axios.post("/api/feedback", {
      //   model: "gpt-4-vision-preview",
      //   messages: [
      //     {
      //       role: "user",
      //       content: [
      //         {
      //           type: "text",
      //           // text: "Give me feedback on mechanics for my story writing in the image attached",
      //           text: "What's written in the image? Keep in mind its written by a kid in grades 2-4 and so the handwriting is very bad. Just return the text, no other message",
      //         },
      //         {
      //           type: "image_url",
      //           // image_url: resizedUrl,
      //           image_url: {
      //             url: resizedUrl,
      //             detail: "low",
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // });

      // const text = res.data.response.choices[0].message.content;
      console.log("text", text);

      const res2 = await axios.post("/api/storyIdeas", {
        text,
      });

      console.log("res2", res2);
      setStories(
        res2.data.stories.map((title: string, index: number) => ({
          title,
          imgUrl: b64_json_to_dataUrl(res2.data.images[index]),
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      Next{" "}
      {loading ? (
        <Loader2Icon className="animate-spin ml-2" />
      ) : (
        <ArrowRightIcon className="ml-2" />
      )}
    </Button>
  );
});
