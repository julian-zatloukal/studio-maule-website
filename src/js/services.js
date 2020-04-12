$(function() {
  $('.services-modal').on('show.bs.modal', function(event) {
    
    var large_body = $(event.relatedTarget)
      .parents('.card')
      .attr('data-large-body');
    var title = $(event.relatedTarget)
        .parent()
      .siblings('.service-card-title')
      .text();

      console.log(large_body)
    var modal = $(this);
    modal.find('.modal-title').text(title);
    modal.find('.modal-body-container p').html(large_body);
  });
});
