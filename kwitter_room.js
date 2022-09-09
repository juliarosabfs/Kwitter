  //Configurações do Firebase de seu App
  const firebaseConfig = {
    apiKey: "AIzaSyCg-MM0viOUEQjsMkjpAZofd3V3W2wcR7Y",
    authDomain: "teste-da-aula-b6aa2.firebaseapp.com",
    databaseURL: "https://teste-da-aula-b6aa2-default-rtdb.firebaseio.com",
    projectId: "teste-da-aula-b6aa2",
    storageBucket: "teste-da-aula-b6aa2.appspot.com",
    messagingSenderId: "317189971673",
    appId: "1:317189971673:web:b807e26bd6670ac66068c8"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Bem-vindo(a), " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adicionando nome da sala"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
  firebase_message_id = childKey;
  message_data = childData;
//Start code
  console.log(firebase_message_id);
  console.log(message_data);
  name = message_data['nome'];
  message = message_data['mensagem'];
  like = message_data['curtir'];
  name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
  message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
  span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

 row = name_with_tag + message_with_tag +like_button + span_with_tag;       
 document.getElementById("output").innerHTML += row;
//End code
} });  }); }
getData();

function updateLike(message_id)
{
  console.log("clicou no botão curtir - " + message_id);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(room_name).child(message_id).update({
		like : updated_likes  
	 });

}

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}

  function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "kwitter.html";
}
