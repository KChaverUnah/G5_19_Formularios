var UrlCuentas = 'http://20.216.41.245:90/G5_19/controller/Cuenta.php?opc=GetCuentas';
var UrlInsertCuenta = 'http://20.216.41.245:90/G5_19/controller/Cuenta.php?opc=InsertCuenta';
var UrlGetCuenta = 'http://20.216.41.245:90/G5_19/controller/Cuenta.php?opc=GetCuenta';
var UrlUpdateCuenta = 'http://20.216.41.245:90/G5_19/controller/Cuenta.php?opc=UpdateCuenta';
var UrlDeleteCuenta = 'http://20.216.41.245:90/G5_19/controller/Cuenta.php?opc=DeleteCuenta';

$(document).ready(function(){
    CargarCuentas();
});

function CargarCuentas(){
    $.ajax({
        url: UrlCuentas,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i= 0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].Numero_Cuenta +'</td>'+
                '<td>'+ MiItems[i].Nombre_Cuenta +'</td>'+
                '<td>'+ MiItems[i].Numero_Cliente +'</td>'+
                '<td>'+ MiItems[i].Fecha_Apertura +'</td>'+
                '<td>'+ MiItems[i].Saldo_Actual +'</td>'+
                '<td>'+ MiItems[i].Saldo_Retenido +'</td>'+
                '<td>'+ MiItems[i].Tipo_Moneda +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarCuenta('+ MiItems[i].Numero_Cuenta +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarCuenta('+ MiItems[i].Numero_Cuenta +')">Eliminar</button>'+
                '</td>'+
             '</tr>';
              $('#DataCuentas').html(Valores);
            }
        }
    });
};

function AgregarCuenta(){
    var datoscuenta = {
        Numero_Cuenta: $('#Numero_Cuenta').val(),
        Nombre_Cuenta: $('#Nombre_Cuenta').val(),
        Numero_Cliente: $('#Numero_Cliente').val(),
        Fecha_Apertura: $('#Fecha_Apertura').val(),
        Saldo_Actual: $('#Saldo_Actual').val(),
        Saldo_Retenido: $('#Saldo_Retenido').val(),
        Tipo_Moneda: $('#Tipo_Moneda').val()
    };
    
    var datoscuentasjson= JSON.stringify(datoscuenta);
    
    $.ajax({
        url: UrlInsertCuenta,
        type:'POST',
        data: datoscuentasjson,
        datatype:'JSON',
        contenttype:'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('¡Cuenta Agregada Correctamente!');
        },
        error: function(textStatus, errorThrowm){
            alert('¡Error al Agregar la Cuenta!'+ textStatus + errorThrowm);
        }
   });
    alert('Aviso');
}

function CargarCuenta(idCuenta){
    var datoscuenta = {
        Numero_Cuenta: idCuenta
    };
    
    var datoscuentajson= JSON.stringify(datoscuenta);
    
    $.ajax({
        url: UrlGetCuenta,
        type: 'POST',
        data: datoscuentajson,
        datatype:'JSON',
        contentType: 'application/json',
        success: function(reponse){
            var MiItems = reponse;
            $('#Numero_Cuenta').val(MiItems[0].Numero_Cuenta);
            $('#Nombre_Cuenta').val(MiItems[0].Nombre_Cuenta);
            $('#Numero_Cliente').val(MiItems[0].Numero_Cliente);
            $('#Fecha_Apertura').val(MiItems[0].Fecha_Apertura);
            $('#Saldo_Actual').val(MiItems[0].Saldo_Actual);
            $('#Saldo_Retenido').val(MiItems[0].Saldo_Retenido);
            $('#Tipo_Moneda').val(MiItems[0].Tipo_Moneda);
            var btnactualizar= '<input type="submit" id="btn_actualizar" onclick="ActualizarCuenta(' + MiItems[0].Numero_Cuenta + ')"'+
            'value="Actualizar Cuenta" class="btn btn-primary"></input>';
            $('#btnagregarcuenta').html(btnactualizar);
        }       
    });
}

function ActualizarCuenta(idCuenta) {
    var datoscuenta = {
        Numero_Cuenta: idCuenta,
        Nombre_Cuenta: $('#Nombre_Cuenta').val(),
        Numero_Cliente: $('#Numero_Cliente').val(),
        Fecha_Apertura: $('#Fecha_Apertura').val(),
        Saldo_Actual: $('#Saldo_Actual').val(),
        Saldo_Retenido: $('#Saldo_Retenido').val(),
        Tipo_Moneda: $('#Tipo_Moneda').val()
    };

    var datoscuentajson = JSON.stringify(datoscuenta);
    
    $.ajax({
        url: UrlUpdateCuenta,
        type:'PUT',
        data: datoscuentajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert('¡Cuenta Actualizada Correctamente!');
        },
        error: function(textStatus, errorThrowm){
            alert('¡Error al Actualizar la Cuenta!'+ textStatus + errorThrowm);
        }
    });
    alert('Aviso');
}

function EliminarCuenta(idCuenta){
    var datoscuenta={
        Numero_Cuenta: idCuenta
    };
          
    var datoscuentajson= JSON.stringify(datoscuenta);
        
    $.ajax({
        url: UrlDeleteCuenta,
        type:'DELETE',
        data: datoscuentajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);
        }
    });
    alert('Cuenta Eliminada');
    CargarCuentas();     
}