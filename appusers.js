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
let busca;
tabla.innerHTML = "";
db.collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    
    

    tabla.innerHTML += `
                <tr>
                    <td>${doc.id}</td>
                    <td>${doc.data().country}</td>
                    <td>${doc.data().city}</td>
                    <td id="levels">  
                    ${hacer(doc.id)}
                    </td>
                </tr>
        `
  });

  function hacer(busca){
    db.collection('users').doc(busca).collection('levels').get().then((querySnapshot) => {
      querySnapshot.forEach((docu) => {
        console.log(`${docu.id} => ${docu.data().status}`);
        document.getElementById("levels").innerHTML += `<td>
        ${
          docu.id + " "+docu.data().status
        }</td>`
      });})
  }
  
    
  
})

