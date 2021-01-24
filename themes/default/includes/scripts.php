
<div class="rentmy-loading">
    <div class="rentmy-loading-text">Loading...</div>
    <div class="rentmy-loading-circle"></div>
</div>

<div class="rentmy-alert-message rentmy-hide">
    <div>
        <div class="rentmy-alert-message-icon"><i></i></div>
        <div class="rentmy-alert-message-text"></div>
    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
    //global ajax request base url set
    $.ajaxSetup({
        beforeSend:  (xhr, options) => {
            options.url = BASE_URL + '/?request_type=ajax';
        }
    })

    // global loader with ajax request
    const $loader  = $('.rentmy-loading')
    $loader.hide()
    $(document)
        .ajaxStart(function () {
            $loader.show()
        })
        .ajaxStop(function () {
            $loader.hide()
        });
</script>

<!--  DO NOT REMOVE THIS!  THEME JS LOAD-->
<?php if (isset($assets)) echo $assets->js ?>
<!--  DO NOT REMOVE THIS!  THEME JS LOAD END-->

<?php if (ENV == 'DEV') : ?>
    <script src="<?=rentmyAssetPath('js/rentmy.js')?>"></script>
<?php else: ?>
    <script src="<?=rentmyAssetPath('dist/rentmy.min.js')?>"></script>
<?php endif; ?>
</body>
</html>
