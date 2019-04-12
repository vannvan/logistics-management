//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据
Mock.mock('/api/getBanner', (req, res) => {
    return {
        "error_code":0,
        "message":"返回码为非200时存在",
        "timestamp":12312342424,
        "data": [
          {
            url: 'http://www.baidu.com',
            img: 'https://ws3.sinaimg.cn/large/005BYqpgly1g08eam3k94j310409dq94.jpg',
            title: '一条通知信息'
          },
          {
            url: 'javascript:',
            img: 'https://ws3.sinaimg.cn/large/005BYqpgly1g08eam3k94j310409dq94.jpg',
            title: ''
          },
        ]
    }
})
