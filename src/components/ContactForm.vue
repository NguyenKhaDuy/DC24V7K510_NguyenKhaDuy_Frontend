<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema">

        <div class="form-group">
            <label>Tên</label>
            <Field name="name" type="text" class="form-control" v-model="contactLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
            <label>E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="contactLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>

        <div class="form-group">
            <label>Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="contactLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>

        <div class="form-group">
            <label>Điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="contactLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>

        <!-- SỞ THÍCH -->
        <div class="form-group">
            <label><strong>Sở thích</strong></label>

            <div class="form-check" v-for="hobby in hobbyOptions" :key="hobby">
                <input class="form-check-input" type="checkbox" :id="hobby" :value="hobby"
                    v-model="contactLocal.hobbies" />

                <label class="form-check-label" :for="hobby">
                    {{ hobby }}
                </label>
            </div>
        </div>

        <!-- YÊU THÍCH -->
        <div class="form-group form-check mt-3">
            <input id="favorite" type="checkbox" class="form-check-input" v-model="contactLocal.favorite" />

            <label for="favorite" class="form-check-label">
                <strong>Liên hệ yêu thích</strong>
            </label>
        </div>

        <div class="form-group mt-4">
            <button class="btn btn-primary">
                Lưu
            </button>

            <button v-if="contactLocal._id" type="button" class="btn btn-danger ml-2" @click="deleteContact">
                Xóa
            </button>

            <button type="button" class="btn btn-secondary ml-2" @click="cancel">
                Thoát
            </button>
        </div>

    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    props: {
        contact: {
            type: Object,
            required: true,
        },
    },

    emits: ["submit:contact", "delete:contact"],

    data() {

        const contactFormSchema = yup.object({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên tối đa 50 ký tự."),

            email: yup
                .string()
                .email("E-mail không hợp lệ.")
                .max(50, "E-mail tối đa 50 ký tự."),

            address: yup
                .string()
                .max(100, "Địa chỉ tối đa 100 ký tự."),

            phone: yup
                .string()
                .matches(
                    /(09|03|07|08|05)[0-9]{8}/,
                    "Số điện thoại không hợp lệ."
                ),
        });

        return {
            contactLocal: {
                ...this.contact,
                hobbies: this.contact.hobbies || [],
            },

            hobbyOptions: [
                "Đọc sách",
                "Du lịch",
                "Chơi game",
                "Nghe nhạc",
                "Xem phim",
                "Thể thao",
            ],

            contactFormSchema,
        };
    },

    methods: {

        submitContact() {
            this.$emit("submit:contact", this.contactLocal);
        },

        deleteContact() {
            this.$emit("delete:contact", this.contactLocal._id);
        },

        cancel() {
            const reply = window.confirm(
                "Bạn có thay đổi chưa lưu. Bạn có muốn thoát không?"
            );

            if (reply) {
                this.$router.push({
                    name: "contactbook",
                });
            }
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";

.form-check {
    margin-bottom: 8px;
}
</style>