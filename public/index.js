phina.globalize();

var MAX_ROOF_WIDTH = 8;
var MAX_ROOF_HEIGHT = 3;
var TILE_WIDTH = 80;
var TILE_HEIGHT = 50;
var TILE_MARGIN_X = 0.1;
var TILE_MARGIN_Y = 0.5;
var KAWARA_INIT_Y = 900;
var KAWARA_INIT_X = 325;
var SHURI_INIT_Y = 315;
var SHURI_INIT_X = 212;

var ASSETS = {
  image: {
    kawara: 'https://drive.google.com/uc?id=1c-JHnfhNLn22BfbB5Yli6gnDuIkJC7dH',
    shadow: 'https://drive.google.com/uc?id=1S65yAn0-Ce7ZBdQFT9f0Uf00W4w7_mI8',
    shuri: 'https://drive.google.com/uc?id=1sL_spFghcw79aTCR2AA5UMpIYn7Qa3yc',
  },
};

phina.define("KawaraThrowScene", {
  superClass: "DisplayScene",
  init: function () {
    this.superInit();
    this.backgroundColor = '#e3f7fe';

    this.shuriCastle = ShuriCastle().addChildTo(this);
    this.kawara = Kawara().addChildTo(this);

    var endButton = Button({
      x: 320,             // x座標
      y: 780,             // y座標
      width: 80,         // 横サイズ
      height: 30,        // 縦サイズ
      text: "owari",     // 表示文字
      fontSize: 32,       // 文字サイズ
      fontColor: 'white', // 文字色
      cornerRadius: 10,   // 角丸み
      fill: 'skyblue',    // ボタン色
      stroke: 'blue',     // 枠色
      strokeWidth: 5,     // 枠太さ
                          // 他にも指定できる…？
    }).addChildTo(this);


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
    this.label = Label('手持ち: ' + this.game_state.kawara_num + 'コ\n' + 'おいた瓦: ' + this.game_state.put_tile_num + 'コ').addChildTo(this);
    this.label.x = 440;
    this.label.y = 700;
    this.label.fontSize = 32;


    var own = this;
    endButton.onpointend = function() {
      // 状態の保存
      let ar = [];
      for (let i = 0; i < MAX_ROOF_WIDTH * MAX_ROOF_HEIGHT; ++i) {
        ar.push(own.roof.children[i].hitted);
      }
      own.game_state.saveLocalStorage(ar);

    };

  },
  // 更新
  update: function (app) {
    if (this.kawara.y <= 0 || this.kawara.y >= 970) {
      this.kawara.hit();
    }
    this.kawara.rotation += 20;
    this.checkHit();
    // 重力情報
    var accel = app.accelerometer;
    var ac = accel.acceleration;
    var gravity = accel.gravity;
    var ori = accel.orientation;
    var rotate = accel.rotation;
    this.label.text = '手持ち: ' + this.game_state.kawara_num + 'コ\n' + 'おいた瓦: ' + this.game_state.put_tile_num + 'コ';
    if (!this.kawara.throwed && this.kawara.isThrow(ac.y)) {
      this.kawara.physical.force(0, ac.y);
      this.game_state.kawara_num--;
      this.kawara.throwed = true;
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
    localStorage.setItem('tile_number', this.kawara_num);
    localStorage.setItem('put_tile_number', this.put_tile_num);
    localStorage.setItem('put_kawara', JSON.stringify(put_kawara_ar));
  }
});

// メイン処理
phina.main(function () {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'KawaraThrow', // メインシーンから開始する
    assets: ASSETS,
    scenes: [
      {
        className: 'KawaraThrowScene',
        label: 'KawaraThrow'
      }
    ]
  });
  // アプリケーション実行
  app.run();
});
