require("../css/introduce.less")
document.ready(function() {
    let boxDom = document.querySelector(".video-box")
    let videoDom = document.querySelector(".video-box img")
    let titleDom = document.querySelector(".title")
    let BASE_URL = 'http://139.9.177.51:8099'

    let str = location.search
    let obj = toast.strToObj(str)


    $http.get("/sports/courseDetail", { id: obj.id }, function(res) {
        console.log(res);
        localStorage.setItem("videoList", JSON.stringify(res.data.fragments))
        videoDom.src = BASE_URL + res.data.imgurl
        titleDom.innerHTML = res.data.name
    })
    boxDom.addEventListener("click", function() {
        location.href = "./player.html"
    })

})