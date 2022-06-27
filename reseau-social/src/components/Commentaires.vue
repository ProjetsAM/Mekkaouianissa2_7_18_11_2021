<template>
    <div>
        <Header />
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <div class="margin-top-10r">
            <div class="card_comment bg-light my-3">
                <div class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                    <div>
                        <img :src="oneMessage.avatar" class="userpicture_post"/>
                            <span class="small text-dark m-0 p-1">
                                Posté par {{oneMessage.userName}}
                                <span v-if="!oneMessage.isActive" class="small text-danger">(supprimé)</span>, 
                                le {{oneMessage.createdAt}}
                            </span>
                        </div>                                 
                    </div>

                        <div class="card-body text-dark text-left" :id="'MessageContainer' + oneMessage.id">
                        <p class="description" v-if="oneMessage.message !== ''"> {{oneMessage.message}} </p>
                            <img class="w-100" :src="oneMessage.messageUrl" v-if="oneMessage.messageUrl !== ''">
                        </div>
                        <div class="card-footer bg-light text-dark text-left m-0">
                            <p class="h6 small" v-if="oneMessage.commentaire === 0">Il n'y a aucun commentaire.</p>
                            <p class="h6 small" v-if="oneMessage.commentaire === 1">Il y a 1 commentaire.</p>
                            <p class="h6 small" v-if="oneMessage.commentaire > 1">Il y a {{oneMessage.commentaire}} commentaires.</p>
                        </div>
                    </div>

                <div class="col-12">
                    <b-button  @click="$bvModal.show('modalAddComment')" href="" data-toggle="modal" data-target="#modalAddComment" class="my-2 btn btn-sm btn-block btn-danger">Poster un commentaire...</b-button>
                    <b-modal  hide-footer hide-header class="modal fade" id="modalAddComment" tabindex="-1" aria-labelledby="modalAddComment" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <form enctype="multipart/form-data">
                                    <div class="modal-header">
                                        <p class="modal-title h5">Poster un nouveau commentaire</p>
                                    </div>
                                    <div class="row modal-body">
                                        <div class="col-12 justify-content-center form-group">
                                            <label for="newComment" class="sr-only">Commentaire :</label>
                                            <textarea class="form-control" v-model="newComment" id="newComment" name="comment" rows="10" placeholder="Votre commentaire ici..." required :class="{ 'is-invalid': submitted && !newComment }"></textarea>
                                            <div v-show="submitted && !newComment" class="invalid-feedback">Une commentaire est requis !</div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="row w-100 justify-content-spacebetween">
                                            <div class="col-6"><a @click="$bvModal.hide('modalAddComment')" data-dismiss="modal" class="btn text-light btn-secondary btn-block">Annuler</a></div>
                                            <div class="col-6"><button type="submit" @click.prevent="addNewComment()" class="btn text-light btn-danger btn-block">Valider</button></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </b-modal>
                </div>
                
                <div class="col-12">

                    <div v-for="comment in comments" :key="comment.id" class="card-comment-active my-3">
                        <div class="card-header m-0 p-1">
                            <div class="d-flex justify-content-between">
                                <span class="p-small text-dark m-0 p-1">
                                    Commentaire de {{comment.User.userName}} 
                                    <span v-if="!comment.User.isActive" class="small text-danger">(supprimé)</span>, 
                                    le {{comment.createdAt.slice(0,10).split('-').reverse().join('/')}}
                                </span>
                            </div>
                            <!-- <hr class="m-0 p-0 bg-secondary"> -->
                            <p class="text-dark m-0 p-1"> {{comment.comment}}</p>
                        </div>
                    </div>

                </div>
        </div>
                </div>
            </div>
        </div>



        <Footer />
    </div>
</template>

<script>
import axios from "axios"
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import Swal from "sweetalert2"
export default {
    /*eslint-disable*/
    name: "Commentaires",
    components: {
        Header,
        Footer
    },
    data() {
        return {
            newComment: null,
            currentUserId: "",
            submitted: false,
            isAdmin: false,
            isActive: true,
            oneMessage: [],
            comments: [],
        }
    },
    methods: {
        addNewComment() {
            this.submitted = true
            axios.post("http://localhost:3001/api/comments/", { "MessageId": this.$route.params.id, "UserId": this.currentUserId, "comment": this.newComment }, { headers: { "Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(()=> {
                Swal.fire({
                    text: "Commentaire ajouté !",
                    footer: "Redirection en cours...",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => { location.reload() }
                })
            })
            .catch(function(error) {
                const codeError = error.message.split("code ")[1]
                let messageError = ""
                switch (codeError){
                    case "400": messageError = "Le message n'a pas été ajouté !"; break
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
    created: function () {
        this.isAdmin = localStorage.getItem("role")
        this.currentUserId = localStorage.getItem("userId")
        axios.get("http://localhost:3001/api/messages/" + this.$route.params.id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {
            this.oneMessage = res.data
            this.oneMessage.createdAt = res.data.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + res.data.createdAt.slice(11,16)
        })
        .catch((error)=> {
            const codeError = error.message.split("code ")[1]
            let messageError = ""
            switch (codeError){
                case "400": messageError = "Le message n'a pas été récupéré !"; break
                case "401": messageError = "Requête non-authentifiée !"; break
                case "404": messageError = "Le message n'a pas été trouvé !"; break
            }
            Swal.fire({
                title: "Une erreur est survenue",
                text: messageError || error.message,
                icon: "error",
                timer: 3500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => { this.$route.push("/messages") }
            })  
        })
        axios.get("http://localhost:3001/api/comments/messages/" + this.$route.params.id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(cmt => {
            this.comments = cmt.data
        })
        .catch(function(error) {
            const codeError = error.message.split("code ")[1]
            let messageError = ""
            switch (codeError){
                case "400": messageError = "La liste des commentaires n'a pas été récupéré !"; break
                case "401": messageError = "Requête non-authentifiée !"; break
            }
            Swal.fire({
                title: "Une erreur est survenue",
                text: messageError || error.message,
                icon: "error",
                timer: 3500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => { this.$route.push("/messages") }
            })  
        })
    }
}
</script>

<style>
   
</style>