phina.globalize();

var MAX_ROOF_WIDTH = 4;
var MAX_ROOF_HEIGHT = 3;
var TILE_WIDTH = 80;
var TILE_HEIGHT = 50;
var TILE_MARGIN = 8;
var KAWARA_INIT_Y = 700;
var KAWARA_INIT_X = 325;

var ASSETS = {
  image: {
    kawara: "https://drive.google.com/uc?id=1EJ6i2fMe5JGL-k_RyaL2eQXLVehyKbPw",
  },
};

phina.define("KawaraThrowScene", {
  superClass: "DisplayScene",
  init: function () {
    this.superInit();
    // プレイヤー
    this.kawara = Kawara().addChildTo(this);
    this.game_state = GameState(10, [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
    this.roof = DisplayElement().addChildTo(this);
    (MAX_ROOF_HEIGHT * MAX_ROOF_WIDTH).times(function (i) {
      let x = i % MAX_ROOF_WIDTH;
      let y = Math.floor(i / MAX_ROOF_WIDTH);
      let tile = Tile().addChildTo(this.roof).setPosition(x * (TILE_WIDTH + TILE_MARGIN), 100 + y * (TILE_HEIGHT + TILE_MARGIN));
      tile.hitted = this.game_state.put_kawara[i];
      if (tile.hitted) {
        tile.fill = 'red';
      }
    }, this);
    this.label = Label('のこり\n' + this.game_state.kawara_num + 'コ').addChildTo(this);
    this.label.x = 540;
    this.label.y = 700;
    this.label.fontSize = 42;

  },
  // 更新
  update: function (app) {
    if (this.kawara.y <= 0 || this.kawara.y >= 970) {
      this.kawara.hit();
    }
    this.checkHit();
    // 重力情報
    var accel = app.accelerometer;
    var ac = accel.acceleration;
    var gravity = accel.gravity;
    var ori = accel.orientation;
    var rotate = accel.rotation;
    this.label.text = 'のこり\n' + this.game_state.kawara_num + 'コ';
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
          tile.x = x * (TILE_WIDTH + TILE_MARGIN) + dx * 4;
          ++i;
        });
      }
    });
  },
  checkHit: function () {
    var kawara = this.kawara;
    var gridX = this.gridX;
    this.roof.children.each(function (tile) {
      if (!tile.hitted && tile.hitTestElement(kawara)) {
        tile.fill = 'red';
        this.hit_kawara_num = 0;
        tile.hitted = true;
        kawara.hit();
      }
    });
  },
});
phina.define('Tile', {
  superClass: 'RectangleShape',
  init: function () {
    this.superInit({
      width: TILE_WIDTH,
      height: TILE_HEIGHT,
      stroke: '#aaa',
      strokeWidth: 4,
      fill: 'blue',
      cornerRadius: 4,
    });
    this.hitted = false;
  }
});
phina.define('Kawara', {
  //superClass: 'RectangleShape',
  superClass: 'Sprite',
  init: function () {
    this.superInit('dlang');
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
  init: function (kawara_num, put_kawara) {
    this.kawara_num = kawara_num;
    this.put_kawara = put_kawara;
    this.hit_kawara_num = 0;
  },
});

phina.define('Tile', {
  superClass: 'RectangleShape',
  init: function () {
    this.superInit({
      width: TILE_WIDTH,
      height: TILE_HEIGHT,
      stroke: '#aaa',
      strokeWidth: 4,
      fill: 'blue',
      cornerRadius: 4,
    });
    this.hitted = false;
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
  init: function (kawara_num, put_kawara) {
    this.kawara_num = kawara_num;
    this.put_kawara = put_kawara;
    this.hit_kawara_num = 0;
  },
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
