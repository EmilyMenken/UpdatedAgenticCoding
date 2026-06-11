import React, { useState, useEffect, useRef } from 'react';

const INITIAL_DINOS = [
  {
    filename: "Ankylosaurus.png",
    fullName: "ankylosaurus",
    twoPt: ["anky"],
    onePt: ["ornithischian"],
    hint: "The most heavily armored dinosaur.",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Carcharodontosaurus.png",
    fullName: "carcharodontosaurus",
    twoPt: ["carchar"],
    onePt: ["theropod"],
    hint: "This guy's name means Shark-Toothed/Jagged-Toothed Lizard.",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Carnotaurus.png",
    fullName: "carnotaurus",
    twoPt: ["carno"],
    onePt: ["theropod"],
    hint: "Loved this guy in Disney's Dinosaur, and in the Jurassic Park novel.",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Deinosuchus.png",
    fullName: "deinosuchus",
    twoPt: ["deino"],
    onePt: ["croc", "crocodylia"],
    hint: "One of the largest crocodilians of all time, starts with a D!",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Dilophosaurus.png",
    fullName: "dilophosaurus",
    twoPt: ["dilo"],
    onePt: ["theropod"],
    hint: "This guy has a frill in Jurassic Park.",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Giganotosaurus.png",
    fullName: "giganotosaurus",
    twoPt: ["giga"],
    onePt: ["theropod"],
    hint: "Loved this guy in Jurassic World Dominion!",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Hatzegopteryx.png",
    fullName: "hatzegopteryx",
    twoPt: ["hatz"],
    onePt: ["pterosaur", "pterosauria"],
    hint: "The heaviest flying reptile.",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Kentrosaurus.png",
    fullName: "kentrosaurus",
    twoPt: ["kentro"],
    onePt: ["ornithischian"],
    hint: "This guy's name includes the city Kent.",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Mosasaurus.png",
    fullName: "mosasaurus",
    twoPt: ["mosa"],
    onePt: ["marine reptile", "squamata"],
    hint: "Loved this guy in Jurassic World - a great marine reptile.",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Quetzalcoatlus.png",
    fullName: "quetzalcoatlus",
    twoPt: ["quetz"],
    onePt: ["pterosaur", "pterosauria"],
    hint: "The tallest flying reptile - as tall as a giraffe.",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Spinosaurus.png",
    fullName: "spinosaurus",
    twoPt: ["spino"],
    onePt: ["theropod"],
    hint: "Loved this guy in Jurassic Park 3!",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Stegosaurus.png",
    fullName: "stegosaurus",
    twoPt: ["stego"],
    onePt: ["ornithischian"],
    hint: "Loved this guy in Jurassic Park 2!",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Therizinosaurus.png",
    fullName: "therizinosaurus",
    twoPt: ["theri"],
    onePt: ["theropod"],
    hint: "The weirdest theropod... a herbivore with long Freddy Krueger-esque claws.",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Triceratops.png",
    fullName: "triceratops",
    twoPt: ["trike"],
    onePt: ["ornithischian"],
    hint: "This guy was sick in Jurassic Park! Literally!",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "TyrannosaurusRex.png",
    fullName: "tyrannosaurus rex",
    twoPt: ["trex", "t-rex", "t rex"],
    onePt: ["theropod"],
    hint: "Oh, you know who this is. Take a wild guess...",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Utahraptor.png",
    fullName: "utahraptor",
    twoPt: ["raptor"],
    onePt: ["theropod"],
    hint: "The largest known raptor!",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Velociraptor.png",
    fullName: "velociraptor",
    twoPt: ["raptor"],
    onePt: ["theropod"],
    hint: "This little guy is a lot smaller IRL than in the movies...",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  },
  {
    filename: "Yutyrannus.png",
    fullName: "yutyrannus",
    twoPt: ["yuty"],
    onePt: ["theropod"],
    hint: "Largest dinosaur known to have feathers!",
    userAnswer: null,
    pointsEarned: null,
    hintUsed: false,
  }
];

const scoreAnswer = (answer, dino) => {
  const cleanAnswer = answer.trim().toLowerCase();
  if (cleanAnswer === dino.fullName) return 3;
  
  for (const two of dino.twoPt) {
    if (cleanAnswer.includes(two)) return 2;
  }
  
  for (const one of dino.onePt) {
    if (cleanAnswer.includes(one)) return 1;
  }
  
  return 0;
};

