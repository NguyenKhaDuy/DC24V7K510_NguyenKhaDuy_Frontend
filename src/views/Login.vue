<template>
    <div class="container mt-5" style="max-width:500px">

        <h2 class="text-center mb-4">
            Đăng nhập
        </h2>

        <form @submit.prevent="login">

            <div class="form-group">
                <label>Tên đăng nhập</label>
                <input class="form-control" v-model="user.username">
            </div>

            <div class="form-group mt-3">
                <label>Mật khẩu</label>
                <input type="password" class="form-control" v-model="user.password">
            </div>

            <button class="btn btn-primary mt-4 w-100">
                Đăng nhập
            </button>

        </form>

        <div class="text-center mt-3">
            <router-link :to="{ name: 'register' }">
                Chưa có tài khoản? Đăng ký
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
                username: "",
                password: ""
            }
        }
    },

    methods: {
        async login() {

            try {

                const res = await axios.post(
                    "http://localhost:3000/api/auth/login",
                    this.user
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data)
                );

                this.$router.push({
                    name: "contactbook"
                });

            } catch (err) {

                alert("Sai tài khoản hoặc mật khẩu");

            }

        }
    }

}
</script>