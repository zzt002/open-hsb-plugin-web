function copy(value) {
  let copyInput = document.createElement("input");
  copyInput.type = "text";
  copyInput.value = value;
  document.body.appendChild(copyInput);
  copyInput.select();
  // 执行浏览器复制命令
  document.execCommand('Copy');
  document.body.removeChild(copyInput);
}

export {
  copy
}
