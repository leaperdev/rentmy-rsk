<header class="rentmy-header-wrap rentmy-header">
    <div class="rentmy-top-header" style="display: none">
        <div class="rentmy-container rm-height">
            <div class="rentmy-row rm-height">
                <div class="rentmy-column-12">
                    <div class="header-top-right text-md-right">
                        <div class="shop-menu">
                            <ul>
                                <li><a href="register.html"><i class="lni lni-user"></i>Login / Register</a></li>
                                <li><a href="cart.html"><i class="lni lni-cart"></i>Cart</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="rentmy-menu-header">
        <div class="rentmy-container">
            <div class="rentmy-row">
                <div class="rentmy-column-2">
                    <div class="rentmy-logo-area">
                        <div class="rentmy-logo-area-inner">
                            <div class="rentmy-logo-area-middle">
                                <a href="<?=baseURL().'/page/home'?>">
                                    <img class="rentmy-store-logo" src="<?php echo $_SESSION['RentMy']['store_logo']??'../assets/img/logo.png';?>">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rentmy-column-10">
                    <div class="rentmy-menu">
                        <a class="rentmy-mobile-menubar">
                            <i class="lni lni-menu"></i>
                        </a>
                        <nav class="rentmy-nav-manu">
                            <ul>
                                <li><a href="<?=baseURL().'/page/home'?>" class="rentmy-active-menu">Home</a></li>
                                <?php
                                $headCounter = 1;
                                foreach ($header as $item){
                                    if($headCounter <=4 ){
                                        $url = ($item['content_type'] == 'External') ? $item['content_url'] : url($item['content_url']);
                                        if(count($item['children'])){$url = '#'; };
                                        ?>
                                        <li>
                                            <a href="<?= $url; ?>"
                                               <?php if($item['content_type'] == 'External') { ?>target="_blank"<?php }?>
                                               class="">
                                                <?=$item['label']?>
                                                <?php if(count($item['children'])){?> <i class="lni lni-chevron-down"></i> <?php }?>
                                            </a>
                                            <?php if(count($item['children'])){?>
                                                <ul class="sub-menu">
                                                    <?php foreach($item['children'] as $submenu){
                                                        $submenuUrl = ($submenu['content_type'] == 'External') ? $submenu['content_url'] : url($submenu['content_url']);
                                                        ?>
                                                        <li>
                                                            <a href="<?=$submenuUrl?>" <?php if($submenu['content_type'] == 'External') { ?>target="_blank"<?php }?> >
                                                                <?=$submenu['label']?>
                                                            </a>
                                                        </li>
                                                    <?php }?>
                                                </ul>
                                            <?php }?>
                                        </li>
                                    <?php } $headCounter++; } ?>
                                <li><a href="javascript:void(0)" class="rm-search-bar rm-desktop-bar rentmy-search-bar"><i class="lni lni-search"></i></a></li>
                                <li><a href="<?=url('cart')?>"><i class="lni lni-cart"></i></a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

</header>
<!--<div class="rentmy-search-body">-->
<!--    <div class="rentmy-search-inner-body">-->
<!--        <a href="javascript:void(0)" class="rentmy-search-closebar">-->
<!--            <i class="lni lni-close"></i>-->
<!--        </a>-->
<!--        <div class="rentmy-row">-->
<!--            <div class="rentmy-column-6">-->
<!--                <form action="--><?//=url('products')?><!--" class="rentmy-input-group" id="search-form">-->
<!--                    <input type="search" name="search-product" id="search-product" placeholder="Search dHere...." >-->
<!--                    <div class="rentmy-input-group-append">-->
<!--                        <button type="button" id="search-btn"><i class="lni lni-search"></i></button>-->
<!--                    </div>-->
<!--                </form>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->