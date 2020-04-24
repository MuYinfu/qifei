export default function request(url, data, method = 'post') {
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			data,
			method,
			header: {
				'content-type': 'application/json'
			},
			timeout: 40000,
			success(res) {
				resolve(res.data);
			},
			fail(err) {
				reject(err);
			}
		})
	})
}