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


    $('#saveEdits').on('click', function(e){
        e.preventDefault();
        $.getScript("js/edit.js")
            .done(function() {
                editUser();
            });
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