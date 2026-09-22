import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import theme from "@jadenraats/universal-design-system/themes/jadenraats.json";

export const alt = "Jaden Raats — AI for business owners, proven in a real business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = theme.semantic["surface.canvas"];
const INK = theme.semantic["color.text.primary"];
const SOFT = theme.semantic["color.text.secondary"];
const ACCENT = theme.semantic["color.action.primary"];

export default async function OgImage() {
  const [antonFile, plexMonoFile] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/Anton-Regular.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/IBMPlexMono-Regular.ttf")),
  ]);
  const anton = Uint8Array.from(antonFile).buffer;
  const plexMono = Uint8Array.from(plexMonoFile).buffer;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: PAPER,
          color: INK,
          fontFamily: "Anton",
        }}
      >
        <div style={{ fontSize: 170, letterSpacing: "0.005em", display: "flex", textTransform: "uppercase" }}>
          jaden raats<span style={{ color: ACCENT }}>*</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 30, color: SOFT, maxWidth: 900, display: "flex", fontFamily: "IBM Plex Mono" }}>
          REAL SYSTEMS. REAL RESULTS. — Phoenix, AZ.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton, weight: 400, style: "normal" },
        { name: "IBM Plex Mono", data: plexMono, weight: 400, style: "normal" },
      ],
    },
  );
}
