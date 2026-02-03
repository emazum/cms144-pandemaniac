$(function () {
  var timer = $('#timer')
    , bar = timer.find('.progress-bar')
    , countdown = timer.find('span');

  var timeout = +bar.attr('data-timeout');
  var remain = +bar.attr('data-remain');
  var endTime = remain * 1000 + Date.now();
  if (timeout !== 0) {
    var progress = setInterval(function () {
      var remain = Math.round((endTime - Date.now()) / 1000);
      remain = Math.max(0, remain);
      var percent = 100 * (remain / timeout);
      var mins = parseInt(Math.floor(remain / 60));
      var secs = parseInt(Math.floor(remain - mins * 60));
      var text = String(mins).padStart(2, '0') + ":" + String(secs).padStart(2, '0');
      countdown.text(text);

      if (percent >= 50) {
      } else if (percent >= 25) {
        bar.removeClass("progress-bar-success").addClass("progress-bar-warning");
      } else {
        bar.removeClass("progress-bar-warning").addClass("progress-bar-danger");
      }
      bar.css('width', percent + '%');
      bar.attr('data-remain', remain);

      if (remain <= 0) {
        clearInterval(progress);
      }

    }, 1000);
  }

  var timerToggle = $('#timer-toggle');
  // Hide/show timer toggle button
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr("href") // activated tab
    if (target == '#download') {
      timerToggle.hide();
    } else {
      timerToggle.show();
    }
  });

  // Change toggle button text
  $('#timer-toggle').click(function (e) {
    if (e.target.text == "Hide Timer") {
      e.target.text = "Show Timer";
    } else {
      e.target.text = "Hide Timer";
    }
  })
});




