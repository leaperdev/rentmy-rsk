<?php
$sdkServices = new SdkServices();
$orderObj = new RentMy\Order($sdkServices->getToken(), $sdkServices->getStoreId());
$view_order = $orderObj->viewOrderDetails($_SESSION['RentMy']['order_uid']);

$order_data = !empty($view_order['result']['data']) ? $view_order['result']['data'] : null;
$order_items = !empty($order_data['order_items']) ? $order_data['order_items'] : null;
$order_id = !empty($order_data['id']) ? $order_data['id'] : null;
$order_charges = $orderObj->getOrderAdditionalServices('order',$order_id);

$pdfUrl = RentMy\RentMy::$apiUrl .'/pages/pdf?order_id='.$order_id;
?>

<?php if (!empty($order_items)) { ?>
<section class="rentmy-cart-wrapper  <?php echo isset($page) ? $page : '' ?>">
    <div class="rentmy-ordercomplete-success-message">
        Thank you, for your order
    </div>
    <div class="rentmy-container">
        <div class="rentmy-row rentmy-cart-top">
            <div class="rentmy-column-12">
                <div class="rentmy-cart-ordertable">
                    <table>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($order_items as $key => $cart_items) { ?>
                        <tr>
                            <td><?php echo $cart_items['product']['name']; ?></td>
                            <td><?php echo \RentMy\RentMy::currency($cart_items['price']); ?></td>
                            <td><?php echo $cart_items['quantity']; ?></td>
                            <td><?php echo \RentMy\RentMy::currency($cart_items['sub_total'], 'pre', 'rentmy-cart-row-sub_total-' . $cart_items['id'], 'post'); ?></td>
                        </tr>
                        <?php } ?>
                        <?php if(!empty($order_charges['result']) && count($order_charges['result']['data']) > 0){?>
                        <tr>
                            <td colspan="4" class="rentmy-optional-service-tablearea">
                                <table class="rentmy-ordrcomplete-optionalservice-table">
                                    <thead class="border-0">
                                    <tr>
                                        <th colspan="2">Optional Service</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php foreach($order_charges['result']['data'] as $charge){?>
                                    <tr>
                                        <td><b><?php echo $charge['note'];?></b></td>
                                        <td><?php echo \RentMy\RentMy::currency($charge['amount']); ?></td>
                                    </tr>
                                    <?php } ?>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <?php } ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="rentmy-row rentmy-cart-bottom">
            <div class="rentmy-column-6">

            </div>
            <div class="rentmy-column-6">
                <div class="rentmy-cart-order-summery">
                    <h5>Cart Total</h5>
                    <table class="table">
                        <tbody>
                        <tr>
                            <td>Additional Services</td>
                            <td>
                                <span><b> <?php echo \RentMy\RentMy::currency($order_data['additional_charge']); ?> </b></span>
                            </td>
                        </tr>
                        <tr>
                            <td>Subtotal</td>
                            <td>
                                <span><b> <?php echo \RentMy\RentMy::currency($order_data['sub_total'], 'pre', 'rentmy-cart-sub_total', 'post'); ?> </b></span>
                            </td>
                        </tr>
                        <tr>
                            <td>Shipping Charge</td>
                            <td><span> <?php echo \RentMy\RentMy::currency($order_data['delivery_charge'], 'pre', 'rentmy-cart-sub_total', 'post'); ?> </span></td>
                        </tr>
                        <tr>
                            <td>Discount</td>
                            <td><span> <?php echo \RentMy\RentMy::currency($order_data['total_discount'], 'pre', 'rentmy-cart-total_discount', 'post'); ?></span></td>
                        </tr>
                        <tr>
                            <td>Tax</td>
                            <td><span> <?php echo \RentMy\RentMy::currency($order_data['tax'], 'pre', 'rentmy-cart-tax', 'post'); ?></span></td>
                        </tr>
                        <tr>
                            <td>Deposited Amount</td>
                            <td><span> <?php echo \RentMy\RentMy::currency($order_data['total_deposit'], 'pre', 'rentmy-cart-deposit_amount', 'post'); ?></span></td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Total</h4>
                            </td>
                            <td>
                                <h4> <?php echo \RentMy\RentMy::currency($order_data['total'], 'pre', 'rentmy-cart-total', 'post'); ?></h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <a class="rentmy-button" href="<?php echo $pdfUrl; ?>">Download Receipt </a>
                </div>
            </div>
        </div>
    </div>
</section>
<?php } ?>