<?php

function getProductImage($product, $storeId, $imageType = 'image_small')
{
    $image = isset($product['images'][0]) ? $product['images'][0][$imageType] : '';
    return \RentMy\RentMy::productImageLink($product['id'], $storeId, $image, rentmyAssetPath('img/default.jpg'));
}

function getProductImages($product, $storeId, $imageType = 'image_small')
{
    $images = [];
    if (isset($product['images']) && !empty($product['images'])) {
        foreach ($product['images'] as $image) {
            if (isset($image[$imageType])) {
                $images[] = \RentMy\RentMy::productImageLink($product['id'], $storeId, $image[$imageType], rentmyAssetPath('img/default.jpg'));
            }
        }
    } else {
        $images[] = \RentMy\RentMy::productImageLink($product['id'], $storeId, '', rentmyAssetPath('img/default.jpg'));
    }
    return $images;
}


function getPricing($product, $others = [])
{
//    if(!empty($product['prices']) && !is_array($product['prices'])){
//        return \RentMy\RentMy::currency($product['prices'], 'pre', 'amount', 'post');
//    }
    $startingAt = 'Starting at';
    $buyNow = 'Buy now for';
    $for = 'for';
    $per = 'for';
    if (count($others)) {
        $startingAt = (!empty($others['product_list_starting_at'])) ? $others['product_list_starting_at'] : $startingAt;
        $buyNow = (!empty($others['product_list_buy_now_for'])) ? $others['product_list_buy_now_for'] : $buyNow;
        $for = (!empty($others['product_list_for'])) ? $others['product_list_for'] : $for;
        $per = (!empty($others['product_list_per'])) ? $others['product_list_per'] : $per;
    }
    $priceTypes = \RentMy\RentMy::getRentalTypes($product['prices']);
    $prices = \RentMy\RentMy::getPrices($product['prices']);
    // $generic_prices = empty($product['price']) ? $product['prices'] : $product['price'];
    if (in_array('rent', $priceTypes)) {
        if (!empty($prices['rent'][0]['duration']) && $prices['rent'][0]['duration'] > 1) {
            $label = !empty($prices['rent'][0]['label']) ? (' ' . $for . ' ') . $prices['rent'][0]['label'] : '';
            return $startingAt . ' ' . \RentMy\RentMy::currency($prices['rent'][0]['price'], 'pre', 'amount', 'post') . $label;

        } else {
            $label = !empty($prices['rent'][0]['label']) ? (' ' . $per . ' ') . $prices['rent'][0]['label'] : '';
            return $startingAt . ' ' . \RentMy\RentMy::currency($prices['rent'][0]['price'], 'pre', 'amount', 'post') . $label;
        }
    } elseif (in_array('fixed', $priceTypes)) {
        return $startingAt . ' ' . \RentMy\RentMy::currency($prices['rent'][0]['price'], 'pre', 'amount', 'post');
    } else {
        if (!isset($prices['base']['price'])) {
            return '';
        }
        return $buyNow . ' ' . \Rentmy\RentMy::currency($prices['base']['price'], 'pre', 'amount', 'post');
    }
}

function getProductPopupDetails($product, $storeID)
{
    $sortedDetails = [
        'uid' => $product['uuid'],
        'name' => $product['name'],
        'image' => getProductImage($product, $storeID)
    ];

    return json_encode($sortedDetails, JSON_HEX_APOS);
}

function getProductDirectCartDetails($product)
{
    $sortedDetails = [
        'id' => $product['id'],
        'name' => $product['name'],
        'type' => $product['type'],
        'quantity' => 1,
        'rent_start' => '',
        'rent_end' => '',
        'variants_products_id' => $product['default_variant']['variants_products_id'],
    ];

    return json_encode($sortedDetails, JSON_HEX_APOS);
}

function currencyFormat($amount)
{
    return \RentMy\RentMy::currency($amount);
}

