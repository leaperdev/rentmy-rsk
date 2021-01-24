let cart = {
    $elm: $('body').find('.rentmy-cartbar-launcher'),
    $sidebar: $('body').find('.rentmy-cartsidebar-overlay'),
    $datePopup: $('body').find('.rentmy-datetime-modal-overlay'),
    sidebar: {
        $rent_start: $('body').find('.rentmy-cartsidebar-overlay').find('.rentmy-selected-date-leftside p'),
        $rent_end: $('body').find('.rentmy-cartsidebar-overlay').find('.rentmy-selected-date-rightside p'),
    },
    cart: false,
    showAvailableLabel: false,

    addToCart: async function (data) {
        const responseRaw = await doPost(data)
        try {
            response = JSON.parse(responseRaw);

            if (response.status != undefined && response.status === 'OK') {
                cartObject.setValue(response.data)
            }

            if (response.status != undefined && response.status === 'NOK') {
                rentmyAlert.errorAlert(response.result.error)
            }
        } catch (e) {
            rentmyAlert.errorAlert('Something went wrong')
            console.log(e)
        }
    },

    update_quantity: async function(type, data) {
        let increment = 0;
        if (type == 'increase') {
            increment = 1;
        }

        data.action_type = 'cart_quantity_update'
        data.increment = increment

        const responseRaw = await doPost(data)
        try {
            response = JSON.parse(responseRaw);

            if (response.status != undefined && response.status === 'OK') {
                cartObject.setValue(response.data)
            }
            if (response.result != undefined && response.result.error != undefined){
                rentmyAlert.errorAlert(response.result.error)
            }
        } catch (e) {
            rentmyAlert.errorAlert('Something went wrong')
            console.log(e)
        }
    },

    deleteCartItem: async function (item_id, product_id) {
        const responseRaw = await doPost({
            'action_type': 'delete_cart_item',
            'cart_item_id': item_id,
            'product_id': product_id
        })

        try {
            response = JSON.parse(responseRaw)
            if (response.status != undefined && response.status === 'OK') {
                cartObject.setValue(response.data)
            }
        }catch (e){
            rentmyAlert.errorAlert('Something went wrong')
            console.log(e)
        }

    },

    setValue: function (cart) {
        if (cart == undefined)
            return;

        cart.enableCheckoutButton = true
        let errorItems = [];
        if (cart.errors != undefined){
            errorItems = [...cart.errors.ids]
            rentmyAlert.errorAlert(cart.errors.message)
            delete cart.errors;
            cart.enableCheckoutButton = false
        }
        this.cart = cart;
        localStorage.setItem('cart', JSON.stringify(cart))
        if (typeof checkout !== 'undefined') {
            try {
                const rowResponse = JSON.parse(cart.response);
                checkout.bindOrderData(rowResponse)
            }catch (e) {
                console.log(cart.response)
            }
        }

        if (cart.total_quantity != undefined)
            this.$elm.find('.rentmy-cartbar-launcher-summary #item-count').html(`${cart.cart_items.length || 0} items`)
        if (cart.total != undefined) {
            this.$elm.find('.rentmy-cartbar-launcher-summary #cart-total').html(cart.total)
            this.$sidebar.find('.rentmy-cart-sidebar-summary .rentmy-amount').html(cart.total)
        }

        this.showAvailableLabel = false;
        let rentmyDateLabel = '<span>'
        if (cart.rent_start != undefined && cart.rent_end != false) {
            this.showAvailableLabel = true;
            this.sidebar.$rent_start.html(cart.rent_start.date+', '+cart.rent_start.time).attr('data-date', JSON.stringify(cart.rent_start))
            rentmyDateLabel += ` <strong>${cart.rent_start.date}</strong> <small>${cart.rent_start.time}</small>`
        }
        if (cart.rent_end != false && cart.rent_end != undefined) {
            this.sidebar.$rent_end.html(cart.rent_end.date+', '+cart.rent_end.time).attr('data-date', JSON.stringify(cart.rent_end))
            rentmyDateLabel += ` - <strong>${cart.rent_end.date}</strong><small>${cart.rent_end.time}</small>`
        }
        rentmyDateLabel += '</span>'
        this.$elm.find('.rentmy-dates').html(rentmyDateLabel)

        if(cart.rent_start == false){
            this.resetAllDateTimes();
        }

        //enable and disable checkout page btn
        if (!cart.enableCheckoutButton)
            this.$sidebar.find('a.rentmy-checkout-btn').addClass('disabled')
        else
            this.$sidebar.find('a.rentmy-checkout-btn').removeClass('disabled')

        if (cart.cart_items != undefined) {
            let items = '';
            if (cart.cart_items.length > 0) {
                for (const item of cart.cart_items) {
                    //check if item has not availabe error
                    let validateClass = 'rentmy-list-item'
                    for (const id of errorItems){
                        if (item.id =! undefined && id == item.id)
                            validateClass += ' rentmy-list-empty-item'
                    }

                    items += `<li data-trace='${item.trace}'>
                            <div data-id="${item.id}" class="${validateClass}">
                                <img class="rentmy-product-image" src="${item.image}" />
                                <div class="rentmy-cart-line">
                                    <div class="rentmy-product-name rentmy-large">${item.name}</div>
                                    <div class="rentmy-modal-quantity">
                                        <div class="rentmy-number-block">
                                            <div class="rentmy-num-in">
                                                <span class="rentmy-minus rentmy-dis">-</span>`

                    if (this.showAvailableLabel)
                        items += `<input type="text" class="rentmy-in-num" value="${item.quantity}" max="${item.available}" readonly="">`
                    else
                        items += `<input type="text" class="rentmy-in-num" value="${item.quantity}" readonly="">`

                    items += `<span class="rentmy-plus">+</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="rentmy-price">${currencyFormat(item.price)}</span>`

                    if (this.showAvailableLabel)
                        items += `<p>Available: <span class="rentmy-available">${item.available}</span></p>`

                    items += `<button class="rentmy-remove-product"><i class="lni lni-close"></i></button>
                                </div>
                            </div>
                        </li>`
                }
            }

             this.$sidebar.find('.rentmy-cart-sidebar-lines ul').html(items)

             this.checkAndUpdateAvailability()

            this.$elm.addClass('rentmy-cartbar-launcher-hover').delay(4000).queue(function(){
                $(this).removeClass("rentmy-cartbar-launcher-hover").dequeue();
            });
        }
    },

    //open date time select popup
    openSelectDate : function() {
        this.setCartDateTime();
        console.log(this.$datePopup)
        //open popup
        this.$datePopup.addClass('is-open')
    },

    //submit date time select popup
    submitSelectDatePopup: function(prams){
        console.log(prams)
        $.post('', prams)
            .done((response) => {
                try {
                    response =  JSON.parse(response)
                    console.log(response)
                    if (response.status != undefined && response.status !== 'NOK') {
                        this.setValue(response.data)
                        this.setCartDateTime()
                    }else {
                        if(response.result.message != undefined){
                            rentmyAlert.errorAlert(response.result.message)
                        }
                        if (response.cartReset == undefined){
                            this.resetAllDateTimes()
                        }
                    }
                }catch (e){
                    rentmyAlert.errorAlert('Something went wrong')
                    console.log(response)
                    console.log(e)
                }
               this.closeDatetimePopup()
            })
    },

    openMiniCartSidebar : async function(){
        await this.checkAndUpdateAvailability()
        await this.$sidebar.addClass('is-open');
    },

    closeMiniCartSidebar: function(){
        this.$sidebar.removeClass('is-open');
    },

    checkAndUpdateAvailability: function(){
        console.log(this.showAvailableLabel)

        if (this.showAvailableLabel && (this.cart.cart_items != undefined && this.cart.cart_items.length > 0)) {
            $.post('', {action_type: 'cart_available_counts'})
                .done((response) => {
                    response = JSON.parse(response)
                    console.log(response)
                    if (response.status != undefined && response.status === 'OK') {
                        const $elmItems = this.$sidebar.find('.rentmy-list-item');
                        for (const item of response.result.data) {
                            $.each($elmItems, (index, elm) => {
                                const $elm = $(elm)
                                if ($elm.attr('data-id') == item.cart_item_id) {
                                    $elm.find('.rentmy-available').html(item.available)
                                }
                            })
                        }
                    }
                })
        }
    },

    closeDatetimePopup: function (){
        this.$datePopup.removeClass('is-open')
    },

    //set date time to frontend
    setCartDateTime: function() {
        if (this.cart) {
            if (this.cart.rent_start == false){
                this.resetAllDateTimes()
                return
            }

            const cartRent = this.sidebar.$rent_start.attr('data-date');
            if (cartRent == undefined)
                return false

            //get cart dates times
            const cartRentStart = JSON.parse(cartRent);
            const cartRentEnd = JSON.parse(this.sidebar.$rent_end.attr('data-date'));

            //set dates
            const dates = this.$datePopup.find('.rentmy-datetime-input input[type="date"]')
            const $popupRentStartDate = $(dates[0]);
            const $popupRentEndDate = $(dates[1]);

            $popupRentStartDate.val(cartRentStart.dateJS)
            $popupRentEndDate.val(cartRentEnd.dateJS)

            //set times
            const $rentStartTime = this.$datePopup.find('select.timelist[name="start_time"]')
            const $rentEndTime = this.$datePopup.find('select.timelist[name="end_time"]')

            $rentStartTime.find(`option[value="${cartRentStart.time.replace(/^(?:00:)?0?/, '')}"]`).prop('selected', true)
            $rentEndTime.find(`option[value="${cartRentEnd.time.replace(/^(?:00:)?0?/, '')}"]`).prop('selected', true)

            //product page filter inputs
            const $filtersDiv = $('body').find('.rentmy-product-datetime');
            const $datesElms = $filtersDiv.find('input[type="date"]');
            const $pageFilterRentStartDate = $($datesElms[0]);
            const $pageFilterRentEndDate = $($datesElms[1]);
            $pageFilterRentStartDate.val(cartRentStart.dateJS)
            $pageFilterRentEndDate.val(cartRentEnd.dateJS)

            const $pageFilterRentStartTime = $filtersDiv.find('select.timelist[name="start_time"]')
            const $pageFilterRentEndTime = $filtersDiv.find('select.timelist[name="end_time"]')

            $pageFilterRentStartTime.find(`option[value="${cartRentStart.time.replace(/^(?:00:)?0?/, '')}"]`).prop('selected', true)
            $pageFilterRentEndTime.find(`option[value="${cartRentEnd.time.replace(/^(?:00:)?0?/, '')}"]`).prop('selected', true)

        }
    },

    resetAllDateTimes : function (){
        this.sidebar.$rent_start.html(`Select Rental Schedule`).removeAttr('data-date')
        this.sidebar.$rent_end.html('').removeAttr('data-date')
        this.$elm.find('.rentmy-dates').html(`<span class="rentmy-selected-date">Select Rental Schedule</span>`)

        //reset dates
        const dates = this.$datePopup.find('.rentmy-datetime-input input[type="date"]')
        const $popupRentStartDate = $(dates[0]);
        const $popupRentEndDate = $(dates[1]);

        $popupRentStartDate.val('')
        $popupRentEndDate.val('')

        //reset times
        const $rentStartTime = this.$datePopup.find('select.timelist[name="start_time"]')
        const $rentEndTime = this.$datePopup.find('select.timelist[name="end_time"]')

        $rentStartTime.find(`option[value=""]`).prop('selected', true)
        $rentEndTime.find(`option[value=""]`).prop('selected', true)

        //reset product page filter inputs
        const $filtersDiv = $('body').find('.rentmy-product-datetime');
        const $datesElms = $filtersDiv.find('input[type="date"]');
        const $pageFilterRentStartDate = $($datesElms[0]);
        const $pageFilterRentEndDate = $($datesElms[1]);
        $pageFilterRentStartDate.val('')
        $pageFilterRentEndDate.val('')

        const $pageFilterRentStartTime = $filtersDiv.find('select.timelist[name="start_time"]')
        const $pageFilterRentEndTime = $filtersDiv.find('select.timelist[name="end_time"]')

        $pageFilterRentStartTime.find(`option[value=""]`).prop('selected', true)
        $pageFilterRentEndTime.find(`option[value=""]`).prop('selected', true)
    },

    removeCart : function(){
        localStorage.removeItem('cart')
    },

    //on load set cart data from localstorage if exist
    init: function () {
        cart = localStorage.getItem('cart')
        if (cart != undefined || cart != null) {
            try {
                cart = JSON.parse(cart)
                if (cart.cart_items != undefined && RENTMY_CART_TOKEN === cart.token) {
                    this.setValue(cart)
                    this.setCartDateTime()
                }else{
                    this.removeCart()
                }
            } catch (e) {
                console.log(e)
                this.removeCart()
            }
        }

    }
}


