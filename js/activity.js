/**
 * Author: liushaozong
 * Date: 2017/5/23
 * Time: 14:58
 * Description:Description
 */




//Ios微信audio自动播放
wx.config({
    debug: false,
    appId: '',
    timestamp: 1,
    nonceStr: '',
    signature: '',
    jsApiList: []
});


$(function () {

    var video = '<video id="myVideo"  width="100%" x-webkit-airplay="allow" muted playsinline autoplay> \
                    <source src="http://gdl1401.8864.com/dbm/market/knight20170425.mp4" type="video/mp4">\
                    <source src="sample.ogg" type="video/ogg">\
                    你的浏览器不支持HTML5 video.\
                </video>'


    myVideo();
    function myVideo() {
        $('#video-1').html('');
        $('#video-1').append(video);
        document.getElementById("myVideo").onended = function () {
            myVideo();
        };
    }


    var swiper = new Swiper('.swiper-container.box', {
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        mousewheelControl: true,
        onSlideChangeStart: function (swiper) {

            if (swiper.activeIndex == 1) {
                slidePage($('.lunbo'), '.lunbo');
                $('.pop').addClass('on');
                wx.ready(function () {
                    document.getElementById('myVideo').play();
                    //document.getElementById('video-5').play();
                });
            } else {
                clearInterval(timeId);
                wx.ready(function () {
                    document.getElementById('myVideo').pause();
                    //document.getElementById('video-5').play();
                });
            }

            if (swiper.activeIndex == 2) {
                slidePage($('.lunbo2'), '.lunbo2');
                $('.pop2').addClass('on')
            } else {
                clearInterval(timeId)
            }

            if (swiper.activeIndex == 3) {
                slidePage($('.lunbo3'), '.lunbo3');
                $('.pop3').addClass('on')
            } else {
                clearInterval(timeId)
            }
        }
    });
    var swiperPage5 = new Swiper('.swiper-container.page5', {
        pagination: '.swiper-pagination.fiv',
        nextButton: '.button-next',
        prevButton: '.button-prev',
        loop: true
    });

    //获取屏幕高度
    var wapH = $(document).height();
    var p1Video = $('.video').height();
    var sloganbgH = $('.slogan-bg').height(wapH - p1Video);

    //轮播滚动
    /*$('.lunbo').width($('.lunbo li img').eq(0).width() * $('.lunbo li').length)
     $('.lunbo2').width($('.lunbo2 li img').eq(0).width() * $('.lunbo2 li').length)
     $('.lunbo3').width($('.lunbo3 li img').eq(0).width() * $('.lunbo3 li').length)*/


    var timeId = null;

    function slidePage(aclass, sChass) {
        var oul = aclass;
        var oulHtml = oul.html();
        oul.html(oulHtml + oulHtml)
        var ali = $(sChass + ' ' + 'li');
        $(sChass + ' li:eq(0) img').load(function () {
            var aliWidth = $(sChass + ' li:eq(0) img').width();
            var aliSize = ali.length;
            var ulWidth = aliWidth * aliSize + 1;
            oul.width(ulWidth);
            oul.css('visibility', 'visible');
            var speed = -2;

            function trundle() {
                if (speed < 0) {
                    if (parseInt(oul.css('left')) <= -ulWidth / 2) {
                        oul.css('left', 0);
                    }
                    oul.css('left', '+=-2');
                }
            }

            timeId = setInterval(trundle, 40);
        })
    }


})