var process = function(){
    var name = $('#name').val();

    $.post( "/native", {name:name}, function( data ) {
        $( "#result" ).html( data.value );
    });
};