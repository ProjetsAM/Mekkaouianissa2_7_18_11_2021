<template>
  <div>
    <div class="flex-column">
      <img id="logo" alt="Groupomania logo" src="../assets/logo.png" />
      <p id="intro">Partagez et restez en contact avec vos collègues.</p>
    </div>

    <!-- login form  -->
    <div class="card block-auto">
      <h1 class="card_title">Se connecter</h1>
      <p class="card_sub">
        Pas de compte ? Inscris-toi 
        <router-link to="/" class="card_action" @click="switchToSignup()"
          >Créer un compte</router-link
        >
      </p>
      <form v-on:submit.prevent="login">
        <div class="form-row">
          <input
            v-model="email"
            name="email"
            class="form-row_input"
            type="text"
            placeholder="Adresse email"
          />
        </div>
        <div class="form-row">
          <input
            v-model="password"
            name="password"
            class="form-row_input"
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <div class="form-row">
          <button type="submit" class="button">Connexion</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import Swal from "sweetalert2";
export default {
  /* eslint-disable */ 
  name: "connexion",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    switchToSignup() {
      this.mode = "signup";
    },
    login() {
      axios
        .post("http://localhost:3001/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(function(response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("userName",response.data.userName)
          localStorage.setItem("avatar",response.data.avatar)
          localStorage.setItem("role",response.data.role)          
          Swal.fire({
            text: "Connexion réussie !",
            footer: "Redirection en cours...",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              router.push("/home");
            },
          });
        })
        .catch(function(error) {
          if (
            error.status === 400 ||
            error.status === 401 ||
            error.status === 500
          ) {
            Swal.fire({
              text: "Une erreur est survenue",
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true,
            });
          }
        });
    },
  },
};
</script>