phina.define('MainScene', {
  superClass: 'CanvasScene',
  
  init: function() {
    this.superInit({
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
    });
    // 画像
    this.backgroundImage = Sprite('homeBackground', WINDOW_WIDTH, WINDOW_HEIGHT).addChildTo(this);
    this.iconOshigoto = Sprite('iconOshigoto').addChildTo(this);
    this.iconMitsukeru = Sprite('iconMitsukeru').addChildTo(this);
    this.iconBokin = Sprite('iconBokin').addChildTo(this);
    this.chukuYatchiBaby = Sprite('chukuYatchiBaby1', 200, 200).addChildTo(this);
    this.iconGeneration = Sprite('iconGeneration1').addChildTo(this);
    this.generationText = Sprite('generationText').addChildTo(this);
    this.shokuninLv = Sprite('shokuninLv').addChildTo(this);
    this.kawaraNumber = Sprite('kawaraNumber').addChildTo(this);

    // 配置
    // 背景
    this.backgroundImage.x = this.gridX.center();
    this.backgroundImage.y = this.gridY.center();
    // ステータス
    // ハイビスカスアイコン
    this.iconGeneration.x = this.gridX.span(3);
    this.iconGeneration.y = this.gridY.span(1);
    // N代目 ちゅくやっち
    this.generationText.setPosition(285, 80);
    // 職人レベル
    this.shokuninLv.setPosition(260, 110);
    var generationLvLabel = Label({
      text: localStorage.getItem("genaration"),
      fontsize: 7,
      fill: "#7a280f",
    }).addChildTo(this).setPosition(320, 110);

    // 瓦の数
    this.kawaraNumber.setPosition(450, 110);
    var kawaraNumberLabel = Label({
      text: localStorage.getItem("made_tile_number"),
      fontsize: 7,
      fill: "#7a280f",
    }).addChildTo(this).setPosition(510, 110);

    // ちゅくやっち
    this.chukuYatchiBaby.x = this.gridX.center();
    this.chukuYatchiBaby.y = this.gridY.span(10);
    // みつけるアイコン
    this.iconMitsukeru.x = this.gridX.span(3);
    this.iconMitsukeru.y = this.gridY.span(15);
    this.iconMitsukeru.setInteractive(true);
    // おしごとアイコン
    this.iconOshigoto.x = this.gridX.center();
    this.iconOshigoto.y = this.gridY.span(15);
    // 募金アイコン
    this.iconBokin.x = this.gridX.span(13)
    this.iconBokin.y = this.gridY.span(15);

    // タッチを有効にする
    this.iconOshigoto.setInteractive(true);
    this.chukuYatchiBaby.tweener.to({
      x: this.gridX.span(13),
    },3000,"default")
    .to({
      x: this.gridX.span(4),
    },3000,"default")
    .setLoop(true);
    // おしごとアイコンをタップしたときの処理
    var own = this;
    this.iconOshigoto.onpointstart = function() {
      own.exit('oshigotoMenu');
    };
    this.iconMitsukeru.onpointstart = function() {
      var syuriLevel = localStorage.getItem("syuri_level");
      console.log("hogehoge: " + syuriLevel);
      if (syuriLevel === "1") {
        own.exit('toSeeSyuriSud');
      }
      else if (syuriLevel === "2") {
        own.exit('toSeeSyuriSoso');
      }
      else if (syuriLevel === "3") {
        own.exit('toSeeSyuriHappy');
      }
      else {
        own.exit('main');
      }
    }
  },
});

// おしごとメニュー
phina.define("OshigotoMenu", {
  superClass: 'CanvasScene',
  
  init: function() {
    this.superInit({
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
    });
    // 画像配置
    this.backgroundImage = Sprite('homeBackground', WINDOW_WIDTH, WINDOW_HEIGHT).setPosition(this.gridX.center(), this.gridY.center()).addChildTo(this);
    this.iconKawaraYaki = Sprite('iconKawaraYaki').setPosition(this.gridX.span(5), this.gridY.center()).addChildTo(this);
    this.iconKawaraNage = Sprite('iconKawaraNage').setPosition(this.gridX.span(11), this.gridY.center()).addChildTo(this);
    // タッチを有効にする
    this.iconKawaraYaki.setInteractive(true);
    this.iconKawaraNage.setInteractive(true);
    var own = this;
    // 瓦焼きアイコンをタップしたときの処理
    this.iconKawaraYaki.onpointstart = function() {
      own.exit('kawaraYaki');
    };
    // 瓦投げアイコンをタップしたときの処理
    this.iconKawaraNage.onpointstart = function() {
      own.exit('kawaraThrow');
    };
  },
});
