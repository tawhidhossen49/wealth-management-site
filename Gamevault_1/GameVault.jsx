import { useState, useEffect, useRef, useCallback } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const COLORS = {
  bg: "#050508",
  surface: "#0c0c14",
  card: "#10101c",
  border: "#1e1e30",
  neon: "#6c63ff",
  cyan: "#00d4ff",
  purple: "#a855f7",
  pink: "#ec4899",
  text: "#e8e8f0",
  muted: "#6b6b8a",
  gold: "#f59e0b",
};

// ─── GAME DATA ─────────────────────────────────────────────────────────────────
const GAMES = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    subtitle: "Phantom Liberty Edition",
    genre: "RPG",
    price: 59.99,
    originalPrice: 79.99,
    rating: 9.1,
    reviews: "142K",
    players: "24M+",
    tags: ["Open World", "Sci-Fi", "Story Rich"],
    description: "An open-world action RPG set in the megalopolis of Night City.",
    color: "#00d4ff",
    accentColor: "#0099cc",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg",
    thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    mediaSource: "Official Steam store media",
    officialUrl: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
    featured: true,
    new: false,
    hot: true,
  },
  {
    id: 2,
    title: "Elden Ring",
    subtitle: "Shadow of the Erdtree",
    genre: "Action RPG",
    price: 69.99,
    originalPrice: null,
    rating: 9.6,
    reviews: "310K",
    players: "20M+",
    tags: ["Souls-like", "Fantasy", "Multiplayer"],
    description: "A new fantasy action RPG where worlds collide in a vast shattered realm.",
    color: "#f59e0b",
    accentColor: "#d97706",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg",
    thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    mediaSource: "Official Steam store media",
    officialUrl: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
    featured: true,
    new: false,
    hot: false,
  },
  {
    id: 3,
    title: "GTA VI",
    subtitle: "Vice City Returns",
    genre: "Action",
    price: 79.99,
    originalPrice: null,
    rating: 9.8,
    reviews: "580K",
    players: "50M+",
    tags: ["Open World", "Crime", "Multiplayer"],
    description: "Return to the neon-soaked streets of Vice City in the most ambitious GTA yet.",
    color: "#ec4899",
    accentColor: "#be185d",
    img: "https://www.rockstargames.com/VI/_next/static/media/mobile.77e7c0de.jpg",
    thumb: "https://www.rockstargames.com/VI/_next/image?q=75&url=%2FVI%2F_next%2Fstatic%2Fmedia%2Fvi.b9b99ab9.png&w=2048",
    mediaSource: "Official Rockstar Games media",
    officialUrl: "https://www.rockstargames.com/VI",
    featured: true,
    new: true,
    hot: true,
  },
  {
    id: 4,
    title: "Call of Duty",
    subtitle: "Warzone 3.0",
    genre: "FPS",
    price: 0,
    originalPrice: null,
    rating: 8.4,
    reviews: "890K",
    players: "100M+",
    tags: ["Battle Royale", "Multiplayer", "FPS"],
    description: "The ultimate free-to-play battle royale experience with 120 player lobbies.",
    color: "#22c55e",
    accentColor: "#16a34a",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/capsule_616x353.jpg",
    thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg",
    mediaSource: "Official Steam store media",
    officialUrl: "https://store.steampowered.com/app/1938090/Call_of_Duty/",
    featured: false,
    new: false,
    hot: true,
  },
  {
    id: 5,
    title: "EA FC 24",
    subtitle: "Ultimate Edition",
    genre: "Sports",
    price: 39.99,
    originalPrice: 69.99,
    rating: 7.8,
    reviews: "220K",
    players: "30M+",
    tags: ["Football", "Sports", "Online"],
    description: "The world's #1 football game. Powered by HyperMotionV technology.",
    color: "#6c63ff",
    accentColor: "#4f46e5",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/capsule_616x353.jpg",
    thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg",
    mediaSource: "Official Steam store media",
    officialUrl: "https://store.steampowered.com/app/2195250/EA_SPORTS_FC_24/",
    featured: false,
    new: false,
    hot: false,
  },
  {
    id: 6,
    title: "Baldur's Gate 3",
    subtitle: "Deluxe Edition",
    genre: "RPG",
    price: 59.99,
    originalPrice: null,
    rating: 9.7,
    reviews: "450K",
    players: "12M+",
    tags: ["Turn-Based", "Story Rich", "Co-op"],
    description: "Gather your party. An epic RPG of unparalleled depth built on D&D 5e rules.",
    color: "#a855f7",
    accentColor: "#9333ea",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/capsule_616x353.jpg",
    thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
    mediaSource: "Official Steam store media",
    officialUrl: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/",
    featured: false,
    new: false,
    hot: false,
  },
  {
    id: 7,
    title: "Starfield",
    subtitle: "Shattered Space",
    genre: "RPG",
    price: 49.99,
    originalPrice: 69.99,
    rating: 8.1,
    reviews: "180K",
    players: "15M+",
    tags: ["Space", "Open World", "Exploration"],
    description: "In this next generation role-playing game, you can go anywhere, be anyone.",
    color: "#0ea5e9",
    accentColor: "#0284c7",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/capsule_616x353.jpg",
    thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg",
    mediaSource: "Official Steam store media",
    officialUrl: "https://store.steampowered.com/app/1716740/Starfield/",
    featured: false,
    new: false,
    hot: false,
  },
  {
    id: 8,
    title: "Diablo IV",
    subtitle: "Season of Blood",
    genre: "ARPG",
    price: 44.99,
    originalPrice: 69.99,
    rating: 8.6,
    reviews: "195K",
    players: "18M+",
    tags: ["Hack & Slash", "Dark Fantasy", "Co-op"],
    description: "Descend into hell. An unending night of terror in a dark gothic world.",
    color: "#ef4444",
    accentColor: "#dc2626",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/capsule_616x353.jpg",
    thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/header.jpg",
    mediaSource: "Official Steam store media",
    officialUrl: "https://store.steampowered.com/app/2344520/Diablo_IV/",
    featured: false,
    new: false,
    hot: false,
  },
];

const CATEGORIES = ["All", "RPG", "Action", "FPS", "Sports", "ARPG"];
const LOADING_PHASES = ["INITIALIZING...", "LOADING ASSETS...", "CALIBRATING UI...", "ENTERING VAULT..."];

