<?php

$featured_products = $sdkServices->getFeaturedProducts();
$others = (isset($content['others']) && count($content['others'])) ? $content['others'] : [];

?>
<section class="rentmy-slider-section">
    <div class="rentmy-owl-carousel owl-carousel owl-theme" id="slider-carousel">
        <div class="rentmy-owl-carousel-item">
            <div class="rentmy-owl-intro-slide">
                <div class="rentmy-container">
                    <div class="rentmy-row rentmy-align-center">
                        <div class="rentmy-column-6">
                            <!-- <h5 class="rentmy-sl-subtitle">Trade in Offer</h5> -->
                            <h1 class="rentmy-sl-maintitle">Kids’ Dinoland</h1>
                            <p class="rentmy-sl-short-des">Intex Inflatable Kids’ Dinoland Play Center Slide Pool & Games</p>
                            <button class="rentmy-button rm-theme-btn rentmy-sl-button">Booking Now<i class="lni lni-chevron-right"></i></button>
                        </div>
                        <div class="rentmy-column-6">
                            <!-- <img src="<?=baseURL().'/assets/img/home2/slider3.png'?>" alt="slider image" /> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rentmy-owl-carousel-item">
            <div class="rentmy-owl-intro-slide">
                <div class="rentmy-container">
                    <div class="rentmy-row rentmy-align-center">
                        <div class="rentmy-column-6">
                            <!-- <h5 class="rentmy-sl-subtitle">Trevel & Outdoor</h5> -->
                            <h1 class="rentmy-sl-maintitle">Inflatable Pool</h1>
                            <p class="rentmy-sl-short-des">Swim Center Family Inflatable Pool 120X72X22 for Kids Ages 6+</p>
                            <button class="rentmy-button rm-theme-btn rentmy-sl-button">Booking Now<i class="lni lni-chevron-right"></i></button>
                        </div>
                        <div class="rentmy-column-6">
                            <!-- <img src="<?=baseURL().'/assets/img/home2/slider3.png'?>" alt="slider image" /> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rentmy-owl-carousel-item">
            <div class="rentmy-owl-intro-slide">
                <div class="rentmy-container">
                    <div class="rentmy-row rentmy-align-center">
                        <div class="rentmy-column-6">
                            <!-- <h5 class="rentmy-sl-subtitle">Fashion Promotions</h5> -->
                            <h1 class="rentmy-sl-maintitle">Airblown Inflatable</h1>
                            <p class="rentmy-sl-short-des">Minions Naughty or Nice Slide with Kevin, Stuart, and Bob</p>
                            <button class="rentmy-button rm-theme-btn rentmy-sl-button">Booking Now<i class="lni lni-chevron-right"></i></button>
                        </div>
                        <div class="rentmy-column-6">
                            <!-- <img src="<?=baseURL().'/assets/img/home2/slider3.png'?>" alt="slider image" /> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



<section class="rentmy-grid-section">
    <div class="rentmy-container">
        <div class="rentmy-row">
            <div class="rentmy-column-6">
                <div class="rentmy-grid-box">
                    <a href="javascript:void(0)">
                        <div class="rentmy-grid-overlay"></div>
                        <span class="rentmy-grid-image">
                                <img src="<?=baseURL().'/assets/img/home2/g1.jpg'?>" alt="grid iamge" />
                            </span>
                    </a>
                    <div class="rentmy-grid-content">
                        <h3 class="rentmy-grid-title">
                            <a href="javascript:void(0)">
                                Airblown Inflatable
                            </a>
                        </h3>
                        <p class="rentmy-grid-short-des">Minions Naughty or Nice Slide with Kevin, Stuart, and Bob</p>
                        <a class="rentmy-grid-link" href="javascript:void(0)">
                            Booking Now<i class="lni lni-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="rentmy-column-6">
                <div class="rentmy-grid-box">
                    <a href="javascript:void(0)">
                        <div class="rentmy-grid-overlay"></div>
                        <span class="rentmy-grid-image">
                                <img src="<?=baseURL().'/assets/img/home2/g2.jpg'?>" alt="grid iamge" />
                            </span>
                    </a>
                    <div class="rentmy-grid-content">
                        <h3 class="rentmy-grid-title">
                            <a href="javascript:void(0)">
                                Inflatable Pool
                            </a>
                        </h3>
                        <p class="rentmy-grid-short-des">Swim Center Family Inflatable Pool 120X72X22 for Kids Ages 6+</p>
                        <a class="rentmy-grid-link" href="javascript:void(0)">
                            Booking Now<i class="lni lni-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            <!-- <div class="rentmy-column-6">
                <div class="rentmy-grid-box">
                    <a href="javascript:void(0)">
                        <div class="rentmy-grid-overlay"></div>
                        <span class="rentmy-grid-image">
                            <img src="img/banner-4.jpg" alt="grid iamge" />
                        </span>
                    </a>
                    <div class="rentmy-grid-content">
                        <h3 class="rentmy-grid-title">
                            <a href="javascript:void(0)">
                                2020 Winter
                            </a>
                        </h3>
                        <p class="rentmy-grid-short-des">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <a class="rentmy-grid-link" href="javascript:void(0)">
                            Shop Now<i class="lni lni-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div> -->

        </div>
    </div>
