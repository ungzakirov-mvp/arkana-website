import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0b0d1a",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="11,2 21,20 1,20"
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <line
            x1="11" y1="8" x2="11" y2="15"
            stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round"
          />
          <circle cx="11" cy="5" r="1.2" fill="#818cf8" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
