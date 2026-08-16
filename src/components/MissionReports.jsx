import { useRef, useState, useCallback, useEffect } from "react";
import {
  gsap,
  SplitText,
  ScrollTrigger,
  useGSAP,
} from "../components/Gsapconfig";
import GlobalTexture from "./Globaltexture";
import fontReady from "./fontReady";

/* ─── Glow Line Blur Values ─── */
const LINE_BLURS = [0.5, 0.5, 3, 3, 5.5];

function GlowLine() {
  return (
    <div className="relative w-full h-[23px]">
      {LINE_BLURS.map((blur, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center"
          style={{ mixBlendMode: "plus-lighter", filter: `blur(${blur}px)` }}
        >
          <div className="w-full h-px bg-[#F05A1F]" />
        </div>
      ))}
    </div>
  );
}

/* ─── Brand Logo SVGs ─── */
function WhisperLogo({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2172 724"
      fill="currentColor"
      stroke="currentColor"
    >
      <g clipPath="url(#whisper-clip)" fill="currentColor">
        <path
          fill="currentColor"
          d="M181.5 131.9c-10.8 2.8-19.8 10.2-24.3 19.9l-2.7 5.7v410l2.8 5.7c3.2 6.6 11 14.1 17.7 17.1 7 3.2 19.9 3.5 27.3.7 7.6-2.9 16.6-11.2 19.8-18.2l2.4-5.3v-411l-2.8-5.7c-3.2-6.6-10.4-13.5-17.4-16.8-5.1-2.4-17.4-3.6-22.8-2.1m439.8.6c-9.9 3-18.5 10.5-22.7 19.4l-2.1 4.6v412l2.7 5c3.2 6.2 11.3 13.9 17.6 16.8 3.8 1.8 6.5 2.2 14.7 2.2 9 0 10.6-.3 15.5-2.8 7.5-3.9 13.3-9.8 16.7-17.1l2.8-6.1.3-201.4c.3-224.1.7-208.3-6.6-219.1-8.3-12.2-24.8-17.9-38.9-13.5M1186 173c-10.2 2.2-18.6 9.3-21 17.8-.6 2.5-1 60.2-1 174.6v170.9l2.1 4.4c2.4 4.9 10.6 11.8 16 13.3 5.6 1.6 31 1.2 35.9-.5 6.1-2.2 12.4-7.7 15.2-13.2l2.3-4.8v-343l-2.3-4.7c-2.8-5.6-7.9-10.3-14.1-13.1-3.7-1.7-7.1-2.1-16.6-2.3-6.6-.2-14 .1-16.5.6m-310.2 17.5c-7.5 2.7-12.7 8.2-14.9 15.7-.6 2.1-1 62.4-1 166.2v162.9l2.6 5.4c3 6.1 9.6 11.7 15.7 13.4 2.3.6 10.8.9 20.2.7 14.8-.3 16.5-.5 20.9-2.8 2.7-1.3 6.2-4 7.9-5.9 6.6-7.5 6.3-3.7 6.6-79.4l.3-68.7h68.1c50.9 0 69.1-.3 72.2-1.2 2.5-.8 6.1-3.2 9.3-6.3 6.6-6.5 7.6-10.2 7.1-26.1-.3-10.9-.6-12.4-3.1-16.7-2.6-4.4-6.9-8.4-11.2-10.3-1.1-.5-33.5-1.1-72-1.4l-70-.5-.3-42.3-.2-42.2h80.8c89.9 0 87.6.2 94.5-6.5 6.6-6.4 7.2-8.4 7.2-24s-1-18.8-7.6-25.3-1-6.2-120.8-6.1c-88.9 0-109.3.3-112.3 1.4M510.9 263c-10.6 1.8-21.7 10.8-25.5 20.5-1.8 4.8-1.9 8.9-1.9 112.5v107.5l2.7 5.1c3.1 6 10.4 12.8 16.8 15.7 3.6 1.7 6.5 2.1 14 2.1 8.3 0 10.1-.3 14.5-2.6 6.3-3.2 14.8-12.1 16.6-17.3 1.2-3.3 1.4-22 1.4-112v-108l-2.2-4.6c-6.1-13.1-22-21.4-36.4-18.9m-214.1 11c-10.2 1.8-20.3 9.4-25 18.7l-2.3 4.8v205l2.4 5.3c2.7 6 9 12 16.6 16 4.4 2.3 6.2 2.6 14.5 2.7 8.6 0 10.1-.3 15.3-3 7.9-3.9 15.2-12 17.2-18.9 1.3-4.6 1.5-18.2 1.3-106.7-.3-97.2-.4-101.5-2.2-104.9-7.8-14.5-22.1-21.7-37.8-19m1100.1 2.5c-48.9 7.9-86.2 33.3-108.2 73.5-11.1 20.2-17.6 50.4-16.4 75.9 2.6 55.3 30.9 98.8 79 121.6 20 9.5 40.2 14.3 64.1 15.2 40.8 1.6 76.7-8.2 104.8-28.4 10.3-7.4 25.7-23.5 33.1-34.4 17.1-25.6 25.4-59.7 22.7-93.2-3.5-43.7-24.5-81.1-59-104.9-16.7-11.5-34-18.9-55.1-23.4-10.8-2.3-15.2-2.7-34.4-3-15.5-.2-24.5.1-30.6 1.1m45.6 63.1c27.6 5.3 50 27.2 57.6 56.2 5.7 21.5 2.2 49.4-8.2 66.8-4.8 8-15.9 19.6-23.7 24.7-21.4 14.1-50.6 16.7-74.8 6.6-17.8-7.4-30.6-19.4-38.8-36.4-5.9-12-7.7-19.6-8.3-34-1.2-27.1 6.1-47.1 23.1-64 12.1-12 28.7-19.9 44.7-21.4 10.2-.9 17.8-.5 28.4 1.5m166.3-52.1c-11.2 2.8-17 7.2-20.7 15.5-4.5 10.3-4.1 12.6 8.8 48 8.9 24.3 20.7 57.2 30.1 84 22.2 63.2 34 95.3 37.3 100.9 8.5 14.3 26.2 23.1 46.7 23.1 14.8 0 27.5-4.9 37.3-14.4 6.4-6.2 8.2-9.8 19.3-39.1 4.8-12.7 10.1-26.8 11.9-31.5s5.6-14.7 8.4-22.3c2.8-7.7 6.9-18 9.1-23 2.1-5.1 4.4-11.1 5.1-13.5.7-2.3 1.6-4.2 2.1-4.2.4 0 .8.2.8.3 0 .2 2 5.8 4.5 12.3 8.3 21.6 11.3 29.7 16.4 43.9 2.7 7.7 6.6 18.3 8.6 23.5s4.7 12.4 6 16c7 19.3 9.5 25.4 12.5 30 11.1 17.3 34.8 25.6 58.3 20.4 13.8-3.1 26.6-12.4 32.2-23.3 3.4-6.8 14.3-36.5 46-125.1 6.9-19.5 15.3-42.7 18.5-51.5 10.7-29.5 14.2-41.5 13.6-46-1.5-9.9-8.1-18.6-16.9-22.5-9.5-4.2-28-3.7-38.2 1.1-5.1 2.4-12.1 9.1-14.6 14.2-1.8 3.3-8.4 21.7-19.9 55.2-3.6 10.3-9.9 28-17.5 49-1.8 4.9-5.3 14.6-7.8 21.5s-5.8 15.8-7.4 19.9l-3 7.4-2.8-7.9c-1.6-4.3-3.9-10.5-5.2-13.7s-4.6-12-7.3-19.5c-6.9-19.5-16.9-46.5-23-62.2-2.9-7.4-7.6-20.4-10.6-28.9-6.2-17.7-9.1-23.4-14.6-28.9-5.5-5.6-11.5-8.1-21.6-9.3-17.8-2-31.1 2.9-38.8 14.5-2.9 4.5-9.1 19.8-17.9 44.6-1.3 3.6-4.6 12.6-7.4 20-2.9 7.4-10.1 26.5-16.1 42.5-16.2 42.9-18.7 49.2-19.4 47.5-3.8-10.3-18-50.3-28.6-81-25.2-73.2-25.8-74.6-33.7-80.6-2.3-1.8-6.8-4.2-10-5.4-7.5-2.8-22.4-3.6-30.5-1.5M402 365.9c-9.1 3-15.5 8.6-19.4 17.1l-2.6 5.5v160l2.4 5.1c3.4 7.4 7.7 11.7 14.8 15 5.3 2.4 7.5 2.9 14.3 2.8 13 0 22.7-5.9 28.2-17.2l2.8-5.7-.1-80v-80l-3.1-6.1c-5.7-11-14.5-16.5-27.3-17-4.1-.2-8.6 0-10 .5"
        />
      </g>
      <defs>
        <clipPath id="whisper-clip">
          <rect width="2172" height="724" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ShopifyLogo({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 760 218"
      fill="currentColor"
      stroke="currentColor"
    >
      <g clipPath="url(#shopify-clip)" fill="currentColor">
        <path
          fill="currentColor"
          d="M77.3 1.9c-14.4 5-25.6 18.9-32.4 40.3l-3.1 9.7-11.2 3.5c-6.1 2-11.7 4-12.4 4.4-1.4.9-2.1 5.8-10.2 68.2-2.3 17.3-5 38-6.1 45.9S.1 188.4.3 188.6s7.5 1.7 16.3 3.4c15.9 3.1 85.8 16.2 96.7 18.2 5.7 1 16.7.3 16.7-1.1 0-.4 3.5-1.3 7.8-1.9 9.1-1.5 18.1-3.3 35.2-7.1 12-2.6 12.5-2.8 12.3-5.2-.3-2.3-11.8-81-16.7-113.9-1.4-9.1-3.3-21.7-4.2-28s-1.9-11.8-2.3-12.2-4.6-1.1-9.4-1.4l-8.7-.7-6.6-6.4-6.7-6.5-5.3.7-5.3.6-1.9-4.4C114.5 14.5 106 7 100.1 7c-1.1 0-4-1.4-6.3-3C88.3.1 83.9-.4 77.3 1.9M88 9c0 .5-.4 1-.9 1-.4 0-2.8 1.8-5.3 4-5.2 4.5-10.8 14.6-13.4 23.7l-1.7 6.2-7.5 2.6c-4.2 1.3-7.8 2.2-8.1 1.9-.6-.6 3.3-12.2 5.9-17.4 5-9.8 14.2-19.2 21.5-21.8C82.4 7.8 88 7.7 88 9m17.8 7.6c2.1 1.5 7.2 10.2 7.2 12.3 0 .6-1.8 1.6-4.1 2.2-4.8 1.5-5.8.6-5.9-5.1 0-1.9-.4-5.2-.9-7.3-1-4.2 0-4.7 3.7-2.1M94.9 21c.6 2.8 1.1 7.1 1.1 9.5v4.4L86.4 38c-5.3 1.7-9.9 2.8-10.2 2.6-.9-.9 3.7-11.7 6.7-15.8 2.8-3.7 8.6-8.8 10.2-8.8.4 0 1.2 2.3 1.8 5m-.4 52.4c3.3.8 4.9 1.8 4.8 2.7-.1.8-1.9 6.5-4 12.6C91.1 101 91.1 101 84 98.5c-2.3-.8-6.7-1.5-9.7-1.5-8.1 0-12.2 2.8-12.3 8.3 0 4.4 1.4 6.1 10.2 12.5 16.5 11.9 21.1 24.3 15.7 41.8-5.8 18.8-27.4 25.9-48.3 15.9-2.8-1.4-6.6-3.8-8.5-5.3l-3.3-2.8L30 160c1.2-4.1 2.6-8.5 3.1-9.8l.9-2.3 3.3 2.5c5 3.9 11.8 6.6 16.4 6.6 9.9 0 11.2-10.6 2-17.9-12.9-10.5-16.8-16.8-16.8-27.4 0-14.4 5-23.7 17.3-32.6 8.8-6.3 26.3-8.9 38.3-5.7m561.4-29c-14.8 5.7-22.5 14.9-26.7 32.5l-1.7 7.1-4 .1c-4.2.1-7.5.5-7.9 1.1-.6.9-3.3 17.4-2.9 18 .2.5 2.9.8 5.9.8 5.1 0 5.4.1 4.9 2.2-.3 1.3-2.8 14.2-5.6 28.8-2.7 14.6-5.6 29.5-6.3 33.2l-1.3 6.8h12.8c12.5 0 12.9-.1 13.4-2.2.2-1.3 2.1-10.9 4-21.3 7.5-39.6 8.5-45 9-46.2.3-.8 3.5-1.3 9.2-1.5l8.7-.3 1.6-9.3c.9-5 1.3-9.3.8-9.3-.4-.1-1.2-.3-1.8-.4-.5-.1-4.2-.3-8-.4l-7-.1.6-2.8c1.3-6.5 3.8-11.3 7.1-14.2s4-3.1 10.2-2.9l6.6.3 2.3-9.4c1.7-6.8 2-9.6 1.2-10.4-1.7-1.7-20.8-1.8-25.1-.2m-342.1.4c-3 .4-2.6-1-6.8 21.2-1.7 9.1-5.6 29.3-8.6 45s-6.9 35.7-8.5 44.5c-1.7 8.8-3.2 16.8-3.5 17.7-.5 1.7.6 1.8 12.5 1.8h13l1-5.3c.6-2.8 2.8-14.3 4.9-25.3 4.3-22.1 7-29.6 12.9-35.6 4.6-4.8 9.3-6.4 13.3-4.8 3.9 1.6 5.4 5.8 4.7 12.8-.5 4.6-8.3 47.5-10.2 55.9-.5 2.3-.5 2.3 12.5 2.3 7.1 0 13-.3 13-.6s2.5-13.7 5.6-29.8c6.2-32.3 7-43.1 4-50.1-3.7-8.7-10.2-12.1-21.8-11.3-8.2.5-13.6 2.8-19.9 8.5-2.2 2-4.1 3.4-4.4 3.2-.2-.2.9-7.2 2.5-15.4 5.4-27.4 6.3-33.5 5.6-34.3-.8-.7-16.7-1-21.8-.4m277 2.7c-3.8 2.1-7.1 8-7.2 13-.2 8 4.4 12.5 12.6 12.5 13.7 0 19.8-16.6 9.2-24.9-3.2-2.5-10.5-2.8-14.6-.6M251.1 84.6c-9.3 2.5-16.3 7.6-20.8 15.2-3.1 5.2-4.2 15-2.3 20.7 1.7 5.1 7.8 11.6 15.5 16.4 3.4 2.2 7.2 5.2 8.4 6.7 2.1 2.6 2.8 7.9 1.3 10-3.4 5-12.6 5.7-23.7 1.9-3.8-1.3-7.3-2-7.6-1.7-1.2 1.3-5.9 16.5-5.4 17.3 1.4 2.1 12.3 4.9 21.4 5.5 15.5 1.1 27.3-2.7 35.1-11.2 4.8-5.2 6.6-9.1 7.5-16 1.5-10.8-3.2-18.5-17-27.8-10.5-7.2-12.5-9.8-10.4-14.1.8-1.6 2.5-3.5 3.9-4.2 3.3-1.7 12.6-1.6 18.3.1 2.7.8 4.9 1 5.3.5.9-1.5 5.4-15.2 5.4-16.5 0-3.6-24.4-5.6-34.9-2.8m169.8-.2c-11.4 3.3-20.9 10.5-28 21.3-11 16.8-13.5 39-6.2 54 3.1 6.2 7.1 10.1 14.6 14.1 4.8 2.5 6.1 2.7 16.7 2.7 12.5 0 17.4-1.4 26.7-7.7 20.1-13.6 30.2-47.9 20.1-68.3-2.8-5.6-8.4-11.2-14.3-14.3-4.3-2.2-6.5-2.6-15-2.9-6.1-.1-11.8.3-14.6 1.1m14.6 19c5 2.1 6.9 6.5 6.8 15.6-.2 18.3-9.3 36.8-19 38.6-4.5.8-10.3-2.2-12.6-6.6-1.5-2.9-1.8-5.2-1.4-13 .7-15.9 7-30 15.2-34 4.8-2.4 6.5-2.5 11-.6m89.3-19c-5.1 2-8.6 4.3-13.4 8.9l-4.2 3.9.5-6.6.6-6.6h-22.2l-.5 3.2c-.3 1.8-1.5 9.2-2.6 16.5-1.1 7.2-5.9 33.1-10.6 57.5-4.7 24.3-8.8 45.8-9.1 47.6l-.6 3.3 12.9-.3 12.8-.3.8-3.5c.4-1.9 1.9-10 3.3-18 1.5-7.9 2.9-14.8 3.1-15.1.2-.4 2.5 0 5.1.8 6.5 2 19.1 1.2 26.3-1.5 20.6-8 35-34.3 33.8-61.6-.3-8.4-.8-10.2-3.8-16.2-4.8-9.5-10.2-12.8-20.9-13.1-4.6-.2-9 .3-11.3 1.1m4.3 20.6c7.8 4.2 6.1 27.7-3.2 42.1-6 9.3-15.5 13.2-22.9 9.4-3.7-1.9-3.7-2.4-.6-19.4 2.5-13.3 5.9-22.6 9.9-27 5.1-5.5 12-7.6 16.8-5.1M579 85.9c0 1.3-16 85.1-16.6 87.3-.5 1.7.6 1.8 12.4 1.8h12.9l1.6-7.7c2.1-9.9 15.7-80.9 15.7-81.7 0-.3-5.8-.6-13-.6-7.3 0-13 .4-13 .9m97.4 2.3c.4 1.8 2.3 11.8 4.2 22.3 1.9 10.4 4.2 22.4 4.9 26.5 4.6 24.4 5.8 32.7 5.1 35.3-1.5 6.1-16.9 18.8-26.8 22-1.5.5-1.3 1.7 1.8 11.1 2.6 7.8 4 10.6 5.2 10.6 2.8 0 13.8-5.6 19.4-9.9 10-7.5 22.9-24.9 32.6-43.8 6.5-12.8 36.2-75.8 36.2-76.9 0-.3-6-.3-13.2-.2l-13.3.3-4.8 12.5c-4.1 10.8-15.8 41.8-17.2 45.9-.3.8-.7 1.2-1 1-.4-.4-3.4-26.4-5.6-48.2L702.8 85h-27z"
        />
      </g>
      <defs>
        <clipPath id="shopify-clip">
          <rect width="760" height="218" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

function GammaLogo({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1112 285"
      fill="currentColor"
      stroke="currentColor"
    >
      <g clipPath="url(#gamma-clip)" fill="currentColor">
        <path
          fill="currentColor"
          d="M1032.3 47.7c.9.2 2.3.2 3 0 .6-.3-.1-.5-1.8-.5-1.6 0-2.2.2-1.2.5m-919.5 74c8.9.2 23.5.2 32.5 0 8.9-.1 1.6-.3-16.3-.3s-25.2.2-16.2.3m885.4 1.3c0 1.4.2 1.9.5 1.2.2-.6.2-1.8 0-2.5-.3-.6-.5-.1-.5 1.3m9.1 17.7c1.5.2 3.7.2 5 0 1.2-.2 0-.4-2.8-.4-2.7 0-3.8.2-2.2.4m-9.2 42.9c0 1.1.3 1.4.6.6.3-.7.2-1.6-.1-1.9-.3-.4-.6.2-.5 1.3m.3 30.4c0 5.8.1 8.1.3 5.2.2-2.8.2-7.6 0-10.5-.2-2.8-.3-.5-.3 5.3"
        />
        <path
          fill="currentColor"
          d="M420.5 48c-18.8 3.1-35 15.1-43.4 32.1-2.3 4.6-4.6 10.9-5.1 13.9-.6 3.4-.9 31.4-.8 73l.3 67.5 18.9.3c10.4.2 20 .1 21.3-.3l2.3-.5v-66c0-73.1-.3-70.2 6.6-74.9 2.4-1.7 4.8-2.3 8.2-2.3 5.9 0 9.9 1.9 13.2 6.4l2.5 3.3.5 46c.5 41.4.7 46.5 2.4 51 8.9 24.3 27.4 38.9 51.9 41.1 14.8 1.3 31.5-4.8 43.2-15.8 7.4-6.9 11.8-13.3 15.4-22.6l2.6-6.7.5-46 .5-46 2.3-3.8c3-4.7 6.9-6.8 13-6.9 6-.1 10.4 2.1 13.4 6.9l2.3 3.8.5 66.5.5 66.5h41l.3-68.4c.2-75.4.3-74.1-6-87.1-4.5-9.4-16.2-20.9-25.9-25.5-8.1-3.8-18.7-6.5-25.9-6.5-2.5 0-7.6.7-11.5 1.5-19.9 4.2-36.4 18.6-43.8 38.1-2.1 5.7-2.2 7.4-2.7 51.9-.5 45.8-.5 46-2.8 49.7-3.1 4.9-9.9 8.3-15 7.3-5.1-.9-9.3-3.7-11.7-7.7-1.9-3.1-2-5.6-2.5-49.3l-.5-46-2.7-6.9c-6.6-17-20.4-30-37.7-35.6-7.2-2.3-18.6-3.2-25.6-2M716 48c-22 3.2-41.2 20.4-47.7 42.5-1.5 5.4-1.8 12.8-2.1 74.1-.3 58.1-.1 68.2 1.1 69.3 1 .8 7.1 1.1 21.3.9l19.9-.3.5-66.5c.4-59.3.7-66.8 2.1-69.5 2.4-4.3 4.8-6.2 9.7-7.4 5.7-1.6 10.9-.1 15.2 4.4l3.5 3.6.6 45.7c.6 43.6.7 46 2.8 52.5 4.9 15 15.5 27.6 29 34.5 10.3 5.3 15.9 6.7 27.1 6.7 17.2-.1 32.6-7.1 43.9-20.2 2.3-2.6 5.8-8 7.7-12 6-12.3 6.4-16 6.4-62.1 0-33 .3-41.9 1.4-44.6 1.7-4.1 7.1-8.3 11.1-8.7 7.4-.5 9.6.1 13.8 4l4.2 4 .5 67.8.5 67.8h42l.3-67c.2-57.4 0-68-1.3-74-4.6-20.9-18.8-36.4-39.8-43.6-4.7-1.6-8.8-2.2-16.7-2.3-9.2-.1-11.5.3-18.6 2.8-15.4 5.4-27.8 16.3-34.5 30.3-5.3 11.2-5.9 17.1-5.9 62.7 0 41.2 0 41.3-2.2 44.6-3.8 5.5-7.2 7.4-13.1 7.4-4.4.1-6-.4-9.1-2.8-6.6-5-6.6-4.8-6.6-51.4 0-46.8-.4-50.8-7.2-63.5-6.6-12.3-21.5-24.4-34.8-28.1-7.1-1.9-18-2.7-25-1.6m-467 1.9c-9.7 2.6-18.6 7-27 13.2-12.9 9.5-22.4 22.7-27.8 38.4l-2.7 8-.3 62.2-.3 62.3H233v-54h70l.2 26.7.3 26.8 20.3.5c14.9.4 20.6.2 21.3-.7.7-.7.9-22.8.6-60-.4-65.2-.5-65.9-7.1-80-10.7-22.5-29.3-37.9-52.7-43.7-8.9-2.2-28.1-2-36.9.3m34.3 43.5c7.1 3.4 14.9 11.9 17.5 18.9 1.5 3.8 2.1 8.5 2.4 16.5l.3 11.2h-70.7l.4-12.3c.5-13.7 1.9-18 8.4-25.5 7.5-8.8 15.8-12.3 28-11.9 6.4.3 9.3.9 13.7 3.1M1014.2 50c-13.9 3.9-27.1 11.8-36.7 22.1-9.4 10-14.5 19-18.9 33.4-2 6.8-2.1 8.6-2.1 68v61h41l.3-27.3.2-27.2h71l.2 27.2.3 27.3h41v-61c0-67.5.1-65.9-6.7-80.8-8.7-18.9-25.6-34.1-45.6-41-7.8-2.7-10.2-3.1-22.7-3.4-11.7-.2-15.2 0-21.3 1.7m34 43.3c7 3.2 13.8 10 17.3 17.3 2.7 5.5 2.9 6.8 2.9 17.9l.1 12h-70l-.3-8.8c-.6-17.1 4.6-28.2 17.1-36.5 8.6-5.7 22.9-6.6 32.9-1.9M86 49.7c-35.2 3.4-66.8 27-79.5 59.2-8 20.6-8 45.4.2 65.9 10.1 25.4 32.5 46.5 57.8 54.6 13.4 4.2 18.1 4.6 60.1 4.6H165l-.2-56-.3-56-38.5-.1H85.7c-1.6.1-1.7 1.5-1.5 19.3l.3 19.3 18.8.3 18.7.2v31.2l-19.2-.4-19.3-.3-7.8-3.8C63 181.5 52.9 170 49 157.2c-2.4-7.8-2.6-20.3-.5-28.7 4.9-18.7 21.8-33.7 41-36.5 3.9-.5 22.4-1 41.3-1H165V49l-37.7.2c-20.8 0-39.4.3-41.3.5"
        />

        
      </g>
      <defs>
        <clipPath id="gamma-clip">
          <rect width="1112" height="285" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

function HeaderRowContent({
  data,
  bgClass = "",
  textClass = "text-white",
  isActive = false,
}) {
  const logoColorClass = isActive
    ? "text-white"
    : "text-white/40 group-hover:text-white/80";

  return (
    <div
      className={`mr-header-row w-full grid grid-cols-[auto_1fr_auto] sm:grid-cols-12 items-center gap-x-3 sm:gap-x-0 ${bgClass}`}
      style={{ padding: "1.75rem clamp(1rem, 4vw, 3rem)" }}
    >
      <span
        className={`sm:col-span-3 font-bricolage text-[#FF6F21]`}
        style={{ fontSize: "clamp(1.25rem, 2.8vw, 3.25rem)" }}
      >
        {data.id}
      </span>
      <h3
        className={`sm:col-span-7 sm:col-start-4 font-bricolage leading-none ${textClass}`}
        style={{ fontSize: "clamp(1.4rem, 3.2vw, 3.75rem)" }}
      >
        {data.brand}
      </h3>
      <div className="sm:col-span-2 flex justify-end">
        {data.logo === "whisper" || data.logo === "tnf" ? (
          <WhisperLogo
            className={`h-10 md:h-13 4xl:h-16 5xl:h-20 w-auto ${logoColorClass} transition-colors duration-300`}
          />
        ) : data.logo === "Gamma" ? (
          <GammaLogo
            className={`h-10 md:h-13 4xl:h-16 5xl:h-20 w-auto ${logoColorClass} transition-colors duration-300`}
          />
        ) : (
          <ShopifyLogo
            className={`h-9 md:h-12 4xl:h-14 5xl:h-18 w-auto ${logoColorClass} transition-colors duration-300`}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Corner marks ─── */
function CornerLeft({ className = "" }) {
  return (
    <svg
      width="5"
      height="9"
      viewBox="0 0 5 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.5 0.5L0.5 8.5M0.5 4.5L4.5 4.5"
        stroke="#FF6F21"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CornerRight({ className = "" }) {
  return (
    <svg
      width="5"
      height="9"
      viewBox="0 0 5 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.5 0.5L4.5 8.5M0.5 4.5H4.5"
        stroke="#FF6F21"
        strokeLinecap="round"
      />
    </svg>
  );
}

const HOVER_BG = "#1a1a1a";
const BG_WIPE_COLORS = ["#3a3a3a", "#252525", "#171717", HOVER_BG];

const caseStudies = [
  {
    id: "01",
    brand: "Wispr Flow",
    logo: "whisper",
    link: "https://app.notion.com/p/3bd2f6cae24b8113be01eb626272f901",
    tagline: "Proving a product people stopped believing in",
    objective:
      "Convert a category users had already written off into paid subscribers through demonstration-led creator content.",
    execution:
      "Built single-take unedited proof demos, real-context whisper tests, and creator workflow content engineered for disbelief-to-install conversion.",
    stats: [
      { value: "28.6M+", label: "Organic Views" },
      { value: "264K+", label: "Views" },
      { value: "19480", label: "App Installs" },
    ],
  },
  {
    id: "02",
    brand: "Shopify",
    logo: "shopify",
    link: "https://app.notion.com/p/3bd2f6cae24b811ca53ec28b0b3db32b",
    tagline: "Manufacturing Intent before the search",
    objective:
      "Capture first-time founders at the moment of intent through creator-led education, before they default to a marketplace.",
    execution:
      "Built an archetype-cast creator engine, founder-proof content series, and save-optimized short-form engineered for late-night intent windows.",
    stats: [
      { value: "22M+", label: "Organic Views" },
      { value: "23.5K+", label: "Free Trial Started" },
      { value: "5076 ", label: "Pro Subscribers" },
    ],
  },
  {
    id: "03",
    brand: "Gamma",
    logo: "Gamma",
    link: "https://app.notion.com/p/3bd2f6cae24b81ce8fafe4f05f3d676e",
    tagline: "Breaking the legitimacy ceiling",
    objective:
      "Move Gamma from the tool people use when a deck doesn't matter to the one they use when it decides something.",
    execution:
      "Built craft-led rebuild content, real-stakes proof formats, and format-bending demos engineered to raise perceived output quality.",
    stats: [
      { value: "34.8M+", label: "Organic Views" },
      { value: "318K+", label: "Signups" },
      { value: "18", label: "Paid Subscribers" },
    ],
  },
];

const getCaseStudy = (index) => caseStudies[index] ?? caseStudies[0] ?? null;

const INNER_PAD = "clamp(1rem, 4vw, 3rem)";

/* ─────────────────────────────────────────────
   Accordion Item
   ───────────────────────────────────────────── */
function AccordionItem({
  data,
  isActive,
  onClick,
  containerRef,
  headerRef,
  contentWrapRef,
  contentInnerRef,
  expandedHeight, // number (desktop target) or null (mobile -> use "auto")
  absolutePos, // { top: number } on desktop, null on mobile
}) {
  if (!data) return null;

  const bgLayersRef = useRef(null);
  const taglineRef = useRef(null);
  const objLabelRef = useRef(null);
  const objTextRef = useRef(null);
  const execLabelRef = useRef(null);
  const execTextRef = useRef(null);
  const linkRef = useRef(null);
  const statsRef = useRef(null);
  const tlRef = useRef(null);
  const closeTlRef = useRef(null);
  // Store resolved elements + split instances so the close handler can access them.
  const closeTargetsRef = useRef(null);

  // Cursor-follow "Click me" label
  const cursorLabelRef = useRef(null);
  const cursorCornersRef = useRef(null);
  const isHoveringRef = useRef(false);
  const isActiveRef = useRef(isActive);
  const showCursorLabelRef = useRef(null);
  const hideCursorLabelRef = useRef(null);

  // Play forward for open, run custom synchronized close for close.
  useEffect(() => {
    if (!tlRef.current || !closeTargetsRef.current) return;

    const t = closeTargetsRef.current;

    if (isActive) {
      // Kill any running close timeline (doesn't touch forward timeline's tweens),
      // then re-record starting values from current element state and play forward.
      closeTlRef.current?.kill();
      closeTlRef.current = null;
      tlRef.current.invalidate().restart();
    } else {
      // Stop forward timeline, kill any previous close, build synchronized close.
      tlRef.current.pause();
      closeTlRef.current?.kill();

      const D = 0.5;
      const closeTl = gsap.timeline();
      closeTl.to(
        t.contentWrap,
        { height: 0, duration: D, ease: "power4.inOut" },
        0,
      );
      closeTl.to(
        t.bgLayers,
        {
          scaleY: 0,
          duration: D * 0.85,
          stagger: { amount: 0.1, from: "end" },
          ease: "power3.inOut",
        },
        0,
      );
      closeTl.to(
        t.contentInner,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: D * 0.7,
          ease: "power3.inOut",
        },
        0,
      );
      closeTl.to(
        [t.tagline, t.objLabel, t.execLabel, t.link],
        {
          opacity: 0,
          y: 10,
          duration: D * 0.4,
          ease: "power2.in",
        },
        0,
      );
      closeTl.to(
        t.objLines,
        { yPercent: 110, duration: D * 0.5, stagger: 0.02, ease: "power3.in" },
        0,
      );
      closeTl.to(
        t.execLines,
        { yPercent: 110, duration: D * 0.5, stagger: 0.02, ease: "power3.in" },
        0,
      );
      closeTl.to(
        t.statItems,
        {
          opacity: 0,
          y: 20,
          duration: D * 0.4,
          stagger: 0.03,
          ease: "power2.in",
        },
        0,
      );

      closeTlRef.current = closeTl;
    }
  }, [isActive]);

  // Mirror isActive into a ref so hover handlers see the latest value
  // without re-binding listeners. If the user opens the accordion while
  // hovering, force the label to hide.
  useEffect(() => {
    isActiveRef.current = isActive;
    if (isActive && isHoveringRef.current && hideCursorLabelRef.current) {
      hideCursorLabelRef.current();
    }
  }, [isActive]);

  // Build (and rebuild) the content expansion timeline.
  // Rebuilds whenever expandedHeight changes (e.g. viewport resize).
  useGSAP(
    () => {
      let cancelled = false;
      fontReady.then(() => {
        if (cancelled) return;

        const bgLayers =
          bgLayersRef.current?.querySelectorAll(".bg-wipe-layer") || [];
        const statItems =
          statsRef.current?.querySelectorAll(".stat-item") || [];

        const objSplit = SplitText.create(objTextRef.current, {
          type: "lines",
          mask: "lines",
          linesClass: "mr-obj-line",
        });
        objSplit.lines.forEach((line) => {
          if (line.parentElement)
            line.parentElement.style.paddingBottom = "0.08em";
        });

        const execSplit = SplitText.create(execTextRef.current, {
          type: "lines",
          mask: "lines",
          linesClass: "mr-exec-line",
        });
        execSplit.lines.forEach((line) => {
          if (line.parentElement)
            line.parentElement.style.paddingBottom = "0.05em";
        });

        gsap.set(bgLayers, { scaleY: 0, transformOrigin: "top" });
        gsap.set(contentWrapRef.current, { height: 0, overflow: "hidden" });
        gsap.set(contentInnerRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        });
        gsap.set(objSplit.lines, { yPercent: 110 });
        gsap.set(execSplit.lines, { yPercent: 110 });
        gsap.set(taglineRef.current, { opacity: 0, y: 20 });
        gsap.set(objLabelRef.current, { opacity: 0, y: 14 });
        gsap.set(execLabelRef.current, { opacity: 0, y: 14 });
        gsap.set(linkRef.current, { opacity: 0, y: 10 });
        gsap.set(statItems, { opacity: 0, y: 30 });

        // Stash all elements + split results for the custom close handler.
        closeTargetsRef.current = {
          bgLayers,
          contentWrap: contentWrapRef.current,
          contentInner: contentInnerRef.current,
          tagline: taglineRef.current,
          objLabel: objLabelRef.current,
          execLabel: execLabelRef.current,
          link: linkRef.current,
          statItems,
          objLines: objSplit.lines,
          execLines: execSplit.lines,
        };

        const heightTarget = expandedHeight != null ? expandedHeight : "auto";
        const tl = gsap.timeline({ paused: true });

        tl.to(bgLayers, {
          scaleY: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.inOut",
        });
        tl.to(
          contentWrapRef.current,
          { height: heightTarget, duration: 0.65, ease: "power4.inOut" },
          "<0.15",
        );
        tl.to(
          contentInnerRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.65,
            ease: "power3.inOut",
          },
          "-=0.45",
        );
        tl.to(
          taglineRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" },
          "-=0.3",
        );
        tl.to(
          objLabelRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power4.out" },
          "-=0.35",
        );
        tl.to(
          objSplit.lines,
          { yPercent: 0, duration: 0.65, stagger: 0.04, ease: "power3.out" },
          "-=0.3",
        );
        tl.to(
          execLabelRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power4.out" },
          "-=0.35",
        );
        tl.to(
          execSplit.lines,
          { yPercent: 0, duration: 0.6, stagger: 0.04, ease: "power3.out" },
          "-=0.3",
        );
        tl.to(
          linkRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power4.out" },
          "-=0.25",
        );
        tl.to(
          statItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "back.out(1.4)",
          },
          "-=0.45",
        );

        tlRef.current = tl;

        // If item was already active when rebuild triggered (e.g. resize), replay from start.
        if (isActive) tl.invalidate().restart();
      });
      return () => {
        cancelled = true;
      };
    },
    { scope: containerRef, dependencies: [expandedHeight] },
  );

  // ── Cursor-follow "Click me" label (desktop only) ──
  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (!mql.matches) return;

      const trackEl = containerRef.current || headerRef.current;
      const header = headerRef.current;
      const label = cursorLabelRef.current;
      const cornersWrap = cursorCornersRef.current;
      if (!trackEl || !header || !label || !cornersWrap) return;

      const corners = cornersWrap.querySelectorAll("path");

      // Initial state: hidden, centered on cursor via xPercent/yPercent
      gsap.set(label, {
        opacity: 0,
        scale: 0.85,
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
      });
      gsap.set(corners, { drawSVG: "50% 50%" });

      let xTo = gsap.quickTo(label, "x", { duration: 0.4, ease: "power3.out" });
      let yTo = gsap.quickTo(label, "y", { duration: 0.4, ease: "power3.out" });
      let rotateTo = gsap.quickTo(label, "rotation", {
        duration: 0.6,
        ease: "power3.out",
      });
      let lastX = 0;
      let lastT = 0;

      let activeTl = null;

      const show = () => {
        activeTl?.kill();
        activeTl = gsap
          .timeline()
          .to(
            label,
            { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
            0,
          )
          .to(
            corners,
            { drawSVG: "0% 100%", duration: 0.55, ease: "power3.out" },
            0,
          );
      };

      const hide = () => {
        activeTl?.kill();
        activeTl = gsap
          .timeline()
          .to(
            label,
            { opacity: 0, scale: 0.85, duration: 0.3, ease: "power3.in" },
            0,
          )
          .to(
            corners,
            { drawSVG: "50% 50%", duration: 0.3, ease: "power3.in" },
            0,
          );
      };

      showCursorLabelRef.current = show;
      hideCursorLabelRef.current = hide;

      const onEnter = (e) => {
        if (isActiveRef.current) return;
        isHoveringRef.current = true;
        const rect = trackEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Kill stale tweens from previous hover cycle
        gsap.killTweensOf(label, "x,y,rotation");
        // Snap to cursor
        gsap.set(label, { x, y, rotation: 0 });
        // Recreate quickTo functions so they start fresh from current position
        xTo = gsap.quickTo(label, "x", { duration: 0.4, ease: "power3.out" });
        yTo = gsap.quickTo(label, "y", { duration: 0.4, ease: "power3.out" });
        rotateTo = gsap.quickTo(label, "rotation", {
          duration: 0.6,
          ease: "power3.out",
        });
        lastX = x;
        lastT = 0;
        show();
      };

      const onMove = (e) => {
        if (!isHoveringRef.current || isActiveRef.current) return;
        const rect = trackEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        xTo(x);
        yTo(y);

        // Velocity-based tilt: clamp to ±15deg
        const now = performance.now();
        const dt = now - lastT;
        if (dt > 0 && lastT !== 0) {
          const vx = (x - lastX) / dt; // px per ms
          const tilt = gsap.utils.clamp(-15, 15, vx * 8);
          rotateTo(tilt);
        }
        lastX = x;
        lastT = now;
      };

      const onLeave = () => {
        if (!isHoveringRef.current) return;
        isHoveringRef.current = false;
        lastT = 0;
        rotateTo(0);
        hide();
      };

      trackEl.addEventListener("pointerenter", onEnter);
      trackEl.addEventListener("pointermove", onMove);
      trackEl.addEventListener("pointerleave", onLeave);

      return () => {
        trackEl.removeEventListener("pointerenter", onEnter);
        trackEl.removeEventListener("pointermove", onMove);
        trackEl.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: containerRef },
  );

  const itemStyle = absolutePos
    ? { position: "absolute", top: absolutePos.top, left: 0, right: 0 }
    : undefined;

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer group"
      onClick={onClick}
      style={itemStyle}
    >
      <div
        ref={bgLayersRef}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {BG_WIPE_COLORS.map((color, i) => (
          <div
            key={i}
            className="bg-wipe-layer absolute inset-0"
            style={{ backgroundColor: color, zIndex: i }}
          />
        ))}
      </div>

      <div ref={headerRef} className="relative z-10">
        <HeaderRowContent
          data={data}
          bgClass="border-t border-[#FF6F21]/70"
          textClass="text-white"
          isActive={isActive}
        />

        {/* Cursor-follow expand icon — desktop only via JS gating */}
        <div
          ref={cursorLabelRef}
          className="pointer-events-none absolute top-0 left-0 z-30 will-change-transform hidden lg:block"
          aria-hidden="true"
        >
          <div ref={cursorCornersRef} className="relative px-5 py-5">
            {/* Radial glow halo behind the icon */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,111,33,0.18) 0%, transparent 72%)",
                filter: "blur(6px)",
              }}
            />
            <svg
              className="absolute top-0 left-0 overflow-visible"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ filter: "drop-shadow(0 0 3px #FF6F21)" }}
            >
              <path
                d="M13 1 L1 1 L1 13"
                stroke="#FF6F21"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="absolute top-0 right-0 overflow-visible"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ filter: "drop-shadow(0 0 3px #FF6F21)" }}
            >
              <path
                d="M1 1 L13 1 L13 13"
                stroke="#FF6F21"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="absolute bottom-0 left-0 overflow-visible"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ filter: "drop-shadow(0 0 3px #FF6F21)" }}
            >
              <path
                d="M1 1 L1 13 L13 13"
                stroke="#FF6F21"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="absolute bottom-0 right-0 overflow-visible"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ filter: "drop-shadow(0 0 3px #FF6F21)" }}
            >
              <path
                d="M13 1 L13 13 L1 13"
                stroke="#FF6F21"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex items-center gap-1">
              {/* Text */}
              <span
                className="text-[#FF6F21] text-[20px] font-host font-semibold whitespace-nowrap leading-none tracking-tight"
                style={{ filter: "drop-shadow(0 0 2px #FF6F21)" }}
              >
                Open Report
              </span>
              <span
                className="text-[#FF6F21] text-[20px] font-host font-semibold whitespace-nowrap leading-none tracking-tight"
                style={{ filter: "drop-shadow(0 0 2px #FF6F21)" }}
              ></span>
              {/* Folder Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: "drop-shadow(0 0 3px #FF6F21)" }}
              >
                <path
                  d="M3 6c0-1.1.9-2 2-2h6l2-2h8c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6z"
                  stroke="#FF6F21"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div ref={contentWrapRef} className="relative z-10 -mt-px">
        <div
          ref={contentInnerRef}
          className="relative z-10"
          style={{ padding: `1.25rem ${INNER_PAD} 3rem` }}
        >
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-16 md:mb-20">
            <div ref={taglineRef} className="col-span-12 md:col-span-3 pt-4">
              <p className="font-host text-sm 4xl:text-base 5xl:text-lg font-thin text-white/50 whitespace-pre-line leading-none tracking-tight">
                {data.tagline}
              </p>
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-4">
              <span
                ref={objLabelRef}
                className="inline-block font-host text-sm 4xl:text-base 5xl:text-lg tracking-[0.15em] uppercase text-white mb-1.5"
              >
                OBJECTIVE
              </span>
              <p
                ref={objTextRef}
                className="mr-obj-text font-host text-white/80 leading-none"
                style={{ fontSize: "clamp(1.25rem, 1.9vw, 2rem)" }}
              >
                {data.objective}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <span
                ref={execLabelRef}
                className="inline-block font-host text-xs 4xl:text-sm 5xl:text-base tracking-[0.15em] uppercase text-white mb-3"
              >
                EXECUTION
              </span>
              <p
                ref={execTextRef}
                className="font-host text-sm 4xl:text-base 5xl:text-lg font-thin text-white/50 leading-none tracking-tight mb-0"
              >
                {data.execution}
              </p>
              <a
                ref={linkRef}
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 font-host text-sm text-white/40 hover:text-[#FF6F21] transition-colors duration-300 underline underline-offset-4 decoration-white/15 hover:decoration-[#FF6F21]/50"
              >
                View full case study <span className="text-xs">→</span>
              </a>
            </div>
            <div
              ref={statsRef}
              className="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-2"
            >
              {data.stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <span
                    className="mr-stat-value block font-host text-[#FF6F21] leading-none mb-2"
                    style={{ fontSize: "clamp(1.75rem, 2.8vw, 3rem)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="block font-host text-xs md:text-sm 4xl:text-base 5xl:text-lg text-white/40 leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MissionReports Section
   ───────────────────────────────────────────── */
export default function MissionReports() {
  const sectionRef = useRef(null);
  const headerContentRef = useRef(null);
  const stageRef = useRef(null);
  const paragraphAreaRef = useRef(null);

  // Item refs (owned by parent so we can drive translations + measure)
  const item1ContainerRef = useRef(null);
  const item1HeaderRef = useRef(null);
  const item1ContentWrapRef = useRef(null);
  const item1ContentInnerRef = useRef(null);

  const item2ContainerRef = useRef(null);
  const item2HeaderRef = useRef(null);
  const item2ContentWrapRef = useRef(null);
  const item2ContentInnerRef = useRef(null);

  const item3ContainerRef = useRef(null);
  const item3HeaderRef = useRef(null);
  const item3ContentWrapRef = useRef(null);
  const item3ContentInnerRef = useRef(null);

  const tapHintRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  // { reservedH, headerH, isDesktop } — null until measured
  const [dims, setDims] = useState(null);

  const handleClick = useCallback((i) => {
    setActiveIndex((prev) => (prev === i ? -1 : i));
  }, []);

  /* ── Measurement: after fonts load and on resize ── */
  useEffect(() => {
    let cancelled = false;
    let onResize = null;

    fontReady.then(() => {
      if (cancelled) return;

      const measure = () => {
        if (!paragraphAreaRef.current || !item1HeaderRef.current) return;

        // contentInner renders at natural height even though its parent (contentWrap)
        // is clipped via height:0 — so offsetHeight gives us what we need.
        const paragraphH = paragraphAreaRef.current.offsetHeight || 0;
        const item1H = item1ContentInnerRef.current?.offsetHeight || 0;
        const item2H = item2ContentInnerRef.current?.offsetHeight || 0;
        const item3H = item3ContentInnerRef.current?.offsetHeight || 0;
        const headerH = item1HeaderRef.current.offsetHeight || 0;

        // contentH = natural height of the tallest case study's expanded content.
        // This is exactly how far items translate up to make room below.
        const contentH = Math.max(item1H, item2H, item3H);

        const isDesktop = true; // translate-up enabled on all screen sizes
        setDims({ contentH, paragraphH, headerH, isDesktop });
      };

      measure();
      onResize = () => measure();
      window.addEventListener("resize", onResize);
    });

    return () => {
      cancelled = true;
      if (onResize) window.removeEventListener("resize", onResize);
    };
  }, []);

  // Track previous active index to determine direction of each item's translate
  const prevActiveRef = useRef(-1);

  /* ── Animation coordinator: translate items when activeIndex changes (desktop only) ── */
  useEffect(() => {
    if (!dims || !dims.isDesktop) return;

    const { contentH } = dims;
    const prev = prevActiveRef.current;
    prevActiveRef.current = activeIndex;

    // Rule: item i translates up by contentH if i <= activeIndex.
    const newItem1Y = activeIndex >= 0 ? -contentH : 0;
    const newItem2Y = activeIndex >= 1 ? -contentH : 0;
    const newItem3Y = activeIndex >= 2 ? -contentH : 0;
    const prevItem1Y = prev >= 0 ? -contentH : 0;
    const prevItem2Y = prev >= 1 ? -contentH : 0;
    const prevItem3Y = prev >= 2 ? -contentH : 0;

    // Sync with content timeline:
    //   OPEN  → forward timeline's height tween runs 0.15s to 0.80s of its timeline.
    //           Delay 0.15 so translate starts when the container begins growing.
    //   CLOSE → custom synchronized close runs over 0.5s with height tween driving motion.
    //           Delay 0 so translate starts immediately alongside everything else.
    const OPEN_DELAY = 0.15;
    const OPEN_DURATION = 0.65;
    const CLOSE_DELAY = 0;
    const CLOSE_DURATION = 0.5;

    const animate = (target, from, to) => {
      if (from === to) return;
      const goingUp = to < from;
      gsap.to(target, {
        y: to,
        duration: goingUp ? OPEN_DURATION : CLOSE_DURATION,
        delay: goingUp ? OPEN_DELAY : CLOSE_DELAY,
        ease: "power4.inOut",
        overwrite: "auto",
      });
    };

    animate(item1ContainerRef.current, prevItem1Y, newItem1Y);
    animate(item2ContainerRef.current, prevItem2Y, newItem2Y);
    animate(item3ContainerRef.current, prevItem3Y, newItem3Y);

    // Fade paragraph area + tap hint out when accordion opens, in when it closes.
    // Synced with the translate so they feel like one motion.
    const wasActive = prev !== -1;
    const isActive = activeIndex !== -1;
    if (wasActive !== isActive) {
      if (paragraphAreaRef.current) {
        gsap.to(paragraphAreaRef.current, {
          opacity: isActive ? 0 : 1,
          duration: isActive ? OPEN_DURATION : CLOSE_DURATION,
          delay: isActive ? OPEN_DELAY : CLOSE_DELAY,
          ease: "power4.inOut",
          overwrite: "auto",
        });
      }
      if (tapHintRef.current) {
        gsap.to(tapHintRef.current, {
          opacity: isActive ? 0 : 1,
          duration: 0.3,
          delay: 0,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    }
  }, [activeIndex, dims]);

  /* ── Reset any translates if we swap from desktop to mobile on resize ── */
  useEffect(() => {
    if (!dims) return;
    if (!dims.isDesktop) {
      gsap.set(
        [
          item1ContainerRef.current,
          item2ContainerRef.current,
          item3ContainerRef.current,
        ],
        { y: 0, clearProps: "transform" },
      );
    }
  }, [dims]);

  /* ── Scroll-triggered text reveal on header content ── */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      let cancelled = false;
      fontReady.then(() => {
        if (cancelled) return;

        const headingSplit = SplitText.create(".mr-heading", {
          type: "lines",
          mask: "lines",
          linesClass: "mr-h-line",
        });
        headingSplit.lines.forEach((line) => {
          if (line.parentElement)
            line.parentElement.style.paddingBottom = "0.1em";
        });

        const labelSplit = SplitText.create(".mr-label", {
          type: "lines",
          mask: "lines",
          linesClass: "mr-l-line",
        });

        const tagSplits = [];
        sectionRef.current.querySelectorAll(".mr-tag").forEach((el) => {
          const split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "mr-t-line",
          });
          tagSplits.push(split);
        });
        const tagLines = tagSplits.flatMap((s) => s.lines);

        const paraSplit = SplitText.create(".mr-para", {
          type: "lines",
          mask: "lines",
          linesClass: "mr-p-line",
        });
        paraSplit.lines.forEach((line) => {
          if (line.parentElement)
            line.parentElement.style.paddingBottom = "0.08em";
        });

        gsap.set(headingSplit.lines, { y: "100%" });
        gsap.set(labelSplit.lines, { y: "100%" });
        gsap.set(tagLines, { y: "100%" });
        gsap.set(paraSplit.lines, { y: "100%" });

        gsap.to(headingSplit.lines, {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerContentRef.current,
            start: "top 75%",
            once: true,
          },
        });
        gsap.to(labelSplit.lines, {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: headerContentRef.current,
            start: "top 75%",
            once: true,
          },
        });
        gsap.to(tagLines, {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.3,
          scrollTrigger: { trigger: ".mr-para", start: "top 85%", once: true },
        });
        gsap.to(paraSplit.lines, {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.3,
          scrollTrigger: { trigger: ".mr-para", start: "top 80%", once: true },
        });
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: sectionRef },
  );

  // Derived values for the layout
  const isDesktopLayout = !!(dims && dims.isDesktop);
  // GAP = space between the bottom of the paragraph area and the first accordion header.
  const GAP = 140; // px — adjust to taste
  // layoutH is the space reserved above the items (paragraph area).
  // Must be >= contentH - GAP so translated items don't go above stage top.
  const layoutH = isDesktopLayout
    ? Math.max(dims.paragraphH, dims.contentH - GAP)
    : 0;
  // Content expands to its natural height (auto).
  const expandedHeight = null;

  const stageStyle = isDesktopLayout
    ? { position: "relative", height: layoutH + GAP + 3 * dims.headerH }
    : undefined;

  const paragraphStyle = isDesktopLayout
    ? { position: "absolute", top: 0, left: 0, right: 0, height: layoutH }
    : undefined;

  const item1AbsolutePos = isDesktopLayout ? { top: layoutH + GAP } : null;
  const item2AbsolutePos = isDesktopLayout
    ? { top: layoutH + GAP + dims.headerH }
    : null;
  const item3AbsolutePos = isDesktopLayout
    ? { top: layoutH + GAP + 2 * dims.headerH }
    : null;

  // Mobile tap hint sits just above the first accordion header
  const hintStyle = isDesktopLayout
    ? { position: "absolute", top: layoutH + GAP - 36, left: 0, right: 0 }
    : undefined;

  const bottomBorderStyle = isDesktopLayout
    ? { position: "absolute", bottom: 0, left: 0, right: 0 }
    : undefined;

  return (
    <>
      <style>{`
      @media (min-width: 160rem) {
        .mr-heading { font-size: 4.5rem !important; }
        .mr-stat-value { font-size: 3.5rem !important; }
        .mr-header-row { padding-left: 4rem !important; padding-right: 4rem !important; }
        .mr-header-row span:first-child { font-size: 4rem !important; }
        .mr-header-row h3 { font-size: 4.5rem !important; }
        .mr-header-content { padding-left: 4rem !important; padding-right: 4rem !important; }
      }
      @keyframes mr-arrow-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(8px); }
      }
      .mr-tap-hint { animation: mr-arrow-bounce 1.6s ease-in-out infinite; }
      @media (min-width: 240rem) {
        .mr-heading { font-size: 5.5rem !important; }
        .mr-para { font-size: 4rem !important; }
        .mr-obj-text { font-size: 2.5rem !important; }
        .mr-stat-value { font-size: 4.5rem !important; }
        .mr-header-row { padding-left: 5rem !important; padding-right: 5rem !important; }
        .mr-header-row span:first-child { font-size: 5rem !important; }
        .mr-header-row h3 { font-size: 5.5rem !important; }
        .mr-header-content { padding-left: 5rem !important; padding-right: 5rem !important; }
      }
    `}</style>
      <section
        ref={sectionRef}
        id="reports"
        className="mission-reports-section relative w-full"
      >
        <GlobalTexture />
        <div className="relative mx-auto w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem]">
          <div
            className="pointer-events-none absolute top-0 left-0 w-px h-full bg-white/20 z-50"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-0 right-0 w-px h-full bg-white/20 z-50"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-white/20 z-50"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/20 z-50"
            aria-hidden="true"
          />

          <CornerLeft className="pointer-events-none absolute z-50 top-0 left-0 -translate-y-1/2" />
          <CornerRight className="pointer-events-none absolute z-50 top-0 right-0 -translate-y-1/2" />
          <CornerLeft className="pointer-events-none absolute z-50 bottom-0 left-0 translate-y-1/2" />
          <CornerRight className="pointer-events-none absolute z-50 bottom-0 right-0 translate-y-1/2" />

          {/* Heading + glow line */}
          <div
            ref={headerContentRef}
            className="mr-header-content relative z-40"
            style={{
              padding: "clamp(4rem, 6vw, 6rem) clamp(0.75rem, 3vw, 3rem) 0",
            }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between mb-3">
              <h2
                className="mr-heading font-host text-white leading-none tracking-tight"
                style={{ fontSize: "clamp(2.25rem, 3.2vw, 3.75rem)" }}
              >
                Mission Reports
              </h2>
              <span className="mr-label font-host text-xs md:text-sm 4xl:text-base 5xl:text-lg tracking-tight uppercase text-[#FF6F21] shrink-0 sm:ml-4">
                CASE STUDIES
              </span>
            </div>
            <GlowLine />
          </div>

          {/* Stage: paragraph + accordion items. Overflow hidden clips translated items to the stage bounds. */}
          <div
            ref={stageRef}
            className="relative z-40 overflow-hidden"
            style={stageStyle}
          >
            {/* Paragraph area — inside the stage on desktop, in flow on mobile */}
            <div
              ref={paragraphAreaRef}
              style={paragraphStyle}
              className={
                isDesktopLayout ? "" : "mr-header-content px-4 sm:px-6 md:px-8"
              }
            >
              <div
                className={
                  isDesktopLayout
                    ? "grid grid-cols-12 gap-x-4 sm:gap-x-10 gap-y-4 md:gap-y-5 lg:gap-y-8 h-full"
                    : "grid grid-cols-12 gap-x-4 sm:gap-x-10 gap-y-8 mt-8 md:mt-10 mb-20 md:mb-28"
                }
                style={
                  isDesktopLayout
                    ? { padding: "2rem clamp(1.25rem, 3vw, 3rem)" }
                    : undefined
                }
              >
                <div className="col-span-12 lg:col-span-5 flex flex-col">
                  <div className="hidden md:flex flex-wrap md:flex-row gap-x-8 gap-y-2 mb-auto justify-between">
                    {[
                      "Real distribution",
                      "Real operations",
                      "Measurable outcomes",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="mr-tag font-host text-sm 4xl:text-base 5xl:text-lg font-thin text-white tracking-tight"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-5 lg:col-start-8">
                  <p
                    className="mr-para font-bricolage text-white leading-[0.95] font-light tracking-tight"
                    style={{ fontSize: "clamp(2.3rem, 2.8vw, 3.2rem)" }}
                  >
                    Every mission is executed through high&#8209;volume content,
                    precise signals, and engineered feedback loops turning
                    attention into traffic, and traffic into results.
                  </p>
                </div>
              </div>
            </div>

            {/* Tap hint — visible only on screens smaller than lg, sits just above the first accordion */}
            <div
              ref={tapHintRef}
              className="lg:hidden flex justify-center pointer-events-none"
              style={hintStyle}
            >
              <svg
                className="mr-tap-hint"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M11 3 L11 18 M4 11 L11 18 L18 11"
                  stroke="#FF6F21"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Accordion items */}
            <AccordionItem
              data={getCaseStudy(0)}
              isActive={activeIndex === 0}
              onClick={() => handleClick(0)}
              containerRef={item1ContainerRef}
              headerRef={item1HeaderRef}
              contentWrapRef={item1ContentWrapRef}
              contentInnerRef={item1ContentInnerRef}
              expandedHeight={expandedHeight}
              absolutePos={item1AbsolutePos}
            />
            <AccordionItem
              data={getCaseStudy(1)}
              isActive={activeIndex === 1}
              onClick={() => handleClick(1)}
              containerRef={item2ContainerRef}
              headerRef={item2HeaderRef}
              contentWrapRef={item2ContentWrapRef}
              contentInnerRef={item2ContentInnerRef}
              expandedHeight={expandedHeight}
              absolutePos={item2AbsolutePos}
            />
            <AccordionItem
              data={getCaseStudy(2)}
              isActive={activeIndex === 2}
              onClick={() => handleClick(2)}
              containerRef={item3ContainerRef}
              headerRef={item3HeaderRef}
              contentWrapRef={item3ContentWrapRef}
              contentInnerRef={item3ContentInnerRef}
              expandedHeight={expandedHeight}
              absolutePos={item3AbsolutePos}
            />

            <div className="h-px bg-[#FF6F21]/70" style={bottomBorderStyle} />
          </div>
        </div>
      </section>
    </>
  );
}