</section>


<!-- offer shop -->
<section class="rentmy-offer-section">
    <div class="rentmy-container">
        <div class="rentmy-row rentmy-align-center">
            <div class="rentmy-column-6">
                <div class="rentmy-offer-content">
                    <h6>Up to 50% Off</h6>
                    <h1>Airblown Inflatable</h1>
                    <p>
                    Minions Naughty or Nice Slide with Kevin, Stuart, and Bob
                    </p>
                    <a class="rentmy-button rm-theme-btn">Booking Now<i class="lni lni-chevron-right"></i></a>
                </div>
            </div>
            <div class="rentmy-column-6">
                <div class="shop-offer">
                    <img src="<?=baseURL().'/assets/img/home2/p9.png'?>" class="img-fluid">
                </div>
            </div>
        </div>
    </div>
</section>


<!-- featured product  -->
<!--<section class="rentmy-featured-product-section">-->
<!--    <div class="rentmy-container">-->
<!--        <div class="rentmy-row">-->
<!--            <div class="rentmy-column-12">-->
<!--                <div class="rentmy-mainsection-title">-->
<!--                    <span class="rm-dot-title"></span>-->
<!--                    <h1 class="rm-section-title">Featured Product</h1>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="rentmy-column-12">-->
<!--                <div class="owl-carousel owl-theme" id="feature-carousel">-->
<!--                    --><?php //if (!empty($featured_products['data'])) { ?>
<!--                            --><?php //foreach ($featured_products['data'] as $product){?>
<!--                    <div class="rentmy-product">-->
<!--                        <div class="rentmy-product-inner">-->
<!--                            <div class="rentmy-product-image">-->
<!--                                <img src="--><?php //echo getProductImage($product, $sdkServices->getStoreId()); ?><!--" alt="Img" />-->
<!--                                <div class="rentmy-product-overlow">-->
<!--                                    <a data-product='--><?php //echo getProductPopupDetails($product, $sdkServices->getStoreId()); ?><!--'-->
<!--                                       class="rentmy-cart-btn --><?php //echo $product['type'] == 2 ? 'package-cart-btn' : 'product-cart-btn'; ?><!--"><i class="lni lni-eye"></i></a>-->
<!--                                    <a data-product='--><?php //echo getProductDirectCartDetails($product); ?><!--' class="rentmy-addcart-btn"><i class="lni lni-cart"></i></a>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="rentmy-product-body">-->
<!--                                <h5 class="rentmy-product-title">-->
<!--                                    --><?php //echo $product['name']; ?>
<!--                                </h5>-->
<!--                                --><?php //$product['prices'] = $product['price'];?>
<!--                                <p class="rentmy-product-price"><b>--><?php //echo getPricing($product, $others); ?><!--</b></p>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    --><?php //} } ?>
<!---->
<!---->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</section>-->


