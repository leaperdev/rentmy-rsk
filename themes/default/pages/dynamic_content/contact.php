<?php
$contactUs = $sdkServices->contactUs();
$content = $SITE_SPECIFIC; // ['contactus']
$firstName = (!empty($content['contactus']) && !empty($content['contactus']['first_name'])) ? $content['contactus']['first_name'] : 'First Name';
$lastName = (!empty($content['contactus']) && !empty($content['contactus']['last_name'])) ? $content['contactus']['last_name'] : 'Last Name';
$phone = (!empty($content['contactus']) && !empty($content['contactus']['phone'])) ? $content['contactus']['phone'] : 'Phone';
$email = (!empty($content['contactus']) && !empty($content['contactus']['email'])) ? $content['contactus']['email'] : 'Email';
$message = (!empty($content['contactus']) && !empty($content['contactus']['Message'])) ? $content['contactus']['Message'] : 'Message';
$submitBtn = (!empty($content['contactus']) && !empty($content['contactus']['btn_submit'])) ? $content['contactus']['btn_submit'] : 'Submit';
$lat = $lang = '';
if(isset($contactUs['contents']['map_location'])){
    $lat = $contactUs['contents']['map_location'][0]['lat'];
    $lang = $contactUs['contents']['map_location'][0]['lng'];
}
?>
<section class="rentmy-contact-wrapper <?php echo isset($page) ? $page : '' ?>">
    <div class="rentmy-container">
        <div class="rentmy-row">
            <div class="rentmy-column-12">
                <h5><?=$contactUs['name']?></h5>
            </div>
        </div>
        <div class="rentmy-row">
            <span class="rentmy-contact-info-error"></span>
            <div class="rentmy-column-7">
                <div class="rentmy-row">
                    <div class="rentmy-column-6">
                        <div class="rentmy-form-group">
                            <label for=""><?=$firstName?>*</label>
                            <p class="error-first-name"></p>
                            <input type="text" required id="first_name"/>
                        </div>
                    </div>
                    <div class="rentmy-column-6">
                        <div class="rentmy-form-group">
                            <label for=""><?=$lastName?>*</label>
                            <p class="error-last-name"></p>
                            <input type="text" required id="last_name" />
                        </div>
                    </div>
                    <div class="rentmy-column-6">
                        <div class="rentmy-form-group">
                            <label for=""><?=$phone?>*</label>
                            <p class="error-phone"></p>
                            <input type="text" required id="phone" />
                        </div>
                    </div>
                    <div class="rentmy-column-6">
                        <div class="rentmy-form-group">
                            <label for=""><?=$email?>*</label>
                            <p class="error-email"></p>
                            <input type="email" required id="email" />
                        </div>
                    </div>
                    <div class="rentmy-column-12">
                        <div class="rentmy-form-group">
                            <label for=""><?=$message?>*</label>
                            <p class="error-message"></p>
                            <textarea type="textarea" required id="message"></textarea>
                        </div>
                    </div>
                    <div class="rentmy-column-12">
                        <div class="rentmy-form-group">
                            <button type="button" class="rentmy-button" id="email-submit"><?=$submitBtn?></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rentmy-column-5">
                <div class="rentmy-row">
                    <div class="rentmy-column-12">
                        <div class="rentmy-contact-map">
                            <iframe width="600" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                                    src="https://maps.google.com/maps?q=<?=$lat?>,<?=$lang?>&hl=en&z=14&amp;output=embed">
                            </iframe>
<!--                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13004082.928417291!2d-104.65713107818928!3d37.275578278180674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1609835363180!5m2!1sen!2sbd"                  frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>-->
                        </div>
                    </div>
                    <div class="rentmy-column-12">
                        <div class="rentmy-content-text">
                            <?=$contactUs['contents']['content']?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
