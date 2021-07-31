/**
 * 工具函数
 */
// 封装轻提示
let toast = {
    createToast: function(status, msg) {
        let bodyDom = document.body
        let div = document.createElement("div")
        div.className = "toast"
        let html = `
            <i class="iconfont ${status==0?"icon-gou2":"icon-cha"}"></i>
            <p>${msg}</p>
        `
        div.innerHTML = html
        bodyDom.appendChild(div)


        setTimeout(function() {
            div.remove()
        }, 1000)
    }
}
window.toast = toast