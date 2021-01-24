<?php
$siteSpecific = $contents ?? [];
$checkoutInfo = (count($siteSpecific) && isset($siteSpecific['checkout_info'])) ? $siteSpecific['checkout_info'] : [];
$shippingState = (isset($checkoutInfo['lbl_shipping_state'])) ? $checkoutInfo['lbl_shipping_state'] : ($checkoutInfo['lbl_state'].'*');

$cartToken = $sdkServices->getCartToken();

if(empty($cartToken)){
    echo "<script>window.location = '".url('products')."'</script>";
}
?>
<section class="rentmy-checkout-wrapper <?php echo isset($page) ? $page : '' ?>">
        <div class="rentmy-container">
            <div class="rentmy-row">
                <div class="rentmy-column-6">
                    <!-- <div class="rentmy-customer-login">
                        <h5>Returning Customer?<a href="#">Click here to login</a></h5>
                    </div> -->
                    <div class="rentmy-billing-fullfilment-content">
                        <div class="rentmy-billing-address">
                            <h2 class="rentmy-checkout-title"><?=$checkoutInfo['title_billing']??'Address'?></h2>
                            <span class="rentmy-billing-info-error"></span>
                            <div class="rentmy-row">
                                <div class="rentmy-column-6">
                                    <div class="rentmy-form-group">
                                        <label><?=$checkoutInfo['lbl_first_name'] ?? 'First Name'?></label>
                                        <input type="text" name="first_name"/>
                                    </div>
                                </div>
                                <div class="rentmy-column-6">
                                    <div class="rentmy-form-group">
                                        <label><?=$checkoutInfo['lbl_lastname'] ?? 'Last Name'?></label>
                                        <input type="text" name="last_name"/>
                                    </div>
                                </div>
                                <div class="rentmy-column-6">
                                    <div class="rentmy-form-group">
                                        <label><?=$checkoutInfo['lbl_mobile'] ?? 'Mobile Number'?>*</label>
                                        <input type="text" name="mobile"/>
                                    </div>
                                </div>
                                <div class="rentmy-column-6">
                                    <div class="rentmy-form-group">
                                        <label><?=$checkoutInfo['lbl_email'] ?? 'Email Name'?>*</label>
                                        <input type="email" name="email"/>
                                    </div>
                                </div>
                                <div class="rentmy-column-12">
                                    <div class="rentmy-form-group">
                                        <label><?=$checkoutInfo['lbl_company_name'] ?? 'Company Name(Optional)'?></label>
                                        <input type="text" name="company_name"/>
                                    </div>
                                </div>
                                <div class="rentmy-column-12">
                                    <div class="rentmy-form-group">
                                        <label><?=$checkoutInfo['lbl_country'] ?? 'Country'?></label>
                                        <select class="rentmy-country" name="country">

                                        </select>
                                    </div>
                                </div>
                                <div class="rentmy-column-6">
                                    <div class="rentmy-form-group">
                                        <label><?=$checkoutInfo['lbl_address_line_1'] ?? 'Address Line 1'?></label>
                                        <input type="text" name="address_line1"/>
                                    </div>
                                </div>
                                <div class="rentmy-column-6">
                                    <div class="rentmy-form-group">
                                        <label><?=$checkoutInfo['lbl_address_line_2'] ?? 'Address Line 2'?></label>
                                        <input type="text" name="address_line2"/>
                                    </div>
                                </div>
                                <div class="rentmy-column-6">
                                    <div class="rentmy-form-group">
                                        <label><?=$checkoutInfo['lbl_city'] ?? 'City'?></label>
                                        <input type="text" name="city"/>
                                    </div>
                                </div>
                                <div class="rentmy-column-6">
                                    <div class="rentmy-form-group">
                                        <label><?=$checkoutInfo['lbl_zipcode'] ?? 'Zipcode'?></label>
                                        <input type="text" name="zipcode"/>
                                    </div>
                                </div>
                                <div class="rentmy-column-6">
                                    <div class="rentmy-form-group">
                                        <label><?=$checkoutInfo['lbl_state'] ?? 'State'?></label>
                                        <input type="text" name="state"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- fulfilment area  -->
                        <div class="rentmy-fulfillment">
                            <h2 class="rentmy-checkout-title"><?=$checkoutInfo['title_shipping'] ?? 'Fulfillment'?></h2>
                            <span class="rentmy-fulfillment-error"></span>
                            <div class="rentmy-collaps rentmy-fulfillment-collaps">
                                <div class="rentmy-collaps-item rentmy-fulfillment-collaps-item rentmy-fulfillment-pickup">
                                    <div class="rentmy-collaps-btn rentmy-fulfillment-collaps-btn">
                                        <div class="rentmy-radio-inline">
                                            <label class="rentmy-radio" for="rentmy-checkout-pickup">
                                                <input type="radio" id="rentmy-checkout-pickup" name="rentmy_fulfillment" value="pickup"/> Pickup <span></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="rentmy-collaps-content rentmy-fulfillment-collaps-content">
                                        <div class="rentmy-pickup-location-list">
                                        </div>
                                    </div>
                                </div>
                                <div class="rentmy-collaps-item rentmy-fulfillment-collaps-item">
