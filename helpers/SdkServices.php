<?php

use RentMy\Config;
use RentMy\Products;
use RentMy\RentMy;
use RentMy\RentMyToken;
use RentMy\Pages;

class SdkServices
{
    private $storeUID, $apiKey, $apiSecret, $storeName;


    public function __construct($config = [])
    {
        $this->storeUID = $config['storeUID'] ?? '';
        $this->apiKey = $config['apiKey'] ?? '';
        $this->apiSecret = $config['apiSecret'] ?? '';
        $this->storeName = $config['storeName'] ?? '';
        // get token from url (store name)
        if (!empty($this->storeName)) {
            if (!isset($_SESSION['RentMy']) || (isset($_SESSION['RentMy']) && !isset($_SESSION['RentMy']['accessToken']))) {
                $this->setTokenFromStoreName($this->storeName);
            }
        } else { // get token from apiKey and secret.
            //check if token did have, generate it
            if (!isset($_SESSION['RentMy']) || (isset($_SESSION['RentMy']) && !isset($_SESSION['RentMy']['accessToken']))) {
                $this->setTotken();
            }
        }
    }

    /**
     * generate from from store name or url and set accessToken
     * @param $storeName
     */
    private function setTokenFromStoreName($storeName)
    {
        $tokenObj = new RentMyToken();
        $token = $tokenObj->getTokenFromStoreName($storeName, ['disable_default_time' => true]);
        if (is_array($token) && !empty($token)) {
            $_SESSION['RentMy']['accessToken'] = $token['token'];
            $_SESSION['RentMy']['refreshToken'] = $token['refresh_token'];
            $_SESSION['RentMy']['storeId'] = $token['store_id'];
            $_SESSION['RentMy']['locationId'] = $token['location_id'];
            $_SESSION['RentMy']['storeName'] = $storeName;
            $_SESSION['RentMy']['store_logo'] = $token['store_logo'];
            $config = new Config($_SESSION['RentMy']['accessToken'], $_SESSION['RentMy']['locationId']);
            $config->store_config();
        }
    }


    private function setTotken()
    {
        $tokenObj = new RentMyToken();
        $token = $tokenObj->getToken($this->apiKey, $this->apiSecret, ['disable_default_time' => true]);
        if (is_array($token) && !empty($token)) {
            $_SESSION['RentMy']['accessToken'] = $token['token'];
            $_SESSION['RentMy']['refreshToken'] = $token['refresh_token'];
            $_SESSION['RentMy']['storeId'] = $token['store_id'];
            $_SESSION['RentMy']['locationId'] = $token['location_id'];
            $_SESSION['RentMy']['storeName'] = $token['store_name'];
            $_SESSION['RentMy']['store_logo'] = $token['store_logo'];
            $config = new Config($_SESSION['RentMy']['accessToken'], $_SESSION['RentMy']['locationId']);
            $config->store_config();
        }
    }

    public function removeToken()
    {
        if (isset($_SESSION['RentMy']))
            unset($_SESSION['RentMy']);
    }

    public function getToken()
    {
        return $_SESSION['RentMy']['accessToken'] ?? null;
    }

    public function isStoreInit()
    {
        if ($this->getStoreSlug())
            return true;

        return false;
    }

    public function getStoreSlug()
    {
        return $_SESSION['RentMy']['storeName'] ?? null;
    }

    public function getStoreId()
    {
        return $_SESSION['RentMy']['storeId'] ?? 0;
    }

    public function getLocationId()
    {
        return $_SESSION['RentMy']['locationId'] ?? 0;
    }

    public function getCartToken()
    {
        return (new \RentMy\Cart($this->getToken(), $this->getLocationId()))->getCartToken();
    }

    public function getCategories()
    {
        $categoryObj = new Config($this->getToken(), $this->getLocationId());
        return $categoryObj->categories();
    }

