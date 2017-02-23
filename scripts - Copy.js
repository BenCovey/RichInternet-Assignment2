 var ADAL = new AuthenticationContext({
     instance: 'https://login.live.com/oauth20_authorize.srf?client_id=70401ece-6d41-4072-8bba-68e28f2964f8&scope=wl.signin&response_type=token&redirect_uri=https://login.live.com/oauth20_desktop.srf/',
     tenant: 'COMMON', //COMMON OR YOUR TENANT ID
     clientId: '70401ece-6d41-4072-8bba-68e28f2964f8', //This is your client ID
     redirectUri: 'http://localhost/', //This is your redirect URI
     state: "Access_token",
     type: "token",
     
     scope: "wl.signin",
     grant_type: "client_credentials",

     callback: userSignedIn,
     popUp: false

});


if(window.location.href.indexOf("#access_token") > -1) {
    showWelcomeMessage(accesstoken);
    var url = window.location.href;
    console.log(url);
//    debugger;
    access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
    console.log(access_token);
//    showWelcomeMessage(access_token);
}

function reloadpage(){
    location.reload();
}//end reload page

function signIn() {
    
    ADAL.login();
}//end sign it

function userSignedIn(err, accesstoken) {
    
    console.log('userSignedIn called');
    if (!err) {
        console.log("token: " + accesstoken);
        
    }
    else {
        console.error("error: " + err);
    }
}//end Signed in


function showWelcomeMessage(token) {
//    var user = ADAL.getCachedUser();
    console.log(document);
    $('#SignIn').hide();
    $('.hidden').removeClass('hidden');
    
    
    for (i = 1; i < 26; i++) { 
        //Notes.innerHTML += "<li id='note" + i + "' class = 'well well-sm'><a>Note Example " + i + "</a></li>" 
        $("#Notes").append("<li id='note" + i + "' class = 'well well-sm'><a>Note Example " + i + "</a></li>" );
    }//end for
    
    $("#NavRight").append("<li><a>Add</a></li>" +
                  "<li><a>Save</a></li>" +
                  "<li><a>Edit</a></li>" +
                  "<li id='spacer' >|</li>" +
                  "<li><a>Delete</a></li>" +
                  "<li class='dropdown'>" +
                  "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>..." +
                  "<span class='caret'></span></a>" +
                  "<ul class='dropdown-menu'>" +
                  "<li><a href='#'>About</a></li>" +
                  "</ul>" +
                  "</li>");
    
//    console.log("Ajax Call");
//    debugger;
//    console.log(access_token);
//    //ajaxcall(access_token);
//    $('.hidden').removeClass('hidden');
//    console.log("End Ajax Call");
}//end showWelcome()

function ajaxcall(access_token){
    $.ajax({
        url: "https://www.onenote.com/api/v1.0/me/notes/pages",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization','Bearer ' + access_token);},
        success: function(response){
            var thing = response;
            console.log(response);
        },
        error: function(response) {
            alert(response.status + " " + response.statusText);
            console.log(response);
            console.log(response.status + " " + response.statusText);
        }
    });//end ajax call
}