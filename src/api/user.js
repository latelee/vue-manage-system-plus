// 这里的API作用是？？？

import http from '@/common/request';

export const login = (data) => {
        console.log("!!!!!!!!!!!111");
	http.post('/api/user/login', data).then(function(result){
		console.log('------------', result);
	}).catch(err => {
		console.log("66666666666666666666666", err)
		rj(err)
	})
}

export const logout = data => http.post('/api/user/logout', data)	// 登出

export const getPermissionMenu = data => {
	http.post('/v1/getPermissionMenu', data).then(function(result){
		console.log('------------', result);
	}).catch(err => {
		console.log("6666666666666666666", err)
		rj(err)
	})
}