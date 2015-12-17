/*
X=R*sin(K*t)*cos(t))
Y=R*sin(K*t)*sin(t)
*/

var animation_period = 500;

function movePoint(ticks) {
  var angle = (ticks % animation_period) * Math.PI * 2 / animation_period;
  var X = R * Math.sin(K * angle) * Math.cos(angle) + 350;
  var Y = R * Math.sin(K * angle) * Math.sin(angle) + 350;
  $("#circle").css({left: X-5, top: Y-5});
}

function drawThing(ctx) {
  var step = Math.PI / 360;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (var angle = 0.0; angle < Math.PI * 2; angle += step) {
    var X = R * Math.sin(K * angle) * Math.cos(angle);
    var Y = R * Math.sin(K * angle) * Math.sin(angle);
    ctx.lineTo(X, Y);
  }
  ctx.stroke();
}

function drawStuff() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  context.resetTransform();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(350, 350);
  context.strokeStyle = "black";
  for (var i = 0; i < window.Count; i++) {
    context.rotate(Angle);
    drawThing(context);
  }
}

$(function() {
  $("#apply").click(function() {
    console.log("Clicked");
    window.K = parseFloat($("#k").val());
    window.R = parseFloat($("#r").val());
    window.Angle = 0;
    window.Count = 1;

    drawStuff();
  });

  window.K = 4.0;
  window.R = 200.0;
  window.Count = 1;
  window.Angle = 0;

  drawStuff();

  var ticks = 0;

  setInterval(function() {
    movePoint(ticks);
    ticks++;
  }, 100);

});
