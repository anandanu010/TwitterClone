$(function(){
   $('.editable').on('click', function(e){
      // this might be missing all the attributes
      var liElement = $(this).parent(); // this gives us the li element
      var ID = $(this).attr('id'); // get id for the status
      var deleteElement = $(liElement).children('.delete'); // gets our delete button

      $(liElement).replaceWith('<textarea>' + this.innerHTML +'</textarea>'+ '<a href="/saveStatus" id='+ ID + 'class="save">Save</a>' );

      //var saveButton = $(liElement).children('.save').toggle();
       //var parameters = { search: $(this).val() };
        // $.get( '/searching',parameters, function(data) {
      //   $('#results').html(data);
      // });
   });
 })
