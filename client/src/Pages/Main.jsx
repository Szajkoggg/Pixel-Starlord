import React, { Fragment } from "react";
import { useEffect, useState, useCallback } from "react";
import Loading from "../Components/Loading";
import Battle from "../Components/Battle";
import MonsterCard from "../Components/MonsterCard";
import "./Styles/Main.css";

// https://frozen-crag-11138.herokuapp.com/
const fetchMonsterPicture = (id) => {
  console.log(id);
  return fetch(
    `https://corsproxy.io/?https://app.pixelencounter.com/api/basic/monsters/${id}/webp?size=100`
  )
    .then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob));
};

const fetchMonsterDetails = (id) => {
  return fetch(
    `https://corsproxy.io/?https://app.pixelencounter.com/api/basic/monsterdetails/${id}`
  ).then((response) => response.json());
};

const generateRandomId = () => {
  return Math.floor(Math.random() * 2147483646 + 1);
};

const fetchRandomPlanet = (id) => {
  return fetch(
    `https://corsproxy.io/?https://app.pixelencounter.com/api/basic/planets/${id}?width=1080&height=1080`
  )
    .then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob));
};

const pickRandomMonster = (monsters) => {
  return monsters[Math.floor(Math.random() * monsters.length)];
};

const pickRandomAttribute = () => {
  let randomNumber = Math.floor(Math.random() * 4);
  switch (randomNumber) {
    case 0:
      return "Endurance";
    case 1:
      return "Intelligence";
    case 2:
      return "Strength";
    case 3:
      return "Dexterity";
    default:
      return "No Attribute";
  }
};

const Main = () => {
  const fetchMonsters = (skip) => {
    return fetch(
      `https://corsproxy.io/?https://app.pixelencounter.com/odata/basic/monsterdetails?top=100&orderby=id%20desc&skip=${skip}&$count=true`
    ).then((response) => response.json());
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isBattle, setIsBattle] = useState(false);
  const [monsters, setMonsters] = useState([]);
  const [friendlyMonsters, setFriendlyMonsters] = useState([]);
  const [enemyMonsters, setEnemyMonsters] = useState([]);
  const [monsterAmount, setMonsterAmount] = useState(3);
  const [monsterMaxLevel, setMonsterMaxLevel] = useState(25);
  const [monsterMinLevel, setMonsterMinLevel] = useState(20);
  const [planet, setPlanet] = useState(null);
  const [planetAttribute, setPlanetAttribute] = useState(null);

  useEffect(() => {
    setPlanetAttribute(pickRandomAttribute());
  }, []);

  const pickSomeMonsters = (minLevel, maxLevel, amount, setter) => {
    setIsLoading(true);

    fetchMonsters(Math.floor(Math.random() * 3000))
      .then((fetchedmonsters) => {
        const levelFilteredMonsters = fetchedmonsters.value.filter(
          (monster) => monster.level <= maxLevel && monster.level >= minLevel
        );
        console.log(levelFilteredMonsters.length);
        if (levelFilteredMonsters.length < amount) {
          // throw new Error("Retry loading")
          console.log("itt jartunk");
          return fetchMonsters(Math.floor(Math.random() * 3000));
        } else {
          return levelFilteredMonsters;
        }
      })
      .then((levelFilteredMonsters) => {
        console.log("here");
        let monstersDetails = [];
        let chosenMonsterIDs = [];
        for (let i = 0; i < amount; i++) {
          let monsterToPush = [];
          let randomMonster = pickRandomMonster(levelFilteredMonsters);
          while (chosenMonsterIDs.includes(randomMonster.id)) {
            randomMonster = pickRandomMonster(levelFilteredMonsters);
          }
          chosenMonsterIDs.push(randomMonster.id);
          fetchMonsterDetails(randomMonster.id).then((monsterDetails) => {
            monsterToPush = monsterDetails;
            fetchMonsterPicture(monsterDetails.id).then((picture) => {
              monsterToPush.picture = picture;
              monstersDetails.push(monsterToPush);
              if (monstersDetails.length >= amount) {
                console.log(monstersDetails);
                setter(monstersDetails);
                setIsLoading(false);
              }
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pickRandomPlanet = () => {
    fetchRandomPlanet(generateRandomId()).then((planet) => setPlanet(planet));
  };

  return (
    <div className="main">
      <img className="planet" alt="planet" src={planet}></img>
      {isBattle ? (
        <Battle
          friendlyMonsters={friendlyMonsters}
          enemyMonsters={enemyMonsters}
          planetAttribute={planetAttribute}
          pickRandomAttribute={pickRandomAttribute}
        />
      ) : (
        <div>
          <button onClick={pickRandomPlanet}>Generate planet!</button>
          <button
            onClick={() => pickSomeMonsters(1, 5, 3, setFriendlyMonsters)}
          >
            Generate friendly Monsters!
          </button>
          <button onClick={() => pickSomeMonsters(40, 45, 3, setEnemyMonsters)}>
            Generate enemy Monsters!
          </button>
          <button onClick={() => setIsBattle(true)}>To Battle!</button>
          <h3>Planet modifier: {planetAttribute}</h3>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="every-monsters-container">
              <div className="friendly-monsters-container">
                {friendlyMonsters &&
                  friendlyMonsters.map((monster) => {
                    return <MonsterCard key={monster.id} monster={monster} />;
                  })}
              </div>
              <div className="enemy-monsters-container">
                {enemyMonsters &&
                  enemyMonsters.map((monster) => {
                    return <MonsterCard key={monster.id} monster={monster} />;
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
