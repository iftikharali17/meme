import "./App.css";

import React, { useEffect, useState } from "react";
import FetchApi from "./Components/FetchApi";

function App() {
  const [memes, setMemes] = FetchApi();
  const [selectedMeme, setSelectedMeme] = useState();
  const [text, setText] = useState({
    topText: "",
    bottomText: ""
  });

  const [submitted, setSubmitted] = useState({
    topText: "",
    bottomText: ""
  });

  const clearInputs = () => {
    setText({
      topText: "",
      bottomText: ""
    });
  };

  const memeText = () => {
    setSubmitted(text);
    clearInputs();
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setText((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    setSelectedMeme(memes[0]);
  }, [memes]);

  return (
    <div>
      <input
        onChange={onInputChange}
        placeholder="Type meme top text"
        type="text"
        value={text.topText}
        name="topText"
      />
      <input
        onChange={onInputChange}
        placeholder="Type 
        meme bottom text"
        type="text"
        value={text.bottomText}
        name="bottomText"
      />
      <button onClick={memeText}>Generate Meme</button>

      <button
        onClick={() => {
          const currentIndex = memes.indexOf(selectedMeme);
          if (currentIndex < memes.length - 1)
            setSelectedMeme(memes[currentIndex + 1]);
          else alert("Its already last meme, please try previous meme");
        }}
      >
        Next Meme
      </button>

      <button onClick={() => {
        const currentIndex = memes.indexOf(selectedMeme);
        if (currentIndex > 0) setSelectedMeme(memes[currentIndex - 1]);
        else alert("Its first meme, please try next meme");
      }}
      >Previous Meme</button>

      <button onClick={() => {
        setSelectedMeme(memes[Math.floor(Math.random() * memes.length)]);
      }}
      >Random Meme</button>

      {selectedMeme ? (
        <div id="memeContainer">
          <img id="memeImage" alt="Selected Meme" src={selectedMeme.url} />
          <span id="topText">{submitted.topText}</span>
          <span id="bottomText">{submitted.bottomText}</span>
        </div>
      ) : null}
    </div>
  );
}

export default App;