function responseFormatAfterCart($response, $storeID)
{
    if (isset($response['status']) && $response['status'] == 'OK') {

        if (isset($response['result']) && isset($response['result']['error'])){
            $response['status'] = 'NOK';
            return $response;
        }

        $result = [
            'status' => 'OK',
            'data' => [
                'response' => json_encode($response['result']['data'] ?? null),
                'token' => $response['result']['data']['token'] ?? null,
                'rent_start' => dateTimeFormat($response['result']['data']['rent_start'] ?? null),
                'rent_end' => dateTimeFormat($response['result']['data']['rent_end'] ?? null),
                'total' => currencyFormat($response['result']['data']['sub_total'] ?? 0),
                'total_quantity' => $response['result']['data']['total_quantity'] ?? 0,
            ]
        ];
        $result['data']['cart_items'] = [];
        if (isset($response['result']['data'])) {
            foreach ($response['result']['data']['cart_items'] as $item) {
                $result['data']['cart_items'][] = [
                    'trace' => json_encode([
                        'token' => $response['result']['data']['token'],
                        'cart_item_id' => $item['id'],
                        'product_id' => $item['product']['id'],
                        'price' => $item['price'],
                        'rental_type' => $item['rental_type'] == 'buy' ? 'buy' : 'rent',
                        'product_type' => $item['product_type'],
                        'variants_products_id' => $item['variants_products_id'],
                    ], JSON_HEX_APOS),
                    'id' => $item['id'],
                    'available' => $item['available'] ?? 0,
                    'name' => $item['product']['name'],
                    'image' => getProductImage($item['product'], $storeID),
                    'quantity' => $item['quantity'],
                    'price' => $item['sub_total']
                ];
            }
        }

        //bind errors if responce has
        if (isset($response['errors']))
            $result['data']['errors'] = $response['errors'];

        return $result;
    }

    return $response;
}

function dateTimeFormat($dateTime)
{
    //when datetime empty set it now
    if (strlen($dateTime) < 2) {
        return false;
    }

    $config = (new SdkServices())->store_config();
    $format = dateFormatConvert(isset($config['date_format']) ? $config['date_format'] : 'm-d-Y');
    return [
        'date' => date($format, strtotime($dateTime)),
        'dateJS' => date('Y-m-d', strtotime($dateTime)),
        'time' => date('h:i A', strtotime($dateTime)),
    ];
}

function dateFormatConvert($format)
{
    foreach (['-', '/'] as $operator) {
        if (strpos($format, $operator) !== false) {
            return implode($operator, array_map(function ($piece) {
                return $piece[0] == 'M' || $piece[0] == 'D' ? strtolower($piece[0]) : $piece[0];
            }, explode($operator, $format)));
        }
    }
    return 'm-d-Y';
}

function pagination($page = 1, $total = 0, $limit = 10)
{
    $lastpage = ceil($total / $limit);
    $prev = $page - 1;
    $next = $page + 1;
    $lpm1 = $lastpage - 1;
    $track = 0;
    $track2 = 0;
    $count = 0;
    $pagination = '<div class="rentmy-pagination"><ul>';
    if ($page <= 1) {
        $pagination .= '<li><a href="#" onclick="return false;">&laquo;</a></li>';
    } else {
        $pagination .= '<li><a href="' . addQueryPram('page_no', $prev) . '">&laquo;</a></li>';
    }

    for ($i = 1; $i <= $lastpage; $i++) {
        if ($lastpage <= 6) {
            if ($i == $page) {
                $pagination .= '<li><a href="' . addQueryPram('page_no', $i) . '" class="active">' . $i . '</a></li>';
            } else {
                $pagination .= '<li><a href="' . addQueryPram('page_no', $i) . '">' . $i . '</a></li>';
            }
        } else {
            if ($i <= 1) {
                if ($i == $page) {
                    $pagination .= '<li><a href="' . addQueryPram('page_no', $i) . '" class="active">' . $i . '</a></li>';
                    $pagination .= '<li><a href="' . addQueryPram('page_no', ($i + 1)) . '">' . ($i + 1) . '</a></li>';
                    $pagination .= '<li><a onclick="return false;">...</a></li>';

                } else {
                    $pagination .= '<li><a href="' . addQueryPram('page_no', $i) . '">' . $i . '</a></li>';
                    if ($page >= 3) {
                        $pagination .= '<li><a href="' . addQueryPram('page_no', ($i + 1)) . '">' . ($i + 1) . '</a></li>';
                    }
                }
                $count++;
            }
            if ($track == 0 && $i > 2 && $page > 4) {
                $pagination .= '<li><a onclick="return false;">...</a></li>';
                $track = 1;
            }

            if ($page >= 2 && $page <= ($lastpage - 1)) {
                if ($i == $page - 1 && $page > 3) {
                    $pagination .= '<li><a href="' . addQueryPram('page_no', $i) . '">' . $i . '</a></li>';
                }
                if ($i == $page) {
                    $pagination .= '<li><a href="' . addQueryPram('page_no', $i) . '" class="active">' . $i . '</a></li>';
                }
                if ($i == $page + 1 && $page < ($lastpage - 2)) {
                    $pagination .= '<li><a href="' . addQueryPram('page_no', $i) . '">' . $i . '</a></li>';
                    $track2 = 2;
                }
            }
            if ($track2 == 2 && $page < ($lastpage - 3)) {
                $pagination .= '<li><a onclick="return false;">...</a></li>';
                $track2 = 1;
            }

            if ($i >= ($lastpage)) {
                if ($i == $page) {
                    $pagination .= '<li><a href="' . addQueryPram('page_no', ($i - 1)) . '">' . ($i - 1) . '</a></li>';
                    $pagination .= '<li><a href="' . addQueryPram('page_no', $i) . '" class="active">' . $i . '</a></li>';
                } else {
                    if ($page != ($lastpage - 1)) {
                        $pagination .= '<li><a href="' . addQueryPram('page_no', ($i - 1)) . '">' . ($i - 1) . '</a></li>';
                    }
                    $pagination .= '<li><a href="' . addQueryPram('page_no', $i) . '">' . $i . '</a></li>';
                }
            }
        }

    }
    if ($page >= $lastpage) {
        $pagination .= '<li><a href="#" onclick="return false;">&raquo;</a></li>';
    } else {
        $pagination .= '<li><a href="' . addQueryPram('page_no', $next) . '">&raquo;</a></li>';
    }

    $pagination .= '</ul></div>';

    return $pagination;
}

