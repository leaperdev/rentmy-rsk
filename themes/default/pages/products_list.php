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
$tags = !empty($_GET['tag']) ? $_GET['tag'] : '';
$selected_tags = explode(',',$tags);
//init and get product list
$products = $sdkServices->getProducts($category_id, $search, $pageNo, $limit, $sort_by, $sort_dir, $tags);
$categories = $sdkServices->getCategories();
$sortOptions = [
    'sort_by=product_name&sort_dir=ASC'=> 'Product name A-Z',
    'sort_by=product_name&sort_dir=DSC' => 'Product name Z-A',
    'sort_by=rent_price&sort_dir=ASC' => 'Rental price low to high',
    'sort_by=rent_price&sort_dir=DSC' => 'Rental price high to low',
    'sort_by=buy_price&sort_dir=ASC' => 'Sale price low to high',
    'sort_by=buy_price&sort_dir=DSC' => 'Sale price high to low',
];
$content = $contents[0]['contents'] ?? [];
$others = (isset($content['others']) && count($content['others'])) ? $content['others'] : [];
$show_start_time =  $contents[0]['contents']['confg']['show_start_time'] ?? true;
$show_end_date =  $contents[0]['contents']['confg']['show_end_date'] ?? true;
$show_end_time =  $contents[0]['contents']['confg']['show_end_time'] ?? true;

$tags =$sdkServices->tags();
$tags = $tags['tags'];

?>