    public function getProducts($category_id = '', $search = '', $pageNo = 1, $limit = 20, $sort_by = 'sort_by', $sort_dir = 'ASC', $tag = '', $price_min='', $price_max='',$purchase_type='')
    {
        $productsObj = new Products($this->getToken(), $this->getLocationId());

        $offset = ($pageNo - 1) * $limit;
        if ($category_id != '') {
            $product_list = $productsObj->productListByCategory([
                'page_no' => $pageNo,
                'limit' => $limit,
                'tag_id' => $tag,
                'sort_by' => $sort_by,
                'sort_dir' => $sort_dir,
                'search' => $search,
                'category_id' => $category_id,
                'price_max' => $price_max,
                'price_min' => $price_min,
                'purchase_type' => $purchase_type
            ]);
        } elseif ($search != '') {
            $product_list = $productsObj->productSearch([
                'page_no' => $pageNo,
                'limit' => $limit,
                'tag_id' => $tag,
                'sort_by' => $sort_by,
                'sort_dir' => $sort_dir,
                'search' => $search,
            ]);

        } else {
//            if(!empty($_SESSION['RentMy']['rent_start']) &&  !empty($_SESSION['RentMy']['rent_end'])){
//                $product_list = $productsObj->productsByPrice([
//                    'page_no' => $pageNo,
//                    'limit' => $limit,
//                    'tag_id' => '',
//                    'sort_by' => $sort_by,
//                    'sort_dir' => $sort_dir,
//                    'search' => $search,
//                    'start_date'=> urlencode($_SESSION['RentMy']['rent_start']),
//                    'end_date'=> urlencode($_SESSION['RentMy']['rent_end']),
//                    'location_id' => $this->getLocationId()
//                ]);
//
//            }else {
            $product_list = $productsObj->productList([
                'page_no' => $pageNo,
                'limit' => $limit,
                'tag_id' => $tag,
                'sort_by' => $sort_by,
                'sort_dir' => $sort_dir,
                'search' => $search,
            ]);
            // }
        }
        return [
            'products' => $product_list['result']['data'] ?? [],
            'total' => $product_list['result']['total'] ?? 0,
            'pagination' => pagination($pageNo, $product_list['result']['total'] ?? 0, $limit)
        ];
    }

    public function get_variant_chain($data)
    {
        $params = [
            'product_id' => $data['product_id'], // product id
            'variant_id' => $data['variant_id'],  // select variants id
            'rent_type' => $data['rent_type'] // buy or rent
        ];
        $productObj = new Products($this->getToken(), $this->getLocationId());
        $response = $productObj->get_product_variant_chain($params);
        return $response;
    }

    public function getProductDetails($uuid)
    {
        $productObj = new Products($this->getToken(), $this->getLocationId());
        $response = $productObj->details($uuid);
        return $response;
    }

    public function getProductPackageDetails($uuid)
    {
        $productObj = new Products($this->getToken(), $this->getLocationId());
        $response = $productObj->package_details($uuid);
        return $response;
    }

    public function get_last_variant($data)
    {
        $params = [
            'product_id' => $data['product_id'],
            'variant_id' => $data['variant_id'],
            'chain_id' => $data['chain_id'],
            'rent_type' => $data['rent_type'] // buy or rent
        ];
        $response = array();
        $productObj = new Products($this->getToken(), $this->getLocationId());
        $response = $productObj->get_product_fromchain($params);
        if (!empty($response['prices'][0])) {
            foreach ($response['prices'][0] as $key => $prices) {
                if ($key == 'base') {
                    $fPrice = RentMy::currency(isset($prices['price']) ? $prices['price'] : '');
                    $response['prices'][0][$key] = array();
                    $response['prices'][0][$key]['html'] = $fPrice;
                } else {
                    foreach ($prices as $i => $price) {
                        if ($i == 0) {
                            $fPrice = RentMy::currency($price['price']) . " for " . $price['duration'] . " " . $price['label'];
                        }
                        $priceOptions = '<div><label class="radio-container" for="rent">';
                        if ($i == 0) {
                            $priceOptions .= '<input type="radio" checked="checked"  name="rental-price" value="' . $price['id'] . '"/>&nbsp;';
                        } else {
                            $priceOptions .= '<input type="radio" name="rental-price" value="' . $price['id'] . '"/>&nbsp;';
                        }
                        $priceOptions .= RentMy::currency($price['price']) . '/' . $price['duration'] . ' ' . $price['label'];
                        $priceOptions .= '<span class="checkmark"></span></label></div>';
                        $response['prices'][0][$key][$i] = array();
                        $response['prices'][0][$key][$i]['price_options'] = $priceOptions;
                        $response['prices'][0][$key][$i]['html'] = $fPrice;

                    }
                }
            }
        }
        return $response;
    }

    public function get_dates_price_duration($data)
    {
        if (isset($_SESSION['RentMy']['rent_start'])) {
            $params = [
                'start_date' => $_SESSION['RentMy']['rent_start'], // product id
                'price_id' => $data['price_id'],  // select variants id
                'location' => $this->getLocationId() // buy or rent
            ];
            $productObj = new Products($this->getToken(), $this->getLocationId());
            return $productObj->getDatesPriceDuration($params);
        }

        return [
            'status' => 'NOK',
            'message' => 'No date has been set'
        ];
    }

