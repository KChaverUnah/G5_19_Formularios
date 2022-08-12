var UrlBancos = 'http://20.216.41.245:90/G5_19/controller/ServicioBancario_Banco.php?opc=Getbancos';
var UrlInsertBanco ='http://20.216.41.245:90/G5_19/controller/ServicioBancario_Banco.php?opc=Insertbanco';
var UrlGetBanco ='http://20.216.41.245:90/G5_19/controller/ServicioBancario_Banco.php?opc=Getbanco';
var UrlUpdateBanco ='http://20.216.41.245:90/G5_19/controller/ServicioBancario_Banco.php?opc=Updatebanco';
var UrlDeleteBanco ='http://20.216.41.245:90/G5_19/controller/ServicioBancario_Banco.php?opc=Deletebanco';
$(document).ready(function(){
    CargarBancos();
});

function CargarBancos() {
    $.ajax({
        url: UrlBancos,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var MiItems = response;
            var Valores = '';

            for(i=0;i< MiItems.length;i++){
                Valores += '<tr>'+            
                '<td>'+ MiItems[i].CodigoBanco +'</td>'+
                '<td>'+ MiItems[i].NombreBanco +'</td>'+
                '<td>'+ MiItems[i].OficinaPrincipal +'</td>'+
                '<td>'+ MiItems[i].CantidadSucursales +'</td>'+
                '<td>'+ MiItems[i].FechaFundación +'</td>'+
                '<td>'+ MiItems[i].pais +'</td>'+
                '<td>'+ MiItems[i].RTN +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarBanco('+ MiItems[i].CodigoBanco +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarBanco('+ MiItems[i].CodigoBanco +')">Eliminar</button>'+
                '</td>'+
                '</tr>';
            $('#DataBancos').html(Valores);

            }
        }
    });
}

function AgregarBanco(){
    var datosbanco = {
        CodigoBanco :$('#CodigoBanco').val(),
        NombreBanco :$('#NombreBanco').val(),
        OficinaPrincipal :$('#OficinaPrincipal').val(),
        CantidadSucursales : $('#CantidadSucursales').val(),
        FechaFundación :$('#FechaFundación').val(),
        pais :$('#pais').val(),
        RTN :$('#RTN').val()

    };
    var datosbancojson =JSON.stringify(datosbanco)

    $.ajax({ 
        url: UrlInsertBanco,
        type: 'POST',
        data: datosbancojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response)
            alert('Banco Agregado correctamente');
        },
        error: function(textStatus, errorThrow){
               alert('Banco NO se ha podido agregar' + textStatus + errorThrow);

        }
    });
    alert('Aviso');

}

function CargarBanco(idBanco){
    var datosbanco = {
        CodigoBanco: idBanco
    };
    var datosbancojson= JSON.stringify(datosbanco);

    $.ajax({
        url: UrlGetBanco,
        type: 'POST',
        data:datosbancojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#CodigoBanco').val(MiItems[0].CodigoBanco);
            $('#NombreBanco').val(MiItems[0].NombreBanco);
            $('#OficinaPrincipal').val(MiItems[0].OficinaPrincipal);
            $('#CantidadSucursales').val(MiItems[0].CantidadSucursales);
            $('#FechaFundación').val(MiItems[0].FechaFundación);
            $('#pais').val(MiItems[0].pais);
            $('#RTN').val(MiItems[0].RTN);
            var btnactualizar= '<input type="submit" id="btn_actualizar" onclick="ActualizarBanco('+MiItems[0].CodigoBanco+')"'+
            'value="Actualizar Banco" class="btn btn-primary"></input>';
            $('#btnagregarBanco').html(btnactualizar);
        }
    });

}

function ActualizarBanco(idBanco){
    var datosbanco = {
        CodigoBanco: idBanco,
        NombreBanco:$('#NombreBanco').val(),
        OficinaPrincipal: $('#OficinaPrincipal').val(),
        CantidadSucursales: $('#CantidadSucursales').val(),
        FechaFundación: $('#FechaFundación').val(),
        pais: $('#pais').val(),
        RTN: $('#RTN').val()
    };
    var datosbancojson = JSON.stringify(datosbanco);

    $.ajax({
        url: UrlUpdateBanco,
        type: 'PUT',
        data: datosbancojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            alert("Banco Actualizado");
        },
        error: function(textStatus, errorThrow){
            alert('Banco NO se ha podido Actualizar' + textStatus + errorThrow);
        }

    });
    alert("Aviso");

}

function EliminarBanco(idBanco){
    var datosbanco = {
        CodigoBanco: idBanco
    };
    var datosbancojson= JSON.stringify(datosbanco);

     $.ajax({
        url:UrlDeleteBanco,
        type:'DELETE',
        data: datosbancojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        },
        error: function(textStatus, errorThrow){
            alert('Banco NO se ha podido Eiminar' + textStatus + errorThrow);
        }
    });
     alert("Banco Eliminado");
     CargarBancos();

}