export const Line = () => {
  return (
    <div className="fixed bottom-0 w-full">
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Градиент для светлой темы */}
          <linearGradient id="gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0059FF" />
            <stop offset="100%" stopColor="#00DDFF" />
          </linearGradient>
          {/* Градиент для тёмной темы */}
          <linearGradient id="gradient-dark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#640F00" />
            <stop offset="100%" stopColor="#BC0003" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient-light)"
          fillOpacity="1"
          className="dark:fill-[url(#gradient-dark)]"
          d="M0,235C150,220,200,162,360,180C490,188,600,236,720,235C890,230,960,172,1100,180C1300,188,1320,235,1440,235L1440,320L0,320Z"
        />
      </svg>
    </div>
  );
};
