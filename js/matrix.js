const s = window.screen;
const w = (q.width = s.width);
const h = (q.height = s.height);
const ctx = q.getContext("2d");

const p = Array(Math.floor(w / 10) + 1).fill(0);

const random = (items) => items[Math.floor(Math.random() * items.length)];

const hex = ":・.=*+-<>アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン 一 九 七 二 人 入 八 力 十 下 三 千 上 口 土 夕 大 女 子 小 山 川 五 天 中 六 円 手 文 日 月 木 水 火 犬 王 正 出 本 右 四 左 玉 生 田 白 目 石 立 百 年 休 先 名 字 早 気 竹 糸 耳 虫 村 男 町 花 見 貝 赤 足 車 学 林 空 金 雨 青 草 音 校 森 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9".split("");

setInterval(() => {
  ctx.fillStyle = "rgba(0,0,0,.05)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#0f0";
  p.map((v, i) => {
    ctx.fillText(random(hex), i * 10, v);
    p[i] = v >= h || v > 50 + 10000 * Math.random() ? 0 : v + 10;
  });
}, 1000 / 30);
