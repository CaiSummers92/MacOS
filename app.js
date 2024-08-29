let isDragging = false;
let isResizing = false;
let x_pos = 0;
let y_pos = 0;
let x_initial = 0;
let y_initial = 0;
let x_final = 0;
let y_final = 0;
let initialWidth = 0;
let initialHeight = 0;
let direction = "";

$(".window").css({
  top: localStorage.getItem("y_pos") + "px",
  left: localStorage.getItem("x_pos") + "px",
  width: localStorage.getItem("width"),
  height: localStorage.getItem("height"),
});

$(".window").each(function () {
  $(this).on("mousedown", function (e) {
    if ($(".border:hover").length != 0) {
      isResizing = true;
      x_pos = parseInt($(this).css("left"), 10);
      y_pos = parseInt($(this).css("top"), 10);
      x_initial = e.pageX;
      y_initial = e.pageY;
      initialWidth = parseInt($(".window").css("width"), 10);
      initialHeight = parseInt($(".window").css("height"), 10);
      direction = $($(".border:hover")).attr("class").split(" ")[0];
    } else if ($(".top-bar:hover").length != 0) {
      isDragging = true;
      x_pos = e.pageX - parseInt($(this).css("left"), 10);
      y_pos = e.pageY - parseInt($(this).css("top"), 10);
    }
  });
});

$(document).on("mouseup", function (e) {
  isDragging = false;
  isResizing = false;
});

$(document).on("mousemove", function (e) {
  if (isDragging == true) {
    x_final = e.pageX - x_pos;
    y_final = e.pageY - y_pos;

    if (
      x_final >= 0 &&
      y_final >= 0 &&
      x_final <= $(".desktop").outerWidth() - $(".window").outerWidth() &&
      y_final <= $(".desktop").outerHeight() - $(".window").outerHeight()
    ) {
      $(".window").css({ top: y_final, left: x_final });
      localStorage.setItem("x_pos", x_final);
      localStorage.setItem("y_pos", y_final);
    }
  }

  if (isResizing == true) {
    if (direction == "e") {
      $(".window").css("width", initialWidth + e.pageX - x_initial + "px");
    }

    if (direction == "s") {
      $(".window").css("height", initialHeight + e.pageY - y_initial + "px");
    }

    if (direction == "w") {
      $(".window").css({
        width: initialWidth - e.pageX + x_initial + "px",
        left: x_pos + e.pageX - x_initial + "px",
      });
    }

    if (direction == "n") {
      $(".window").css({
        height: initialHeight - e.pageY + y_initial + "px",
        top: y_pos + e.pageY - y_initial + "px",
      });
    }

    if (direction == "ne") {
      $(".window").css({
        height: initialHeight - e.pageY + y_initial + "px",
        top: y_pos + e.pageY - y_initial + "px",
        width: initialWidth + e.pageX - x_initial + "px",
      });
    }

    if (direction == "se") {
      $(".window").css({
        width: initialWidth + e.pageX - x_initial + "px",
        height: initialHeight + e.pageY - y_initial + "px",
      });
    }

    if (direction == "sw") {
      $(".window").css({
        width: initialWidth - e.pageX + x_initial + "px",
        left: x_pos + e.pageX - x_initial + "px",
        height: initialHeight + e.pageY - y_initial + "px",
      });
    }

    if (direction == "nw") {
      $(".window").css({
        height: initialHeight - e.pageY + y_initial + "px",
        top: y_pos + e.pageY - y_initial + "px",
        width: initialWidth - e.pageX + x_initial + "px",
        left: x_pos + e.pageX - x_initial + "px",
      });
    }

    localStorage.setItem("width", $(".window").css("width"));
    localStorage.setItem("height", $(".window").css("height"));
  }
});
