var audioContext;
var mediaStreamSource = null
var meter = null
var volume = null;
var gameScore = 0;
function beginDetect() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)()
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
      mediaStreamSource = audioContext.createMediaStreamSource(stream)
      meter = createAudioMeter(audioContext)
      mediaStreamSource.connect(meter)
    })
  }
}
function createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
  const processor = audioContext.createScriptProcessor(512)
  processor.onaudioprocess = volumeAudioProcess
  processor.clipping = false
  processor.lastClip = 0
  processor.volume = 0
  processor.clipLevel = clipLevel || 0.98
  processor.averaging = averaging || 0.95
  processor.clipLag = clipLag || 750
  // this will have no effect, since we don't copy the input to the output,
  // but works around a current Chrome bug.
  processor.connect(audioContext.destination)
  processor.checkClipping = function () {
    if (!this.clipping) {
      return false
    }
    if ((this.lastClip + this.clipLag) < window.performance.now()) {
      this.clipping = false
    }
    return this.clipping
  }
  processor.shutdown = function () {
    this.disconnect()
    this.onaudioprocess = null
  }
  return processor
}
function volumeAudioProcess(event) {
  const buf = event.inputBuffer.getChannelData(0)
  const bufLength = buf.length
  let sum = 0
  let x
  // Do a root-mean-square on the samples: sum up the squares...
  for (var i = 0; i < bufLength; i++) {
    x = buf[i]
    if (Math.abs(x) >= this.clipLevel) {
        this.clipping = true
        this.lastClip = window.performance.now()
    }
    sum += x * x
  }
  // ... then take the square root of the sum.
  const rms = Math.sqrt(sum / bufLength)
  // Now smooth this out with the averaging factor applied
  // to the previous sample - take the max here because we
  // want "fast attack, slow release."
  this.volume = Math.max(rms, this.volume * this.averaging)
  volume = this.volume;
//        document.getElementById('audio-value').innerHTML = volume
//        document.getElementById('score-value').innerHTML = gameScore
}

var switchChar = true;
// const SPEED         = 10;
phina.define("KawaraYakiScene", {
  superClass: 'CanvasScene',
  init: function(options) {
    this.superInit(options);
beginDetect();  // load時からvolumeを取る
    this.background = Sprite('kamado').setPosition(this.gridX.center(), this.gridY.center()).addChildTo(this);
    this.fire1 = Sprite('fire1', 128, 256).setPosition(this.gridX.center(), this.gridY.center()).addChildTo(this);
    this.fire2 = Sprite('fire2', 128, 256).setPosition(this.gridX.center(), this.gridY.center()).addChildTo(this).hide();
    this.fire3 = Sprite('fire3', 128, 256).setPosition(this.gridX.center(), this.gridY.center()).addChildTo(this).hide();
    this.fire4 = Sprite('fire4', 128, 256).setPosition(this.gridX.center(), this.gridY.center()).addChildTo(this).hide();
    // fireの切り替え
    this.ch = [this.fire1, this.fire2, this.fire3, this.fire4];
    this.uchiwa = Sprite('uchiwa', 128, 256).setPosition(this.gridX.center()+120, this.gridY.center()+150).addChildTo(this);
    this.uchiwa2 = Sprite('uchiwa2', 128, 256).setPosition(this.gridX.center()+120, this.gridY.center()+150).addChildTo(this);
    // 戻るボタン
    this.back = Sprite('back').addChildTo(this);
    this.back.x = this.gridX.span(3);
    this.back.y = this.gridY.span(15);
    this.back.setInteractive(true);
    // もどるアイコンをタップしたときの処理
    var own = this;
    this.back.onpointstart = function() {
      const madeTiles = parseInt(localStorage.getItem("made_tile_number"));
      localStorage.setItem("made_tile_number", madeTiles + Math.floor(gameScore / 10));
      own.exit('main');
    };
  },
  update: function() {
    // うちわの切り替え
    switchChar = !switchChar
    if (switchChar) {
      this.uchiwa.hide();
      this.uchiwa2.show();
    } else {
      this.uchiwa.show();
      this.uchiwa2.hide();
    }
    if (0.4 < volume) {
      gameScore += 1;
      this.ch[0].hide();
      this.ch[1].hide();
      this.ch[+ switchChar + 2].hide();
      this.ch[+ !switchChar + 2].show();
    } else {
      this.ch[2].hide();
      this.ch[3].hide();
      this.ch[+ switchChar].hide();
      this.ch[+ !switchChar].show();
    }
  }
});
