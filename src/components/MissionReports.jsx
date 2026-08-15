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
function TNFLogo({ className = "" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2172 724" fill="currentColor" stroke="currentColor">
      <g clipPath="url(#tnf-clip)" fill="currentColor">

       
      <path
          fill="currentColor"
        d="M181.5 131.9c-10.8 2.8-19.8 10.2-24.3 19.9l-2.7 5.7v410l2.8 5.7c3.2 6.6 11 14.1 17.7 17.1 7 3.2 19.9 3.5 27.3.7 7.6-2.9 16.6-11.2 19.8-18.2l2.4-5.3v-411l-2.8-5.7c-3.2-6.6-10.4-13.5-17.4-16.8-5.1-2.4-17.4-3.6-22.8-2.1m439.8.6c-9.9 3-18.5 10.5-22.7 19.4l-2.1 4.6v412l2.7 5c3.2 6.2 11.3 13.9 17.6 16.8 3.8 1.8 6.5 2.2 14.7 2.2 9 0 10.6-.3 15.5-2.8 7.5-3.9 13.3-9.8 16.7-17.1l2.8-6.1.3-201.4c.3-224.1.7-208.3-6.6-219.1-8.3-12.2-24.8-17.9-38.9-13.5M1186 173c-10.2 2.2-18.6 9.3-21 17.8-.6 2.5-1 60.2-1 174.6v170.9l2.1 4.4c2.4 4.9 10.6 11.8 16 13.3 5.6 1.6 31 1.2 35.9-.5 6.1-2.2 12.4-7.7 15.2-13.2l2.3-4.8v-343l-2.3-4.7c-2.8-5.6-7.9-10.3-14.1-13.1-3.7-1.7-7.1-2.1-16.6-2.3-6.6-.2-14 .1-16.5.6m-310.2 17.5c-7.5 2.7-12.7 8.2-14.9 15.7-.6 2.1-1 62.4-1 166.2v162.9l2.6 5.4c3 6.1 9.6 11.7 15.7 13.4 2.3.6 10.8.9 20.2.7 14.8-.3 16.5-.5 20.9-2.8 2.7-1.3 6.2-4 7.9-5.9 6.6-7.5 6.3-3.7 6.6-79.4l.3-68.7h68.1c50.9 0 69.1-.3 72.2-1.2 2.5-.8 6.1-3.2 9.3-6.3 6.6-6.5 7.6-10.2 7.1-26.1-.3-10.9-.6-12.4-3.1-16.7-2.6-4.4-6.9-8.4-11.2-10.3-1.1-.5-33.5-1.1-72-1.4l-70-.5-.3-42.3-.2-42.2h80.8c89.9 0 87.6.2 94.5-6.5 6.6-6.4 7.2-8.4 7.2-24s-1-18.8-7.6-25.3-1-6.2-120.8-6.1c-88.9 0-109.3.3-112.3 1.4M510.9 263c-10.6 1.8-21.7 10.8-25.5 20.5-1.8 4.8-1.9 8.9-1.9 112.5v107.5l2.7 5.1c3.1 6 10.4 12.8 16.8 15.7 3.6 1.7 6.5 2.1 14 2.1 8.3 0 10.1-.3 14.5-2.6 6.3-3.2 14.8-12.1 16.6-17.3 1.2-3.3 1.4-22 1.4-112v-108l-2.2-4.6c-6.1-13.1-22-21.4-36.4-18.9m-214.1 11c-10.2 1.8-20.3 9.4-25 18.7l-2.3 4.8v205l2.4 5.3c2.7 6 9 12 16.6 16 4.4 2.3 6.2 2.6 14.5 2.7 8.6 0 10.1-.3 15.3-3 7.9-3.9 15.2-12 17.2-18.9 1.3-4.6 1.5-18.2 1.3-106.7-.3-97.2-.4-101.5-2.2-104.9-7.8-14.5-22.1-21.7-37.8-19m1100.1 2.5c-48.9 7.9-86.2 33.3-108.2 73.5-11.1 20.2-17.6 50.4-16.4 75.9 2.6 55.3 30.9 98.8 79 121.6 20 9.5 40.2 14.3 64.1 15.2 40.8 1.6 76.7-8.2 104.8-28.4 10.3-7.4 25.7-23.5 33.1-34.4 17.1-25.6 25.4-59.7 22.7-93.2-3.5-43.7-24.5-81.1-59-104.9-16.7-11.5-34-18.9-55.1-23.4-10.8-2.3-15.2-2.7-34.4-3-15.5-.2-24.5.1-30.6 1.1m45.6 63.1c27.6 5.3 50 27.2 57.6 56.2 5.7 21.5 2.2 49.4-8.2 66.8-4.8 8-15.9 19.6-23.7 24.7-21.4 14.1-50.6 16.7-74.8 6.6-17.8-7.4-30.6-19.4-38.8-36.4-5.9-12-7.7-19.6-8.3-34-1.2-27.1 6.1-47.1 23.1-64 12.1-12 28.7-19.9 44.7-21.4 10.2-.9 17.8-.5 28.4 1.5m166.3-52.1c-11.2 2.8-17 7.2-20.7 15.5-4.5 10.3-4.1 12.6 8.8 48 8.9 24.3 20.7 57.2 30.1 84 22.2 63.2 34 95.3 37.3 100.9 8.5 14.3 26.2 23.1 46.7 23.1 14.8 0 27.5-4.9 37.3-14.4 6.4-6.2 8.2-9.8 19.3-39.1 4.8-12.7 10.1-26.8 11.9-31.5s5.6-14.7 8.4-22.3c2.8-7.7 6.9-18 9.1-23 2.1-5.1 4.4-11.1 5.1-13.5.7-2.3 1.6-4.2 2.1-4.2.4 0 .8.2.8.3 0 .2 2 5.8 4.5 12.3 8.3 21.6 11.3 29.7 16.4 43.9 2.7 7.7 6.6 18.3 8.6 23.5s4.7 12.4 6 16c7 19.3 9.5 25.4 12.5 30 11.1 17.3 34.8 25.6 58.3 20.4 13.8-3.1 26.6-12.4 32.2-23.3 3.4-6.8 14.3-36.5 46-125.1 6.9-19.5 15.3-42.7 18.5-51.5 10.7-29.5 14.2-41.5 13.6-46-1.5-9.9-8.1-18.6-16.9-22.5-9.5-4.2-28-3.7-38.2 1.1-5.1 2.4-12.1 9.1-14.6 14.2-1.8 3.3-8.4 21.7-19.9 55.2-3.6 10.3-9.9 28-17.5 49-1.8 4.9-5.3 14.6-7.8 21.5s-5.8 15.8-7.4 19.9l-3 7.4-2.8-7.9c-1.6-4.3-3.9-10.5-5.2-13.7s-4.6-12-7.3-19.5c-6.9-19.5-16.9-46.5-23-62.2-2.9-7.4-7.6-20.4-10.6-28.9-6.2-17.7-9.1-23.4-14.6-28.9-5.5-5.6-11.5-8.1-21.6-9.3-17.8-2-31.1 2.9-38.8 14.5-2.9 4.5-9.1 19.8-17.9 44.6-1.3 3.6-4.6 12.6-7.4 20-2.9 7.4-10.1 26.5-16.1 42.5-16.2 42.9-18.7 49.2-19.4 47.5-3.8-10.3-18-50.3-28.6-81-25.2-73.2-25.8-74.6-33.7-80.6-2.3-1.8-6.8-4.2-10-5.4-7.5-2.8-22.4-3.6-30.5-1.5M402 365.9c-9.1 3-15.5 8.6-19.4 17.1l-2.6 5.5v160l2.4 5.1c3.4 7.4 7.7 11.7 14.8 15 5.3 2.4 7.5 2.9 14.3 2.8 13 0 22.7-5.9 28.2-17.2l2.8-5.7-.1-80v-80l-3.1-6.1c-5.7-11-14.5-16.5-27.3-17-4.1-.2-8.6 0-10 .5"
      />
      </g>
      <defs><clipPath id="tnf-clip"><rect width="2172" height="724" fill="white"/></clipPath></defs>
    </svg>
  );
}

