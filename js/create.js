function renderNewUserPage(){

    allUsers.addClass('noDisplay');
    newUser.empty();
    var newUserTemplate = $('#new-user-template').html();

    var theTemplate = Handlebars.compile (newUserTemplate);
    newUser.append(theTemplate());
    if(newUser.hasClass('noDisplay')){
        newUser.removeClass('noDisplay');
    }

    $('#newUser').validate({
        rules: {
            Name: {
                minlength: 4,
                maxlength: 15,
                required: true
            },
            Email: {
                required: true,
                email: true
            },
            Telephone:{
                required: true,
                number: true
            },
            Street: {
                required: true
            },
            City: {
                required: true
            },
            State: {
                required: true
            },
            Zip: {
                required: true
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $('#create-user').on('click', function(e){
        e.preventDefault();
        var error = false;

        $.each($('.form-group'), function(){
            if($(this).find('input').val() == "" || $(this).hasClass('has-error')){
                error = true;
            }
        });
        if(!error){
            createUser();
        }
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