    public function get_price_value($data)
    {
        $params = [
            'product_id' => $data['product_id'],
            'quantity' => $data['quantity'],
            'variants_products_id' => $data['variants_products_id'],
            'rent_start' => $data['rent_start'],
            'rent_end' => $data['rent_end']
        ];
        $productObj = new Products($this->getToken(), $this->getLocationId());
        $response = $productObj->get_price_value($params);
        return $response;
    }

    public function addToCart($data)
    {
        $cartObj = new \RentMy\Cart($this->getToken(), $this->getLocationId());

        if (isset($_SESSION['RentMy']) && isset($_SESSION['RentMy']['rent_start'])) {
            $data['rent_start'] = $_SESSION['RentMy']['rent_start'];
        }
        if (isset($_SESSION['RentMy']) && isset($_SESSION['RentMy']['rent_end'])) {
            $data['rent_end'] = $_SESSION['RentMy']['rent_end'];
        }

        if (
            $data['rental_type'] == 'buy' //in case cart for buy
            ||
            (isset($data['rent_start']) && isset($data['rent_end'])) //when rent and has rent duration
        ) {
            if ($data['product_type'] == 1)
                return $cartObj->addToCart($data);
            else
                return $cartObj->addPackageToCart($data);
        }

        $data['type'] = 'cart';
        $data['token'] = $cartObj->getCartToken();

        return $cartObj->addToCartWithoutDate($data);
    }

    public function add_package_to_cart($data)
    {
        $cartObj = new \RentMy\Cart($this->getToken(), $this->getLocationId());
        $response = $cartObj->addPackageToCart($data);
        return $response;
    }

    public function get_cart_availability($data)
    {
        $cartObj = new \RentMy\Cart($this->getToken(), $this->getLocationId());
        $resonse = $cartObj->getCartAvailability($data);
        return $resonse;
    }

    public function update_cart_quantity($data)
    {
        $cartObj = new \RentMy\Cart($this->getToken(), $this->getLocationId());
        $data['type'] = 'cart';
        $data['token'] = $cartObj->getCartToken();
        // if no start & end date , then call add to cart api instead of update cart .
        $start_date = $cartObj->getRentStart();
        $end_date = $cartObj->getRentEnd();

        if (isset($data['cart_item_id'])){
            $data['id'] = $data['cart_item_id'];
        }

        if (empty($start_date) && empty($end_date)) {
            $data['action'] = 'update-cart-item';
            if ($data['increment'] == 1)
                $data['quantity'] = 1;
            else
                $data['quantity'] = -1;

            $response = $cartObj->addToCartWithoutDate($data);
        } else {
            $response = $cartObj->updateCart($data);
        }
        return $response;
    }

    public function delete_cart_item($data)
    {
        $cartObj = new \RentMy\Cart($this->getToken(), $this->getLocationId());
        $response = $cartObj->deleteCart($data);
        return $response;
    }

    public function getCartAvailability(){
        return (new Products($this->getToken(), $this->getLocationId()))->getAvailability([
            'type'  => 'cart',
            'token' => $this->getCartToken()
        ]);
    }

    public function apply_coupon($data)
    {
        $cartObj = new \RentMy\Cart($this->getToken(), $this->getLocationId());
        $response = $cartObj->applyCoupon($data);
        return $response;
    }

    public function change_package_variants($data)
    {

        $productObj = new Products($this->getToken(), $this->getLocationId());

        return $productObj->get_pacakge_info_by_variant($data);
    }

    public function get_delivery_cost($data)
    {
        $checkoutObj = new \RentMy\Checkout($this->getToken(), $this->getLocationId());
        return $checkoutObj->getDeliveryCost($data);
    }

    public function get_shipping_method($data)
    {
        $checkoutObj = new \RentMy\Checkout($this->getToken(), $this->getLocationId());
        return $checkoutObj->getShippingListByKN($data);
    }

    public function currencyFormat($data)
    {
        return RentMy::currency($data['amount']);
    }

    public function get_states($data)
    {
        $checkoutObj = new \RentMy\Config($this->getToken(), $this->getLocationId());
        return $checkoutObj->statesByCountry($data['country_id']);
    }

