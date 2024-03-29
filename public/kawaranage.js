phina.define("KawaraThrowScene", {
  superClass: "DisplayScene",
  init: function () {
    this.superInit({
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
    });
    this.backgroundColor = '#e3f7fe';

    this.shuriCastle = ShuriCastle().addChildTo(this);
    this.kawara = Kawara().addChildTo(this);

    this.iconBack = Sprite('iconBack').addChildTo(this);

    this.iconBack.x = this.gridX.span(3);
    this.iconBack.y = this.gridY.span(15);
    this.iconBack.setInteractive(true);


    var ar = [];
    var tileNum = 0;
    var putTileNum = 0;

    if (localStorage.getItem('put_kawara') === null) {
      ar.length = MAX_ROOF_WIDTH * MAX_ROOF_HEIGHT;
      for (let i = 0; i < MAX_ROOF_WIDTH * MAX_ROOF_HEIGHT; ++i) {
        ar[i] = false;
      }
    } else {
      ar = JSON.parse(localStorage.getItem('put_kawara'));
      console.log(ar);
    }

    if (localStorage.getItem('made_tile_number') === null) {
      tileNum = 0;
    } else {
      tileNum = localStorage.getItem('made_tile_number');
    }

    if (localStorage.getItem('put_tile_number') === null) {
      putTileNum = 0;
    } else {
      putTileNum = localStorage.getItem('put_tile_number');
    }


    this.game_state = GameState(tileNum, putTileNum, ar.slice());

    this.roof = DisplayElement().addChildTo(this);
    (MAX_ROOF_HEIGHT * MAX_ROOF_WIDTH).times(function (i) {
      let x = i % MAX_ROOF_WIDTH;
      let y = Math.floor(i / MAX_ROOF_WIDTH);
      let tile = Tile().addChildTo(this.roof);
      tile.setPosition(x * (tile.width + TILE_MARGIN_X), 100 + y * (tile.height + TILE_MARGIN_Y));
      tile.hitted = this.game_state.put_kawara[i];
      if (tile.hitted) {
        tile.hit();
      }
    }, this);

    this.kawaraLabel1 = Label().addChildTo(this);
    this.kawaraLabel1.x = this.gridX.span(13);
    this.kawaraLabel1.y = this.gridY.span(15);
    this.kawaraLabel1.fontSize = 32;


    var own = this;
    this.iconBack.onpointstart = function() {
      let ar = [];
      for (let i = 0; i < MAX_ROOF_WIDTH * MAX_ROOF_HEIGHT; ++i) {
        ar.push(own.roof.children[i].hitted);
      }
      own.game_state.saveLocalStorage(ar);
      let evolvedForm = parseInt(localStorage.getItem("evolvedForm"));
      evolvedForm = evolvedForm >= 3 ? 3 : evolvedForm + 1;

      own.exit('main');
    }

  },
  // 更新
  update: function (app) {
    if (this.kawara.y <= 0 || this.kawara.y >= 970) {
      this.kawara.hit();
      this.game_state.kawara_num--;
    }
    this.kawara.rotation += 20;
    this.checkHit();
    // 重力情報
    var accel = app.accelerometer;
    var ac = accel.acceleration;
    var gravity = accel.gravity;
    var ori = accel.orientation;
    var rotate = accel.rotation;
    this.kawaraLabel1.text = 'のこり ' + this.game_state.kawara_num + ' コ';
    if (!this.kawara.throwed && this.kawara.isThrow(ac.y)) {
      this.kawara.physical.force(0, ac.y);
      this.kawara.throwed = true;
    }

    if (this.game_state.kawara_num <= 0) {
      let ar = [];
      for (let i = 0; i < MAX_ROOF_WIDTH * MAX_ROOF_HEIGHT; ++i) {
        ar.push(this.roof.children[i].hitted);
      }
      this.game_state.saveLocalStorage(ar);
      this.exit('main');
    }

    window.addEventListener('deviceorientation', (dat) => {
      alpha = dat.alpha;
      var dx;
      if (alpha > 180) {
        dx = alpha - 360;
      }
      else {
        dx = alpha;
      }
      let i = 0;
      if (!this.kawara.throwed) {
        this.roof.children.each(function (tile) {
          let x = i % MAX_ROOF_WIDTH;
          if (tile.hitted) {
            tile.x = x * (tile.width + TILE_MARGIN_X + 5) + dx * 4;
          } else {
            tile.x = x * (tile.width + TILE_MARGIN_X) + dx * 4;
          }
          ++i;
        });
        this.shuriCastle.x = SHURI_INIT_X + dx * 4;
      }
    });
  },
  checkHit: function () {
    var kawara = this.kawara;
    var gridX = this.gridX;
    var game_state = this.game_state;
    this.roof.children.each(function (tile) {
      if (!tile.hitted && tile.hitTestElement(kawara)) {
        tile.fill = 'red';
        this.hit_kawara_num = 0;
        tile.hitted = true;
        tile.hit();
        kawara.hit();
        game_state.kawara_num--;
        game_state.put_tile_num++;
      }
    });
  },
});
phina.define('GameState', {
  init: function (kawara_num, put_kawara) {
    this.kawara_num = kawara_num;
    this.put_kawara = put_kawara;
    this.hit_kawara_num = 0;
  },
});

phina.define('ShuriCastle', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('shuri');
    this.x = SHURI_INIT_X;
    this.y = SHURI_INIT_Y;
  }
});

phina.define('Tile', {
  // superClass: 'RectangleShape',
  superClass: 'Sprite',
  init: function () {
    this.superInit('shadow');
    this.hitted = false;
  },
  hit: function() {
    this.setImage('kawara');
  }
});
phina.define('Kawara', {
  //superClass: 'RectangleShape',
  superClass: 'Sprite',
  init: function () {
    this.superInit('kawara');
    this.x = KAWARA_INIT_X;
    this.y = KAWARA_INIT_Y;
    this.physical.friction = 0.98;
    this.physical.force(0, 0);
    this.throwed = false;
  },
  hit: function () {
    this.y = KAWARA_INIT_Y;
    this.physical.force(0, 0);
    this.throwed = false;
  },
  isThrow: function (h) {
    return h < -20;
  }
});

phina.define('GameState', {
  init: function(kawara_num, put_tile_number, put_kawara) {
    this.kawara_num = kawara_num;
    this.put_tile_num = put_tile_number;
    this.put_kawara = put_kawara;
    this.hit_kawara_num = 0;
  },

  saveLocalStorage: function(put_kawara_ar) {
    localStorage.setItem('made_tile_number', this.kawara_num);
    localStorage.setItem('put_tile_number', this.put_tile_num);
    localStorage.setItem('put_kawara', JSON.stringify(put_kawara_ar));
  }
});
