require("../css/sports.less")
document.ready(function() {
    toast.createFooter("sports")
    toast.clickAll()

    let trainDom = document.querySelector(".train")
    trainDom.addEventListener("click", function() {
        location.href = "./course.html"
    })

})