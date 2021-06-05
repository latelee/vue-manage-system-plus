/*

请求拦截器

封装axios，对外直接提供接口，但交互用的json固定
请求消息封装：
？？？

响应消息封装：
code: 0
msg: "ddd"  // 如果code有错误码，则msg写对应的消息
data: {

}
*/
import axios from 'axios';
import qs from 'qs';
import { ElMessage } from 'element-plus'
// import { Router, useRouter, useRoute } from 'vue-router' // Router 是TS中的接口 js可以不管它
import router from '@/router'
// MD5
import { getSignString, md5 } from './tools'

import { baseUrl, requstParams } from '@/common/config'

const service = axios.create({
	withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000
});

// axios.defaults.headers = {'Content-Type': 'application/json;charset=UTF-8'};
//axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};

// 对应post请求
service.interceptors.request.use(
	config => {
		config.params = { ...requstParams() };
		// const newAllPar = { ...config.params, ...config.data }
		// config.header['x-sign'] = md5(md5(getSignString(newAllPar)) + md5('73069389154442C614BE8D8202FDD054532C28D5412DD75BF975FB951C740A30'))
		// LL NOTE 转为formdata数据格式 表单形式，数据在url中带有，如不设置为json格式
		
		// config.data = qs.stringify(config.data)
		config.headers.Authorization = sessionStorage['token']; // 根据实际情况自行修改
		console.log("!!!!!! axios... request", config)
		return config;
	},
	error => {
		console.log(error);
		return Promise.reject();
	}
);

// 后台回应的函数
service.interceptors.response.use(
	response => {
		console.log("!!!!!! axios... response", response, response.data)
		if (response.status === 200) { // http状态
			if (response.data.code === 0){
				return response.data
			}
			// LL TODO：这里自定义一些错误码，待改
			else if (response.data.code === 10010 || response.data.code === 10011){
				ElMessage.error(response.data.msg)
				sessionStorage.clear()
				router.push('/login')
			}
			else {
				ElMessage.error(response.data.msg)
			}
		} else {
			Promise.reject();
		}
	},
	error => {
		console.log(error);
		return Promise.reject();
	}
);

export default service;
