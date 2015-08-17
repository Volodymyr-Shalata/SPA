function renderNewUserPage(){

    allUsers.addClass('noDisplay');
    newUser.empty();
    var newUserTemplate = $('#new-user-template').html();

    var theTemplate = Handlebars.compile (newUserTemplate);
    newUser.append(theTemplate());
    if(newUser.hasClass('noDisplay')){
        newUser.removeClass('noDisplay');
    }

    $('#create-user').on('click', function(e){
        e.preventDefault();
        createUser();
    });

    $("#add-new-user").addClass("noDisplay");

    userlist.addClass('noDisplay');
    singleUser.addClass('noDisplay');

}

function createUser(){
    var values = {};
    $.each($('#newUser').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });
    values.Address = {'Street': values.Street,
        'City': values.City,
        'State': values.State,
        'Zip': values.Zip
    };

    $.getScript("js/functions.js")
        .done(function() {
            values = removeObjProperties(values,['userStreet','userCity','userState','userZip']);
        });

    $.post('save_json.php', {newUser :values}, function(response){
        var data = $.parseJSON(response);
        $.getScript("js/list.js")
            .done(function() {
                generateAllUsersHTML(data);
            });
        newUser.addClass('noDisplay');
        window.location.hash ='';
    });
}