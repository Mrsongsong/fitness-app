require("../css/home.less")

document.ready(function() {
    // 获取domjied
    let rank = document.querySelector(".num-box")
    let daynumDOM = document.querySelector("#day-num")
    let numbgeDom = document.querySelector("#num-bge")
    let num1boxBtn = document.querySelector(".num1-box")
    toast.createFooter("home")
    toast.clickAll()

    var mySwiper = new Swiper('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        autoplay: true, //等同于以下设置
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
    })

    // 获取user
    let user = JSON.parse(localStorage.getItem("user"))
    console.log(user);
    let getItem = function() {
        $http.get("/headPageInfo", { userId: user.userId }, function(res) {

            if (res.status == 0) {
                rank.innerHTML = res.data.rank
                daynumDOM.innerHTML = res.data.punchIn
                numbgeDom.innerHTML = res.data.insigniaNum
            }
            // 
            if (res.data.isPunch == "true") {
                num1boxBtn.className = "hide"
            } else {
                num1boxBtn.className = "num1-box"
            }
        })
    }
    getItem();

    num1boxBtn.addEventListener("click", function(e) {
        $http.get("/clockIn", { userId: user.userId }, function(res) {
            if (res.status == 0) {
                getItem();
            }
        })
    })

})