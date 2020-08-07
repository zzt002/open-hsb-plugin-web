function isLogin() {
  let currentMills = new Date().getTime();
  let exp = localStorage.getItem('exp');
  if (exp === undefined || currentMills > exp) {
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem("exp");
  sessionStorage.clear();
}

export {
  isLogin, logout
}


