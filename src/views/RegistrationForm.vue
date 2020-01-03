<template>
  <v-dialog v-model="userRegistrationDialog" persistent max-width="500px">
    <AppRegisterModal></AppRegisterModal>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import AppRegisterModal from '@/components/auth/AppRegisterModal.vue';
export default {
  components: {
    AppRegisterModal
  },
  computed: {
    ...mapState(['userRegistrationDialog'])
  }
};
</script>

<style></style>
