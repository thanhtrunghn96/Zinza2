// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require cocoon
//= require dropzone
//= require_tree .
//= require toastr

$(document).ready(function(){
  $('#new_post').submit(function(event) {
    event.preventDefault();
    var method = $(this).attr('method');
    var url = $(this).attr('action');
    var content = $(this).find('#post_content').val();
    $.ajax({
      method: method,
      url: url,
      data: { post: {content: content} },
      dataType: 'html',
      success: function(data) {
        var html = "<li>"+data.content+ "<button class = \"destroy-post\">Delete</button>"+"</li>";
        $(':input[type="submit"]').prop('disabled', false);
        $('#post_content').val('');
        $('#ul').prepend(data);
      },
       });
    });
    
    $(document).on('click', '.destroy-post', (event) => {
      event.preventDefault();
      var id = $(event.target).data('id');
      $.ajax({
        url: `/posts/${id}`,
        method: 'delete',
        dataType: 'json',
        data: {id: id},
        success: function(respone) {
          $(event.target).parent().remove();
        },
      });
    })
  });
// $('#btn').click(() => {}) thay cho function