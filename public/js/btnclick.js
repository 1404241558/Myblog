$(function() {
	/* 首页登录以后的退出登录按钮事件 */
	$(".login-out").on('click', function() {
		var logout = "/api/user/logout"
		$.ajax({
			type: "get",
			url: logout,
			success: function() {
				window.location.href = 'http://localhost:3000'
			}
		});
	})

	/* Toastr初始化 */
	toastr.options = {
		"closeButton": false, //显示关闭按钮
		"debug": false, //启用debug
		"positionClass": "toast-top-center", //弹出的位置
		"showDuration": "300", //显示的时间
		"hideDuration": "1000", //消失的时间
		"timeOut": "2000", //停留的时间
		"extendedTimeOut": "1000", //控制时间
		"showEasing": "swing", //显示时的动画缓冲方式
		"hideEasing": "linear", //消失时的动画缓冲方式
		"showMethod": "fadeIn", //显示时的动画方式
		"hideMethod": "fadeOut" //消失时的动画方式
	};

	/* 提示信息 */
	$(".unlogin-btn").on('click', function() {
		toastr.warning('您需要先登录！', '用户您好！')
	})
	$(".resume").on('click', function() {
		toastr.info('请您以管理员的身份进入！', '不好意思！')
	})
	$(".noprev").on('click', function() {
		toastr.error('这已经是最开始一页了', '用户您好！')
	})
	$(".nonext").on('click', function() {
		toastr.error('这已经是最后一页了', '用户您好！')
	})

	$(".btn-middle").on('click', function() {
		$(".comment").toggle(1000);
	})


function blogAjax(url, data, fn) {
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: "JSON",
    error: function(data) {
      alert('加载异常，请稍后重试')
    },
    success: function(res) {
     typeof fn === 'function' && fn(res)
    }
  });
}

	/* 发表评论事件 */
	$(".Send").on('click', function() {
		var comment = "/api/comment/post"
		var data = {
			contentid: $(".contentId").val(),
			content: $(".comment-area").val()
		}
		blogAjax(comment, data, function(res) {
			$('.comment-area').val('')
			if (res.code == '666') {
				location.reload();
			} else {
				toastr.error(res.message)
			}
		})
	})
	
	
	
})
