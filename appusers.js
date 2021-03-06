"use strict"
document.addEventListener("DOMContentLoaded", function () {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  // esto representa todos los datos de la bdd de Scrum Game exportados para usar en app web 
  var firebaseConfig = {
    apiKey: "AIzaSyBqdvaUqNByD_R0zIhLMRPDQ677iwSetMc",
    authDomain: "scrum-game-uade.firebaseapp.com",
    databaseURL: "https://scrum-game-uade.firebaseio.com",
    projectId: "scrum-game-uade",
    storageBucket: "scrum-game-uade.appspot.com",
    messagingSenderId: "919500917072",
    appId: "1:919500917072:web:0018ded1ca394039a70455",
    measurementId: "G-ES5W27SK2R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics(); // por alguna razon no es necesario
  var db = firebase.firestore();

  // Lectura de datos de mi db
  // mi tabla se llama id="users-table"
  let tabla = document.getElementById("users-table");
  tabla.innerHTML = "";
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      searchByMail(doc.id, doc.data().country);
      console.log(`${doc.id} => ${doc.data()}`);

    });

    function searchByMail(mail, country) {
      db.collection('users').doc(mail).collection('levels').get().then((querySnapshot) => {
        querySnapshot.forEach((docu) => {
          console.log(`${docu.id} => ${docu.data().status}`);
          tabla.innerHTML += `<th>${mail+" "+country}</th><td>
        ${docu.id + " " + docu.data().status
            }</td>`
        });
      })
    }



  }).catch(err => {
    console.log('Error en coleccion', err);
  });


  // FIN DEL DOC
});

