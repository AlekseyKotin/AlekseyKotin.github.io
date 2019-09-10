$(function () {
    window['currentPage'] = 0;
    let galleryScrollIn = false;
    window['lock'] = false;

    intro(7000);


    function intro(time){
        $('body').transition({
            'background-image': 'url(data/img/bg.jpg)'
        });
        setTimeout(function () {
            $('#startMask').toggleClass("hiddenItem mainInMask");
            window['currentPage'] = 0;
            galleryScrollIn = true;
            window['lock'] = false;
        }, time);
    }

    $('.backToStart').on('click',function (e) {

        if(window['currentPage']==2){
            closeCategory();
        }
        $('.galleryWrap').toggleClass("hiddenItem");
        window['lock'] = true;
        $('#startMask').toggleClass("hiddenItem mainInMask");
        setTimeout(function () {
        $('.backToStart').toggleClass('hiddenItem');
            $('.mainWrap').toggleClass("hiddenItem");
        }, 1000);
        intro(7000);
    });


    $('body').on("mousewheel wheel" ,function (e) {
        if(galleryScrollIn && window['currentPage']==0 && !lock){
            $('.galleryWrap').css('transform', 'translateY(0px)');
            $('.galleryWrap').toggleClass("hiddenItem");
            window['lock'] = true;
            $('#startMask').toggleClass("hiddenItem mainOutMask");
            $('body').transition({
                delay: 800,
                complete: function () {
                    $('body').transition({'background-image': 'none'})
                }
            });
            setTimeout(function (e) {
                //Скрытие главного экрана
                $('.mainWrap').toggleClass("hiddenItem");
                $('.backToStart').toggleClass("hiddenItem");

                //Анимация лого
                $('.galleryTop').toggleClass('galleryTopActive');
                $('.galleryLogo').toggleClass('galleryLogoActive');

            }, 1000);
            window['currentPage'] = 1;
            //Скрытие маски
            setTimeout(function () {
                $('#startMask').toggleClass("hiddenItem mainOutMask");
                window['lock'] = false;
            },3000);

        }
    });


    $('.innerButton').click(function (e) {
        let id = $(this).data('id');
        $('.categoryWrap').attr("data-collection", id);

        window['currentPage'] = 2;
        $('.categoryWrap').toggleClass('hiddenItem');

        $('.galleryList li').transition({
            margin: '1.3vw',
            opacity: 0.5,
            duration: 500
        });

        $('.categoryBackground').transition({
            background: 'url("data/img/'+ id +'.png") center',
            'background-size': 'cover',
            opacity: 1,
            transform: 'scale(1)',
            duration: 1000
        });
        $('.categoryBackground').transition({
            width: '110vw',
            height: '110vh',
            filter: 'blur(1px) grayscale(0.1) brightness(50%)',
            delay: 500,
            duration: 1000,
            complete: function () {
                $('.categoryLogo, .categoryInfo, .categoryAction').toggleClass('hiddenItem').transition({
                    opacity: 1,
                    duration: 1000
                });
            }
        });

        $.getJSON('data/json/info.json', function (data) {
            console.log(data);
            $('.categoryInfo h1').html(data[id].header);
            $('.categoryInfo span').html(data[id].text);
            $('.categoryInfo p').html(data[id].additional);
        });

        $('.categoryLogo').transition({
            background: 'url("data/img/'+ id +'.png") center',
            'background-size': 'cover'
        });
    });
    
    
    $('#closeButton').on('click',function (e) {
        closeCategory()
    });

    $('#leftButton').on('click',function (e) {
        slider(true);
    });
    $('#rightButton').on('click',function (e) {
        slider(false);
    });


    function closeCategory() {
        $('.categoryLogo, .categoryInfo, .categoryAction').transition({
            opacity: 0,
            duration: 1000,
            complete: function (e) {
                $('.categoryLogo, .categoryInfo, .categoryAction').toggleClass('hiddenItem');
                $('.categoryBackground').transition({
                    width: "40vw",
                    height: "calc((40vw - 0.6vw) / 1.72)",
                    filter: 'blur(0px) grayscale(0) brightness(100%)',
                    opacity: 0,
                    complete: function () {
                        $('.categoryBackground').css('background','none');
                    }
                });
                setTimeout(function () {
                    $('.categoryWrap').toggleClass('hiddenItem');
                    window['currentPage'] = 1;
                },1000)
            }
        });
        $('.galleryList li').transition({
            margin: '0.3vw',
            opacity: 1,
            duration: 500,
            delay: 1500
        });
    }

    function slider(prev) {
        let id = $('.categoryWrap').attr("data-collection");

        $.getJSON('data/json/info.json', function (data) {
            let i = 0;
            $.each(data,function () {
                i++;
            });
            if(prev){
                if(data[id-1]){
                    id -= 1;
                } else {
                    id = i;
                }
            } else {
                if(data[parseInt(id) + parseInt(1)]){
                    id = parseInt(id) + parseInt(1);
                } else {
                    id = 1;
                }
            }

            $('.categoryInfo h1').html(data[id].header);
            $('.categoryInfo span').html(data[id].text);
            $('.categoryInfo p').html(data[id].additional);
            $('.categoryWrap').attr("data-collection", id);
            $('.categoryLogo, .categoryBackground').transition({
                'background-image': 'url("data/img/'+ id +'.png")',
            })
        });
    }

});
