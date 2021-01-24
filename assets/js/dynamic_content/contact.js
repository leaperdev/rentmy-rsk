jQuery(function ($) {
    const contactUs = {
        content: SITE_SPECIFIC,
        errorValidationCount: 0,
        flag: 0,
        sendEmailFromContact: function (data) {
            console.log(data);
            let ref = this;
            $.post('', data)
                .done((response) => {
                    try {
                        response = JSON.parse(response);
                        if(response.status === 'OK'){
                            $message = (ref.content.contactus && ref.content.contactus.contact_form_success_message) ?
                                ref.content.contactus.contact_form_success_message :
                                'Thank you for contacting us.  We will be in touch shortly.';
                            rentmyAlert.successAlert($message);
                        }else {
                            $message = (ref.content.contactus && ref.content.contactus.contact_form_fail_message) ?
                                ref.content.contactus.contact_form_fail_message :
                                'The message may not have sent.  Please call us.';
                            rentmyAlert.errorAlert($message);
                        }
                    } catch (e) {
                        console.log(e)
                    }
                });
        },
        checkFormValidation: function(){
            this.flag = 0;
            if($('#first_name').val().trim().length == 0){
                rentmyAlert.errorAlert('First name is empty');
                this.flag = 1;
            }
            if($('#last_name').val().trim().length == 0){
                rentmyAlert.errorAlert('Last name is empty');
                this.flag = 1;
            }
            if($('#phone').val().trim().length == 0){
                rentmyAlert.errorAlert('Phone is empty');
                this.flag = 1;
            }
            if($('#phone').val().trim().length){
                let pattern = /^[- +()]*[0-9][- +()0-9]*$/;
                if(!pattern.test($('#phone').val())) {
                    rentmyAlert.errorAlert('Phone format is not valid');
                    this.flag = 1;
                }
            }
            if($('#email').val().trim().length == 0){
                rentmyAlert.errorAlert('Email is empty');
                this.flag = 1;
            }
            if($('#email').val().trim().length){
                let pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
                if(!pattern.test($('#email').val())) {
                    rentmyAlert.errorAlert('Email format is not valid');
                    this.flag = 1;
                }
            }
            if($('#message').val().trim().length == 0){
                rentmyAlert.errorAlert('Message is empty');
                this.flag = 1;
            }
        },
    };

    $('body')
        // SEND EMAIL
        .on('click', '#email-submit', function (event) {
            contactUs.checkFormValidation();
            if(!contactUs.flag){
                const payload = {
                    first_name: $('#first_name').val(),
                    last_name: $('#last_name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    tempPhone: $('#phone').val(),
                    message: $('#message').val(),
                    action_type: 'send_contact_email',
                };
                contactUs.sendEmailFromContact(payload);
            }
        })

});