const LIVE_FEED = [
  { user: "Void_X", game: "Elden Ring", action: "just purchased", time: "2s ago", avatar: "V" },
  { user: "NightByte", game: "Cyberpunk 2077", action: "left a review ⭐⭐⭐⭐⭐", time: "8s ago", avatar: "N" },
  { user: "StarlitKira", game: "GTA VI", action: "added to wishlist", time: "15s ago", avatar: "S" },
  { user: "PhantomRush", game: "Baldur's Gate 3", action: "just purchased", time: "22s ago", avatar: "P" },
  { user: "EchoWarden", game: "Diablo IV", action: "is now playing", time: "31s ago", avatar: "E" },
  { user: "NeonKira", game: "Starfield", action: "just purchased", time: "45s ago", avatar: "N" },
  { user: "ArcaneVeil", game: "COD Warzone", action: "started playing", time: "1m ago", avatar: "A" },
];

// ─── UTILITY HOOKS ─────────────────────────────────────────────────────────────
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&family=Rajdhani:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: ${COLORS.bg};
    color: ${COLORS.text};
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.neon}; border-radius: 2px; }

  .orbitron { font-family: 'Orbitron', monospace; }
  .rajdhani { font-family: 'Rajdhani', sans-serif; }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px ${COLORS.neon}40; }
    50% { box-shadow: 0 0 50px ${COLORS.neon}80, 0 0 100px ${COLORS.neon}30; }
  }
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes particle-rise {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(-60px) scale(0); opacity: 0; }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes loading-bar {
    from { width: 0%; }
    to { width: 100%; }
  }
  @keyframes flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
    20%, 24%, 55% { opacity: 0.4; }
  }
  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes blink {
    50% { border-color: transparent; }
  }
  @keyframes live-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.6; }
  }
  @keyframes ticker-move {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

// ─── CURSOR COMPONENT ─────────────────────────────────────────────────────────
function Cursor() {
  const pos = useMousePosition();
  const [trail, setTrail] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setTrail(prev => {
      const next = [{ x: pos.x, y: pos.y, id: Date.now() }, ...prev.slice(0, 6)];
      return next;
    });
  }, [pos]);

  useEffect(() => {
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousedown", down); window.removeEventListener("mouseup", up); };
  }, []);

  return (
    <>
      {trail.map((t, i) => (
        <div key={t.id} style={{
          position: "fixed", left: t.x - 3, top: t.y - 3,
          width: 6 - i * 0.6, height: 6 - i * 0.6,
          borderRadius: "50%",
          background: `rgba(108,99,255,${0.6 - i * 0.08})`,
          pointerEvents: "none", zIndex: 9998,
          transition: "all 0.05s",
        }} />
      ))}
      <div style={{
        position: "fixed", left: pos.x - 12, top: pos.y - 12,
        width: 24, height: 24, borderRadius: "50%",
        border: `2px solid ${COLORS.neon}`,
        pointerEvents: "none", zIndex: 9999,
        transform: clicked ? "scale(0.7)" : "scale(1)",
        transition: "transform 0.1s, border-color 0.2s",
        boxShadow: `0 0 12px ${COLORS.neon}60`,
        mixBlendMode: "screen",
      }} />
      <div style={{
        position: "fixed", left: pos.x - 3, top: pos.y - 3,
        width: 6, height: 6, borderRadius: "50%",
        background: COLORS.neon, pointerEvents: "none", zIndex: 9999,
        boxShadow: `0 0 8px ${COLORS.neon}`,
      }} />
    </>
  );
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let p = 0;
    let doneTimer;
    const iv = setInterval(() => {
      p += Math.random() * 4 + 1;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        doneTimer = setTimeout(onDone, 600);
      }
      setProgress(p);
      setPhase(Math.floor((p / 100) * (LOADING_PHASES.length - 1)));
    }, 40);
    return () => {
      clearInterval(iv);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: COLORS.bg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 32,
    }}>
      {/* Scanline */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 2, background: `linear-gradient(90deg, transparent, ${COLORS.neon}, transparent)`,
        animation: "scanline 2s linear infinite", opacity: 0.4,
      }} />

      {/* Logo */}
      <div style={{ textAlign: "center" }}>
        <div className="orbitron" style={{
          fontSize: 52, fontWeight: 900, letterSpacing: 8,
          background: `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.cyan}, ${COLORS.purple})`,
          backgroundSize: "200% 200%",
          animation: "gradient-shift 2s ease infinite",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: 4,
        }}>GAMEVAULT</div>
        <div className="rajdhani" style={{ color: COLORS.muted, letterSpacing: 6, fontSize: 13 }}>
          PREMIUM GAME MARKETPLACE
        </div>
      </div>

      {/* Hex spinner */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <div style={{
          position: "absolute", inset: 0, border: `2px solid ${COLORS.neon}30`,
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", inset: 6, border: `2px solid transparent`,
          borderTopColor: COLORS.neon, borderRadius: "50%",
          animation: "spin-slow 1s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: 14, border: `2px solid transparent`,
          borderBottomColor: COLORS.cyan, borderRadius: "50%",
          animation: "spin-slow 0.7s linear infinite reverse",
        }} />
        <div style={{
          position: "absolute", inset: "50%", transform: "translate(-50%,-50%)",
          width: 8, height: 8, borderRadius: "50%",
          background: COLORS.neon, boxShadow: `0 0 12px ${COLORS.neon}`,
        }} />
      </div>

      {/* Progress */}
      <div style={{ width: 320, textAlign: "center" }}>
        <div style={{
          height: 2, background: COLORS.border, borderRadius: 1, overflow: "hidden", marginBottom: 12,
        }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: `linear-gradient(90deg, ${COLORS.neon}, ${COLORS.cyan})`,
            transition: "width 0.1s",
            boxShadow: `0 0 8px ${COLORS.neon}`,
          }} />
        </div>
        <div className="rajdhani" style={{ color: COLORS.muted, fontSize: 13, letterSpacing: 3 }}>
          {LOADING_PHASES[phase]} {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ searchQuery, setSearchQuery, cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navLinks = [
    { label: "Store", href: "#store-grid" },
    { label: "Library", href: "#featured-games" },
    { label: "Community", href: "#live-feed" },
    { label: "Deals", href: "#premium-deal" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "0 32px",
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled
        ? "rgba(5,5,8,0.92)"
        : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
      transition: "all 0.3s",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32,
          background: `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.cyan})`,
          borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 16px ${COLORS.neon}40`,
          fontSize: 14, fontWeight: 900,
        }}>G</div>
        <span className="orbitron" style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, letterSpacing: 2 }}>
          GAMEVAULT
        </span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {navLinks.map(link => (
          <a key={link.label} href={link.href} style={{
            color: COLORS.muted, fontSize: 14, fontWeight: 500,
            textDecoration: "none", transition: "color 0.2s",
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={e => e.target.style.color = COLORS.text}
          onMouseLeave={e => e.target.style.color = COLORS.muted}
          >{link.label}</a>
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center",
          background: searchOpen ? COLORS.surface : "transparent",
          border: `1px solid ${searchOpen ? COLORS.neon + "60" : "transparent"}`,
          borderRadius: 24, padding: searchOpen ? "6px 16px" : "6px",
          transition: "all 0.3s", overflow: "hidden",
          width: searchOpen ? 240 : 36,
          boxShadow: searchOpen ? `0 0 20px ${COLORS.neon}20` : "none",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={COLORS.muted} strokeWidth="2" style={{ flexShrink: 0, cursor: "pointer" }}
            onClick={() => setSearchOpen(!searchOpen)}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          {searchOpen && (
            <input
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              style={{
                background: "none", border: "none", outline: "none",
                color: COLORS.text, fontSize: 13, marginLeft: 8,
                width: "100%", fontFamily: "'Inter', sans-serif",
              }}
            />
          )}
        </div>

        {/* Cart */}
        <button
          type="button"
          onClick={onCartOpen}
          aria-label="Open cart"
          style={{
            position: "relative", cursor: "pointer",
            background: "transparent", border: "none", padding: 0,
            display: "flex", alignItems: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke={COLORS.muted} strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {cartCount > 0 && (
            <div style={{
              position: "absolute", top: -6, right: -6,
              width: 16, height: 16, borderRadius: "50%",
              background: COLORS.neon,
              fontSize: 10, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: COLORS.bg,
            }}>{cartCount}</div>
          )}
        </button>

        {/* Sign in */}
        <button style={{
          background: `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.purple})`,
          border: "none", borderRadius: 8, padding: "8px 20px",
          color: "white", fontSize: 13, fontWeight: 600,
          cursor: "pointer", fontFamily: "'Inter', sans-serif",
          boxShadow: `0 0 20px ${COLORS.neon}30`,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >Sign In</button>
      </div>
    </nav>
  );
}

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouse = useMousePosition();
  const mouseRef = useRef(mouse);
  const particlesRef = useRef([]);

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    particlesRef.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      color: [COLORS.neon, COLORS.cyan, COLORS.purple, "#ffffff"][Math.floor(Math.random() * 4)],
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentMouse = mouseRef.current;
      const mouseX = currentMouse.x || canvas.width / 2;
      const mouseY = currentMouse.y || canvas.height / 2;

      particlesRef.current.forEach((p) => {
        // Mouse repulsion
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 120) {
          p.vx -= (dx / dist) * 0.05;
          p.vy -= (dy / dist) * 0.05;
        }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      // Draw connections
      particlesRef.current.forEach((p, i) => {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x; const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(108,99,255,${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
    }} />
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function Hero({ onExplore }) {
  const mouse = useMousePosition();
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setParallax({
        x: ((mouse.x - rect.width / 2) / rect.width) * 20,
        y: ((mouse.y - rect.height / 2) / rect.height) * 10,
      });
    }
  }, [mouse]);

  return (
    <section ref={heroRef} style={{
      position: "relative", height: "100vh", minHeight: 700,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <ParticleCanvas />

      {/* Ambient gradient orbs */}
      <div style={{
        position: "absolute", top: "20%", left: "15%",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.neon}15 0%, transparent 70%)`,
        transform: `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)`,
        transition: "transform 0.1s",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "10%",
        width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.purple}15 0%, transparent 70%)`,
        transform: `translate(${-parallax.x * 0.3}px, ${-parallax.y * 0.3}px)`,
        transition: "transform 0.1s",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "60%", left: "60%",
        width: 300, height: 300, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.cyan}10 0%, transparent 70%)`,
        transform: `translate(${parallax.x * 0.8}px, ${parallax.y * 0.8}px)`,
        transition: "transform 0.1s",
        pointerEvents: "none",
      }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `
          linear-gradient(${COLORS.neon} 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.neon} 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
        transform: `translate(${parallax.x * 0.2}px, ${parallax.y * 0.2}px)`,
        transition: "transform 0.15s",
      }} />

      {/* Hero Content */}
      <div style={{
        position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px",
        maxWidth: 900,
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: `${COLORS.neon}15`, border: `1px solid ${COLORS.neon}40`,
          borderRadius: 24, padding: "6px 16px", marginBottom: 28,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s 0.1s",
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: COLORS.cyan, animation: "live-pulse 1.5s ease infinite",
          }} />
          <span className="rajdhani" style={{ color: COLORS.cyan, fontSize: 13, letterSpacing: 3 }}>
            NEXT-GEN GAMING PLATFORM
          </span>
        </div>

        {/* Main title */}
        <h1 className="orbitron" style={{
          fontSize: "clamp(36px, 7vw, 80px)",
          fontWeight: 900,
          lineHeight: 1.05,
          marginBottom: 24,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s 0.2s",
        }}>
          <span style={{
            background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.text} 40%, ${COLORS.neon} 70%, ${COLORS.cyan} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Next Generation</span>
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.purple}, ${COLORS.cyan})`,
            backgroundSize: "200% 200%",
            animation: "gradient-shift 3s ease infinite",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Game Marketplace</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 18, color: COLORS.muted, maxWidth: 580, margin: "0 auto 40px",
          lineHeight: 1.7,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s 0.35s",
        }}>
          Discover, buy, and play AAA titles at the best prices. Thousands of games,
          instant delivery, and a community of millions.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s 0.5s",
        }}>
          <button onClick={onExplore} style={{
            background: `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.purple})`,
            border: "none", borderRadius: 12, padding: "14px 36px",
            color: "white", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Inter', sans-serif",
            boxShadow: `0 0 30px ${COLORS.neon}40`,
            animation: "pulse-glow 2.5s ease infinite",
            letterSpacing: 0.5,
          }}>
            Explore Games →
          </button>
          <button style={{
            background: "transparent",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12, padding: "14px 36px",
            color: COLORS.text, fontSize: 15, fontWeight: 600,
            cursor: "pointer", fontFamily: "'Inter', sans-serif",
            transition: "all 0.25s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = COLORS.neon + "60";
            e.currentTarget.style.background = COLORS.neon + "08";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = COLORS.border;
            e.currentTarget.style.background = "transparent";
          }}>
            🔥 Trending Now
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: 48, justifyContent: "center", marginTop: 56,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s 0.65s",
        }}>
          {[
            { value: "10,000+", label: "Games" },
            { value: "50M+", label: "Players" },
            { value: "99.9%", label: "Uptime" },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div className="orbitron" style={{
                fontSize: 26, fontWeight: 700, color: COLORS.neon,
              }}>{stat.value}</div>
              <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: `linear-gradient(to bottom, transparent, ${COLORS.bg})`,
        pointerEvents: "none",
      }} />
    </section>
  );
}

