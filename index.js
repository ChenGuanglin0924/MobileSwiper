let ul = document.querySelector('ul');
    lis = document.querySelectorAll('li'),
    bgImg = document.querySelector('.bg-img');

ul.style.length = lis.length + '00vw';
ul.addEventListener('touchstart', touch);
ul.addEventListener('touchmove', touch);
ul.addEventListener('touchend', touch)

let x1, startX;
function touch(e) {
    e = e || window.event;
    switch (e.type) {
        case 'touchstart':
            // 获取手指触摸到ul元素上时的位置(x1, y1)
            x1 = e.changedTouches[0].clientX;
            // 获取手指触摸到ul元素上时的ul当前偏移量(startX)
            ul.style.transition = '';
            startX = cssTransform(ul, 'translateX');
            break;
        case 'touchmove':
             // 获取手指滑动的位置(x2, y2)
             let x2 = e.changedTouches[0].clientX;
             // 计算ul的新的偏移量
             let nowX = startX + x2 - x1;
             cssTransform(ul, 'translateX', nowX)
            break;
        case 'touchend':
            // 获取手指离开ul元素上时的而位置(x1, y1)
            let offset = cssTransform(ul, 'translateX');
            offset = Math.min(offset, 0);
            offset = Math.max(-lis[0].offsetWidth * (lis.length - 1), offset);
            let num = Math.round(offset / lis[0].offsetWidth);
            ul.style.transition = '0.5s';
            cssTransform(ul, 'translateX', num * lis[0].offsetWidth);
            bgImg.src = './images/' + (Math.abs(num) + 1) + '.jpg';
            break;
        default:
            break;
    }
}

function cssTransform(obj, attr, val) {
    if (!obj.ps) {
        obj.ps = {};
    }
    switch (arguments.length) {
        case 2:
            return obj.ps[attr] || 0;
        case 3:
            obj.ps[attr] = val;
            obj.style.transform = 'translateX(' + val + 'px)';
            break;
        default:
            break;
    }
}
