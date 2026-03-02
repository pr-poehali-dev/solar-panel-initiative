import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/88a142a7-f720-46fc-9606-6801c7c9eb4b/files/c1aa98df-21a3-46b2-ab89-77792cdd8451.jpg"
          alt="Дети-герои спасатели"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}>
        <p className="text-sm md:text-base uppercase tracking-widest mb-4 opacity-80">Образовательная игра для детей</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          СТАНЬ ГЕРОЕМ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto px-6 opacity-90 mb-8">
          Проходи миссии, учись безопасному поведению и спасай других — в увлекательной игре для детей
        </p>
        <button
          onClick={() => navigate("/game")}
          className="inline-block bg-orange-500 hover:bg-orange-400 text-white uppercase tracking-wide text-sm px-8 py-3 transition-colors duration-300 font-bold"
        >
          Начать миссию
        </button>
      </div>
    </div>
  );
}