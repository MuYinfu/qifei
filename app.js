//app.js
import Weaher from './api/weather';
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getLocation() {
    return new Promise((resolve, reject) =>  {
      // 获取用户信息
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            wx.showModal({
              title: '请求授权当前位置',
              content: '需要获取您的地理位置，请确认授权',
              success(res) {
                if (res.cancel) {
                  wx.showToast({
                    title: '拒绝授权将无法获取准备位置天气',
                    icon: 'none',
                    duration: 1000
                  })
                  resolve({
                    longitude: '116.38',
                    latitude: '39.90'
                  })
                } else if (res.confirm) {
                  wx.openSetting({
                    success(dataAu) {
                      if (dataAu.authSetting["scope.userLocation"] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        wx.getLocation({
                          success(res) {
                            wx.setStorage({
                              key: "locationInfo",
                              data: res
                            })
                            resolve(res);
                          },
                          fail(err) {
                            resolve({
                              longitude: '116.38',
                              latitude: '39.90'
                            })
                          }
                        });
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        })
                      }
                    }
                  })
                }
              }
            })
          } else if (res.authSetting['scope.userLocation'] == undefined) {
            wx.getLocation({
              success(res) {
                wx.setStorage({
                  key: "locationInfo",
                  data: res
                })
                resolve(res);
              },
              fail(err) {
                resolve({
                  longitude: '116.38',
                  latitude: '39.90'
                })
              }
            });
          } else {
            wx.getLocation({
              success(res) {
                wx.setStorage({
                  key: "locationInfo",
                  data: res
                })
                resolve(res);
              },
              fail(err) {
                resolve({
                  longitude: '116.38',
                  latitude: '39.90'
                })
              }
            });
          }
        }
      })
    })
  },
  Weaher: Weaher,
  globalData: {
    userInfo: null,
    locationInfo: {

    }
  }
})