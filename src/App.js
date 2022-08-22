import "./App.css";

import React, { useEffect, useState } from "react";
import FetchApi from "./Components/FetchApi"; //Fetch Meme Images

function App() {
  const [memes, setMemes] = FetchApi(); //fetched state variable declaration
  const [selectedMeme, setSelectedMeme] = useState();
  const [text, setText] = useState({
    topText: "",
    bottomText: ""
  });

  const [submitted, setSubmitted] = useState({
    topText: "",
    bottomText: ""
  });

  //Clears input fields
  const clearInputs = () => {
    setText({
      topText: "",
      bottomText: ""
    });
  };

  //Generates text on the meme image
  const memeText = () => {
    setSubmitted(text);
    clearInputs();
  };

  const nextMeme = () => {
    const currentIndex = memes.indexOf(selectedMeme);
    if (currentIndex < memes.length - 1)
      setSelectedMeme(memes[currentIndex + 1]);
    else alert("Its already last meme, please try previous meme");
  };

  const previousMeme = () => {
    const currentIndex = memes.indexOf(selectedMeme);
    if (currentIndex > 0)
      setSelectedMeme(memes[currentIndex - 1]);
    else alert("Its first meme, please try next meme");
  };

  const randomMeme = () => {
    setSelectedMeme(memes[Math.floor(Math.random() * memes.length)]);
  };

  //checks if user wrote something in the input field
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setText((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  //initializing first meme
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

      <button onClick={nextMeme}>Next Meme</button>

      <button onClick={previousMeme}>Previous Meme</button>

      <button onClick={randomMeme}>Random Meme</button>

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