// ─── LIVE TICKER ──────────────────────────────────────────────────────────────
function LiveTicker() {
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setFeedIndex(i => (i + 1) % LIVE_FEED.length);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  const item = LIVE_FEED[feedIndex];

  return (
    <div id="live-feed" style={{
      background: COLORS.surface, borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`,
      padding: "10px 0", overflow: "hidden",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "0 32px", maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#22c55e", animation: "live-pulse 1.2s ease infinite",
          }} />
          <span className="rajdhani" style={{ color: "#22c55e", fontSize: 12, letterSpacing: 2 }}>
            LIVE
          </span>
        </div>
        <div style={{
          width: 1, height: 16, background: COLORS.border, flexShrink: 0,
        }} />
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          animation: "fade-in 0.4s ease",
          key: feedIndex,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.purple})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, flexShrink: 0,
          }}>{item.avatar}</div>
          <span style={{ color: COLORS.text, fontSize: 13 }}>
            <strong style={{ color: COLORS.neon }}>{item.user}</strong>
            {" "}{item.action}{" "}
            <strong style={{ color: COLORS.cyan }}>{item.game}</strong>
            <span style={{ color: COLORS.muted, marginLeft: 8, fontSize: 12 }}>· {item.time}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── GAME CARD ────────────────────────────────────────────────────────────────
function GameCard({ game, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const addedTimerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(addedTimerRef.current);
  }, []);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (game.price === 0) {
      window.open(game.officialUrl, "_blank", "noopener,noreferrer");
      return;
    }
    clearTimeout(addedTimerRef.current);
    setAdded(true);
    onAddToCart(game);
    addedTimerRef.current = setTimeout(() => setAdded(false), 1500);
  };

  const discount = game.originalPrice
    ? Math.round((1 - game.price / game.originalPrice) * 100)
    : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: COLORS.card,
        border: `1px solid ${hovered ? game.color + "60" : COLORS.border}`,
        borderRadius: 16, overflow: "hidden",
        transition: "all 0.3s",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 24px 48px ${game.color}20, 0 0 0 1px ${game.color}30`
          : "0 4px 16px rgba(0,0,0,0.4)",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", paddingTop: "55%", overflow: "hidden" }}>
        <img
          src={hovered ? game.img : game.thumb}
          alt={game.title}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, transparent 40%, ${COLORS.card} 100%)`,
        }} />

        {/* Badges */}
        <div style={{
          position: "absolute", top: 10, left: 10,
          display: "flex", gap: 6,
        }}>
          {game.new && (
            <span style={{
              background: COLORS.neon, color: COLORS.bg,
              fontSize: 10, fontWeight: 700, letterSpacing: 1,
              padding: "3px 8px", borderRadius: 4,
              fontFamily: "'Rajdhani', sans-serif",
            }}>NEW</span>
          )}
          {game.hot && (
            <span style={{
              background: `linear-gradient(135deg, #f97316, #ef4444)`,
              color: "white", fontSize: 10, fontWeight: 700, letterSpacing: 1,
              padding: "3px 8px", borderRadius: 4,
              fontFamily: "'Rajdhani', sans-serif",
            }}>🔥 HOT</span>
          )}
          {discount && (
            <span style={{
              background: "#22c55e", color: COLORS.bg,
              fontSize: 10, fontWeight: 700, letterSpacing: 1,
              padding: "3px 8px", borderRadius: 4,
            }}>-{discount}%</span>
          )}
        </div>

        {/* Rating */}
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          borderRadius: 8, padding: "4px 10px",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <span style={{ color: COLORS.gold, fontSize: 12 }}>★</span>
          <span style={{ color: COLORS.text, fontSize: 12, fontWeight: 600 }}>{game.rating}</span>
        </div>

        {/* Hover preview overlay */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, ${game.color}15, transparent)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fade-in 0.2s ease",
          }}>
            <a
              href={game.officialUrl}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              aria-label={`Open official media for ${game.title}`}
              style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `2px solid ${game.color}60`,
              textDecoration: "none",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill={game.color}>
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: "14px 16px 16px" }}>
        {/* Genre tag */}
        <div style={{
          display: "inline-flex", alignItems: "center",
          background: `${game.color}15`, border: `1px solid ${game.color}30`,
          borderRadius: 6, padding: "2px 8px", marginBottom: 8,
        }}>
          <span style={{ color: game.color, fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}>
            {game.genre}
          </span>
        </div>

        <h3 style={{
          fontSize: 16, fontWeight: 700, color: COLORS.text,
          marginBottom: 2, fontFamily: "'Rajdhani', sans-serif", letterSpacing: 0.3,
        }}>{game.title}</h3>
        <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 10 }}>
          {game.subtitle}
        </div>
        <div style={{ color: game.color, fontSize: 11, marginBottom: 10 }}>
          {game.mediaSource}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {game.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              background: COLORS.surface, borderRadius: 4,
              padding: "2px 7px", fontSize: 11, color: COLORS.muted,
            }}>{tag}</span>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            {game.originalPrice && (
              <div style={{ color: COLORS.muted, fontSize: 11, textDecoration: "line-through" }}>
                ${game.originalPrice}
              </div>
            )}
            <div style={{
              fontSize: 20, fontWeight: 800,
              color: game.price === 0 ? "#22c55e" : COLORS.text,
              fontFamily: "'Orbitron', monospace",
            }}>
              {game.price === 0 ? "FREE" : `$${game.price}`}
            </div>
          </div>

          <button onClick={handleAdd} style={{
            background: added
              ? "#22c55e"
              : `linear-gradient(135deg, ${game.color}, ${game.accentColor})`,
            border: "none", borderRadius: 8, padding: "8px 16px",
            color: "white", fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Inter', sans-serif",
            transition: "all 0.25s",
            boxShadow: `0 0 16px ${game.color}30`,
          }}>
            {added ? "✓ Added" : game.price === 0 ? "Play Free" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FEATURED HERO CAROUSEL ───────────────────────────────────────────────────
function FeaturedCarousel({ games, onAddToCart }) {
  const featured = games.filter(g => g.featured);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!featured.length) return undefined;
    let transitionTimer;
    const iv = setInterval(() => {
      setAnimating(true);
      transitionTimer = setTimeout(() => {
        setActive(p => (p + 1) % featured.length);
        setAnimating(false);
      }, 300);
    }, 5000);
    return () => {
      clearInterval(iv);
      clearTimeout(transitionTimer);
    };
  }, [featured.length]);

  const game = featured[active];
  if (!game) return null;
  const discount = game.originalPrice ? Math.round((1 - game.price / game.originalPrice) * 100) : null;

  return (
    <section id="featured-games" style={{ padding: "0 32px 64px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12, marginBottom: 28,
      }}>
        <div style={{
          width: 4, height: 24, borderRadius: 2,
          background: `linear-gradient(to bottom, ${COLORS.neon}, ${COLORS.cyan})`,
        }} />
        <h2 className="orbitron" style={{
          fontSize: 22, fontWeight: 700, color: COLORS.text, letterSpacing: 1,
        }}>Featured</h2>
      </div>

      <div style={{
        borderRadius: 20, overflow: "hidden", position: "relative",
        border: `1px solid ${game.color}40`,
        boxShadow: `0 0 60px ${game.color}20`,
        transition: "border-color 0.5s, box-shadow 0.5s",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 420px",
          minHeight: 380,
          opacity: animating ? 0 : 1,
          transform: animating ? "translateX(-10px)" : "translateX(0)",
          transition: "all 0.3s",
        }}>
          {/* Image side */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img
              src={game.img}
              alt={game.title}
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                transition: "transform 5s",
              }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to right, transparent 60%, ${COLORS.card})`,
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to bottom, transparent 50%, ${COLORS.card}80)`,
            }} />

            {/* Game tags overlay */}
            <div style={{ position: "absolute", bottom: 24, left: 24, display: "flex", gap: 8 }}>
              {game.tags.map(tag => (
                <span key={tag} style={{
                  background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 6, padding: "4px 10px",
                  color: COLORS.muted, fontSize: 12,
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Info side */}
          <div style={{
            background: COLORS.card, padding: "32px 28px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div>
              {/* Genre + new badge */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
                <span style={{
                  background: `${game.color}20`, border: `1px solid ${game.color}40`,
                  borderRadius: 6, padding: "3px 10px",
                  color: game.color, fontSize: 12, fontWeight: 600,
                }}>{game.genre}</span>
                {game.new && (
                  <span style={{
                    background: COLORS.neon, color: COLORS.bg,
                    borderRadius: 6, padding: "3px 10px",
                    fontSize: 12, fontWeight: 700,
                  }}>NEW</span>
                )}
              </div>

              <h3 className="orbitron" style={{
                fontSize: 28, fontWeight: 900, color: COLORS.text,
                marginBottom: 6, lineHeight: 1.15,
              }}>{game.title}</h3>
              <div style={{ color: game.color, fontSize: 14, marginBottom: 16, fontWeight: 600 }}>
                {game.subtitle}
              </div>
              <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 12 }}>
                Media: {game.mediaSource}
              </div>

              <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                {game.description}
              </p>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "Rating", value: `★ ${game.rating}`, color: COLORS.gold },
                  { label: "Reviews", value: game.reviews, color: COLORS.text },
                  { label: "Players", value: game.players, color: COLORS.cyan },
                  { label: "Genre", value: game.genre, color: game.color },
                ].map(s => (
                  <div key={s.label} style={{
                    background: COLORS.surface, borderRadius: 8,
                    padding: "10px 14px",
                    border: `1px solid ${COLORS.border}`,
                  }}>
                    <div style={{ color: COLORS.muted, fontSize: 11, marginBottom: 2 }}>{s.label}</div>
                    <div style={{ color: s.color, fontSize: 14, fontWeight: 700 }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
                {game.originalPrice && (
                  <span style={{ color: COLORS.muted, fontSize: 14, textDecoration: "line-through" }}>
                    ${game.originalPrice}
                  </span>
                )}
                {discount && (
                  <span style={{
                    background: "#22c55e20", border: "1px solid #22c55e40",
                    color: "#22c55e", fontSize: 12, fontWeight: 700,
                    borderRadius: 6, padding: "2px 8px",
                  }}>-{discount}%</span>
                )}
                <span className="orbitron" style={{
                  fontSize: 32, fontWeight: 900,
                  color: game.price === 0 ? "#22c55e" : COLORS.text,
                }}>
                  {game.price === 0 ? "FREE" : `$${game.price}`}
                </span>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => {
                    if (game.price === 0) {
                      window.open(game.officialUrl, "_blank", "noopener,noreferrer");
                      return;
                    }
                    onAddToCart(game);
                  }}
                  style={{
                  flex: 1,
                  background: `linear-gradient(135deg, ${game.color}, ${game.accentColor})`,
                  border: "none", borderRadius: 10, padding: "12px",
                  color: "white", fontSize: 14, fontWeight: 700,
                  cursor: "pointer", fontFamily: "'Inter', sans-serif",
                  boxShadow: `0 0 24px ${game.color}30`,
                }}>
                  {game.price === 0 ? "Play Free Now" : "Add to Cart"}
                </button>
                <button style={{
                  background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                  borderRadius: 10, padding: "12px 16px",
                  color: COLORS.muted, cursor: "pointer",
                  transition: "all 0.2s",
                }}>♡</button>
                <a href={game.officialUrl} target="_blank" rel="noreferrer" style={{
                  background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                  borderRadius: 10, padding: "12px 16px",
                  color: COLORS.muted, cursor: "pointer",
                  transition: "all 0.2s", textDecoration: "none",
                  fontSize: 13, fontWeight: 700,
                }}>Official Media</a>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{
          position: "absolute", bottom: 16, left: "40%",
          display: "flex", gap: 8,
        }}>
          {featured.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 24 : 6, height: 6, borderRadius: 3,
              background: i === active ? game.color : COLORS.border,
              border: "none", cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, accent }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      display: "flex", alignItems: "center", gap: 12, marginBottom: 32,
      opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)",
      transition: "all 0.6s",
    }}>
      <div style={{
        width: 4, height: 24, borderRadius: 2,
        background: `linear-gradient(to bottom, ${accent || COLORS.neon}, ${COLORS.cyan})`,
      }} />
      <div>
        <h2 className="orbitron" style={{
          fontSize: 22, fontWeight: 700, color: COLORS.text, letterSpacing: 1,
        }}>{title}</h2>
        {subtitle && <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 2 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

// ─── STORE GRID ───────────────────────────────────────────────────────────────
function StoreGrid({ games, onAddToCart, id }) {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [ref, visible] = useInView();

  const filtered = games.filter(g => {
    const matchCat = category === "All" || g.genre === category || g.genre.includes(category);
    return matchCat;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <section id={id} style={{ padding: "0 32px 80px", maxWidth: 1400, margin: "0 auto" }}>
      <SectionHeader title="All Games" subtitle="Browse our full collection" />

      {/* Filters */}
      <div style={{
        display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap", alignItems: "center",
      }}>
        {/* Categories */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{
              background: category === cat
                ? `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.purple})`
                : COLORS.surface,
              border: `1px solid ${category === cat ? "transparent" : COLORS.border}`,
              borderRadius: 20, padding: "7px 18px",
              color: category === cat ? "white" : COLORS.muted,
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s",
              boxShadow: category === cat ? `0 0 16px ${COLORS.neon}30` : "none",
            }}>{cat}</button>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Sort */}
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
          background: COLORS.surface, border: `1px solid ${COLORS.border}`,
          borderRadius: 8, padding: "7px 14px",
          color: COLORS.muted, fontSize: 13, cursor: "pointer",
          fontFamily: "'Inter', sans-serif", outline: "none",
        }}>
          <option value="featured">Featured</option>
          <option value="rating">Top Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      <div ref={ref} style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 20,
      }}>
        {filtered.map((game, i) => (
          <div key={game.id} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: `all 0.5s ${i * 0.07}s`,
          }}>
            <GameCard game={game} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 60, color: COLORS.muted }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <div>No games found matching your criteria</div>
        </div>
      )}
    </section>
  );
}

