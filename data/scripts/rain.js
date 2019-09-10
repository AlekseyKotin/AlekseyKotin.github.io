$(function () {
    for (var i=0; i<300; i++) {
        $('#rainBg')[0].innerHTML += '<i class="rain" style="left: '+randomRain(-2000, 2000)+'px;transform: translate3d(0, 0, 0) rotate(-45grad);animation-delay: '+(0.01 * i)+'s"></i>';
    }

    function randomRain(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

});