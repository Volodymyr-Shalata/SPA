
function generateAllUsersHTML(data){

    var theTemplateScript = userTemplate.html();

    //Compile the template?
    var theTemplate = Handlebars.compile (theTemplateScript);
    userlist.empty();
    userlist.append(theTemplate(data));
    if(allUsers.hasClass('noDisplay')){
        allUsers.removeClass('noDisplay');
    }

    userlist.find('li').find('button').on('click', function (e) {
        e.preventDefault();
        var userIndex = $(this).find('a').attr('data-id');
        window.location.hash = 'user/' + userIndex;
    });
}