$(document).on('pageinit', '#login', function(){  
        $(document).on('click', '#submit', function() { // catch the form's submit event
            if($('#usrname').val().length > 0 && $('#pswrd').val().length > 0){
				if ($('#pswrd').val().length < 6 || $('#pswrd').val().length > 20){
					$('#errorMsg').style.display = 'block';
					$('#errMsg').innerText = 'Password must be between 6 to 20 characters length';
				}else{
					// Send data to server through the Ajax call
					// action is functionality we want to call and outputJSON is our data
                    $.ajax({url: 'http://192.168.1.107/check.php',
                        data: {action : 'login', formData : $('#check-user').serialize()},
                        type: 'post',                   
                        async: 'true',
                        dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                        },
                        success: function (result) {
                            if(result.status) {
                                $.mobile.changePage("#message");                         
                            } else {
                                $('#errorMsg').style.display = 'block';
								$('#errMsg').innerText = 'Login Successful';
                            }
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action 
							$('#errorMsg').style.display = 'block';
							$('#errMsg').innerText = 'Network error has occurred please try again';
                        }
                    });
					$('#usrname').value = '';
					$('#pswrd').value = '';
				}
            } else {
                $('#errorMsg').style.display = 'block';
				$('#errMsg').innerText = 'Please enter Username and Password to login';
            }           
            return false; // cancel original event to prevent form submitting
        });    
});