<template>
    <view class="index">
        <!-- 分类组件 -->
        <myHeader @change="getNavId"></myHeader>
		
        <!-- 新闻展示组件 -->
        <view class="myNewsList"> </view>
        <myNewsList @change="getNewsList" :news="news" ref="newsListRef">
        </myNewsList>
        <!-- 添加新闻按钮组件 -->
        <addNews></addNews>
    </view>
</template>

<script>
import { unify } from "@/service/api/unify.js";
import myHeader from "../../components/index/myHeader.vue"
export default {
    data() {
        return {
            nid: -1, // 分类名
            news: [], // 新闻数据
            maxIndex: null, // 最大新闻页码
            pageSize: 8, // 页数
            pageIndex: 0, // 页码
            timer: false,
        };
    },
	components:{myHeader},
    onReachBottom() {
        // 触底时页码没超过最大值
        if (this.pageIndex < this.maxIndex) {
            // 进行节流操作
            if (!this.timer) {
                this.timer = setTimeout(() => {
                    this.pageIndex++;
                    this.getNewsList();
                    this.timer = false;
                }, 1000);
            }
        }
    },
    methods: {
        // 根据分类ID获取新闻总长度
        async getNavId(nid = -1) {
            // 初始化
            this.pageIndex = 0;
            this.nid = nid;
            this.news = [];
            this.$refs.newsListRef.loading = 0;
            let data = {
                conut: true,
                name: "news",
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
            };
            if (this.nid == -1) {
                data.all = true;
                data.top = true;
            } else {
                data.data = {
                    strict: {
                        nid: this.nid,
                    },
                };
            }
            let countres = await unify(data);
            this.maxIndex = Math.floor(countres.data[0].rows / 8 + 1);
            this.getNewsList();
        },
        // 获取新闻数据
        async getNewsList() {
            let data = {
                name: "news",
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
            };
            if (this.nid == -1) {
                data.all = true;
                data.top = true;
            } else {
                data.data = {
                    strict: {
                        nid: this.nid,
                    },
                };
            }
            let res = await unify(data);
            if (res.code == 400) this.$refs.newsListRef.loading = 2;
            else this.news = [...this.news, ...res.data];
        },
    },
};
</script>

<style lang="less" scoped>
.myNewsList {
    // margin-top: 88rpx;
    padding-top: 88rpx;
}

.loading {
    margin-top: 88rpx;
    text-align: center;
    font-size: 30px;
}
</style>