export default function DinoQuiz() {
  const [dinos, setDinos] = useState(INITIAL_DINOS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [typingBuffer, setTypingBuffer] = useState("");
  const [skipConfirm, setSkipConfirm] = useState(false);
  const [gameEndedOnce, setGameEndedOnce] = useState(false);

  const totalDinos = dinos.length;
  const isGameOverScreen = currentIndex >= totalDinos;
  
  const currentDino = !isGameOverScreen ? dinos[currentIndex] : null;
  const alreadyAnswered = currentDino ? currentDino.userAnswer !== null : false;

  useEffect(() => {
    if (currentIndex >= totalDinos) {
      setGameEndedOnce(true);
    }
  }, [currentIndex, totalDinos]);

  const stateRef = useRef({ currentIndex, dinos, alreadyAnswered, typingBuffer, skipConfirm, score, isGameOverScreen, gameEndedOnce });
  useEffect(() => {
    stateRef.current = { currentIndex, dinos, alreadyAnswered, typingBuffer, skipConfirm, score, isGameOverScreen, gameEndedOnce };
  }, [currentIndex, dinos, alreadyAnswered, typingBuffer, skipConfirm, score, isGameOverScreen, gameEndedOnce]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const state = stateRef.current;
      const idx = state.currentIndex;

      if (e.key === "ArrowLeft") {
        e.preventDefault(); // Stop event bubbling/double firing
        if (idx > 0) {
          setCurrentIndex(idx - 1);
          setTypingBuffer("");
          setSkipConfirm(false);
        }
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault(); // Stop event bubbling/double firing
        if (idx < totalDinos) {
          // STRICT RULE: You cannot advance unless this card was already answered or skipped
          if (!state.isGameOverScreen && !state.alreadyAnswered) return;
          
          setCurrentIndex(idx + 1);
          setTypingBuffer("");
          setSkipConfirm(false);
        }
        return;
      }

      // Completely lock typing inputs down if reviewing an old slide or summary screen
      if (state.isGameOverScreen || state.alreadyAnswered) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setDinos(prev => prev.map((d, i) => i === idx ? { ...d, hintUsed: true } : d));
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const trimmed = state.typingBuffer.trim().toLowerCase();

        if (state.skipConfirm) {
          if (trimmed === "yes") {
            setDinos(prev => prev.map((d, i) => i === idx ? { ...d, userAnswer: "skip", pointsEarned: 0 } : d));
            setTypingBuffer("");
            setSkipConfirm(false);
          } else {
            setTypingBuffer("");
            setSkipConfirm(false);
          }
        } else if (trimmed === "skip") {
          setSkipConfirm(true);
          setTypingBuffer("");
        } else if (trimmed !== "") {
          const pts = scoreAnswer(trimmed, state.dinos[idx]);
          setScore(prev => prev + pts);
          setDinos(prev => prev.map((d, i) => i === idx ? { ...d, userAnswer: trimmed, pointsEarned: pts } : d));
          setTypingBuffer("");
          setSkipConfirm(false);
        }
        return;
      }

      if (e.key === "Backspace") {
        setTypingBuffer(prev => prev.slice(0, -1));
      } else if (e.key === " ") {
        setTypingBuffer(prev => prev + " ");
      } else if (e.key.length === 1) {
        setTypingBuffer(prev => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalDinos]);

  const getFeedbackMessage = () => {
    if (!currentDino || !alreadyAnswered) return "";
    const pts = currentDino.pointsEarned ?? 0;
    if (pts === 3) return `✓ Perfect! — it was ${currentDino.fullName}`;
    if (pts === 2) return `~ Close! — it was ${currentDino.fullName}`;
    if (pts === 1) return `~ Partial! — it was ${currentDino.fullName}`;
    return `✗ — it was ${currentDino.fullName}`;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0f0f0f',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '800px',
        height: '600px',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        position: 'relative',
        fontFamily: 'monospace',
        overflow: 'hidden',
        userSelect: 'none',
        boxShadow: '0px 15px 40px rgba(0,0,0,0.7)',
        borderRadius: '6px',
        border: '1px solid #333',
        boxSizing: 'border-box'
      }}>
        {/* Score display */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '28px',
          fontWeight: 'bold',
          zIndex: 10,
        }}>
          Score: {score} | Dino {Math.min(currentIndex + 1, totalDinos)}/{totalDinos}
        </div>

        {/* Core Frame viewport container */}
        <div style={{
          width: '100%',
          height: '440px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '40px',
        }}>
          {isGameOverScreen ? (
            <div style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}>
              <div style={{ fontSize: '32px', color: '#ffcc4c', marginBottom: '10px' }}>🏆 QUIZ COMPLETE!</div>
              <div style={{ fontSize: '20px' }}>Final Score Summary: {score} / {totalDinos * 3} Points</div>
            </div>
          ) : (
            <img 
              src={`/images/${currentDino.filename}`} 
              alt="Dinosaur identification card" 
              style={{
                width: '500px',
                height: '380px',
                objectFit: 'contain',
              }}
            />
          )}
        </div>

        {/* Text UI Panel systems */}
        <div style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          width: '100%',
          height: '160px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            position: 'absolute',
            bottom: '110px',
            left: '20px',
            fontSize: '16px',
            color: 'rgba(204, 204, 204, 1)',
          }}>
            {isGameOverScreen ? (
              `Game over! Final score: ${score}/${totalDinos * 3}`
            ) : skipConfirm ? (
              "Are you sure you want to skip? Type 'yes' + Enter to confirm, or just Enter to cancel."
            ) : alreadyAnswered ? (
              currentIndex + 1 === totalDinos && gameEndedOnce ? 
                "Left Arrow back  |  Right Arrow to Game Over Screen" : "Left Arrow back  |  Right Arrow next"
            ) : (
              "What dinosaur/reptile is this? Type your answer. Enter to submit, type 'skip' to skip."
            )}
          </div>

          <div style={{
            position: 'absolute',
            bottom: '75px',
            left: '20px',
            fontSize: '26px',
            color: 'rgba(51, 255, 102, 1)',
          }}>
            {isGameOverScreen ? (
              "Thanks for playing!"
            ) : alreadyAnswered ? (
              currentDino.userAnswer === "skip" ? (
                "You skipped this one."
              ) : (
                `Your answer: "${currentDino.userAnswer}" (+${currentDino.pointsEarned} pts)`
              )
            ) : (
              `> ${typingBuffer}`
            )}
          </div>

          <div style={{
            position: 'absolute',
            bottom: '50px',
            left: '20px',
            fontSize: '16px',
            color: 'rgba(127, 204, 255, 1)',
          }}>
            {!isGameOverScreen && !alreadyAnswered && (
              currentDino.hintUsed ? `Hint: ${currentDino.hint}` : "Down Arrow for a hint"
            )}
          </div>

          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '20px',
            fontSize: '22px',
            color: 'rgba(255, 255, 76, 1)',
          }}>
            {isGameOverScreen ? "Left Arrow to review your answers" : getFeedbackMessage()}
          </div>
        </div>
      </div>
    </div>
  );
}