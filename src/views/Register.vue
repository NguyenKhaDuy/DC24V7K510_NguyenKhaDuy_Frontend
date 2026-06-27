<template>
    <div class="container mt-5" style="max-width:500px">

        <h2 class="text-center mb-4">
            Đăng ký
        </h2>

        <form @submit.prevent="register">

            <div class="form-group">
                <label>Họ và tên</label>
                <input type="text" class="form-control" v-model="user.fullname" placeholder="Nhập họ và tên">
            </div>

            <div class="form-group mt-3">
                <label>Tên đăng nhập</label>
                <input type="text" class="form-control" v-model="user.username" placeholder="Nhập tên đăng nhập">
            </div>

            <div class="form-group mt-3">
                <label>Mật khẩu</label>
                <input type="password" class="form-control" v-model="user.password" placeholder="Nhập mật khẩu">
            </div>

            <button class="btn btn-success mt-4 w-100">
                Đăng ký
            </button>

        </form>

        <div class="text-center mt-3">
            <router-link :to="{ name: 'login' }">
                Đã có tài khoản? Đăng nhập
            </router-link>
        </div>

    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            user: {
                fullname: "",
                username: "",
                password: "",
            },
        };
    },

    methods: {
        async register() {
            try {
                await axios.post(
                    "http://localhost:3000/api/auth/register",
                    this.user
                );

                alert("Đăng ký thành công");

                this.$router.push({
                    name: "login",
                });
            } catch (err) {
                alert(
                    err.response?.data?.message ||
                    "Tên đăng nhập đã tồn tại"
                );
            }
        },
    },
};
</script>