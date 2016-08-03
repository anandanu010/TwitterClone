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
   //$('.updateStatus').on('click', function(e){
     // may look at getting previous element in dom as this might return more than one
  //   var id = $(this).attr('id');
     // traverse the dom, go to parent then to child of tat parent
  //   var text = $(this).parent.children('.editedStatus').val();

  //   $.post(""){

  //   }
  // }
 })

