require("../css/edit.less")
document.ready(function() {
        //点击事件监听---生成picker
    let genderDom = document.querySelector("#gender")
    let birthdayDom = document.querySelector("#birthday")
    let birthdayValDom = document.querySelector("#birthdayVal")
    let showDatePickerDom = document.querySelector("#showDatePicker")
    let inputDom = document.querySelector("#inpBtn")
    let photoDom = document.querySelector(".photo")
    let headerimgDom = document.querySelector(".header-img")
    let btnDom =document.querySelector(".btn")
    let genderValDom =document.querySelector("#genderVal")
    let jsinputDom =document.querySelector("#js_input")
    let iconBackDom =document.querySelector("#icon-back")
    let textBoxBtn =document.querySelector(".text-box")


    let BASE_URL = 'http://139.9.177.51:8099'
    let user = JSON.parse(localStorage.getItem("user"))


    // 进入页面直接获取账户信息
    $http.get("/users/accountinfo", { userId: user.userId }, function(res) {
        if (res.status == 0) {
            jsinputDom.value = res.data.nickname
        }
        if (res.data.sign) {
            textBoxBtn.innerHTML = res.data.sign
        }
        if (res.data.imgurl) {
            photoDom.style.backgroundImage = `url(${res.data.imgurl}) `
        }
        if (res.data.gender) {
            genderValDom.innerHTML = res.data.gender
        }
        if (res.data.birthday) {
            //截取字符串前5位
            let str = res.data.birthday.substring(0,10);
            birthdayValDom.innerHTML = str
        }
    })
    //点击事件监听---生成picker
    genderDom.addEventListener('click', function() {
        //生成 picker 
        weui.picker([{
            label: '男',
            value: '男'
        }, {
            label: '女',
            value: '女'
        }], {
            onConfirm: function(result) {
                genderValDom.textContent = result[0].value;
            },
            title: '性别'
        });
    })
    birthdayDom.addEventListener('click', function() {
        weui.datePicker({
            start: 1850,
            end: new Date().getFullYear(),
            onConfirm: function(res) {
                // let str = res[0].label + res[1].label + res[2].label;
                let month = res[1].value<10?"0"+res[1].value:res[1].value;
                let day = res[2].value<10?"0"+res[2].value:res[2].value;
                let str = `${res[0].value}-${month}-${day}`
                birthdayValDom.textContent = str;
            },
            title: '出生日期'
        })
    })
    // input事件获取头像
    inputDom.addEventListener("change", function(e) {
        $updateFile("/users/upload", "imgurl", inputDom.files[0], function(res) {
            let url = BASE_URL + res.data
            photoDom.style.backgroundImage = `url(${url}) `
            $http.post("/users/userEdit", { imgurl: url, userId: user.userId}, function(res) {
            })
        })
    })
    // 点击头像时间触发input事件
    headerimgDom.addEventListener("click", function(e) {
        inputDom.click();
    })
    // 保存信息提交数据给后端
    btnDom.addEventListener("click",function(e){
        $http.post("/users/userEdit", {nickname: jsinputDom.value,userId: user.userId}, function(res) {
        })
        $http.post("/users/userEdit", {gender: genderValDom.textContent,userId: user.userId}, function(res) {
        })
        $http.post("/users/userEdit", {birthday: birthdayValDom.textContent,userId: user.userId}, function(res) {
        })
        $http.post("/users/userEdit", {sign: textBoxBtn.value,userId: user.userId}, function(res) {
        })
        toast.createToast(0, "保存成功")
    })
    // 点击挑战到个人中心页面
    iconBackDom.addEventListener("click",function(e){
        location.href="./mine.html"
    })
    // 生日存在登录一次少一天的情况

})