# Millen Woods Mariners Math & World Explorer Quest

A vibrant, graphic-novel style educational adventure for Grade 4 students (specifically designed with Millen Woods Public School & Waterloo Region context), covering the full 40-week WRDSB math curriculum and an interactive World Explorer passport with 16 country fun facts and trivia.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following core design directions were confirmed during interactive clarification and are locked into the build plan:

- **Navigation Flow**: Illustrated adventure quest map featuring 4 seasonal expedition sectors across the 40 weeks, alongside an instant Strand Quick-Jump bar.
- **Audio & Sound**: Dual-mode audio system with browser-native Web Speech API English read-aloud and zero-dependency Web Audio API synthesized chimes for correct answers, clue unlocks, and 5-question treasure chests.
- **Interactive Scratchpad**: Built-in canvas drawer with grid paper toggle (dot grid / square math graph), colorful pen palette, eraser, ruler guide, undo, and clear canvas.
- **Anti-Frustration Dual-Chance System**: Every math problem provides 2 chances; on the first miss, an animated yellow "Secret Clue" appears with concrete hints and visual decomposition.
- **Bilingual Support**: Instant 🌐 English / 简体中文 toggle across all 40-week questions, hints, solutions, and world facts.

---

### 1. Overview & Core Concept

- **What It Does**: Transports students into the world of the Millen Woods Mariners on an epic learning expedition. Students explore 40 weeks of Ontario Grade 4 math curriculum (organized into 4 difficulty tiers: Easy, Med, Boss, and G4-5 Advanced Math Challenge), earn stars, unlock 5-question treasure chests, draw on a scratchpad, and venture into the World Explorer passport with 16 country fun facts and trivia quizzes.
- **Target Audience**: 9-year-old Grade 4 students in Ontario (WRDSB curriculum aligned, incorporating local Waterloo landmarks such as Laurel Creek, ION LRT, St. Jacobs Market, and RIM Park).
- **Key Value**: Makes math and geography exciting, bite-sized, and failure-proof through comic book styling, encouraging clues, audio accessibility, and tangible reward loops.

---

### 2. User Experience & Visual Design

- **Aesthetic Direction**: Graphic Novel / Comic Book aesthetic:
  - Halftone dot textures, bold 2.5px solid black borders (`border-2 border-slate-900`), crisp comic shadow offsets (`shadow-[4px_4px_0px_#0f172a]`), and speech bubble hints.
  - Playful comic typography paired with clean, accessible sans-serif (`Plus Jakarta Sans` / `Outfit` feel) and tabular numerals for math calculations.
  - Interactive tactile 3D-press buttons (`active:translate-y-0.5 active:shadow-[1px_1px_0px_#0f172a]`).
- **Color Palette & Mood (60-30-10 Rule)**:
  - **60% Canvas & Stage**: Warm comic paper cream (`#FAF8F5`) and clean comic panel white (`#FFFFFF`).
  - **30% Structural Panels & Outlines**: Deep ink navy/slate (`#0F172A`) for borders and comic frames, crisp blueprint grid paper for scratchpad.
  - **10% Hero Accents**: Waterloo Mariner Gold (`#F59E0B`), Mariner Royal Blue (`#2563EB`), Coral Red for Boss challenges (`#EF4444`), and Emerald Green for discoveries (`#10B981`).
- **Key User Flows**:
  1. **Expedition Map & Mode Switch**:
     - Switch seamlessly between **⚓ Mariners Math Quest** (40 Weeks) and **🌍 World Explorer** (Passport & Trivia).
     - Filter weeks by Season/Term (Autumn W1–10, Early Winter W11–20, Late Winter/Spring W21–30, Spring/Summer W31–40) or curriculum strand.
  2. **Micro-Quest (5-Question Loop)**:
     - 5 questions per stage with step indicator dots.
     - 4 difficulty options: 🟢 Easy, 🟡 Medium, 🔴 Boss, 👑 G4-5 Advanced.
     - Student chooses or types answer.
     - If correct: instant chime, green highlight, +1 Star, Mariner encouragement quote.
     - If incorrect on Try 1: yellow "Secret Clue" drawer bounces open with a helpful visual hint and "Try Again!".
     - Try 2 gives step-by-step solution breakdown so the child learns without frustration.
     - On Question 5: Animated 3D Treasure Chest pops open with stars and celebratory badge unlock!
  3. **Scratchpad Utility**:
     - Always accessible floating button `✏️ Scratchpad`.
     - Opens a sliding drawer / modal with math grid background, pen, colors, eraser, and clear.
  4. **World Explorer**:
     - 16 Country passport cards (Canada, China, Japan, Egypt, Brazil, Australia, France, Italy, Iceland, Kenya, Mexico, Peru, India, UK, USA, Antarctica).
     - Single-fact cards with rich illustrations, audio speech read-aloud, and 4-choice trivia quizzes to earn World Explorer Stamps.