function addQueryPram($key, $value)
{
    $currentURL = getCurrentURL();
    if (!isset($_GET[$key]))
        return $currentURL .= (parse_url($currentURL, PHP_URL_QUERY) ? '&' : '?') . "$key=$value";
    else
        return merge_querystring($currentURL, '?' . $key . '=' . $value);
}

function merge_querystring($url, $query, $recursive = false)
{
    // split the url into it's components
    $url_components = parse_url($url);
    // if we have the query string but no query on the original url
    // just return the URL + query string
    if (empty($url_components['query']))
        return $url . '?' . ltrim($query, '?');
    // turn the url's query string into an array
    parse_str($url_components['query'], $original_query_string);
    // turn the query string into an array
    parse_str(parse_url($query, PHP_URL_QUERY), $merged_query_string);
    // merge the query string
    if ($recursive)
        $merged_result = array_merge_recursive($original_query_string, $merged_query_string);
    else
        $merged_result = array_merge($original_query_string, $merged_query_string);
    // Find the original query string in the URL and replace it with the new one
    return str_replace($url_components['query'], http_build_query($merged_result), $url);
}

function getCurrentURL()
{
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
        $link = "https";
    else
        $link = "http";

    $link .= "://";
    $link .= $_SERVER['HTTP_HOST'];
    $link .= $_SERVER['REQUEST_URI'];
    return $link;
}

function env($variable, $default = '')
{
    return isset($_ENV[$variable]) && strlen($_ENV[$variable]) > 0 ? $_ENV[$variable] : $default;
}

function setEnv($variable, $value){
    $_ENV[$variable] = $value;
}

function generateEndDate()
{
    $default = env('DEFAULT_END_DATE', 'default');
    if ($default === 'default') {
        return env('DEFAULT_END_DATE', 'default');
    }
    return json_encode(explode(' ', $default));
}

function rentmyAssetPath($file)
{
    $url = baseURL() . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . $file;
    return backToForwardSlashes($url);
}

function baseURL()
{
    return env('BASE_URL', 'http://localhost');
}

function setBaseURL($baseUrl)
{
    setEnv('BASE_URL', $baseUrl);
}

function url($path = '')
{
    if ($path == '' || $path == '/') {
        return baseURL();
    }
    return baseURL() . '/page/' . $path;
}

function getTheme(){
   $theme = env('THEME', getDefaultTheme());
   $themePath = getThemePath($theme);
   if (is_dir($themePath)){
      return $theme;
   }

   die('Invalid theme path.');
}

function setTheme($theme){
    setEnv('THEME', $theme);
}

function getDefaultTheme(){
    return 'default';
}

function getThemePath($theme = ''){
    if ($theme == '')
        $theme = getTheme();

    return 'themes' . DIRECTORY_SEPARATOR . $theme . DIRECTORY_SEPARATOR;
}

function getThemeInclude($file, $theme = ''){
    if ($theme == '')
        $theme = getTheme();

    return 'themes' . DIRECTORY_SEPARATOR . $theme . DIRECTORY_SEPARATOR . 'includes' . DIRECTORY_SEPARATOR . $file;
}

function getThemePage($file, $theme = ''){
    if ($theme == '')
        $theme = getTheme();

    return 'themes' . DIRECTORY_SEPARATOR . $theme . DIRECTORY_SEPARATOR . 'pages' . DIRECTORY_SEPARATOR . $file;
}

function rentmyThemeAssetPath($file, $theme = '')
{
    if ($theme == '')
        $theme = getTheme();

    $url = baseURL() . DIRECTORY_SEPARATOR . 'themes'.DIRECTORY_SEPARATOR. $theme. DIRECTORY_SEPARATOR .'assets'.DIRECTORY_SEPARATOR. $file;
    return backToForwardSlashes($url);
}
/**
 * Get language file for any theme
 * @param $file
 * @param string $theme
 * @return string
 */
