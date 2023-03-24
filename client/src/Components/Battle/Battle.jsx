import { useEffect, useState, useCallback } from "react";
import MonsterCard from "../MonsterCard";
import Loading from "../Loading";
import "./Battle.css";

const pickRandomAttributeEffect = (planetAttribute, pickRandomAttribute) => {
  const randomNumber = Math.floor(Math.random() * 4);
  if (randomNumber === 0) {
    return planetAttribute;
  } else {
    return pickRandomAttribute();
  }
};

const Battle = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [friendlyMonsters, setFriendlyMonsters] = useState(
    props.friendlyMonsters
  );
  const [enemyMonsters, setEnemyMonsters] = useState(props.enemyMonsters);
  const [turn, setTurn] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [attributeEffect, setAttributeEffect] = useState(null);
  const [planetAttribute] = useState(props.planetAttribute);
  const [chosenMonster, setChosenMonster] = useState({
    id: 0,
    affiliation: "",
  });
  const [toAttackMonster, setToAttackMonster] = useState({
    id: 0,
    affiliation: "",
  });

  useEffect(() => {
    setAttributeEffect(
      pickRandomAttributeEffect(planetAttribute, props.pickRandomAttribute)
    );
  }, [planetAttribute, turn, props.pickRandomAttribute]);

  const handleSelect = (e) => {
    setChosenMonster(e.target.parent);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h3>Active effect: {attributeEffect}</h3>
      <div className="battleground">
        <div className="player1">Player1</div>
        <div className="every-monsters-container">
          <div className="friendly-monsters-container">
            {friendlyMonsters &&
              friendlyMonsters.map((monster) => {
                let key = `friendly-${monster}`;
                return (
                  <MonsterCard
                    key={key}
                    monster={monster}
                    onClick={handleSelect}
                    affiliation="friendly"
                  />
                );
              })}
          </div>
          <div className="enemy-monsters-container">
            {enemyMonsters &&
              enemyMonsters.map((monster) => {
                let key = `enemy-${monster}`;
                return (
                  <MonsterCard
                    key={key}
                    monster={monster}
                    onClick={handleSelect}
                    affiliation="enemy"
                  />
                );
              })}
          </div>
        </div>
        <div className="player2">Player2</div>
      </div>
    </div>
  );
};
export default Battle;
