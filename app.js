var app = new Vue({
  el: '#app',
  data: {
    lives: [],
    rows: 15,
    columns: 15 
  },
  methods: {
    makeGrid: function() {
      for(let i = 0; i < this.rows; ++i) {
        let boardRow = [];
        for(let j = 0; j < this.columns; ++j) {
          boardRow.push(false);
        }
        this.lives.push(boardRow);
      }
      this.populateGrid();
    },
    giveLife: function(i, j) {
      this.lives[i][j] = true;
    },
    populateGrid: function() {
      for(let i = 0; i < this.rows; ++i) {
        for(let j = 0; j < this.columns; ++j) {
          let r = Math.random();
          if(r > 0.7) {
            this.giveLife(i,j);
          }
        }
      }
    },
    init: function() {
      this.makeGrid();
      window.setInterval(function() {
        app.invokeGeneration();
      }, 1000);
    },
    invokeGeneration: function() {
      let nextBoardState = JSON.parse(JSON.stringify(this.lives));
      for(let i = 0; i < nextBoardState.length; ++i) {
        for(let j = 0; j < nextBoardState[i].length; ++j) {
          let aliveNeighboursCount = this.aliveNeighboursCount(i, j); 
          if(this.lives[i][j] === true) {
            if(aliveNeighboursCount == 0 || aliveNeighboursCount === 1  || aliveNeighboursCount > 3) {
              nextBoardState[i][j] = false;
            }
          }
          else {
            if(aliveNeighboursCount == 3) {
              nextBoardState[i][j] = true;
            }
          }
        }
      }
      this.lives = nextBoardState;
    },
    aliveNeighboursCount: function(inI, inJ) {
      let count = 0;
      for(let k = -1; k <= 1; k++) {
        for(let l = -1; l <= 1; l++) {
          if(k || l) {
            if(this.lives[this.circularX(inI, k)][this.circularY(inJ,l)] === true) {
              count++;
            }
          }
        }
      }
      return count;
    },
    circularX: function(m, n) {
      m += n;
      while(m < 0) m += this.columns;
      while(m >= this.columns) m -= this.columns;
      return m;
    },
    circularY: function(m, n) {
      m += n;
      while(m < 0) m += this.rows;
      while(m > this.rows) m-= this.rows;
      return m; 
    }
  },
  created: function() {
    this.init();
  }
})
