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
//= require jquery-fileupload/basic
//= require_tree .
//= require toastr

//$(document).ready(function(){
  // $('#new_post').submit(function(event) {
  //   event.preventDefault();
  //   var method = $(this).attr('method');
  //   var url = $(this).attr('action');
  //   var content = $(this).find('#post_content').val();
  //   $.ajax({
  //     method: method,
  //     url: url,
  //     data: { post: {content: content} },
  //     dataType: 'html',
  //     success: function(partial) {
  //       $(':input[type="submit"]').prop('disabled', false);
  //       $('#post_content').val('');
  //       $('.post-box').append(partial);
  //     },
  //      });
  //   });
  //  });
  // Creat post
//   function getBase64(file, onLoadCallback) {
//     return new Promise(function(resolve, reject) {
//       var reader = new FileReader();
//       reader.onload = function() { resolve(reader.result); };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   }
// $(document).on('submit', '#new_post',async function(event) {
//   event.preventDefault();
//   var count_file = $("input:file")[0].files.length;
//   var params_picture = "";
//   var a  = [];
//   if ( count_file != 0){
//     for(var i = 0; i < count_file; i++){
//       var file = $("#images_").prop('files')[`${i}`];
//       var base64_data = "";
//       if(file != " "){
//         var promise = getBase64(file);
//         var base64_data = await promise;
//         var b = `${i}`;
//         var c =  '"' + b + '"' + ':{"picture_url":' + '"' + base64_data + '"}';
//         a.push(c);
//       };
//     }
//     params_picture = a.join(",");
//     params_picture = '{'+ params_picture +'}';
//     var method = $(this).attr('method');
//     var url = $(this).attr('action');
//     var content = $(this).find('#post_content').val();
//   // var images = $(this).find('#images_').val();
//     $.ajax({
//       method: method,
//       url: url,
//       data: { post: {content: content}, images: JSON.parse(params_picture)},
//       dataType: 'html',
//       success: function(partial) {
//         $('images_').prop('disabled', false);
//         $('#post_content').val('');
//         $('#images_').val('');
//         $('#all_post').prepend(partial);
//         $('#previewimage').attr('src','http://placehold.it/100x100');
//       },
//     });
//   }
//   else
//   {
//     var method = $(this).attr('method');
//     var url = $(this).attr('action');
//     var content = $(this).find('#post_content').val();
//     $.ajax({
//       method: method,
//       url: url,
//       data: { post: {content: content}},
//       dataType: 'html',
//       success: function(partial) {
//         $(':input[type="submit"]').prop('disabled', false);
//         $('#post_content').val('');
//         $('#images_').val('');
//         $("#all_post").prepend(partial);
//         $('#previewimage').attr('src','http://placehold.it/100x100');
//       },
//     });
//   }
// });
  
  //Delete post
$(document).on('click', '#destroy-post', (event) => {
  event.preventDefault();
  var id = $(event.target).data('id');
  $.ajax({
    url: window.location.origin + '/posts/' + id, //`posts/${id}` 
    method: 'delete',
    dataType: 'json',
    data: {id: id},
    success: function(respone) {
      $(event.target).parents('.card-box').remove();
    },
  });
});

//Show post
$(document).on('click', '#show-post', function(event){
  event.preventDefault();
  var id = $(this).data('id');
  $.ajax({
    url: window.location.origin + `/posts/${id}`,
    method: 'get',
    data: {id: id},
    dataType: 'html',
    success: function(partial) {
      $('#hide-post').attr('hidden', false);
      $('#hide-post').append(partial);
      $('#hide-post').find('.card-box').find('#show-post').remove();
      $('#hide-post').find('.card-box').css({'margin':'0px auto','border':'none'});
      $('#all').css({'background-color': ' rgba(0, 0, 0, .4)', 'position': 'relative', 'opacity': '0.75'});
      $('body').css('overflow','hidden');
      //$('#hide-post').css({'background-color': '#ffffff', 'position': 'fixed', 'opacity':'1','z-index': '1','top':'63px','left':'297px'});
    },
  });
});

// $(document).ready(function(){
//   $('body').mouseup(function(event){
//     var hidepost = $('#hide-post');
//     if (event.target.class != hidepost){
//       hidepost.attr('hidden', true);
//       $('#all').removeAttr('style');
//       $('#hide-post').find('.card-box').remove();
//       $('body').css('overflow','auto');
//     }
//   });
// });
// $('#btn').click(() => {}) thay cho function

//Update post,click edit and submit
$(document).on('click','#edit-post', function(event){
  event.preventDefault();
  //$(event.target).closest(".username-time").next(".card-post-content").find('#post-edit-content').removeAttr('disabled');
  var id = $(event.target).data('id');
  $.ajax({
    url: window.location.origin + `/posts/${id}/edit`,
    method: 'get',
    dataType: 'html',
    data: {id: id},
    success: function(edit) {
      $(event.target).closest('.username-time').next(".card-post-content").html(edit);
      $(event.target).closest('.username-time').next('.card-post-content').find('.post-text').css('border','1px solid #D8BFFF');
    },
  });
});

