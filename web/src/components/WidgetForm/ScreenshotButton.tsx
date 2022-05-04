import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from "./Loading";
interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenShotTook: (screenshot: string | null) => void;
}
export function ScreenshotButton({
  screenshot,
  onScreenShotTook,
}: ScreenshotButtonProps) {
  const [istakingScreenhot, setistakingScreenhot] = useState(false);
  async function handleTakeScreenshot() {
    setistakingScreenhot(true);
    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");
    onScreenShotTook(base64image);
    setistakingScreenhot(false);
  }

  if (screenshot) {
    return (
      <button
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenShotTook(null)}
      >
        <Trash weight="fill" />
      </button>
    );
  }
  return (
    <button
      onClick={handleTakeScreenshot}
      type="button"
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-zinc-500 transition-colors"
    >
      {istakingScreenhot ? <Loading /> : <Camera className="w-6 h-6 " />}
    </button>
  );
}
