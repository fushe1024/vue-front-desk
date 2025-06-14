export const validate = {
  username: (value) => {
    // if the field is empty
    if (!value) {
      return '用户名不能为空'
    }

    if (value.length < 6 || value.length > 12) {
      return '用户名长度必须在 6 到 12 个字符之间'
    }

    // All is good
    return true
  },
  password: (value) => {
    // if the field is empty
    if (!value) {
      return '密码不能为空'
    }

    if (value.length < 6 || value.length > 12) {
      return '密码长度必须在 6 到 12 个字符之间'
    }

    // All is good
    return true
  },
  confirmPassword: (value, data) => {
    // if the field is empty
    if (!value) {
      return '确认密码不能为空'
    }
    if (value !== data.form.password) {
      return '两次密码不一致'
    }

    return true
  }
}
