require("../css/sportdata.less")
const echarts = require("echarts")
document.ready(function() {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('bar-charts'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '运动时长'
        },
        tooltip: {},
        legend: {
            data: ['时长']
        },
        xAxis: {
            data: ["11-05", "11-06", "11-07", "11-08", "11-09", "11-10", "11-10"]
        },
        yAxis: {},
        series: [{
            name: '时长',
            type: 'bar',
            data: [30, 58, 38, 140, 85, 85, 50]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    /*饼图*/
    var pieChart = echarts.init(document.getElementById('pie-chart'));

    var pieOption = {
        title: {
            text: '运动时长',
            // subtext: '纯属虚构',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [{
            name: '时长',
            type: 'pie',
            radius: '50%',
            data: [
                // { value: 1048, name: '搜索引擎' },
                // { value: 735, name: '直接访问' },
                { value: 580, name: '跑步' },
                { value: 484, name: '骑行' },
                { value: 300, name: '训练' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    pieChart.setOption(pieOption);
    // 折线图
    var lineChart = echarts.init(document.getElementById('line-chart'));


    var lineOption = {
        title: {
            text: '运动时长'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ["跑步", "骑行", "训练"]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["11-05", "11-06", "11-07", "11-08", "11-09", "11-10", "11-11"]
        },
        yAxis: {
            type: 'value'
        },
        series: [{
                name: '跑步',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '骑行',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '训练',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
        ]
    };
    lineChart.setOption(lineOption);
    // 柱形图
    var barCharts = echarts.init(document.getElementById('bar-chart'));

    var barChartsOption = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [{
            name: '训练时长',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '骑行' },
                { value: 735, name: '训练' },
                { value: 580, name: '跑步' },
                // { value: 484, name: '联盟广告' },
                // { value: 300, name: '视频广告' }
            ]
        }]
    };
    barCharts.setOption(barChartsOption);

})