/**
 * Created by Administrator on 2016/11/15.
 */
$(document).ready(function () {
    $(".banner_cover").parent().hover(function () {
        $(this).children("div").toggle();
    });

    //滚动隐藏顶部
    $(function () {
        var cubuk_seviye = $(document).scrollTop();
        var header_yuksekligi = $('.header, .nav_movie_wrap').outerHeight();

        $(window).scroll(function () {
            var kaydirma_cubugu = $(document).scrollTop();

            if (kaydirma_cubugu > header_yuksekligi) {
                $('.header, .nav_movie_wrap').addClass('gizle');
            }
            else {
                $('.header, .nav_movie_wrap').removeClass('gizle');
            }

            if (kaydirma_cubugu > cubuk_seviye) {
                $('.header, .nav_movie_wrap').removeClass('sabit');
            }
            else {
                $('.header, .nav_movie_wrap').addClass('sabit');
            }

            cubuk_seviye = $(document).scrollTop();
        });
    });


    //返回顶部
    $(this).find(".side_btn").click(function () {
        $("html,body").animate({
            "scrollTop": 0
        }, "normal");
    });

    //返回底部
    $(this).find(".side_down_btn").click(function () {
        $("html,body").animate({
            scrollTop: $('.footer').offset().top
        }, "normal");
    });

    //显示/隐藏返回顶部/底部图标
    var lastRmenuStatus = true;
    $(window).scroll(function () {
        var _top = $(window).scrollTop();
        if (_top > 300) {
            $(".side_btn,.side_down_btn").data("expanded", true);
        }
        else {
            $(".side_btn,.side_down_btn").data("expanded", false);
        }
        lastRmenuStatus = $(".side_btn,.side_down_btn").data("expanded");
        if (lastRmenuStatus) {
            $(".side_btn,.side_down_btn").slideDown();
        }
        else {
            $(".side_btn,.side_down_btn").slideUp();
        }
    });

    //幻灯片轮播
    var carousels = $('.carousel');
    carousels.each(function () {
        var $obj = $(this);
        var $inner = $obj.find('.carousel-inner');

        var id = 'uuid' + new Date().getTime();
        $obj.addClass(id);

        if ($obj.data('shift') === 1) {
            var items = $obj.find('.item > [class*="col-"]'),
                visibleCnt = $obj.find('.item:first [class*="col-"]').length,
                wrapper = "";

            // build styles
            var rule_base = '.carousel.' + id + ' .carousel-inner > .item',
                styles = $('<style></style>'),
                rules = [];
            rules[0] = rule_base + '.next {left: ' + (100 / visibleCnt) + '%; transform: none;}';
            rules[1] = rule_base + '.active {left: 0;}';
            rules[2] = rule_base + '.active.left {left: -' + (100 / visibleCnt) + '%; transform: none;}';
            rules[3] = rule_base + '.next.left {left: 0;}';
            rules[4] = rule_base + '.active.right {left: ' + (100 / visibleCnt) + '%; transform: none;}';
            rules[5] = rule_base + '.prev.right {left: 0;}';
            rules[6] = rule_base + '.prev {left: -' + (100 / visibleCnt) + '%; transform: none;}';
            for (var i = 0; i < rules.length; i++) {
                styles.append(rules[i]);
            }
            $obj.prepend(styles);

            // rebuild items
            for (var i = 0; i < $(items).length; i++) {
                var $item = $(items[i]);
                var parent = $item.parent();
                if (parent.hasClass('item')) {
                    if (!wrapper.length) {
                        wrapper = parent.clone().removeClass('active').html('');
                    }
                    $item.unwrap();
                }

                var itemGroup = [$item];
                for (var x = 1; x < visibleCnt; x++) {
                    var a = i + x;
                    var next = $(items[a]);
                    if (!next.length) {
                        next = $(items[(a - $(items).length)]);
                    }
                    itemGroup[x] = next.clone();
                }
                var newSet = wrapper.clone().html(itemGroup);
                if (i == 0) {
                    newSet.addClass('active');
                }
                newSet.appendTo($inner);
            }
        }
    });
})


