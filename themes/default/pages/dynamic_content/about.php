<?php
$aboutUs = $sdkServices->aboutUs();
?>
<section class="rentmy-aboutus-wrapper <?php echo isset($page) ? $page : '' ?>">
    <div class="rentmy-container">
        <div class="rentmy-row">
            <div class="rentmy-column-12">
                <h5><?=$aboutUs['name']?></h5>
            </div>
        </div>
        <div class="rentmy-row">
            <div class="rentmy-column-12">
                <?=$aboutUs['contents']['content']?>
            </div>
        </div>
    </div>
</section>