---

### 3. Key Product Decisions & Trade-Offs

- **Local Storage State Persistence**:
  - *Chosen Approach*: Save student stars, unlocked chests, completed weeks, and passport stamps in `localStorage`.
  - *Why*: Instant resume without login friction for a 9-year-old child; persistent across browser refreshes.
- **Offline Synthesized Audio (Web Audio API + SpeechSynthesis)**:
  - *Chosen Approach*: Use the browser's built-in `window.speechSynthesis` for natural English voice read-aloud and Web Audio API oscillators for musical reward chimes.
  - *Why*: Zero network latency, works offline, no external audio assets that could fail to load.
- **WRDSB 40-Week Curriculum Coverage**:
  - *Chosen Approach*: Comprehensive curated question bank covering all 40 weeks of the WRDSB Grade 4 LRP (Number Sense, Rounding, Geometric Angles & Coordinates, Mult/Div arrays, Data Literacy, Decimals, Proportionality, Equations, Area/Perimeter, Probability, Coding loops, and Financial Literacy).
  - *Why*: Exactly reflects what the child experiences in Ontario classrooms throughout the academic year.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                   App Root (State & Audio Manager)                     │
│  - Active View: [Math Quest Map | Question Stage | World Explorer]     │
│  - Player Progress: Stars, Unlocked Badges, Week Scores, Language      │
│  - Audio Engine: Web Speech TTS + Web Audio Sound Effects              │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
    ┌───────────────▼───────────────┐  ┌─────────────▼────────────────┐
    │     Mariners Math Engine      │  │    World Explorer Engine     │
    │  - 40-Week WRDSB Question DB  │  │  - 16 Country Fun Facts      │
    │  - 4 Tiers (Easy/Med/Boss/G4) │  │  - Trivia Quiz Engine        │
    │  - 2-Chance Clue System       │  │  - Passport Stamp Collection │
    │  - 5-Step Treasure Chest Loop │  └──────────────────────────────┘
    └───────────────┬───────────────┘
                    │
    ┌───────────────▼───────────────┐
    │    Interactive Scratchpad     │
    │  - HTML5 Canvas Drawing       │
    │  - Grid / Blank Toggle        │
    │  - Pen, Eraser, Colors, Undo  │
    └───────────────────────────────┘
```

#### Core Data Structures
- `MathQuestion`: `id`, `weekNumber`, `strand`, `tier` (`easy` | `med` | `boss` | `olympiad`), `questionEn`, `questionZh`, `options`, `correctIndex`, `secretClueEn`, `secretClueZh`, `explanationEn`, `explanationZh`, `visualType` (array, number-line, fraction-bar, geometry-shape, coordinate-grid, balance-scale, money-coins).
- `WorldFact`: `id`, `countryEn`, `countryZh`, `flag`, `funFactEn`, `funFactZh`, `badgeName`, `quiz`: `{ questionEn, questionZh, optionsEn, optionsZh, correctIndex }`.
- `StudentProgress`: `stars`, `completedWeeks`: `Record<number, boolean>`, `unlockedBadges`: `string[]`, `unlockedChests`: `number`, `streak`: `number`.

---

### 5. Verification & Implementation Sequence

1. **Step 1**: Implement comprehensive bilingual WRDSB Grade 4 curriculum dataset (`mathData.ts`) and World Explorer dataset (`worldData.ts`).
2. **Step 2**: Implement Web Audio chime synthesizer and Web Speech API helper (`soundEffects.ts`).
3. **Step 3**: Build Graphic Novel UI primitives (comic panels, 3D action buttons, speech bubbles, halftone backdrop).
4. **Step 4**: Build the Interactive Scratchpad (`Scratchpad.tsx`) with grid paper and drawing tools.
5. **Step 5**: Build the Quest Map & Week Stage Explorer (`QuestMap.tsx`) with 4 seasonal expedition sectors and local Waterloo landmarks.
6. **Step 6**: Build the 5-Question Stage Runner (`QuestionRunner.tsx`) with 2-chance mechanics, animated Secret Clue drawer, and 3D Treasure Chest celebration modal.
7. **Step 7**: Build the World Explorer Passport view (`WorldExplorer.tsx`) with 16 country cards and trivia challenges.
8. **Step 8**: Verify seamless compilation with `compile_applet` and test responsiveness on desktop and tablet views.
