import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useUsersStore = defineStore("users", () => {
  const users = ref([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users");
      users.value = response.data;
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to fetch users",
      });
    }
  };

  const registerUser = async (userData) => {
    try {
      Loading.show();
      const response = await api.post("/api/register", userData);
      users.value.unshift(response.data);
      Notify.create({
        type: "positive",
        message: "User created successfully",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to create user",
      });
    } finally {
      Loading.hide();
    }
  };

  return {
    users,
    fetchUsers,
    registerUser,
  };
});
