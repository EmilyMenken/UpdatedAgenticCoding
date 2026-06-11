import React, { useState, useEffect, useRef } from 'react';

// 1. Initial Data List
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

  const totalDinos = dinos.length;
  const isGameOverScreen = currentIndex >= totalDinos;
  
  const currentDino = !isGameOverScreen ? dinos[currentIndex] : null;
  const alreadyAnswered = currentDino ? currentDino.userAnswer !== null : false;

  const stateRef = useRef({ currentIndex, dinos, alreadyAnswered, typingBuffer, skipConfirm, score, isGameOverScreen });
  useEffect(() => {
    stateRef.current = { currentIndex, dinos, alreadyAnswered, typingBuffer, skipConfirm, score, isGameOverScreen };
  }, [currentIndex, dinos, alreadyAnswered, typingBuffer, skipConfirm, score, isGameOverScreen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const state = stateRef.current;
      const idx = state.currentIndex;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (idx > 0) {
          setCurrentIndex(idx - 1);
          setTypingBuffer("");
          setSkipConfirm(false);
        }
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (idx < totalDinos) {
          if (!state.isGameOverScreen && !state.alreadyAnswered) return;
          
          setCurrentIndex(idx + 1);
          setTypingBuffer("");
          setSkipConfirm(false);
        }
        return;
      }

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

  // Dev shortcut helper to quickly trigger game over state
  const devSkipToEnd = () => {
    setCurrentIndex(totalDinos);
  };

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
        {/* Header Summary Tab */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Score: {score} / {totalDinos * 3}
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Secret Dev Testing Button */}
            {!isGameOverScreen && (
              <button 
                onClick={devSkipToEnd}
                style={{
                  backgroundColor: '#ff3333',
                  color: '#fff',
                  border: 'none',
                  padding: '4px 10px',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
                }}
              >
                DEV: SKIP TO END
              </button>
            )}
            <span style={{ fontSize: '18px', color: '#ffcc4c' }}>
              {isGameOverScreen ? "🏆 SCORECARD" : `Dino ${currentIndex + 1}/${totalDinos}`}
            </span>
          </div>
        </div>

        {/* Dynamic Display Stage Container */}
        <div style={{
          width: '100%',
          height: '420px',
          marginTop: '60px',
          padding: '0 20px',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {isGameOverScreen ? (
            /* Custom Arcade-Style Retro Scoreboard Table */
            <div style={{
              width: '100%',
              height: '380px',
              backgroundColor: '#111',
              border: '1px solid #444',
              borderRadius: '4px',
              overflowY: 'auto',
              padding: '10px',
              boxSizing: 'border-box'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #555', color: '#ffcc4c' }}>
                    <th style={{ padding: '8px' }}>Dinosaur Name</th>
                    <th style={{ padding: '8px' }}>Your Answer</th>
                    <th style={{ padding: '8px', textAlign: 'center' }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {dinos.map((d, idx) => (
                    <tr key={idx} style={{ 
                      borderBottom: '1px solid #222',
                      backgroundColor: idx % 2 === 0 ? '#161616' : 'transparent' 
                    }}>
                      <td style={{ padding: '8px', textTransform: 'capitalize', fontWeight: 'bold' }}>
                        {d.fullName}
                      </td>
                      <td style={{ 
                        padding: '8px', 
                        color: d.userAnswer === 'skip' ? '#777' : d.pointsEarned > 0 ? '#33ff66' : '#ff3333'
                      }}>
                        {d.userAnswer === 'skip' ? '[SKIPPED]' : d.userAnswer ? `"${d.userAnswer}"` : '""'}
                      </td>
                      <td style={{ 
                        padding: '8px', 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: d.pointsEarned === 3 ? '#ffcc4c' : '#fff'
                      }}>
                        +{d.pointsEarned ?? 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <img 
              src={`/images/${currentDino.filename}`} 
              alt="Dinosaur identification card" 
              style={{
                width: '500px',
                height: '360px',
                objectFit: 'contain',
              }}
            />
          )}
        </div>

        {/* Text UI Control Console */}
        <div style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          width: '100%',
          height: '120px',
          boxSizing: 'border-box',
          borderTop: '1px solid #222',
          backgroundColor: '#151515'
        }}>
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '20px',
            fontSize: '14px',
            color: '#aaa',
          }}>
            {isGameOverScreen ? (
              "Scroll up and down through the list above to view all of your graded answers."
            ) : skipConfirm ? (
              "Are you sure you want to skip? Type 'yes' + Enter to confirm, or just Enter to cancel."
            ) : alreadyAnswered ? (
              "Left Arrow back  |  Right Arrow next"
            ) : (
              "What dinosaur/reptile is this? Type your answer. Enter to submit, type 'skip' to skip."
            )}
          </div>

          <div style={{
            position: 'absolute',
            top: '40px',
            left: '20px',
            fontSize: '24px',
            color: '#33ff66',
          }}>
            {isGameOverScreen ? (
              "Thanks for playing!"
            ) : alreadyAnswered ? (
              currentDino.userAnswer === "skip" ? (
                "You skipped this question."
              ) : (
                `Your submitted answer: "${currentDino.userAnswer}"`
              )
            ) : (
              `> ${typingBuffer}`
            )}
          </div>

          <div style={{
            position: 'absolute',
            bottom: '35px',
            left: '20px',
            fontSize: '14px',
            color: '#7fccff',
          }}>
            {!isGameOverScreen && !alreadyAnswered && (
              currentDino.hintUsed ? `Hint: ${currentDino.hint}` : "Down Arrow for a hint"
            )}
          </div>

          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '20px',
            fontSize: '18px',
            color: '#ffff4c',
          }}>
            {isGameOverScreen ? "Quiz complete summary breakdown" : getFeedbackMessage()}
          </div>
        </div>
      </div>
    </div>
  );
}