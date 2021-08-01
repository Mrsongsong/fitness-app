require("../css/mine.less")
document.ready(function() {
    // 获取dom节点
    let userNameDom = document.querySelector(".main .user-name")
    let signatureDom = document.querySelector(".main .signature span")
    let headImgDom = document.querySelector(".main .head-img")
    let numDataDom = document.querySelector(".main .num-data")
    let numData1Dom = document.querySelector(".main .num-data1")
    let inputDom = document.querySelector("#inpBtn")
    let BASE_URL = 'http://139.9.177.51:8099'

    toast.createFooter("mine")
    toast.clickAll()
    let user = JSON.parse(localStorage.getItem("user"))

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
    $http.get("/users/mysportsBadge", { userId: user.userId }, function(res) {
        console.log(res);
        if (res.status == 0) {
            numDataDom.innerHTML = res.data.sports.times
            numData1Dom.innerHTML = res.data.sports.calorie
        }
    })


    inputDom.addEventListener("change", function(e) {
        console.log(inputDom.files);
        console.log(inputDom.files[0]);
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


    headImgDom.addEventListener("click", function(e) {
        inputDom.click();
    })
})