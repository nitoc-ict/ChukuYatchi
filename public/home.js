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
    this.iconKawaraYaki = Sprite('iconKawaraYaki').addChildTo(this);
    this.iconKawaraNage = Sprite('iconKawaraNage').addChildTo(this);
    this.chukuYatchiBaby = Sprite('chukuYatchiBaby1', 200, 200).addChildTo(this);
    
    // 画像の配置
    // 背景
    this.backgroundImage.x = this.gridX.center();
    this.backgroundImage.y = this.gridY.center();
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
    // 戻るボタン
    this.back = Sprite('back').addChildTo(this);
    this.back.x = this.gridX.center(),
    this.back.y = WINDOW_HEIGHT / V_SPLIT_N * 3 + BUTTON_DISTANCE,
    this.back.width = 150;
    this.back.height = 100;
    this.back.setInteractive(true);
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
