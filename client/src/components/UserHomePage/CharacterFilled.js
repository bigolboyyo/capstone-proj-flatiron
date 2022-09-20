import React from "react";

function CharacterFilled({ char, idx }) {
  const handleCharDeletion = async () => {
    const config = {
      method: "DELETE",
    };
    fetch(`/characters/${char.id}`, config)
      .then((r) => r.text())
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <h1 key={idx}>
      {char.character_name} ---- {char.background} <button>Continue</button>{" "}
      <button onClick={handleCharDeletion}>Delete</button>
    </h1>
  );
}

export default CharacterFilled;