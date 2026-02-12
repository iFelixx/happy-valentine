"use client";

import React from "react";
import styled, { keyframes, css } from "styled-components";

/* ================= Animation ================= */

const gentleFloat = keyframes`
  0%,100% { transform: translateY(0px) rotate(-1deg); }
  50% { transform: translateY(-6px) rotate(1deg); }
`;

const Container = styled.div`
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FlowerSVG = styled.svg`
  width: 100%;
  height: 100%;

  ${css`
    animation: ${gentleFloat} 6s ease-in-out infinite;
  `}

  transform-origin: center;
`;

/* ================= Component ================= */

export default function ElegantFlower() {
  return (
    <Container>
      <FlowerSVG viewBox="0 0 240 240" fill="none">

        {/* ===== Stem ===== */}
        <path
          d="M120 140 C115 170 118 195 120 220"
          stroke="#6E9F82"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* ===== Leaves ===== */}
        <g fill="#A8D5BA">

          <path d="M120 165 Q80 160 85 190 Q110 185 120 170 Z" />
          <path d="M120 175 Q160 170 155 200 Q135 195 120 180 Z" />

        </g>

        {/* ===== Outer Petals ===== */}
        <g fill="#F4A6B8">

          <ellipse cx="120" cy="110" rx="38" ry="58" />
          <ellipse cx="120" cy="110" rx="38" ry="58" transform="rotate(45 120 110)" />
          <ellipse cx="120" cy="110" rx="38" ry="58" transform="rotate(90 120 110)" />
          <ellipse cx="120" cy="110" rx="38" ry="58" transform="rotate(135 120 110)" />

        </g>

        {/* ===== Inner Petals ===== */}
        <g fill="#FFC2CF">

          <ellipse cx="120" cy="110" rx="24" ry="40" />
          <ellipse cx="120" cy="110" rx="24" ry="40" transform="rotate(60 120 110)" />
          <ellipse cx="120" cy="110" rx="24" ry="40" transform="rotate(120 120 110)" />

        </g>

        {/* ===== Flower Core ===== */}
        <circle cx="120" cy="110" r="18" fill="#FFE5A3" />

        {/* Core dots */}
        <g fill="#D6A847">
          <circle cx="114" cy="105" r="2.5"/>
          <circle cx="125" cy="110" r="2.5"/>
          <circle cx="118" cy="118" r="2.5"/>
          <circle cx="128" cy="102" r="2.5"/>
          <circle cx="110" cy="112" r="2.5"/>
        </g>

      </FlowerSVG>
    </Container>
  );
}