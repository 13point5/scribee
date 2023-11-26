import Header from "@/components/header";
import Palette from "@/components/palette";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <div className="flex flex-col items-center justify-center w-full h-full">
        <Palette />
      </div>
    </main>
  );
}
