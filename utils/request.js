import base from './base'

export default (url, data = {'code': res.code}, method = 'GET') => {
  return new Promise((resolve, reject) => {
    uni.request({
		  url: base.host + url,
		  data: data,
		  method : method,
		  success: (res) => {
			console.log(res.data);
			resolve(res.data)
		  },
		  fail: (err) => {
			reject(err)
		  }	
    })
  })
}
