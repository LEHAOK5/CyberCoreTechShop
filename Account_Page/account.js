// UI wiring for sign in / register / recover
document.addEventListener('DOMContentLoaded', () => {
	const formSignin = document.getElementById('form-signin')
	const formRegister = document.getElementById('form-register')
	const formRecover = document.getElementById('form-recover')
	const feedback = document.getElementById('form-feedback')

	// links
	document.getElementById('link-register').addEventListener('click', (e)=>{e.preventDefault(); showForm('register')})
	document.getElementById('link-recover').addEventListener('click', (e)=>{e.preventDefault(); showForm('recover')})
	document.getElementById('link-back-to-signin').addEventListener('click', (e)=>{e.preventDefault(); showForm('signin')})
	document.getElementById('link-recover-back').addEventListener('click', (e)=>{e.preventDefault(); showForm('signin')})

	// bật tắt hiển thị mật khẩu
	document.querySelectorAll('.btn-toggle-pw').forEach(btn=>{
		btn.addEventListener('click', ()=>{
			const id = btn.dataset.target;
			const input = document.getElementById(id);
			if(!input) return;
			const group = btn.parentElement;
			// Tìm 2 nút trong input-group
			const btnShow = group.querySelector('.btn-toggle-pw[data-visible="false"]');
			const btnHide = group.querySelector('.btn-toggle-pw[data-visible="true"]');
			if(input.type === 'password') {
				input.type = 'text';
				if(btnShow) btnShow.style.display = 'none';
				if(btnHide) btnHide.style.display = '';
			} else {
				input.type = 'password';
				if(btnShow) btnShow.style.display = '';
				if(btnHide) btnHide.style.display = 'none';
			}
		});
	})

	// helpers
	function showForm(name){
		formSignin.classList.remove('active')
		formRegister.classList.remove('active')
		formRecover.classList.remove('active')
		feedback.textContent = ''
		if(name === 'signin') formSignin.classList.add('active')
		if(name === 'register') formRegister.classList.add('active')
		if(name === 'recover') formRecover.classList.add('active')
	}

	function validateEmail(value){
		if(!value) return 'Vui lòng nhập email'
		// định dạng regex cho email đơn giản
		const re = /^\S+@\S+\.\S+$/
		return re.test(value) ? '' : 'Vui lòng nhập địa chỉ email hợp lệ'
	}

	// Sign in submit
	formSignin.addEventListener('submit', (e)=>{
		e.preventDefault()
		const email = document.getElementById('signin-email').value.trim()
		const password = document.getElementById('signin-password').value
		const errEmail = document.getElementById('err-signin-email')
		const errPw = document.getElementById('err-signin-password')
		errEmail.textContent = ''
		errPw.textContent = ''

		const em = validateEmail(email)
		if(em){ errEmail.textContent = em; return }
		if(!password || password.length < 6){ errPw.textContent = 'Mật khẩu phải có ít nhất 6 ký tự'; return }

		// mô phỏng yêu cầu máy chủ
			feedback.textContent = 'Đang đăng nhập...'
	setTimeout(() => {
		if (email.trim() !== '' && password.trim() !== '') {
			feedback.textContent = 'Đăng nhập thành công. Đang chuyển hướng...'
			 setTimeout(() => window.location.href = '/index.html', 1000)
		} else {
			feedback.textContent = ''
			errPw.textContent = 'Vui lòng nhập đầy đủ thông tin'
		}
	}, 800)
	})

	// Register submit
	formRegister.addEventListener('submit', (e)=>{
		e.preventDefault()
		const email = document.getElementById('reg-email').value.trim()
		const password = document.getElementById('reg-password').value
		const confirm = document.getElementById('reg-password-confirm').value
		const errEmail = document.getElementById('err-reg-email')
		const errPw = document.getElementById('err-reg-password')
		const errConfirm = document.getElementById('err-reg-password-confirm')
		errEmail.textContent = ''
		errPw.textContent = ''
		errConfirm.textContent = ''

		const em = validateEmail(email)
		if(em){ errEmail.textContent = em; return }
		if(!password || password.length < 6){ errPw.textContent = 'Mật khẩu phải có ít nhất 6 ký tự'; return }
		if(password !== confirm){ errConfirm.textContent = 'Mật khẩu không khớp'; return }

		feedback.textContent = 'Đang tạo tài khoản...'
		setTimeout(()=>{
			feedback.textContent = 'Tài khoản đã được tạo. Bạn có thể đăng nhập.'
			// chuyển sang đăng nhập sau khi tạo xong
			showForm('signin')
		}, 900)
	})

	// Recover submit
	formRecover.addEventListener('submit', (e)=>{
		e.preventDefault()
		const email = document.getElementById('rec-email').value.trim()
		const err = document.getElementById('err-rec-email')
		err.textContent = ''
		const em = validateEmail(email)
		if(em){ err.textContent = em; return }

		feedback.textContent = 'Nếu email này tồn tại, một liên kết khôi phục sẽ được gửi.'
		setTimeout(()=>{
			feedback.textContent = 'Email khôi phục đã được gửi (mô phỏng). Kiểm tra hộp thư đến của bạn.'
			showForm('signin')
		}, 1000)
	})

	// default view
	showForm('signin')
})
