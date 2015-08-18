function renderSingleUserPage(index,users){

    singleUser.empty();
    var editUserTemplate = $('#edit-user-template').html();

    var theTemplate = Handlebars.compile (editUserTemplate);
    var index = window.location.hash.split('#user/')[1].trim();
    for(var i = 0; i<users.length; i++){
        if(users[i]['id'] == index){
            singleUser.append(theTemplate(users[i]));
        }
    }
    if(singleUser.hasClass('noDisplay')){
        singleUser.removeClass('noDisplay');
    }
    var error;
    //Add validation to the input data
    $('#editUser').validate({
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

    $('#saveEdits').on('click', function(e){
        e.preventDefault();

        error = false;
        //Check all input fields
        $.each($('.form-group'), function(){
            if($(this).find('input').val() == "" || $(this).hasClass('has-error')){
                error = true;
            }
        });
        if(error == false){
            $.getScript("js/edit.js")
                .done(function() {
                    editUser();
                });
        }
    });

    $('#deleteUser').on('click', function(e){
        e.preventDefault();
        $.getScript("js/delete.js")
            .done(function() {
                deleteUser();
            });
    });

    allUsers.addClass('noDisplay');
    newUser.addClass('noDisplay');
}