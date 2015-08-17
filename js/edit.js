function editUser(){
    var edits = {};
    $.each($('#editUser').serializeArray(), function(i,field){
        edits[field.name] = field.value;
    });

    edits.Address = {'Street': edits.Street,
        'City': edits.City,
        'State': edits.State,
        'Zip': edits.Zip
    };

    $.getScript("js/functions.js")
        .done(function() {
            removeObjProperties(edits,['Street','City','State','Zip']);
        });

    $.post('save_json.php', {editUser : edits}, function(response){
        var data = $.parseJSON(response);
        generateAllUsersHTML(data);
        window.location.hash ='';
    });
}