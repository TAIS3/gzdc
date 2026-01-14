// $(function(){
//  $('.sidebar').css('minHeight',$('.wrap').height());
//  $('.sidebar').find('.menu_wrap').height($('.sidebar').height() - 90 );
//  $(window).resize(function(){
//      $('.sidebar').css('minHeight',$('.wrap').height());
//      $('.sidebar').find('.menu_wrap').height($('.sidebar').height() - 90 );
//  })
// })

function sidebarHeight() {
    var sideHeight = $('.sidebar').height($('.main').height());
    $('.sidebar').find('.menu_wrap').height(sideHeight - 90);
}

function dropMenu() {
    var nav = $('nav');
    nav.children('ul').children('li').hover(function() {
        $(this).children('.sonNav').show();
    }, function() {
        $(this).children('.sonNav').hide();
    })
}

function eleSize(className, width, height) {
    $(className).height($(className).width() / width * height);
}

// function replaceVideo(videoimg) {
//     var video = $('.content').find('embed');
    
//     if (video.length > 0) {
//       var videoSrc = video.attr('src');
//         video.replaceWith('<div id="articleVideo"></div>');
//         jwplayer("articleVideo").setup({image: video_img,width: "800px",height:"500px",file: videoSrc});
//         setTimeout(function () {
//           sidebarHeight();
//         },1000) 
//     }
// }

function replaceVideo(videoimg) {
    var video = $('.content').find('embed');
    var video_img = (videoimg && videoimg != "") ? videoimg : "/Public/images/sp_bg2.jpg";
    for (let i = 0; i < video.length; i++) {
        const element = $(video[i]);
        console.log(element)
        var videoSrc = element.attr('src');
        element.replaceWith('<div id="articleVideo' + i + '"></div>');
        jwplayer("articleVideo" + i).setup({image: video_img,width: "800px",height:"500px",file: videoSrc});
    }
    setTimeout(function () {
       sidebarHeight();
    },1000)
    
}


/**
 * 侧栏操作
 */
function sidebarControll() {
    // var sidebar = $('.wrap .sidebar');
    // var sidebarButton = sidebar.find('span.sidebar_status');
    // sidebarButton.click(function() {
    //     sidebar.toggleClass('sidebar_show sidebar_hide');
    //     $(this).find('i').toggleClass('glyphicon-menu-right glyphicon-menu-left');
    // })

    // var sideMenu = $("#sidemenu");
    // sideMenu.find('li').each(function () {
    //     $(this).hover(function () {
    //         $(this).children('ul').stop(true).show();
    //     },function () {
    //         $(this).children('ul').stop(true).hide();
    //     })
    // })
}

//右侧特效
function rightSide() {

    $(".right_top").hide();
    $(window).scroll(function() {

        // if ($(window).scrollTop() > $(window).height()) {
        if ($(window).scrollTop() > 100) {
            $(".right_top").fadeIn(500);
        } else {
            $(".right_top").fadeOut(500);
        }
    });
    $(".right_top").click(function() {
        $('body,html').animate({ scrollTop: 0 }, 100);
        return false;
    });
}


//banner操作
function bannerControll() {
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById("kinMaxShow")) return false;
    if (!document.getElementById("kinMaxShow").getElementsByTagName('ul')) return false;
    if (!document.getElementById("kinMaxShow").getElementsByTagName('li')) return false;

    let nowFlag = 0;
    //初始化banner
    // var kinMS = document.getElementById("kinMaxShow");
    $("#kinMaxShow").kinMaxShow({
        height: 560,
        intervalTime: 6,
        switchTime: 100,
        button: {
            normal: {
                left: '50%',
                borderRadius: '10px',
                background: '#b89057',
                border: 'none'
            },
            focus: {
                background: '#e2e2e1',
                border: 'none'
            }
        },
        callback:function(index,action){
            nowFlag = index;
        }
    });
    // setTimeout(()=>{
    //     console.log("dianji ");
    //     document.getElementById('kinMaxShow').getElementsByTagName('li')[0].click()
    // },10000)

    //对button的位置居中控制
    var kinButton = document.getElementById('kinMaxShow').getElementsByTagName('ul');
    var kinButtonLi = document.getElementById('kinMaxShow').getElementsByTagName('li');
    kinButton[0].style.marginLeft = '-' + kinButtonLi.length * 12 + 'px';
    
    let arrow = $(".banner").find(".arrow");
    let controlBtn = $('#kinMaxShow').find('li');
    arrow.click(function(){
        
        if ($(this).hasClass("arrow-l")) {
            if(nowFlag === 0){
                nowFlag = controlBtn.length - 1;
            }else{
                nowFlag--;
            }
        }
        if ($(this).hasClass("arrow-r")) {
            if(nowFlag === (controlBtn.length - 1)){
                nowFlag = 0;
            }else{
                nowFlag ++ ;
            }
        }
        // console.log(nowFlag);
        document.getElementById('kinMaxShow').getElementsByTagName('li')[nowFlag].click()
    })
}