$(document).on('submit', '.edit_post', function(event){
  event.preventDefault();
  var content = $(this).find('.post-text').val();
  var id = $(this).attr('data');
  $.ajax({
    url: window.location.origin + `/posts/${id}`,
    method: 'put',
    data: {post: {content: content} },
    dataType: 'json',
    success: function(respone) {
      $(event.target).find('.post-text').attr('disabled', true);
      $(event.target).find('.post-text').css('border','none');
    },
  });
});

//Liked post
// like
$(document).on('click', '.love-white', function(event){
  event.preventDefault();
  var post_id = $(this).data('id');
  $.ajax({
    url: window.location.origin + `/posts/${post_id}/likes`,
    method: 'post',
    data: {post: {post_id: post_id}},
    dataType: 'json',
    success: function(data) {
      var count = data.count + ' ' + 'Loved';
      $( event.target).parents('.like-box-icon').prev().find('.count-likes').text(count);
      $( event.target).closest('.like-icon').html('<i class="fa fa-heart fa-2x love-black" style = "color:pink" data-id = "' +  data.post_id + '" data-like = "'+ data.like_id + '"></i>');
    },
  });
});
//unlike
$(document).on('click', '.love-black', function(event){
  event.preventDefault();
  var post_id = $(this).data('id');
  var like_id =  $(this).data('like');
  $.ajax({
    url: window.location.origin + `/posts/${post_id}/likes/${like_id}`,
    method: 'delete',
    data: {id: like_id},
    dataType: 'json',
    success: function(data) {
      var count = data.count + ' ' + 'Loved';
      $( event.target).parents('.like-box-icon').prev().find('.count-likes').text(count);
      $( event.target).closest('.like-icon').html('<i class="fa fa-heart-o fa-2x love-white" data-id = "' +  data.post_id + '"></i>');
    },
  });
});

// Comment
// show comment
$(document).on('click', '.cm-icon', function(event){
  event.preventDefault();
  var post_id = $(this).data('id');
  $.ajax({
    url: window.location.origin + `/posts/${post_id}/comments`,
    method: 'get',
    data: {post_id: post_id},
    dataType: 'html',
    success: function(partial) {
      $( event.target).parents('.card-box').append(partial);
      $( event.target).parent().html('<i class="fa fa-comments-o fa-2x cm1-icon" aria-hidden="true" data-id = "' + post_id + '"></i>');
    },
  });
});
//hide comment
$(document).on('click', '.cm1-icon', function(event){
  event.preventDefault();
  var post_id = $(this).data('id');
  $(event.target).parents('.card-box').find('.comment-box').css('display','none');
  $( event.target).parent().html('<i class="fa fa-comments-o fa-2x cm-icon" aria-hidden="true" data-id = "' + post_id + '"></i>');
});
//puts comment
$(document).on('submit','#add-comment', function(event){
  event.preventDefault();
  var url = $(this).attr('action');
  var post_id = $(this).attr('data');
  var content = $(this).find('.ip-comment').val();
  $.ajax({
    url: window.location.origin + url,
    method: 'post',
    data: {comment: {post_id: post_id, content: content}},
    dataType: 'html',
    success: function(partial) {
      // $(event.target).parents('.comment-box').find('.comment-user').last().after(partial);
      $(event.target).parents('.comment-text').before(partial);
      $(event.target).find('.ip-comment').val('');
      var countcomment = $(event.target).parents('.comment-box').find('.comment-user').last().find('.lkandcm-cm').find('p').text();
      $(event.target).parents('.card-box').find('.like-box').find('.like-box-head').find('.count-comments').text(countcomment);
    },
  });
});
//edit comment
$(document).on('click','.cmandedit', function(event){
  event.preventDefault();
  $(this).find('.dropdown-cmandedit').css('display','block');
});

$(document).on('click','.edit-cm', function(event){
  event.preventDefault();
  var comment = $(this).data('id');
  var post = $(this).data('post');
  $.ajax({
    url: window.location.origin + `/posts/${post}/comments/${comment}/edit`,
    method: 'get',
    data: {id: comment, post_id: post},
    dataType: 'html',
    success: function(partial) {
      $(this).parents('.comment-box').find('.comment-text').attr('hidden', true);
      $(this).parents('.cmandedit').prev().html(partial);
      $(this).parents('.cmandedit').remove();
    }.bind(this),
  });
});

$(document).on('submit', '#edit-comment', function(event){
  event.preventDefault();
  var comment_id = $(this).attr('data_id');
  var post_id = $(this).attr('data_post');
  var content = $(this).find('.ip-comment').val();
  $.ajax({
    url: window.location.origin + `/posts/${post_id}/comments/${comment_id}`,
    method: 'put',
    data: {comment: {post_id: post_id, content: content}, id: comment_id},
    dataType: 'html',
    success: function(partial) {
      $(this).parents('.comment-box').find('.comment-text').attr('hidden', false);
      $(this).parents('.comment-user').replaceWith(partial);
    }.bind(this)
  });
});
//delete comment
$(document).on('click','.delete-cm', function(event){
  event.preventDefault();
  var comment = $(this).data('id');
  var post = $(this).data('post');
  $.ajax({
    url: window.location.origin + `/posts/${post}/comments/${comment}`,
    method: 'delete',
    data: {id: comment, post_id: post},
    dataType: 'json',
    success: function(data) {
      var count = data.count_comments + ' ' + 'Comment';
      $(this).parents('.comment-box').prev().find('.like-box-head').find('.count-comments').text(count);
      $(this).parents('.comment-user').remove();
    }.bind(this),
  });
});

