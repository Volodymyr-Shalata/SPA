function deleteUser(){
    var id = $("input[name='id']").val();
    $.post('save_json.php', {'operation': 'delete', 'id': id}, function(response){
        var data = $.parseJSON(response);
        generateAllUsersHTML(data);
        window.location.hash ='';
    });
}