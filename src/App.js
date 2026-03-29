import { useState, useEffect } from "react";
import "./App.css";

const pages = [
  {
    text: [
      "Hey Poonam 👋",
      "This might be the most effort",
      "someone has put just to say hi 😄"
    ],
    button: "Okay… I’m curious 👀"
  },
  {
    text: [
      "I think I’ve seen you around campus a few times…",
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
      "I’ll be honest… this might sound a little funny 😅",
      "I even ended up giving interviews like KY PR and Technex PR…",
      "Somewhere I thought we might finally cross paths.",
      "But yeah… that didn’t really happen 😄"
    ],
    button: "That’s actually funny 😄"
  },
  {
    text: [
      "I did try once to start the conversation…",
      "on your birthday 😄",
      "But mid sems were just around the corner,",
      "so it didn’t really turn into one."
    ],
    button: "Ohh okay…"
  },
  {
    text: [
      "Waiting clearly wasn’t working…",
      "So I decided to do something about it.",
      "So here I am."
    ],
    button: "Alright, go on…"
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
      "I won’t make this complicated…",
      "I just wanted to talk to you :)",
      "and maybe get to know you better."
    ],
    buttons: ["Let’s talk 😊", "Maybe later 😄"]
  }
];

export default function App() {
  const [page, setPage] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    setVisibleLines(0);

    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < pages[page].text.length) return prev + 1;
        return prev;
      });
    }, 250);

    return () => clearInterval(timer);
  }, [page]);

  const nextPage = () => {
    setPage((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
  };

  const openInsta = () => {
    window.open("https://instagram.com/raghav.iitbhu", "_blank");
  };

  // 🔥 Highlight words
  const highlightText = (text) => {
    return text
      .replace(/hi/gi, '<span class="highlight">hi</span>')
      .replace(/talk/gi, '<span class="highlight">talk</span>')
      .replace(/you/gi, '<span class="highlight-soft">you</span>');
  };

  return (
    <div className="container">
      <div className="card">

        {pages[page].text.slice(0, visibleLines).map((line, i) => (
          <p
            key={i}
            className={i === 0 ? "title fade-text" : "fade-text"}
            dangerouslySetInnerHTML={{ __html: highlightText(line) }}
          />
        ))}

        <div className="buttons">
          {pages[page].buttons ? (
            <>
              <button onClick={openInsta}>
                {pages[page].buttons[0]}
              </button>

              <button onClick={openInsta}>
                {pages[page].buttons[1]}
              </button>
            </>
          ) : (
            <button onClick={nextPage}>
              {pages[page].button}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}