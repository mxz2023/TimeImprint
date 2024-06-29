import * as util from '../utils/util'

export class UserInfo {
  static instance: UserInfo

  private openId: string = ""

  private constructor() {

  }
  static getInstance(): UserInfo {
    if (!UserInfo.instance) {
      UserInfo.instance = new UserInfo()
    }
    return UserInfo.instance
  }

  public getOpenId():Promise<string> {
    return new Promise((resolve, reject)=>{
      if (this.openId) {
        resolve(this.openId)
      } else {
        var blockThis = this
        wx.cloud.callFunction({
          name: 'getOpenId',
          data: {},
          success: function(res) {
            let obj = res.result as AnyObject
            if (obj.openid) {
              blockThis.openId = obj.openId
              resolve(blockThis.openId)
            }
          },
          fail: function(err) {
            util.error(err)
            reject(err)
          }
        })
      }
    })
  }
}