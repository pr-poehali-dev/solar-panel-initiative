export default function Featured() {
  const missions = [
    {
      icon: "🔥",
      title: "Пожарная тревога",
      desc: "Узнай, как правильно эвакуироваться из здания и помочь другим в случае пожара",
    },
    {
      icon: "🏙️",
      title: "Потерялся в городе",
      desc: "Научись безопасно найти помощь, если оказался один в незнакомом месте",
    },
    {
      icon: "🚨",
      title: "Незнакомец рядом",
      desc: "Пойми, как распознать опасную ситуацию и что делать при контакте с чужим",
    },
  ];

  return (
    <div id="missions" className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2 bg-gradient-to-br from-orange-400 to-blue-600 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <div className="text-8xl mb-6">🛡️</div>
          <p className="text-2xl font-bold uppercase tracking-wide">Уровни безопасности</p>
          <p className="text-lg mt-2 opacity-80">8 уникальных миссий</p>
        </div>
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Миссии, которые учат реальным навыкам</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Каждый уровень — это настоящий сценарий риска. Ребёнок учится принимать правильные решения в безопасной игровой среде.
        </p>
        <div className="flex flex-col gap-4 mb-8">
          {missions.map((m) => (
            <div key={m.title} className="flex items-start gap-4 p-4 border border-neutral-100 hover:border-orange-300 transition-colors duration-300">
              <span className="text-2xl">{m.icon}</span>
              <div>
                <p className="font-bold text-neutral-900 text-sm uppercase tracking-wide">{m.title}</p>
                <p className="text-neutral-600 text-sm mt-1">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <a href="/game" className="bg-orange-500 text-white border border-orange-500 px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-orange-500 cursor-pointer w-fit uppercase tracking-wide font-bold">
          Играть бесплатно
        </a>
      </div>
    </div>
  );
}