<template>
  <div class="login-container">

    <el-form v-if="flag" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h1>博客平台</h1>
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <a href="javascript:;" @click.prevent="register_a">去注册</a>
      </el-form-item>
    </el-form>

    <el-form v-else :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h1>博客平台</h1>
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <a href="javascript:;" @click.prevent="login_a">去登录</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import loginAPI from './api/loginAPI.js'
import registerAPI from './api/registerAPI.js'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      flag: true,
      ruleForm: {
        name: '',
        pass: '',
        checkPass: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }

    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$nextTick(function () {
            this.userLogin()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    register (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // localStorage.setItem('token', 'Berera xxx')
          this.$nextTick(function () {
            this.userRegister()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    register_a () {
      this.flag = false
    },
    login_a () {
      this.flag = true
    },
    async userLogin () {
      const { data: res } = await loginAPI(this.ruleForm.name, this.ruleForm.pass)
      // localStorage.setItem('token', res.token)
      // const token = localStorage.getItem('token')
      // console.log(res)
      // console.log(res.token)

      if (res.status === 0) {
        localStorage.setItem('token', res.token)
        const token = localStorage.getItem('token')
        if (token) {
          this.$router.push('/home')
          alert(res.message)
        } else {
          alert(res.message)
          this.$router.push('/login')
        }
      } else {
        alert(res.message)
      }
      // console.log(res)
    },
    async userRegister () {
      const { data: res } = await registerAPI(this.ruleForm.name, this.ruleForm.pass, this.ruleForm.checkPass, this.ruleForm.email)
      alert(res.message)
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    .el-form {
      width: 500px !important;
      height: 450px !important;
       h1 {
      text-align: center;
      }
      border-radius: 10px;
      position: absolute;
      margin: 0;
      padding: 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 450px;
      height: 350px;
      background-color: rgba(#eee, .5);
      .el-form-item {
        margin-right: 35px;
      }
      a {
        display: inline-block;
        color: #aa2116;
        text-decoration: none;
        // margin-right: 20px;
        margin-left: 100px;
      }
    }
  }
</style>
