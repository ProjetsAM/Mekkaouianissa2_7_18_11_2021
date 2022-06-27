<template>
    <div>
        <div class="flex-column">
            <img id="logo" alt="Groupomania logo" src="../assets/logo.png">
            <p id="intro">Partagez et restez en contact avec vos collègues.</p>
        </div>

        <div class="card block-auto">
            <h1 class="card_title">Créer un compte</h1>
            <p class="card_sub">Tu as déjà créé ton profil ? <router-link to="/connexion" class="card_action" @click="switchToLogin()">Se connecter</router-link></p>
            <form v-on:submit.prevent="signup">
                <div class="form-row">
                    <input id="userName" v-model="userName" name="userName" class="form-row_input" type="text" placeholder="nom d'utilisateur"/>
                </div>
                <div class="form-row">
                    <input id="email" v-model="email" name="email" class="form-row_input" type="text" placeholder="Adresse email"/>
                </div>
                <div class="form-row">
                    <input id="password" v-model="password" name="password" class="form-row_input" type="password" placeholder="Mot de passe"/>
                </div>
                <div class="form-row">
                    <button type="submit" class="button">Inscription</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */ 
import axios from "axios"
import router from "../router"
import Swal from "sweetalert2"
export default {
  name: "inscription",
  data() {
    return {
        email: "",
        password: "",
        userName: ""
    }
  },
  methods: {
    switchToLogin() {
      this.mode = "login";
    },
    signup() {
        axios.post("http://localhost:3001/api/auth/signup", {
          userName: this.userName,
          email: this.email,
          password: this.password
        })
        .then(function (response) {
            var statut = response.status;
            if (statut === 201 || statut === 200) {
            Swal.fire({
                text: "Compte créé, veuillez vous connecter.",
                footer: "Connexion en cours...",
                icon: "success",
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => { router.push("/connexion") }
            })
            }
        })
        .catch(function (error) {
                const codeError = error.message.split("code ")[1]
                let messageError = ""
                switch (codeError){
                    case "401": messageError = "Adresse email déjà utilisée !";break
                }
                Swal.fire({
                    title: "Une erreur est survenue",
                    text: messageError || error.mesage,
                    icon: "error",
                    timer: 3500,
                    showConfirmButton: false,
                    timerProgressBar: true
                })
            });
    }
  }
};
</script>