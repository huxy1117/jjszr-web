/** 
 * 获取指定的URL参数值 
 * URL:http://www.xxx.com/index?name=123
 * 参数：param URL参数 
 * 调用方法:getParam("name") 
 * 返回值:123
 * alert(getParam('date'))
 */
export function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
    //search,查询？后面的参数，并匹配正则
    var r = location.search.substr(1).match(reg)
    if (r != null) return decodeURI(decodeURI(r[2]))
}

export function isWechat () {
    return /MicroMessenger/i.test(navigator.userAgent)
}
