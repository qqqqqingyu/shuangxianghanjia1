<template>
    <Header msg="接口测试示例" mainPage="接口" settings=""/>
</template>

<script>

import Header from '@/components/Header.vue'
import {
    startActivity,
    getCdaActivitySquare,
    startTransaction,
    getCdaActivityTransactionInfo,
    participateActivity,
    getCdaReportInfo,
    getCdaMyActivity,
    getLiquidationInfo,
    liquidationActivity
} from '@/api/auction'

export default {
    name: 'AppTest',
    components: {
        Header
    },
    mounted() {
        // post请求的方法先注释掉 避免加载页面是自动提交错误数据 另外 这些功能已测试过
        //this.startActivityMethod()
        this.getCdaActivitySquareMethod()
        //this.startTransactionMethod()
        this.getCdaActivityTransactionInfoMethod()
        //this.participateActivityMethod()
        this.getCdaReportInfoMethod()
        this.getCdaMyActivityMethod()
        this.getLiquidationInfoMethod()
        //this.liquidationActivityMethod()
    },
    methods : {
        // active为活动信息 须组装后提交 注意字段非空判断（参考接口文档）以下代码仅做参考
        startActivityMethod() {
            let active = {};
            active.id = 39
            active.title = '默认免费发起最后测试'
            startActivity(active).then(response => {
                console.log('4.1 发起活动')
                console.log(response.data)
            })
        },
        getCdaActivitySquareMethod() {
            getCdaActivitySquare().then(response => {
                console.log('4.2 cda活动广场')
                console.log(response.data)
            })
        },
        startTransactionMethod() {
            // transaction为交易信息 须组装后提交 注意字段非空判断（参考接口文档）以下代码仅做参考
            let transaction = {}
            transaction.action_type = 'sell'
            transaction.auction_type = 0
            startTransaction(39, transaction).then(response => {
                console.log('4.3 去交易')
                console.log(response.data)
            })
        },
        getCdaActivityTransactionInfoMethod() {
            // 须传入实际活动id 39为测试id
            getCdaActivityTransactionInfo(39).then(response => {
                console.log('4.3 获取活动交易信息')
                console.log(response.data)
            })
        },
        participateActivityMethod() {
            // 须传入实际活动id 39为测试id
            participateActivity(39).then(response => {
                console.log('4.4 参与活动')
                console.log(response.data)
            })
        },
        getCdaReportInfoMethod() {
            // 须传入实际活动id 39为测试id
            getCdaReportInfo(39).then(response => {
                console.log('4.5 查看报告')
                console.log(response.data)
            })
        },
        getCdaMyActivityMethod() {
            getCdaMyActivity().then(response => {
                console.log('4.6 查看我发起的活动')
                console.log(response.data)
            })
        },
        getLiquidationInfoMethod() {
            // 须传入实际活动id 39为测试id 39为测试id
            getLiquidationInfo(39).then(response => {
                console.log('4.7 查看活动清算信息')
                console.log(response.data)
            })
        },
        liquidationActivityMethod() {
            let liquidation = {};
            liquidation.final_price = 10
            liquidationActivity(39, liquidation).then(response => {
                console.log('4.7 活动清算')
                console.log(response.data)
            })
        }
    }
}

</script>