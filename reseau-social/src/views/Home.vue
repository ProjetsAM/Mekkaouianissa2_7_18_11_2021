<template>
    <div>
        <Header />
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8" id="allMessages">                    
                <!-- CREATE POST --> 
                    <div class="card block-auto margin-top-10r">
                        <div class="form-row">
                            <p class="card_sub"> Quoi de neuf aujourd'hui ? </p>
                        </div>
                        <form v-on:submit.prevent enctype="multipart/form-data">
                            <div>
                                <textarea v-model="newMessage" id="newMessage" type="text" class="form-row_input textarea"></textarea>
                            </div>
                            <div id="newImage">
                                <img class="newImage" :src="newImage">
                            </div>
                            <div class="flex-row flex-space-between">
                                <input class="p-small" name="image" @change="onFileChange()" type="file" ref="file" accept=".jpg, .jpeg, .gif, .png, .webp, .svg"/>
                                <button @click="addNewMessage()" class="createPost-btn">Publier </button>
                            </div>
                        </form>
                    </div>
                
                <!-- GET ALL POSTS STARTS HERE -->

                    <div v-for="message in messages" :key="message.id" class="border card_post">
                        <div class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                            <div class="header-post">
                                <div>
                                    <img :src="message.avatar" alt="image de profil" class="userpicture_post"/>
                                    <span class="small text-dark m-0 p-1" >
                                        Posté par {{message.userName}} 
                                    <span v-if="!message.isActive" class="small text-danger">(supprimé)</span>, 
                                        le {{message.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + message.createdAt.slice(11,16)}}
                                    </span>
                                </div>
                                <div v-if="isAdmin == 'true'">
                                    <a :href="'/message/edit/' + message.id"><img src="/images/edit.png" @click="editPost()" class="delete-icon m-1 p-0" alt="Modifier le message" title="modifier le message"/></a>
                                    <a :href="'/message/drop/' + message.id"><img src="/images/delete.png" @click="deletePost()" class="delete-icon m-1 p-0" alt="Supprimer le message" title="Supprimer le message"/></a>
                                </div>
                                <div v-if="(message.UserId == currentUserId) && (isAdmin == 'false')">
                                    <a :href="'/message/edit/' + message.id"><img src="/images/edit.png" @click="editPost()" class="delete-icon m-1 p-0" alt="Modifier le message" title="modifier le message"/></a>
                                    <a :href="'/message/drop/' + message.id"><img src="/images/delete.png" @click="deletePost()" class="delete-icon m-1 p-0" alt="Supprimer le message" title="Supprimer le message"/></a>
                                </div>
                            </div>                                                            
                        </div>
                        <div class="card-body text-dark text-left">
                            <p class="description" v-if="message.message !== ''"> {{message.message}} </p>
                            <img class="w-100 radius20 max-height-fit" :src="message.messageUrl" alt="image du message" v-if="message.messageUrl !== ''">
                        </div>
                        <div class="card-footer bg-light text-dark text-left m-0">
                            <a :href="'/commentaires/' + message.id" class="h6 text-dark">Voir les commentaires</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import router from "../router"
import Swal from "sweetalert2"
import axios from "axios"
export default {
    /* eslint-disable */ 
    name: "Home",
    components:{
        Header,
        Footer
    },
    data() {
        return {
            isActive: true,
            newImage: "",
            currentUserId: "",
            newMessage: "",
            file: null,
            messages: [],
            isAdmin: false,
        }
    },
    methods: {
        onFileChange() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file)
        },
        addNewMessage() {
            const formData = new FormData()
            formData.set("image", this.file)
            formData.set("UserId", this.currentUserId.toString())
            formData.set("message", this.newMessage.toString())
            
            axios.post("http://localhost:3001/api/messages/", formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then(()=> {
                this.UserId = ""
                this.newMessage = ""
                this.file = null
                Swal.fire({
                    text: "Message posté !",
                    footer: "Redirection en cours...",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => { location.reload() }
                })
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
        deletePost() {
            axios.delete("http://localhost:3001/api/messages/" + this.$route.params.id, { headers: { "Authorization":"Bearer " + localStorage.getItem("token") }})
            .then(res=> {
                if (res.status === 200) {
                    Swal.fire({
                        text: "Le message à été supprimé !",
                        footer: "Redirection en cours...",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        willClose: () => { router.push("/home") }
                    })
                }
            })
            .catch(function(error) {
                const codeError = error.message.split("code ")[1]
                let messageError = ""
                switch (codeError){
                    case "400": messageError = "Le message n'a pas été supprimé !"; break
                    case "401": messageError = "Requête non-authentifiée !"; break
                }
                Swal.fire({
                    title: "Une erreur est survenue",
                    text: messageError || error.message,
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true
                })  
            })
        },
        editPost() {
            const formData = new FormData()
            formData.set("image", this.file)
            formData.set("message", this.editMessage.toString())
            axios.put("http://localhost:3001/api/messages/" + this.$route.params.id, formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then(res=> {
                if (res.status === 200) {
                    Swal.fire({
                        text: "Le message à été mis à jour !",
                        footer: "Redirection en cours...",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        willClose: () => { this.file = null; router.push("/home") }
                    })
                }
            })
            .catch(function(error) {
                const codeError = error.message.split("code ")[1]
                let messageError = ""
                switch (codeError){
                    case "400": messageError = "Le message n'a pas été mis à jour !"; break
                    case "401": messageError = "Requête non-authentifiée !"; break
                }
                Swal.fire({
                    title: "Une erreur est survenue",
                    text: messageError || error.message,
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true
                })  
            })
        }
    },
    created: function() {
        this.isAdmin = localStorage.getItem("role")
        this.currentUserId = localStorage.getItem("userId")
        if (localStorage.getItem("refresh")===null) {
            localStorage.setItem("refresh", 0)
            location.reload()
        }
        axios.get("http://localhost:3001/api/messages",{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {
            const rep = res.data.ListeMessages
            this.messages = rep
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
    }
}
</script>

<style>
</style>