
var users = [],
    allUsers = $('.all-users'),
    userlist = $('.all-users .users-list'),
    userTemplate =  $("#users-template"),
    singleUser = $('.single-user'),
    allUsersList = $('.all-users .users-list > li'),
    newUser = $('.new-user-page')
    ;

// Get data about our users from users.json.

$.getJSON("users.json", function (data) {

    // Write the data into our global variable.
    users = data;

    $.getScript("js/list.js")
        .done(function() {
            generateAllUsersHTML(users);
        });

    // Manually trigger a hashchange to start the app.
    $(window).trigger('hashchange');
});

$(window).on('hashchange', function(){
    render(window.location.hash);
});


// Navigation

function render(url) {

    var temp = url.split('/')[0];

    $('.main-content .page').removeClass('visible');

    var	map = {

        // The "Homepage".
        '': function() {

            $.getScript("js/userPage.js")
                .done(function() {
                    renderUsersPage(users);
                });
        },

        // Single Users page.
        '#user': function() {
            //
            $.getJSON("users.json", function (data) {
                users = data;
                var index = url.split('#user/')[1].trim();

                $.getScript("js/user.js")
                    .done(function() {
                        renderSingleUserPage(index,users);
                    });
            });
        },
        // New User page.
        '#new': function(){
            $.getScript("js/create.js")
                .done(function() {
                    renderNewUserPage();
                });
        }

    };

    // Execute the needed function depending on the url keyword (stored in temp).
    if(map[temp]){
        map[temp]();
    }
    // Else - render error page
    else {
        $.getScript("js/error.js")
            .done(function() {
                renderErrorPage();
            });
    }

}