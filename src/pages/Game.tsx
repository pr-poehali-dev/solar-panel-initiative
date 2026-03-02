import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface Choice {
  text: string;
  correct: boolean;
  feedback: string;
}

interface Mission {
  id: number;
  emoji: string;
  title: string;
  scenario: string;
  choices: Choice[];
}

const missions: Mission[] = [
  {
    id: 1,
    emoji: "🔥",
    title: "Пожарная тревога",
    scenario: "Ты дома один и слышишь пожарную сигнализацию. В коридоре чувствуется запах дыма. Что делаешь?",
    choices: [
      { text: "Открываю дверь и проверяю коридор", correct: false, feedback: "Опасно! Огонь мог выжечь воздух за дверью. Дверь нельзя открывать без проверки." },
      { text: "Прощупываю дверь рукой — если горячая, не открываю, зову помощь в окно", correct: true, feedback: "Правильно! Горячая дверь = огонь рядом. Кричи в окно и звони 112." },
      { text: "Прячусь под кровать и жду", correct: false, feedback: "Нет! Дым поднимается вверх и быстро заполняет комнату. Нужно действовать." },
      { text: "Пытаюсь потушить огонь сам", correct: false, feedback: "Нет! Детям нельзя тушить пожар самостоятельно. Нужно эвакуироваться и звонить 112." },
    ],
  },
  {
    id: 2,
    emoji: "🏙️",
    title: "Потерялся в городе",
    scenario: "Ты потерялся в торговом центре и не можешь найти родителей. Телефона нет. Что делаешь?",
    choices: [
      { text: "Иду за незнакомым человеком, который предлагает помочь", correct: false, feedback: "Опасно! Незнакомцы могут навредить. Выбирай помощь только в официальных местах." },
      { text: "Подхожу к охраннику или кассиру и прошу позвонить родителям", correct: true, feedback: "Отлично! Сотрудники в форме или на рабочем месте — безопасные помощники." },
      { text: "Выхожу на улицу и ищу самостоятельно", correct: false, feedback: "Нет! Ты ещё больше заблудишься. Оставайся на месте и найди официального сотрудника." },
      { text: "Плачу и стою на месте", correct: false, feedback: "Понятно, что страшно, но нужно действовать! Найди охранника или кассира рядом." },
    ],
  },
  {
    id: 3,
    emoji: "🚨",
    title: "Незнакомец рядом",
    scenario: "На улице к тебе подходит незнакомый взрослый и говорит: «Твоя мама попросила меня тебя забрать». Что делаешь?",
    choices: [
      { text: "Иду с ним — он же знает маму", correct: false, feedback: "Нет! Это классическая ловушка. Настоящие взрослые-помощники знают твоё кодовое слово." },
      { text: "Прошу назвать наше семейное кодовое слово, иначе не иду", correct: true, feedback: "Умница! Кодовое слово — лучшая защита. Если не знает слово — кричи и беги к людям." },
      { text: "Говорю «подожди» и тихо убегаю", correct: false, feedback: "Лучше, чем идти с ним, но правильнее — громко кричать и бежать к людям или магазину." },
      { text: "Даю ему номер телефона мамы", correct: false, feedback: "Нет! Не давай личные данные незнакомцам. Уходи к людям и звони сам." },
    ],
  },
];

type GameState = "menu" | "playing" | "result";

