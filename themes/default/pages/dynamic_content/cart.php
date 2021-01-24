<?php
$cart = $sdkServices->getCartInfo();
if (isset($cart['status']) && $cart['status'] == 'OK') {
    $products = $cart['result']['data']['cart_items'];
    $cart = $cart['result']['data'];
    unset($cart['result']['data']['cart_items']);
}
$cartToken = $sdkServices->getCartToken();
?>

<?php if(!empty($cartToken)){?>
<section class="rentmy-cart-wrapper <?php echo isset($page) ? $page : '' ?>">
    <div class="rentmy-container">
        <div class="rentmy-row rentmy-cart-top">
            <div class="rentmy-column-12">
                <div class="rentmy-cart-ordertable">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Sales Tax</th>
                            <th>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php if (isset($products) && !empty($products)) { ?>
                            <?php foreach ($products as $item) { ?>
                                <tr>
                                    <td><img src="<?=getProductImage($item['product'], $sdkServices->getStoreId())?>"/></td>
                                    <td><?= $item['product']['name'] . (isset($item['variant_chain_name']) ? ' (' . $item['variant_chain_name'] . ')' : '') ?></td>
                                    <td><?= currencyFormat($item['price'] ?? 0) ?></td>
                                    <td><?= $item['quantity'] ?? 0 ?></td>
                                    <td><?= $item['sales_tax_price'] ?? 0 ?>%</td>
                                    <td><?= currencyFormat($item['sub_total'] ?? 0) ?></td>

                                </tr>
                            <?php } ?>
                        <?php } ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="rentmy-row rentmy-cart-bottom">
            <div class="rentmy-column-6">
                <div class="rentmy-row">
                    <div class="rentmy-column-7">
                        <input class="coupon-code-input" type="text" placeholder="Coupon Code"/>
                    </div>
                    <div class="rentmy-column-5">
                        <button class="rentmy-button rentmy-apply-coupon-btn" type="submit">Apply Coupon</button>
                    </div>
                </div>
                <div class="rentmy-row">
                    <div class="rentmy-column-12">
                        <a class="rentmy-button rentmy-proceed-checkout-btn" href="<?=url('checkout')?>">Proceed Checkout</a>
                        <a href="<?=url('/')?>" class="rentmy-button rentmy-continue-btn">Continue Shopping</a>
                    </div>
                </div>
            </div>
            <div class="rentmy-column-6">
                <div class="rentmy-cart-order-summery">
                    <h5>Cart Total</h5>
                    <table class="table">
                        <tbody>
                        <tr>
                            <td>Subtotal</td>
                            <td>
                                <span><b><?= currencyFormat($cart['sub_total'] ?? 0) ?></b></span>
                            </td>
                        </tr>
                        <tr>
                            <td>Shipping Charge</td>
                            <td><span> <?= currencyFormat($cart['delivery_charge'] ?? 0) ?> </span></td>
                        </tr>
                        <tr>
                            <td>Discount</td>
                            <td><span> <?= currencyFormat($cart['total_discount'] ?? 0) ?></span></td>
                        </tr>
                        <tr>
                            <td>Tax</td>
                            <td><span> <?= currencyFormat($cart['tax'] ?? 0) ?></span></td>
                        </tr>
                        <tr>
                            <td>Deposited Amount</td>
                            <td><span> <?= currencyFormat($cart['deposit_amount'] ?? 0) ?></span></td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Total</h4>
                            </td>
                            <td>
                                <h4> <?= currencyFormat($cart['total'] ?? 0) ?></h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
<?php }else{ ?>
<section class="rentmy-cart-wrapper rentmy-cart-wrapper-empty <?php echo isset($page) ? $page : '' ?>">
    <div class="rentmy-container">
        <div class="rentmy-row rentmy-cart-top">
            <div class="rentmy-column-12">
                <img src="<?php echo rentmyAssetPath('img/emptybag2.png');?>">
                <h4>Your shopping cart is Empty</h4>
                <a class="rentmy-button" href="<?php echo url('products');?>">Continue Shopping</a>
            </div>
        </div>
    </div>
</section>

<?php }?>