function FloLogo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 107 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#flo-clip)">
        <path fillRule="evenodd" clipRule="evenodd" d="M54.6908 42.6415C54.0233 42.6694 54.079 42.0574 55.0525 41.9461C57.0553 41.7236 58.9189 40.6388 60.0036 38.4692C61.4223 35.632 60.2818 32.8782 59.3639 31.6822C58.1956 30.1801 58.6408 30.4026 59.6977 30.9589C60.6435 31.4597 61.6448 32.0994 62.7574 33.073C61.8395 25.4515 64.9827 19.777 67.3749 16.8286C68.5969 15.335 68.3872 16.4394 68.1955 17.4504L68.1816 17.524C67.6808 20.2777 67.9868 23.4765 68.71 25.6183C68.4318 21.6129 70.3234 0 84.4259 0C98.5007 0 104.231 15.4656 100.058 27.927C96.1364 39.6375 83.202 40.5832 81.1993 40.5832C84.1478 41.3064 86.8181 41.0282 88.2646 40.7223C88.316 40.7125 88.3711 40.7014 88.428 40.6899C89.0174 40.5714 89.8003 40.4137 88.7095 41.2507C85.3717 43.8377 81.6444 45.3953 77.5833 45.8682C73.8559 46.2854 70.8797 45.7291 68.7935 45.1171C68.849 45.8404 68.8769 46.814 68.849 47.4816C68.808 48.1938 68.7601 48.1236 68.4531 47.6727C68.1366 47.2082 67.5448 46.3396 66.4013 45.5066C64.2912 43.9817 62.0908 43.9489 61.3706 43.9381C61.2158 43.9357 61.1295 43.9344 61.1271 43.9196C61.1241 43.9007 61.2551 43.8604 61.5515 43.7688C61.6414 43.7411 61.7463 43.7087 61.8673 43.6707C65.5112 42.5303 69.1551 41.0005 73.4108 38.052C79.3635 33.9074 82.5623 29.2066 82.3398 29.0397C82.3281 29.0319 82.2305 29.1402 82.0474 29.3433C80.9089 30.6059 76.4646 35.535 68.8213 39.0812C63.1746 41.668 57.7506 42.4469 54.6908 42.6415ZM23.0541 22.5307C24.556 22.7811 23.3322 25.2845 21.6911 25.4236C21.6371 25.4291 21.4951 25.4364 21.2826 25.4477C20.4001 25.4943 18.3017 25.6051 16.2392 25.8965C15.961 26.5919 15.6829 27.3151 15.4047 28.0661C12.4284 36.1605 11.4827 41.5568 11.2602 43.2535C11.0376 44.9224 6.86528 43.337 6.94873 40.3885C7.00436 38.052 8.50641 32.2663 9.84157 27.8715C8.17262 28.7059 6.80965 29.7629 6.28115 30.9032C4.47312 30.9868 2.16442 29.3456 3.33268 27.037C4.47312 24.7282 8.00573 23.7824 11.4271 23.2261C13.4854 17.4405 15.2657 13.2681 16.4339 11.6548C16.4617 11.627 16.4826 11.5992 16.5034 11.5714C16.5243 11.5435 16.5451 11.5157 16.573 11.4879C9.0071 12.9065 5.41886 15.5212 3.91681 17.7187C-0.00521113 17.6351 -2.17484 12.072 3.24923 9.56863C8.56204 7.12083 16.7398 6.42544 24.6674 6.48107C32.6505 6.53671 38.6031 7.78842 40.6058 8.53945C42.1357 9.12357 40.9117 11.5435 39.3262 11.4601C39.0805 11.4484 38.6548 11.3788 38.0558 11.2809C35.8081 10.9134 31.12 10.1468 24.3336 10.5422C24.3336 10.6082 24.2987 10.6742 24.2567 10.7541C24.2456 10.7751 24.2339 10.7971 24.2224 10.8203C22.6646 12.7118 20.1333 16.8841 17.6579 22.5307C20.2447 22.3917 22.4421 22.4473 23.0541 22.5307ZM42.3582 26.2859C43.3039 25.1732 45.4458 23.1984 48.5054 23.1427C51.7878 23.0593 55.1256 26.5919 51.8712 35.1314C49.785 40.611 46.1134 45.1171 40.9117 45.0894C38.019 45.0894 36.3779 42.8919 35.9884 40.0268C34.2638 42.1131 30.8981 45.1171 27.4489 45.1171C22.5256 45.1171 22.4421 39.0812 25.5852 29.4568C28.1165 21.724 31.3153 17.3013 32.5392 16.4669C35.6268 14.353 40.4945 16.5225 38.7699 18.1359C37.8798 18.9704 34.097 24.1997 31.5934 30.486C29.0623 36.7446 28.7563 40.0547 30.6756 40.0547C32.428 40.0547 35.5434 36.689 36.4056 35.326C36.4376 35.1984 36.4786 35.0798 36.5184 34.9652C36.5478 34.88 36.5767 34.797 36.6004 34.7141C37.9911 30.5696 39.827 27.482 41.1621 26.6475C41.5237 26.425 41.9132 26.3137 42.3582 26.2859ZM42.6363 39.9434C45.0008 39.9434 47.3651 37.0784 48.7558 33.7127C49.8407 31.0146 49.7571 27.6211 47.6432 27.6488C47.0313 27.6767 46.5306 27.8992 46.1134 28.233C46.1411 28.5112 46.0577 28.7893 45.8352 29.0396C45.2491 29.7478 43.1409 32.7928 42.3337 33.9586C42.2215 34.1208 42.1344 34.2466 42.08 34.3246C40.7727 36.7446 40.8283 39.9434 42.6363 39.9434Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="flo-clip">
          <rect width="106.667" height="49.2308" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ─── Reusable header row content ─── */
