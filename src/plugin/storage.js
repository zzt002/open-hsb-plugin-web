import router from '../router'

function checkLogin() {
  let currentMills = new Date().getTime();
  let exp = localStorage.getItem('exp');
  if (exp === undefined || currentMills > exp) {
    router.push('/login');
  } else {
    // router.push('/');
  }
}
function logout() {
  localStorage.removeItem("exp");
  sessionStorage.clear();
}

export {
  checkLogin, logout
}


