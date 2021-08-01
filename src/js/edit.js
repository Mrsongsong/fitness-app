require("../css/edit.less")
    //点击事件监听---生成picker
let genderDom = document.querySelector("#gender")
let birthdayDom = document.querySelector("#birthday")
let showDatePickerDom = document.querySelector("#showDatePicker")

document.ready(function() {
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
                console.log('确认值');
                console.log(result[0].value);
                document.querySelector('#genderVal').textContent = result[0].value;
            },
            title: '性别'
        });
    })

    birthdayDom.addEventListener('click', function() {
        weui.datePicker({
            start: 1850,
            end: new Date().getFullYear(),
            onConfirm: function(res) {
                console.log(res);
                // let str = res[0].label + res[1].label + res[2].label;
                let str = `${res[0].value}-${res[1].value}-${res[2].value}`
                console.log(str);
                birthdayValDom.textContent = str;
            },
            title: '出生日期'
        })
    })
})