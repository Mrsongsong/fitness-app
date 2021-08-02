require("../css/mine.less")
document.ready(function() {
    // 获取dom节点
    let userNameDom = document.querySelector(".main .user-name")
    let signatureDom = document.querySelector(".main .signature span")
    let headImgDom = document.querySelector(".main .head-img")
    let numDataDom = document.querySelector(".main .num-data")
    let numData1Dom = document.querySelector(".main .num-data1")
    let inputDom = document.querySelector("#inpBtn")
    let headerDom =document.querySelector(".header")
    let exitbtnDom =document.querySelector(".exit-btn")
    let BASE_URL = 'http://139.9.177.51:8099'

    toast.createFooter("mine")
    toast.clickAll()
    let user = JSON.parse(localStorage.getItem("user"))
    // 进入页面直接获取账户信息
    $http.get("/users/accountinfo", { userId: user.userId }, function(res) {
        console.log(res);
        if (res.status == 0) {
            userNameDom.innerHTML = res.data.nickname
        }
        if (res.data.sign) {
            signatureDom.innerHTML = res.data.sign
        }
        if (res.data.imgurl) {
            headImgDom.style.backgroundImage = `url(${res.data.imgurl}) `
        }
    })
    // 获取后台数据分钟和千卡
    $http.get("/users/mysportsBadge", { userId: user.userId }, function(res) {
        console.log(res);
        if (res.status == 0) {
            numDataDom.innerHTML = res.data.sports.times
            numData1Dom.innerHTML = res.data.sports.calorie
        }
    })
    // input事件获取头像
    inputDom.addEventListener("change", function(e) {
        $updateFile("/users/upload", "imgurl", inputDom.files[0], function(res) {
            // headImgDom.style.backgroundImage = url(BASE_URL + res.data)
            let url = BASE_URL + res.data
                // headImgDom.style.backgroundImage = 'url(' + BASE_URL + res.data + ')';
            headImgDom.style.backgroundImage = `url(${url}) `


            $http.post("/users/userEdit", { imgurl: url, userId: user.userId }, function(res) {
                console.log("我拿到图片了");
            })
        })


    })

    // 点击头像时间触发input事件
    headImgDom.addEventListener("click", function(e) {
        inputDom.click();
        e.stopPropagation();
    })
    // 点击头部进入修改页面
    headerDom.addEventListener("click",function(e){
        location.href="./edit.html"
        e.stopPropagation();
    })

    //点击退出按钮清空本地存储返回注册页
    exitbtnDom.addEventListener("click",function(){
        localStorage.clear()
        location.href="./login.html"
    })
})