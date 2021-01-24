<?php

//start session
session_start();

//load composer autoload
include_once 'vendor/autoload.php';

//load the .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

define('ENV', env('ENV'));
define('MODE', env('MODE'));

if (ENV === 'DEV') {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}
include_once 'helpers/SdkServices.php';

if (MODE == 'WEB') {
    // run application using store name from url
    // @TODO parse url and get the store name from url .
    // for localhost, fix the domain name .
    //$validDomains = ['rentmy.co', 'rentmy.leaperdev.rocks', 'rentmy.leaperdev'];

    $localHosts = [
        '127.0.0.1',
        'localhost',
        '127.0.0.2',
        '::1'
    ];

    $requestedHost = isset($_SERVER['SERVER_ADDR']) ? $_SERVER['SERVER_ADDR'] : $_SERVER['REMOTE_ADDR'];

    if (in_array($requestedHost, $localHosts)) {

        $dotenv->required([
            'STORE_SLUG',
        ]);
        $store = env('STORE_SLUG');
    } else {
        $domain = 'rentmy10prod.leaperdev.rocks';
        $url = $_SERVER['HTTP_HOST'];
        $expUrl = explode('.' . $domain, $url);
        if (!empty($expUrl)) {
            $store = $expUrl[0];
        }
        if (isset($store) && $store != '') {
            if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
                $baseUrl = "https";
            else
                $baseUrl = "http";

            $baseUrl .= "://";
            $baseUrl .= $store . '.' . $domain;

            setBaseURL($baseUrl);

        }
    }

    if (!empty($_SESSION['RentMy']['storeName']) && ($store != $_SESSION['RentMy']['storeName'])) {
        unset($_SESSION['RentMy']);
    }

    $config =
        [
            'storeName' => $store
        ];
    $sdkServices = new SdkServices($config);
} else {

    $dotenv->required([
        'STORE_UID',
        'STORE_KEY',
        'STORE_SECRET'
    ]);
    // run application using API KEY and secret .
    $config =
        [
            'storeUID' => env('STORE_UID'),
            'apiKey' => env('STORE_KEY'),
            'apiSecret' => env('STORE_SECRET')
        ];
    $sdkServices = new SdkServices($config);
}

//check if sdk config and successfully connected to the API server
if (!$sdkServices->isStoreInit())
    die('You are not authorized to use this store');

if (isset($_GET['request_type']) && $_GET['request_type'] === 'ajax') {
    include_once 'helpers/ajaxRequestHandler.php';
    exit();
}

/**
 * GLOBAL CONTENT CONFIG
 */
$store_content = $sdkServices->storeContents();
$contents = $store_content[0]['contents'] ?? [];


$storeConfig = $sdkServices->store_config();
$navigations = $sdkServices->navigations();
$storeSlug = $sdkServices->getStoreSlug();

//setTheme('theme1');


//Default page defined as home
$page = 'home';
if (isset($_GET['page']))
    $page = str_replace('-', '_', $_GET['page'] ?? null);

// these 2 line only for nginx
$expPages = explode('/', $page);
$page = end($expPages);

//set page name with extension
$pageName = $page.'.php';


//GET THEME
$theme = getTheme();
$themeMeta = getThemeMeta($theme);
$themeSettings = getThemeSettings($theme);

//read theme config.php and load it, it returns css, js, and label texts
$assets = loadThemeAssets($page, $theme);
if ($theme != getDefaultTheme()){

    $defaultAssets = loadThemeAssets($page, getDefaultTheme(), true);
    $assets->css =  $defaultAssets->css.$assets->css;
    $assets->js =  $defaultAssets->js.$assets->js;
}
// load language file
$language_contents = getThemeLanguageInclude(getDefaultTheme());
//Load head file, that load site meta and style attributes
include_once getThemeInclude('head.php', getDefaultTheme());

//Load header
$excludeHeader = $themeSettings['excludeHeader'] ?? null;
if ( !$excludeHeader ||  (is_array($excludeHeader) && !in_array($page, $excludeHeader)) ){
    $header = getThemeInclude('header.php');
    if (file_exists($header))
        include_once $header;
    else
        include_once getThemeInclude('header.php', getDefaultTheme());;
}

/*
    load body page body according to menu path
    check if custom page
*/
$pageArray = explode("/", $page);
if(in_array('page', $pageArray)){
    $themeCustomPage = getThemePage('custom.php');
    if (file_exists($themeCustomPage))
        include_once $themeCustomPage;
    else
        include_once getThemePage('custom.php', getDefaultTheme());
}else { //if not custom page
    $themePagePath = getThemePage($pageName);
    $defaultPagePath = getThemePage($pageName, getDefaultTheme());
    if (file_exists($themePagePath))
        include_once $themePagePath;
    elseif (file_exists($defaultPagePath))
        include_once $defaultPagePath;
    else {
        $themeNotFound = getThemePage('page404.php');
        if (file_exists($themeNotFound))
            include_once $themeNotFound;
        else
            include_once getThemePage('page404.php', getDefaultTheme());
    }
}

//load cart according to theme config
$excludeCart = $themeSettings['excludeCart'] ?? null;
if ( !$excludeCart ||  (is_array($excludeCart) && !in_array($page, $excludeCart)) ){
    $themeCart = getThemeInclude('cart.php');
    if (file_exists($themeCart))
        include_once $themeCart;
    else
        include_once getThemeInclude('cart.php', getDefaultTheme());
}


//load footer section
$excludeFooter = $themeSettings['excludeFooter'] ?? null;
if ( !$excludeFooter ||  (is_array($excludeFooter) && !in_array($page, $excludeFooter)) ) {
    $themeFooter = getThemeInclude('footer.php');
    if (file_exists($themeFooter))
        include_once $themeFooter;
    else
        include_once getThemeInclude('footer.php', getDefaultTheme());
}

//load script and end document end tag
include_once getThemeInclude('scripts.php', getDefaultTheme());
