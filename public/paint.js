(function () {
  var canvas = document.querySelector("#paint");
  var ctx = canvas.getContext("2d");

  var sketch = document.querySelector("#sketch");
  var sketch_style = getComputedStyle(sketch);
  canvas.width = parseInt(sketch_style.getPropertyValue("width"));
  canvas.height = parseInt(sketch_style.getPropertyValue("height"));

  var mouse = { x: 0, y: 0 };
  var last_mouse = { x: 0, y: 0 };

  /* Mouse Capturing Work */
  canvas.addEventListener(
    "mousemove",
    function (e) {
      last_mouse.x = mouse.x;
      last_mouse.y = mouse.y;

      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    },
    false
  );

  /* Drawing on Paint App */
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "orange";

  canvas.addEventListener(
    "mousedown",
    function (e) {
      canvas.addEventListener("mousemove", onPaint, false);
    },
    false
  );

  canvas.addEventListener(
    "mouseup",
    function () {
      canvas.removeEventListener("mousemove", onPaint, false);
    },
    false
  );

  const btnPencil = document.querySelector("#btn-pencil");
  const btnEraser = document.querySelector("#btn-eraser");

  btnPencil.addEventListener(
    "click",
    function () {
      ctx.strokeStyle = document.querySelector("#color-picker").value;
      sketch.classList.add("cursor-pencil");
      sketch.classList.remove("cursor-eraser");
      btnPencil.classList.add("button-pressed");
      btnEraser.classList.remove("button-pressed");
    },
    false
  );

  btnEraser.addEventListener(
    "click",
    function () {
      ctx.strokeStyle = "white";
      sketch.classList.add("cursor-eraser");
      sketch.classList.remove("cursor-pencil");
      btnEraser.classList.add("button-pressed");
      btnPencil.classList.remove("button-pressed");
    },
    false
  );

  document.querySelector("#color-picker").addEventListener(
    "change",
    function () {
      ctx.strokeStyle = this.value;
    },
    false
  );

  document.querySelector("#btn-clear").addEventListener(
    "click",
    function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    false
  );

  var onPaint = function () {
    ctx.beginPath();
    ctx.moveTo(last_mouse.x, last_mouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.closePath();
    ctx.stroke();
  };
})();
