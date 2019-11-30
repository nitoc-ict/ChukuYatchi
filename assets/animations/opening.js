<meta name="viewport" content="width=device-width, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<script src='http://cdn.rawgit.com/phi-jp/phina.js/v0.2.0/build/phina.js'></script>
<!--
<script>
// omajinai
phina.globalize();
var SCREEN_WIDTH = 465;
var SCREEN_HEIGHT = 465;
var SPEED = 3;
var ASSETS = {
  image: {
    'd_kun': 'https://doc-14-c4-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/ru4jacpp4tjab2emqorurut3osem0d2a/1575093600000/02953253089485155859/*/1EJ6i2fMe5JGL-k_RyaL2eQXLVehyKbPw',
  },
};

phina.define("MainScene", {
  superClass: "DisplayScene",

  init: function() {
    this.superInit();

    var player = Sprite('d_kun').addChildTo(this);
    // this.player.setPosition(400, 400);
    player.x = this.gridX.center();
    player.y = this.gridY.center() + 30;
    player.width = 128;
    player.height = 256;

    // set background color
    this.backgroundColor = '#444';

    // generate label
    var label = Label("Hello, World!").addChildTo(this);
    label.x = this.gridX.center();
    label.y = this.gridY.center();
    label.fill = "#eee";
  },

    // 更新
   update: function(app) {
     var p = app.pointer;

     if (p.getPointing()) {
       var diff = this.player.x - p.x;
       if (Math.abs(diff) > SPEED) {
         // 右に移動
         if (diff < 0) {
           this.player.x += SPEED;
           this.player.scaleX = -1;
         }
         // 左に移動
         else {
           this.player.x -= SPEED;
           this.player.scaleX = 1;
         }

         // フレームアニメーション
         if (app.frame % 4 === 0) {
           this.player.frameIndex = (this.player.frameIndex === 12) ? 13:12;
         }
       }
     }
     else {
       // 待機
       this.player.frameIndex = 0;
     }
   }
});

phina.main(function() {
    var app = GameApp({
    startLabel: 'main',
    // width: SCREEN_WIDTH,
    // height: SCREEN_HEIGHT,
    assets: ASSETS,
  });

  app.enableStats();
  app.run();
});
</script>

-->

<script>
/*
 * Runstant
 * 思いたったらすぐ開発. プログラミングに革命を...
 */

// グローバルに展開
phina.globalize();

// 定数
var ASSETS = {
  image: {
    bg: "http://jsrun.it/assets/a/G/5/Y/aG5YD.png",
    // tomapiko: 'http://cdn.rawgit.com/phi-jp/phina.js/v0.2.0/assets/images/tomapiko_ss.png',
    tomapiko: 'https://doc-14-c4-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/ru4jacpp4tjab2emqorurut3osem0d2a/1575093600000/02953253089485155859/*/1EJ6i2fMe5JGL-k_RyaL2eQXLVehyKbPw',
  },
};
// var SCREEN_WIDTH  = 465;              // スクリーン幅
// var SCREEN_HEIGHT = 465;              // スクリーン高さ
var SPEED         = 10;

/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',

  // 初期化
  init: function(options) {
    // super init
    this.superInit(options);

    // プレイヤー
    this.player = Sprite('tomapiko', 128, 256).addChildTo(this);
    this.player.setPosition(600, 800);
    this.player.setRotation(0);
    // this.player.frameIndex = 0;

    this.player.tweener
      .to({
        x: 400,
        y: 500,
        rotation: -30
      }, 3000, "easeOutQuad");
      // .wait(600)
    for (var i = 0; i < 3; i++) {
      this.player.tweener
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
        }, 1000, "easeOutQuad")
    }

    // this.player.tweener.to({
    //   x:600,
    //   y:400,
    //   rotation:360
    // },1000,"swing")
    // .wait(500)
    // .set({
    //   sides:10,
    //   fill:"blue",
    //   rotation:0,
    // })
    // .by({
    //   x:-500,
    //   y: -100,
    //   rotation:360,
    // },2000,"easeOutQuad")
    // .by({
    //   x:500,
    //   y:800,
    //   rotation:360,
    // },1000,"easeOutQuad").setLoop(true);
  },

  update: function() {
    //for (var i = 0; i < 3; i++) {
    //  this.player.tweener
    //    .by({
    //      x: -2,
    //      y: -10,
    //      rotation: -10,
    //    }, 1000, "easeOutQuad")
    //    // .wait(800)
    //    .by({
    //      x: +2,
    //      y: +10,
    //      rotation: +10,
    //    }, 1000, "easeOutQuad")
    //}
    //  .setLoop(true);
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

/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    startLabel: 'main',   // MainScene から開始
  //   width: SCREEN_WIDTH,  // 画面幅
  //   height: SCREEN_HEIGHT,// 画面高さ
    assets: ASSETS,       // アセット読み込み
  });

  app.enableStats();

  // 実行
  app.run();
});
</script>
