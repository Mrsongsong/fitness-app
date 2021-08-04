require("../css/player.less")
document.ready(function() {
    let videoDom = document.querySelector(".video-box video")
    let numDom = document.querySelector(".num")
    let lenDom = document.querySelector(".len")
    let titleDom = document.querySelector(".title")
    let backDom = document.querySelector(".back-icon")
    let goDom = document.querySelector(".go-icon")
    let stopDom = document.querySelector(".stop-icon")
    let proDom = document.querySelector(".pro")



    let BASE_URL = 'http://139.9.177.51:8099'

    let arr = JSON.parse(localStorage.getItem("videoList"))
    console.log(arr);
    // 定义一个全局变量的索引
    let videoIndex = 3;


    function play(index) {
        videoDom.src = BASE_URL + arr[index].videoUrl
        titleDom.textContent = arr[index].title
        numDom.textContent = index + 1
        lenDom.textContent = arr.length
    }
    play(videoIndex);
    // 视频播放结束继续播放
    videoDom.addEventListener("ended", function(e) {
            if (videoIndex + 1 < arr.length) {
                videoIndex++;
                play(videoIndex);
            }
        })
        // 点击去一节
    goDom.addEventListener("click", function() {
            if (videoIndex + 1 < arr.length) {
                videoIndex++;
                console.log(videoIndex);
                play(videoIndex);
            }
        })
        // 点击返回上一节
    backDom.addEventListener("click", function() {
            if (videoIndex - 1 >= 0) {
                videoIndex--;
                console.log(videoIndex);
                play(videoIndex);
            }
        })
        // 点击暂停
    stopDom.addEventListener("click", function() {
        videoDom.pause()
    })


    setInterval(function() {
        let len = parseInt((videoDom.currentTime / videoDom.duration) * 100)
        proDom.style.width = len + "%"
    }, 60)


})