// ─── TRENDING SECTION ─────────────────────────────────────────────────────────
function TrendingSection({ games, onAddToCart }) {
  const trending = [...games].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const [ref, visible] = useInView();

  return (
    <section style={{
      padding: "64px 32px",
      background: `linear-gradient(to bottom, ${COLORS.bg}, ${COLORS.surface}20, ${COLORS.bg})`,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`,
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader title="🔥 Trending Now" subtitle="What everyone's playing right now" accent="#f59e0b" />

        <div ref={ref} style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 8 }}>
          {trending.map((game, i) => (
            <div key={game.id} style={{
              flexShrink: 0, width: 200,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: `all 0.5s ${i * 0.1}s`,
            }}>
              <div style={{
                position: "relative",
                borderRadius: 12, overflow: "hidden",
                border: `1px solid ${COLORS.border}`,
                transition: "all 0.25s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = game.color + "60";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.transform = "scale(1)";
              }}>
                <img src={game.thumb} alt={game.title}
                  style={{ width: "100%", height: 120, objectFit: "cover" }} />

                {/* Rank badge */}
                <div style={{
                  position: "absolute", top: 8, left: 8,
                  width: 28, height: 28, borderRadius: "50%",
                  background: i === 0
                    ? `linear-gradient(135deg, ${COLORS.gold}, #f97316)`
                    : "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800, color: "white",
                  fontFamily: "'Orbitron', monospace",
                }}>#{i + 1}</div>

                <div style={{ padding: "10px 12px", background: COLORS.card }}>
                  <div className="rajdhani" style={{
                    fontSize: 14, fontWeight: 700, color: COLORS.text,
                    marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>{game.title}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: COLORS.gold, fontSize: 12 }}>★ {game.rating}</span>
                    <span style={{
                      color: game.price === 0 ? "#22c55e" : COLORS.text,
                      fontSize: 12, fontWeight: 700,
                      fontFamily: "'Orbitron', monospace",
                    }}>{game.price === 0 ? "FREE" : `$${game.price}`}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AI RECOMMENDATION SECTION ────────────────────────────────────────────────
function AIRecommendations({ games, onAddToCart }) {
  const recs = games.filter(g => g.genre === "RPG" || g.genre === "Action RPG");
  const [ref, visible] = useInView();

  return (
    <section style={{ padding: "64px 32px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12, marginBottom: 32,
      }}>
        <div style={{
          width: 4, height: 24, borderRadius: 2,
          background: `linear-gradient(to bottom, ${COLORS.purple}, ${COLORS.pink})`,
        }} />
        <div>
          <h2 className="orbitron" style={{
            fontSize: 22, fontWeight: 700, color: COLORS.text, letterSpacing: 1,
          }}>AI Picks For You</h2>
          <div style={{ color: COLORS.purple, fontSize: 13, marginTop: 2 }}>
            ✦ Because you like RPGs
          </div>
        </div>

        {/* AI badge */}
        <div style={{
          marginLeft: "auto",
          background: `${COLORS.purple}15`, border: `1px solid ${COLORS.purple}40`,
          borderRadius: 20, padding: "4px 12px",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: COLORS.purple, animation: "live-pulse 2s ease infinite",
          }} />
          <span style={{ color: COLORS.purple, fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>
            AI-POWERED
          </span>
        </div>
      </div>

      {/* Glassmorphism recommendation cards */}
      <div ref={ref} style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 20,
      }}>
        {recs.map((game, i) => (
          <div key={game.id} style={{
            background: `linear-gradient(135deg, ${game.color}08, ${COLORS.surface}80)`,
            backdropFilter: "blur(16px)",
            border: `1px solid ${game.color}30`,
            borderRadius: 16, padding: 20,
            display: "flex", gap: 16, alignItems: "flex-start",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.5s ${i * 0.1}s`,
            cursor: "pointer",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = game.color + "60";
            e.currentTarget.style.boxShadow = `0 8px 32px ${game.color}15`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = game.color + "30";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <img src={game.thumb} alt={game.title} style={{
              width: 90, height: 56, objectFit: "cover", borderRadius: 8, flexShrink: 0,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: game.color, fontSize: 11, fontWeight: 600, marginBottom: 4 }}>
                {game.genre} · Recommended
              </div>
              <div className="rajdhani" style={{
                fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 6,
              }}>{game.title}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: COLORS.gold, fontSize: 13 }}>★ {game.rating}</span>
                <span className="orbitron" style={{
                  fontSize: 14, fontWeight: 700,
                  color: game.price === 0 ? "#22c55e" : COLORS.text,
                }}>
                  {game.price === 0 ? "FREE" : `$${game.price}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────
function PromoBanner() {
  const [ref, visible] = useInView();

  return (
    <section id="premium-deal" style={{ padding: "0 32px 64px", maxWidth: 1400, margin: "0 auto" }}>
      <div ref={ref} style={{
        borderRadius: 20, overflow: "hidden", position: "relative",
        background: `linear-gradient(135deg, ${COLORS.neon}15, ${COLORS.purple}15)`,
        border: `1px solid ${COLORS.neon}30`,
        padding: "48px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 24,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s",
      }}>
        {/* Decorative elements */}
        <div style={{
          position: "absolute", top: -40, right: 200,
          width: 200, height: 200, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.purple}20, transparent)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -20, left: 100,
          width: 150, height: 150, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.cyan}15, transparent)`,
          pointerEvents: "none",
        }} />

        <div>
          <div className="rajdhani" style={{ color: COLORS.cyan, fontSize: 13, letterSpacing: 3, marginBottom: 8 }}>
            LIMITED TIME OFFER
          </div>
          <h3 className="orbitron" style={{
            fontSize: 32, fontWeight: 900, color: COLORS.text, marginBottom: 8,
          }}>GameVault Premium</h3>
          <p style={{ color: COLORS.muted, fontSize: 15, maxWidth: 420, lineHeight: 1.6 }}>
            Unlock over 400 games with one subscription. Cloud saves, early access, and exclusive member discounts.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20 }}>
            <div>
              <span className="orbitron" style={{ fontSize: 28, fontWeight: 900, color: COLORS.neon }}>$9.99</span>
              <span style={{ color: COLORS.muted, fontSize: 13 }}> / month</span>
            </div>
            <span style={{ color: COLORS.muted, fontSize: 13, textDecoration: "line-through" }}>$14.99</span>
            <span style={{
              background: "#22c55e20", border: "1px solid #22c55e40",
              color: "#22c55e", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 6,
            }}>33% OFF</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
          <button style={{
            background: `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.purple})`,
            border: "none", borderRadius: 12, padding: "14px 32px",
            color: "white", fontSize: 14, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Inter', sans-serif",
            boxShadow: `0 0 30px ${COLORS.neon}40`,
            animation: "pulse-glow 3s ease infinite",
          }}>
            Try Free for 30 Days
          </button>
          <button style={{
            background: "transparent", border: `1px solid ${COLORS.border}`,
            borderRadius: 12, padding: "14px 24px",
            color: COLORS.muted, fontSize: 14, cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
          }}>Learn More</button>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: COLORS.surface,
      borderTop: `1px solid ${COLORS.border}`,
      padding: "48px 32px 32px",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32,
                background: `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.cyan})`,
                borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 900,
              }}>G</div>
              <span className="orbitron" style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                GAMEVAULT
              </span>
            </div>
            <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              The next generation gaming marketplace. Buy, play, and connect with millions of gamers worldwide.
            </p>
          </div>

          {[
            { title: "Store", links: ["Browse All", "New Releases", "Top Sellers", "Deals", "Free Games"] },
            { title: "Community", links: ["Forums", "Workshop", "Leaderboards", "Events", "Blog"] },
            { title: "Support", links: ["Help Center", "Contact Us", "Privacy Policy", "Terms", "Careers"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="rajdhani" style={{
                color: COLORS.text, fontWeight: 700, fontSize: 14,
                letterSpacing: 2, marginBottom: 16,
              }}>{col.title.toUpperCase()}</h4>
              {col.links.map(link => (
                <a key={link} href="#" style={{
                  display: "block", color: COLORS.muted, fontSize: 13,
                  textDecoration: "none", marginBottom: 8,
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.target.style.color = COLORS.neon}
                onMouseLeave={e => e.target.style.color = COLORS.muted}
                >{link}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: `1px solid ${COLORS.border}`, paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ color: COLORS.muted, fontSize: 13 }}>
            © 2025 GameVault Inc. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Cookies"].map(item => (
              <a key={item} href="#" style={{
                color: COLORS.muted, fontSize: 13, textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = COLORS.neon}
              onMouseLeave={e => e.target.style.color = COLORS.muted}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── CART SIDEBAR ─────────────────────────────────────────────────────────────
function CartSidebar({ cart, onRemove, onClose }) {
  const total = cart.reduce((sum, g) => sum + g.price, 0);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 2000,
      display: "flex", justifyContent: "flex-end",
    }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
      }} />

      {/* Panel */}
      <div style={{
        position: "relative", width: 400,
        background: COLORS.card,
        borderLeft: `1px solid ${COLORS.border}`,
        display: "flex", flexDirection: "column",
        animation: "slide-in-left 0.3s ease reverse",
        boxShadow: `-20px 0 60px rgba(0,0,0,0.5)`,
        overflowY: "auto",
      }}>
        {/* Header */}
        <div style={{
          padding: "24px 24px 20px",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <h3 className="orbitron" style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>
            Cart ({cart.length})
          </h3>
          <button onClick={onClose} style={{
            background: COLORS.surface, border: `1px solid ${COLORS.border}`,
            borderRadius: 8, padding: "6px 12px",
            color: COLORS.muted, cursor: "pointer", fontSize: 13,
          }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: COLORS.muted }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎮</div>
              <div>Your cart is empty</div>
            </div>
          ) : (
            cart.map((game, i) => (
              <div key={`${game.id}-${i}`} style={{
                display: "flex", gap: 14, alignItems: "center",
                background: COLORS.surface, borderRadius: 10,
                padding: "12px", border: `1px solid ${COLORS.border}`,
              }}>
                <img src={game.thumb} alt={game.title} style={{
                  width: 64, height: 40, objectFit: "cover", borderRadius: 6, flexShrink: 0,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="rajdhani" style={{
                    fontSize: 14, fontWeight: 700, color: COLORS.text,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{game.title}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12 }}>{game.genre}</div>
                </div>
                <div>
                  <div className="orbitron" style={{
                    fontSize: 14, fontWeight: 700, color: COLORS.text, textAlign: "right",
                  }}>${game.price}</div>
                  <button onClick={() => onRemove(i)} style={{
                    background: "none", border: "none",
                    color: COLORS.muted, cursor: "pointer", fontSize: 12,
                    padding: 0, marginTop: 2,
                  }}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total + Checkout */}
        {cart.length > 0 && (
          <div style={{
            padding: 24, borderTop: `1px solid ${COLORS.border}`,
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: 20, alignItems: "center",
            }}>
              <span style={{ color: COLORS.muted, fontSize: 14 }}>Total</span>
              <span className="orbitron" style={{ fontSize: 24, fontWeight: 900, color: COLORS.text }}>
                ${total.toFixed(2)}
              </span>
            </div>
            <button style={{
              width: "100%",
              background: `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.purple})`,
              border: "none", borderRadius: 12, padding: "14px",
              color: "white", fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Inter', sans-serif",
              boxShadow: `0 0 30px ${COLORS.neon}30`,
            }}>
              Checkout — ${total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TOAST NOTIFICATION ───────────────────────────────────────────────────────
function Toast({ message, onDone }) {
  useEffect(() => {
    const toastTimer = setTimeout(onDone, 2500);
    return () => clearTimeout(toastTimer);
  }, [onDone]);
  return (
    <div style={{
      position: "fixed", bottom: 32, right: 32, zIndex: 3000,
      background: COLORS.card, border: `1px solid ${COLORS.neon}40`,
      borderRadius: 12, padding: "14px 20px",
      boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${COLORS.neon}20`,
      display: "flex", alignItems: "center", gap: 12,
      animation: "slide-up 0.3s ease",
      backdropFilter: "blur(16px)",
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        background: `${COLORS.neon}20`, border: `1px solid ${COLORS.neon}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: COLORS.neon, fontSize: 14,
      }}>✓</div>
      <div>
        <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>{message}</div>
        <div style={{ color: COLORS.muted, fontSize: 12 }}>Added to cart</div>
      </div>
    </div>
  );
}

// ─── SCROLL TO TOP ────────────────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
      position: "fixed", bottom: 32, left: 32, zIndex: 500,
      width: 44, height: 44, borderRadius: "50%",
      background: `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.purple})`,
      border: "none", cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 0 20px ${COLORS.neon}40`,
      fontSize: 18, color: "white",
      animation: "fade-in 0.3s ease",
    }}>↑</button>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function GameVault() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleAddToCart = useCallback((game) => {
    if (game.price === 0) return;
    setCart(prev => [...prev, game]);
    setToast(`${game.title} added to cart!`);
  }, []);

  const handleRemoveFromCart = useCallback((index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  }, []);

  const filteredGames = GAMES.filter(g =>
    searchQuery
      ? g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.genre.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  if (loading) {
    return (
      <>
        <style>{GLOBAL_STYLES}</style>
        <LoadingScreen onDone={() => setLoading(false)} />
      </>
    );
  }

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <Cursor />

      <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cart.length}
          onCartOpen={() => setCartOpen(true)}
        />

        <Hero onExplore={() => {
          document.getElementById("store-grid")?.scrollIntoView({ behavior: "smooth" });
        }} />

        <LiveTicker />

        <div style={{ paddingTop: 48 }}>
          <FeaturedCarousel games={GAMES} onAddToCart={handleAddToCart} />
          <TrendingSection games={GAMES} onAddToCart={handleAddToCart} />
          <AIRecommendations games={GAMES} onAddToCart={handleAddToCart} />
          <StoreGrid
            id="store-grid"
            games={filteredGames}
            onAddToCart={handleAddToCart}
          />
          <PromoBanner />
        </div>

        <Footer />
      </div>

      {/* Floating cart button */}
      {cart.length > 0 && !cartOpen && (
        <button onClick={() => setCartOpen(true)} style={{
          position: "fixed", bottom: 32, right: 32, zIndex: 500,
          background: `linear-gradient(135deg, ${COLORS.neon}, ${COLORS.purple})`,
          border: "none", borderRadius: 28, padding: "12px 24px",
          color: "white", fontSize: 14, fontWeight: 700,
          cursor: "pointer", fontFamily: "'Inter', sans-serif",
          boxShadow: `0 0 30px ${COLORS.neon}40`,
          display: "flex", alignItems: "center", gap: 10,
          animation: "pulse-glow 3s ease infinite",
        }}>
          🛒 {cart.length} item{cart.length > 1 ? "s" : ""} · ${cart.reduce((s, g) => s + g.price, 0).toFixed(2)}
        </button>
      )}

      {cartOpen && (
        <CartSidebar
          cart={cart}
          onRemove={handleRemoveFromCart}
          onClose={() => setCartOpen(false)}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      <ScrollToTop />
    </>
  );
}