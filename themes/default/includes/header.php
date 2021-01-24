<header class="rentmy-header">
    <div class="rentmy-container">
        <div class="rentmy-row">
            <div class="rentmy-logo-area">
                <div class="rentmy-logo-area-inner">
                    <div class="rentmy-logo-area-middle">
                        <a href="<?= baseURL(); ?>">
                            <img src="<?php echo $_SESSION['RentMy']['store_logo']??'/assets/img/logo.png';?>">
                        </a>
                    </div>
                </div>
            </div>
            <div class="rentmy-menu">
                <a class="rentmy-mobile-menubar">
                    <i class="fa fa-bars"></i>
                </a>
                <nav class="rentmy-nav-manu">
                    <ul>
                        <li><a href="<?= baseURL(); ?>" class="rentmy-active-menu">Home</a></li>
                        <?php
                        $headCounter = 1;
                        if (isset($headerNavs) && !empty($headerNavs)){
                            foreach ($headerNavs as $item){
                            if($headCounter <=4 ){
                                $item['content_url'] = ($item['content_url']=='products-list')?'products':$item['content_url'];

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
                            <?php } $headCounter++; }
                        } ?>
                        <li><a href="javascript:void(0)" class="rentmy-search-bar"><i class="fa fa-search"></i></a></li>
                        <li><a href="<?=url('cart')?>"><i class="fa fa-shopping-bag"></i></a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</header>
<div class="rentmy-search-body">
	<div class="rentmy-search-inner-body">
		<a href="javascript:void(0)" class="rentmy-search-closebar">
			<i class="lni lni-close"></i>
		</a>
	    <div class="rentmy-row">
            <div class="rentmy-column-6">
                <form action="<?=url('products')?>" class="rentmy-input-group" id="search-form">
                    <input type="search" name="search-product" id="search-product" placeholder="Search Here...." >
                    <div class="rentmy-input-group-append">
                        <button type="button" id="search-btn"><i class="lni lni-search"></i></button>
                    </div>
                </form>
			</div>
		</div>
	</div>
</div>
