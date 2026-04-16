document.addEventListener('DOMContentLoaded', () => {
    // --- 공통 및 페이지별 내비게이션 로직 ---

    // 홈 버튼 (로그인/회원가입 페이지)
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // 메인 홈 페이지 버튼
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    // 로그인 <-> 회원가입 전환 링크
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'signup.html';
        });
    }
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }

    // --- 회원가입 폼 제출 핸들러 ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            const userData = {
                name: name,
                email: email,
                password: password 
            };

            localStorage.setItem('userData', JSON.stringify(userData));
            alert('회원가입이 완료되었습니다! 사용자 정보가 LocalStorage에 저장되었습니다.');
            window.location.href = 'login.html';
        });
    }

    // --- 로그인 폼 제출 핸들러 ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // LocalStorage에서 데이터 가져오기
            const storedData = localStorage.getItem('userData');

            if (storedData) {
                const userData = JSON.parse(storedData);

                if (userData.email === email && userData.password === password) {
                    alert(`${userData.name}님, 환영합니다!`);
                    // 로그인 성공 시 세션 상태처럼 저장 (선택 사항)
                    localStorage.setItem('isLoggedIn', 'true');
                    window.location.href = 'welcome.html';
                } else {
                    alert('이메일 또는 비밀번호가 일치하지 않습니다.');
                }
            } else {
                alert('등록된 계정 정보가 없습니다. 회원가입을 먼저 해주세요.');
            }
        });
    }

    // --- 환영 페이지 로직 ---
    const welcomeMsg = document.getElementById('welcome-message');
    const userEmailSpan = document.getElementById('user-email');
    if (welcomeMsg && userEmailSpan) {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            const userData = JSON.parse(storedData);
            welcomeMsg.textContent = `환영합니다, ${userData.name}님!`;
            userEmailSpan.textContent = userData.email;
        }
    }

    // --- 로그아웃 핸들러 ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            alert('로그아웃 되었습니다.');
            window.location.href = 'index.html';
        });
    }
});
