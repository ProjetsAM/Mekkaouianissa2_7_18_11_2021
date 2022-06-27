<template>
<div>
  <div>
    <Header />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="card block-auto margin-top-10r">

            <div class="card-header-identity text-center">
              <h2 class="text-dark"> Bonjour {{ userName }} !</h2>
            </div>

            <div class="card-body">
              <div class="row align-items-center m-2 p-0">
                <div class="col-12 col-md-4 text-center">
                  <img :src="avatar" class="rounded-circle m-1 p-0" width="130" height="130"/>
                  <b-button @click="$bvModal.show('modalAvatar')" href="" class="p-1 btn-avatar" data-toggle="modal" data-target="#modalAvatar">Modifier</b-button>
                </div>

                <b-modal hide-footer hide-header class="modal fade" id="modalAvatar" tabindex="-1" aria-labelledby="modalAvatar" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <form @submit.prevent="updateAvatar()" enctype="multipart/form-data">
                        <div class="modal-header">
                          <p class="modal-title h5">Modifier la photo de profil de {{userName}}</p>
                        </div>

                        <div class="row modal-body">
                          <div class="col-6 justify-content-center">
                            <img :src="avatar" class="w-100 rounded-circle" />
                            <p class="p-small text-center">Photo actuelle</p>
                          </div>
                          <div class="col-6 justify-content-center">
                            <img :src="newAvatar" class="w-100 rounded-circle"/>
                            <p class="p-small text-center">Nouvelle photo</p>
                          </div>
                          <div class="col-12 justify-content-center">
                            <div class="form-group justify-content-center">
                              <label for="File" class="sr-only">Choisir une nouvelle photo</label>
                              <input @change="onFileChange()" type="file" ref="file" name="image" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png, .webp, .svg"/>
                              <div v-show="submitted && !file" class="invalid-feedback">
                                Une nouvelle photo est requise !
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="modal-footer">
                          <div class="row w-100 justify-content-spacebetween">
                            <div class="col-6">
                              <a @click="$bvModal.hide('modalAvatar')" data-dismiss="modal" class="btn btn-sm btn-cancel btn-block">Annuler</a>
                            </div>
                            <div class="col-6">
                              <button type="submit" class="btn btn-sm btn-danger btn-block">Valider</button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </b-modal>

                <div class="col-12 col-md-8 text-dark">
                  <p class="small text-left m-0 p-1">Compte actif depuis le : <br> {{ createdAt }}</p>
                  <p class="info-identity text-left m-0 p-1">
                    <span class="p-small">contact :</span> {{ email }}
                  </p>
                </div>

                <div class="col-12 justify-content-center margin-top-2r">
                  <button @click.prevent="modifyAccount()" class="btn btn-sm btn-block btn-secondary">Modifier mon compte</button>
                  <b-button @click="$bvModal.show('modalDeleteAccount')" href="" data-toggle="modal" data-target="#modalDeleteAccount" class="btn btn-sm btn-block btn-danger">Supprimer mon compte</b-button>
                  <b-modal
                    hide-footer 
                    hide-header
                    class="modal fade"
                    id="modalDeleteAccount"
                    data-backdrop="static"
                    data-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="modalDeleteAccount"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content border border-danger">
                        <form enctype="multipart/form-data">
                          <div class="modal-header">
                            <p class="modal-title h5 text-danger">
                              Supprimer le compte ?
                            </p>
                          </div>
                          <div class="row modal-body">
                            <div
                              class="col-12 justify-content-center form-group"
                            >
                              <p class="text-danger">
                                <span class="h6">ATTENTION !</span> Cette action
                                est irréversible.
                              </p>
                              <p>
                                Vous n'aurez plus accès à votre compte.
                              </p>
                              <p>
                                Voulez-vous
                                <span class="font-weight-bold">supprimer votre compte ?</span>
                              </p>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <div class="row w-100 justify-content-spacebetween">
                              <div class="col-6">
                                
                                <b-button
                                  @click="$bvModal.hide('modalDeleteAccount')"
                                  block
                                  class="btn btn-secondary btn-block"
                                  >Annuler</b-button
                                >
                              </div>
                              <div class="col-6">
                                <button
                                  type="submit"
                                  @click.prevent="deleteAccount()"
                                  class="btn btn-danger btn-block"
                                >
                                  Valider
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </b-modal>
                </div>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    </div>
  </div>
  <MessagesUser />
  <Footer />