//scroll page
var i = 1;
$(window).scroll(function(){
  if($(window).scrollTop() + $(window).height() == $(document).height()) {
    i++;
    var urllll = window.location.href
    // console.log(urllll);
    load_more_post = urllll+ '/?page=' + i;
    console.log(load_more_post);
    $.ajax({
      method: "GET",
      url: load_more_post,
      dataType: 'html',
      success: function(data){
        $('#all_post').append(data);
      }
    });
  }
});
//preview images
var loadFile1 = function(event) {
  var reader = new FileReader();
  reader.onload = function(){
    var output = document.getElementById('previewimage');
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};

//edit user
var loadFile = function(event) {
  var reader = new FileReader();
  reader.onload = function(){
    var output = document.getElementById('output-img-edit');
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};
// show edit-form
$(document).on('click','.profile-icon',function(event){
  event.preventDefault();
  var id = $('.profile-icon').attr('data')
  $.ajax({
    url: window.location.origin + `/users/${id}/edit`,
    method: 'get',
    data: { id: id },
    dataType: 'html',
    success: function(partial){
      $('#all').css({'background-color': ' rgba(0, 0, 0, 1.95)', 'position': 'relative', 'opacity': '0.75'});
      $('#hide-post').before(partial);
      $('body').css('overflow','hidden');
      $('.user-information').hide();
    },
  });
});
// hide edit-form
$(document).on('click', '.cancelbtn',function(event){
  $('#all').removeAttr('style');
  $('.edit_user').remove();
  $('body').css('overflow','auto');
  $('.user-information').show();
});
//change password
$(document).on('click', '.checked-box', function(){
  var a = $('.checked-box').prop('checked');
  if ( a ) {
    $('#user_password').attr('disabled', false);
  }
  else {
    $('#user_password').attr('disabled', true);
  }
});


//edit-profile
$(document).on('submit', '#edit-user-form', function(event){
  event.preventDefault();
  debugger;
  if ( $('.checked-box').prop('checked') ) {
    var email = $(this).find('#user_email').val();
    var name = $(this).find('#user_name').val();
    var password = $(this).find('#user_password').val();
    var id_user = $(this).attr('data');
    $.ajax({
      url: window.location.origin + `/users/${id_user}`,
      method: 'put',
      data: { user: { email: email, name: name, password:password }, id: id_user },
      dataType: 'json',
      success: function(data){
        alert('Edit Profile Success');
        $(this).find('#user_name').val(data.name);
        $(this).find('#user_email').val(data.email);
        $('.editbtn').prop('disabled', false);
        $('#user_password').val('');
        $('#user_password').attr('disabled', true);
        $('.checked-box').prop('checked', false);
      }.bind(this),
    });
  }
  else {
    var email = $(this).find('#user_email').val();
    var name = $(this).find('#user_name').val();
    var id_user = $(this).attr('data');
    $.ajax({
      url: window.location.origin + `/users/${id_user}`,
      method: 'put',
      data: { user: { email: email, name: name }, id: id_user },
      dataType: 'json',
      success: function(data){
        alert('Edit Profile Success');
        $(this).find('#user_name').val(data.name);
        $(this).find('#user_email').val(data.email);
        $('.editbtn').prop('disabled', false);
      }.bind(this),
    });
  }
});

// search box
$(document).ready(function() {
  $('#users-form-search #term').on('keyup', function(){
    var jqxhr = $.get(
      $('#users-form-search').attr('action'),
      {term:  $('#users-form-search #term').val()},
      function(){
        var result = $('#users-result').html();
        if (!result){
          $('#users-form-search #term').popover({
            content: 'No result found.',
            placement: 'bottom',
            html: true,
            trigger: 'focus',
          });
        } else {
          $('#users-form-search #term').popover({
            content: $('#users-result'),
            placement: 'bottom',
            html: true,
            trigger: 'focus',
          });
        }
        $('#users-form-search #term').popover('show');
      }
    )
  })
});
// notify
$(document).on('turbolinks:load', function(){
  App.notification = App.cable.subscriptions.create(
	{channel: 'NotificationChannel', id: Cookies.get('current_user_id')}, {
	connected: function(){},
	disconnected: function(){},
	received: function(data){
  	this.executeMessage(data);
	},
    
	/////////////////////////////
	executeMessage: function(data) {
  	console.log('new notification arrived');
  	$('#notifications_in_header').empty().html(data.notifications);
	}
  });
});
