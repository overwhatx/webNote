var navBar = document.querySelector('.nav-bar');
var menu = document.querySelectorAll('.nav-bar li');
var scrollContainer = document.querySelector('body');
var needFixed = true;
// 这是body的paddingTop，因为导航栏的offsetParent不是body，因为要减去body的paddingTop才能用来跟导航栏的offsetTop做比较
var extraFixed = -24;
// 55 - 24：导航栏高度 - body的paddingTop
// 在不吸顶的情况下，导航指定的内容只要滚动到body顶部就算到了该内容了的导航了，即滚动了【内容的offsetTop + body的paddingTop】的距离
// 但是吸顶之后，只要滚动到吸顶导航栏底部就算到了指定导航内容了，所以相当于只要滚动【内容的offsetTop + body的paddingTop - 吸顶导航栏的高度】的距离就会到达临界值
// 转换成公式来理解，c代表导航内容的offsetTop，s代表滚动的距离，body的paddingTop为24，吸顶导航栏高度为55。只要滚动距离大于等于上面说的临界值，即肯定到达了对应导航。
// 因此公式为： s >= c + 24 - 55， 即 s + 31 >= c 时，到达条件成立，因此滚动容器的scrollTop都要加上31，才是拿来判断的值
var extraScroll = 31;
var offsetTops = {};
var isSupportSticky = validateSticky();
calcTop(true);
scrollContainer.addEventListener('scroll', handleScroll);
window.addEventListener('resize', hanldeResize);

/**
 * 计算页面的各个offsetTop
 */
function calcTop(recalNav) {
    recalNav && (offsetTops.navBar = navBar.offsetTop);
    var contents = ['content1', 'content2', 'content3'];
    for (var j = 0; j < contents.length; j++) {
        offsetTops[contents[j]] = document.querySelector('.' + contents[j]).offsetTop;
    }
}

/**
 * 选择标题跳到对应内容
 */
function selectNav(e) {
    var ev = e || event;
    var target = ev.target || ev.srcElement; // 兼容IE
    this.resetNavSelect();
    target.className = 'active';
    scrollContainer.scrollTop = offsetTops[target.getAttribute('data-content')] - extraScroll;
}

/**
 * 重置导航栏激活样式
 */
function resetNavSelect() {
    for (var i = 0; i < menu.length; i++) {
        menu[i].className = '';
    }
}

/**
 * 检查浏览器是否有支持的sticky值，没有返回false，有就添加sticky相关css，实现吸顶
 */
function validateSticky() {
    var supportStickyValue = valiateCssValue('position', 'sticky');
    if (supportStickyValue) {
        var navBarWrap = document.querySelector('.nav-bar-wrap');
        navBarWrap.style.position = supportStickyValue;
        navBarWrap.style.top = '-24px';
        return true;
    }
    return false;
}

/**
 * 监听滚动事件，实现吸顶和滚动导航
 */
function handleScroll() {
    var top = scrollContainer.scrollTop;
    var fixedBaseTop = top + extraScroll; // 这是吸顶之后用来做衡量的scrollTop
    var menuLength = menu.length;
    if (needFixed && !isSupportSticky) {
        // 这是控制导航栏吸顶 - 吸顶
        if ((top + extraFixed) >= offsetTops.navBar) {
            navBar.style.position = 'fixed';
            navBar.style.top = 0;
            navBar.style.left = '124px';
            navBar.style.width = '300px';
            navBar.style.height = '55px';
        }
        // 这是控制导航栏吸顶 - 取消吸顶
        if ((top + extraFixed) < offsetTops.navBar) {
            navBar.style.position = 'static';
            navBar.style.width = '100%';
            navBar.style.height = '100%';
        }
    }
    resetNavSelect();
    // 滚动条到达底部就选中最后一个导航
    if (top + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
        menu[menuLength - 1].className = 'active';
        return;
    }
    // 以下都为依据滚动自动选择对应导航
    for (var i = 0; i < menuLength - 1; i++) {
        if (fixedBaseTop >= offsetTops['content' + (i + 1)] && fixedBaseTop < offsetTops['content' + (i + 2)]) {
            menu[i].className = 'active';
            return;
        }
    }
    if (fixedBaseTop >= offsetTops['content' + (menuLength - 1)]) {
        menu[menuLength - 1].className = 'active';
        return;
    }
    menu[0].className = 'active';
}

/**
 * 监听resize事件，变化时重新计算offsetTop
 */
function hanldeResize() {
    calcTop(true);
}

/**
 * 检查浏览器是否支持某个css属性值
 */
function valiateCssValue(key, value) {
    var prefix = ['-o-', '-ms-', '-moz-', '-webkit-', ''];
    var prefixValue = [];
    for (var i = 0; i < prefix.length; i++) {
        prefixValue.push(prefix[i] + value)
    }
    var element = document.createElement('div');
    var eleStyle = element.style;
    for (var j = 0; j < prefixValue.length; j++) {
        eleStyle[key] = prefixValue[j];
    }
    return eleStyle[key];
}