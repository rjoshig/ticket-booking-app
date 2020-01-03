<template>
  <!-- <v-layout row justify-center> -->
  <v-dialog v-model="userRegistrationDialog" persistent max-width="600px">
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
			</template>-->
      <v-card>
        <v-card-title>
          <span class="headline">User Registration Form</span>
        </v-card-title>
        <div v-if="error !== null">
          <p color="red">{{ error }}</p>
        </div>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="First Name*" required></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  label="Email*"
                  :rules="emailRules"
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
              <v-flex xs12>
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password*"
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
          <v-btn color="blue darken-1" flat @click="closeUserRegistrationDialog"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            :loading="userRegistrationSubmitButtonLoading"
            :disabled="userRegistrationSubmitButtonLoading"
            flat
            @click="submitRegistrationForm"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
  <!-- </v-layout> -->
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    confirmPassword: '',
    passwordRules: [v => !!v || 'Password and Confirm password Required']
  }),
  computed: {
    ...mapState(['userRegistrationSubmitButtonLoading', 'error'])
  },
  methods: {
    submitRegistrationForm() {
      if (this.$refs.form.validate()) {
        // this.loading = true;
        this.snackbar = true;
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('signUpAction', user);
        // this.$store.dispatch('userRegistrationDialogAction', false);
        // this.registerWithFirebase();
      }
    },
    reset() {
      this.$refs.form.reset();
    },

    closeUserRegistrationDialog() {
      this.$store.dispatch('userRegistrationDialogAction', false);
    }
  }
};
</script>
