<template>
  <q-card
    class="my-card q-pa-lg q-ma-lg"
    style="
      width: 430px;
      max-width: 90%;
      height: 80%;
      max-height: 1000px;
      min-height: none;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    "
  >
    <q-card-section>
      <div class="text-h5 text-center text-red-6 q-mb-md">
        Welcome to GB Bakeshop!
      </div>
      <div class="text-caption q-pt-sm text-center text-grey-8">
        Please log in to continue.
      </div>
    </q-card-section>

    <q-card-section class="q-mt-md">
      <q-form @submit="login">
        <div class="q-gutter-y-md">
          <q-input
            v-model="email"
            outlined
            placeholder="email"
            dense
            autofocus
            required
            style="border-radius: 8px"
          />
          <q-input
            v-model="password"
            outlined
            placeholder="Password"
            :type="isPwd ? 'password' : 'text'"
            dense
            required
            style="border-radius: 8px"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
                class="cursor-pointer"
                style="color: #9e9e9e"
              />
            </template>
          </q-input>
        </div>
        <!-- <q-checkbox v-model="rememberMe" label="Remember me" dense /> -->
        <div class="q-my-lg text-center">
          <q-btn
            type="submit"
            color="red-6"
            label="Login"
            class="q-mt-md"
            dense
            :loading="loading"
            :disable="!formIsValid"
            style="width: 100%; max-width: 350px; border-radius: 8px"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
// import { useAuthStore } from "src/stores/auth";
import { Loading } from "quasar";

// const authStore = useAuthStore();
const isPwd = ref(true);
const email = ref("superadmin@gmail.com");
const password = ref("superadmin12345");

const loading = ref(false);

const formIsValid = computed(() => email.value !== "" && password.value !== "");

const quasar = useQuasar();
const router = useRouter();

const login = async () => {
  Loading.show();
  try {
    // await authStore.login(email.value, password.value);
    Loading.hide();
  } catch (error) {
    Loading.hide();
  }
};
</script>

<style scoped>
.text-primary {
  color: #f44336; /* Primary color for the welcome message */
}

.my-card {
  background-color: #ffffff; /* White background for card */
  animation: mymove 2s infinite;
}

.q-input .q-field__control {
  font-size: 16px; /* Increased font size for inputs */
}

.q-input .q-field__control::placeholder {
  color: #9e9e9e; /* Light gray placeholder text */
}

.q-input .q-icon {
  cursor: pointer;
}

.q-btn {
  background-color: #f44336; /* Primary color for button */
  color: #ffffff; /* White text for button */
}

.q-btn:disabled {
  background-color: #e0e0e0; /* Light gray background for disabled button */
  color: #9e9e9e; /* Gray text for disabled button */
}

@keyframes mymove {
  50% {
    box-shadow: 10px 20px 30px rgb(254, 154, 154);
  }
}
</style>
