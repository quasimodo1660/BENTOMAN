$(document).ready(function(){
    $('.modal').modal();
    //================================================================================
    //                             UESRNAME FIELD VALIDATION  
    //================================================================================
    $('#id_username').closest('.form-group').append('<div class="invalid-feedback"></div>');
    $( "#id_username" ).on('keyup change', function (event){
        $(this).removeClass('is-invalid');
        $(this).addClass('is-valid'); 
        var namestr=$("#id_username").val();
        $.ajax({
            url: '/accounts/signup', /* Where should this go? */
            method: 'post', /* Which HTTP verb? */
            data: $(this).serialize(),
            success: function(results) {
               if(results.user_errors.username){
                $( "#id_username").addClass('is-invalid');
                $( "#id_username").siblings('.invalid-feedback').text(results.user_errors.username[0]);
               }
            }
        });
      });
    
    //================================================================================
    //                             EMAIL FIELD VALIDATION  
    //================================================================================
    $('#id_email').closest('.form-group').append('<div class="invalid-feedback"></div>');
    $( "#id_email" ).on('keyup change', function (event) {
        var mailstr=$( "#id_email" ).val();
        var EMAIL_REGEX=/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;
        if(mailstr.length==0){
            $(this).addClass('is-invalid');
            $(this).siblings('.invalid-feedback').text('This field is required.');
        }
        else{
            if(EMAIL_REGEX.test(mailstr)){
                $(this).removeClass('is-invalid');
                $(this).addClass('is-valid');   
                $.ajax({
                    url: '/accounts/signup', /* Where should this go? */
                    method: 'post', /* Which HTTP verb? */
                    data: $(this).serialize(),
                    success: function(results) {
                        if(results.user_errors.email){
                        $( "#id_email").addClass('is-invalid');
                        $( "#id_email").siblings('.invalid-feedback').text(results.user_errors.email[0]);
                        }
                    }
                })
            }
            else{
                $(this).addClass('is-invalid');
                $(this).siblings('.invalid-feedback').text('Invalid Email Address.');
            }
                
        }     
    });
   
    //================================================================================
    //                             PSD FIELD VALIDATION  
    //================================================================================  
    $('#id_password').closest('.form-group').append('<div class="invalid-feedback"></div>');   
    $('#id_password').closest('.form-group').append('<small id="psdHelp" class="form-text text-muted"></small>');  
    $('#id_password').on('keyup change', function (event) {
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var enoughRegex = new RegExp("(?=.{6,}).*", "g");
        if (false == enoughRegex.test($(this).val())) {
            $(this).addClass('is-invalid');
            $(this).siblings('.invalid-feedback').text('More Characters');
            $(this).siblings('#psdHelp').text('Requires at least 6 length, and no spaces.');
        } else if (strongRegex.test($(this).val())) {
            $(this).siblings('#psdHelp').text('Password strength: Strong!');
        } else if (mediumRegex.test($(this).val())) {
            $(this).siblings('#psdHelp').text('Password strength: Medium!');
        } else {
            $(this).siblings('#psdHelp').text('Password strength: Weak!');
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid'); 
        }
    });
    //================================================================================
    //                             ZIPCODE VALIDATION  
    //================================================================================  
    // $('#id_postal_code').closest('.form-group').append('<div class="invalid-feedback"></div>');
    // $( "#id_postal_code" ).on('keyup change', function (event){
    //     var ZIPCODE_REGEX=/^\d{5}$/;
    //     var pc=$("#id_postal_code").val();
    //     if (pc.length==0){
    //         $(this).addClass('is-invalid');
    //         $(this).siblings('.invalid-feedback').text('This field is required.');
    //     }
    //     else if(pc.length<5 || !(ZIPCODE_REGEX.test(pc))){
    //         $(this).addClass('is-invalid');
    //         $(this).siblings('.invalid-feedback').text('Postal code must be 5 digits.');
    //     }
    //     else{
    //         $(this).removeClass('is-invalid');
    //         $(this).addClass('is-valid');  
    //         $.ajax({ 
    //             url: '/accounts/signup', /* Where should this go? */
    //             method: 'post', /* Which HTTP verb? */
    //             data: $(this).serialize(),
    //             success: function(results) {
    //                 console.log(results);
    //                if(results.zip.postal_code){
    //                 $( "#id_postal_code").addClass('is-invalid');
    //                 $( "#id_postal_code").siblings('.invalid-feedback').text(results.zip.postal_code[0]);
    //                }
    //             }
    //         });
    //     }
    //   });
    
    //================================================================================
    //                            AJAX PART
    //================================================================================  
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    console.log(csrftoken);
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    //================================================================================
    //                            UPDATE PROFILE PART
    //================================================================================  
    $( "#icon_post" ).on('keyup change', function (event){
        var ZIPCODE_REGEX=/^\d{5}$/;
        var pc=$("#icon_post").val();
        if(pc.length<5 || !(ZIPCODE_REGEX.test(pc))){
            $(this).addClass('invalid')
            $(this).siblings('label').attr('data-error','Postal code should be 5 digits.')
        }
        else{
            $(this).removeClass('invalid')
        }
      });
      $('#profileUpdateForm').on('keyup change',function() {
          $('#b2').removeClass('disabled')
      })



      $('#profileUpdateForm').on('submit', function(event){
        event.preventDefault();
        $('<div id="mid" class="progress"><div class="indeterminate orange"></div></div>').insertBefore('#b2')
        console.log("form submitted!")  // sanity check
        console.log('Sending Ajax request to', $(this).attr('action'))
        console.log('Submitting the following data', $(this).serialize())
        $.ajax({
            url: $(this).attr('action'), /* Where should this go? */
            method: 'post', /* Which HTTP verb? */
            data: $(this).serialize(), /* Any data to send along? */
            success: function(serverResponse) { /* What code should we run when the server responds? */
              if(serverResponse['errors'])
                console.log(serverResponse['errors'])
              else{
                $('#mid').remove()
                $('#b2').addClass('disabled')
                $('#profileUpdateForm').append('<h6 id="miss" class="blue-grey-text text-lighten-4 left-align">Update at '+new Date($.now())+'</h6>')
                $('#miss').delay(3000).fadeOut()
              }          
            }
          })
    });
     //================================================================================
    //                            TIME AGO PART
    //================================================================================  
    jQuery.timeago.settings.allowFuture = true;
    jQuery("abbr.timeago").timeago();
    
    $('.message_row').on('click','.edit_icon',function(){
            $(this).closest('.message_row').find('.edit_row').slideDown();

    })
    $('.message_row').on('click','.comment_icon',function(){
            $(this).closest('.message_row').find('.comment').slideDown();

    })

    
    $('.message_row').on('click','.com_edit_icon',function(){
            console.log('ddddd');
            $(this).closest('.message_row').find('.com_edit_row').slideDown();

    })
    //================================================================================
    //                            FRIENDSHIP PART
    //================================================================================  
    $('.followForm').on('submit', function(event){
        event.preventDefault();
        var me=this
        // console.log("form submitted!")  // sanity check
        // console.log('Sending Ajax request to', $(this).attr('action'))
        // console.log('Submitting the following data', $(this).serialize())
        // setInterval(function() {
        $.ajax({
            url: $(this).attr('action'), /* Where should this go? */
            method: 'post', /* Which HTTP verb? */
            data: $(this).serialize(), /* Any data to send along? */
            success: function(serverResponse) { /* What code should we run when the server responds? */
              if(serverResponse['errors'])
                console.log(serverResponse['errors'])
              else{
                if($(me).find('#fB').val()=='follow')
                    $(me).find('#fB').val('unfollow')
                else
                    $(me).find('#fB').val('follow')
                $('#followers').text(serverResponse['followers'])
                $('#following').text(serverResponse['following'])
               
              }          
            }
          })
        // },1000)
        
    });
    $('.dM').click(function(event){
        event.preventDefault();
        // $(this).closest('.collection-item').addClass('clicked_me')
        $('#modal1').find('.rID').val($(this).siblings('.rID').val())
    })

    $(".q").click(function(event){
        event.preventDefault();
        // $('.clicked_me').addClass('dismiss_me');
        var me=this
        $.ajax({
            url: $('#modal1').find('.rID').val(), /* Where should this go? */
            method: 'delete', /* Which HTTP verb? */
            // data: $(this).serialize(), /* Any data to send along? */
            success: function(serverResponse) { /* What code should we run when the server responds? */          
                if(serverResponse['errors'])
                console.log(serverResponse['errors'])
                else{
                    var target='#review_'+ $('#modal1').find('.rID').val().replace('/lunchbox/deleteReview/','')
                    $(target).fadeOut()
                    $('#reviews_total').text(serverResponse['count'])
                }
            }
            
          })
       
    })

    $('.d').click(function(event){
        event.preventDefault();
        // $('.collection-item').removeClass('clicked_me')
    })

    $('.edit_review').click(function(event){
        event.preventDefault();
        $('#modal2').find('.rID').val($(this).siblings('.rID').val())
        $('#modal2').find('form').attr("action", $(this).siblings('.rID').val());
        $('#edit_stars').val($(this).siblings('.review_stars').val())
        $('#edit_content').val($(this).siblings('p').text())
    })

    $("#edit_review_form").on('submit',function(event){
        event.preventDefault();
        // $('.clicked_me').addClass('dismiss_me');
        var me=this
        $.ajax({
            url: $(this).attr('action'), /* Where should this go? */
            method: 'post', /* Which HTTP verb? */
            data: $(this).serialize(), /* Any data to send along? */
            success: function(serverResponse) { /* What code should we run when the server responds? */
              if(serverResponse['errors'])
                console.log(serverResponse['errors'])
              else{
                var target='#review_'+ $('#modal2').find('.rID').val().replace('/lunchbox/deleteReview/','')
                var stars=''
                for(var i=0;i<serverResponse['stars'];i++)
                    stars+='<span><i class="material-icons orange-text">star</i></span>'
                for(var j=0;j< 5-serverResponse['stars'];j++)
                    stars+='<span><i class="material-icons orange-text">star_border</i></span>'
                $(target).find('div').html(stars)
                $(target).find('.review_stars').val(serverResponse['stars'])
                $(target).find('p').text(serverResponse['content'])
              }          
            }
          })
       
    })

    $('.dB').click(function(event){
        event.preventDefault();
        // $(this).closest('.collection-item').addClass('clicked_me')
        $('#modal3').find('.bID').val($(this).siblings('.bID').val())
    })

    $('.dBS').click(function(event){
        event.preventDefault();
        $.ajax({
            url: ('/lunchbox/update/'+ $('#modal3').find('.bID').val()), /* Where should this go? */
            method: 'delete', /* Which HTTP verb? */
            // data: $(this).serialize(), /* Any data to send along? */
            success: function(serverResponse) { /* What code should we run when the server responds? */          
                if(serverResponse['errors'])
                console.log(serverResponse['errors'])
                else{
                    var target='#bento_'+ $('#modal3').find('.bID').val()
                    $(target).fadeOut()
                    var q=$('#bento_total').text()
                    $('#bento_total').text(q-1)
                }
            }
            
          })
    })
    
    $('.collapsible').collapsible();
});
