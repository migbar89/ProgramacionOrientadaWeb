function consultaApi(){
  console.log('consultaApi');
  axios.get('http://localhost:3003/users', {
    responseType: 'json'
  })
    .then(function(res) {
      if(res.status===200) {
        ClearTable();
        AddRows(res.data.data);
      }
    })
    .catch(function(err) {
      console.log(err);
    })
}
function AddRows(dataArray)
{
  dataArray.map((row)=>{
    console.log(row)
    var eliminar = `<button id='eliminar' name='eliminar' class='btn btn-danger' >Eliminar</button>`;
        var editar = "<button id='mas_r' name='mas_r' class='btn btn-info' onclick='javascript: editar()'>  Editar</button>";
        document.getElementById("table")
          .insertRow(-1)
          .innerHTML = '<tr id="n_row '+1+'"><td>'+ row.id + '</td><td>' + row.name + '</td><td>' + row.email + '</td><td>' + row.created_at + '</td><td> ' + editar + ' </td></tr>';

  })

}

function Save(){
  console.log('Save');
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var created_at = document.getElementById("created_at").value;
  var data = {
    id: id,
    name: name,
    email: email,
    created_at: created_at
  }

  axios.post('http://localhost:3003/user', data)
    .then(function(res) {
      console.log( "Codigo de Respuesta",res.status)
      if(res.status==200) {
        console.log("Mostrando Data");
        console.log(res.data.data);
        consultaApi();

      }
    })
    .catch(function(err) {
      console.log(err);
    })
}
function ClearTable()
{
  let tablaregistros = document.getElementById("table");
  while(tablaregistros.rows.length > 1) {
    tablaregistros.deleteRow(-1);
  }
}