

<!--product details Modal-->
<div class="rentmy-modal-overlay rentmy-product-modal-overlay">
    <div class="rentmy-modal">
        <div class="rentmy-modalclose"><i class="lni lni-close"></i></div>
        <div class="rentmy-modal-body rentmy-scrollbar">
            <div class="rentmy-modal-inner">
                <div class="rentmy-modal-leftside">
                    <div class="rentmy-product-details-image">
                        <div class="rentmy-product-view-image">
                            <img class="rentmy-product-viewimage-active" src="<?=rentmyAssetPath('img/default.jpg')?>" alt="Img" />
                        </div>
                        <div class="rentmy-product-multipleimage"></div>
                    </div>
                </div>
                <div class="rentmy-modal-rightside">
                    <h5 class="rentmy-product-title"></h5>
                    <p class="rentmy-product-price"></p>

                    <div class="rentmy-modal-rentbuy">
                        <div class="rentmy-radio-inline price-options"> </div>
                        <div class="rentmy-pricing-options"> </div>
                    </div>
                    <div class="rentmy-modal-product-variants"></div>
                    <div class="rentmy-modal-quantity">
                        <div class="rentmy-number-block">
                            <div class="rentmy-num-in">
                                <span class="rentmy-minus dis">-</span>
                                <input type="text" class="rentmy-in-num" value="1" readonly="">
                                <span class="rentmy-plus">+</span>
                            </div>
                            <p>Available : <span class="rentmy-product-available"></span></p>
                        </div>
                    </div>
                    <button type="button" class="rentmy-button rentmy-modal-cartbtn">Add to Cart</button>
                    <div class="rentmy-modalproduct-description"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Package details Modal-->
<div class="rentmy-modal-overlay rentmy-package-modal-overlay">
    <div class="rentmy-modal">
        <div class="rentmy-modalclose"><i class="lni lni-close"></i></div>
        <div class="rentmy-modal-body rentmy-scrollbar">
            <div class="rentmy-modal-inner">
                <div class="rentmy-modal-leftside">
                    <div class="rentmy-package-details-image">
                        <div class="rentmy-package-view-image">
                            <img class="rentmy-product-viewimage-active" src="<?=rentmyAssetPath('img/default.jpg')?>" alt="Img" />
                        </div>
                        <div class="rentmy-product-multipleimage"></div>
                    </div>
                </div>
                <div class="rentmy-modal-rightside">
                    <h5 class="rentmy-product-title"> </h5>
                    <p class="rentmy-product-price"></p>
                    <div class="rentmy-radio-inline price-options"> </div>
                    <div class="rentmy-modal-quantity">
                        <div class="rentmy-number-block">
                            <div class="rentmy-num-in">
                                <span class="rentmy-minus rentmy-dis">-</span>
                                <input type="text" class="rentmy-in-num" value="1" readonly="">
                                <span class="rentmy-plus">+</span>
                            </div>
                            <p>Available : <span class="rentmy-product-available"></span></p>
                        </div>
                    </div>
                    <button type="button" class="rentmy-button rentmy-modal-cartbtn">Add to Cart</button>
                    <div class="rentmy-modalproduct-description"> </div>
                </div>
                <div class="rentmy-details-package">
                    <div class="rentmy-details-package-body">
                        <h6>
                            <?php if(isset($content['product_details']) && !empty($content['product_details']['title_package_includes'])){
                                echo $content['product_details']['title_package_includes'];
                            }else {?>Package includes<?php } ?>:
                        </h6>
                        <span> </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
