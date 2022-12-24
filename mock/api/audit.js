module.exports = [
  {
    url: '/v1/api/admin/getAllUserInfo',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: [
          {
            'name': '新成员',
            'dept': '基础技术中心',
            'team': '交付实施团队',
            'usage': '用途1用途1用途1用途1用途1用途1用途1用途1',
            'id': '10001234',
            'status': 0,
            'timestamp': 1669860904
          }, {
            'name': '审核中',
            'dept': '基础技术中心',
            'team': '敏捷研发团队',
            'usage': '用途2用途2用途2用途2用途2用途2用途2用途2用途2用途2用途2',
            'id': '26474987',
            'status': 1,
            'timestamp': 1669860904
          }, {
            'name': '失败了',
            'dept': '基础技术中心',
            'team': '大数据团队',
            'usage': '用途3用途3用途3用途3用途3用途3用途3用途3用途3用途3用途3用途3用途3用途3用途3用途3',
            'id': '45246975',
            'status': 3,
            'timestamp': 1669860904
          }, {
            'name': '已通过',
            'dept': '基础技术中心',
            'team': '大数据团队',
            'usage': '用途4444444444444444444444',
            'id': '45246975',
            'status': 2,
            'timestamp': 1669860904
          }
        ]
      }
    }
  }, {
    url: '/v1/api/admin/auditDeveloper',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'ok'
      }
    }
  }
]

