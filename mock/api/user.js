module.exports = [
  // user login
  {
    url: '/v1/api/managerLogin',
    type: 'post',
    response: config => {
      return {
        'status': 200,
        'authorization': 'abcdef',
        'data': {
          'id': 1234, // 记录序号
          'name': '姓名',
          'dept': '部门',
          'jobId': '工号',
          'team': '团队',
          'purpose': '用途',
          'p_num': '电话号码',
          'role': '权限',
          'auditStatus': 1, // 审核状态，1=审核中，2=审核通过，3=审核失败
          'auditReason': '审批通过或拒绝的理由'
        }
      }
    }
  }
]
