phina.define("ToSeeSyuriSosoScene", {
  superClass: 'CanvasScene',
  init: function(options) {
    this.superInit(options);
    var nextScene = "main"
    var evolvedForm = localStorage.getItem("evolvedForm");
    evolvedForm = (typeof evolvedForm === "undefined" || evolvedForm === null) ? 1 : evolvedForm;
    var chukuYatchiPictName = LEVEL_CHUKUYATCHI[evolvedForm - 1] + "Sud";
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

    // 戻るボタン
    this.back = Sprite('back').addChildTo(this);
    this.back.x = this.gridX.center(),
    this.back.y = WINDOW_HEIGHT / V_SPLIT_N * 3 + BUTTON_DISTANCE,
    this.back.width = 150;
    this.back.height = 100;
    this.back.setInteractive(true);

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
    var evolvedForm = localStorage.getItem("evolvedForm");
    evolvedForm = (typeof evolvedForm === "undefined" || evolvedForm === null) ? 1 : evolvedForm;
    var chukuYatchiPictName = LEVEL_CHUKUYATCHI[evolvedForm - 1] + "Sud";
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

    // 戻るボタン
    this.back = Sprite('back').addChildTo(this);
    this.back.x = this.gridX.center(),
    this.back.y = WINDOW_HEIGHT / V_SPLIT_N * 3 + BUTTON_DISTANCE,
    this.back.width = 150;
    this.back.height = 100;
    this.back.setInteractive(true);

    // もどるアイコンをタップしたときの処理
    var own = this;
    this.back.onpointstart = function() {
      madeTiles = parseInt(localStorage.getItem("made_tile_number"));
      localStorage.setItem("made_tile_number", madeTiles + gameScore / 10);
      own.exit(nextScene);
    };
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
    var evolvedForm = localStorage.getItem("evolvedForm");
    evolvedForm = (typeof evolvedForm === "undefined" || evolvedForm === null) ? 1 : evolvedForm;
    var chukuYatchiPictName = LEVEL_CHUKUYATCHI[evolvedForm - 1] + "Sud";
    console.log(chukuYatchiPictName);
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

    // 戻るボタン
    this.back = Sprite('back').addChildTo(this);
    this.back.x = this.gridX.center(),
    this.back.y = WINDOW_HEIGHT / V_SPLIT_N * 3 + BUTTON_DISTANCE,
    this.back.width = 150;
    this.back.height = 100;
    this.back.setInteractive(true);
    // もどるアイコンをタップしたときの処理
    var own = this;
    this.back.onpointstart = function() {
      madeTiles = parseInt(localStorage.getItem("made_tile_number"));
      localStorage.setItem("made_tile_number", madeTiles + gameScore / 10);
      own.exit(nextScene);
    };

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
