var UrlClientes = 'http://20.216.41.245:90/G5_19/controller/cliente.php?opc=GetClientes';
var UrlInsertCliente = 'http://20.216.41.245:90/G5_19/controller/cliente.php?opc=InsertCliente';
var UrlGetCliente = 'http://20.216.41.245:90/G5_19/controller/cliente.php?opc=GetCliente';
var UrlUpdateCliente = 'http://20.216.41.245:90/G5_19/controller/cliente.php?opc=UpdateCliente';
var UrlDeleteCliente ='http://20.216.41.245:90/G5_19/controller/cliente.php?opc=DeleteCliente';

$(document).ready(function(){
    CargarClientes();
});

function CargarClientes(){
    $.ajax({
        url: UrlClientes,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+ 
                '<td>'+ MiItems[i].Numero_Cliente +'</td>'+
                '<td>'+ MiItems[i].Nombres +'</td>'+
                '<td>'+ MiItems[i].Apellidos +'</td>'+
                '<td>'+ MiItems[i].RTN +'</td>'+
                '<td>'+ MiItems[i].Fecha_Afiliacion +'</td>'+
                '<td>'+ MiItems[i].Saldo_Actual +'</td>'+
                '<td>'+ MiItems[i].Numero_de_Cuenta +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarCliente('+MiItems[i].Numero_Cliente +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarCliente('+MiItems[i].Numero_Cliente +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('#DataClientes').html(Valores);
            }
        }
    });
}

function AgregarCliente(){
    var datoscliente = {
        Numero_Cliente :$('#Numero_Cliente').val(),
        Nombres :$('#Nombres').val(),
        Apellidos :$('#Apellidos').val(),
        RTN :$('#RTN').val(),
        Fecha_Afiliacion :$('#Fecha_Afiliacion').val(),
        Saldo_Actual :$('#Saldo_Actual').val(),
        Numero_de_Cuenta :$('#Numero_de_Cuenta').val()
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlInsertCliente,
        type: 'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Cliente agregado correctamente');
        },
        error: function(textStatus, errorThrown ){
            alert('Error al agregar Cliente '+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarCliente(idCliente){
    var datoscliente = {
        Numero_Cliente:idCliente
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlGetCliente,
        type: 'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response){
            var MiItems = response;
            $('#Numero_Cliente').val(MiItems[0].Numero_Cliente);
            $('#Nombres').val(MiItems[0].Nombres);
            $('#Apellidos').val(MiItems[0].Apellidos);
            $('#RTN').val(MiItems[0].RTN);
            $('#Fecha_Afiliacion').val(MiItems[0].Fecha_Afiliacion);
            $('#Saldo_Actual').val(MiItems[0].Saldo_Actual);
            $('#Numero_de_Cuenta').val(MiItems[0].Numero_de_Cuenta);
            var btnactualizar = '<input type="submit" id="btn-actualizar" onclick="ActualizarCliente(' + MiItems[0].Numero_Cliente + ')"' +
            'value="Actualizar cliente" class="btn btn-primary"></input>';
            $('#btnagregarcliente').html(btnactualizar);

        }
    });
}

function ActualizarCliente(idCliente){
    var datoscliente = {
        Numero_Cliente :$('#Numero_Cliente').val(),
        Nombres :$('#Nombres').val(),
        Apellidos :$('#Apellidos').val(),
        RTN :$('#RTN').val(),
        Fecha_Afiliacion :$('#Fecha_Afiliacion').val(),
        Saldo_Actual :$('#Saldo_Actual').val(),
        Numero_de_Cuenta :$('#Numero_de_Cuenta').val()
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlUpdateCliente,
        type: 'PUT',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Cliente Actualizado');
        },
        error: function(textStatus, errorThrown ){
            alert('Error al actualizar el cliente'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');

}

function EliminarCliente(idCliente){
    var datoscliente = {
        Numero_Cliente: idCliente
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlDeleteCliente,
        type: 'DELETE',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response) {
            console.log(response);

        }
    });
    alert("Cliente Eliminado");
    CargarClientes();
}
