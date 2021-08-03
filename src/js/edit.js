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
    let btnDom = document.querySelector(".btn")
    let genderValDom = document.querySelector("#genderVal")
    let jsinputDom = document.querySelector("#js_input")
    let iconBackDom = document.querySelector("#icon-back")
    let textBoxBtn = document.querySelector(".text-box")
    let proDom = document.querySelector(".prodom")
    let cityDom = document.querySelector(".citydom")
    let BASE_URL = 'http://139.9.177.51:8099'
    let user = JSON.parse(localStorage.getItem("user"))

    let Alldata = {
        address: [],
        nickname: "",
        gender: "",
        birthday: "",
        sign: "",
        userId: user.userId,
    }
    let pid = ""
    let arrData
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
                //截取字符串前10位
                let str = res.data.birthday.substring(0, 10);
                birthdayValDom.innerHTML = str
            }
            if (res.data.address) {
                let str = res.data.address
                let arr1 = str.split(",")
                document.querySelector("#prodom1").innerHTML = arr1[0]
            }
            if (res.data.address) {
                let str1 = res.data.address
                let arr2 = str1.split(",")
                document.querySelector("#citydom1").innerHTML = arr2[1]
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
                    let str = `${res[0].value}-${res[1].value < 10 ? '0' + res[1].value : res[1].value}-${res[2].value < 10 ? '0' + res[2].value : res[2].value}`;
                    // let month = res[1].value < 10 ? "0" + res[1].value : res[1].value;
                    // let day = res[2].value < 10 ? "0" + res[2].value : res[2].value;
                    // let str = `${res[0].value}-${month}-${day}`
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
                $http.post("/users/userEdit", { imgurl: url, userId: user.userId }, function(res) {})
            })
        })
        // 点击头像时间触发input事件
    headerimgDom.addEventListener("click", function(e) {
        inputDom.click();
    })

    // 点击挑战到个人中心页面
    iconBackDom.addEventListener("click", function(e) {
        location.href = "./mine.html"
    })
    proDom.addEventListener("click", function(e) {
        $http.get("/address/province", function(res) {
            let arr = res.data
            let arr1 = arr.map(function(item, index) {
                // let obj = {}
                // console.log(item);
                // obj.label = item.name
                // obj.value = item.addressId
                // return obj
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            weui.picker(arr1, {
                onConfirm: function(result) {
                    let prodom1 = document.querySelector("#prodom1")
                    prodom1.textContent = result[0].label;
                    pid = result[0].value
                    $http.get("/address/city/" + pid, function(res) {
                        let arr = res.data
                        let arr1 = arr.map(function(item, index) {
                            return {
                                label: item.name,
                                value: item.addressId
                            }
                        })
                        document.querySelector("#citydom1").textContent = res.data[0].name
                        arrData = res.data
                    })
                },
                title: '选择省份'
            });
        })
    })
    cityDom.addEventListener("click", function() {
            if (!pid) {
                toast.createToast("1", "请输入省份")
                return;
            }
            let arr1 = arrData.map(function(item, index) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            weui.picker(arr1, {
                onConfirm: function(result) {
                    // console.log(result);
                    document.querySelector("#citydom1").textContent = result[0].label;
                    pid = result[0].value
                },
                title: '选择城市'
            });
            // $http.get("/address/city/" + pid, function(res) {
            //     let arr = res.data
            //     let arr1 = arr.map(function(item, index) {
            //         return {
            //             label: item.name,
            //             value: item.addressId
            //         }
            //     })
            //     weui.picker(arr1, {
            //         onConfirm: function(result) {
            //             console.log(result);
            //             document.querySelector("#citydom1").textContent = result[0].label;
            //             pid = result[0].value
            //         },
            //         title: '选择城市'
            //     });

            // })
        })
        // 保存信息提交数据给后端
    btnDom.addEventListener("click", function(e) {
        Alldata.nickname = jsinputDom.value
        Alldata.gender = genderValDom.textContent
        Alldata.birthday = birthdayValDom.textContent
        Alldata.sign = textBoxBtn.value
        Alldata.address[0] = document.querySelector("#prodom1").textContent
        Alldata.address[1] = document.querySelector("#citydom1").textContent
            // console.log(Alldata);

        $http.post("/users/userEdit", Alldata, function(res) {
            if (res.status == 0) {
                toast.createToast(0, "保存成功")
                setTimeout(function() {
                    location.href = "./mine.html"
                }, 1000)
            }
        })

    })
})