export default function Game() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>("menu");
  const [currentMission, setCurrentMission] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const mission = missions[currentMission];

  function startGame() {
    setGameState("playing");
    setCurrentMission(0);
    setScore(0);
    setAnswers([]);
    setSelectedChoice(null);
    setShowFeedback(false);
  }

  function handleChoice(index: number) {
    if (showFeedback) return;
    setSelectedChoice(index);
    setShowFeedback(true);
    if (mission.choices[index].correct) {
      setScore((s) => s + 1);
    }
  }

  function nextMission() {
    const newAnswers = [...answers, mission.choices[selectedChoice!].correct];
    setAnswers(newAnswers);

    if (currentMission + 1 >= missions.length) {
      setGameState("result");
    } else {
      setCurrentMission((m) => m + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    }
  }

  const finalScore = score;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-white flex items-center gap-2 hover:text-orange-400 transition-colors duration-300 uppercase text-sm tracking-wide"
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </button>
        <div className="text-white font-bold uppercase tracking-wide">🛡️ SafeHero</div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">

          {gameState === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-center max-w-lg w-full"
            >
              <div className="text-7xl mb-6">🛡️</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
                Стань героем
              </h1>
              <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                3 миссии, каждая — реальный сценарий опасности. Выбирай правильные действия и защищай себя и других!
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {missions.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded text-left">
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="text-white text-sm font-medium">{m.title}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={startGame}
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold uppercase tracking-wide px-10 py-4 text-lg transition-colors duration-300 w-full"
              >
                Начать игру
              </button>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div
              key={`mission-${currentMission}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              className="max-w-2xl w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-blue-300 text-sm uppercase tracking-wide">
                  Миссия {currentMission + 1} из {missions.length}
                </span>
                <div className="flex gap-2">
                  {missions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        i < currentMission
                          ? "bg-green-400"
                          : i === currentMission
                          ? "bg-orange-400"
                          : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <div className="text-5xl mb-4 text-center">{mission.emoji}</div>
                <h2 className="text-white font-bold text-xl mb-3 uppercase tracking-wide text-center">
                  {mission.title}
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed text-center">
                  {mission.scenario}
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {mission.choices.map((choice, i) => {
                  let btnClass = "border border-white/20 bg-white/5 text-white hover:bg-white/10";
                  if (showFeedback) {
                    if (i === selectedChoice) {
                      btnClass = choice.correct
                        ? "border-green-400 bg-green-400/20 text-green-300"
                        : "border-red-400 bg-red-400/20 text-red-300";
                    } else if (choice.correct) {
                      btnClass = "border-green-400/50 bg-green-400/10 text-green-400/70";
                    } else {
                      btnClass = "border-white/10 bg-white/5 text-white/40";
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleChoice(i)}
                      disabled={showFeedback}
                      className={`text-left px-5 py-4 rounded-lg border transition-all duration-300 text-sm leading-relaxed ${btnClass}`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                      {choice.text}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showFeedback && selectedChoice !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg mb-4 text-sm leading-relaxed ${
                      mission.choices[selectedChoice].correct
                        ? "bg-green-400/10 border border-green-400/30 text-green-300"
                        : "bg-red-400/10 border border-red-400/30 text-red-300"
                    }`}
                  >
                    <span className="font-bold mr-2">
                      {mission.choices[selectedChoice].correct ? "✅" : "❌"}
                    </span>
                    {mission.choices[selectedChoice].feedback}
                  </motion.div>
                )}
              </AnimatePresence>

              {showFeedback && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={nextMission}
                  className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold uppercase tracking-wide px-8 py-4 transition-colors duration-300"
                >
                  {currentMission + 1 >= missions.length ? "Посмотреть результат" : "Следующая миссия →"}
                </motion.button>
              )}
            </motion.div>
          )}

          {gameState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-lg w-full"
            >
              <div className="text-7xl mb-4">
                {finalScore === 3 ? "🏆" : finalScore === 2 ? "⭐" : "💪"}
              </div>
              <h2 className="text-4xl font-bold text-white mb-2 uppercase tracking-tight">
                {finalScore === 3 ? "Настоящий герой!" : finalScore === 2 ? "Молодец!" : "Тренируйся!"}
              </h2>
              <p className="text-blue-200 text-lg mb-6">
                Ты ответил правильно на{" "}
                <span className="text-orange-400 font-bold">{finalScore} из {missions.length}</span> миссий
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {missions.map((m, i) => (
                  <div key={m.id} className="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-3 rounded">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{m.emoji}</span>
                      <span className="text-white text-sm">{m.title}</span>
                    </div>
                    <span>{answers[i] ? "✅" : "❌"}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={startGame}
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold uppercase tracking-wide px-8 py-4 transition-colors duration-300"
                >
                  Сыграть снова
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="border border-white/30 text-white hover:bg-white/10 font-bold uppercase tracking-wide px-8 py-4 transition-colors duration-300"
                >
                  На главную
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