<!-- featured product-->
<section class="rentmy-featured-product-section">
    <div class="rentmy-container">
        <div class="rentmy-row">
            <div class="rentmy-column-12">
                <div class="rentmy-mainsection-title">
                    <span class="rm-dot-title"></span>
                    <h1 class="rm-section-title">Featured Product</h1>
                </div>
            </div>
            <div class="rentmy-column-12">
                <div class="owl-carousel owl-theme" id="feature-carousel">


                    <div class="rentmy-product">
                        <div class="rentmy-product-inner">
                            <div class="rentmy-product-image">
                                <img src="https://s3.us-east-2.amazonaws.com/images.rentmy.co/products/287/6652/ok69cq9_1562155939_adkotkg.jpg"
                                     alt="40' Double Lane Slip And Slide With Pool"/>
                                <div class="rentmy-product-overlow">
                                    <button  data-product='{"uid":"a78ed99466c011ea82610212d7dcece2","name":"40\u0027 Double Lane Slip And Slide With Pool","image":"https:\/\/s3.us-east-2.amazonaws.com\/images.rentmy.co\/products\/287\/6652\/ok69cq9_1562155939_adkotkg.jpg"}'
                                             class="rentmy-cart-btn product-cart-btn"><i class="lni lni-eye"></i></button>
                                    <button data-product='{"id":6652,"name":"40\u0027 Double Lane Slip And Slide With Pool","type":1,"quantity":1,"rent_start":"","rent_end":"","variants_products_id":7457}' class="rentmy-addcart-btn"><i class="lni lni-cart"></i></button>
                                </div>
                            </div>
                            <div class="rentmy-product-body">
                                <h5 class="rentmy-product-title">40' Double Lane Slip And Slide With Pool </h5>
                                <p class="rentmy-product-price">Starting at <span class='pre'>$</span><span class='amount'>150.00</span> per day</p>
                            </div>
                        </div>
                    </div>
                    <div class="rentmy-product">
                        <div class="rentmy-product-inner">
                            <div class="rentmy-product-image">
                                <img src="https://s3.us-east-2.amazonaws.com/images.rentmy.co/products/287/6850/yy6szvj_1562155921_pu9wzid.jpg"
                                     alt="Castle"/>
                                <div class="rentmy-product-overlow">
                                    <button  data-product='{"uid":"a796110766c011ea82610212d7dcece2","name":"Castle","image":"https:\/\/s3.us-east-2.amazonaws.com\/images.rentmy.co\/products\/287\/6850\/yy6szvj_1562155921_pu9wzid.jpg"}'
                                             class="rentmy-cart-btn product-cart-btn"><i class="lni lni-eye"></i></button>
                                    <button data-product='{"id":6850,"name":"Castle","type":1,"quantity":1,"rent_start":"","rent_end":"","variants_products_id":7723}' class="rentmy-addcart-btn"><i class="lni lni-cart"></i></button>
                                </div>
                            </div>
                            <div class="rentmy-product-body">
                                <h5 class="rentmy-product-title">Castle </h5>
                                <p class="rentmy-product-price">Starting at <span class='pre'>$</span><span class='amount'>169.99</span> per day</p>
                            </div>
                        </div>
                    </div>
                    <div class="rentmy-product">
                        <div class="rentmy-product-inner">
                            <div class="rentmy-product-image">
                                <img src="https://s3.us-east-2.amazonaws.com/images.rentmy.co/products/287/6851/qjy8wgt_1562155906_hf0be2m.jpg"
                                     alt="Combo"/>
                                <div class="rentmy-product-overlow">
                                    <button  data-product='{"uid":"a796118166c011ea82610212d7dcece2","name":"Combo","image":"https:\/\/s3.us-east-2.amazonaws.com\/images.rentmy.co\/products\/287\/6851\/qjy8wgt_1562155906_hf0be2m.jpg"}'
                                             class="rentmy-cart-btn product-cart-btn"><i class="lni lni-eye"></i></button>
                                    <button data-product='{"id":6851,"name":"Combo","type":1,"quantity":1,"rent_start":"","rent_end":"","variants_products_id":7724}' class="rentmy-addcart-btn"><i class="lni lni-cart"></i></button>
                                </div>
                            </div>
                            <div class="rentmy-product-body">
                                <h5 class="rentmy-product-title">Combo </h5>
                                <p class="rentmy-product-price">Starting at <span class='pre'>$</span><span class='amount'>265.00</span> per day</p>
                            </div>
                        </div>
                    </div>
                    <div class="rentmy-product">
                        <div class="rentmy-product-inner">
                            <div class="rentmy-product-image">
                                <img src="https://s3.us-east-2.amazonaws.com/images.rentmy.co/products/287/6852/5uc6wg2_1562155891_r1ucvua.jpg"
                                     alt="Crayon "/>
                                <div class="rentmy-product-overlow">
                                    <button  data-product='{"uid":"a79611fd66c011ea82610212d7dcece2","name":"Crayon ","image":"https:\/\/s3.us-east-2.amazonaws.com\/images.rentmy.co\/products\/287\/6852\/5uc6wg2_1562155891_r1ucvua.jpg"}'
                                             class="rentmy-cart-btn product-cart-btn"><i class="lni lni-eye"></i></button>
                                    <button data-product='{"id":6852,"name":"Crayon ","type":1,"quantity":1,"rent_start":"","rent_end":"","variants_products_id":7725}' class="rentmy-addcart-btn"><i class="lni lni-cart"></i></button>
                                </div>
                            </div>
                            <div class="rentmy-product-body">
                                <h5 class="rentmy-product-title">Crayon  </h5>
                                <p class="rentmy-product-price">Starting at <span class='pre'>$</span><span class='amount'>169.99</span> per day</p>
                            </div>
                        </div>
                    </div>
                    <div class="rentmy-product">
                        <div class="rentmy-product-inner">
                            <div class="rentmy-product-image">
                                <img src="https://s3.us-east-2.amazonaws.com/images.rentmy.co/products/287/6854/e9i88p8_1562155847_lfpwho0.jpg"
                                     alt="Obstacle Course"/>
                                <div class="rentmy-product-overlow">
                                    <button  data-product='{"uid":"a79612fe66c011ea82610212d7dcece2","name":"Obstacle Course","image":"https:\/\/s3.us-east-2.amazonaws.com\/images.rentmy.co\/products\/287\/6854\/e9i88p8_1562155847_lfpwho0.jpg"}'
                                             class="rentmy-cart-btn product-cart-btn"><i class="lni lni-eye"></i></button>
                                    <button data-product='{"id":6854,"name":"Obstacle Course","type":1,"quantity":1,"rent_start":"","rent_end":"","variants_products_id":7727}' class="rentmy-addcart-btn"><i class="lni lni-cart"></i></button>
                                </div>
                            </div>
                            <div class="rentmy-product-body">
                                <h5 class="rentmy-product-title">Obstacle Course </h5>
                                <p class="rentmy-product-price">Starting at <span class='pre'>$</span><span class='amount'>385.00</span> per day</p>
                            </div>
                        </div>
                    </div>
                    <div class="rentmy-product">
                        <div class="rentmy-product-inner">
                            <div class="rentmy-product-image">
                                <img src="https://s3.us-east-2.amazonaws.com/images.rentmy.co/products/287/6853/ixxmm40_1562155993_cgiwzyf.jpg"
                                     alt="Jungle"/>
                                <div class="rentmy-product-overlow">
                                    <button  data-product='{"uid":"a796127a66c011ea82610212d7dcece2","name":"Jungle","image":"https:\/\/s3.us-east-2.amazonaws.com\/images.rentmy.co\/products\/287\/6853\/ixxmm40_1562155993_cgiwzyf.jpg"}'
                                             class="rentmy-cart-btn product-cart-btn"><i class="lni lni-eye"></i></button>
                                    <button data-product='{"id":6853,"name":"Jungle","type":1,"quantity":1,"rent_start":"","rent_end":"","variants_products_id":7726}' class="rentmy-addcart-btn"><i class="lni lni-cart"></i></button>
                                </div>
                            </div>
                            <div class="rentmy-product-body">
                                <h5 class="rentmy-product-title">Jungle </h5>
                                <p class="rentmy-product-price">Starting at <span class='pre'>$</span><span class='amount'>200.00</span> for hours</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>

<section class="rentmy-newslatter-section">
    <div class="rentmy-container">
        <div class="rentmy-row rentmy-align-center">
            <div class="rentmy-column-6">
                <div class="rentmy-newslatter-title">
                    <h3>Our Newsletter</h3>
                    <p>Get news and receive 20% off for your next buy!</p>
                </div>
            </div>
            <div class="rentmy-column-6">
                <div class="rentmy-newsletter-form">
                    <form class="rentmy-newsletter-form-inner">
                        <div class="rentmy-flex">
                            <input type="email" placeholder="Your email address" />
                            <button type="submit" class="rentmy-button rm-theme-btn">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>


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
                            <?php if(count($content['product_details']) && !empty($content['product_details']['title_package_includes'])){
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