//公告文字自动滚动代码
function autoScroll(obj) {

    var n = $(obj).find("li").height();
    $(obj).stop(true, true).animate({
        marginTop: -n
    }, 500, function() {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    })
}

function productTab() {
    var productTabLi = $('.product_tab_li ul li');
    var productTabDiv = $('.product_tab_div');
    productTabLi.click(function() {
        var id = $(this).attr('id');
        $(this).parent().find('li').removeClass('selon');
        $(this).addClass('selon');
        productTabDiv.css('display', 'none');
        $('#div' + id).css('display', 'block');
        sidebarHeight();
    })
}


//图片遮罩效果
function picShowInfo() {
    var shade = $('.shade');
    shade.parent('a').mouseenter(function() {
        $(this).find('.shade').stop(true, true).slideDown();
    })
    shade.parent('a').mouseleave(function() {
        $(this).find('.shade').stop(true, true).slideUp();
    })
}


//首页的一些效果
function index() {
    //精品定制最后一个li外边距为0
    var jpdzLi = $('.jpdz ul li');
    jpdzLi.last().css('marginRight', '0');

    // 精品案例以及看图找灵感,竖排列表最后一个边框为0;
    var jpalType = $('.jpal-type');
    jpalType.each(function() {
        $(this).find('ul').last().css('borderRight', 0);
    })

    //按钮动画
    var jpdzLink = $('.jpdz ul li dl dd a');
    jpdzLink.mouseenter(function() {
        $(this).parent().stop().animate({
            width: '130px',
            height: '35px',
            lineHeight: '35px',
            marginLeft: '-65px',
            bottom: '-17px',
            fontSize: '14px'
        }, "fast")
    })
    jpdzLink.mouseout(function() {
        $(this).parent().stop().animate({
            width: '116px',
            height: '26px',
            lineHeight: '26px',
            marginLeft: '-58px',
            bottom: '-13px',
            fontSize: '12px'
        }, "fast")
    })

    //精品案例展示图片第三第六张尺寸重置
    var jpalBig = $('.jpalBig ul li');
    jpalBig.eq(2).css({
        'marginRight': '0',
        'width': '472px'
    });
    jpalBig.eq(5).css({
        'marginRight': '0',
        'width': '472px'
    });
    jpalBig.eq(2).find('img').css('width', '472px');
    jpalBig.eq(5).find('img').css('width', '472px');

    //看图找灵感第四张第八张图重置
    var jpalSmall = $('.jpalSmall ul li');
    jpalSmall.eq(3).css({
        'marginRight': '0'
    });
    jpalSmall.eq(7).css({
        'marginRight': '0'
    });

    //精品案例展示图片动画效果
    // jpalBig.mouseover(function () {
    //  var img = $(this).find('img');
    //  img.stop().animate({
    //      width:$(this).width() + 50,
    //      height:$(this).height()+50,
    //      marginTop:'-25px',
    //      marginLeft:'-25px'
    //  });
    // })
    // jpalBig.mouseout(function () {
    //  var img = $(this).find('img');
    //  img.stop().animate({
    //      width:$(this).width(),
    //      height:$(this).height(),
    //      marginTop:'0',
    //      marginLeft:'0'
    //  });
    // })

    //TAB页面
    var tLi = $('.tab>ul>li');
    $('.tab1>ul>li').eq(0).addClass('cho');
    $('.tab2>ul>li').eq(0).addClass('cho');
    tLi.mouseenter(function() {
        var id = $(this).attr('id');
        $(this).parent().find('li').removeClass('cho');
        $(this).addClass('cho');
        $(this).closest('div.tab').find('.tDiv').css('display', 'none');
        $(this).closest('div.tab').find('.tDiv' + id).css('display', 'block');
    })
    //TAB页面第一个大图尺寸重置
    var fImg = $('div.tDiv>ul>li:first-child');
    fImg.find('img').css({
        'width': '395px',
        'height': '300px'
    });
    fImg.css({
        'width': '395px',
        'height': '300px',
        'margin': '0',
        'marginTop': '10px'
    });

    //预约验证
    $('#yuyue').click(function() {

        var ztype = $("select[name='ztype']");
        var zstyle = $("select[name='zstyle']");
        var zname = $("input[name='name']");
        var zphone = $("input[name='phone']");
        var zcode = $("input[name='code']");

        if (zname.val() == "") {
            $('#node').html('请填写您的称呼');
            zname.focus();
            nodeShow();
            return false;
        };
        if (zphone.val() == "") {
            $('#node').html('请填写您的手机号码');
            zphone.focus();
            nodeShow();
            return false;
        } else if (!zphone.val().match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
            $('#node').html('手机号码格式错误');
            nodeShow();
            return false;
        };
        if (zcode.val() == "") {
            $('#node').html('请填写验证码');
            zcode.focus();
            nodeShow();
            return false;
        };
        var url = messageURL;
        var sendData = {
            'ztype': ztype.val(),
            'zstyle': zstyle.val(),
            'zname': zname.val(),
            'zphone': zphone.val(),
            'zcode': zcode.val()
        };
        $.ajax({
            url: url,
            type: 'post',
            data: sendData,
            dataType: 'json',
            success: function(data) {
                if (data == '0') {
                    $('#node').html('验证码错误');
                    nodeShow();
                    change_code();
                    zcode.focus();
                } else if (data == '1') {
                    $('#node').html('提交成功,请等待禅心与您联系');
                    change_code();
                    nodeShow();
                } else if (data == '2') {
                    $('#node').html('提交失败,请联系禅心客服');
                    change_code();
                    nodeShow();
                }
            }
        });
    })
}

