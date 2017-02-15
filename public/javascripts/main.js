$(function(){
   $('.editable').on('click', function(e){
      // this might be missing all the attributes
      var divElement = $(this).parent(); // this gives us the li element
      var liElement = $(divElement).parent();
      var actualStatusText = $(liElement).children('.statusText');
      var ID = $(this).attr('id'); // get id for the status
      var deleteElement = $(liElement).children('.delete'); // gets our delete button

      $(actualStatusText).replaceWith(
      '<form action="/saveStatus" method="POST" class="editForm">' +
      '<input type="hidden" name="statusid" value=' + ID + '>' +
      '<textarea id=' + ID + ' name="editedStatus" cols="55" class="editedStatus">' + $(actualStatusText).text() +'</textarea>' +
      '<input type="submit" value="Update Status" class="updateStatus btn btn-default" id=' + ID + '>' +
      '</form>'
     );
      var editButton = $(liElement).children('.buttons').remove();
   });

   $('.editUser').on('click', function(e){
       var realUserName = $('.realName');
       var userDescription = $('.userDescription');
       $('#uploadForm').toggle();
       $('#uploadProfileForm').toggle();
       $('#profilePageJumbo').addClass('redBorder');
       $('#profilePictureImg').addClass('redBorder');

       $(realUserName).replaceWith(
         '<input type="text" class="'+$(realUserName).attr('class')+' form-control" value="'+ $(realUserName).text() +'" aria-describedby="basic-addon1">'
       );

       $(userDescription).replaceWith(
         '<input type="text" class="'+$(userDescription).attr('class')+' form-control" value="'+ $(userDescription).text() +'" aria-describedby="basic-addon1">'
       );

       var profilePic = $('.profilePictureImg');
       var coverPic = $('#profilePageJumbo');

       var editButton = $(this);
       $(editButton).replaceWith(
        '<a href="/myProfile" class="btn btn-default">Cancel</a>'+
        '<input type="button" onClick="updateUser();" value="Save Changes" class="updateUser btn btn-default">'
       );
   });

   $('#follow').on('click', function(e){
     // Gives us the username to follow
     var username = $('.username').text().replace('@','');
     var followButton = $('#follow');
     console.log(followButton);

    $.ajax({
      url: '/addFollower',
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        userToFollow: username
      }),
      contentType: "application/json",
      cache: false,
      timeout: 5000,
      success: function(){
        console.log("process success");
        // Change the button to following and disable the button
        $(followButton).val('Following');
        $(followButton).attr('id','unfollow');
      },
      error: function(e){
        console.log('error');
        console.log(e.statusText);
      },
    });
   });

   $('#unfollow').on('click', function(e){
     // Gives us the username to follow
     var username = $('.username').text().replace('@','');
     var followButton = $('#unfollow');

    $.ajax({
      url: '/removeFollower',
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        userToRemove: username
      }),
      contentType: "application/json",
      cache: false,
      timeout: 5000,
      success: function(){
        // Change the button to following and disable the button
        $(followButton).val('Follow');
        $(followButton).attr('id','follow');
      },
      error: function(e){
        console.log(e.statusText);
      },
    });
   });

   $('.updateUser').on('click', function(e){
     console.log("clicked");
     var realUserName = $('.realName');
     var userDescription = $('.userDescription');
   });

   $('#headerImageUpload').change(function() {
      var data = new FormData();
      var headerImage = $('#profilePageJumbo');
      jQuery.each(jQuery('#headerImageUpload')[0].files, function(i, file) {
         data.append('file-'+i, file);
      });

      $.ajax({
          url: '/uploadHeaderPic',
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          type: 'POST',
          success: function(data){
             alert("upload successful");
             headerImage.css('background-image','url(' + data + ')');
          },
          error: function(e){
            console.log(e.statusText);
          }
      });
   });

   $('#profileFileUpload').change(function() {
      var data = new FormData();
      var profileImage = $('#profilePictureImg');
      jQuery.each(jQuery('#profileFileUpload')[0].files, function(i, file) {
         data.append('file-'+i, file);
      });

      $.ajax({
          url: '/uploadProfilePic',
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          type: 'POST',
          success: function(data){
             alert("upload successful");
             profileImage.attr('src', data);
          },
          error: function(e){
            console.log(e.statusText);
          }
      });
   });
});


function updateUser(){
     console.log('clicked');
     var realUserName = $('.realName');
     var userDescription = $('.userDescription');
     var username = $('.username').text();
     $.ajax({
       url: "/editUser",
       type: "POST",
       dataType: "json",
       data: JSON.stringify({
         realName: $(realUserName).val(),
         userDescription: $(userDescription).val()
       }),
       contentType: "application/json",
       cache: false,
       timeout: 5000,
       success: function(){
         console.log("process success");
         window.location = '/'+username.replace('@','');
       },
       error: function(e){
         console.log(e.statusText);
       },
     });
}
