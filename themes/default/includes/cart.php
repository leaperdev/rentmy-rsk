<?php
$show_start_time =  $contents['confg']['show_start_time'] ?? true;
$show_end_date =  $contents['confg']['show_end_date'] ?? true;
$show_end_time =  $contents['confg']['show_end_time'] ?? true;
?>

<!-- rentmy cart bar  -->
<div class="rentmy-cartbar-launcher">
    <div class="rentmy-cartbar-launcher-icon">
        <i class="lni lni-shopping-basket" aria-hidden="true"></i>
    </div>
    <div class="rentmy-cartbar-launcher-summary">
        <div class="rentmy-dates">
            <span class="rentmy-selected-date">Select Rental Schedule</span>
        </div>
        <hr />
        <div class="rentmy-summary">
            <div>
                <span><strong id="item-count">0 item</strong></span><span class="rentmy-total"><strong id="cart-total"> <?= currencyFormat(00.00)?> </strong></span>
            </div>
        </div>
    </div>
</div>

<!--cart sidebar-->
<div class="rentmy-cartsidebar-overlay">
    <div class="rentmy-cart-sidebar-content">
        <div class="rentmy-cart-modalclose"><i class="lni lni-close"></i></div>
        <div class="rentmy-cart-sidebar-body">
            <div class="rentmy-cart-sidebar-inner">
                <div class="rentmy-sidebar-head">
                    <div class="rentmy-title">Cart</div>
                    <div class="rentmy-selected-date">
                        <div class="rentmy-selected-date-inner">
                            <div class="rentmy-selected-date-leftside">
                                <p>Select Rental Schedule</p> <!--18-12-2020, 07:45 PM -->
                            </div>
                            <div class="rentmy-selected-date-rightside">
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rentmy-cart-sidebar-lines">
                    <ul></ul>
                </div>
                <div class="rentmy-cart-sidebar-summary">
                    <div class="rentmy-detail rentmy-strong">
                        <span>Subtotal</span><span class="rentmy-amount"><?= currencyFormat(0.00)?></span>
                    </div>
                    <?php if (!strpos(getCurrentURL(), 'checkout')) {?>
                        <a href="<?=url('checkout')?>" class="button rentmy-checkout-btn">Checkout</a>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- date time select modal-->
<div class="rentmy-modal-overlay rentmy-datetime-modal-overlay">
    <div class="rentmy-modal">
        <div class="rentmy-modalclose"><i class="lni lni-close"></i></div>
        <form class="setCrtDateTime">
            <div class="rentmy-product-datetime">
                <div class="rentmy-product-datetime-inner">
                    <label>Pick Date</label>
                    <div class="rentmy-datetime-input">
                        <input required name="rent_start" type="date">
                        <?php if ($show_start_time) :?>
                            <select required class="timelist" name="start_time"></select>
                        <?php endif ?>
                    </div>
                </div>
                <?php if ($show_end_date || $show_end_time) :?>
                    <div class="rentmy-product-datetime-inner">
                        <label>Return Date</label>
                        <div class="rentmy-datetime-input">
                            <?php if ($show_end_date) :?>
                                <input required name="rent_end"  type="date">
                            <?php endif ?>
                            <?php if ($show_end_time) :?>
                                <select required class="timelist" name="end_time"></select>
                            <?php endif ?>
                        </div>
                    </div>
                <?php endif ?>
            </div>
            <div class="rentmy-product-datetime-btn">
                <button type="submit" class="rentmy-button rentmy-datetimeapply-btn">Apply</button>
            </div>
        </form>
    </div>
</div>
