module.exports = [
  {
    url: '/v1/api/getAllUserInfo',
    type: 'get',
    response: _ => {
      return {
        status: 200,
        data: [
          {
            'id': 1, // 记录序号
            'name': '路人甲',
            'dept': '厦门事业群',
            'jobId': '32475698',
            'team': '敏捷研发团队',
            'purpose': '开发小程序',
            'p_num': '15542654587',
            'role': 0,
            'auditStatus': 0, // 审核状态，1=审核中，2=审核通过，3=审核失败
            'auditReason': '审批通过或拒绝的理由'
          }, {
            'id': 2, // 记录序号
            'name': '鹿人易',
            'dept': '北京事业群',
            'jobId': '54125456',
            'team': '交付实施团队',
            'purpose': '开发小程序',
            'p_num': '13545865489',
            'role': 2,
            'auditStatus': 1, // 审核状态，1=审核中，2=审核通过，3=审核失败
            'auditReason': '审批通过或拒绝的理由'
          }, {
            'id': 3, // 记录序号
            'name': '王弘宇',
            'dept': '基础技术中心',
            'jobId': '20001325',
            'team': '交付实施团队',
            'purpose': '开发小程序',
            'p_num': '14757451247',
            'role': 1,
            'auditStatus': 2, // 审核状态，1=审核中，2=审核通过，3=审核失败
            'auditReason': '审批通过或拒绝的理由'
          }, {
            'id': 4, // 记录序号
            'name': '肖炳义',
            'dept': '深圳事业群',
            'jobId': '10024531',
            'team': '敏捷研发团队',
            'purpose': '开发小程序',
            'p_num': '19758744167',
            'role': 0,
            'auditStatus': 3, // 审核状态，1=审核中，2=审核通过，3=审核失败
            'auditReason': '审批通过或拒绝的理由'
          }
        ]
      }
    }
  },
  {
    url: '/applist/getCenterAppList',
    type: 'get',
    response: _ => {
      return {
        status: 200,
        data: [
          {
            'downloadurl': '../../ocr/ocrMainPage/ocrMainPage',
            'technology': 'applets',
            'picturetype': 1,
            'shortname': 'ocr',
            'picture': '/assets/index/ocr_banner.png',
            'appid': 'aaaa-bbbb',
            'displayname': 'OCR识别',
            'developer': 'center',
            'id': 1,
            'detail': 'OCR识别',
            'techcode': 'https://github.com/oracle/graal',
            'createTimestamp': 1669860904
          },
          {
            'downloadurl': '../../tts/ttsMainPage',
            'technology': 'applets',
            'picturetype': 2,
            'shortname': 'tts',
            'picture': '/assets/index/tts_banner.png',
            'appid': 'cccc-dddd',
            'displayname': '语音合成',
            'developer': 'center',
            'id': 2,
            'detail': '语音合成',
            'techcode': 'https://github.com/oracle/graal',
            'createTimestamp': 1679860904
          },
          {
            'downloadurl': '../../asr/asrMainPage',
            'technology': 'applets',
            'picturetype': 3,
            'shortname': 'asr',
            'picture': '/assets/index/asr_banner.png',
            'appid': 'eeee-ffff',
            'displayname': '语音识别',
            'developer': 'center',
            'id': 3,
            'detail': '语音识别',
            'techcode': 'https://github.com/oracle/graal',
            'createTimestamp': 1689860904
          }
        ]
      }
    }
  }, {
    url: '/applist/getPersonalAppList',
    type: 'get',
    response: _ => {
      return {
        status: 200,
        data: [
          {
            'downloadurl': '',
            'technology': 'applets',
            'picturetype': 0,
            'shortname': 'ocr',
            'picture': '/assets/index/ocr_banner.png',
            'appid': '93573376-ca8d-44ac-aadf-54da855965f6',
            'displayname': 'OCR识别',
            'developer': 'personal',
            'id': 11,
            'techcode': 'https://github.com/oracle/graal',
            'createTimestamp': 1669860904
          }
        ]
      }
    }
  }, {
    url: '/v1/api/updateDeveloperInfo',
    type: 'post',
    response: _ => {
      return {
        status: 200,
        message: '提交成功'
      }
    }
  }
]

