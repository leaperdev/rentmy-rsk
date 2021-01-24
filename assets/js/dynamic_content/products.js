jQuery(function ($) {

    //
    const product = {
        $modal: null,  //product / package type modal is triggered
        btnData: null, //products page modal page button may have some data regarding refereed product/package.
        isPackage: 0,   // if triggered modal is 1 for package type or 0 for product type.
        data: null,     //response data from server
        rental_type: 'buy',
        rent_start: null,
        rent_end: null,
        term: 1,
        content: CONTENT != undefined ? SITE_SPECIFIC : false,

        getQuantity: function () {
            return this.$modal.find('input.rentmy-in-num').val();
        },

        format_prices: function (data) {

            if (data.length > 0) {
                var prices = data[0];
                var obj = {
                    buy: {type: false, price: 0, id: null},
                    rent: {type: false, price: []}
                };
                var rent = ["hourly", "daily", "weekly", "monthly", "rent"];
                if (prices.base.price > 0) {
                    obj.buy["type"] = true;
                    obj.buy["price"] = prices.base.price;
                    obj.buy["id"] = prices.base.id;
                    obj.buy["html"] = prices.base.html;
                }
                let ren = [];
                const rentPrices = data[0];

                if (rentPrices.fixed) {
                    const fp = {
                        type: "",
                        price: rentPrices.fixed.price,
                        id: rentPrices.fixed.id,
                        label: "",
                        html: rentPrices.fixed.html,
                        rent_start: rentPrices.fixed.rent_start,
                        rent_end: rentPrices.fixed.rent_end
                    };
                    obj.rent["price"].push(fp);
                } else {
                    for (let c in rentPrices) {
                        for (let i = 0; i < rentPrices[c].length; i++) {
                            rentPrices[c][i]["type"] = rentPrices[c][i].label;
                            obj.rent["price"].push(rentPrices[c][i]);
                        }
                    }
                }
                if (obj.rent["price"].length > 0) obj.rent["type"] = true;
                return obj;
            }

            return data;
        },

        //when change price type
        changePriceType: function (priceType, fixed = false) {
            //set type
            this.rental_type = priceType
            let prices
            if (this.data.prices != undefined)
                prices = this.format_prices(this.data.prices)
            else if (this.data.price != undefined)
                prices = this.format_prices(this.data.price)
            if (priceType === 'rent') {
                if (prices.rent.price != undefined) {
                    let priceString = `${SITE_SPECIFIC.others.product_list_starting_at} <b>${currencyFormat(prices.rent.price[0].price)}</b> ${SITE_SPECIFIC.others.product_list_per} ${prices.rent.price[0].label}`;
                    if (fixed != false)
                        priceString = `<b>${currencyFormat(fixed)}</b>`;
                    this.setModalData({
                        priceString: priceString,
                        available: this.data.available,
                        price_type: priceType,
                        formated_prices: prices,
                    })
                }
            } else if (priceType === 'buy') {
                if (prices.buy.price != undefined) {
                    this.setModalData({
                        priceString: `${SITE_SPECIFIC.others.product_list_buy_now_for} <b>${currencyFormat(prices.buy.price)}</b>`,
                        availableForSale: this.data.available_for_sale,
                        price_type: priceType,
                        formated_prices: prices,
                    })
                }
            }
        },

        //when change package variant option
        changeVariant: function (data) {

            if ($('.price-options').find('input[name="rentmy-package"]:checked').val() == 'rent' && (this.rent_start == '' || this.rent_start == null)) {
                return;
            }
            var params = {
                action_type: 'change_package_variants',
                product_id: data.attr('data-package_id'),
                pacakge_uid: data.attr('data-package_uid'),
                rent_type: $('.price-options').find('input[name="rentmy-package"]:checked').val()
            };
            let products = [];
            let variants = [];
            $('.rentmy-package-single-list').find('select').each(function (element) {
                let package_item = {
                    product_id: $(this).data('product'),
                    variant_id: $(this).val()
                }
                products.push(package_item);
                variants.push($(this).val());
            });
            params['products'] = products;
            params['variants'] = variants;
            $.post('', params)
                .done((response) => {
                    try {
                        response = JSON.parse(response);

                        if (response.status == 'OK') {
                            this.setModalData({
                                available: response.result.data
                            });
                        }


                    } catch (e) {
                        console.log(e)
                    }

                })
        },

        //when change product variant option
        changeProductVariant: function (data) {
            index = data.attr('data-index');
            total = data.attr('data-total');
            if (index != total) {
                current_set_id = data.attr('data-id');
                next_set_id = data.attr('data-next-id');
                var params = {
                    action_type: 'get_variant_chain',
                    product_id: data.attr('data-product-id'),
                    variant_id: data.val(),
                    rent_type: 'rent'
                };
                $.post('', params)
                    .done((response) => {
                        try {
                            response = JSON.parse(response);
                            // if (response.status === 'OK'){
                            console.log(response)
                            this.bind_select_options(next_set_id, response);
                            // }
                        } catch (e) {
                            console.log(e)
                        }

                    })
            } else { // last item of the chain
                prev_set_id = data.attr('data-prev-id');
                var params = {
                    action_type: 'get_last_variant',
                    product_id: data.attr('data-product-id'),
                    variant_id: data.val(),
                    chain_id: $('#variantSet_' + prev_set_id).val(),
                    rent_type: 'rent',
                };
                $.post('', params)
                    .done((response) => {
                        console.log(response)
                        try {
                            response = JSON.parse(response);
                            this.setModalData({
                                priceString: `${response.prices[0].base.html}`,
                                availableForSale: response.available,
                            })
                        } catch (e) {
                            console.log(e)
                        }

                    })
            }
        },

        bind_select_options: function (el_id, json) {
            console.log(json)
            if (json && json.length > 0) {
                $('#variantSet_' + el_id).empty().append('<option selected="selected" value="">--Select--</option>');
                for (var i = 0; i < json.length; i++) {
                    var option = $("<option>");
                    option.attr("value", json[i]['id']);
                    option.html(json[i]['name']);
                    $('#variantSet_' + el_id).append(option);
                }
            }
        },

        // set modal data
        setModalData: function (data) {
            console.log(data)
            if (data.images != undefined) {
                this.$modal.find('.rentmy-product-multipleimage').html(data.images.map(src => {
                    return `<div class="rentmy-product-thumb-item">
                                <img src="${src}" alt="rentmy" />
                            </div>`
                }))

                this.$modal.find('.rentmy-product-viewimage-active').attr('src', data.images[0])
                initMultipleImagePopup()
            }

            if (data.name != undefined)
                this.$modal.find('.rentmy-product-title').html(data.name)
            if (data.description != undefined)
                this.$modal.find('.rentmy-modalproduct-description').html(data.description)
            if (data.priceString != undefined)
                this.$modal.find('.rentmy-product-price').html(data.priceString)
            if (data.rental_price != undefined)
                this.$modal.find('.rentmy-product-price').html(currencyFormat(data.rental_price))
            if (data.availableForSale != undefined) {
                this.$modal.find('.rentmy-product-available').html(data.availableForSale)
                this.$modal.find('.rentmy-in-num').attr('max', data.availableForSale)
            }
            if (data.available != undefined) {
                this.$modal.find('.rentmy-product-available').html(data.available)
                this.$modal.find('.rentmy-in-num').attr('max', data.available)
            }
            if (data.prices != undefined || data.price != undefined) {
                let prices
                if (data.prices != undefined)
                    prices = this.format_prices(data.prices)
                else if (data.price != undefined)
                    prices = this.format_prices(data.price)

                let priceTypeHTML = '';
                let idPrefix = Math.random()
                if (prices.buy.type) {
                    let buyValue = this.content.product_details.buy || 'Buy';
                    priceTypeHTML += `<label class="rentmy-radio" for="rentmy-buy-${idPrefix}">
                                        <input type="radio" id="rentmy-buy-${idPrefix}" name="rentmy-package" value="buy" checked/> ` + buyValue + ` <span></span>
                                    </label>`
                }
                if (prices.rent.type) {
                    let rentValue = this.content.product_details.rent || 'Rent';
                    priceTypeHTML += ` <label class="rentmy-radio" for="rentmy-rent-${idPrefix}">
                                        <input type="radio" id="rentmy-rent-${idPrefix}" name="rentmy-package" data-price="${data.rental_price != undefined ? data.rental_price : ''}" value="rent" /> ` + rentValue + `<span></span>
                                    </label>`
                }

                this.$modal.find('.price-options').html(priceTypeHTML)

                this.$modal.find('input[name="rentmy-package"]').each(function () {
                    if ($(this).val() == 'rent') {
                        $(this).trigger('click')
                    }
                })
            }

            //check if package type
            if (data.isPackage != undefined && data.isPackage === 1) {
                let list = ''
                for (const product of data.products) {
                    list += `<div class="rentmy-package-single-list">
                                <h5>${product.name} (${product.quantity})</h5>`

                    //check variants

                    if (product.variants.length > 0) {
                        if ((product.variants.length == 1) && (product.variants[0].variant_chain == "Unassigned: Unassigned"))
                            break;
                        list += `<select data-package_uid="${data.uid}" data-package_id="${data.id}" data-product="${product.id}" class="variants">`
                        for (const variant of product.variants) {
                            list += `<option value="${variant.id}">${variant.variant_chain}</option>`
                        }
                        list += `</select>`
                    }

                    list += `</div>`
                }
                this.$modal.find('.rentmy-details-package-body span').html(list)
            }

            // check pricing option
            if (data.price_type != undefined && data.price_type == 'rent') {
                let pricing_list = '<ul>';
                if (data.formated_prices.rent.type) {
                    for (const price of data.formated_prices.rent.price) {
                        pricing_list += `<li> <strong><i class="lni lni-arrow-right"></i> ${currencyFormat(price.price)}</strong> for ${price.duration} ${price.label}</li>`;
                    }
                }
                pricing_list += '</ul>';
                this.$modal.find('.rentmy-modal-rentbuy .rentmy-pricing-options').html(pricing_list);

            } else {
                this.$modal.find('.rentmy-modal-rentbuy .rentmy-pricing-options').html('');
            }

            // Product variants
            if (data.isPackage != undefined && data.isPackage != 1) {
                let html = '';
                if (data.variant_set_list.length > 0 && data.variant_list.length > 0) {

                    data.variant_set_list.forEach((variant, index) => {
                        html += '<div class="rentmy-product-variant">';
                        html += `<h5>${variant.name}</h5>`;
                        html += `<select 
                                    class="rentmy-product-variants"
                                    data-total="${data.variant_set_list.length}"
                                    data-id="${variant.id}"
                                    data-product-id="${data.id}"
                                    data-next-id="${data.variant_set_list.length > index + 1 ? data.variant_set_list[index + 1].id : ''}"
                                    data-prev-id="${index > 0 ? data.variant_set_list[index - 1].id : ''}"
                                    id="variantSet_${variant.id}"
                                    data-index="${index + 1}"
                                >`;
                        filtered_varint = data.variant_list.filter(function (opt) {
                            return opt.variant_set_id == variant.id;
                        });

                        filtered_varint.forEach(variant_opt => {
                            html += `<option value='${variant_opt.id}'>${variant_opt.name}</option>`;
                        });
                        html += '</select>';
                        html += '</div>';

                    });
                }
                this.$modal.find('.rentmy-modal-product-variants').html(html);

            }

            //check if date is selected for cart then show/hide availibility
            const $availableElm = this.$modal.find('.rentmy-product-available').closest('p');
            const $dateElm = $('.products .rentmy-product-datetime').find('input[name="rent_start"]');
            if ($dateElm.val() == '') {
                $availableElm.addClass('rentmy-hide');
                this.$modal.find('.rentmy-in-num').removeAttr('max')
            } else
                $availableElm.removeClass();


            //when binding all data is completed open whatever type of modal it is!
            this.modalOpen();
        },

        //Open whatever modal is to open/triggered
        modalOpen: function () {
            //before modal open rest quantity field
            const $input = this.$modal.find('input.rentmy-in-num')
            $input.val(1);
            $input.trigger('change');

            //open modal
            this.$modal.addClass('is-open')
        },

        //send request to server for loading modal with data
        requestProductDetails: function () {
            let data = {
                action_type: 'product_details',
                isPackage: this.isPackage,
                uid: this.btnData.uid
            };
            $.post('', data)
                .done((response) => {
                    try {
                        response = JSON.parse(response);
                        if (response.status === 'OK') {
                            this.data = response.result.data
                            this.setModalData(response.result.data)
                        }
                    } catch (e) {
                        console.log(e)
                    }

                })
        },

        //modal trigger
        modalTrigger: function ($modal, $elm, isPackageType = 0) {
            this.btnData = JSON.parse($elm.attr('data-product'))
            this.$modal = $modal;
            this.isPackage = isPackageType;
            this.requestProductDetails()
        },

        addToCart: function (product = {}) {
            let data = {}
            if (product.id != undefined) {
                data.product_id = product.id
                data.quantity = product.quantity
                data.rental_type = 'rent'
                data.variants_products_id = product.variants_products_id
                data.action_type = 'add_to_cart';
                data.product_type = product.type

            } else {
                data = {
                    product_id: this.data.id,
                    quantity: this.getQuantity(),
                    rental_type: this.rental_type,
                    action_type: 'add_to_cart'
                };
                if (this.isPackage === 1) {
                    var products = [];
                    $('select.variants').each(function (i, item) {
                        var package_item = {
                            product_id: $(this).attr('data-product'),
                            variants_products_id: $(this).val()
                        };
                        products.push(package_item)
                    });
                    data.products = products
                    data.product_type = 2
                    data.variants_products_id = this.data.variants_products_id
                } else {
                    data.product_type = 1
                    data.variants_products_id = this.data.default_variant.variants_products_id
                }
            }
            console.log(data)
            cartObject.addToCart(data)
        },
    }

    $(document).ready(function () {
        $('body')
            .on('change', 'input[name="rentmy-package"]', function () {
                const packageType = $('input[name="rentmy-package"]:checked');
                let fixedPrice = false;
                if (packageType.attr('data-price') != undefined)
                    fixedPrice = packageType.attr('data-price')
                product.changePriceType(packageType.val(), fixedPrice)
            })
            .on('change', '.variants', function () {
                product.changeVariant($(this))
            })
            .on('change', '.rentmy-product-variants', function () {
                product.changeProductVariant($(this));
            })
            .on('click', '.product-cart-btn', function () {
                const modal = $('.rentmy-product-modal-overlay');
                product.modalTrigger(modal, $(this))
            })
            .on('click', '.package-cart-btn', function () {
                const modal = $('.rentmy-package-modal-overlay');
                product.modalTrigger(modal, $(this), 1)
            })
            .on('click', '.rentmy-addcart-btn', function () {
                const _product = $(this).attr('data-product');
                product.addToCart(JSON.parse(_product))
            })
            .on('click', '.rentmy-product-modal-overlay', function () {
                $('.rentmy-product-modal-overlay').removeClass('is-open');
            })
            .on('click', '.rentmy-package-modal-overlay', function () {
                $('.rentmy-package-modal-overlay').removeClass('is-open');
            })
            .on('click', '.rentmy-modal', function (e) {
                e.stopPropagation();
            })
            .find('.rentmy-product-modal-overlay .rentmy-num-in span, .rentmy-package-modal-overlay .rentmy-num-in span').click(function () {
                var $input = $(this).parents('.rentmy-number-block').find('input.rentmy-in-num');
                const maxQty = parseInt($input.attr('max'));
                if ($(this).hasClass('rentmy-minus')) {
                    var count = parseFloat($input.val()) - 1;
                    count = count < 1 ? 1 : count;
                    if (count < 2) {
                        $(this).addClass('rentmy-dis');
                    } else {
                        $(this).removeClass('rentmy-dis');
                    }
                    if (count < 0){
                        rentmyAlert.errorAlert('Minimum quantity exhausted!')
                        return;
                    }
                    $input.val(count);
                } else {
                    var count = parseFloat($input.val()) + 1
                    if (count > maxQty){
                        rentmyAlert.errorAlert('Maximum available quantity has been exhausted!')
                        return;
                    }
                    $input.val(count);
                    if (count > 1) {
                        $(this).parents('.rentmy-num-block').find(('.rentmy-minus')).removeClass('rentmy-dis');
                    }
                }

                $input.change();

                return false;
            });
    })

    $('.rentmy-modalclose').click(function () {
        $('.rentmy-product-modal-overlay').removeClass('is-open');
        $('.rentmy-package-modal-overlay').removeClass('is-open');
    })
    $('.rentmy-modal-cartbtn').click(function () {
        product.addToCart()
    })
    //bind time list dropdown to all the class listed with .timelist
    $('select.timelist')
        .html(['Select Time']
            .concat(...getTimeRanges(15, 'en'))
            .map(time => `<option value="${time != 'Select Time' ? time : ''}">${time}</option>`));

    $('body').on('submit', '.setCrtDateTime', function (e) {
        e.preventDefault();
        const formData = $(this).serializeArray();
        var params = {};

        $.map(formData, function (n, i) {
            params[n['name']] = n['value'];
        });

        //
        if (params.start_time == undefined) {
            //params.start_time = DEFAULT_START_TIME
            params.start_time = '';//DEFAULT_START_TIME
        }

        const startDateTIme = new Date(params.rent_start + ' ' + params.start_time);

        //@todo need to write condition here
        if (params.rent_end == undefined) {
            params.rent_end = '';
            // if (DEFAULT_END_DATE === 'default')
            //     params.rent_end = params.start_time
            // else {
            //     let _endDate = startDateTIme;
            //     const wildcard = JSON.parse(DEFAULT_END_DATE)
            //     if (wildcard[wildcard.length-1] === 'hour'){
            //         params.rent_end = _endDate.addHours(wildcard[0]).mysqlFormat()
            //         if (params.end_time == undefined){
            //             params.end_time = _endDate.showTime()
            //         }
            //     }else if (wildcard[wildcard.length-1] === 'day'){
            //         _endDate.setDate(_endDate.getDate()+wildcard[0])
            //         params.rent_end =_endDate.mysqlFormat();
            //     }else {
            //         rentmyAlert.errorAlert('Something went wrong with rent end date')
            //         return;
            //     }
            // }
        }

        if (params.end_time == undefined) {
            // params.end_time = DEFAULT_END_TIME
            params.end_time = '';//DEFAULT_END_TIME
        }

        const endDateTIme = new Date(params.rent_end + ' ' + params.end_time);
        if (startDateTIme > endDateTIme) {
            //  rentmyAlert.errorAlert('Please enter valid rent start and end schedule')
            //return;
        }
        console.log(params)
        params.action_type = 'set_cart_date_time'
        cartObject.submitSelectDatePopup(params)
    })
        .on('change', '.rentmy-filter-checkbox-list input[type=checkbox]', function (){
        let tags = [];
        $('.rentmy-filter-checkbox-list input[type=checkbox]').each(function (){
            let value = $(this).val();
            if($(this).prop('checked')){
                tags.push(value);
            }
        });

        insertURLParam('tag', tags.toString());
    })

    $('.rentmy-sort-by select').change(function () {
        insertURLParam('sort', $(this).val())
    })

});



