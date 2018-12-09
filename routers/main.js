/* 引入模块 */
const express = require("express");
const router = express.Router();
/* 导入数据模型 */
const User = require("../models/User");
const Category = require("../models/Category");
const Content = require("../models/Content");
/* 定义一个data作为传递数据的普通中间件 */
let data = {};
router.use((req, res, next) => {
	data = {
		userInfo: req.userInfo,
		categories: []
	}
	/* 获取分类的表并且传递值 */
	Category.find().then(categories => {
		data.categories = categories;
		next()
	})
})
/* 根路由 */
router.get('/', (req, res, next) => {
	data.category = req.query.category || '',
		data.count = 0,
		data.page = Number(req.query.page || 1),
		data.limit = 5,
		data.pages = 0
	// 筛选首页分类
	var where = {}
	if (data.category) {
		where.category = data.category
	}
	Category.count().then(count => { //获取总的数目
		data.count = count
		data.pages = Math.ceil(data.count / data.limit) //向上取整
		data.page = Math.min(data.page, data.pages) // page最大为pages
		data.page = Math.max(data.page, 1) // page 最小为1
		var skip = (data.page - 1) * data.limit //跳过的页数为当前的页数*每页限制的页数
		return Content.where(where).find().sort({
			addTime: -1
		}).limit(data.limit).skip(skip).populate(['category', 'user'])
	}).then(function(contents) {
		data.contents = contents
		// console.log(data)
		res.render("main/content", data)
	})
})
/* 登录路由 */
router.get('/login', (req, res) => {
	res.render('main/logging');
})
/* 显示内容页面 */
router.get('/view', (req, res) => {
	var contentid = req.query.contentid || ''
	Content.findOne({
		_id: contentid
	}).then((content) => {
		data.content = content
		// 记录阅读数
		content.view++
		content.save()
	}).then(user => {
		/* 添加文章作者的信息 */
		user = data.content.user;
		User.findOne({
			_id: user
		}).then(username => {
			data.content.username = username.username;
// 						console.log(user)
// 						console.log(data.content)
// 						console.log('-------------')
// 						console.log(data.content.comments)
			res.render('main/contentview', data)
		})
	})
	
})
module.exports = router;