<div class="rentmy-container <?php echo isset($page) ? $page : '' ?>">
    <div class="rentmy-row">
        <div class="rentmy-column-3">
            <div class="rentmy-category-filter">
                <div class="rentmy-category-filter-inner">
                    <h3>Category</h3>
                    <div class="rentmy-category-filter-wrapper rm-category-area">
                        <?php
                        if(!empty($categories)){

                            foreach ($categories as $category){
                                       $is_child =  array_search($category_id, array_column($category['children'], 'id'));
                                ?>
                                    <ul>
                                <li>
                                    <a href="<?php echo addQueryPram('category_id', $category['id']) ?>" class="rentmy-filter-collaps">
                                        <?php echo $category['name'];?>
                                        <?php if (!empty($category['children'])){ ?>
                                        <?php if($category_id == $category['id'] ||  $is_child == true){?>
                                        <i class="lni lni-chevron-down"></i>
                                        <?php }else{ ?>

                                            <i class="lni lni-chevron-right"></i>
                                        <?php } ?>
                                        <?php } ?>
                                    </a>
                                    <?php if (!empty($category['children'])){

                                        ?>
                                        <div class="rentmy-filter-collaps-content <?= ($category_id == $category['id'] || $is_child == true)?'rentmy-block':'rentmy-display-none';?>">
                                            <ul>
                                                <?php  foreach ($category['children'] as $child){

                                                    $is_grand_child =  array_search($category_id, array_column($child, 'id'));
                                                    ?>
                                                    <li>
                                                        <a href="<?php echo addQueryPram('category_id', $child['id']) ?>"><?php echo $child['name'];?>
                                                            <?php if(!empty($child['children'])){?>
                                                                <?php if($category_id == $child['id'] ||  $is_grand_child == true){?>
                                                                    <i class="lni lni-chevron-down"></i>
                                                                <?php }else{ ?>

                                                                    <i class="lni lni-chevron-right"></i>
                                                                <?php } ?>
                                                            <?php }?>

                                                        </a>
                                                        <?php if (!empty($child['children'])){ ?>
                                                        <div class="rentmy-filter-collaps-content <?= ($category_id == $child['id'] || $is_grand_child == true)?'rentmy-block':'rentmy-display-none';?>">
                                                            <ul>
                                                                <?php  foreach ($child['children'] as $grand_child){?>
                                                                <li><a href="<?php echo addQueryPram('category_id', $grand_child['id']) ?>"><?php echo $grand_child['name'];?></a></li>
                                                            <?php } ?>

                                                            </ul>
                                                        </div>
                                                     <?php } ?>
                                                    </li>
                                                <?php } ?>

                                            </ul>
                                        </div>
                                    <?php }  ?>
                                </li>

                            <?php } }?>

                        </div>

                </div>
                <div class="rentmy-category-filter-inner">
                    <h3>Filter</h3>
                    <div class="rentmy-category-filter-wrapper">
                        <ul>
                            <li class="rentmy-filter-checkbox-list">
                                <?php if(!empty($tags)){?>
                                <?php foreach ($tags as $tag){?>
                                <div class="rentmy-checkbox-inline">
                                    <label class="rentmy-checkbox" for="rentmy-filter-checkbox-<?= $tag['id']; ?>">
                                        <input type="checkbox" id="rentmy-filter-checkbox-<?= $tag['id']; ?>" value="<?= $tag['id']; ?>" <?= in_array($tag['id'], $selected_tags)?'checked':''; ?> > <?= $tag['name']; ?> <span>&nbsp;&nbsp;</span>
                                    </label>
                                </div>
                                <?php } } ?>
                            </li>
                            <li>
                                <a href="#" class="rentmy-filter-collaps">
                                    Price
                                    <i class="lni lni-chevron-down"></i>
                                </a>
                                <div class="rentmy-filter-collaps-content">
                                    <div class="rentmy-row">
                                        <div class="rentmy-column-6">
                                            <label>Min</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                        <div class="rentmy-column-6">
                                            <label>Max</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="rentmy-row">
                                        <div class="rentmy-column-12">
                                            <a class="rentmy-button">Submit</a>
                                            <a class="rentmy-button">clear</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="#" class="rentmy-filter-collaps">
                                    Type
                                    <i class="lni lni-chevron-down"></i>
                                </a>
                                <div class="rentmy-filter-collaps-content">
                                    <div class="rentmy-checkbox-inline">
                                        <label class="rentmy-checkbox" for="rentmy-filter-rentcheckbox">
                                            <input type="checkbox" id="rentmy-filter-checkbox"> Rent <span>&nbsp;&nbsp;</span>
                                        </label>
                                    </div>
                                    <div class="rentmy-checkbox-inline">
                                        <label class="rentmy-checkbox" for="rentmy-filter-buycheckbox">
                                            <input type="checkbox" id="rentmy-filter-checkbox2"> Buy <span>&nbsp;&nbsp;</span>
                                        </label>
                                    </div>
                                    <div class="rentmy-checkbox-inline">
                                        <label class="rentmy-checkbox" for="rentmy-filter-allcheckbox">
                                            <input type="checkbox" id="rentmy-filter-checkbox3"> All <span>&nbsp;&nbsp;</span>
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="rentmy-column-9 rentmy-category-product-list">
            <div class="rentmy-sortdatetime">
                <div class="rentmy-product-datetime">
                    <form class="setCrtDateTime">
                        <div class="rentmy-product-datetime-inner">
                            <label>Pick Date</label>
                            <div class="rentmy-datetime-input">
                                <input required name="rent_start" type="date">
                                <select required class="timelist" name="start_time"></select>
                            </div>
                        </div>
                        <div class="rentmy-product-datetime-inner">
                            <label>Return Date</label>
                            <div class="rentmy-datetime-input">
                                <input required name="rent_end"  type="date">
                                <select required class="timelist" name="end_time"></select>
                            </div>
                        </div>
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
                                    <p class="rentmy-product-price"><?= getPricing($product) ?></p>
                                </div>
                            </div>
                        </div>
                    <?php }
                } ?>
            </div>
            <?php if(!empty($products['products'])){?>
            <?=$products['pagination']?>
            <?php } ?>
        </div>
    </div>
</div>


<?php include_once getThemeInclude('popupProductView.php', getDefaultTheme()) ?>