function HeaderRowContent({
  data,
  bgClass = "",
  textClass = "text-white",
  isActive = false,
}) {
  const tnfColorClass = textClass;
  const floColorClass = textClass;
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
        {data.logo === "tnf" ? (
          <TNFLogo
            className={`h-10 md:h-13 4xl:h-16 5xl:h-20 w-auto ${tnfColorClass} transition-colors duration-300`}
          />
        ) : (
          <FloLogo
            className={`h-9 md:h-12 4xl:h-14 5xl:h-18 w-auto ${floColorClass} transition-colors duration-300`}
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
    logo: "tnf",
    link: "",
    tagline: "Engineering a Faster Way to Write",
    objective:
      "Transform how people communicate with technology by replacing traditional typing with fast, intelligent voice input that turns natural speech into polished, ready-to-use text.",
    execution:
      "Built an AI-powered voice workflow that works across apps and devices, automatically removing filler words, formatting thoughts, correcting mistakes, and adapting to each user’s vocabulary and tone. Flow enables users to write, code, message, and prompt AI at the speed of speech.",
    stats: [
      { value: "4x", label: "Faster Typing" },
      { value: "220 WPM", label: "Voice Input Speed" },
      { value: "100+", label: "Languages Supported" },
    ],
  },
  {
    id: "02",
    brand: "FLO",
    logo: "flo",
    link: "https://giant-rubidium-888.notion.site/How-Viral-Labs-Engineered-Flo-s-Organic-Comeback-30b7dca4ef9f801aa0e8f90b6ef91284?source=copy_link",
    tagline: "Engineering an Organic\nComeback.",
    objective:
      "Build a high-volume organic engine that doubles as a paid creative testing lab - and turn its outliers into the brand's highest-ROAS paid ads.",
    execution:
      "Built a 10-account UGC engine producing 600+ videos a month. Outlier organic videos became Flo's top-performing paid creative, cutting CAC 40% below the women's health app benchmark.",
    stats: [
      { value: "123M+", label: "Organic Views" },
      { value: "200K+", label: "App Downloads" },
      { value: "$2.74 ", label: "CAC" },
    ],
  },
  {
    id: "03",
    brand: "Deel",
    logo: "deel",
    link: "https://giant-rubidium-888.notion.site/How-Viral-Labs-Engineered-Flo-s-Organic-Comeback-30b7dca4ef9f801aa0e8f90b6ef91284?source=copy_link",
    tagline: "Building a More Efficient\nGrowth Engine.",
    objective:
      "Create a sharper operator loop for a global B2B platform by turning signal quality into a repeatable acquisition system that scales across markets.",
    execution:
      "Rebuilt the growth system around market-specific creative testing, sharper offer positioning, and closed-loop analytics so product and marketing teams could move faster with clearer decisions.",
    stats: [
      { value: "3x", label: "Qualified Pipeline" },
      { value: "41%", label: "Lower CAC" },
      { value: "18", label: "Markets Activated" },
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

      const header = headerRef.current;
      const label = cursorLabelRef.current;
      const cornersWrap = cursorCornersRef.current;
      if (!header || !label || !cornersWrap) return;

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
        const rect = header.getBoundingClientRect();
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
        const rect = header.getBoundingClientRect();
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

      header.addEventListener("mouseenter", onEnter);
      header.addEventListener("mousemove", onMove);
      header.addEventListener("mouseleave", onLeave);

      return () => {
        header.removeEventListener("mouseenter", onEnter);
        header.removeEventListener("mousemove", onMove);
        header.removeEventListener("mouseleave", onLeave);
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
      className="relative cursor-pointer"
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
            {/* <AccordionItem
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
            /> */}

            <div className="h-px bg-[#FF6F21]/70" style={bottomBorderStyle} />
          </div>
        </div>
      </section>
    </>
  );
}
