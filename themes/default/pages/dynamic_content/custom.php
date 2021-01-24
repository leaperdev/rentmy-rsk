<?php

if(isset($customPage)){
    $pageValue = $customPage;
    $slug = $pageArray[1];
    $customPage = $sdkServices->customPage($slug);
}
?>


<section class="rentmy-customepage-wrapper <?php echo isset($slug) ? $slug : '' ?>"">
    <div class="rentmy-container">
        <div class="rentmy-row">
            <div class="rentmy-column-12">
                <h5><?=$customPage['name']?></h5>
            </div>
        </div>
        <div class="rentmy-row">
            <div class="rentmy-column-12">
                <?=$customPage['contents']['content']?>
            </div>
        </div>
    </div>
</section>
