jQuery(document).ready(function ($) {

	$('#contactForm').submit(function(event){
		var form = $(this);
		if(form[0].checkValidity() === false){
			if(form[0][1].checkValidity() === false) {
				var element = $('#'+form[0][1].id+' + .invalid-feedback');
				feedbackText(element, form[0][1].value, "email id");
				$(form[0][1]).blur(function(){
	    			feedbackText(element, form[0][1].value, "email id");
				});
			}
			form.addClass('was-validated');
		}else{
			$('#contact_loader').css('display','flex');
			$('#contact_loader .loader').css('display','block');
			var jqxhr = $.post( "http://corporateolympics.sportsmaidan.com/api/send_mail/",{ name: form[0][0].value, email: form[0][1].value, company: form[0][2].value, message:  form[0][3].value} )
				.done(function() {
					$("#contact_error").css('display','none');
					$("#contact_success").css('display','block')
				})
				.fail(function() {
					$("#contact_success").css('display','none');
					$("#contact_error").css('display','block');
				})
				.always(function() {
					$('#contact_loader').css('display','flex');
					$('#contact_loader .loader').css('display','block');
					form[0].reset();
				});
			  jqxhr.always(function() {
			  });
		}
		event.preventDefault();
	});

	function feedbackText (element, value, text) {
		if(value == '') {
			element.html('Please enter your '+text);
		}
		else {
			element.html('Please enter a valid '+text);	
		}
	}
	
	$("[data-hide]").on("click", function(){
        $(this).closest("." + $(this).attr("data-hide")).hide();
    });

});