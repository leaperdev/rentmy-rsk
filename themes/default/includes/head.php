<!DOCTYPE html>
<html>

<head>

    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="shortcut icon" href="<?=getFavIconPath()?>" />

    <!--  DO NOT REMOVE THIS!  THEME FONTS AND ICONS LOAD-->
    <?php if (isset($assets)) echo $assets->fontsIcons ?>
    <!--  DO NOT REMOVE THIS!  THEME FONTS AND ICONS END-->

    <!-- RentyMy Nano Base CSS -->
    <link rel="stylesheet" type="text/css" href="<?=rentmyAssetPath('sass/style.css')?>" />

    <!--  DO NOT REMOVE THIS!  THEME ASSETS LOAD-->
    <?php if (isset($assets)) echo $assets->css ?>
    <!--  DO NOT REMOVE THIS!  THEME ASSETS LOAD END-->

    <?php
        if (!empty($navigations)) {
            foreach ($navigations as $item) {
                if ($item['type'] == 'header') $headerNavs[] = $item;
                elseif ($item['type'] == 'footer_more_links') $footerMoreLinks[] = $item;
                elseif ($item['type'] == 'footer_quick_links') $footerQuickLinks[] = $item;
            }
        }

        $defaultStartTime = env('DEFAULT_START_TIME', '12:00');
        $defaultEndTime = env('DEFAULT_END_TIME', '12:00');
        $defaultEndDate = generateEndDate();
    ?>
    <script>
        const BASE_URL = '<?=baseURL()?>';
        const RENTMY_CART_TOKEN= '<?=$sdkServices->getCartToken()?>';
        const DEFAULT_START_TIME = '<?=$defaultStartTime?>';
        const DEFAULT_END_TIME = '<?=$defaultEndTime?>';
        const DEFAULT_END_DATE = '<?=$defaultEndDate?>';
        const STORE_ID = '<?= $sdkServices->getStoreId() ?>';
        const STORE_NAME = '<?=$storeSlug?>';
        const PAGE = '<?=$page?>';
        const STORE_CONFIG = JSON.parse('<?=json_encode($storeConfig)?>');
        const CONTENT = JSON.parse('<?=json_encode($store_content, JSON_HEX_APOS)?>');
        const SITE_SPECIFIC = JSON.parse('<?=json_encode($contents, JSON_HEX_APOS)?>');

        if (localStorage.getItem('storeName')){
            if (localStorage.getItem('storeName') !== STORE_NAME){
                localStorage.removeItem('cart');
                localStorage.setItem('storeName', STORE_NAME);
            }
        }else{
            localStorage.setItem('storeName', STORE_NAME);
        }
    </script>
    <?php if(!empty($contents)):?>
        <meta name="description" content="<?php echo $contents['meta_contents']['home_page_description']??'';?>">
        <meta name="keyword" content="<?php echo $contents['meta_contents']['home_page_keywords']??'';?>">
        <title><?php echo $contents['meta_contents']['home_page_title']??'Rentmy';?></title>
    <?php endif ?>
    <meta name="rentmy_rent_start" content="<?= $sdkServices->getRentalStartDate()?>">
</head>
<body class="rentmy-main-wrapper">

