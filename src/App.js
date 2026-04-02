import { useState, useEffect, useRef } from "react";
import "./App.css";

const pages = [
  {
    text: [
      "Hey Poonam 👋",
      "This might be the most effort",
      "someone has put just to say hi 😄"
    ],
    button: "Okay… I'm curious 👀"
  },
  {
    text: [
      "I think I've seen you around campus a few times…",
      "Not sure if you noticed me though 😄"
    ],
    button: "Wait… really?"
  },
  {
    text: [
      "Different branch, different clubs…",
      "so never really got a chance to talk."
    ],
    button: "Makes sense…"
  },
  {
    text: [
      "I'll be honest… this might sound a little funny 😅",
      "I even ended up giving interviews like KY PR and Technex PR…",
      "Somewhere I thought we might finally cross paths.",
      "But yeah… that didn't really happen 😄"
    ],
    button: "That's actually funny 😄"
  },
  {
    text: [
      "I did try once to start the conversation…",
      "on your birthday 😄",
      "But mid sems were just around the corner,",
      "so it didn't really turn into one."
    ],
    button: "Ohh okay…"
  },
  {
    text: [
      "Waiting clearly wasn't working…",
      "So I decided to do something about it.",
      "So here I am."
    ],
    button: "Alright, go on…"
  },
  {
    text: [
      "I don't usually do stuff like this…",
      "but then again,",
      "I don't usually see someone and think —",
      "\"okay she seems different\" 😊"
    ],
    button: "Okay… go on 👀"
  },
  {
    text: [
      "I could've just slid into the DMs…",
      "but that felt too easy 😄",
      "You deserved something more interesting."
    ],
    button: "Okay that's a little sweet… 🥹"
  },
  {
    text: [
      "So… hi 👋",
      "Nice to finally meet you :)"
    ],
    button: "Hi 😄"
  },
  {
     text: [
      "At this point…",
      "I hope this made you smile at least once 😄"
    ],
    button: "Okay… maybe it did 😄"
  },
  {
    text: [
      "I won't make this complicated…",
      "I just wanted to talk to you :)",
      "and maybe get to know you better."
    ],
    button: "Go on… 😊"
  },
  {
  text: [
    "If you made it till here…",
    "I think I've earned at least one conversation 😄",
    "Just wanted to finally say hi in person 😊",
    "So… cafeteria sometime? ☕"
  ],
  buttons: ["Okay, fair enough ☕", "Maybe later 😄"]
  }
];

export default function App() {
  const [page, setPage] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = Array.from({ length: 350 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        o: Math.random() * 0.6 + 0.1,
        twinkle: Math.random() * Math.PI * 2
      }));
    };

    const spawnShootingStar = () => {
      shootingStarsRef.current.push({
        x: Math.random() * canvas.width * 0.6,
        y: Math.random() * canvas.height * 0.4,
        len: Math.random() * 120 + 80,
        speed: Math.random() * 8 + 6,
        opacity: 1
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(s => {
        s.twinkle += 0.02;
        const o = s.o * (0.7 + 0.3 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${o})`;
        ctx.fill();
      });

      shootingStarsRef.current = shootingStarsRef.current.filter(ss => ss.opacity > 0);
      shootingStarsRef.current.forEach(ss => {
        ss.x += ss.speed;
        ss.y += ss.speed * 0.4;
        ss.opacity -= 0.018;
        const grad = ctx.createLinearGradient(
          ss.x - ss.len, ss.y - ss.len * 0.4,
          ss.x, ss.y
        );
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(255,220,180,${ss.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(255,255,255,${ss.opacity})`);
        ctx.beginPath();
        ctx.moveTo(ss.x - ss.len, ss.y - ss.len * 0.4);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    const shootInterval = setInterval(spawnShootingStar, 2000);
    setTimeout(spawnShootingStar, 500);
    setTimeout(spawnShootingStar, 1500);
    setTimeout(spawnShootingStar, 2500);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(shootInterval);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  useEffect(() => {
    setVisibleLines(0);
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev < pages[page].text.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 270);
    return () => clearInterval(timer);
  }, [page]);

  const nextPage = () => {
    if (page < pages.length - 1) {
      setPage(prev => prev + 1);
      setCardKey(prev => prev + 1);
    }
  };

  const openInsta = () => {
    window.open("https://instagram.com/raghav.iitbhu", "_blank");
  };

  const highlightText = (text) => {
    return text
      .replace(/hi/gi, '<span class="highlight">hi</span>')
      .replace(/talk/gi, '<span class="highlight">talk</span>')
      .replace(/you/gi, '<span class="highlight-soft">you</span>');
  };

  const addRipple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(btn.offsetWidth, btn.offsetHeight);
    ripple.className = "ripple";
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const handleMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--mx", ((e.clientX - rect.left) / rect.width * 100) + "%");
    btn.style.setProperty("--my", ((e.clientY - rect.top) / rect.height * 100) + "%");
  };

  const isLastPage = page === pages.length - 1;

  return (
    <div className="bg">
      <canvas ref={canvasRef} className="star-canvas" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <div className="container">
        <div className="card" key={cardKey}>
          <div className="card-inner">

            {pages[page].text.slice(0, visibleLines).map((line, i) => (
              <p
                key={i}
                className={i === 0 ? "line title" : "line"}
                style={{ animationDelay: `${i * 0.1}s` }}
                dangerouslySetInnerHTML={{ __html: highlightText(line) }}
              />
            ))}

            <div className="divider" />

            <div className="buttons">
              {pages[page].buttons ? (
                <>
                  <button
                    className={`primary ${isLastPage ? "heartbeat" : ""}`}
                    onClick={(e) => { addRipple(e); setTimeout(openInsta, 300); }}
                    onMouseMove={handleMouseMove}
                  >
                    {pages[page].buttons[0]}
                  </button>
                  <button
                    onClick={(e) => { addRipple(e); setTimeout(openInsta, 300); }}
                    onMouseMove={handleMouseMove}
                  >
                    {pages[page].buttons[1]}
                  </button>
                </>
              ) : (
                <button
                  className="primary"
                  onClick={(e) => { addRipple(e); setTimeout(nextPage, 200); }}
                  onMouseMove={handleMouseMove}
                >
                  {pages[page].button}
                </button>
              )}
            </div>

            <div className="dots">
              {pages.map((_, i) => (
                <div key={i} className={`dot ${i === page ? "active" : ""}`} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}