</div>
</template>

<script>
import MessagesUser from "@/components/MessagesUser.vue"
import axios from "axios";
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import Swal from "sweetalert2";
export default {
  /* eslint-disable */ 
  name: "Compte",
  components: {
    Header,
    MessagesUser,
    Footer
  },
  data() {
    return {
      userName: "",
      email: "",
      role: "",
      currentUserId: "",
      createdAt: "",
      messagesCount: "",
      commentsCount: "",
      avatar: "",
      newAvatar: "/images/avatars/default_user.jpg",
      file: null,
      submitted: false,
    };
  },
  methods: {
    modifyAccount() {
      axios
        .put(
          "http://localhost:3001/api/users/" + localStorage.getItem("userId"),
          { isActive: true },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
        })
        .catch(function(error) {
          var erreur = error.status;
          if (erreur === 400 || erreur === 401 || erreur === 500) {
                    Swal.fire({
                    text: "Une erreur est survenue !",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    });
                } 
          });
    },
    onFileChange() {
      this.file = this.$refs.file.files[0];
      this.newAvatar = URL.createObjectURL(this.file);
    },
    updateAvatar() {
      this.submitted = true;
      const formData = new FormData();
      formData.append("image", this.file);
      axios
        .put(
          "http://localhost:3001/api/users/" + localStorage.getItem("userId"),
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(function (res) {
          localStorage.setItem("avatar", res.data.avatar);
          Swal.fire({
            text: "La photo de profil à été mise à jour !",
            footer: "Redirection en cours...",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch(function(error) {
                var erreur = error.status;
                if (erreur === 400 || erreur === 401 || erreur === 500) {
                    Swal.fire({
                    text: "Une erreur est survenue !",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    });
                } 
            });
    },
    deleteAccount() {
      axios.delete("http://localhost:3001/api/users/" + localStorage.getItem("userId"), { headers: { "Authorization":"Bearer " + localStorage.getItem("token") }})
        .then(() => {
          localStorage.clear();
          Swal.fire({
            text: "Le compte à été supprimé !",
            footer: "Déconnexion en cours...",
            icon: "success",
            timer: 5000,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch(function(error) {
                var erreur = error.status;
                if (erreur === 400 || erreur === 401 || erreur === 500) {
                    Swal.fire({
                    text: "Une erreur est survenue !",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    });
                } 
            });
    },
  },
  created: function () {
    this.isAdmin = localStorage.getItem("role")
    this.currentUserId = localStorage.getItem("userId")
    axios
      .get(
        "http://localhost:3001/api/users/" + localStorage.getItem("userId"),
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((user) => {
        this.userName = user.data.userName;
        this.email = user.data.email;
        this.role = user.data.role;
        this.createdAt =
          user.data.createdAt.slice(0, 10).split("-").reverse().join("/") +
          " à " +
          user.data.createdAt.slice(11, 16);
        this.avatar = user.data.avatar;
      })
      .catch(function (error) {
        const codeError = error.message.split("code ")[1];
        let messageError = "";
        switch (codeError) {
          case "400":
            messageError = "Vos informations non pas été récuperées !";
            break;
          case "401":
            messageError = "Veuillez vous identifiez !";
            break;
        }
        Swal.fire({
          title: "Une erreur est survenue",
          text: messageError || error.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      });
  },
};
</script>

<style>
</style>