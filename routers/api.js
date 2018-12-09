/* 处理用户登录注册的请求api */
/* 引入相关模块 */
const express = require("express");
const router = express.Router();
/* 引入数据模型 */
const User = require('../models/User');
const Content = require('../models/Content');
/* 准备工作，定义一个传递响应数据的可变对象 */
let responseDate = {};
/* 添加一个普通的中间件，在Router栈中 创建一个Layer对象 */
router.use((req, res, next) => {
	responseDate = {
		code: "000",
		message: ""
	}
	next()
})
/* user register */
router.post('/user/register', (req, res, next) => {
	let username = req.body.username;
	let password = req.body.password;
	let repassword = req.body.repassword;

	/* 用户和密码都不存在 */
	if (username == '' || password == '') {
		responseDate = {
			code: '001',
			message: '姓名或密码不能为空'
		}
		return res.json(responseDate)
	}
	/* 密码不一致 */
	if (password != repassword) {
		responseDate = {
			code: '002',
			message: '两次密码不一致'
		}
		res.json(responseDate)
		return
	}
	/* 重名的用户无法注册 */
	// 查询数据库是否重名
	User.findOne({
		username: username
	}).then((userInfo) => {
		if (userInfo) {
			// console.log(userInfo)
			responseDate = {
				code: '003',
				message: '用户名已经被注册'
			}
			return res.json(responseDate)
		} else {
			var user = new User({
				username: username,
				password: password
			})
			return user.save()
		}
	}).then((newUserInfo) => {
		responseDate.message = "注册成功";
		return res.json(responseDate);
	})
});




/* user login */
router.post("/user/login", (req, res, next) => {
	let username = req.body.username;
	let password = req.body.password;
	if (username == '' || password == '') {
		responseDate = {
			code: '001',
			message: '姓名或密码不能为空'
		}
		res.json(responseDate);
		return
	}
	// 查询数据库是否重名
	User.findOne({
		username: username,
		password: password
	}).then((userInfo) => {
		if (!userInfo) {
			responseDate = {
				code: '004',
				message: '用户不存在'
			}
			res.json(responseDate)
			return
		}
		// 用户名和密码正确
		responseDate = {
			code: '010',
			message: '登录成功',
			userInfo: {
				_id: userInfo._id,
				username: userInfo.username
			}
		}
		req.cookies.set('userInfo', JSON.stringify({
			_id: userInfo._id,
			username: userInfo.username
		}))
		res.json(responseDate)
		return
	})
});
/* 退出登录的事件 */
router.get('/user/logout', (req, res, next) => {
	req.cookies.set('userInfo', null)
	res.json(responseDate);
})

/* 用户评论 */
router.post('/comment/post', (req, res) => {

	if (req.body.content == '') {
		responseDate.message = '数据不能为空'
		responseDate.code = '999'
		res.json(responseDate)
		return
	}
	// 内容id
	var contentid = req.body.contentid || ''
	var postDate = {
		username: req.userInfo.username,
		postTime: new Date(),
		content: req.body.content
	}
	// 查询文章内容
	Content.findOne({
		_id: contentid
	}).then(content => {
		content.comments.push(postDate)
		return content.save()
	}).then(newContent => {
		responseDate.message = '评论成功'
		responseDate.data = newContent
		responseDate.code = '666'
		res.json(responseDate)
	})
})

module.exports = router;