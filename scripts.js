var notes;
var sess;
WL.Event.subscribe("auth.login", onLogin);
                WL.init({
                    client_id: APP_CLIENT_ID,
                    redirect_uri: "http://localhost",
                    scope: "wl.signin office.onenote_update",
                    response_type: "token"
                });
                WL.ui({
                    name: "signin",
                    element: "signin"
                });
                function onLogin (session) {
                    if (!session.error) {
                        sess = session;
//                        alert('xxx' + session.session.access_token);
                        $.ajax({
                           url: "https://www.onenote.com/api/v1.0/me/notes/pages",
                           type: "GET",
                           beforeSend: function(xhr){
                                xhr.setRequestHeader('Authorization','Bearer ' + session.session.access_token);
                                //xhr.responseText("Title", "New OneNote");
                               
                           },
                           success: function(data){
                           showElements();
                           var list = $('#Notes');
                           if(data.value != null){
                               notes = data;
                               console.log(data.value[0].body);
                               console.log(data.value[0].title);
                                $("#Body").val(data.value[0].body);
                                $("#NoteTitle").val(data.value[0].title);
                                for(var i = 0; i < data.value.length; i++){
                                    //console.log(data.value[i]);
                                    list.append('<li id="note' + i + '" class = "well well-sm"><a onclick="displayNote('+i+')">' + data.value[i].title + "</a></li>");
                                    
                                    }//end for
                                }//end if
                            },
                            error: function(response) {
                                alert(response.status + " " + response.statusText);
                                console.log(response.statusText);
                                console.log(response);
                                console.log(response.status + " " + response.statusText);
                            }
                        });
                        WL.api({
                            path: "me",
                            method: "GET"
                        }).then(
                            function (response, session) {
//                                  debugger;
//                                  var access_token = WL.getLastAccessToken();
                                  console.log("Logged In.");
//                                document.getElementById("info").innerText =
//                                    "Hello, " + response.first_name + " " + response.last_name + "!";
                                  
                                  //$("#signin").setAttribute("onclick", "reload()");
                            },
                            function (responseFailed) {
                               alert("Error calling API: " + responseFailed.error.message);
                            }
                        );
                    }
                    else {
                            alert("Error signing in: " + session.error_description);
                    }
                }


if(window.location.href.indexOf("#access_token") > -1) {
    
    var url = window.location.href;
    console.log(url);
//    debugger;
    access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
    console.log(access_token);
    showWelcomeMessage(access_token);
}

function reloadpage(){
    location.reload();
    $("#signin").removeAttr("onclick")
}//end reload page


function userSignedIn(err, accesstoken) {
    
    console.log('userSignedIn called');
    if (!err) {
        console.log("token: " + accesstoken);
        
    }
    else {
        console.error("error: " + err);
    }
}//end Signed in

function showElements(){
    $('.hiden').removeClass('hiden');
    $("#NoteTitle").prop("disabled", true);
    $("#Body").prop("disabled", true);
    $("#NavRight").append("<li><a onclick='newNote();'>Add</a></li>" +
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
}

function newNote(){
    
$.ajax({
    url: "https://www.onenote.com/api//v1.0/me/notes/pages",
    type: "POST",
    //data: "file.html",
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization','Bearer ' + sess.session.access_token);
        xhr.setRequestHeader('Content-Type', 'text/html');
        xhr.setRequestHeader('Presentation', "<html><head><title>NewNote</title><meta uft-8/></head><body></body></html>");
    },
    success: function(data){
        console.log(data);
    },
    error: function(response) {
        alert(response.status + " " + response.statusText + "\n " + response.responseText);
        console.log(response);
        console.log(response.status + " " + response.statusText);
        }

    });
}

function displayNote(num){
//    $.ajax({
//       url: "https://www.onenote.com/api/v1.0/me/notes/pages/" + num + "/preview/",
//       type: "GET",
//       beforeSend: function(xhr){xhr.setRequestHeader('Authorization','Bearer ' + sess.session.access_token)},
//       success: function(data){
//           console.log(data);
//       },
//        error: function(response) {
//            alert(response.status + " " + response.statusText);
//            console.log(response);
//            console.log(response.status + " " + response.statusText);
//        }
//    
//    });

    //console.log(notes.value[num]);
    $("#Body").val(notes.value[num].body);
    $("#NoteTitle").val(notes.value[num].title);
}

function showWelcomeMessage(access_token) {
    $('#SignIn').hide();
    $('.hiden').removeClass('hiden');
    
    for (i = 1; i < 26; i++) { 
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
    
    //console.log("Ajax Call");
    //console.log(access_token);
    //ajaxcall(access_token);
    //console.log("End Ajax Call");
}//end showWelcome()

function ajaxcall(access_token){
    $.ajax({
        url: "https://www.onenote.com/api/v1.0/me/notes/page",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization','Bearer ' + access_token);},
        success: function(response){
            console.log(response);
            var thing = response;

        },
        error: function(response) {
            alert(response.status + " " + response.statusText);
            console.log(response);
            console.log(response.status + " " + response.statusText);
        }
    });//end ajax call
}