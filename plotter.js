  // config
  var avg_window = 40;

  // init
  var smoothie = new SmoothieChart({
    grid: {
      strokeStyle: '#000000',
      borderVisible: false
    }
  });
  var plot_buffer = new TimeSeries();
  var _buffer = []
  var counter = 0

  var canvas = document.getElementById('linePlot')
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;

  document.body.onclick=function(){
    document.body.webkitRequestFullscreen();
  }

  smoothie.addTimeSeries(plot_buffer, {
    lineWidth: 2,
    strokeStyle: '#6aeefe'
  })
  smoothie.streamTo(document.getElementById("linePlot"), 500);
  console.log('initialized...')

  // run
  window.addEventListener('load', function() {
    console.log('loaded doppler')
    window.doppler.init(function(bandwidth) {
      var diff = bandwidth.right - bandwidth.left;
      counter += 1;
      _buffer.push(diff)
      // console.log(diff, bandwidth.left, bandwidth.right )

      // Add _buffer average to timeseries
      if (counter % avg_window == 0) {
        var sum = 0;
        for (var i = 0; i < _buffer.length; i++) {
          sum += _buffer[i]
        }
        var avg = sum / _buffer.length;
        console.log(avg)

        plot_buffer.append(new Date().getTime(), avg);
        _buffer = []
      }
    });
  });
