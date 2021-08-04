require("../css/course.less")

document.ready(function() {
    toast.createFooter("sports")
    let newDom = document.querySelector(".new")
    let showBoxDom = document.querySelector(".show-box")


    let user = JSON.parse(localStorage.getItem("user"))
    let BASE_URL = 'http://139.9.177.51:8099'


    $http.get("/sports/courseList", { id: user.userId }, function(res) {
        // console.log(res);
        let arr = res.data
        let arr1 = arr.find(function(item, index) {
                return item.latest === 1
            })
            // console.log(arr1);
        let NewHtml = `
        <a href="./introduce.html?id=${arr1.courseId}">
        <div class="course-box">
            <img src="${BASE_URL + arr1.imgurl}" class="video-box">
            <div class="fw text text1">${arr1.name}</div>
            <div class="fs12 c9a9 text">${arr1.desc}</div>
        </div>
        </a>
        
        `
            // videoBoxDom.style.backgroundImage = 'url(' + BASE_URL + arr1.imgurl + ')';
            // videoBoxDom.style.bankgroundImage = `url(${url}) `
        newDom.innerHTML = NewHtml
        let html = ""
        arr.forEach(function(item, index) {
            // console.log(item);
            html += `
            <a href="./introduce.html?id=${item.courseId}">
                <div class="list-box">
                    <img src="${BASE_URL + item.imgurl}">
                    <div class="big-box">
                        <div class="fs20 mb10 prompt">${item.name}</div>
                        <div class="fs14 prompt">${item.desc}</div>
                    </div>
                </div>
            </a>
            
            `
        })
        showBoxDom.innerHTML = html



    })
})