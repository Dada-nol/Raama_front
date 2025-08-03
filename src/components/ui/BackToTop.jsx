import React, { useEffect, useState } from "react";

function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const vh100 = window.innerHeight - 100;
      if (window.scrollY > vh100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="w-16 h-16 fixed bottom-24 right-5 mr-5 p-4 rounded-[50px] border border-primary text-text"
      style={{
        display: showButton ? "block" : "none",
      }}
    >
      <p className="rotate-[180deg] text-2xl leading-none">V</p>
    </button>
  );
}

export default BackToTop;
