$(function() {

  $('.add-item').on('click', function(){
    var productId = $(this).attr('id');
    $.ajax({
      url: '/add_item',
      type: 'POST',
      cache: false,
      contentType : 'application/json',
      dataType: "json",
      data: JSON.stringify({ product_id: productId }),
      success: function(data){
        swal({
          title: "Cart",
          text: "The item has been added to your shopping cart",
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: function(jqXHR, textStatus, err){
        alert('text status '+textStatus+', err '+err)
      }
    })
  });

});
