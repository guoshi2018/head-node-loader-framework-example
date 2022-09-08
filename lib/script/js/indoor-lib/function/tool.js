"use strict";
/**
 * 修正使用 .vrow / .vrowr 构造的flex网格
 * (内部已经设置 flex-direction 分别是 column 和 column-reverse),
 * 在使用 offset-mq-(1,2,3,4,5) 形式(其中mq代表屏幕宽度断点)制造item偏移.
 * 说明: 根源在于百分数奇数内定为width, 而不是height, 得到的错误的margin-top, margin-bottom.
 */
function correctAllVerticalFlexOffset() {
    var items = document.querySelectorAll(".vrow > [class*=col][class*=offset-], .vrowr > [class*=col][class*=offset-]");
    items.forEach(function (item) {
        var ele = item;
        var style = getComputedStyle(ele, null);
        var parent = ele.parentElement;
        var pW = parent.clientWidth;
        var pH = parent.clientHeight;
        var errMt = parseFloat(style.marginTop);
        var errMb = parseFloat(style.marginBottom);
        var rightMt = errMt * pH / pW;
        var rightMb = errMb * pH / pW;
        ele.style.marginTop = "".concat(rightMt, "px");
        ele.style.marginBottom = "".concat(rightMb, "px");
    });
}
//# sourceMappingURL=tool.js.map