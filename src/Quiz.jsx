// src/App.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    id: 2,
    question: "Which library is used for animations in React?",
    options: ["GSAP", "Framer Motion", "Anime.js"],
    answer: "Framer Motion",
  },
  {
    id: 3,
    question: "Tailwind CSS is a?",
    options: ["CSS Framework", "Utility-first CSS framework", "CSS Library"],
    answer: "Utility-first CSS framework",
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;
    if (timeLeft === 0) {
      setFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished]);

  const handleAnswer = (option) => {
    setSelected({ ...selected, [questions[current].id]: option });
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const score = Object.keys(selected).filter(
    (id) =>
      selected[id] === questions.find((q) => q.id.toString() === id).answer
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl"
      >
        {!finished ? (
          <>
            {/* Timer */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-indigo-600">
                Quiz Website
              </h1>
              <div className="flex items-center gap-2 text-red-500 font-semibold">
                <FaClock /> {timeLeft}s
              </div>
            </div>

            {/* Question */}
            <motion.h2
              key={questions[current].id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-semibold mb-4"
            >
              {questions[current].question}
            </motion.h2>

            {/* Options */}
            <div className="grid gap-3">
              {questions[current].options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-indigo-50 transition"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Results 🎉
            </h2>
            <div className="space-y-4">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="p-4 border rounded-xl bg-gray-50 shadow-sm"
                >
                  <p className="font-semibold">{q.question}</p>
                  <p>
                    Your Answer:{" "}
                    <span
                      className={`font-medium ${
                        selected[q.id] === q.answer
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selected[q.id] || "Not Answered"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Correct: {q.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Score */}
            <div className="mt-6 text-center">
              <p className="text-xl font-bold">
                Score: {score}/{questions.length}
              </p>
              {score >= questions.length / 2 ? (
                <p className="text-green-600 flex items-center justify-center gap-2 mt-2 font-semibold">
                  <FaCheckCircle /> You Passed!
                </p>
              ) : (
                <p className="text-red-600 flex items-center justify-center gap-2 mt-2 font-semibold">
                  <FaTimesCircle /> You Failed!
                </p>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
