require("../css/advertisement.less")

document.ready(function() {
    let timer = document.querySelector(".seconds span")
    let btn = document.querySelector(".btn")
        // 设置倒计时间
    let t = 5
        // 将初始时间显示在div中
    timer.innerHTML = t
        // 调用间歇计时函数
    let time = setInterval(function() {
        // 判断时间
        if (t == 0) {
            // 为0关闭间歇计时函数
            location.href = "./login.html"
            clearInterval(time)
        } else {
            // 不为0继续--显示
            t--
            timer.innerHTML = t
        }
    }, 1000)

    // setInterval(function() {
    //     let num = Number(timer.textContent) - 1
    //     if (num == 0) {
    //         location.href = "./login.html"
    //         clearInterval();
    //     } else {
    //         num = timer.textContent
    //             // timer.textContent = num
    //     }
    // }, 1000)
    btn.addEventListener("click", function() {
        location.href = "./login.html"
    })
})