<template>
  <v-layout row justify-center>
    <!-- <v-dialog
      v-model="userLoginDialog"
      persistent
      max-width="400px"
      max-height="200px"
		>-->
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
			</template>-->
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <div v-if="error !== null">
          <p color="red">{{ error }}</p>
        </div>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="password"
                  label="Password*"
                  type="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>* indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeUserLoginDialog"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            flat
            :loading="userLoginSubmitButtonLoading"
            :disabled="userLoginSubmitButtonLoading"
            @click="submitLoginForm"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
    <!-- </v-dialog> -->
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    passwordShow: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [v => !!v || 'Password is Required']
  }),
  computed: {
    ...mapState(['userLoginSubmitButtonLoading', 'error'])
  },

  methods: {
    submitLoginForm() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('signInAction', user);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    closeUserLoginDialog() {
      this.$store.dispatch('userLoginDialogAction', false);
    }
  }
};
</script>
