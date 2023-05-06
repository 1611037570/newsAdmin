<template>
    <view>
        <view class="select">
            <select class="selected" v-model="selected">
                <option v-for="item in options" :value="item.value">
                    {{ item.label }}
                </option>
            </select>
            <input
                class="input"
                type="text"
                v-model="search"
                placeholder="请输入要搜索的内容"
            />
        </view>
        <view @click="gosearch" class="search">搜索</view>
    </view>
</template>

<script>
export default {
    name: "mySearch",
    data() {
        return {
            search: "",
            selected: "ntitle",
            options: [
                { label: "标题", value: "ntitle" },
                { label: "作者", value: "name" },
                { label: "内容", value: "text" },
            ],
        };
    },
    methods: {
        gosearch() {
            uni.navigateTo({
                url: `/pages/news/newsList?title=search&flag=${this.selected}&text=${this.search}`,
            });
        },
    },
};
</script>

<style lang="less">
.input {
    height: 100rpx;
    width: 100%;
}
.search {
    text-align: center;
    border: 1px solid #000;
    width: 50%;
    margin: 0 auto;
    line-height: 40px;
    height: 40px;
    border-radius: 25px;
}
.select {
    display: flex;
    height: 100rpx;
    line-height: 100rpx;
}

.selected {
    border: 0px;
    width: 100px;
    height: 100rpx;
    text-align: center;
}
</style>
