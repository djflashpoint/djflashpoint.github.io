/*eslint indent:["warn", 4]*/
(function () {
    'use strict';

    function getFrequency(slider) {
        var val = parseInt(slider.value, 10) / 100;
        return Math.round(val * val);
    }

    function setFrequency(slider, value) {
        slider.value = Math.round(Math.sqrt(value)) * 100;
    }

    var freqSlider = document.getElementById('freq');
    var freqText = document.getElementById('freq_text');

    var audioContext;
    var oscillator;

    var frequency = getFrequency(freqSlider);

    var canvas = {
        el: null,
        ctx: null,
        width: 0,
        height: 0,
        yScale: 1,
        cycle: 0
    };

    var strokeOn = '#0e0';
    var strokeOff = '#060';
    var strokeStyle = strokeOff;

    //var debug = document.getElementById('debug');

    var startTime = null;

    var params;

    function getParams() {
        var queryString = window.location.search;
        var query = {};

        if (!queryString) {
            return false;
        }

        queryString.substring(1).split('&').forEach(function (kv) {
            var pair = kv.split('=');
            var k = pair[0];
            var v = pair[1];

            if (v) {
                if (v.toLowerCase() === 'false') {
                    v = false;
                } else if (v.toLowerCase() === 'true') {
                    v = true;
                } else if (!isNaN(parseInt(v, 10))) {
                    v = parseInt(v, 10);
                }
            }
            query[k] = v;
        });

        return query;
    }

    function initCanvas() {
        var rect;

        canvas.el = document.getElementById('sine');
        canvas.ctx = canvas.el.getContext('2d');
        rect = canvas.el.getBoundingClientRect();

        // Canvas logical dimensions are not necessarily the same as its
        // dimensions on the page, so we ensure they're the same here.
        canvas.width = canvas.el.width = rect.width;
        canvas.height = canvas.el.height = rect.height;

        canvas.yScale = (canvas.height - 10) / 2;
    }

    function drawSine() {
        var ctx = canvas.ctx;

        var baseScale = canvas.width / 40;
        var freqScale = frequency / canvas.width;
        var yScale = canvas.yScale;
        var xScale = freqScale / (baseScale / Math.PI);
        var x, y;

        var cyclesPerWidth = freqScale * baseScale;
        var cycleWidth = canvas.width / cyclesPerWidth;

        var xShift = canvas.cycle * cycleWidth * cyclesPerWidth;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        canvas.ctx.strokeStyle = strokeStyle;
        canvas.ctx.lineWidth = 2;

        x = 1;
        ctx.moveTo(x - xShift, canvas.yScale);
        while (x < canvas.width + xShift) {
            y = (Math.sin(x * xScale) * yScale) + yScale + 5;
            ctx.lineTo(x - xShift, y);

            x += 0.25;
        }

        ctx.stroke();
    }

    function stepShift(timestamp) {
        var delta;

        if (!startTime) {
            startTime = timestamp;
        }

        delta = (timestamp - startTime) % 1000;
        canvas.cycle = delta / 1000;

        drawSine();
        window.requestAnimationFrame(stepShift);
    }

    function startPlaying() {
        if (oscillator) {
            return;
        }
        oscillator = audioContext.createOscillator();
        oscillator.connect(audioContext.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = getFrequency(freqSlider);
        oscillator.start(0);

        strokeStyle = strokeOn;
    }

    freqSlider.addEventListener('input', function () {
        frequency = getFrequency(freqSlider);
        canvas.xShift = 0;

        freqText.value = frequency;
        if (oscillator) {
            oscillator.frequency.value = frequency;
        }
    }, false);

    //need slider and text input link

    document.getElementById('btnPlay').addEventListener('click', startPlaying);

    document.getElementById('btnStop').addEventListener('click', function () {
        oscillator.stop(0);
        oscillator = null;
        strokeStyle = strokeOff;
    }, false);

    if (window.AudioContext) {
        audioContext = new window.AudioContext();
    } else if (window.webkitAudioContext) {
        audioContext = new window.webkitAudioContext();
    } else {
        document.body.className = 'no-support';
    }

    initCanvas();

    window.requestAnimationFrame(stepShift);

    params = getParams();
    if (params.frequency) {
        setFrequency(freqSlider, params.frequency);
        frequency = getFrequency(freqSlider);
    }
    if (params.autoplay) {
        startPlaying();
    }


    
    freqText.value = getFrequency(freqSlider);

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById("freq").onchange = function (){
            document.title = freqText.value;
        }
        document.getElementById("freq_text").oninput = function (){
            document.title = freqText.value;
        }
    })

}());
