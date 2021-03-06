require("../css/register.less")

document.ready(function() {
    let code = "";

    let captcha1 = new CaptchaMini();
    captcha1.draw(document.querySelector('#captcha1'), r => {
        code = r;
    });

    // 获取dom节点
    const pwdLogin = document.querySelector("#pwd-login")
    const phoneNumeber = document.querySelector("#phone-numeber")
    const authCode = document.querySelector("#auth-code")
    const pwd = document.querySelector("#pwd")
    const pwd1 = document.querySelector("#pwd1")
    const registerBtn = document.querySelector("#register-btn")
    const information = document.querySelector("#information")

    // 右上角登录移动点击事件
    pwdLogin.addEventListener("click", function(e) {
        location.href = "./login.html"
    })

    // 注册点击事件
    registerBtn.addEventListener("click", function(e) {
        let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        // console.log(pwdReg.test(pwd.value), pwdReg.test(pwd1.value));
        if (phoneNumeber.value && authCode.value && pwd.value && pwd1.value) {
            information.textContent = ""
            information.style.color = ""
            if (!reg.test(phoneNumeber.value)) {
                toast.createToast(1, "手机号错误")
                    // information.style.color = "red"
                    // information.textContent = "请输入正确的手机号码"
                return;
            }
            if (authCode.value.toLowerCase() != code.toLowerCase()) {
                toast.createToast(1, "验证码错误")
                    // information.style.color = "red"
                    // information.textContent = "请输入正确的验证码"
                return;
            }
            // 密码至少包含：数字和英文字母，长度6-20    
            if (!pwdReg.test(pwd.value)) {
                toast.createToast(1, "密码错误")
                    // information.style.color = "red"
                    // information.textContent = "请输入正确的密码"
                return;
            }
            if (!pwdReg.test(pwd1.value)) {
                toast.createToast(1, "密码错误")
                    // information.style.color = "red"
                    // information.textContent = "请输入正确的密码"
                return;
            }
            if (pwd.value != pwd1.value) {
                toast.createToast(1, "密码错误")
                    // information.style.color = "red"
                    // information.textContent = "请输入正确的密码"
                return;
            }
            // ajax数据请求
            let data = {
                account: phoneNumeber.value,
                password: pwd.value
            };
            $http.post("/users/add", data, function(rest) {
                if (rest.status == 0) {
                    $http.post("/users/login", data, function(rest1) {
                        if (rest1.status == 0) {
                            localStorage.setItem("user", JSON.stringify(rest1.data.user))
                            toast.createToast(0, "注册成功")
                            setTimeout(function() {
                                location.href = "./home.html"
                            }, 1000)
                        } else {
                            toast.createToast(1, rest1.msg)
                        }
                    })
                } else {
                    toast.createToast(1, rest.msg)
                }
            })
        }

    })
})