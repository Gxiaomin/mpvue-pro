<template>
  <view>
    <div class="set-panel-img"></div>
    <!-- 最近一次光临日期 -->
    <picker mode="date" :value="date" start="2015-01-01" @change="bindDateChange">
      <view class="picker">
        <p class="recently recently-title">
          <i class="icon iconfont icon-lishi"></i>
          <span>最近一次日期：</span>
        </p>
        <span class="recently" :class="{'recently-date': isDateSelect}">{{date}}</span>
      </view>
    </picker>

    <!-- 间隔时间 -->
    <picker mode="selector" :value="day" @change="bindChange" :range="days">
      <view class="picker">
        <p class="recently recently-title">
          <i class="icon iconfont icon-rili"></i>
          <span>间隔时间：</span>
        </p>
        <span class="recently" :class="{'recently-day': isDaySelect}">{{day}}天</span>
      </view>
    </picker>

    <button class="save-btn" size="mini" type="primary" @click="onSaveClick">保存</button>
</view>
</template>

<script>
export default {
  data() {
    return {
      isDateSelect: false,
      isDaySelect: false,
      date: '请选择',
      day: '',
      days: []
    }
  },
  created() {
    for (let i = 0 ; i <= 90; i++) {
      this.days.push(i)
    }
  },
  onLoad() {
    //判断是否存在缓存，若存在优先显示
    let setInfo = getApp().globalData.setInfo;

    if(setInfo && (setInfo !== {} || setInfo !== null)) {
      this.isDaySelect = true;
      this.isDateSelect = true;
      this.date = setInfo.date;
      this.day = setInfo.day;
    }else {
      this.isDaySelect = false;
      this.isDateSelect = false;
    }
  },
  methods: {
    //选择最近一次光临时间
    bindDateChange(e) {
      this.isDateSelect = true;
      this.date = e.mp.detail.value;
    },
    //选择间隔天数
    bindChange(e) {
      this.isDaySelect = true;
      this.day = e.mp.detail.value;
    },
    //保存按钮
    onSaveClick() {
      //本地缓存
      wx.setStorage({
        key:"setInfo",
        data: {
          date: this.date,
          day: this.day
        },
        success: function() {
          //保存成功回到设置页面
          wx.navigateTo({
            url: `/pages/index/main`
          });
        }
      });

      //设置全局变量
      getApp().globalData.setInfo = {
          date: this.date,
          day: this.day
      };
    }
  }
}
</script>

<style scoped>
.set-panel-img {
  width: 70%;
  height: 300rpx;
  margin: 0 auto;
}
.picker {
  display: flex;
  justify-content: space-between;
  border-top: solid 1px gainsboro;
  border-bottom: solid 1px gainsboro;
}
.picker:last-child {
  margin-top: -1px;
}
.recently {
  font-size: 28rpx;
  color: #999;
  padding: 20rpx;
}
.recently-title {
  color: #000;
}
.title-icon {
  display: inline;
  font-size: 28rpx;
}
.recently-date, .recently-day {
  color: palevioletred;
}
.iconfont {
  display: inline;
  color: #999;
  margin-right: 20rpx;
}

.save-btn {
  width:43%;
  margin:80rpx auto 0;
  display:block;
  padding:5rpx;
  background-color: #db7093;
}
</style>
