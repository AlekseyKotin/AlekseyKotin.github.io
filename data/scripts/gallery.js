$(window).load(function () {
    $('.galleryWrap').css('transition', 'transform '+ 100 +'ms linear');

    let mouseY = 0; //Координата Y курсора
    let offset = 0; //Текущее смещение галереи

    setInterval(function(){
        if(window['currentPage']==1 && !window['lock']){
            galleryMove(mouseY);
        }

    }, 50);

    $('html').mousemove(function (e) {
        if(window['currentPage']==1){
            galleryRotate(e.pageX);
            mouseY = e.pageY - $('html').scrollTop();
        }
    });


    function galleryRotate(x) {
        let angleX;
        let windowWidth = $('body').width();
        let perspective = windowWidth / 2.4;

        angleX = (windowWidth/2 - x)/500;
        $('.galleryList').css('transform', 'perspective('+ perspective +'px) rotateY('+ -angleX +'deg)');
    }

    function galleryMove(y){
        let windowHeight = $('body').height(); //Высота экрана
        let mouseOffset = (((windowHeight / 2) - y) / windowHeight) * 100; //Степень отклонения курсора от центра экрана [-50%..0%..50%]
        let galleryMaxOffset = ($('.galleryWrap').height() - windowHeight) + (windowHeight/10); //Расстояние максимального смещения
        offset = $('.galleryWrap').css('transform').split(',')[5].split(')')[0];

        if(galleryMaxOffset <= 0){
            galleryMaxOffset = 0;
        }

        offset = parseInt(mouseOffset) + parseInt(offset);
        if(offset >=0){
            offset = 0;
        } else if(offset <= -galleryMaxOffset){
            offset = -galleryMaxOffset;
        }

        $('.galleryWrap').css('transform', 'translateY('+ offset +'px)');
    }

});