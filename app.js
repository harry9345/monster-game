function getValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      counter: 0,
      winner: null,
      logMassege: [],
    };
  },
  computed: {
    monsterBarstyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarstyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecial() {
      return this.counter % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // a draw
        this.winner = "draw";
      } else if (value <= 0) {
        // player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // a draw
        this.winner = "draw";
      } else if (value <= 0) {
        // monster lost
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      (this.monsterHealth = 100),
        (this.playerHealth = 100),
        (this.counter = 0),
        (this.winner = null),
        (this.logMassege = []);
    },
    monsterAtack() {
      this.counter++;
      const attackValue = getValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLog("player", "attack", attackValue);
      this.playerAttack();
    },
    playerAttack() {
      const attackValue = getValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLog("monster", "attack", attackValue);
    },
    specialAttack() {
      this.counter++;
      const attackValue = getValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLog("player", "attack", attackValue);
      this.playerAttack();
    },
    healbuttom() {
      this.counter++;
      const healvalue = getValue(8, 20);
      this.playerHealth += healvalue;
      if (this.playerHealth + healvalue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth + healvalue;
      }
      this.addLog("player", "heal", healValue);
      this.playerAttack();
    },
    surrender() {
      this.winner = "monster";
    },
    addLog(who, what, value) {
      this.logMassege.unshift({
        actionBy: who,
        actionaType: what,
        actionValue: value,
      });
    },
  },
});
app.mount("#game");
