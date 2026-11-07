import { ImageResponse } from "next/og";
import theme from "@jadenraats/universal-design-system/themes/jadenraats-modern.json";

export const alt = "Jaden Raats. AI for business owners, proven in a real business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", padding: 40, background: theme.semantic["surface.canvas"], color: theme.semantic["color.text.primary"] }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%", padding: 56, borderRadius: parseInt(theme.radius.card), background: theme.semantic["surface.elevated"], border: `1px solid ${theme.semantic["color.border.subtle"]}` }}>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: "-0.04em" }}>Jaden Raats<span style={{ color: theme.semantic["color.action.primary"] }}>*</span></div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: theme.semantic["color.text.secondary"] }}>Real systems. Real results. · Phoenix, AZ.</div>
      </div>
    </div>, size,
  );
}
