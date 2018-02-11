const bg_util = (function () {
    let getContextPath = function () {
        let pathName = document.location.pathname;
        let index = pathName.substr(1).indexOf("/");
        return pathName.substr(0, index + 1);
    };

    let addressJump = function (index) {
        let path = getContextPath();
        console.log(path);
        switch (index) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                window.location = path + "/webapp/html/games/wuziqi/wuziqi.html";
                break;
            case 4:
                break;
            case 5:
                break;
            case 99:
                window.location = path + "/webapp/html/index.html";
                break;
            default:
                break;
        }
    };
    return {addressJump: addressJump, getContextPath: getContextPath}
})();