    public function add_shipping_to_cart($data)
    {

        unset($data['action_type']);
        $checkoutObj = new \RentMy\Checkout($this->getToken(), $this->getLocationId());
//        $checkoutObj->saveFulfilment($data);
        $response = $checkoutObj->addShippingToCarts($data);
        $html = '';

//        if ($response['status'] == 'OK') {
//            if ($data['from'] == 'pickup') {
//
//            } else {
//                $html = '<table class="shop_table checkout-ordertable" id="rm_review">
//            <tfoot>
//                <tr class="cart-subtotal">
//                    <th>Subtotal</th>
//                    <td><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol"></span><span class="subtotal">' . \RentMy\RentMy::currency($response['result']['data']['sub_total']) . '</span></span>
//                    </td>
//                </tr>
//                <tr class="cart-subtotal">
//                    <th>Shipping Charge</th>
//                    <td><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol"></span><span class="shipping_charge">' . \RentMy\RentMy::currency($response['result']['data']['delivery_charge']) . '</span></span>
//                    </td>
//                </tr>
//                <tr class="cart-subtotal">
//                    <th>Discount </th>
//                    <td><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol"></span><span class="discount">' . \RentMy\RentMy::currency($response['result']['data']['total_discount']) . '</span></span>
//                    </td>
//                </tr>
//                <tr class="cart-subtotal">
//                    <th>Tax </th>
//                    <td><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol"></span><span class="tax">' . \RentMy\RentMy::currency($response['result']['data']['tax']) . '</span></span>
//                    </td>
//                </tr>
//
//                <tr class="order-total">
//                    <th>Total</th>
//                    <td><strong><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol"></span><span class="total">' . \RentMy\RentMy::currency($response['result']['data']['total']) . '</span></span></strong> </td>
//                </tr>
//
//            </tfoot>
//        </table>';
//            }
//            $response['html'] = $html;
//        }

        return $response;
    }

    public function get_package_value($data)
    {
        $productObj = new Products($this->getToken(), $this->getLocationId());
        return $productObj->get_package_value($data);
    }

    public function createOrder($data)
    {
        $checkoutObj = new \RentMy\Checkout($this->getToken(), $this->getLocationId());
        return $checkoutObj->doCheckout($data);
    }

    public function addAdditionalServiceToCart($data)
    {
        $orderObj = new \RentMy\Order($this->getToken(), $this->getLocationId());
        $data['cart_token'] = $_SESSION['RentMy']['cart_token'];
        unset($data['action_type']);
        $additional_charges = str_replace("\\", "", $data['additional_charges']);
        $data['additional_charges'] = json_decode($data['additional_charges']);
        return $orderObj->addServicesWithCartTotal($data);
    }

    public function cartAdditionalServices($data)
    {
        $orderObj = new \RentMy\Order($this->getToken(), $this->getLocationId());
        return $orderObj->getOrderAdditionalServices($data['type'], $_SESSION['RentMy']['cart_token']);
    }

    public function additionalServices($data)
    {
        $orderObj = new \RentMy\Order($this->getToken(), $this->getLocationId());
        return $orderObj->getAdditionalServices($_SESSION['RentMy']['cart_token']);
    }

    public function getCartInfo()
    {
        $orderObj = new \RentMy\Cart($this->getToken(), $this->getLocationId());
        return $orderObj->viewCart();
    }

    public function get_location_list()
    {
        $configObj = new Config($this->getToken(), $this->getLocationId());
        return $configObj->getLocationList();
    }

    public function countries()
    {
        $configObj = new Config($this->getToken(), $this->getLocationId());
        return $configObj->countries();

    }

    public function delivery_settings()
    {
        $configObj = new Config($this->getToken(), $this->getLocationId());
        return $configObj->getDeliverySettings();
    }

    public function store_config()
    {
        $configObj = new Config($this->getToken(), $this->getLocationId());
        return $configObj->store_config();
    }

    public function payment_methods()
    {
        $configObj = new Config($this->getToken(), $this->getLocationId());
        return $configObj->getPaymentGateWays();
    }

    public function storeContents()
    {
        if (isset($_SESSION['RentMy']) && isset($_SESSION['RentMy']['content']) && !empty($_SESSION['RentMy']['content']))
            return $_SESSION['RentMy']['content'];

        $configObj = new Config($this->getToken(), $this->getLocationId());
        return $_SESSION['RentMy']['content'] = $configObj->store_contents();
    }