function getThemeLanguageInclude($theme = '')
{
    if ($theme == '')
        $theme = getTheme();

    $language = env('LANGUAGE', 'en');
    $languageFilePath = getThemePath($theme) . 'assets' . DIRECTORY_SEPARATOR . 'local' . DIRECTORY_SEPARATOR . $language . '.php';
    if (file_exists($languageFilePath)) {
        $theme_language = require_once $languageFilePath;
        return $theme_language;
    }
    die('Language file missing');
}
function loadThemeAssets($page, $theme = '', $isMenual = false){
    $css = '';
    $js = '';
    $fontsIcons = '';

    if ($isMenual && $theme == getDefaultTheme()){
        $themePagePath = getThemePage($page.'.php', getTheme());
        if (file_exists($themePagePath)) {
            return (object)[
                'fontsIcons' => $fontsIcons,
                'css' => $css,
                'js' => $js
            ];
        }
    }

    $themeConfig = loadThemeConfig($theme);

    if (isset($themeConfig['css']) && !empty($themeConfig['css'])){
        foreach ($themeConfig['css'] as $type => $styles){
            //load global style
            if ($type == 'global' && !empty($styles)){
                foreach ($styles as $globalStyle){
                    $style  = rentmyThemeAssetPath('css'.DIRECTORY_SEPARATOR.$globalStyle, $theme);
                    if (validURL($globalStyle))
                        $style = $globalStyle;

                    $css .= "<link rel='stylesheet' type='text/css' href='$style' />";
                }
            }elseif ($type == 'fontsIcons' && !empty($styles)){
                foreach ($styles as $pageStyle){
                    $style  = rentmyThemeAssetPath('css'.DIRECTORY_SEPARATOR.$pageStyle, $theme);
                    if (validURL($pageStyle))
                        $style = $pageStyle;

                    $fontsIcons .= "<link rel='stylesheet' type='text/css' href='$style' />";
                }
            }elseif ($type == $page && !empty($styles)){
                foreach ($styles as $pageStyle){
                    $style  = rentmyThemeAssetPath('css'.DIRECTORY_SEPARATOR.$pageStyle, $theme);
                    if (validURL($pageStyle))
                        $style = $pageStyle;

                    $css .= "<link rel='stylesheet' type='text/css' href='$style' />";
                }
            }
        }
    }

    if (isset($themeConfig['js']) && !empty($themeConfig['js'])){
        foreach ($themeConfig['js'] as $type => $scripts){
            //load global style
            if ($type == 'global' && !empty($scripts)){
                foreach ($scripts as $globalScript){
                    $script  =  rentmyThemeAssetPath('js'.DIRECTORY_SEPARATOR.$globalScript, $theme);
                    if (validURL($globalScript))
                        $script = $globalScript;

                    $js .= "<script src=".$script."></script>";
                }
            }elseif ($type == $page && !empty($scripts)){
                foreach ($scripts as $pageScript){
                    $script  =  rentmyThemeAssetPath('js'.DIRECTORY_SEPARATOR.$pageScript, $theme);
                    if (validURL($pageScript))
                        $script = $pageScript;

                    $js .= "<script src=".$script."></script>";
                }
            }
        }
    }

    return (object) [
        'fontsIcons' => $fontsIcons,
        'css' => $css,
        'js' => $js
    ];
}

function getThemeMeta($theme = ''){
    $themeConfig = loadThemeConfig($theme);
    $meta = [];
    if (isset($themeConfig['theme'])){
        $meta = $themeConfig['theme'];
    }
    return $meta;
}

function getThemeSettings($theme = ''){
    $themeConfig = loadThemeConfig($theme);
    $settings = [];
    if (isset($themeConfig['settings'])){
        $settings = $themeConfig['settings'];
    }
    return $settings;
}

function isDefaultTheme($theme = ''){
    if ($theme == '')
        $theme = getTheme();

    return $theme === getDefaultTheme();
}

function loadThemeConfig($theme = ''){
    if ($theme == '')
        $theme = getTheme();

    $config = [];
    $configPath = getThemePath($theme).'config.php';
    if (file_exists($configPath)){
        $config = require $configPath;
    }
    return $config;
}

function getFavIconPath(){
    $path = rentmyThemeAssetPath('img/favicon.ico');
    if (file_exists($path))
        return $path;

    return rentmyThemeAssetPath('img/favicon.ico', getDefaultTheme());
}

function validURL($url){
   return filter_var($url, FILTER_VALIDATE_URL);
}

function backToForwardSlashes($str){
    return str_replace('\\', '/', $str);
}
