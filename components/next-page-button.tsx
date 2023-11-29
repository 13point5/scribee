import { Button } from "@/components/ui/button";
import { LightbulbIcon, Loader2, PlusIcon, WrenchIcon } from "lucide-react";
import { track, useEditor } from "@tldraw/tldraw";
import axios from "axios";
import * as ByteScale from "@bytescale/sdk";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { exportAs } from "@/lib/utils";

const uploadManager = new ByteScale.UploadManager({
  apiKey: "public_W142iLu7Bprevy3B942MBWvx28Gy", // This is your API key.
});

const NextPageButton = track(() => {
  const editor = useEditor();

  const [feedbacks, setFeedbacks] = useState<null | {
    mechanics: string;
    creative: string;
  }>(null);
  const [analysing, setAnalysing] = useState(false);

  const getCanvasImage = async () => {
    try {
      setAnalysing(true);

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

      const feedbackResponses = await Promise.all([
        axios.post("/api/feedback", {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Give feedback on the mechanics of writing on the following aspects: Grammar, punctuation, spelling. Keep the language of the feedback targeted at a kid whos in grade 2-4. Text: ${text}`,
            },
          ],
        }),
        axios.post("/api/feedback", {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Give feedback on the creative aspects of the text which is prt of a story. Keep the language of the feedback targeted at a kid whos in grade 2-4. Text: ${text}`,
            },
          ],
        }),
      ]);

      console.log("feedbackResponses", feedbackResponses);
      setFeedbacks({
        mechanics:
          feedbackResponses[0].data.response.choices[0].message.content,
        creative: feedbackResponses[1].data.response.choices[0].message.content,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setAnalysing(false);
    }
  };

  return (
    <div className="fixed top-[45%] right-[0px] left-0 z-[300] inset-0 pointer-events-none">
      <div className="pointer-events-auto w-full flex items-center justify-between fixed px-[50px]">
        <div className="flex flex-col gap-4">
          <Dialog>
            <DialogTrigger>
              <Button
                size="icon"
                className="w-[45px] h-[45px] rounded-full bg-[#765F0D] hover:bg-[#765F0D]"
              >
                <WrenchIcon size={25} className="" />
              </Button>
            </DialogTrigger>
            <DialogContent
              style={{
                zIndex: 10000,
              }}
            >
              <DialogHeader
                style={{
                  zIndex: 10000,
                }}
              >
                <DialogTitle>Mechanics Feedback</DialogTitle>
                <DialogDescription>
                  {feedbacks?.mechanics || "Feedback not available"}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Button
                size="icon"
                className="w-[45px] h-[45px] rounded-full bg-[#F5FFB7] hover:bg-[#F5FFB7]"
              >
                <LightbulbIcon size={25} color="#9F946C" />
              </Button>
            </DialogTrigger>
            <DialogContent
              style={{
                zIndex: 10000,
              }}
            >
              <DialogHeader
                style={{
                  zIndex: 10000,
                }}
              >
                <DialogTitle>Creative Feedback</DialogTitle>
                <DialogDescription>
                  {feedbacks?.creative || "Feedback not available"}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <Button
          onClick={getCanvasImage}
          size="icon"
          className="w-[45px] h-[45px] rounded-full"
        >
          {analysing ? (
            <Loader2 size={25} className="animate-spin" />
          ) : (
            <PlusIcon size={25} />
          )}
        </Button>
      </div>
    </div>
  );
});

export default NextPageButton;
