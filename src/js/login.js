require("../css/login.less")

document.ready(function() {
    // 获取dom节点
    let RegisterAccount = document.querySelector("#Register-account")
    let account = document.querySelector("#please-account")
    let pwd = document.querySelector("#please-pwd")
    let loginBtn = document.querySelector("#login-btn")
    let textBox = document.querySelector(".text-prompt")
    if (localStorage.getItem("user")) {
        location.href = "./home.html"
    }
    // 注册账号事件监听注册
    RegisterAccount.addEventListener("click", function(e) {
            location.href = "./register.html"
        })
        // 登录点击事件
    loginBtn.addEventListener("click", function(e) {
        textBox.style.color = ""
        textBox.textContent = ""
        let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (account.value && pwd.value) {
            // 提醒用户手机号输入错误
            if (!reg.test(account.value)) {
                toast.createToast(1, "账号错误")
                    // account.value = ""
                    // account.setAttribute("placeholder", "请输入正确的的账号");
                    // account.setAttribute("class", "phone phone1");
                return;
            }
            // 密码至少包含：数字和英文字母，长度6-20
            if (!pwdReg.test(pwd.value)) {
                toast.createToast(1, "密码错误")
                    // pwd.value = ""
                    // pwd.setAttribute("placeholder", "请输入正确的的密码");
                    // pwd.setAttribute("class", "phone phone1");
                return;
            }
            // 请求ajax数据
            let data = {
                account: account.value,
                password: pwd.value
            }
            window.$http.post("/users/login", data, function(res) {
                if (res.status == 0) {
                    localStorage.setItem("user", JSON.stringify(res.data.user))
                    toast.createToast(0, "登录成功")
                    setTimeout(function() {
                        location.href = "./home.html"
                    }, 1000)
                } else {
                    toast.createToast(1, res.msg)
                        // pwd.value = ""
                        // pwd.setAttribute("placeholder", "密码不正确");
                        // pwd.setAttribute("class", "phone phone1");
                }
            })

        }
    })
})