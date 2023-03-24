import "./MonsterCard.css"

const MonsterCard = ({ monster, onClick, affiliation }) => {
    let key = `${affiliation}-${monster}`;
  return (
    <div className="monster-card" key={key} onClick={onClick}>
      <img className="monster-image" alt="monster" src={monster.picture}></img>
      <h3>{monster.name}</h3>
      <div>ID: {monster.id}</div>
      <div className="stat-container"><div>
      <div>Level: {monster.level}</div>
      <div>Max health: {monster.maxHealth}</div>
      <div>Strength: {monster.attributes.strength}</div>
      <div>Dexterity: {monster.attributes.dexterity}</div>
      <div>Endurance: {monster.attributes.endurance}</div>
      <div>Intelligence: {monster.attributes.intelligence}</div></div><div>
      <div>Min Damage: {monster.minDamage.toFixed(2)}</div>
      <div>Max Damage: {monster.maxDamage.toFixed(2)}</div>
      <div>Crit Damage: {monster.criticalDamage.toFixed(2)}</div>
      <div>Crit Chance: {monster.criticalChance.toFixed(2)}</div>
      <div>Hit Chance: {monster.hitChance.toFixed(2)}</div>
      <div>Dodge Chance: {monster.dodgeChance.toFixed(2)}</div></div></div>
    </div>
  );
};

export default MonsterCard;
