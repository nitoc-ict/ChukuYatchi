phina.define("ToSeeSyuriSosoScene", {
  superClass: 'CanvasScene',
  init: function(options) {
    this.superInit(options);
    var nextScene = "main"
    var generation = localStorage.getItem("generation");
    generation = (typeof generation === "undefined" || generation === null) ? 1 : generation;
    var chukuYatchiPictName = LEVEL_CHUKUYATCHI[generation] + "Sud";
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
    this.chukuYatchi = Sprite(chukuYatchiPictName, 192, 192).addChildTo(this);
    this.chukuYatchi.tweener.wait(300);
    this.chukuYatchi.setPosition(800, WINDOW_HEIGHT / V_SPLIT_N * 3 - 80);
    this.chukuYatchi.setRotation(0);
    this.chukuYatchi.alpha = 0;
    this.chukuYatchi.tweener.fadeIn(2000).play();
    // ちゅくやっち動かす
    this.chukuYatchi.tweener
      .to({
        x: 250,
        y: WINDOW_HEIGHT / V_SPLIT_N * 3 - 80,
        rotation: -10
      }, 4000, "easeOutQuad");
      // .wait(600)
  },
  update: function() {
    this.chukuYatchi.tweener
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
    var nextScene = "main"
    var generation = localStorage.getItem("generation");
    generation = (typeof generation === "undefined" || generation === null) ? 1 : generation;
    var chukuYatchiPictName = LEVEL_CHUKUYATCHI[generation] + "Sud";
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
    this.chukuYatchi = Sprite(chukuYatchiPictName, 192, 192).addChildTo(this);
    this.chukuYatchi.tweener.wait(300);
    this.chukuYatchi.setPosition(800, WINDOW_HEIGHT / V_SPLIT_N * 3 - 80);
    this.chukuYatchi.setRotation(-10);
    this.chukuYatchi.alpha = 0;
    this.chukuYatchi.tweener.fadeIn(2000).play();
    // ちゅくやっち動かす
    this.chukuYatchi.tweener
      .to({
        x: 250,
        y: WINDOW_HEIGHT / V_SPLIT_N * 3 - 80,
        rotation: +10
        }, 4000, "easeOutQuad");
  },
  update: function() {
    this.chukuYatchi.tweener
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
    var nextScene = "main"
    var generation = localStorage.getItem("generation");
    generation = (typeof generation === "undefined" || generation === null) ? 1 : generation;
    var chukuYatchiPictName = LEVEL_CHUKUYATCHI[generation] + "Sud";
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
    this.chukuYatchi = Sprite(chukuYatchiPictName, 192, 192).addChildTo(this);
    this.chukuYatchi.tweener.wait(300);
    this.chukuYatchi.setPosition(800, WINDOW_HEIGHT / V_SPLIT_N * 3 - 80);
    this.chukuYatchi.setRotation(-10);
    this.chukuYatchi.alpha = 0;
    this.chukuYatchi.tweener.fadeIn(2000).play();
    // ちゅくやっち動かす
    this.chukuYatchi.tweener
      .to({
        x: 250,
        y: WINDOW_HEIGHT / V_SPLIT_N * 3 - 80,
        rotation: +10
      }, 4000, "easeOutQuad");
  },
  update: function() {
    this.chukuYatchi.tweener
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
    var chukuYatchiPictName = LEVEL_CHUKUYATCHI[generation] + "1";
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

