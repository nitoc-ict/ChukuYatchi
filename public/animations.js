// 定数
const ASSETS = {
  image: {
    chukuyatchiBabyHappy: 'https://drive.google.com/uc?id=1PKX2_oJxnDx6IZdsJ3tSgDoncdicr-nI',
    chukuyatchiBabySud: 'https://drive.google.com/uc?id=1kQPj7UVaocmbOEu-jBvxvVO3LCvuyJ12',
    chukuyatchiBaby1: 'https://drive.google.com/uc?id=1FGw5Q7ISopjn6KcGOtkSY29e69OMb866',
    chukuyatchiBaby2: 'https://drive.google.com/uc?id=18jtf3-v2oSvWQeyRJzu3aGo-NDd6LOq8',
    chukuyatchiBoyHappy: 'https://drive.google.com/uc?id=1W7ekI0_J2BeMCB9T_CsW5MZpet4b-7LY',
    chukuyatchiBoySud: 'https://drive.google.com/uc?id=16vInHQuuO5DGOuzXWfDbqjo8UOAG9Ukc',
    chukuyatchiBoy1: 'https://drive.google.com/uc?id=1cRV4k6PSU8ZF9Y5A5MMWmZI94BhIi1jE',
    chukuyatchiBoy2: 'https://drive.google.com/uc?id=15TTWwFX5-ncLVKLmF_HadI81CfPJ2_87',
    chukuyatchiWorkerHappy: 'https://drive.google.com/uc?id=1n6mXiX7pCSm08pJd-Ul46spsHzvPVd31',
    chukuyatchiWorkerSud: 'https://drive.google.com/uc?id=1V0x3pbOTOltYGROZE-tMON8SBdz5eAGs',
    chukuyatchiWorker1: 'https://drive.google.com/uc?id=1bG1H-rA_t-oHJO6EBFw8rEHXlhssWDNd',
    chukuyatchiWorker2: 'https://drive.google.com/uc?id=16Ku63qQpB2tGswQ1Ww26_31f5qi7WgKp',
    dragon: 'https://drive.google.com/uc?id=18Nc6JMrhWp9dU8mtp9Lc3zkw4MuxhIbW',
    syuri_castle1: 'https://drive.google.com/uc?id=1uw5lXomtWj4YtEt3wNAblCZp_XbkM20-',
    syuri_castle2: 'https://drive.google.com/uc?id=1vL7xzp32vAjz20cReT0Tc-MfOzklSO7l',
    syuri_castle3: 'https://drive.google.com/uc?id=1szNkd3N_1QMH2wE-AK2mKqru5298Y0-l'
  },
};
const LEVEL_CHUKUYATCHI = [
  "chukuyatchiBaby",
  "chukuyatchiBoy",
  "chukuyatchiWorker"
];
// 画面の解像度
const SCREEN_WIDTH  = window.parent.screen.width * 2;
const SCREEN_HEIGHT = window.parent.screen.height * 2;
// アプリ(ブラウザ)の表示領域サイズ 1.77 is magic number
const WINDOW_WIDTH = window.innerWidth * 1.77;
const WINDOW_HEIGHT = window.innerHeight * 1.77;
const V_SPLIT_N = 4;
const H_SPLIT_N = 5;
const BUTTON_DISTANCE = 150;
phina.define("ToSeeSyuriSosoScene", {
  superClass: 'CanvasScene',
  init: function(options) {
    this.superInit(options);
    var nextScene = "toSeeSyuriHappy"
    var generation = localStorage.getItem("generation");
    generation = (typeof generation === "undefined" || generation === null) ? 1 : generation;
    var chukuyatchiPictName = LEVEL_CHUKUYATCHI[generation] + "Sud";
    // // フェード
    // var shape = Shape({
    //   width: WINDOW_WIDTH,
    //   height: WINDOW_HEIGHT,
    //   backgroundColor: 'black'
    // }).setPosition(this.gridX.center(), this.gridY.center())
    //   .addChildTo(this);
    // shape.tweener.fadeOut(2000).play()
    // 首里城表示
    var syuri_castle = Sprite('syuri_castle2', WINDOW_WIDTH, WINDOW_HEIGHT)
      .setPosition(this.gridX.center(), this.gridY.center())
      .addChildTo(this);
    // TODO 戻るボタンの画像をもらったら変える
    this.button = Button({
      x: this.gridX.center(),
      y: WINDOW_HEIGHT / V_SPLIT_N * 3 + BUTTON_DISTANCE,
      width: 150,
      height: 100,
      text: "button",
      fontSize: 32,
      fontColor: "white",
      cornerRadius: 10,
      fill: "skyblue",
      stroke: "blue",
      strokeWidth: 5,
    }).addChildTo(this);
    var own = this;
    this.button.onpointend = function() {
      own.exit(nextScene);
    }
    // ちゅくやっち生成
    this.chukuyatchi = Sprite(chukuyatchiPictName, 192, 192).addChildTo(this);
    this.chukuyatchi.tweener.wait(300);
    this.chukuyatchi.setPosition(800, WINDOW_HEIGHT / V_SPLIT_N * 3 - 80);
    this.chukuyatchi.setRotation(0);
    this.chukuyatchi.alpha = 0;
    this.chukuyatchi.tweener.fadeIn(2000).play();
    // ちゅくやっち動かす
    this.chukuyatchi.tweener
      .to({
        x: 250,
        y: WINDOW_HEIGHT / V_SPLIT_N * 3 - 80,
        rotation: -10
      }, 4000, "easeOutQuad");
      // .wait(600)
  },
  update: function() {
    this.chukuyatchi.tweener
      .by({
        x: -2,
        y: -10,
        rotation: -10,
      }, 1000, "easeOutQuad")
      .by({
        x: +2,
        y: +10,
        rotation: +10,
      }, 1000, "easeOutQuad");
  }
});
phina.define("ToSeeSyuriHappyScene", {
  superClass: 'CanvasScene',
  init: function(options) {
    this.superInit(options);
    var nextScene = "toSeeSyuriSud"
    var generation = localStorage.getItem("generation");
    generation = (typeof generation === "undefined" || generation === null) ? 1 : generation;
    var chukuyatchiPictName = LEVEL_CHUKUYATCHI[generation] + "Sud";
    // // フェード 動いてない感じ is ある
    // var shape = Shape({
    //   width: WINDOW_WIDTH,
    //   height: WINDOW_HEIGHT,
    //   backgroundColor: 'white'
    // }).setPosition(this.gridX.center(), this.gridY.center())
    //   .addChildTo(this);
    // shape.tweener.fadeOut(2000).play()
    // 首里城表示
    var syuri_castle = Sprite('syuri_castle3', WINDOW_WIDTH, WINDOW_HEIGHT)
      .setPosition(this.gridX.center(), this.gridY.center())
      .addChildTo(this);
    // TODO 戻るボタンの画像をもらったら変える
    this.button = Button({
      x: this.gridX.center(),
      y: WINDOW_HEIGHT / V_SPLIT_N * 3 + BUTTON_DISTANCE,
      width: 150,
      height: 100,
      text: "button",
      fontSize: 32,
      fontColor: "white",
      cornerRadius: 10,
      fill: "skyblue",
      stroke: "blue",
      strokeWidth: 5,
    }).addChildTo(this);
    var own = this;
    this.button.onpointend = function() {
      own.exit(nextScene);
    }
    // ちゅくやっち生成
    this.chukuyatchi = Sprite(chukuyatchiPictName, 192, 192).addChildTo(this);
    this.chukuyatchi.tweener.wait(300);
    this.chukuyatchi.setPosition(800, WINDOW_HEIGHT / V_SPLIT_N * 3 - 80);
    this.chukuyatchi.setRotation(-10);
    this.chukuyatchi.alpha = 0;
    this.chukuyatchi.tweener.fadeIn(2000).play();
    // ちゅくやっち動かす
    this.chukuyatchi.tweener
      .to({
        x: 250,
        y: WINDOW_HEIGHT / V_SPLIT_N * 3 - 80,
        rotation: +10
        }, 4000, "easeOutQuad");
  },
  update: function() {
    this.chukuyatchi.tweener
      .by({
        x: -2,
        y: -20,
        rotation: -25,
      }, 1000, "easeOutQuad")
      .by({
        x: +2,
        y: +20,
        rotation: +25,
      }, 1000, "easeOutQuad");
  }
});
phina.define("ToSeeSyuriSudScene", {
  superClass: 'CanvasScene',
  init: function(options) {
    this.superInit(options);
    var nextScene = "toSeeSyuriSoso"
    var generation = localStorage.getItem("generation");
    generation = (typeof generation === "undefined" || generation === null) ? 1 : generation;
    var chukuyatchiPictName = LEVEL_CHUKUYATCHI[generation] + "Sud";
    // // フェード
    // var shape = Shape({
    //   width: WINDOW_WIDTH,
    //   height: WINDOW_HEIGHT,
    //   backgroundColor: 'black'
    // }).setPosition(this.gridX.center(), this.gridY.center())
    //   .addChildTo(this);
    // shape.tweener.fadeOut(2000).play()
    // 首里城表示
    var syuri_castle = Sprite('syuri_castle1', WINDOW_WIDTH, WINDOW_HEIGHT)
      .setPosition(this.gridX.center(), this.gridY.center())
      .addChildTo(this);
    // TODO 戻るボタンの画像をもらったら変える
    this.button = Button({
      x: this.gridX.center(),
      y: WINDOW_HEIGHT / V_SPLIT_N * 3 + BUTTON_DISTANCE,
      width: 150,
      height: 100,
      text: "button",
      fontSize: 32,
      fontColor: "white",
      cornerRadius: 10,
      fill: "skyblue",
      stroke: "blue",
      strokeWidth: 5,
    }).addChildTo(this);
    var own = this;
    this.button.onpointend = function() {
      // TODO 次に行くシーンを指定
      own.exit(nextScene);
    }
    // ちゅくやっち生成
    this.chukuyatchi = Sprite(chukuyatchiPictName, 192, 192).addChildTo(this);
    this.chukuyatchi.tweener.wait(300);
    this.chukuyatchi.setPosition(800, WINDOW_HEIGHT / V_SPLIT_N * 3 - 80);
    this.chukuyatchi.setRotation(-10);
    this.chukuyatchi.alpha = 0;
    this.chukuyatchi.tweener.fadeIn(2000).play();
    // ちゅくやっち動かす
    this.chukuyatchi.tweener
      .to({
        x: 250,
        y: WINDOW_HEIGHT / V_SPLIT_N * 3 - 80,
        rotation: +10
      }, 4000, "easeOutQuad");
  },
  update: function() {
    this.chukuyatchi.tweener
      .by({
        x: -1,
        y: -4,
        rotation: -10,
      }, 1000, "easeOutQuad")
      // .wait(800)
      .by({
        x: +1,
        y: +4,
        rotation: +10,
      }, 1000, "easeOutQuad");
  }
});
phina.define("BornScene", {
  superClass: 'CanvasScene',
  init: function(options) {
    this.superInit(options);
    var nextScene = "toSeeSyuriHappy"
    var generation = localStorage.getItem("generation");
    generation = (typeof generation === "undefined" || generation === null) ? 1 : generation;
    var chukuyatchiPictName = LEVEL_CHUKUYATCHI[generation] + "1";
    var shape = Shape({
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
      backgroundColor: 'black'
    }).setPosition(this.gridX.center(), this.gridY.center())
      .addChildTo(this);
    shape.tweener.fadeOut(2000).play()
    // 縦の4等分
    for (let i = 0; i < H_SPLIT_N; i++) {
      var shape = Shape({
        width: WINDOW_WIDTH * 1,
        height: 1,
        backgroundColor: 'red'
      }).setPosition(
          this.gridX.center(),
          WINDOW_HEIGHT / (H_SPLIT_N - 1) * i
        )
        .addChildTo(this);
    }
    // 横の4等分
    for (let i = 0; i < V_SPLIT_N; i++) {
      var shape = Shape({
        width: 1,
        height: WINDOW_HEIGHT,
        backgroundColor: 'red'
      }).setPosition(
          WINDOW_WIDTH / (V_SPLIT_N - 1) * i,
          this.gridY.center()
        )
        .addChildTo(this);
    }
    this.labelArea = LabelArea({
      text: "window width: " + SCREEN_WIDTH + "\nwindow height: " + SCREEN_HEIGHT + "\ninner width: " + window.innerWidth + "\ninner height: " + window.innerHeight,
      width: 600,
      height: 240,
    }).setPosition(300, 300).addChildTo(this);
    this.dragon = Sprite('dragon', 128, 256).addChildTo(this);
    this.dragon.tweener.wait(300);
    this.dragon.setPosition(600, 800);
    this.dragon.setRotation(0);
    this.dragon.alpha = 0;
    this.dragon.tweener.fadeIn(2000).play();
    // this.dragon.frameIndex = 0;
    this.dragon.tweener
      .to({
        x: 400,
        y: 500,
        rotation: -30
      }, 3000, "easeOutQuad");
      // .wait(600)
    // for (var i = 0; i < 3; i++) {
      this.dragon.tweener
        .by({
          x: -2,
          y: -10,
          rotation: -10,
        }, 1000, "easeOutQuad")
        // .wait(800)
        .by({
          x: +2,
          y: +10,
          rotation: +10,
        }, 1000, "easeOutQuad").setLoop(true);
    // }
    this.button = Button({
      x: this.gridX.center(),
      y: WINDOW_HEIGHT / V_SPLIT_N * 3 + BUTTON_DISTANCE,
      width: 150,
      height: 100,
      text: "button",
      fontSize: 32,
      fontColor: "white",
      cornerRadius: 10,
      fill: "skyblue",
      stroke: "blue",
      strokeWidth: 5,
    }).addChildTo(this);
    var own = this;
    this.button.onpointend = function() {
      own.exit(nextScene);
    }
  },
  update: function() {
  }
  // // 更新
  // update: function(app) {
  //   var p = app.pointer;
  //   if (p.getPointing()) {
  //     var diff = this.player.x - p.x;
  //     if (Math.abs(diff) > SPEED) {
  //       // 右に移動
  //       if (diff < 0) {
  //         this.player.x += SPEED;
  //         this.player.scaleX = -1;
  //       }
  //       // 左に移動
  //       else {
  //         this.player.x -= SPEED;
  //         this.player.scaleX = 1;
  //       }
  //       // フレームアニメーション
  //       if (app.frame % 4 === 0) {
  //         this.player.frameIndex = (this.player.frameIndex === 12) ? 13:12;
  //       }
  //     }
  //   }
  //   else {
  //     // 待機
  //     this.player.frameIndex = 0;
  //   }
  // }
});

