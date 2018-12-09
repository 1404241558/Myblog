/* register Ajax response */
function blogAjax(url, data, fn) {
	$.ajax({
		type: 'POST', //登录页面传输使用post方式，更安全
		url: url,
		data: data,
		dataType: "json",
		success: function(res) {
			typeof fn === 'function' && fn(res)
		},
		error: function(data) {
			alert('加载异常，请稍后重试');
		},
		// time:200
	});
}
/* 防抖函数-防止点击登录、注册的时候被恶意点击 */
function debounce(fn, delay, scope) {
	let timer = null;
	//返回函数形成闭包
	return function() {
		let context = scope || this,
			args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn.apply(context, args)
		}, delay)
	}
}
/* 给函数的表单置空 */
function setNull() {
	$('#register-username').val('');
	$('#register-password').val('');
	$('#repeat-password').val('');
}
/* 登录 */
/* 登录的点击事件 */
function f() {
	var register = "/api/user/login"
	var data = {
		username: $("#username").val(),
		password: $("#password").val(),
	}
	blogAjax(register, data, function(res) {
		// 登录成功
		if (res.code == '010') {
			console.log('你已经成功登录了');
			window.location.href = 'http://localhost:3000'
			// window.location.href = 'http://localhost:3000?' + data.username + '';
		} else {
			$('.login-tips').html(res.message).css('color', 'red')
		}
	})
}
/* 封装登录点击事件 */
let loginClick = debounce(f, 1000)
/* 按钮绑定点击登录事件 */
$("#login-btn").bind('click', loginClick)
/* 进入注册 */
$('#register-btn').on('click', function() {
	/* 登录信息置空并且隐藏 */
	$('#username').val('');
	$('#password').val('');
	$('.login-tips').text('')
	$('.login').addClass('hidden');
	$('.register').removeClass('hidden').fadeIn();
})
/* 取消注册 */
$('#register-out-btn').on('click', function() {
	$('.register').addClass('hidden');
	$('.login').removeClass('hidden');
	/* 给表格置空 */
	$('.login-tips').text('')
	setNull();
})



/* 开始注册 */
/* 定义注册点击事件 */
/* 清空表单input框中的值 */
function click() {
	var register = '/api/user/register';
	var data = {
		username: $('#register-username').val(),
		password: $('#register-password').val(),
		repassword: $('#repeat-password').val()
	}
	blogAjax(register, data, function(res) {
		/* 注册成功 */
		if (res.code == '000') {
			$('.register-info').html(res.message);
			setNull();
			$('.register').addClass('hidden');
			$('.login').removeClass('hidden');
		} else {
			/* 注册失败 */
			$('.register-tips').html(res.message).css('color', 'red');
			setNull();
			/* 给表格置空 */
		}
	})
}
/* 封装防抖功能 */
let f1 = debounce(click, 1000);
/* 按钮绑定点击事件 */
$('#register-enter-btn').bind('click', f1)

// 增加分类
$('.add-category').on('click', function() {
	var add = location.href
	var data = {
		category: $("#name").val(),
	}
	addCategory(add, data)

	function addCategory(url, data) {
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			dataType: "JSON",
			async: true,
			error: function(data) {
				alert('加载异常，请稍后重试')
			},
			success: function(res) {
				console.log(res)
			}
		});
	}
})

function hover(element,fs,ft){
	$(element).hover(function(){
		$(element).animate(fs)
	},function(){
		$(element).animate(ft)
	})
}
hover('.backstage',{fontSize:'30px'},{fontSize:'18px'});
hover('.backstage1',{fontSize:'25px'},{fontSize:'14px'});
hover('.backstage2',{fontSize:'25px'},{fontSize:'14px'});
hover('.backstage3',{fontSize:'25px'},{fontSize:'14px'});
hover('.backstage4',{fontSize:'25px'},{fontSize:'14px'});
// $('.backstage').hover(function(){
// 	$('.backstage').animate({fontSize:'30px'})
// },function(){
// 	
// 	$('.backstage').animate({fontSize:'18px'})
// })