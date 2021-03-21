import firebase from 'firebase/app'
  import 'firebase/storage'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAC4C_vDq_4Q9xEYIV9e2ChZwIg20ktARE",
    authDomain: "myacademia-group-project.firebaseapp.com",
    projectId: "myacademia-group-project",
    storageBucket: "myacademia-group-project.appspot.com",
    messagingSenderId: "1079967307366",
    appId: "1:1079967307366:web:5e36f5b603d5f7bc7bffa7"
  };
  // Initialize Firebase
  export const app = firebase.initializeApp(firebaseConfig);