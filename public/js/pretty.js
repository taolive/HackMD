var markdown = $(".markdown-body");
var text = $('<textarea/>').html(markdown.html()).text();
var result = postProcess(md.render(text));
markdown.html(result.html());
$(document.body).show();
finishView(markdown);
autoLinkify(markdown);
generateToc('toc');
generateToc('toc-affix');
smoothHashScroll();
lastchangetime = $('.ui-lastchange').text();
lastchangeui = $('.ui-lastchange');
updateLastChange();
var url = window.location.pathname;
$('.ui-edit').attr('href', url + '/edit');
var toc = $('.ui-toc');
var tocAffix = $('.ui-affix-toc');
var tocDropdown = $('.ui-toc-dropdown');
//toc
tocDropdown.click(function (e) {
    e.stopPropagation();
});

var enoughForAffixToc = true;

function generateScrollspy() {
    $(document.body).scrollspy({
        target: ''
    });
    $(document.body).scrollspy('refresh');
    if (enoughForAffixToc) {
        toc.hide();
        tocAffix.show();
    } else {
        tocAffix.hide();
        toc.show();
    }
    $(document.body).scroll();
}

function windowResize() {
    //toc right
    var paddingRight = parseFloat(markdown.css('padding-right'));
    var right = ($(window).width() - (markdown.offset().left + markdown.outerWidth() - paddingRight));
    toc.css('right', right + 'px');
    //affix toc left
    var newbool;
    var rightMargin = (markdown.parent().outerWidth() - markdown.outerWidth()) / 2;
    //for ipad or wider device
    if (rightMargin >= 133) {
        newbool = true;
        var affixLeftMargin = (tocAffix.outerWidth() - tocAffix.width()) / 2;
        var left = markdown.offset().left + markdown.outerWidth() - affixLeftMargin;
        tocAffix.css('left', left + 'px');
    } else {
        newbool = false;
    }
    if (newbool != enoughForAffixToc) {
        enoughForAffixToc = newbool;
        generateScrollspy();
    }
}
$(window).resize(function () {
    windowResize();
});
$(document).ready(function () {
    windowResize();
    generateScrollspy();
});

function scrollToTop() {
    $(document.body).animate({
        scrollTop: 0
    }, 100, "linear");
}

function scrollToBottom() {
    $(document.body).animate({
        scrollTop: $(document.body)[0].scrollHeight
    }, 100, "linear");
}