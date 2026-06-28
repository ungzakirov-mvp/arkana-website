import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0b0d1a",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="11,2 21,20 1,20"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <line
            x1="11"
            y1="8"
            x2="11"
            y2="15"
            stroke="#818cf8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="11" cy="5" r="1.2" fill="#818cf8" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
