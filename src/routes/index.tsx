import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LEVELS, shuffleQuestion, type Question } from "@/lib/questions";

export const Route = createFileRoute("/")({
  component: Game,
});

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function Game() {
  const [levelIndex, setLevelIndex] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  const level = levelIndex !== null ? LEVELS[levelIndex] : null;

  const currentQuestion: Question | null = useMemo(() => {
    if (!level) return null;
    return shuffleQuestion(level.questions[questionIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIndex, questionIndex, shuffleSeed]);

  function startLevel(i: number) {
    // Only level 1 (index 0) is playable in the demo. Others require the full game.
    if (i > 0) {
      setShowPaywall(true);
      return;
    }
    setLevelIndex(i);
    setQuestionIndex(0);
    setSelected(null);
    setStatus("idle");
    setShuffleSeed((s) => s + 1);
  }

  function handleAnswer(i: number) {
    if (status !== "idle" || !currentQuestion || !level) return;
    setSelected(i);
    const correct = i === currentQuestion.correctIndex;
    setStatus(correct ? "correct" : "wrong");
  }

  function handleContinue() {
    if (!level || !currentQuestion || levelIndex === null) return;

    const nextIdx = questionIndex + 1;

    // Demo limit: the first three questions of level 1 are free.
    if (levelIndex === 0 && nextIdx >= 3) {
      setShowPaywall(true);
      return;
    }

    if (nextIdx >= level.questions.length) {
      setCompletedLevels((prev) => new Set(prev).add(levelIndex));
      setLevelIndex(null);
      setQuestionIndex(0);
      setSelected(null);
      setStatus("idle");
    } else {
      setQuestionIndex(nextIdx);
      setSelected(null);
      setStatus("idle");
      setShuffleSeed((s) => s + 1);
    }
  }

  if (!level || !currentQuestion) {
    return (
      <>
        <LevelSelect onSelect={startLevel} completed={completedLevels} />
        {showPaywall && <Paywall onClose={() => setShowPaywall(false)} />}
      </>
    );
  }

  const progress = (questionIndex / level.questions.length) * 100;
  const correctText = currentQuestion.options[currentQuestion.correctIndex];

  return (
    <main className="simple-page">
      <div className="simple-container">
        <div className="top-bar">
          <button
            onClick={() => {
              setLevelIndex(null);
              setStatus("idle");
              setSelected(null);
            }}
            className="plain-button secondary-button"
          >
            ← Níveis
          </button>
          <div className="level-progress-text">
            {level.title} · Pergunta {questionIndex + 1}/{level.questions.length}
          </div>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <section className="question-box">
          <div className="eyebrow">
            Traduz para português
          </div>
          <h1>
            {currentQuestion.en}
          </h1>
        </section>

        <div className="answer-list">
          {currentQuestion.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrectAnswer = i === currentQuestion.correctIndex;
            const revealCorrect = status === "wrong" && isCorrectAnswer;

            let cls = "answer-button";
            if (status === "correct" && isSelected) {
              cls += " answer-correct";
            } else if (status === "wrong" && isSelected) {
              cls += " answer-wrong";
            } else if (revealCorrect) {
              cls += " answer-correct-soft";
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={status !== "idle"}
                className={cls}
              >
                <span className="answer-letter">
                  {LETTERS[i]}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {status === "wrong" && (
          <div className="message-box wrong-box">
            <div className="message-title">
              Resposta errada!
            </div>
            <div className="message-text">
              A correta seria <span className="font-bold">{correctText}</span>.
            </div>
            <div className="message-small">
              "{currentQuestion.en}" significa "{correctText}".
            </div>
            <button
              onClick={handleContinue}
              className="plain-button primary-button"
            >
              Continuar →
            </button>
          </div>
        )}
        {status === "correct" && (
          <div className="message-box correct-box">
            <div className="message-title">
              Resposta certa!
            </div>
            <div className="message-text">
              "{currentQuestion.en}" significa{" "}
              <span className="font-bold">"{correctText}"</span>.
            </div>
            <button
              onClick={handleContinue}
              className="plain-button primary-button"
            >
              Continuar →
            </button>
          </div>
        )}
      </div>

      {showPaywall && <Paywall onClose={() => setShowPaywall(false)} />}
    </main>
  );
}

function Paywall({ onClose }: { onClose: () => void }) {
  return (
    <div className="paywall-overlay">
      <div className="paywall-box">
        <div className="paywall-badge">
          Oferta especial
        </div>

        <h2>
          Desbloqueia os 6 níveis com milhares de perguntas para aprender
          inglês em até{" "}
          <span>
            60 DIAS
          </span>
        </h2>

        <p>
          Método comprovado. Joga sem limites, avança nível a nível e domina o
          inglês de forma divertida.
        </p>

        <div className="price-box">
          <div>
            <span className="old-price">R$ 49,90</span>
            <span className="new-price">
              R$ 27,90
            </span>
          </div>
          <span className="price-note">
            Acesso vitalício · Oferta por tempo limitado
          </span>
        </div>

        <a
          href="https://pay.hotmart.com/H106671009Q"
          target="_blank"
          rel="noopener noreferrer"
          className="buy-link"
        >
          Comprar acesso ao jogo completo agora
        </a>

        <button
          onClick={onClose}
          className="close-offer-button"
        >
          Voltar ao jogo
        </button>
      </div>
    </div>
  );
}

function LevelSelect({
  onSelect,
  completed,
}: {
  onSelect: (i: number) => void;
  completed: Set<number>;
}) {
  return (
    <main className="simple-page">
      <div className="simple-container level-screen">
        <header className="intro">
          <div className="app-name">
            EnglishQuest
          </div>
          <h1>
            Aprende inglês <span>a jogar</span>
          </h1>
          <p>
            6 níveis, para aprender inglês em até 60 dias COMPROVADO. Traduz a
            frase do inglês para português. Mesmo que errares, avanças para a
            próxima pergunta — sem travar o teu progresso!
          </p>
        </header>

        <div className="level-list">
          {LEVELS.map((lvl, i) => {
            const done = completed.has(i);
            const locked = i > 0 && !completed.has(i - 1);
            return (
              <button
                key={i}
                onClick={() => onSelect(i)}
                className={`level-button ${locked ? "level-locked" : ""}`}
              >
                <div className="level-number">
                  {locked ? "X" : i + 1}
                </div>
                <div className="level-info">
                  <div className="level-title-row">
                    <h2>{lvl.title}</h2>
                    {done && (
                      <span className="status-pill complete-pill">
                        ✓ Completo
                      </span>
                    )}
                    {locked && (
                      <span className="status-pill locked-pill">
                        Bloqueado
                      </span>
                    )}
                  </div>
                  <p>
                    {locked
                      ? `Completa o Nível ${i} para desbloquear`
                      : lvl.description}
                  </p>
                </div>
                <div className="arrow-mark">
                  →
                </div>
              </button>
            );
          })}
        </div>

        <p className="tip-text">
          Dica: lê a frase inglesa com atenção antes de escolher a tradução.
        </p>
      </div>
    </main>
  );
}
