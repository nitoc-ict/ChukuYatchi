// 定数
const ASSETS = {
  image: {
    homeBackground: 'https://drive.google.com/uc?id=1aP7owI_TQy23j1BVGhtKOrQCwOQ8Z6Dk',
    iconMitsukeru: 'https://drive.google.com/uc?id=1c1FyBvCqQSAj6ag1NeP6DELeJoLWdyJl',
    iconOshigoto: 'https://drive.google.com/uc?id=1HqUEa06w89dhDEmX4jhGy4rJuV8A8r5k',
    iconBokin: 'https://drive.google.com/uc?id=1JKyjQRFaJGUq92kmw8DIo_OHk8mNdQbu',
    iconKawaraYaki: 'https://drive.google.com/uc?id=1K0gxoUSnSz1Bb4CJ_G7C9UKgkupiaPjX',
    iconKawaraNage: 'https://drive.google.com/uc?id=1bBIfEofx8E-bZLSE96DBwITnDru6NTWg',
    iconBack: 'https://drive.google.com/uc?id=1COGnSEmC4TukHDkyDEg_iekCB4NSaJ3a',
    // kawaranage
    kawara: 'https://drive.google.com/uc?id=1c-JHnfhNLn22BfbB5Yli6gnDuIkJC7dH',
    shadow: 'https://drive.google.com/uc?id=1S65yAn0-Ce7ZBdQFT9f0Uf00W4w7_mI8',
    shuri: 'https://drive.google.com/uc?id=1sL_spFghcw79aTCR2AA5UMpIYn7Qa3yc',
    chukuYatchiBabyHappy: 'https://drive.google.com/uc?id=1PKX2_oJxnDx6IZdsJ3tSgDoncdicr-nI',
    chukuYatchiBabySud: 'https://drive.google.com/uc?id=1kQPj7UVaocmbOEu-jBvxvVO3LCvuyJ12',
    chukuYatchiBaby1: 'https://drive.google.com/uc?id=1FGw5Q7ISopjn6KcGOtkSY29e69OMb866',
    chukuYatchiBaby2: 'https://drive.google.com/uc?id=18jtf3-v2oSvWQeyRJzu3aGo-NDd6LOq8',
    chukuYatchiBoyHappy: 'https://drive.google.com/uc?id=1W7ekI0_J2BeMCB9T_CsW5MZpet4b-7LY',
    chukuYatchiBoySud: 'https://drive.google.com/uc?id=16vInHQuuO5DGOuzXWfDbqjo8UOAG9Ukc',
    chukuYatchiBoy1: 'https://drive.google.com/uc?id=1cRV4k6PSU8ZF9Y5A5MMWmZI94BhIi1jE',
    chukuYatchiBoy2: 'https://drive.google.com/uc?id=15TTWwFX5-ncLVKLmF_HadI81CfPJ2_87',
    chukuYatchiWorkerHappy: 'https://drive.google.com/uc?id=1n6mXiX7pCSm08pJd-Ul46spsHzvPVd31',
    chukuYatchiWorkerSud: 'https://drive.google.com/uc?id=1V0x3pbOTOltYGROZE-tMON8SBdz5eAGs',
    chukuYatchiWorker1: 'https://drive.google.com/uc?id=1bG1H-rA_t-oHJO6EBFw8rEHXlhssWDNd',
    chukuYatchiWorker2: 'https://drive.google.com/uc?id=16Ku63qQpB2tGswQ1Ww26_31f5qi7WgKp',
    dragon: 'https://drive.google.com/uc?id=18Nc6JMrhWp9dU8mtp9Lc3zkw4MuxhIbW',
    syuri_castle1: 'https://drive.google.com/uc?id=1uw5lXomtWj4YtEt3wNAblCZp_XbkM20-',
    syuri_castle2: 'https://drive.google.com/uc?id=1vL7xzp32vAjz20cReT0Tc-MfOzklSO7l',
    syuri_castle3: 'https://drive.google.com/uc?id=1szNkd3N_1QMH2wE-AK2mKqru5298Y0-l',
    uchiwa: 'https://drive.google.com/uc?id=1xXLdSzMglC8iLn0moIzIZ-KH16GDNcfI',
    uchiwa2: 'https://drive.google.com/uc?id=1S4EcNFIzlEmLtqt8m4HZLKhNufULcd_9',
    kamado: 'https://drive.google.com/uc?id=1JFX4Im7h_gyubtJR3BReKeEawmbWHl0A',
    fire1: 'https://drive.google.com/uc?id=1NehPRUijw0gZ9J4QLh6VRl73YIrrxQBs',
    fire2: 'https://drive.google.com/uc?id=1keye0H-z1pgZGpnH629B0JUYg-yQwbzb',
    fire3: 'https://drive.google.com/uc?id=1QLQGhZd_LmhS7Um7543OPSIesMVdd0_F',
    fire4: 'https://drive.google.com/uc?id=1Xttjt0A0PKuGec9_Q1ow9_DIQ7kE1x8t',
    // back: 'https://drive.google.com/uc?id=1NKrSV77pmY_y-orZjL9IrgYp58W4NdvA',
    back: 'https://drive.google.com/uc?id=1COGnSEmC4TukHDkyDEg_iekCB4NSaJ3a',
    // home status
    iconGeneration1: 'https://drive.google.com/uc?id=1vNSEE5YfCz4p9rNRo5FLXwnWKJSPdeKh',
    iconGeneration2: 'https://drive.google.com/uc?id=1WBJyortEuGrN1wr-4RYIzr0AJ_sh7uqg',
    iconGeneration3: 'https://drive.google.com/uc?id=1hZRDYWMZfTemvNqzb1rxPQYo42u-XtW1',
    generationText: 'https://drive.google.com/uc?id=1OQ3adErPc8sfWtR4d471s-bZZo-5X5mH',
    shokuninLv: 'https://drive.google.com/uc?id=1dryoySe4FfifZNaGk9z0nDm8tz0_TN0_',
    kawaraNumber: 'https://drive.google.com/uc?id=1cRmFhHia1lDB05BSytbHLl8kl2cBJPqk',
  },
    sound: {
    'bgm': './bgm.mp3',
  },
};
const LEVEL_CHUKUYATCHI = [
  "chukuYatchiBaby",
  "chukuYatchiBoy",
  "chukuYatchiWorker"
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

var MAX_ROOF_WIDTH = 8;
var MAX_ROOF_HEIGHT = 3;
var TILE_WIDTH = 80;
var TILE_HEIGHT = 50;
var TILE_MARGIN_X = 0.1;
var TILE_MARGIN_Y = 0.5;
var KAWARA_INIT_Y = 900;
var KAWARA_INIT_X = WINDOW_WIDTH / 2;
// var KAWARA_INIT_X = 325;
var SHURI_INIT_Y = 315;
var SHURI_INIT_X = 212;
