<template>
  <v-dialog
    v-model="userLoginDialog"
    persistent
    max-width="400px"
    max-height="200px"
  >
    <AppSigninModal></AppSigninModal>
  </v-dialog>
</template>

<script>
import AppSigninModal from '@/components/auth/AppSigninModal.vue';
import { mapState } from 'vuex';

export default {
  components: {
    AppSigninModal
  },
  computed: {
    ...mapState(['userLoginDialog'])
  }
};
</script>

<style></style>
