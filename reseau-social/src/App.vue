<template>
    <div id="app">
       
      <!-- définit la zone de la page dans laquelle apparaîtra le composant 
      que nous définissons dans chaque route -->
      
      <router-view />
       
    </div>
</template>

<script>
export default {
    name: "App",
    components: { 
        
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap');
  body {
      background-color: #F0F2F5;
      font-family: 'Lato', sans-serif;
  }
  a{
    color: #343a40!important;
  }
li{
    list-style: none;
}
a:link {
  text-decoration: none;
}
.router-link-active {
    color: #d1515a;
}
.block-auto {
  display: block;
  margin: auto;
}
.flex-column{
  display: flex;
  flex-direction: column;
}
.flex-row{
  display: flex;
  flex-direction: row;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.flex-evenly {
    display: flex;
    justify-content: space-evenly;
}
.flex-space-between {
    display: flex;
    justify-content: space-between;
}
.align-items-center {
    display: flex;
    align-items: center;
}
.margin-bottom-2 {
  margin-bottom: 2px;
}
.margin-top-10r {
  margin-top: 10rem;
}
.margin-top-2r {
  margin-top: 2rem;
}
.margin-top-10r {
  margin-top: 10rem;
}
.margin-25r {
  margin: 0.25rem!important;
}
.width100 {
  width: 100%;
}
.p-small {
  font-size: 13px;
  color: #2c3e50;
}
.radius20 {
  border-radius: 20px;
}
.font-weight-bold {
  font-weight: bold;
}
.m-auto {
  margin: auto;
}
.m-0 {
  margin: 0;
}
.p-7 {
  padding: 0.7em;
}
.cover {
  width : 100%;
  object-fit: cover;
}
#newImage {
    overflow: hidden;
    border-radius: 15px;
    margin-bottom: 2rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.header-post {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.delete-icon {
  height: 1.2em;
  cursor: pointer;
}
/* HEADER NAVBAR */
.navbar{
  background-color: #fff;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 3px solid #dbdbdb;
}
.nav-logo {
  height: 53px;
}
.nav-item {
  border-bottom: 3px solid #FD5B39;
  /* border-width: 5px; */
  border-radius: 50% 20% / 10% 40%;
}
.nav-p {
    font-size: 1rem;
    font-weight: 500;
    color: #2c3e50;
    padding: 0 20px;
}
.userPosts {
  object-fit: cover;
  height: 40px;
  width: 40px;
  margin: 0 40px 0 0;
  border-radius: 100%;
}
.card-header-identity {
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid rgba(0,0,0,.125);
}
.btn-avatar {
  cursor: pointer;
  font-size: .8rem;
  font-weight: 500;
  color: #fff;
  background-color: #097CEA;
  border: none;
  border-radius: 0.25rem;
}
.btn-avatar:hover {
  color: #fff;
  background-color: #a88bad;
}
.btn-cancel {
  border-color: #6c757d;
}
.btn-cancel:hover {
  background-color: #FFDBDB;
}
.btn-confirm {
    color: #000;
    background-color: #FFDBDB;
    border-color: #6c757d;
}
/* WELCOME FORM LOGIN */
#logo {
  margin: auto;
  height: 5rem;
}
#intro {
  text-align: center;
  margin-bottom: 2rem;
}
.form-row {
  display: flex;
  justify-content: center;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row_input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row_input::placeholder {
  color: #202020;
}
.card {
  max-width: 100%;
  width: 540px;
  background: #fff;
  border-radius: 16px;
  padding:32px;
  margin-bottom: 50px;
  border: 1px solid;
}
.card_post {
  max-width: 100%;
  width: 540px;
  background: #fff;
  border-radius: 16px;
  margin-top: 50px;
}
@media (min-width: 1024px) {
  .card_post {
    margin: 50px 100px;
  }
}
.card-comment-active {
  width: 100%;
  background: #fff;
  border-radius: 16px;
  padding:32px;
  margin-bottom: 50px;
  border: 1px solid #FFD7D7;
}
.card_comment {
  width: 100%;
  object-fit: cover;
}
.card_title {
  text-align:center;
  font-size: 1.8rem;
}
.card_sub {
  text-align: center;
  color:#666;
  font-weight: 500;
}
.card-header {
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid rgba(0,0,0,.125);
}
.card-body {
  padding: 1.25rem;
}
.button {
  background: #FD2D01;
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1.2rem;
  width: 50%;
  padding: .8rem;
  margin-top: 1.5rem;
  transition: .4s background-color;
  }
.card_action {
  color: #265beb!important;
  text-decoration: underline !important;
}
.card_action:hover {
  cursor:pointer;
}
.button:hover {
  cursor: pointer;
  background: #FFD7D7;
  color: #000;
}
.info-identity {
  color: #000;
  padding: 0.5rem!important;
}
.credit {
  color: blue!important;
}
.max-height-fit {
  max-height: 400px;
  object-fit: cover;
}
/* POSTS */
.createPost-btn {
  background: #FD2D01;
  width: 30%;
  border-radius: 8px;
}
.createPost-btn:hover {
  background: #FFD7D7;
  cursor:pointer;
}
.textarea {
  width: 100%;
  height: 93px;
}
.infopost {
  position: relative;
}
.userpicture {
  object-fit: cover;
  margin-right: 18px;
  height: 55px;
  width: 55px;
}
.userpicture_post {
  height: 70px;
  width: 70px;
  margin-right: 10px;
  border-radius: 100%;
  object-fit: cover;
}
.imagePost {
  object-fit: cover;
  max-height: 500px;
  width: 100%;
  margin: 0px;
  padding: 0px;
  border-radius: 16px;
}
.card-footer {
  padding: 0.75rem 1.25rem;
  background-color: rgba(0,0,0,.03);
  border-top: 1px solid rgba(0,0,0,.125);
}
.message_bloc {
  background-color: cadetblue;
}
.description {
  display: block;
  padding-top: 15px;
  padding-bottom: 10px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  color: #091f43;
}
.username {
  font-weight: bold;
  font-size: 19px;
  color: #091f43;
}
.postdate {
  font-size: 50;
  color: #2c3e50;
}
.bg-white {
  background-color: #fff;
}
.posts:hover .deletePost {
    display: inline;
}
.deletePost {
  height: 20px;
  position: absolute;
  right: 20px;
  display: none;
  cursor: pointer;
}
.delete {
  height: 15px;
  position: absolute;
  top: 5px;
  right: 10px;
  display: none;
  cursor: pointer;
  margin-left: 20px;
}
/* REACT */
.react {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 5px;
}
.like {
  margin: auto;
  cursor: pointer;
}
.heart {
  animation: heart 0.3s cubic-bezier(0.06, 1.16, 0.83, 0.67);
}
.svg-react:hover {
  fill: #aaaaaa;
  animation: heart 0.5s cubic-bezier(0.06, 1.16, 0.83, 0.67) forwards;
}
@keyframes heart {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}
.nbr {
  font-weight: 300;
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
}
.comment {
  margin: auto;
}
.disp {
  display: none;
}
.comments {
  display: flex;
}
.userpicture2 {
  object-fit: cover;
  height: 40px;
  width: 40px;
  margin-left: 20px;
}
.commentaire {
  background-color: #f0f2f5;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 10px;
  position: relative;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 20px;
}
.commentaire:hover .delete{
  display: block;
}
.commentText {
  margin-left: 10px;
  margin-right: 10px;
  color: #091f43;
}
.commentAuthor {
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 10px;
  color: #091f43;
}
</style>