<!--                                    <div class="rentmy-collaps-btn rentmy-fulfillment-collaps-btn">-->
<!--                                        <div class="rentmy-radio-inline">-->
<!--                                            <label class="rentmy-radio" for="rentmy-checkout-shipping">-->
<!--                                                <input type="radio" id="rentmy-checkout-shipping" name="rentmy_fulfillment" value="shipping"/> Shipping <span></span>-->
<!--                                            </label>-->
<!--                                        </div>-->
<!--                                    </div>-->
                                    <div class="rentmy-collaps-content rentmy-fulfillment-collaps-content">
                                        <div class="renmty-checkout-shipping">
                                            <div class="rentmy-row">
                                                <div class="rentmy-column-6">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_name'] ?? 'Name*'?></label>
                                                        <input type="text" name="shipping_name"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-6">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_mobile'] ?? 'Mobile Number*'?></label>
                                                        <input type="text" name="shipping_mobile"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-12">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_country'] ?? 'Country*'?></label>
                                                        <select class="rentmy-country" name="shipping_country">

                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-12">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_address_line_1'] ?? 'Address Line 1*'?></label>
                                                        <input type="text" name="shipping_address1"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-12">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_address_line_2'] ?? 'Address Line 2'?></label>
                                                        <input type="text" name="shipping_address2"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-6">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_city'] ?? 'City*'?></label>
                                                        <input type="text" name="shipping_city"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-6">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_zipcode'] ?? 'Zipcode*'?></label>
                                                        <input type="text" name="shipping_zipcode"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-6">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$shippingState?></label>
                                                        <input type="text" name="shipping_state"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-12 rentmy-shipping-methods">



                                                </div>

                                            </div>
                                            <div class="rentmy-column-12">
                                                <div class="rentmy-form-group rentmy-text-right">
                                                    <button class="rentmy-button rentmy-btn-shipping-method" name="shipping_method"><?=$checkoutInfo['btn_get_shipping_method'] ?? 'Get shipping method'?></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="rentmy-collaps-item rentmy-fulfillment-collaps-item rentmy-fulfillment-delivery">
                                    <div class="rentmy-collaps-btn rentmy-fulfillment-collaps-btn">
                                        <div class="rentmy-radio-inline">
                                            <label class="rentmy-radio" for="rentmy-checkout-delivery">
                                                <input type="radio" id="rentmy-checkout-delivery" name="rentmy_fulfillment" value="delivery"/> Delivery <span></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="rentmy-collaps-content rentmy-fulfillment-collaps-content">
                                        <div class="renmty-checkout-delivery">
                                            <div class="rentmy-row">
                                                <div class="rentmy-column-6">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_name'] ?? 'Name*'?></label>
                                                        <input type="text" name="shipping_name"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-6">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_mobile'] ?? 'Mobile Number*'?></label>
                                                        <input type="text" name="shipping_phone"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-12">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_country'] ?? 'Country*'?></label>
                                                        <select class="rentmy-country" name="shipping_country">

                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-12">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_address_line_1'] ?? 'Address Line 1*'?></label>
                                                        <input type="text" name="shipping_address1"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-12">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_address_line_2'] ?? 'Address Line 2'?></label>
                                                        <input type="text" name="shipping_address2"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-6">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_city'] ?? 'City*'?></label>
                                                        <input type="text" name="shipping_city"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-6">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$checkoutInfo['lbl_shipping_zipcode'] ?? 'Zipcode*'?></label>
                                                        <input type="text" name="shipping_zipcode"/>
                                                    </div>
                                                </div>
                                                <div class="rentmy-column-6">
                                                    <div class="rentmy-form-group">
                                                        <label><?=$shippingState?></label>
                                                        <input type="text" name="shipping_state"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="rentmy-column-12 rentmy-delivery-cost">

                                            </div>
                                            <div class="rentmy-column-12">
                                                <div class="rentmy-form-group rentmy-text-right">
                                                    <button class="rentmy-button rentmy-btn-delivery-cost"><?=$checkoutInfo['btn_get_delivery_cost'] ?? 'Get delivery cost'?></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rentmy-column-6">
                    <div class="rentmy-checkout-ordersummery">
                        <div class="rentmy-checkout-ordersummery-inner">
                            <h2 class="rentmy-ordersummery-title"><?=$checkoutInfo['title_order_summary'] ?? 'Your Order Summary'?></h2>

                            <div class="rentmy-ordersummery-list">


                            </div>

                            <div class="rentmy-checkout-order-table">

                            </div>

                            <div class="rentmy-optional-service">

                            </div>

                            <div class="rentmy-checkout-payment">
                                <span class="rentmy-payment-error"></span>
                                <div class="rentmy-collaps rentmy-payment-collaps">


                                </div>
                            </div>
                            <div class="rentmy-ordersummery-checkbox">

                                <div class="rentmy-radio-inline">
                                    <label class="rentmy-checkbox" for="rentmy-termcondition">
                                        <input id="rentmy-termcondition" type="checkbox" name="rentmy-termcondition" />
                                        <?=$checkoutInfo['terms_and_condition'] ?? 'I have read and agree with the'?>
                                        <a><?=$checkoutInfo['terms_and_condition_link_label'] ?? 'terms & conditions' ?></a>
                                        <span>&nbsp;&nbsp;</span>
                                    </label>
                                </div>
                                <div class="rentmy-signature-pad" style="display: none;">
                                    <canvas id="rentmy-signature" width="250" height="auto" style=" border: 1px solid #ddd"></canvas>
                                    <br>
                                    <p>
                                    <button class="rentmy-clear-signature">Clear</button>
                                    <span class="">Signature</span>
                                    </p>
                                </div>
                                <span class="rentmy-all-error"></span>
                            </div>
                            <div class="rentmy-ordersummery-button">
                                <a href="/page/cart" type="button" class="rentmy-button rentmy-backtocart-btn"><?=$checkoutInfo['btn_back_to_cart'] ?? 'Back to Cart' ?></a>
                                <button type="button" class="rentmy-button rentmy-placeorder-btn">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