//#node渐显渐隐
function nodeShow() {
    $('#node').stop(true, true).fadeIn(1000);
    $('#node').stop(true, true).delay(2000).fadeOut(1000);
}

//内页推荐项目奇数选择项
function insideOdd() {
    var oddLi = $('#main .contrain .newsList ul li:even');
    var oddCss = {
        paddingRight: '40px',
        borderRight: '1px solid #CCC',
        marginRight: '40px'
    }
    oddLi.css(oddCss);
}

//首页验证码改变
function change_code(obj) {
    $("#codeImg").attr("src", verifyURL + '/' + Math.random());
    return false;
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

// 对于不支持 placeholder属性的浏览器做兼容性
function H5placeholder() {
    if (!placeholderSupport()) { //判断浏览器是否支持 placeholder属性
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    };
}

// 对于是maintop的链接,自动向上滚动150px;
function mainTop() {
    var urlAddr = document.location.href;
    // console.log(urlAddr.indexOf("#mainTop"),$('body,html').scrollTop());
    if (urlAddr.indexOf("#mainTop") != -1 ) {
        console.log($('body,html').scrollTop());
        $('body,html').scrollTop(420);
    }
}

function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}

function loadEvents() {

}

addLoadEvent(H5placeholder);
// addLoadEvent(delLastLiBackground);
addLoadEvent(dropMenu);
addLoadEvent(rightSide);
addLoadEvent(sidebarHeight);
// addLoadEvent(mainTop);
$(window).resize(function() {
    dropMenu();
})
