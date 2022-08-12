var UrlGetTransacciones = 'http://20.216.41.245:90/G5_19/controller/Transaccion.php?opc=GetTransacciones';
var UrlGetTransaccion = 'http://20.216.41.245:90/G5_19/controller/Transaccion.php?opc=GetTransaccion';
var UrlPostTransaccion = 'http://20.216.41.245:90/G5_19/controller/Transaccion.php?opc=InsertTransaccion';
var UrlPutTransaccion = 'http://20.216.41.245:90/G5_19/controller/Transaccion.php?opc=UpdateTransaccion';
var UrlDeleteTransaccion = 'http://20.216.41.245:90/G5_19/controller/Transaccion.php?opc=DeleteTransaccion';

$(document).ready(function () {
    CargarTransaccion();
});

function CargarTransaccion() {
    $.ajax({
        url: UrlGetTransacciones,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var MiItems = response;
            var Valores = '';

            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>' +
                    '<td>' + MiItems[i].Codigo_de_Transaccion + '</td>' +
                    '<td>' + MiItems[i].Tipo_de_Transaccion + '</td>' +
                    '<td>' + MiItems[i].Codigo_de_Cliente + '</td>' +
                    '<td>' + MiItems[i].Fecha_de_Transaccion + '</td>' +
                    '<td>' + MiItems[i].Monto_de_Transaccion + '</td>' +
                    '<td>' + MiItems[i].Sucursal + '</td>' +
                    '<td>' + MiItems[i].Numero_de_Cuenta + '</td>' +
                    '<td>' +
                    '<button class="btn btn-info" onclick="Cargar1Transaccion(' + MiItems[i].Codigo_de_Transaccion + ')">Editar</button>' +
                    '<button class="btn btn-danger" onclick="EliminarTransaccion(' + MiItems[i].Codigo_de_Transaccion + ')">Eliminar</button>' +
                    '</td>' +
                    '</tr>';
                $('#transacciones').html(Valores)
            }
        }
    });
}


function AgregarTransaccion() {

    var datostransaccion = {
        Codigo_de_Transaccion: $('#Codigo_de_Transaccion').val(),
        Tipo_de_Transaccion: $('#Tipo_de_Transaccion').val(),
        Codigo_de_Cliente: $('#Codigo_de_Cliente').val(),
        Fecha_de_Transaccion: $('#Fecha_de_Transaccion').val(),
        Monto_de_Transaccion: $('#Monto_de_Transaccion').val(),
        Sucursal: $('#Sucursal').val(),
        Numero_de_Cuenta: $('#Numero_de_Cuenta').val(),

    };
    
    var datostransaccionjson = JSON.stringify(datostransaccion);
    $.ajax({
        url: UrlPostTransaccion,
        type: 'POST',
        data: datostransaccionjson,
        datatype: 'JSON',
        contenttype: 'appplication/json',
        success: function(response) {
            console.log(response);
            alert('Transaccion agregada correctamente');
        },

        error: function(textStatus, errorThrow){
            alert('Error al agregrar transaccion'+textStatus + errorThrow);

        }

    }); 
     alert('aviso');

    }
   
    function Cargar1Transaccion(idtransaccion) {
        var datostransaccion = {
            Codigo_de_Transaccion: idtransaccion
        };
        var datostransaccionjson = JSON.stringify(datostransaccion);
    
        $.ajax({
            url: UrlGetTransaccion,
            type: 'POST',
            data: datostransaccionjson,
            datatype: 'JSON',
            contentType: 'application/json',
            success: function (response) {
                var MiItems = response;
                $('#Codigo_de_Transaccion').val(MiItems[0].Codigo_de_Transaccion);
                $('#Tipo_de_Transaccion').val(MiItems[0].Tipo_de_Transaccion);
                $('#Codigo_de_Cliente').val(MiItems[0].Codigo_de_Cliente);
                $('#Fecha_de_Transaccion').val(MiItems[0].Fecha_de_Transaccion);
                $('#Monto_de_Transaccion').val(MiItems[0].Monto_de_Transaccion);
                $('#Sucursal').val(MiItems[0].Sucursal);
                $('#Numero_de_Cuenta').val(MiItems[0].Numero_de_Cuenta);
                var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarTransaccion(' + MiItems[0].Codigo_de_Transaccion + ')"' +
                'value="Actualizar Transaccion" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);
            }
        });

    }
    function ActualizarTransaccion(idtransaccion) {
        var datostransaccion = {
        Codigo_de_Transaccion: idtransaccion,
        Tipo_de_Transaccion: $('#Tipo_de_Transaccion').val(),
        Codigo_de_Cliente: $('#Codigo_de_Cliente').val(),
        Fecha_de_Transaccion: $('#Fecha_de_Transaccion').val(),
        Monto_de_Transaccion: $('#Monto_de_Transaccion').val(),
        Sucursal: $('#Sucursal').val(),
        Numero_de_Cuenta: $('#Numero_de_Cuenta').val(),
            
            
        };
    
        var datostransaccionjson = JSON.stringify(datostransaccion);
        //alert(datossociojson);
        $.ajax({
            url: UrlPutTransaccion,
            type: 'PUT',
            data: datostransaccionjson,
            datatype: 'JSON',
            contentType: 'appplication/json',
            success: function (response) {
                console.log(response);
                alert('Transaccion actualizada correctamente');
            },
            error: function(textStatus, errorThrow){
                alert('Error al actualizar transaccion'+textStatus + errorThrow);
            }
            

    
        }); 
        alert('aviso');
    }

    function EliminarTransaccion(idtransaccion) {
        var datostransaccion = { 
            Codigo_de_Transaccion:idtransaccion
        };
        var datostransaccionjson = JSON.stringify(datostransaccion);
    
        $.ajax({
            url: UrlDeleteTransaccion,
            type: 'DELETE',
            data: datostransaccionjson,
            datatype: 'JSON',
            contenttype: 'application/json',
            success: function (response) {
                console.log(response);
            
            }
            
        });
        alert("Transaccion Eliminada");
        CargarTransaccion()
    }


