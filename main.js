//validacion de datos
function validateForm(){

  let email = document.getElementById('inputEmail').value;
  let name = document.getElementById('inputName').value;
  let phone = document.getElementById('inputPhone').value;

  if (email == "") {
      alert('Se requiere capturar Correo');
      return false;
  }else if (!email.includes("@")) {
      alert('El correo capturado no es valido');
      return false;
  }

  if (name == "") {
      alert('Se requiere capturar Nombre');
      return false;
  }

  if (phone == "") {
      alert('Se requiere capturar un numero telefonico');
      return false;
  }

  return true;
}

//leer informacion
function showData(){

  let listPeople;

  if (localStorage.getItem('listPeople') == null) {
      listPeople = [];
  }else{
      listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }

  var html = "";

  listPeople.forEach(function(element, index){
      html += "<tr>";
      html += "<td>" + element.email + "</td>";
      html += "<td>" + element.name + "</td>";
      html += "<td>" + element.phone + "</td>";
      html += '<td><button onclick="deleteData('+ index +')" class="btn btn-danger">Eliminar</button> <button onclick="updateData('+ index +')" class="btn btn-warning">Editar</button></td>';
      html += "</tr>";
  });

  document.querySelector('#tableData tbody').innerHTML = html;
}

//CREAR
document.onload = showData();

function AddData(){
  if (validateForm() == true) {
      let email = document.getElementById('inputEmail').value;
      let name = document.getElementById('inputName').value;
      let phone = document.getElementById('inputPhone').value;

      var listPeople;
      if (localStorage.getItem('listPeople') == null) {
          listPeople = [];
      }else{
          listPeople = JSON.parse(localStorage.getItem("listPeople"));
      }

      listPeople.push({
          email: email,
          name: name,
          phone: phone,
      });

      localStorage.setItem('listPeople', JSON.stringify(listPeople));

      showData();

      document.getElementById('inputEmail').value = "";
      document.getElementById('inputName').value = "";
      document.getElementById('inputPhone').value = "";
  }
}

/*ELIMINAR */
function deleteData(index){

  var listPeople;
  if (localStorage.getItem('listPeople') == null) {
      listPeople = [];
  }else{
      listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }

  listPeople.splice(index, 1);
  localStorage.setItem('listPeople', JSON.stringify(listPeople));
  showData();
}

/*ACTUALIZAR */

function updateData(index){
  document.getElementById("btnAdd").style.display = 'none';
  document.getElementById("btnUpdate",btnAdd).style.display = 'block';

  var listPeople;
  if (localStorage.getItem('listPeople') == null) {
      listPeople = [];
  }else{
      listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }

  document.getElementById('inputEmail').value = listPeople[index].email;
  document.getElementById('inputName').value = listPeople[index].name;
  document.getElementById('inputPhone').value = listPeople[index].phone;

  document.querySelector("#btnUpdate").onclick = function(){
      if (validateForm() == true) {
          listPeople[index].email = document.getElementById('inputEmail').value;
          listPeople[index].name = document.getElementById('inputName').value;
          listPeople[index].phone = document.getElementById('inputPhone').value;

          localStorage.setItem('listPeople', JSON.stringify(listPeople));
          showData();

          document.getElementById('inputEmail').value = "";
          document.getElementById('inputName').value = "";
          document.getElementById('inputPhone').value = "";

          document.getElementById("btnAdd").style.display = 'block';
          document.getElementById("btnUpdate",btnAdd).style.display = 'none';
      }
  };
}