    public function setRentDateTime($data)
    {
        $cartObj = new \RentMy\Cart($this->getToken(), $this->getLocationId());
        if (empty($data['start_time'])) {
            $data['start_time'] = env('DEFAULT_START_TIME');
        }
        if (empty($data['end_time'])) {
            $data['end_time'] = env('DEFAULT_END_TIME');
        }
        if (empty($data['rent_end'])) {
            $data['rent_end'] = $data['rent_start'];
        }

        $rentStart = date('Y-m-d H:i', strtotime($data['rent_start'] . ' ' . $data['start_time']));
        $rentEnd = date('Y-m-d H:i', strtotime($data['rent_end'] . ' ' . $data['end_time']));

        if (strtotime($rentStart) > strtotime($rentEnd)) {
            return [
                'status' => 'NOK',
                'cartReset' => false,
                'result' => [
                    'message' => 'Invalid Rental Date'
                ]
            ];
        }

        $cartObj->setRentStart($rentStart);
        $cartObj->setRentEnd($rentEnd);
//        if (isset($data['rent_start']) && isset($data['start_time'])) {
//            $rentStart = date('Y-m-d H:i', strtotime($data['rent_start'] . ' ' . $data['start_time']));
//            $cartObj->setRentStart($rentStart);
//            $result['rent_start'] = ($rentStart);
//        }
//
//        if (isset($data['rent_end']) && isset($data['end_time'])) {
//            $rentEnd = date('Y-m-d H:i', strtotime($data['rent_end'].' '.$data['end_time']));
//            $cartObj->setRentEnd($rentEnd);
//            $result['rent_end'] = ($rentEnd);
//        }

        //anything else return without cart and only date time and structure it to simulate as cart object
        $response = [
            'result' => [
                'data' => [
                    'rent_start' => $cartObj->getRentStart(),
                    'rent_end' => $cartObj->getRentEnd(),
                    'cart_items' => []
                ],
            ],
            'status' => 'OK'
        ];

        //check if cart has token, get the cart then check if cart item not empty then apply availability
//        if ($cartObj->getCartToken()){
//            $cart = $cartObj->viewCart();
//            if (!empty($cart['result']['data']['cart_items'])) {
//
//            }
//        }

        $response = $this->get_cart_availability([
            'source' => 'nano',
            'type' => "cart",
            'start_date' => $cartObj->getRentStart(),
            'end_date' => $cartObj->getRentEnd(),
        ]);

        if (isset($response['result']) && isset($response['result']['error'])) {
            $errors = [
                'ids' => array_map(function ($error) {
                    return $error['id'];
                }, $response['result']['error']),
                'notAvailableItems' => $response['result']['error'],
                'message' => $response['result']['message'] ?? ''
            ];
            $response['errors'] = $errors;
            $response['status'] = 'OK';
        }

        //any result should be formatted for js
        return responseFormatAfterCart($response, $this->getStoreId());

    }

    public function navigations()
    {
        if (isset($_SESSION['RentMy']) && isset($_SESSION['RentMy']['navigations']) && !empty($_SESSION['RentMy']['navigations']))
            return $_SESSION['RentMy']['navigations'];

        $configObj = new Config($this->getToken(), $this->getLocationId());
        return $_SESSION['RentMy']['navigations'] = $configObj->navigations();
    }

    public function paymentConfig()
    {
        $configObj = new Config($this->getToken(), $this->getLocationId());
        return $configObj->partialPaymentConfig();
    }

    public function aboutUs()
    {
        $aboutUsObj = new Pages($this->getToken(), $this->getLocationId());
        return $aboutUsObj->aboutUs();
    }

    public function contactUs()
    {
        $contactUsObj = new Pages($this->getToken(), $this->getLocationId());
        return $contactUsObj->contactUs();
    }

    public function sendEmailFromContact($data)
    {
        $sendData = new Pages($this->getToken(), $this->getLocationId());
        return $sendData->sendEmailFromContact($data);
    }

    public function customPage($slug)
    {
        $customPageData = new Pages($this->getToken(), $this->getLocationId());
        return $customPageData->customPage($slug);
    }

    public function newsSubscribe($data)
    {
        $subscribeData = new Pages($this->getToken(), $this->getLocationId());
        return $subscribeData->newsSubscribe($data);
    }

    public function tags()
    {
        $subscribeData = new Config($this->getToken(), $this->getLocationId());
        return $subscribeData->config('tags');
    }

    public function getFeaturedProducts(){
        $productObj = new Products($this->getToken(), $this->getLocationId());
        return $productObj->get_featured_products();
    }
    public function getRentalStartDate(){
        $cartObj = new \RentMy\Cart($this->getToken(), $this->getLocationId());
        return $cartObj->getRentStart();
    }
}
