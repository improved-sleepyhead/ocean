export const Line = () => {
  return (
    <div className="fixed bottom-0 w-full">
      {/* SVG для десктопной версии */}
      <svg
        className="hidden lg:block absolute bottom-0 w-full"
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

      {/* SVG для мобильной версии с полной заливкой */}
      <svg
        className="block md:hidden absolute bottom-0 w-full"
        viewBox="0 0 1440 720"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Градиент для светлой темы */}
          <linearGradient
            id="gradient-light-mobile"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0059FF" />
            <stop offset="100%" stopColor="#00DDFF" />
          </linearGradient>
          {/* Градиент для тёмной темы */}
          <linearGradient
            id="gradient-dark-mobile"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#640F00" />
            <stop offset="100%" stopColor="#BC0003" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient-light-mobile)"
          fillOpacity="1"
          className="dark:fill-[url(#gradient-dark-mobile)]"
          d="M0,120C150,100,200,60,360,80C490,100,600,140,720,140C890,140,960,100,1100,80C1300,60,1320,100,1440,120L1440,320L0,320Z"
        />
        <rect
          x="0"
          y="310"
          width="1440"
          height="410"
          fill="url(#gradient-light-mobile)"
          className="dark:fill-[url(#gradient-dark-mobile)]"
        />
      </svg>

      {/* SVG для планшета с полной заливкой */}
      <svg
        className="hidden md:block lg:hidden absolute bottom-0 w-full"
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Градиент для светлой темы */}
          <linearGradient
            id="gradient-light-medium"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0059FF" />
            <stop offset="100%" stopColor="#00DDFF" />
          </linearGradient>
          {/* Градиент для тёмной темы */}
          <linearGradient
            id="gradient-dark-medium"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#640F00" />
            <stop offset="100%" stopColor="#BC0003" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient-light-medium)"
          fillOpacity="1"
          className="dark:fill-[url(#gradient-dark-medium)]"
          d="M0,120C150,100,200,60,360,80C490,100,600,140,720,140C890,140,960,100,1100,80C1300,60,1320,100,1440,120L1440,320L0,320Z"
        />
        <rect
          x="0"
          y="310"
          width="1440"
          height="210"
          fill="url(#gradient-light-medium)"
          className="dark:fill-[url(#gradient-dark-medium)]"
        />
      </svg>
    </div>
  )
}
