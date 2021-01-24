<?php
if (isset($_GET['sort'])){
    parse_str($_GET['sort'], $GET);
}
//Get list inputs
$pageNo = empty($_GET['page_no']) ? 1 : $_GET['page_no'];
$limit = empty($_GET['limit']) ? 20 : $_GET['limit'];
$offset = ($pageNo - 1) * $limit;
$search = !empty($_GET['search']) ? $_GET['search'] : '';
$sort_by = isset($GET['sort_by']) ? $GET['sort_by'] : 'product_name';
$sort_dir = isset($GET['sort_dir']) ? $GET['sort_dir'] : 'ASC';
// List of the products
$category_id = !empty($_GET['category_id']) ? $_GET['category_id'] : '';

//init and get product list
$products = $sdkServices->getProducts($category_id, $search, $pageNo, $limit, $sort_by, $sort_dir);

$sortOptions = [
        'sort_by=product_name&sort_dir=ASC'=> 'Product name A-Z',
        'sort_by=product_name&sort_dir=DSC' => 'Product name Z-A',
        'sort_by=rent_price&sort_dir=ASC' => 'Rental price low to high',
        'sort_by=rent_price&sort_dir=DSC' => 'Rental price high to low',
        'sort_by=buy_price&sort_dir=ASC' => 'Sale price low to high',
        'sort_by=buy_price&sort_dir=DSC' => 'Sale price high to low',
    ];
$content = $contents ?? [];
$others = (isset($content['others']) && count($content['others'])) ? $content['others'] : [];
$show_start_time =  $contents['confg']['show_start_time'] ?? true;
$show_end_date =  $contents['confg']['show_end_date'] ?? true;
$show_end_time =  $contents['confg']['show_end_time'] ?? true;
?>

<div class="rentmy-container <?php echo isset($page) ? $page : '' ?>">
    <div class="rentmy-sortdatetime">
        <div class="rentmy-product-datetime">
            <form class="setCrtDateTime">
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
                <div class="rentmy-product-datetime-inner">
                <button type="submit" class="rentmy-button rentmy-datetimeapply-btn">Apply</button>
            </div>
            </form>
        </div>
        <div class="rentmy-product-sort">
            <div class="rentmy-product-sort-inner">
                <form class="rentmy-sort-by" action="<?=getCurrentURL()?>">
                    <label for="sort-by">Sort By</label>
                    <select name="sort">
                        <?php foreach ($sortOptions as $value => $text):?>
                            <option <?=isset($_GET['sort']) && $_GET['sort'] == $value ? 'selected' : ''?> value="<?=$value?>"><?=$text?></option>
                       <?php endforeach ?>
                    </select>
                </form>
            </div>
        </div>
    </div>

    <div class="rentmy-product-list">
        <?php if (!empty($products['products'])) { ?>
            <?php foreach ($products['products'] as $key => $product) { ?>
                <div class="rentmy-product">
                    <div class="rentmy-product-inner">
                        <div class="rentmy-product-image">
                            <img src="<?= getProductImage($product, $sdkServices->getStoreId()) ?>"
                                 alt="<?= $product['name'] ?>"/>
                            <div class="rentmy-product-overlow">
                                <button  data-product='<?= getProductPopupDetails($product, $sdkServices->getStoreId()) ?>'
                                   class="rentmy-cart-btn <?= $product['type'] == 2 ? 'package-cart-btn' : 'product-cart-btn' ?>"><i class="lni lni-eye"></i></button>
                                <button data-product='<?= getProductDirectCartDetails($product) ?>' class="rentmy-addcart-btn"><i class="lni lni-cart"></i></button>
                            </div>
                        </div>
                        <div class="rentmy-product-body">
                            <h5 class="rentmy-product-title"><?= $product['name'] ?> </h5>
                            <p class="rentmy-product-price"><?= getPricing($product, $others) ?></p>
                        </div>
                    </div>
                </div>
            <?php }
        } ?>
    </div>
    <?=$products['pagination']?>
</div>


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
