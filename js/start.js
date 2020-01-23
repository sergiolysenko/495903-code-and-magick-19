'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_HEIGHT = 20;
var MAX_HEIGHT = -150;
var BAR_WIDTH = 40;
var SPACE_BETWEEN = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили! ', 120, 40);
  ctx.fillText('Список результатов: ', 120, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = (MAX_HEIGHT * times[i]) / maxTime;
    var timePosition = CLOUD_HEIGHT - FONT_HEIGHT - 2 * GAP + barHeight;

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + i * BAR_WIDTH + (i + 1) * SPACE_BETWEEN, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + i * BAR_WIDTH + (i + 1) * SPACE_BETWEEN, timePosition);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '% , 50%)';
    }
    ctx.fillRect(CLOUD_X + i * BAR_WIDTH + (i + 1) * SPACE_BETWEEN, CLOUD_HEIGHT - GAP - FONT_HEIGHT, BAR_WIDTH, barHeight);
  }
};
