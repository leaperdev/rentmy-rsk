<?php

$data = $_POST;

if (!empty($data)) {
    $action = $data['action_type'];
    switch ($action) {
        case 'get_variant_chain':  // when multiple variants and select variant except last
           $result = $sdkServices->get_variant_chain($data);
           break;
        case 'get_last_variant': // select last variant set
            $result = $sdkServices->get_last_variant($data);
            break;
        case 'get_dates_price_duration': // get availability and dates when change pricing options
            $result = $sdkServices->get_dates_price_duration($data);
            break;

        case 'get_price_value':
            $result = $sdkServices->get_price_value($data);
            break;
        case 'add_to_cart':
            $result = responseFormatAfterCart($sdkServices->addToCart($data), $sdkServices->getStoreId());
            break;
        case 'get_cart_availability':
            $result = $sdkServices->get_cart_availability($data);
            break;
        case 'cart_available_counts':
            $result = $sdkServices->getCartAvailability();
            break;
        case 'cart_quantity_update':
            $result = responseFormatAfterCart($sdkServices->update_cart_quantity($data), $sdkServices->getStoreId());
            break;
        case 'delete_cart_item':
            $result = responseFormatAfterCart($sdkServices->delete_cart_item($data), $sdkServices->getStoreId());
            break;
        case 'apply_coupon':
            $result = $sdkServices->apply_coupon($data);
            break;
        case 'change_package_variants':
            $result = $sdkServices->change_package_variants($data);
            break;
        case 'get_package_value':
            $result = $sdkServices->get_package_value($data);
            break;
        case 'add_package_to_cart':
            $result = responseFormatAfterCart($sdkServices->add_package_to_cart($data), $sdkServices->getStoreId());
            break;
        case 'get_delivery_cost':
            $result = $sdkServices->get_delivery_cost($data);
            break;
        case 'get_shipping_method':
            $result = $sdkServices->get_shipping_method($data);
            break;
        case 'get_state_by_country':
            $result = $sdkServices->get_states($data);
            break;
        case 'shipping_to_cart':
            $result = $sdkServices->add_shipping_to_cart($data);
            break;
        case 'createOrder':
            $result = $sdkServices->createOrder($data);
            break;
        case 'add_additional_service_to_cart':
            $result = $sdkServices->addAdditionalServiceToCart($data);
            break;
        case 'cart_additional_services':
            $result = $sdkServices->cartAdditionalServices($data);
            break;
        case 'get_additional_services':
            $result = $sdkServices->additionalServices($data);
            break;
        case 'view_cart_info':
            $result = $sdkServices->getCartInfo($data);
            break;
        case 'set_cart_date_time':
            $result = $sdkServices->setRentDateTime($data);
            break;
        case 'currency_format':
            $result = $sdkServices->currencyFormat($data);
            break;
        case 'product_details':
            if (isset($data['isPackage']) && $data['isPackage'] == 1) {
                $result = $sdkServices->getProductPackageDetails($data['uid']);
                if (isset($result['data'])  && !empty($result['data'])){
                    $product = $result['data'];
                    $product['images'] = getProductImages($product, $sdkServices->getStoreId());
                    $result['result']['data'] =  $product;
                    $result['result']['data']['isPackage'] = 1;
                    $result['status'] = 'OK';
                    unset($result['data']);
                }
            }else {
                $result = $sdkServices->getProductDetails($data['uid']);
                if (isset($result['status'])  && $result['status']== 'OK'){
                    $product = $result['result']['data'];
                    $product['images'] = getProductImages($product, $sdkServices->getStoreId());
                    $result['result']['data'] =  $product;
                    $result['result']['data']['isPackage'] = 0;
                }
            }

            break;
        case 'location_list':
            $result = $sdkServices->get_location_list();
            break;
        case 'countries':
            $result = $sdkServices->countries();
            break;
        case 'get_delivery_settings':
            $result = $sdkServices->delivery_settings();
            break;
        case 'get_store_config':
            $result = $sdkServices->store_config();
            break;
        case 'get_payment_methods':
            $result = $sdkServices->payment_methods();
            break;
        case 'payment_config':
            $result = $sdkServices->paymentConfig();
            break;
        case 'send_contact_email':
            $result = $sdkServices->sendEmailFromContact($data);
            break;
        case 'newsletter_subscription':
            $result = $sdkServices->newsSubscribe($data);
            break;
        default:
            $result = [];
            break;
    }

    die(json_encode($result));
}

