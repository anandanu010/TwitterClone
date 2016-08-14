$(function(){
   $('.editable').on('click', function(e){
      // this might be missing all the attributes
      var divElement = $(this).parent(); // this gives us the li element
      var liElement = $(divElement).parent();
      var actualStatusText = $(liElement).children('.statusText');
      var ID = $(this).attr('id'); // get id for the status
      var deleteElement = $(liElement).children('.delete'); // gets our delete button

      $(actualStatusText).replaceWith(
      '<form action="/saveStatus" method="POST" class="editForm">'
      +
      '<input type="hidden" name="statusid" value=' + ID + '>'
      +
      '<textarea id=' + ID + ' name="editedStatus" cols="55" class="editedStatus">' + $(actualStatusText).text() +'</textarea>'
      +
      '<input type="submit" value="Update Status" class="updateStatus btn btn-default" id=' + ID + '>'
      +
      '</form>'
     );
      var editButton = $(liElement).children('.buttons').remove()
       //var parameters = { search: $(this).val() };
        // $.get( '/searching',parameters, function(data) {
      //   $('#results').html(data);
      // });
   });

   $('.editUser').on('click', function(e){
       var realUserName = $('.realName');
       var userDescription = $('.userDescription');
       var uploadForm = $('#uploadForm').toggle();
       var uploadProfileForm = $('#uploadProfileForm').toggle()
       var jumbotron = $('#profilePageJumbo').addClass('redBorder');
       var profilePic = $('#profilePictureImg').addClass('redBorder');

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
        '<a href="/myProfile" class="btn btn-default">Cancel</a>'
        +
        '<input type="button" onClick="updateUser();" value="Save Changes" class="updateUser btn btn-default">'
       );
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
            console.log("process error");
            console.log(e.statusText);
          }
      });
      console.log("changed!!");
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
             profileImage.css('background-image','url(' + data + ')');
          },
          error: function(e){
            console.log("process error");
            console.log(e.statusText);
          }
      });
   });
})


function updateUser(){
     console.log('clicked');
     var realUserName = $('.realName');
     var userDescription = $('.userDescription');
     console.log(profilePicUpload);
     console.log($(realUserName).val());
     console.log( $(userDescription).val());
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
       complete: function(){
         console.log("Process complete");
         //window.location = '/myprofile';
       },
       success: function(){
         console.log("process success");
         //window.location = '/myProfile';
       },
       error: function(e){
         console.log("process error");
         console.log(e.statusText)
       },
     });
}
