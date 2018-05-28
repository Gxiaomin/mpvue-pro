<template>
  <div v-if="!isAuth">
    <span class="auth-text">授权后，才可访问。请点击下方按钮进行授权</span>
    <button class="auth-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">立即授权</button>
  </div>
  <div v-else class="container">
    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="user-history">
      <div v-if="!isSet">
        <span>您还没有设置过，立即前往设置~~~</span>
        <button v-if="!isSet" size="mini" type="primary" @click="setSecretDate" style="background-color: #db7093;">去设置</button>
      </div>
      <div v-else>
        <span>已经设置过了，立即查看</span>
        <button size="mini" type="primary" @click="setSecretDate" style="background-color: #db7093;">查看</button>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      //用户信息
      userInfo: {},
      //是否授权
      isAuth: false,
      //是否设置过（本地缓存）
      isSet: false
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    //前往设置日期
    setSecretDate() {
      const url = '../set/main'
      wx.navigateTo({ url });
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.isAuth = true;
              this.userInfo = res.userInfo
            },
            fail: () => {
              this.isAuth = false;
            }
          })
        }
      })
    },
    //用户授权
    onGotUserInfo (res) {
      //尝试再次登录
      this.getUserInfo();
    }
  },
  onLoad() {
    //获取缓存，并修改全局变量
    let info = wx.getStorageSync('setInfo');
    if(info) {
      this.isSet = true;
      getApp().globalData.setInfo = info;
    }else {
      this.isSet = false;
      getApp().globalData.setInfo = {};
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  }
}
</script>

<style scoped>
.auth-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
  width: 60%;
  height: 80rpx;
  line-height: 80rpx;
  color: #fff;
  border: none;
  background: orange
}
.auth-text {
  position: absolute;
  left: 50%;
  top: 40%;
  -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
          transform: translateX(-50%);
  width: 70%;
  font-size: 26rpx;
  color: #999;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.user-history {
  margin-top: 60rpx;
}
.user-history span {
  display: block;
  margin:0 auto;
  height: 20px;
  line-height: 20px;
  font-size: 26rpx;
  color: #999;
}
.user-history button {
  display: block;
  margin: 30rpx auto;
  background-color: #2d8cf0;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
