<?php
$fContents = $SITE_SPECIFIC ?? [];
$contactTitle = 'Contact Us';
$quickLinksTitle = 'Quick Links';
$moreLinksTitle = 'More Links';
$newsLetterTitle = 'Newsletter';
$newsLetterText = 'Get news and receive 20% off for your next buy!';
$placeholder = 'Your Email Address';
$subsButton = 'Subscribe';
$copyrightText = '&copy; 2020 Rentmy | Developed by <a href="http://rentmy.co">rentmy.co </a>';
$email = $address = $phone = '';

if(count($fContents)){
    if(isset($fContents['footer'])){
        // Titles
        if(isset($fContents['footer']['contact_us_title'])) $contactTitle = $fContents['footer']['contact_us_title'];
        if(isset($fContents['footer']['quick_links_title'])) $quickLinksTitle = $fContents['footer']['quick_links_title'];
        if(isset($fContents['footer']['more_links_title'])) $moreLinksTitle = $fContents['footer']['more_links_title'];
        if(isset($fContents['footer']['newsletter_title'])) $newsLetterTitle = $fContents['footer']['newsletter_title'];
        if(isset($fContents['footer']['newsletter_text'])) $newsLetterText = $fContents['footer']['newsletter_text'];
        // NewsLetter Section
        if(isset($fContents['footer']['newsletter_textbox_placeholder'])) $placeholder = $fContents['footer']['newsletter_textbox_placeholder'];
        if(isset($fContents['footer']['newsletter_btn'])) $subsButton = $fContents['footer']['newsletter_btn'];
        if(isset($fContents['footer']['copyright_text'])) $copyrightText = $fContents['footer']['copyright_text'];
    }

    if(isset($fContents['general'])) {
        // Email, Address, Phone
        if (isset($fContents['general']['email'])) $email = $fContents['general']['email'];
        if (isset($fContents['general']['address'])) $address = $fContents['general']['address'];
        if (isset($fContents['general']['phone'])) $phone = $fContents['general']['phone'];
    }
}

?>

<!-- Footer  -->
<footer class="rentmy-footer">
        <div class="rentmy-top-footer">
            <div class="rentmy-container">
                <div class="rentmy-row">
                    <div class="rentmy-footer-contact">
                        <h4><?=$contactTitle?></h4>
                        <ul>
                            <li><a href="#"><i class="lni lni-envelope"></i><?= $email ?></a></li>
                            <li><i class="lni lni-map-marker"></i> <?= $address ?></li>
                            <li><i class="lni lni-phone"></i> <?= $phone?></li>
                        </ul>
                    </div>
                    <div class="rentmy-footer-links">
                        <h4><?=$quickLinksTitle?></h4>
                        <ul>
                            <?php if (isset($footerQuickLinks) && !empty($footerQuickLinks)):
                                foreach ($footerQuickLinks as $item){
                                $url = ($item['content_type'] == 'External') ? $item['content_url']: url($item['content_url']); ?>
                                <li>
                                    <a href="<?= $url; ?>"
                                        <?php if($item['content_type'] == 'External'){ ?> target="_blank" <?php } ?>
                                    > <?= $item['label']?></a>
                                </li>
                            <?php }
                                endif ?>
                        </ul>
                    </div>
                    <div class="rentmy-footer-links">
                        <h4><?=$moreLinksTitle?></h4>

                        <ul>
                            <?php
                            if (isset($footerMoreLinks) && !empty($footerMoreLinks)):
                            foreach ($footerMoreLinks as $item){
                                $url = ($item['content_type'] == 'External') ? $item['content_url']: url($item['content_url']); ?>
                                <li>
                                    <a href="<?= $url; ?>"
                                        <?php if($item['content_type'] == 'External'){ ?> target="_blank" <?php } ?>
                                    > <?= $item['label']?></a>
                                </li>
                            <?php }
                            endif ?>
                        </ul>
                    </div>
                    <div class="rentmy-footer-newslatter">
                        <h4><?=$newsLetterTitle?></h4>
                        <p><?=$newsLetterText?></p>
                        <form id="subscribe-form" action="">
                            <input type="email" name="subscription-email" id="subscription-email" placeholder="<?= $placeholder; ?>">
                            <button disabled type="button" id="subscribe-btn" class="renty-subscribe-btn disabled" ><?= $subsButton; ?></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="rentmy-bottom-footer">
            <div class="rentmy-container">
                <div class="rentmy-row">
                    <div class="rentmy-bottom-footer-content">
                        <p> <?=$copyrightText?> </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
