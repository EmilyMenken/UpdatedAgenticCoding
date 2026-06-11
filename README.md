1. Executive Summary & Audience
What the Tool Is
DinoQuiz is a lightweight, arcade-style desktop web application designed to test a user's paleontological knowledge. It operates like an interactive digital flashcard system wrapped in a retro terminal aesthetic.

Who It's For
Dinosaur enthusiasts, students, or gamers who want a fast, high-friction (no click-to-hint or multiple choice) identification quiz that rewards precise typing and deep knowledge.

2. System Behaviors & Core User Flows

Submission & Grading: Pressing Enter commits the answer.

The text is trimmed, forced to lowercase, and passed through a multi-tier grading matrix.

The state is updated with userAnswer and pointsEarned, immediately revealing granular feedback at the bottom.

To keep the game forgiving yet challenging, answers are graded across a 3-tier point system:

3 Points (Perfect match): The input exactly matches fullName (e.g., "ankylosaurus").

2 Points (Close match): The input contains a designated shorthand string in the twoPt array (e.g., "anky").

1 Point (Partial/Taxon match): The input contains a broader group classification found in the onePt array (e.g., "ornithischian").

0 Points (Incorrect): No string matches are found.

When currentIndex equals the length of the dinosaur array (18), the game transitions to the end screen.

The Scoreboard Matrix: The main viewport replaces the image asset with a scrollable tabular overview of all 18 dinosaurs, showing the correct name, what the user guessed (color-coded by accuracy), and the point yield.

Bidirectional Slide Review: Users can use ArrowLeft to break out of the summary screen and walk backward slide-by-slide through their completed deck to review their historical answers and the exact hints they unmasked.

3. The Technical Stack & Architecture
The Stack Selection (Deliberate & Lightweight)
Language: JavaScript (ES6+)

Framework: React 18+ (Vite Build Toolchain for instant hot-reloading during UI testing)

Styling: Inline CSS-in-JS objects. This guarantees zero configuration, zero dependency friction with external frameworks like Tailwind, and complete encapsulation within a single file.

Project Directory Structure
A clean structure keeping assets organized and minimizing routing overhead:

UpdatedAgenticCoding/
├── public/
│   └── images/              # All 18 .png dinosaur cards
├── src/
│   ├── App.jsx              # Main App entry point 
│   ├── main.jsx             # React Virtual DOM mount point

Core Data Shapes (The Contract)
Each item in the main data array matches this rigid layout interface:

TypeScript
interface DinosaurSchema {
  filename: string;       // Exact path target in public folder
  fullName: string;       // Strict lowercase string target for 3pts
  twoPt: string[];        // Array of valid slang/shorthands
  onePt: string[];        // Array of valid biological family groupings
  hint: string;           // Explanatory textual clue
  userAnswer: string|null;// Tracks user guess or "skip" state
  pointsEarned: number|null; // Tracks graded value (0 through 3)
  hintUsed: boolean;      // Toggles penalty display or presentation states
}
4. Testing Suite Strategy
Because the application avoids semantic forms and clicks, traditional testing must rely on key injection mapping.

A. Critical End-to-End (E2E) Flows to Cover
The Speedrun Test (Dev Target): Injecting a mouse click on the DEV: SKIP TO END button instantly renders the table view. Assert that the image node drops from the DOM and the <table> summary node mounts successfully.

The Perfect Score Sequence: Sequentially type out "ankylosaurus", press Enter, press ArrowRight, and repeat through the dataset. Verify that the score reads exactly 54 / 54 on the end screen.

The Back-Navigation Boundary: Advance to Slide 3, press ArrowLeft twice. Assert that currentIndex is 0, input text is locked, and historical grading data persists unchanged.

B. Unit/Integration Test Cases that Matter
Grading String-Isolation Verification: Ensure that an input containing excessive white spaces (e.g., "  Ankylosaurus  ") passes clean sanitation checks and yields a perfect score.

Skip Gateway Flow: Type "skip", press Enter. Verify skipConfirm state is true. Type "yes", press Enter. Confirm pointsEarned is 0 and the user's input reflects [SKIPPED].

Input Block Safeguard: Attempt to type characters when alreadyAnswered evaluates to true. Verify typingBuffer length remains 0.
