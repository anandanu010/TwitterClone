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

       $(realUserName).replaceWith(
         '<input type="text" class="form-control" value="'+ $(realUserName).text() +'" aria-describedby="basic-addon1">'
       );

       $(userDescription).replaceWith(
         '<input type="text" class="form-control" value="'+ $(userDescription).text() +'" aria-describedby="basic-addon1">'
       );

       var profilePic = $('.profilePictureImg');
       var coverPic = $('#profilePageJumbo');

       var editButton = $(this);
       $(editButton).replaceWith(
        '<form action="" method="" class="">'
        +
        '<a href="/myProfile" class="btn btn-default">Cancel</a>'
        +
        '<input type="submit" value="Save Changes" class="updateUser btn btn-default" id="">'
        +
        '</form>'
       );
   });

   $('.updateUser').on('click', function(e){
     var realUserName = $('.realName');
     var userDescription = $('.userDescription');
     $.ajax({
       url: "/editUser",
       type: "POST",
       dataType: "json",
       data: {
         realName: $(realUserName).text(),
         userDescription: $(userDescription).text()
       },
       contentType: "application/json",
       cache: false,
       timeout: 5000,
       complete: function(){
         console.log("Process complete");
       },
       success: function(){
         console.log("process success");
       },
       error: function(){
         console.log("process error");
       },
     });
   });
 })
