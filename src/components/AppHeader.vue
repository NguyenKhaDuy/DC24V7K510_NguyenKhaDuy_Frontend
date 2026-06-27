<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link class="navbar-brand" :to="{ name: isLogin ? 'contactbook' : 'login' }">
            Ứng dụng Quản lý danh bạ
        </router-link>

        <div class="navbar-nav mr-auto" v-if="isLogin">
            <router-link class="nav-link" :to="{ name: 'contactbook' }">
                <i class="fas fa-address-book"></i>
                Danh bạ
            </router-link>

            <router-link class="nav-link" :to="{ name: 'contact.add' }">
                <i class="fas fa-user-plus"></i>
                Thêm liên hệ
            </router-link>
        </div>

        <div class="navbar-nav ml-auto">
            <!-- Chưa đăng nhập -->
            <template v-if="!isLogin">
                <router-link class="nav-link" :to="{ name: 'login' }">
                    <i class="fas fa-sign-in-alt"></i>
                    Đăng nhập
                </router-link>

                <router-link class="nav-link" :to="{ name: 'register' }">
                    <i class="fas fa-user-plus"></i>
                    Đăng ký
                </router-link>
            </template>

            <!-- Đã đăng nhập -->
            <template v-else>
                <span class="navbar-text text-light mr-3">
                    Xin chào {{ username }}
                </span>

                <button class="btn btn-outline-light btn-sm" @click="logout">
                    <i class="fas fa-sign-out-alt"></i>
                    Đăng xuất
                </button>
            </template>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            isLogin: false,
        };
    },

    mounted() {
        this.loadUser();
    },

    watch: {
        $route() {
            this.loadUser();
        },
    },

    methods: {
        loadUser() {
            const user = JSON.parse(localStorage.getItem("user"));

            if (user) {
                this.username = user.username;
                this.isLogin = true;
            } else {
                this.username = "";
                this.isLogin = false;
            }
        },

        logout() {
            localStorage.removeItem("user");

            this.username = "";
            this.isLogin = false;

            this.$router.push({
                name: "login",
            });
        },
    },
};
</script>