const cartObject = {...cart}

jQuery(document).ready(function(){
    jQuery(document).ready(function(){
        cart.init();
    });
});

$('body')
    .on('click', '.rentmy-cartbar-launcher', function () {
        cartObject.openMiniCartSidebar();
    })
    .on('click', '.rentmy-remove-product', function () {
        const trace = JSON.parse($(this).closest('li').attr('data-trace'))
        cartObject.deleteCartItem(trace.cart_item_id, trace.product_id)
    })
    .on('click', '.rentmy-cart-modalclose', function () {
        cartObject.closeMiniCartSidebar()
    })
    .on('click', '.rentmy-cartsidebar-overlay .rentmy-num-in span', async function () {

        var $input = $(this).parents('.rentmy-number-block').find('input.rentmy-in-num');
      //  const maxQty = parseInt($input.attr('max'));
        let type = 'increase';

        if ($(this).hasClass('rentmy-minus')) {
            var count = parseInt($input.val()) - 1;
            count = await count < 1 ? 0 : count;
            if (count < 2) {
                $(this).addClass('rentmy-dis');
            } else {
                $(this).removeClass('rentmy-dis');
            }
            if (count < 0){
                rentmyAlert.errorAlert('Minimum quantity exhausted!')
                return ;
            }
            type = 'decrease'
            const trace = await JSON.parse($(this).closest('li').attr('data-trace'))
            cartObject.update_quantity(type, trace);
        } else {
            var count = parseInt($input.val()) + 1
            if (count > 1) {
                $(this).parents('.rentmy-num-block').find(('.rentmy-minus')).removeClass('rentmy-dis');
            }

            const trace = await JSON.parse($(this).closest('li').attr('data-trace'))
            cartObject.update_quantity(type, trace);
        }

    })
    .on('click', '.rentmy-selected-date', function () {
        cartObject.openSelectDate();
        return false;
    })

    $('.close-datetime-popup').click(function () {
        cartObject.closeDatetimePopup();
    })


// product details image select view js
function initMultipleImagePopup() {
    const activeImage = document.querySelector(".rentmy-product-view-image .rentmy-product-viewimage-active");
    const productImages = document.querySelectorAll(".rentmy-product-multipleimage img");

    function changeImage(e) {
        activeImage.src = e.target.src;
    }

    productImages.forEach((image) => image.addEventListener("click", changeImage));

    $('body').on('click', '.rentmy-product-multipleimage .rentmy-product-thumb-item', function () {
        $('body').find('.rentmy-product-thumb-item').removeClass("rentmy-product-thumb-active");
        $(this).addClass("rentmy-product-thumb-active");
    });
}


