import { useState, useEffect } from "react";
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
      "Prove you're human 🤖",
      "Click the button if you laughed at least once so far 😄"
    ],
    button: "Okay fine… maybe once 😄"
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
      "I won't make this complicated…",
      "I just wanted to talk to you :)",
      "and maybe get to know you better."
    ],
    button: "Go on… 😊"
  },
  {
    text: [
      "I built a whole website just to talk to you…",
      "The least you can do is one cafe date ☕ 😄",
      "No pressure though —",
      "I'm just a guy who thought you were worth it 😊"
    ],
    buttons: ["Okay fine, let's go ☕", "Maybe later 😄"]
  }
];

export default function App() {
  const [page, setPage] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [cardKey, setCardKey] = useState(0);

  useEffect(() => {
    setVisibleLines(0);

    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < pages[page].text.length) return prev + 1;
        return prev;
      });
    }, 260);

    return () => clearInterval(timer);
  }, [page]);

  const nextPage = () => {
    if (page < pages.length - 1) {
      setPage((prev) => prev + 1);
      setCardKey((prev) => prev + 1);
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

  const isLastPage = page === pages.length - 1;

  return (
    <div className="bg">
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>
      <div className="noise"></div>

      {/* PARTICLES */}
      <div className="particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="container">
        <div className="card" key={cardKey}>

          {pages[page].text.slice(0, visibleLines).map((line, i) => (
            <p
              key={i}
              className={i === 0 ? "title fade-text" : "fade-text"}
              dangerouslySetInnerHTML={{ __html: highlightText(line) }}
            />
          ))}

          <div className="divider"></div>

          <div className="buttons">
            {pages[page].buttons ? (
              <>
                <button
                  className={`primary ${isLastPage ? "heartbeat" : ""}`}
                  onClick={openInsta}
                >
                  {pages[page].buttons[0]}
                </button>
                <button onClick={openInsta}>
                  {pages[page].buttons[1]}
                </button>
              </>
            ) : (
              <button className="primary" onClick={nextPage}>
                {pages[page].button}
              </button>
            )}
          </div>

          <div className="page-dots">
            {pages.map((_, i) => (
              <div key={i} className={`dot ${i === page ? "active" : ""}`}></div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}