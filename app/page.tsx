"use client";

import Header from "@/components/header";
import Palette from "@/components/palette";
import Toolbar from "@/components/toolbar";
import { Canvas, Tldraw, track, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Header />

      <div className="w-full h-full grow flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-[900px] h-[600px]">
          <Tldraw hideUi>
            <Palette />
            <Canvas />
            <Toolbar />
          </Tldraw>
        </div>
      </div>
    </main>
  );
}
