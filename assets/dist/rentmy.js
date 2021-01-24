!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.SignaturePad=b()}):"object"==typeof exports?module.exports=b():a.SignaturePad=b()}(this,function(){/*!
    * Signature Pad v1.5.3 | https://github.com/szimek/signature_pad
    * (c) 2016 Szymon Nowak | Released under the MIT license
    */
   var a=function(a){"use strict";var b=function(a,b){var c=this,d=b||{};this.velocityFilterWeight=d.velocityFilterWeight||.7,this.minWidth=d.minWidth||.5,this.maxWidth=d.maxWidth||2.5,this.dotSize=d.dotSize||function(){return(this.minWidth+this.maxWidth)/2},this.penColor=d.penColor||"black",this.backgroundColor=d.backgroundColor||"rgba(0,0,0,0)",this.onEnd=d.onEnd,this.onBegin=d.onBegin,this._canvas=a,this._ctx=a.getContext("2d"),this.clear(),this._handleMouseDown=function(a){1===a.which&&(c._mouseButtonDown=!0,c._strokeBegin(a))},this._handleMouseMove=function(a){c._mouseButtonDown&&c._strokeUpdate(a)},this._handleMouseUp=function(a){1===a.which&&c._mouseButtonDown&&(c._mouseButtonDown=!1,c._strokeEnd(a))},this._handleTouchStart=function(a){if(1==a.targetTouches.length){var b=a.changedTouches[0];c._strokeBegin(b)}},this._handleTouchMove=function(a){a.preventDefault();var b=a.targetTouches[0];c._strokeUpdate(b)},this._handleTouchEnd=function(a){var b=a.target===c._canvas;b&&(a.preventDefault(),c._strokeEnd(a))},this._handleMouseEvents(),this._handleTouchEvents()};b.prototype.clear=function(){var a=this._ctx,b=this._canvas;a.fillStyle=this.backgroundColor,a.clearRect(0,0,b.width,b.height),a.fillRect(0,0,b.width,b.height),this._reset()},b.prototype.toDataURL=function(){var a=this._canvas;return a.toDataURL.apply(a,arguments)},b.prototype.fromDataURL=function(a){var b=this,c=new Image,d=window.devicePixelRatio||1,e=this._canvas.width/d,f=this._canvas.height/d;this._reset(),c.src=a,c.onload=function(){b._ctx.drawImage(c,0,0,e,f)},this._isEmpty=!1},b.prototype._strokeUpdate=function(a){var b=this._createPoint(a);this._addPoint(b)},b.prototype._strokeBegin=function(a){this._reset(),this._strokeUpdate(a),"function"==typeof this.onBegin&&this.onBegin(a)},b.prototype._strokeDraw=function(a){var b=this._ctx,c="function"==typeof this.dotSize?this.dotSize():this.dotSize;b.beginPath(),this._drawPoint(a.x,a.y,c),b.closePath(),b.fill()},b.prototype._strokeEnd=function(a){var b=this.points.length>2,c=this.points[0];!b&&c&&this._strokeDraw(c),"function"==typeof this.onEnd&&this.onEnd(a)},b.prototype._handleMouseEvents=function(){this._mouseButtonDown=!1,this._canvas.addEventListener("mousedown",this._handleMouseDown),this._canvas.addEventListener("mousemove",this._handleMouseMove),a.addEventListener("mouseup",this._handleMouseUp)},b.prototype._handleTouchEvents=function(){this._canvas.style.msTouchAction="none",this._canvas.style.touchAction="none",this._canvas.addEventListener("touchstart",this._handleTouchStart),this._canvas.addEventListener("touchmove",this._handleTouchMove),this._canvas.addEventListener("touchend",this._handleTouchEnd)},b.prototype.on=function(){this._handleMouseEvents(),this._handleTouchEvents()},b.prototype.off=function(){this._canvas.removeEventListener("mousedown",this._handleMouseDown),this._canvas.removeEventListener("mousemove",this._handleMouseMove),a.removeEventListener("mouseup",this._handleMouseUp),this._canvas.removeEventListener("touchstart",this._handleTouchStart),this._canvas.removeEventListener("touchmove",this._handleTouchMove),this._canvas.removeEventListener("touchend",this._handleTouchEnd)},b.prototype.isEmpty=function(){return this._isEmpty},b.prototype._reset=function(){this.points=[],this._lastVelocity=0,this._lastWidth=(this.minWidth+this.maxWidth)/2,this._isEmpty=!0,this._ctx.fillStyle=this.penColor},b.prototype._createPoint=function(a){var b=this._canvas.getBoundingClientRect();return new c(a.clientX-b.left,a.clientY-b.top)},b.prototype._addPoint=function(a){var b,c,e,f,g=this.points;g.push(a),g.length>2&&(3===g.length&&g.unshift(g[0]),f=this._calculateCurveControlPoints(g[0],g[1],g[2]),b=f.c2,f=this._calculateCurveControlPoints(g[1],g[2],g[3]),c=f.c1,e=new d(g[1],b,c,g[2]),this._addCurve(e),g.shift())},b.prototype._calculateCurveControlPoints=function(a,b,d){var e=a.x-b.x,f=a.y-b.y,g=b.x-d.x,h=b.y-d.y,i={x:(a.x+b.x)/2,y:(a.y+b.y)/2},j={x:(b.x+d.x)/2,y:(b.y+d.y)/2},k=Math.sqrt(e*e+f*f),l=Math.sqrt(g*g+h*h),m=i.x-j.x,n=i.y-j.y,o=l/(k+l),p={x:j.x+m*o,y:j.y+n*o},q=b.x-p.x,r=b.y-p.y;return{c1:new c(i.x+q,i.y+r),c2:new c(j.x+q,j.y+r)}},b.prototype._addCurve=function(a){var b,c,d=a.startPoint,e=a.endPoint;b=e.velocityFrom(d),b=this.velocityFilterWeight*b+(1-this.velocityFilterWeight)*this._lastVelocity,c=this._strokeWidth(b),this._drawCurve(a,this._lastWidth,c),this._lastVelocity=b,this._lastWidth=c},b.prototype._drawPoint=function(a,b,c){var d=this._ctx;d.moveTo(a,b),d.arc(a,b,c,0,2*Math.PI,!1),this._isEmpty=!1},b.prototype._drawCurve=function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o=this._ctx,p=c-b;for(d=Math.floor(a.length()),o.beginPath(),f=0;d>f;f++)g=f/d,h=g*g,i=h*g,j=1-g,k=j*j,l=k*j,m=l*a.startPoint.x,m+=3*k*g*a.control1.x,m+=3*j*h*a.control2.x,m+=i*a.endPoint.x,n=l*a.startPoint.y,n+=3*k*g*a.control1.y,n+=3*j*h*a.control2.y,n+=i*a.endPoint.y,e=b+i*p,this._drawPoint(m,n,e);o.closePath(),o.fill()},b.prototype._strokeWidth=function(a){return Math.max(this.maxWidth/(a+1),this.minWidth)};var c=function(a,b,c){this.x=a,this.y=b,this.time=c||(new Date).getTime()};c.prototype.velocityFrom=function(a){return this.time!==a.time?this.distanceTo(a)/(this.time-a.time):1},c.prototype.distanceTo=function(a){return Math.sqrt(Math.pow(this.x-a.x,2)+Math.pow(this.y-a.y,2))};var d=function(a,b,c,d){this.startPoint=a,this.control1=b,this.control2=c,this.endPoint=d};return d.prototype.length=function(){var a,b,c,d,e,f,g,h,i=10,j=0;for(a=0;i>=a;a++)b=a/i,c=this._point(b,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x),d=this._point(b,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y),a>0&&(g=c-e,h=d-f,j+=Math.sqrt(g*g+h*h)),e=c,f=d;return j},d.prototype._point=function(a,b,c,d,e){return b*(1-a)*(1-a)*(1-a)+3*c*(1-a)*(1-a)*a+3*d*(1-a)*a*a+e*a*a*a},b}(document);return a});

/*
    Copyright RentMy @2021.
    RentMy nano project
    Author: RentMy
 */

const RentMy = {
    globalSelector: '.rentmy-main-wrapper',
    template: {
        isInit: false,
        init: function () {
            this.isInit = true;
            $(RentMy.globalSelector)
                .on('click', '.rentmy-mobile-menubar', function () {
                    $('body').find(".rentmy-nav-manu ").slideToggle(200);
                })
                .on('click', '.rentmy-modalclose, .rentmy-datetime-modal-overlay', function () {
                    $('.rentmy-datetime-modal-overlay').removeClass('is-open');
                })
                .on('click', '.rentmy-modal', function (e) {
                    e.stopPropagation();
                })
                .on('click', '#search-btn', function (event) {
                    event.preventDefault();
                    this.searchProduct($('#search-product').val());
                })
                .on('keyup keypress', '#search-form', function (e) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode === 13 || e.key === 'Enter') {
                        e.preventDefault();
                        this.searchProduct($('#search-product').val());
                        return false;
                    }
                })
                .on('keyup', "#subscription-email", function (e) {
                    let currentValue = $(this).val();
                    const btn = '#subscribe-btn'
                    if (currentValue.length > 6) {
                        let pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
                        if (!pattern.test(currentValue)) {
                            $(btn).prop('disabled', true);
                            $(btn).addClass('disabled');
                        } else {
                            $(btn).prop('disabled', false);
                            $(btn).removeClass('disabled');
                        }
                    } else {
                        $(btn).prop('disabled', true);
                        $(btn).addClass('disabled');
                    }
                })
                .on('submit', '#subscribe-form', function (e) {
                    e.preventDefault();
                    const email = $(this).find("#subscription-email").val()
                    this.subscribeSubmit(email);
                })
                .on('click', '.rentmy-search-bar, .rentmy-search-closebar', function () {
                    $(RentMy.globalSelector).find('.rentmy-search-body').toggleClass('rentmy-search-show');
                })
                .on('click', '.rentmy-payment-collaps-btn', function (e) {
                    e.preventDefault();
                    const $n = $(this);
                    if ($n.next().hasClass('show')) {
                        $n.next().removeClass('show');
                    } else {
                        $n.parent().parent().find('.rentmy-payment-collaps-content').removeClass('show');
                        $n.parent().parent().find('.rentmy-payment-collaps-content').slideUp(350);
                        $n.next().toggleClass('show');
                    }
                    $n.next().slideToggle(350);
                })
                .on('click', '.rentmy-fulfillment-collaps .rentmy-fulfillment-collaps-item .rentmy-fulfillment-collaps-btn', function (e) {
                    $(this).find('input[type=radio]').prop('checked', true);
                })
                .on('click', '.rentmy-modalclose', function () {
                    $(RentMy.globalSelector).find('.rentmy-product-modal-overlay').removeClass('is-open');
                    $(RentMy.globalSelector).find('.rentmy-package-modal-overlay').removeClass('is-open');
                })
                .on('click', '.rentmy-modal-cartbtn', function () {
                    RentMy.products.addToCart()
                })
                .on('submit', '.setCrtDateTime', function (e) {
                    e.preventDefault();
                    const formData = $(this).serializeArray();
                    let params = {};
                    $.map(formData, function (n, i) {
                        params[n['name']] = n['value'];
                    });

                    if (params.start_time == undefined) {
                        params.start_time = '';//DEFAULT_START_TIME
                    }

                    if (params.rent_end == undefined) {
                        params.rent_end = '';
                    }

                    if (params.end_time == undefined) {
                        params.end_time = '';//DEFAULT_END_TIME
                    }

                    params.action_type = 'set_cart_date_time'
                    RentMy.cartWidget.submitSelectDatePopup(params)
                })

            //bind time list dropdown to all the class listed with .timelist
            $(RentMy.globalSelector).find('select.timelist')
                .html(['Select Time']
                    .concat(...RentMy.helpers.getTimeRanges(15, 'en'))
                    .map(time => `<option value="${time != 'Select Time' ? time : ''}">${time}</option>`));
        },
        searchProduct: function (searchParam) {
            window.location = $('#search-form').attr('action') + '?search=' + searchParam;
        },
        subscribeSubmit: async function (email) {
            const responseRaw = await doPost({
                email: email,
                action_type: 'newsletter_subscription'
            })

            try {
                const response = JSON.parse(responseRaw);
                if (response.error) {
                    RentMy.alert.errorAlert(response.error);
                } else {
                    RentMy.alert.successAlert(response.message);
                }
            } catch (e) {
            }
        }
    },
    cartWidget: {
        globalSelector: null,
        $elm: null,
        $sidebar: null,
        $datePopup: null,
        sidebar: null,
        cart: false,
        showAvailableLabel: false,
        isInit: false,
        init: function () {

            this.isInit = true;
            //init elements accroding to rentmy global container
            this.globalSelector = RentMy.globalSelector;
            this.$elm = $(this.globalSelector).find('.rentmy-cartbar-launcher')
            this.$sidebar = $(this.globalSelector).find('.rentmy-cartsidebar-overlay')
            this.$datePopup = $(this.globalSelector).find('.rentmy-datetime-modal-overlay')
            this.sidebar = {
                $rent_start: $(this.globalSelector).find('.rentmy-cartsidebar-overlay').find('.rentmy-selected-date-leftside p'),
                $rent_end: $(this.globalSelector).find('.rentmy-cartsidebar-overlay').find('.rentmy-selected-date-rightside p'),
            };

            window.dispatchEvent((new CustomEvent('rentMy.cart.init', {
                bubbles: true,
                detail: {
                    cart : this,
                }
            })))

            cart = localStorage.getItem('cart')
            if (cart != undefined || cart != null) {
                try {
                    cart = JSON.parse(cart)
                    if (cart.cart_items != undefined && RENTMY_CART_TOKEN === cart.token) {
                        this.setValue(cart)
                        this.setCartDateTime()
                    } else {
                        this.removeCart()
                    }
                } catch (e) {
                    console.log(e)
                    this.removeCart()
                }
            }

            $(RentMy.globalSelector)
                .on('click', '.rentmy-cartbar-launcher', function () {
                    RentMy.cartWidget.openMiniCartSidebar();
                })
                .on('click', '.rentmy-remove-product', function () {
                    const trace = JSON.parse($(this).closest('li').attr('data-trace'))
                    RentMy.cartWidget.deleteCartItem(trace.cart_item_id, trace.product_id)
                })
                .on('click', '.rentmy-cart-modalclose', function () {
                    RentMy.cartWidget.closeMiniCartSidebar()
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
                        if (count < 0) {
                            RentMy.alert.errorAlert('Minimum quantity exhausted!')
                            return;
                        }
                        type = 'decrease'
                        const trace = await JSON.parse($(this).closest('li').attr('data-trace'))
                        RentMy.cartWidget.update_quantity(type, trace);
                    } else {
                        var count = parseInt($input.val()) + 1
                        if (count > 1) {
                            $(this).parents('.rentmy-num-block').find(('.rentmy-minus')).removeClass('rentmy-dis');
                        }

                        const trace = await JSON.parse($(this).closest('li').attr('data-trace'))
                        RentMy.cartWidget.update_quantity(type, trace);
                    }

                })
                .on('click', '.rentmy-selected-date', function () {
                    RentMy.cartWidget.openSelectDate();
                    return false;
                })
                .on('click', '.close-datetime-popup', function () {
                    RentMy.cartWidget.closeDatetimePopup();
                })
        },

        addToCart: async function (data) {
            const responseRaw = await RentMy.helpers.ajaxPost(data)
            try {
               let response = JSON.parse(responseRaw);

                //define a custom event
                window.dispatchEvent((new CustomEvent('rentMy.cart.ItemAdded', {
                    bubbles: true,
                    detail: {
                        cart : this,
                        request: data,
                        response: response
                    }
                })))

                if (response.status != undefined && response.status === 'OK') {
                    this.setValue(response.data)
                }
                if (response.status != undefined && response.status === 'NOK') {
                    RentMy.alert.errorAlert(response.result.error)
                }
            } catch (e) {
            }
        },

        update_quantity: async function (type, data) {
            let increment = 0;
            if (type == 'increase') {
                increment = 1;
            }
            data.action_type = 'cart_quantity_update'
            data.increment = increment

            const responseRaw = await RentMy.helpers.ajaxPost(data)
            try {
                let response = JSON.parse(responseRaw);

                //define a custom event
                window.dispatchEvent((new CustomEvent('rentMy.cart.quantityUpdate', {
                    bubbles: true,
                    detail: {
                        cart : this,
                        request: data,
                        response: response
                    }
                })))

                if (response.status != undefined && response.status === 'OK') {
                    this.setValue(response.data)
                }
                if (response.result != undefined && response.result.error != undefined) {
                    RentMy.alert.errorAlert(response.result.error)
                }
            } catch (e) {
            }
        },

        deleteCartItem: async function (item_id, product_id) {
            const param = {
                'action_type': 'delete_cart_item',
                'cart_item_id': item_id,
                'product_id': product_id
            }
            const responseRaw = await RentMy.helpers.ajaxPost(param)

            try {
                let response = JSON.parse(responseRaw)

                //define a custom event
                window.dispatchEvent((new CustomEvent('rentMy.cart.itemDelete', {
                    bubbles: true,
                    detail: {
                        cart : this,
                        request: param,
                        response: response
                    }
                })))

                if (response.status != undefined && response.status === 'OK') {
                    this.setValue(response.data)
                }
            } catch (e) {
            }

        },

        setValue: function (cart) {
            if (cart == undefined)
                return;
            cart.enableCheckoutButton = true
            let errorItems = [];
            if (cart.errors != undefined) {
                errorItems = [...cart.errors.ids]
                RentMy.alert.errorAlert(cart.errors.message)
                delete cart.errors;
                cart.enableCheckoutButton = false
            }
            this.cart = cart;

            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.cart.dataBind', {
                bubbles: true,
                detail: {
                    cart : this,
                    data: this.cart
                }
            }))

            localStorage.setItem('cart', JSON.stringify(cart))
            if (RentMy.checkout.isInit) {
                try {
                    const rowResponse = JSON.parse(cart.response);
                    RentMy.checkout.bindOrderData(rowResponse)
                } catch (e) {
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
                this.sidebar.$rent_start.html(cart.rent_start.date + ', ' + cart.rent_start.time).attr('data-date', JSON.stringify(cart.rent_start))
                rentmyDateLabel += ` <strong>${cart.rent_start.date}</strong> <small>${cart.rent_start.time}</small>`
            }
            if (cart.rent_end != false && cart.rent_end != undefined) {
                this.sidebar.$rent_end.html(cart.rent_end.date + ', ' + cart.rent_end.time).attr('data-date', JSON.stringify(cart.rent_end))
                rentmyDateLabel += ` - <strong>${cart.rent_end.date}</strong><small>${cart.rent_end.time}</small>`
            }
            rentmyDateLabel += '</span>'
            this.$elm.find('.rentmy-dates').html(rentmyDateLabel)

            if (cart.rent_start == false) {
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
                        for (const id of errorItems) {
                            if (item.id = !undefined && id == item.id)
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
                                    <span class="rentmy-price">${RentMy.helpers.currencyFormat(item.price)}</span>`

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
                this.$elm.addClass('rentmy-cartbar-launcher-hover').delay(4000).queue(function () {
                    $(this).removeClass("rentmy-cartbar-launcher-hover").dequeue();
                });
            }
        },

        //open date time select popup
        openSelectDate: function () {
            this.setCartDateTime();
            //open popup
            this.$datePopup.addClass('is-open')
        },

        //submit date time select popup
        submitSelectDatePopup: async function (prams) {
            const responseRaw = await RentMy.helpers.ajaxPost(prams)
            try {
                let response = JSON.parse(responseRaw)

                //define a custom event
                window.dispatchEvent(new CustomEvent('rentMy.cart.changeRentalDateTime', {
                    bubbles: true,
                    detail: {
                        cart : this,
                        request: prams,
                        response: response
                    }
                }))

                if (response.status != undefined && response.status !== 'NOK') {
                    this.setValue(response.data)
                    this.setCartDateTime()
                } else {
                    if (response.result.message != undefined) {
                        RentMy.alert.errorAlert(response.result.message)
                    }
                    if (response.cartReset == undefined) {
                        this.resetAllDateTimes()
                    }
                }
            } catch (e) {
            }
            this.closeDatetimePopup()
        },

        openMiniCartSidebar: async function () {
            await this.checkAndUpdateAvailability()
            await this.$sidebar.addClass('is-open');
        },

        closeMiniCartSidebar: function () {
            this.$sidebar.removeClass('is-open');
        },

        checkAndUpdateAvailability: async function () {
            if (this.showAvailableLabel && (this.cart.cart_items != undefined && this.cart.cart_items.length > 0)) {
                const responseRaw = await RentMy.helpers.ajaxPost({action_type: 'cart_available_counts'})
                try {
                    let response = JSON.parse(responseRaw)

                    //define a custom event
                    window.dispatchEvent(new CustomEvent('rentMy.cart.checkAvailability', {
                        bubbles: true,
                        detail: {
                            cart : this,
                            response: response
                        }
                    }))

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
                } catch (e) {
                }
            }
        },

        closeDatetimePopup: function () {
            this.$datePopup.removeClass('is-open')
        },

        //set date time to frontend
        setCartDateTime: function () {
            if (this.cart) {
                if (this.cart.rent_start == false) {
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
                const $filtersDiv = $(RentMy.globalSelector).find('.rentmy-product-datetime');
                const $datesElms = $filtersDiv.find('input[type="date"]');
                const $pageFilterRentStartDate = $($datesElms[0]);
                const $pageFilterRentEndDate = $($datesElms[1]);
                $pageFilterRentStartDate.val(cartRentStart.dateJS)
                $pageFilterRentEndDate.val(cartRentEnd.dateJS)

                const $pageFilterRentStartTime = $filtersDiv.find('select.timelist[name="start_time"]')
                const $pageFilterRentEndTime = $filtersDiv.find('select.timelist[name="end_time"]')

                $pageFilterRentStartTime.find(`option[value="${cartRentStart.time.replace(/^(?:00:)?0?/, '')}"]`).prop('selected', true)
                $pageFilterRentEndTime.find(`option[value="${cartRentEnd.time.replace(/^(?:00:)?0?/, '')}"]`).prop('selected', true)


                //define a custom event
                window.dispatchEvent(new CustomEvent('rentMy.cart.setDateTime', {
                    bubbles: true,
                    detail: {
                        cart : this,
                        cartRentStart: cartRentStart,
                        cartRentEnd: cartRentEnd,
                        elmPopupDate: dates,
                        elmPageDate: $filtersDiv,
                    }
                }))
            }
        },

        resetAllDateTimes: function () {
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

            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.cart.resetDateTime', {
                bubbles: true,
                detail: {
                    cart : this,
                    elmPopupDate: dates,
                    elmPageDate: $filtersDiv,
                }
            }))
        },

        removeCart: function () {
            let cart = localStorage.getItem('cart')
            localStorage.removeItem('cart')

            try {
                cart = JSON.parse(cart);
            }catch (e){}

            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.cart.localStorage.delete', {
                bubbles: true,
                detail: {
                    cart : this,
                    data: cart
                }
            }))
        },
    },
    helpers: {
        getTimeRanges: function (interval, language = window.navigator.language, startFrom = '8:00 AM') {
            const ranges = [];
            const date = new Date();
            const format = {
                hour: 'numeric',
                minute: 'numeric',
            };

            for (let minutes = 0; minutes < 24 * 60; minutes = minutes + interval) {
                date.setHours(0);
                date.setMinutes(minutes);
                ranges.push(date.toLocaleTimeString(language, format));
            }

            if (startFrom !== '') {
                let times = []
                ranges.forEach((time, index) => {
                    if (time === startFrom) {
                        for (let start = index; start < ranges.length; start++)
                            times.push(ranges[start])

                        for (let rest = 0; rest < index; rest++)
                            times.push(ranges[rest])
                    }
                })
                return times;
            }
            return ranges;
        },
        currencyFormat(amount) {
            amount = parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            const currencyFormat = STORE_CONFIG.currency_format
            if (currencyFormat.pre) {
                return `<span class="pre">${currencyFormat.symbol}</span><span class="amount">${amount}</span>`
            }
            return `<span class="amount">${amount}</span><span class="pre">${currencyFormat.symbol}</span>`
        },
        insertURLParam: function (key, value) {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get(key) != undefined && urlParams.get(key).length > 1) {
                urlParams.delete(key)
            }
            urlParams.set(key, value);
            window.location.search = urlParams;
        },
        ajaxPost: async function (args, beforePostCallback, afterPostCallback) {
            //callback init before server request sent
            if (typeof beforePostCallback === 'function') {
                beforePostCallback(args);
            }

            let result;
            try {
                result = await $.post('', args)
                    .done((response) => {
                        try {
                            response = JSON.parse(response);
                            console.log(response)
                            //callback after server response success
                            if (typeof afterPostCallback === 'function') {
                                afterPostCallback(args, response);
                            }

                            if (response.status === 'NOK') {
                                if (response.result && typeof response.result.error === 'string')
                                    RentMy.alert.errorAlert(response.result.error);
                            }

                        } catch (e) {
                            console.log(e)
                            console.log(response)
                        }
                    });

                return result;
            } catch (error) {
                console.error(error);
            }
        },
        initMultipleImagePopup: function () {
            const activeImage = document.querySelector(".rentmy-product-view-image .rentmy-product-viewimage-active");
            const productImages = document.querySelectorAll(".rentmy-product-multipleimage img");

            function changeImage(e) {
                activeImage.src = e.target.src;
            }

            productImages.forEach((image) => image.addEventListener("click", changeImage));

            $(RentMy.globalSelector).on('click', '.rentmy-product-multipleimage .rentmy-product-thumb-item', function () {
                $(RentMy.globalSelector).find('.rentmy-product-thumb-item').removeClass("rentmy-product-thumb-active");
                $(this).addClass("rentmy-product-thumb-active");
            });
        }
    },
    alert: {
        $elm: null,
        $parentContainer: null,
        html: null,
        type: null,
        icons: {
            success: 'lni lni-checkmark-circle',
            error: 'lni lni-warning'
        },
        setContent: function (html) {
            this.html = html
            this.$elm = $(RentMy.globalSelector).find('.rentmy-alert-message');
            this.$parentContainer = $(RentMy.globalSelector).find('.rentmy-alert-message div').first();
            this.$elm.find('.rentmy-alert-message-text').html(html)
        },
        error: function () {
            //remove classes
            this.resetClasses()
            this.type = 'error'
            //add error classes
            this.$parentContainer.addClass('rentmy-alert-error-message')
            this.$elm.find('.rentmy-alert-message-icon i').addClass(this.icons.error)
        },
        success: function () {
            //remove classes
            this.resetClasses()
            this.type = 'success'
            //add success classes
            this.$parentContainer.addClass('rentmy-alert-success-message')
            this.$elm.find('i').addClass(this.icons.success)
        },
        resetClasses: function () {
            this.$parentContainer.removeClass()
            this.$elm.find('i').removeClass()
        },
        open: function () {
            this.$elm.removeClass('rentmy-hide').delay(4000).queue(function () {
                $(this).addClass("rentmy-hide").dequeue();
            });

            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.alert.open', {
                bubbles: true,
                detail: {
                    alert : this,
                    html: this.html,
                    type: this.type
                }
            }))
        },
        errorAlert: function (html) {
            this.setContent(html)
            this.error()
            this.open()
        },
        successAlert: function (html) {
            this.setContent(html)
            this.success()
            this.open()
        }
    },
    isInit: false,
    init: function(page) {
        this.isInit = true;
        //Define prototypes
        Date.prototype.addHours = function (h) {
            this.setTime(this.getTime() + (h * 60 * 60 * 1000));
            return this;
        }
        Date.prototype.mysqlFormat = function () {
            var year, month, day;
            year = String(this.getFullYear());
            month = String(this.getMonth() + 1);
            if (month.length == 1) {
                month = "0" + month;
            }
            day = String(this.getDate());
            if (day.length == 1) {
                day = "0" + day;
            }
            return year + "-" + month + "-" + day;
        }
        Date.prototype.showTime = function () {
            var d = this;
            d.setHours(d.getHours() + 2); // offset from local time
            var h = (d.getHours() % 12) || 12; // show midnight & noon as 12
            return (
                (h < 10 ? '0' : '') + h +
                (d.getMinutes() < 10 ? ':0' : ':') + d.getMinutes() +
                // optional seconds display
                // ( d.getSeconds() < 10 ? ':0' : ':') + d.getSeconds() +
                (d.getHours() < 12 ? ' AM' : ' PM')
            );
        }

        $(async function () {
            if (typeof page !== 'undefined') {
                RentMy.template.init();
                switch (page.toLowerCase()) {
                    case 'home':
                        RentMy.home.init()
                        break;
                    case 'products':
                        RentMy.products.init();
                        break;
                    case 'categories':
                        RentMy.categories.init();
                        break;
                    case 'contact':
                        RentMy.contact.init();
                        break;
                    case 'checkout':
                        await RentMy.checkout.init();
                        break;
                    case 'cart':
                        RentMy.cart.init();
                        break;
                    default:
                        break;
                }
                RentMy.cartWidget.init();

                //define a custom event
                window.dispatchEvent(new CustomEvent('rentMy.init', {
                    bubbles: true,
                    detail: {
                        rentMy : this,
                        page: PAGE
                    }
                }))
            }
        });
    },

    //Pages Start
    home: {
        isInit: false,
        init: function () {
            this.isInit = true;
            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.page.home.init', {
                bubbles: true,
                detail: {
                    home : this,
                }
            }))

        }
    },
    products: {
        $modal: null,  //product / package type modal is triggered
        btnData: null, //products page modal page button may have some data regarding refereed product/package.
        isPackage: 0,   // if triggered modal is 1 for package type or 0 for product type.
        data: null,     //response data from server
        rental_type: 'buy',
        rent_start: null,
        rent_end: null,
        term: 1,
        content: CONTENT != undefined ? SITE_SPECIFIC : false,

        isInit: false,
        init: function () {
            this.isInit = true;
            $(RentMy.globalSelector)
                .on('change', 'input[name="rentmy-package"]', function () {
                    const packageType = $('input[name="rentmy-package"]:checked');
                    let fixedPrice = false;
                    if (packageType.attr('data-price') != undefined)
                        fixedPrice = packageType.attr('data-price')
                    RentMy.products.changePriceType(packageType.val(), fixedPrice)
                })
                .on('change', '.variants', function () {
                    RentMy.products.changeVariant($(this))
                })
                .on('change', '.rentmy-product-variants', function () {
                    RentMy.products.changeProductVariant($(this));
                })
                .on('click', '.product-cart-btn', function () {
                    const modal = $(RentMy.globalSelector).find('.rentmy-product-modal-overlay');
                    RentMy.products.modalTrigger(modal, $(this))
                })
                .on('click', '.package-cart-btn', function () {
                    const modal = $(RentMy.globalSelector).find('.rentmy-package-modal-overlay');
                    RentMy.products.modalTrigger(modal, $(this), 1)
                })
                .on('click', '.rentmy-addcart-btn', function () {
                    const _product = $(this).attr('data-product');
                    RentMy.products.addToCart(JSON.parse(_product))
                })
                .on('click', '.rentmy-product-modal-overlay', function () {
                    $(RentMy.globalSelector).find('.rentmy-product-modal-overlay').removeClass('is-open');
                })
                .on('click', '.rentmy-package-modal-overlay', function () {
                    $(RentMy.globalSelector).find('.rentmy-package-modal-overlay').removeClass('is-open');
                })
                .on('click', '.rentmy-modal', function (e) {
                    e.stopPropagation();
                })
                .on('click', '.rentmy-product-modal-overlay .rentmy-num-in span, .rentmy-package-modal-overlay .rentmy-num-in span', function () {
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
                        if (count < 0) {
                            RentMy.alert.errorAlert('Minimum quantity exhausted!')
                            return;
                        }
                        $input.val(count);
                    } else {
                        var count = parseFloat($input.val()) + 1
                        if (count > maxQty) {
                            RentMy.alert.errorAlert('Maximum available quantity has been exhausted!')
                            return;
                        }
                        $input.val(count);
                        if (count > 1) {
                            $(this).parents('.rentmy-num-block').find(('.rentmy-minus')).removeClass('rentmy-dis');
                        }
                    }

                    $input.change();

                    return false;
                })
                .on('change', '.rentmy-filter-checkbox-list input[type=checkbox]', function () {
                    let tags = [];
                    $(RentMy.globalSelector).find('.rentmy-filter-checkbox-list input[type=checkbox]').each(function () {
                        let value = $(this).val();
                        if ($(this).prop('checked')) {
                            tags.push(value);
                        }
                    });

                    RentMy.helpers.insertURLParam('tag', tags.toString());
                })
                .on('change', '.rentmy-sort-by select', function () {
                    RentMy.helpers.insertURLParam('sort', $(this).val())
                })

            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.page.products.init', {
                bubbles: true,
                detail: {
                    products : this,
                }
            }))
        },

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
                const rent = ["hourly", "daily", "weekly", "monthly", "rent"];
                if (prices.base.price > 0) {
                    obj.buy["type"] = true;
                    obj.buy["price"] = prices.base.price;
                    obj.buy["id"] = prices.base.id;
                    obj.buy["html"] = prices.base.html;
                }
                let ren = [];
                const rentPrices = data[0];

                if (rentPrices.fixed) {
                    obj.rent["price"].push({
                        type: "",
                        price: rentPrices.fixed.price,
                        id: rentPrices.fixed.id,
                        label: "",
                        html: rentPrices.fixed.html,
                        rent_start: rentPrices.fixed.rent_start,
                        rent_end: rentPrices.fixed.rent_end
                    });
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
                    let priceString = `${SITE_SPECIFIC.others.product_list_starting_at} <b>${RentMy.helpers.currencyFormat(prices.rent.price[0].price)}</b> ${SITE_SPECIFIC.others.product_list_per} ${prices.rent.price[0].label}`;
                    if (fixed != false)
                        priceString = `<b>${RentMy.helpers.currencyFormat(fixed)}</b>`;
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
                        priceString: `${SITE_SPECIFIC.others.product_list_buy_now_for} <b>${RentMy.helpers.currencyFormat(prices.buy.price)}</b>`,
                        availableForSale: this.data.available_for_sale,
                        price_type: priceType,
                        formated_prices: prices,
                    })
                }
            }
        },

        //when change package variant option
        changeVariant: async function (data) {
            const v = $(RentMy.globalSelector).find('.price-options input[name="rentmy-package"]:checked').val()

            if (v === 'rent' && (this.rent_start == '' || this.rent_start == null)) {
                return;
            }
            let params = {
                action_type: 'change_package_variants',
                product_id: data.attr('data-package_id'),
                pacakge_uid: data.attr('data-package_uid'),
                rent_type: v
            };
            let products = [];
            let variants = [];
            $(RentMy.globalSelector).find('.rentmy-package-single-list select').each(function (element) {
                let package_item = {
                    product_id: $(this).data('product'),
                    variant_id: $(this).val()
                }
                products.push(package_item);
                variants.push($(this).val());
            });
            params['products'] = products;
            params['variants'] = variants;

            const responseRaw = await RentMy.helpers.ajaxPost(params)
            try {
                let response = JSON.parse(responseRaw);

                //define a custom event
                window.dispatchEvent(new CustomEvent('rentMy.page.products.changePackageVariants', {
                    bubbles: true,
                    detail: {
                        products : this,
                        request: params,
                        response: response
                    }
                }))

                if (response.status === 'OK') {
                    this.setModalData({
                        available: response.result.data
                    });
                }
            } catch (e) {
            }
        },

        //when change product variant option
        changeProductVariant: async function (data) {
            index = data.attr('data-index');
            total = data.attr('data-total');
            if (index != total) {
                current_set_id = data.attr('data-id');
                next_set_id = data.attr('data-next-id');
                let params = {
                    action_type: 'get_variant_chain',
                    product_id: data.attr('data-product-id'),
                    variant_id: data.val(),
                    rent_type: 'rent'
                }
                const responseRaw = await RentMy.helpers.ajaxPost(params)
                try {
                    let response = JSON.parse(responseRaw);

                    //define a custom event
                    window.dispatchEvent(new CustomEvent('rentMy.page.products.changeProductVariants', {
                        bubbles: true,
                        detail: {
                            products : this,
                            request: params,
                            response: response
                        }
                    }))

                    this.bind_select_options(next_set_id, response);
                } catch (e) {
                }

            } else { // last item of the chain
                prev_set_id = data.attr('data-prev-id');
                let params = {
                    action_type: 'get_last_variant',
                    product_id: data.attr('data-product-id'),
                    variant_id: data.val(),
                    chain_id: $('#variantSet_' + prev_set_id).val(),
                    rent_type: 'rent',
                }
                const responseRaw = await RentMy.helpers.ajaxPost(params)
                try {
                    let response = JSON.parse(responseRaw);

                    //define a custom event
                    window.dispatchEvent(new CustomEvent('rentMy.page.products.changeProductVariants', {
                        bubbles: true,
                        detail: {
                            products : this,
                            request: params,
                            response: response
                        }
                    }))

                    this.setModalData({
                        priceString: `${response.prices[0].base.html}`,
                        availableForSale: response.available,
                    })
                } catch (e) {
                }
            }
        },

        bind_select_options: function (el_id, json) {
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

            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.page.products.setModalData', {
                bubbles: true,
                detail: {
                    products : this,
                    data: data,
                }
            }))

            if (data.images != undefined) {
                this.$modal.find('.rentmy-product-multipleimage').html(data.images.map(src => {
                    return `<div class="rentmy-product-thumb-item">
                                <img src="${src}" alt="rentmy" />
                            </div>`
                }))

                this.$modal.find('.rentmy-product-viewimage-active').attr('src', data.images[0])
                RentMy.helpers.initMultipleImagePopup()
            }

            if (data.name != undefined)
                this.$modal.find('.rentmy-product-title').html(data.name)
            if (data.description != undefined)
                this.$modal.find('.rentmy-modalproduct-description').html(data.description)
            if (data.priceString != undefined)
                this.$modal.find('.rentmy-product-price').html(data.priceString)
            if (data.rental_price != undefined)
                this.$modal.find('.rentmy-product-price').html(RentMy.helpers.currencyFormat(data.rental_price))
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
                    let buyValue = 'Buy';
                    priceTypeHTML += `<label class="rentmy-radio" for="rentmy-buy-${idPrefix}">
                                        <input type="radio" id="rentmy-buy-${idPrefix}" name="rentmy-package" value="buy" checked/> ` + buyValue + ` <span></span>
                                    </label>`
                }
                if (prices.rent.type) {
                    let rentValue = 'Rent';
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
                        pricing_list += `<li> <strong><i class="lni lni-arrow-right"></i> ${RentMy.helpers.currencyFormat(price.price)}</strong> for ${price.duration} ${price.label}</li>`;
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
            const $metaDate = $('meta[name=rentmy_rent_start]').attr('content');
            if ($metaDate === '') {
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
        requestProductDetails: async function () {
            let param = {
                action_type: 'product_details',
                isPackage: this.isPackage,
                uid: this.btnData.uid
            };
            const responseRaw = await RentMy.helpers.ajaxPost(param)
            try {
                let response = JSON.parse(responseRaw);

                //define a custom event
                window.dispatchEvent(new CustomEvent('rentMy.page.products.load', {
                    bubbles: true,
                    detail: {
                        products : this,
                        request : param,
                        response: response,
                    }
                }))

                if (response.status === 'OK') {
                    this.data = response.result.data
                    this.setModalData(response.result.data)
                }
                if (response.result != undefined && response.result.message != undefined) {
                    RentMy.alert.errorAlert(response.result.message)
                }
            } catch (e) {
            }
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
            RentMy.cartWidget.addToCart(data)
        }
    },
    categories: {
        isInit: false,
        init: function () {
            this.isInit = true;

            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.page.categories.init', {
                bubbles: true,
                detail: {
                    categories : this,
                }
            }))

        }
    },
    cart: {
        isInit: false,
        init: function () {
            this.isInit = true;

            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.page.cart.init', {
                bubbles: true,
                detail: {
                    cart : this,
                }
            }))

        }
    },
    checkout: {
        content: SITE_SPECIFIC,
        // config: STORE_CONFIG,
        billing_info: {
            country: 'US,',
            first_name: '',
            last_name: '',
            mobile: '',
            email: '',
            address_line1: '',
            address_line2: '',
            city: '',
            zipcode: '',
            state: ''
        },
        locations: [],
        shipping_info: {
            shipping_address1: '',
            shipping_address2: '',
            shipping_city: '',
            shipping_country: 'US',
            shipping_first_name: '',
            shipping_last_name: '',
            shipping_method: '',
            shipping_mobile: '',
            shipping_name: '',
            shipping_state: '',
            shipping_zipcode: ''
        },
        delivery_info: {
            shipping_address1: '',
            shipping_address2: '',
            shipping_city: '',
            shipping_country: 'US',
            shipping_first_name: '',
            shipping_last_name: '',
            shipping_method: '',
            shipping_mobile: '',
            shipping_name: '',
            shipping_state: '',
            shipping_zipcode: ''
        },
        countries: [],
        delivery_location: [],
        delivery_settings: [],
        zone_list: [],
        fulfillment_errors: [],
        billing_error: [],
        payment_errors: [],
        store_config: STORE_CONFIG,
        currency_symbol: '',
        base_file_url: 'https://s3.us-east-2.amazonaws.com/images.rentmy.co/products/',
        asset_url: BASE_URL,
        base_url: BASE_URL,
        additional_services: [],
        cartable_additional_services: [],
        store_id: STORE_ID,
        payment_getways: [],
        payment_config: {},
        amount_to_pay: '',
        booking_amount: '',
        cart_total: '',
        signature_pad: '',
        isInit: false,
        init: async function () {
            this.isInit = true;

            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.page.checkout.init', {
                bubbles: true,
                detail: {
                    checkout : this,
                }
            }))

            this.currency_symbol = this.store_config.currency_format.symbol;
            this.billing_info['country'] = 'US';
            this.payment_config = this.store_config.payments;
            await this.getLocationList();
            await this.getCountries();
            await this.getDeliverySettings();
            await this.getCartData();
            await this.getAdditionalServices();
            await this.getPaymentMethods();
            this.signaturePad();

            $(RentMy.globalSelector)
                // Getting Billing Data
                .on('keyup', '.rentmy-billing-address input', function (event) {
                    RentMy.checkout.billing_info[event.target.name] = event.target.value;
                })
                .on('change', '.rentmy-billing-address select', function (event) {
                    RentMy.checkout.billing_info[event.target.name] = event.target.value;
                })
                .on('click', '.rentmy-btn-shipping-method', function (event) {
                    $(RentMy.globalSelector).find('.renmty-checkout-shipping input,select').map(function () {
                        if ($(this).attr('name') != undefined)
                            RentMy.checkout.shipping_info[$(this).attr('name')] = $(this).val();
                    });
                    RentMy.checkout.getShippingMethods();
                })
                .on('click', '.rentmy-btn-delivery-cost', function (event) {
                    $(RentMy.globalSelector).find('.renmty-checkout-delivery input,select').map(function () {
                        if ($(this).attr('name') != undefined)
                            RentMy.checkout.delivery_info[$(this).attr('name')] = $(this).val();
                    });
                    RentMy.checkout.getDeliveryCost();
                })
                .on('click', '.rentmy-shipping-methods input[type="radio"]', function () {
                    RentMy.checkout.addShippingToCart($(this).val(), 7);
                })
                .on('click', '.rentmy-delivery-cost input[type="radio"]', function () {
                    RentMy.checkout.addShippingToCart($(this).val(), 2);
                })
                .on('click', '.rentmy-fulfillment input[name="rentmy-pickup-location"]', function () {
                    RentMy.checkout.addShippingToCart(0, 1);
                    RentMy.checkout.getCartData();
                })
                //Additional Services
                .on('click', '.rentmy-optional-service-content .rentmy-btn-amount', function () {
                    let option_val = $(this).val();
                    let service_id = $(this).data('servie_id');

                    $(RentMy.globalSelector).find('#rentmy-service-' + service_id + ' button').removeClass('rentmy-btn-active');
                    $(RentMy.globalSelector).find('#rentmy-service-checkbox-' + service_id).attr('checked', true);
                    $(this).addClass('rentmy-btn-active');
                    RentMy.checkout.update_additional_services(service_id, option_val);

                })
                .on('click', '.rentmy-optional-service-content .rentmy-input-amount-btn', function () {
                    let service_id = $(this).data('id');
                    $(RentMy.globalSelector).find('#rentmy_input_amount_area_' + service_id).css('display', 'block');
                })
                .on('click', '.rentmy-optional-service-content .rentmy-optional-cancel-btn', function () {
                    let service_id = $(this).data('service_id');
                    $(RentMy.globalSelector).find('#rentmy_input_amount_area_' + service_id).css('display', 'none');
                })
                .on('click', '.rentmy-optional-service-content .rentmy-optional-ok-btn', function () {
                    let service_id = $(this).data('service_id');
                    let inputed_value = $(RentMy.globalSelector).find('#rentmy_input_amount_area_' + service_id + ' input').val();
                    RentMy.checkout.update_additional_services(service_id, inputed_value);
                    $(RentMy.globalSelector).find('#rentmy_input_amount_area_' + service_id).css('display', 'none');
                })
                .on('change', '.rentmy-optional-service-content select', function () {
                    let service_id = $(this).data('service_id');
                    let selected_option = $(RentMy.globalSelector).find('#rentmy_additional_service_option_' + service_id).val();
                    RentMy.checkout.set_additional_services_option(service_id, selected_option);
                })
                .on('click', '.rentmy-optional-service input:checkbox', function () {
                    let service_id = $(this).val();
                    let is_checked = $(RentMy.globalSelector).find('#rentmy-service-checkbox-' + service_id).prop('checked');
                    if (!is_checked) {
                        RentMy.checkout.remove_additional_service_from_cart(service_id);
                    } else {
                        RentMy.checkout.update_additional_services(service_id);
                    }
                })
                //Additonal Service End rentmy-payment-method
                .on('click', '.rentmy-placeorder-btn', function () {
                    RentMy.checkout.placeOrder();
                })
                .on('click', '.rentmy-partial-payments', function () {
                    let type = $(this).val();
                    if (type == 'partial') {
                        RentMy.checkout.amount_to_pay = RentMy.checkout.booking_amount;
                    }
                    if (type == 'full') {
                        RentMy.checkout.amount_to_pay = RentMy.checkout.cart.total;
                    }
                    let gateway_id = $(this).data('gateway_id');
                    $(RentMy.globalSelector).find(`#rentmy-payment-content-${gateway_id} input[name=amount_to_pay]`).val(checkout.amount_to_pay);

                })
                .on('click', '#rentmy-termcondition', function () {
                    if (RentMy.checkout.store_config.signature.active && RentMy.checkout.store_config.signature.online) {
                        if (!$(this).prop('checked')) {
                            $(RentMy.globalSelector).find('.rentmy-signature-pad').css('display', 'none');
                        } else {
                            $(RentMy.globalSelector).find('.rentmy-signature-pad').css('display', 'block');
                        }
                    }
                })
                .on('click', '.rentmy-signature-pad .rentmy-clear-signature', function () {
                    RentMy.checkout.signature_pad.clear();
                });
        },
        signaturePad: function () {
            if (this.store_config.signature.active && this.store_config.signature.online) {
                var canvas = $(RentMy.globalSelector).find("#rentmy-signature");
                this.signature_pad = new SignaturePad(canvas, {
                    'penColor': 'black',
                    'backgroundColor': 'white',
                    backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
                });
            }
        },
        getDeliverySettings: async function () {
            let ref = this;
            const responseRaw = await RentMy.helpers.ajaxPost({
                action_type: 'get_delivery_settings',
            })

            try {
                let response = JSON.parse(responseRaw);
                ref.delivery_settings = response.delivery_settings;
                if (!ref.delivery_settings.instore_pickup) {
                    $(RentMy.globalSelector).find('.rentmy-fulfillment-pickup').css('display', 'none');
                }
                if (!ref.delivery_settings.delivery) {
                    $(RentMy.globalSelector).find('.rentmy-fulfillment-delivery').css('display', 'none');
                }
            } catch (e) {
            }
        },
        getCartData: async function () {
            let ref = this;
            const responseRaw = await RentMy.helpers.ajaxPost({
                action_type: 'view_cart_info',
            })
            try {
                let response = JSON.parse(responseRaw);
                if (response.status == 'OK') {
                    ref.bindOrderData(response.result.data);
                }
            } catch (e) {
            }
        },
        bindOrderData: function (data) {

            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.page.checkout.bindData', {
                bubbles: true,
                detail: {
                    checkout : this,
                    data: data
                }
            }))

            let order_product_list = '';
            let order_summary = '';
            this.cart = data;
            this.amount_to_pay = this.cart.total;
            this.booking_amount = this.cart.booking ?? 0;
            this.bindPaymentMethods();
            // $('.rentmy-partial-payments').find('input[name="amount_to_pay"]').val(this.amount_to_pay);
            data.cart_items.forEach(cart_item => {
                order_product_list += ` <div class="rentmy-order-list-box">
                                    <div class="rentmy-order-img">
                                        <img src="${this.imageLink(cart_item)}"/>
                                    </div>
                                    <div class="rentmy-order-product-details">
                                        <div class="rentmy-order-product-name">
                                            ${cart_item.product.name}&nbsp;
                                            <strong class="rentmy-order-product-quantity">×&nbsp;${cart_item.quantity}</strong>
                                        </div>
                                        <div class="rentmy-order-details-bottom">
                                            <p class="rentmy-order-quantity">Quantity: ${cart_item.quantity}</p>
                                            <p class="rentmy-order-product-price">Price: ${this.currency_symbol}${cart_item.sub_total}</p>
                                        </div>
                                    </div>
                                </div>`
            });

            order_summary += `<table>
                                    <tbody>`;
            if (data.additional_charge > 0) {
                order_summary += `<tr>
                                <th>Optional Services </th>
                                <td>${this.currency_symbol} ${this.priceFormat(data.additional_charge)}</td>
                              </tr>`;
            }
            order_summary += `<tr>
                                    <th>Subtotal</th>
                                    <td>${this.currency_symbol} ${this.priceFormat(data.sub_total)}</td>
                               </tr>
                               <tr>
                                   <th>Shipping Charge</th>
                                   <td>${this.currency_symbol} ${this.priceFormat(data.delivery_charge)}</td>
                               </tr>
                               <tr>
                                    <th>Discount</th>
                                    <td>${this.currency_symbol} ${this.priceFormat(data.total_discount)}</td>
                               </tr>
                               <tr>
                                    <th>Tax</th>
                                    <td>${this.currency_symbol} ${this.priceFormat(data.tax)}</td>
                               </tr>

                               <tr>
                                     <th><strong>Total</strong></th>
                                     <td><strong>${this.currency_symbol} ${this.priceFormat(data.total)}</strong></td>
                               </tr>
                             </tbody>
                          </table>`;

            $(RentMy.globalSelector).find('.rentmy-checkout-ordersummery .rentmy-ordersummery-list').html(order_product_list);
            $(RentMy.globalSelector).find('.rentmy-checkout-ordersummery .rentmy-checkout-order-table').html(order_summary);
        },
        getLocationList: async function () {
            let ref = this;
            const responseRaw = await RentMy.helpers.ajaxPost({
                action_type: 'location_list',
            })
            try {
                let response = JSON.parse(responseRaw);
                ref.locations = response.data;
                ref.bind_pickup_locations(ref.locations);
            } catch (e) {}
        },
        bind_pickup_locations: function (locaions) {
            let list = '';
            locaions.forEach(location => {
                list += `<div class="rentmy-radio-inline">
                           <label class="rentmy-radio" for="rentmy-pickup-location">
                                 <input type="radio" id="rentmy-pickup-location" name="rentmy-pickup-location" data-delivery='${JSON.stringify(location)}' value="${location.id}"/>
                                       ${location.name} (${location.location})
                                  <span></span>
                           </label>
                        </div>`;
            });
            $(RentMy.globalSelector).find('.rentmy-fulfillment .rentmy-pickup-location-list').html(list);
        },

        getCountries: async function () {
            let ref = this;
            const responseRaw = await RentMy.helpers.ajaxPost({
                action_type: 'countries',
            })
            try {
                let response = JSON.parse(responseRaw);
                ref.countries = response;
                ref.bind_countries_option(ref.countries);
            } catch (e) {}
        },
        bind_countries_option: function (countries) {
            let list = '';
            countries.forEach(country => {
                list += `<option value="${country.code}" ${country.code == 'US' ? 'selected' : ''}>${country.name}</option>`
            });
            $(RentMy.globalSelector).find('.rentmy-checkout-wrapper .rentmy-country').html(list);
        },
        getShippingMethods: async function () {
            let ref = this;
            this.fulfillment_errors = [];
            $(RentMy.globalSelector).find('.rentmy-fulfillment .rentmy-fulfillment-error').html('');

            let error_length = ref.shippingValidation();
            if (error_length > 0) {
                ref.bindFulfillmentError();
                return;
            }
            let data = {};
            let sp_first_name = this.shipping_info.shipping_name.trim().split(' ')[0];
            let sp_last_name = this.shipping_info.shipping_name.trim().split(' ').filter(function (item) {
                return item != sp_first_name
            });
            data = ref.shipping_info;
            data['action_type'] = 'get_shipping_method';
            data['shipping_first_name'] = sp_first_name;
            data['shipping_last_name'] = sp_last_name.join(" ");
            const responseRaw = await RentMy.helpers.ajaxPost(data)
            try {
                data = JSON.parse(responseRaw);
                if (data.status == 'OK') {
                    ref.bindShippingMethods(data.result);
                } else {
                    let html = `<ul class="rentmy-error"><li>${data.result.error}</li></ul>`;
                    $(RentMy.globalSelector).find('.rentmy-fulfillment .rentmy-shipping-methods').html(html);
                }
            } catch (e) {}
        },
        bindShippingMethods: function (data) {

            let method_list = '';
            if (Object.keys(data).length > 0) {
                method_list += `<p class="shipping-method-title"> Select shipping method </p>`;

                for (var key of Object.keys(data)) {
                    if (key == 'flat') {

                        method_list += ` <div class="rentmy-radio-inline">
                            <label class="rentmy-radio" htmlFor="rentmy-shipping-method">
                                <input type="radio" id="rentmy-shipping-method" data-type="7" name="rentmy-shipping-method" data-delivery='${JSON.stringify(data[key])}' value="${data[key].charge}"/>
                               ${data[key].carrier_code} <div class="rentmy-list-price">${this.currency_symbol} ${data[key].charge}</div>
                                <span></span>
                            </label>
                        </div>`;
                    }
                    if (key == 'standard') {
                        method_list += ` <div class="rentmy-radio-inline">
                            <label class="rentmy-radio" htmlFor="rentmy-shipping-method">
                                <input type="radio" id="rentmy-shipping-method" data-type="6" name="rentmy-shipping-method" data-delivery='${JSON.stringify(data[key])}' value="${data[key].charge}"/>
                                ${data[key].carrier_code} <div class="rentmy-list-price">$ ${data[key].charge}</div>
                                <span></span>
                            </label>
                        </div>`;
                    }
                }
            }
            $(RentMy.globalSelector).find('.rentmy-fulfillment .rentmy-shipping-methods').html(method_list);
        },
        bindFulfillmentError: function () {
            let list = `<ul class="rentmy-error">`;
            this.fulfillment_errors.forEach(error => {
                list += `<li>${error}</li>`;
            });
            list += `</ul>`;
            $(RentMy.globalSelector).find('.rentmy-fulfillment .rentmy-fulfillment-error').html(list);
        },
        getDeliveryCost: async function () {
            let ref = this;
            $(RentMy.globalSelector).find('.rentmy-fulfillment .rentmy-fulfillment-error').html('');
            this.fulfillment_errors = [];
            let error_length = ref.deliveryValidation();
            if (error_length > 0) {
                ref.bindFulfillmentError();
                return;
            }
            let data = {};
            let sp_first_name = this.delivery_info.shipping_name.trim().split(' ')[0];
            let sp_last_name = this.delivery_info.shipping_name.trim().split(' ').filter(function (item) {
                return item != sp_first_name
            });
            data = ref.delivery_info;
            data['action_type'] = 'get_delivery_cost';
            data['shipping_first_name'] = sp_first_name;
            data['shipping_last_name'] = sp_last_name.join(" ");

            const responseRaw = await RentMy.helpers.ajaxPost(data)
            try {
                data = JSON.parse(responseRaw);
                if (data.status == 'OK') {
                    if (ref.delivery_settings.charge_by_zone) {
                        let list = '';
                        data.result.location.forEach(zone => {
                            list += `<div class="rentmy-radio-inline">
                                        <label class="rentmy-radio">
                                            <input type='radio' value='${zone.charge}' data-delivery='${JSON.stringify(zone)}' name="delivery_by_zone"/>
                                            ${zone.name}
                                            <div class="rentmy-list-price">${this.currency_symbol}${zone.charge}</div>
                                            <span></span>
                                        </label>
                                     </div>`;
                        });
                        $(RentMy.globalSelector).find('.rentmy-fulfillment .rentmy-delivery-cost').html(list);
                    } else {
                        let cost = data.result.location[0].charge;
                        let html = `<p>Delivery Cost ${this.currency_symbol}${cost}</p>`;
                        html += `<input type="hidden" id="rentmy_delivery" value='${JSON.stringify(data.result.location[0])}'/>`

                        $(RentMy.globalSelector).find('.rentmy-fulfillment .rentmy-delivery-cost').html(html);
                        ref.addShippingToCart(cost, 3);
                    }

                } else {
                    let html = `<ul class="rentmy-error"><li>${data.result.error}</li></ul>`;
                    $(RentMy.globalSelector).find('.rentmy-fulfillment .rentmy-delivery-cost').html(html);
                }

            } catch (e) {}
        },
        addShippingToCart: async function (shipping_cost, shipping_method) {
            let ref = this;
            const responseRaw = await RentMy.helpers.ajaxPost({
                action_type: 'shipping_to_cart',
                shipping_cost: shipping_cost,
                shipping_method: shipping_method,
                tax: 0,
                tax_id: null
            })
            try {
               let data = JSON.parse(responseRaw);
                if (data.status == 'OK' && shipping_method != 1) {
                    ref.bindOrderData(data.result.data);
                }
            } catch (e) {}
        },
        billingInfoValidation: function () {
            this.billing_error = [];

            if (!this.billing_info.mobile) {
                this.billing_error.push("Mobile is required.");
            } else {
                if (isNaN(parseInt(this.billing_info.mobile))) {
                    this.billing_error.push("Mobile number is not valid.");
                }
            }
            if (!this.billing_info.email) {
                this.billing_error.push("Email is required.");
            } else {
                let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!regex.test(this.billing_info.email)) {
                    this.billing_error.push("Email address is not valid.");
                }
            }
            if (!this.billing_info.country) {
                this.billing_error.push("Country is required.");
            }
            if (!this.billing_info.address_line1) {
                this.billing_error.push("Address Line 1 is required.");
            }
            if (!this.billing_info.city) {
                this.billing_error.push("City is required.");
            }
            if (!this.billing_info.state) {
                this.billing_error.push("State is required.");
            }
            if (!this.billing_info.zipcode) {
                this.billing_error.push("Zipcode is required.");
            }

            return this.billing_error.length;
        },
        shippingValidation: function () {
            this.fulfillment_errors = [];
            if (!this.shipping_info.shipping_country) {
                this.fulfillment_errors.push('Country is required.');
            }
            if (!this.shipping_info.shipping_address1) {
                this.fulfillment_errors.push('Address Line 1 is required.');
            }
            if (!this.shipping_info.shipping_city) {
                this.fulfillment_errors.push('City is required.');
            }
            if (!this.shipping_info.shipping_state) {
                this.fulfillment_errors.push('State is required.');
            }
            if (!this.shipping_info.shipping_zipcode) {
                this.fulfillment_errors.push('Zipcode is required.');
            }
            return this.fulfillment_errors.length;
        },
        deliveryValidation: function () {
            this.fulfillment_errors = [];
            let is_error = false;
            if (!this.delivery_info.shipping_country) {
                this.fulfillment_errors.push('Country is required.');
            }
            if (!this.delivery_info.shipping_address1) {
                this.fulfillment_errors.push('Address Line 1 is required.');
            }
            if (!this.delivery_info.shipping_city) {
                this.fulfillment_errors.push('City is required.');
            }
            if (!this.delivery_info.shipping_state) {
                this.fulfillment_errors.push('State is required.');
            }
            if (!this.delivery_info.shipping_zipcode) {
                this.fulfillment_errors.push('Zipcode is required.');
            }
            return this.fulfillment_errors.length;
        },

        // Additional Services
        getAdditionalServices: async function () {
            let ref = this;
            const responseRaw = await RentMy.helpers.ajaxPost({
                action_type: 'get_additional_services',
                type: 'cart',
            })
            try {
                let response = JSON.parse(responseRaw);
                if (response.status == 'OK') {
                    ref.additional_services = response.result.data;
                    ref.cartable_additional_services = [];
                    ref.additional_services.forEach(service => {
                        ref.cartable_additional_services.push({
                            id: service.id,
                            is_selected: service.is_selected,
                            value: service.existing ? service.existing.config.user_entered : '',
                            order_additional_charge_id: service.existing ? service.existing.id : null,
                            selected_option: null
                        });
                    })
                    this.bindAdditionalServices();
                }


            } catch (e) {}
        },
        is_additional_service: function () {
            let ref = this;

            if (ref.additional_services.length === 0)
                return false;

            let i = 0;
            ref.additional_services.forEach(el => {
                if (el.status)
                    i++;
            });

            return i > 0;
        },
        bindAdditionalServices: function () {
            if (!this.is_additional_service()) {
                return;
            }
            let optionalServiceTitle = 'Consider this optional services';
            let html = `<div class="rentmy-row">
                                    <div class="rentmy-additional-charge-title">` + optionalServiceTitle + `</div>
                                    <div class="rentmy-column-12">`;
            this.additional_services.forEach(service => {
                html += `<div class="rentmy-row" id="rentmy-service-${service.id}">
                                            <div class="rentmy-checkbox-inline" >
                                                <label class="rentmy-checkbox" for="rentmy-service-checkbox-${service.id}">
                                                    <input type="checkbox" value="${service.id}" id="rentmy-service-checkbox-${service.id}" ${service.is_required || service.existing ? 'checked' : ''} ${service.is_required ? 'disabled' : ''}/> ${service.description} <span>&nbsp;&nbsp;</span>
                                                </label>
                                            </div>
                                            <div class="rentmy-optional-service-content" id="rentmy_optional_service_content_${service.id}">
                                                <div class="rentmy-btn-toolbar">
                                                    <div class="rentmy-btn-group">`;
                if (!service.is_required) {
                    service.fee.amounts.forEach(amount => {
                        active_class = '';
                        active_input = '';
                        if (service.existing && service.existing.config.user_entered == amount) {
                            active_class = 'rentmy-btn-active';
                        }
                        html += `<button type="button" class="rentmy-btn rentmy-btn-amount ${active_class}" data-servie_id="${service.id}" value="${amount}">${service.fee.type != 'percentage' ? this.currency_symbol : ''}${amount}${service.fee.type == 'percentage' ? '%' : ''}</button>`;

                    });
                } else {
                    html += `
                        <label style="margin-top:7px ">${service.fee.type != 'percentage' ? this.currency_symbol : ''}${service.fee.amounts[0]}${service.fee.type == 'percentage' ? '%' : ''}</label>`;
                }
                let custom_inputed_value = '';
                if (service.input_custom == 1 && !service.is_required) {
                    let is_exist = false;
                    if (service.existing) {
                        service.fee.amounts.forEach(amount => {
                            if (service.existing.config.user_entered == amount) {
                                is_exist = true;
                            }
                        });
                    }
                    if (service.existing && !is_exist) {
                        custom_inputed_value = service.existing.config.user_entered;
                    }

                    html += `<button type="button" class="rentmy-btn rentmy-input-amount-btn ${service.existing && !is_exist ? 'rentmy-btn-active' : ''}" data-id="${service.id}">Input Amount</button>`;
                }
                html += `</div>`;
                if (service.options != null) {
                    html += `<select data-service_id="${service.id}" id="rentmy_additional_service_option_${service.id}">`;
                    html += `<option>--select--</option>`;
                    service.options.split(';').forEach(option => {
                        html += `<option ${(service.existing && (service.existing.config.selected_option == option)) ? 'selected' : ''}>${option}</option>`;
                    });
                    html += `</select>`;

                }
                html += `</div>
                            <div class="rentmy-input-ammount-area" id="rentmy_input_amount_area_${service.id}">
                                  <div class="rentmy-input-group">
                                       <input type="text" value="${custom_inputed_value}"/>
                                       <div class="rentmy-input-group-append">
                                            <button type="button" class="rentmy-btn rentmy-optional-ok-btn" data-service_id="${service.id}"><i class="lni lni-checkmark"></i></button>
                                            <button type="button" class="rentmy-btn rentmy-optional-cancel-btn" data-service_id="${service.id}"><i class="lni lni-close"></i></button>
                                       </div>
                                  </div>
                                </div>
                             </div>
                          </div>`;
            });

            html += `</div></div></div>`;
            $(RentMy.globalSelector).find('.rentmy-checkout-ordersummery .rentmy-optional-service').html(html);
        },
        update_additional_services: function (service_id, charge_amount = '') {
            let ref = this;
            this.cartable_additional_services.map(function (service) {
                if (service.id == service_id) {
                    let service_data = ref.additional_services.filter(additional_service => {
                        return additional_service.id == service_id;
                    });
                    service.value = charge_amount != '' ? charge_amount : service_data[0].fee.amounts[0];
                    service.is_selected = true;
                }
            });
            this.addAdditionalChargeToCart();
        },

        set_additional_services_option: function (service_id, option_value) {
            this.cartable_additional_services.map(function (service) {
                if (service.id == service_id) {
                    service.selected_option = option_value;
                }
            });
            this.addAdditionalChargeToCart();
        },
        remove_additional_service_from_cart: function (service_id) {
            this.cartable_additional_services.map(function (service) {
                if (service.id == service_id) {
                    return service.is_selected = false;
                }
            });
            this.addAdditionalChargeToCart();
        },

        addAdditionalChargeToCart: async function () {
            let ref = this;
            const responseRaw = await RentMy.helpers.ajaxPost({
                action_type: 'add_additional_service_to_cart',
                additional_charges: JSON.stringify(ref.cartable_additional_services),
            })
            try {
                let data = JSON.parse(responseRaw);
                await ref.getAdditionalServices();
                await ref.getCartData();

            } catch (e) {}
        },
        // Payment getways
        getPaymentMethods: async function () {
            let ref = this;
            const responseRaw = await RentMy.helpers.ajaxPost({
                action_type: 'get_payment_methods',
            })
            try {
                let data = JSON.parse(responseRaw);
                ref.payment_getways = data.data;
                ref.bindPaymentMethods();
            } catch (e) {}
        },

        isPartialRequired: function (gateway) {
            if ((gateway.type !== 'online') && !gateway.config) return false;
            if ((gateway.type !== 'online') && !gateway.config.is_paid) return false;
            if (!this.payment_config || !this.cart.booking) return false;
            let pc = this.payment_config;
            return (pc.type == "percent" && pc.booking < 100 && pc.booking > 0) || (pc.type == "fixed" && pc.booking < this.cart.total && pc.booking > 0);
        },
        bindPaymentMethods: function () {
            let ref = this;
            let html = '';
            let down_payment_text = `A ${ref.payment_config.type != 'percent' ? ref.currency_symbol : ''}${ref.payment_config.booking}${ref.payment_config.type == 'percent' ? '%' : ''} down payment is required to secure your reservation. Please choose an option and pay to proceed.`;
            ref.payment_getways.forEach(getway => {
                let is_partial_payment = ref.isPartialRequired(getway);
                if (getway.status == 1) {
                    if (getway.online_type == 'card') {
                        html += `<div class="rentmy-collaps-item rentmy-payment-collaps-item">
                                        <div class="rentmy-collaps-btn rentmy-payment-collaps-btn">
                                            <div class="rentmy-radio-inline">
                                                <label class="rentmy-radio" for="rentmy-payment-${getway.id}">
                                                    <input type="radio"  id="rentmy-payment-${getway.id}" name="rentmy-payment-method" value="card" data-id="${getway.id}" data-name="${getway.name}" data-type="1" data-gateway_type="${getway.type}"/> Credit Card <span></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="rentmy-collaps-content rentmy-payment-collaps-content" id="rentmy-payment-content-${getway.id}">`;
                        if (is_partial_payment) {
                            html += `<div class="rentmy-down-payment">
                                            <p>${down_payment_text}</p>
                                            <div class="rentmy-radio-inline">
                                                 <label class="rentmy-radio" for="rentmy-pay-full-amount-${getway.id}">
                                                    <input type="radio" class="rentmy-partial-payments" id="rentmy-pay-full-amount-${getway.id}" name="rentmy-partial-payment-${getway.id}" data-gateway_id="${getway.id}" value="full" checked/> Pay full amount due <span></span>
                                                </label>
                                                 <label class="rentmy-radio" for="rentmy-pay-partial-amount-${getway.id}">
                                                    <input type="radio" class="rentmy-partial-payments" id="rentmy-pay-partial-amount-${getway.id}" name="rentmy-partial-payment-${getway.id}" data-gateway_id="${getway.id}" value="partial" /> Pay ${ref.currency_symbol}${ref.cart.booking} now <span></span>
                                                </label>
                                                
                                            </div>
                                            <div class="rentmy-column-12">
                                                        <div class="rentmy-form-group">
                                                            <label> Amount to pay* </label>
                                                            <input type="text" name="amount_to_pay" value="${ref.amount_to_pay}"/>
                                                        </div>
                                                    </div>
                                            
                                         </div>`;
                        }
                        html += `<div class="rentmy-payment-form">
                                                <div class="rentmy-row">
                                                    <div class="rentmy-column-12">
                                                        <div class="rentmy-form-group">
                                                            <label> Name on Card* </label>
                                                            <input placeholder="Name on Card " type="text" name="card_name"/>
                                                        </div>
                                                    </div>
                                                    <div class="rentmy-column-12">
                                                        <div class="rentmy-form-group">
                                                            <label> Card Number* </label>
                                                            <input placeholder="Card Number " type="text" name="card_number"/>
                                                        </div>
                                                    </div>
                                                    <div class="rentmy-column-6">
                                                        <div class="rentmy-form-group">
                                                            <select name="card_exp_month">
                                                                <option value="">-Select Month-</option>
                                                                <option value="01">01 January</option>
                                                                <option value="02">02 February</option>
                                                                <option value="03">03 March</option>
                                                                <option value="04">04 April</option>
                                                                <option value="05">05 May</option>
                                                                <option value="06">06 June</option>
                                                                <option value="07">07 July</option>
                                                                <option value="08">08 August </option>
                                                                <option value="09">09 September </option>
                                                                <option value="10">10 October </option>
                                                                <option value="11">11 November</option>
                                                                <option value="12">12 December</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="rentmy-column-6">
                                                        <div class="rentmy-form-group">
                                                            <select name="card_exp_year">
                                                                <option value="">-Select Year-</option>
                                                                <option value="20">2020</option>
                                                                <option value="21">2021</option>
                                                                <option value="22">2022</option>
                                                                <option value="23">2023</option>
                                                                <option value="24">2024</option>
                                                                <option value="25">2025</option>
                                                                <option value="26">2026</option>
                                                                <option value="27">2027</option>
                                                                <option value="28">2028</option>
                                                                <option value="29">2029</option>
                                                                <option value="30">2030</option>
                                                                <option value="31">2031</option>
                                                                <option value="32">2032</option>
                                                                <option value="33">2033</option>
                                                                <option value="34">2034</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="rentmy-column-12">
                                                        <div class="rentmy-form-group">
                                                            <label>CVV Number*</label>
                                                            <input placeholder="CVV Number " type="text" name="card_cvv2"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                    } else {
                        html += `<div class="rentmy-collaps-item rentmy-payment-collaps-item">
                                        <div class="rentmy-collaps-btn rentmy-payment-collaps-btn">
                                            <div class="rentmy-radio-inline">
                                                <label class="rentmy-radio" for="rentmy-payment-${getway.id}">
                                                    <input type="radio" id="rentmy-payment-${getway.id}" name="rentmy-payment-method" data-type="2" data-note="${getway.config.add_note ?? false}" data-is_paid="${getway.config.is_paid ?? false}" data-id="${getway.id}" data-name="${getway.name}" data-gateway_type="${getway.type}"/>${getway.name} <span></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="rentmy-collaps-content rentmy-payment-collaps-content" id="rentmy-payment-content-${getway.id}">
                                            <div class="renmty-checkout-shipping">
                                                `;
                        if (is_partial_payment) {
                            html += `<div class="rentmy-down-payment">
                                            <p>${down_payment_text}</p>
                                            <div class="rentmy-radio-inline">
                                                 <label class="rentmy-radio" for="rentmy-pay-full-amount-${getway.id}">
                                                    <input type="radio" class="rentmy-partial-payments" id="rentmy-pay-full-amount-${getway.id}" name="rentmy-partial-payment-${getway.id}" data-gateway_id="${getway.id}" value="full" checked/> Pay full amount due <span></span>
                                                </label>
                                                 <label class="rentmy-radio" for="rentmy-pay-partial-amount-${getway.id}">
                                                    <input type="radio" class="rentmy-partial-payments" id="rentmy-pay-partial-amount-${getway.id}" name="rentmy-partial-payment-${getway.id}" data-gateway_id="${getway.id}" value="partial" /> Pay ${ref.currency_symbol}${ref.cart.booking} now <span></span>
                                                </label>
                                                
                                            </div>
                                            <div class="rentmy-column-12">
                                                        <div class="rentmy-form-group">
                                                            <label> Amount to pay* </label>
                                                            <input type="text" name="amount_to_pay" value="${ref.amount_to_pay}"/>
                                                        </div>
                                                    </div>
                                            
                                         </div>`;
                        } else if (getway.config.is_paid) {
                            html += `<div className="rentmy-column-12">
                                <div className="rentmy-form-group">
                                    <label> Amount to pay* </label>
                                    <input type="text" name="amount_to_pay" value="${ref.amount_to_pay}"/>
                                </div>
                            </div>`;
                        }
                        if (getway.config.add_note) {
                            html += `<div class="rentmy-column-12">
                                 <div class="rentmy-form-group">
                                  <label>Note</label>
                                   <input type="text" name="note"/>
                                   
                                  </div>`
                        }
                        html += `</div>
                                    </div>
                                        </div>
                                    </div>`;
                    }
                }
            });

            $(RentMy.globalSelector).find('.rentmy-checkout-payment .rentmy-collaps').html(html);
        },

        //    Place Order
        placeOrder: async function () {
            let errors = [];
            let ref = this;
            let is_billing_error = this.billingInfoValidation();
            if (is_billing_error) {
                errors.push('Please fill billing details properly.');
            }
            this.bindBillingErrors();
            let is_payment_error = this.paymentValidation();
            if (is_payment_error) {
                errors.push('Please fill payment details properly.');
            }
            this.bindPaymentError();
            let is_fulfillment_error = this.fulfillmentValidation();
            if (is_fulfillment_error) {
                errors.push('Please fill fullfillment details properly.');
            }
            this.bindFulfillmentError();
            let is_term_condition = $(RentMy.globalSelector).find('.rentmy-ordersummery-checkbox #rentmy-termcondition').prop('checked');
            if (!is_term_condition) {
                errors.push('You must accept terms & conditions.');
            }
            this.bindBasicErrors(errors);
            if (is_billing_error <= 0 && is_payment_error <= 0 && is_fulfillment_error <= 0 && is_term_condition) {
                let payload = {};
                // let preload = {...this.billing_info, ...this.shipping_info, ...this.delivery_info};
                let sel_fulfillment = $(RentMy.globalSelector).find('.rentmy-fulfillment input[name="rentmy_fulfillment"]:checked');
                payload['delivery'] = {};

                if (sel_fulfillment.val() === 'delivery') {
                    payload = {...this.billing_info, ...this.delivery_info};
                    payload['shipping_method'] = 2;
                    if (this.delivery_settings.charge_by_zone) {
                        payload['delivery'] = $(RentMy.globalSelector).find('.rentmy-delivery-cost input[type=radio]:checked').data('delivery');
                    } else {
                        payload['delivery'] = $(RentMy.globalSelector).find('#rentmy_delivery').val();
                    }

                }
                if (sel_fulfillment.val() === 'shipping') {
                    payload['delivery'] = $(RentMy.globalSelector).find('.rentmy-shipping-methods input[type=radio]:checked').data('delivery');
                    payload = {...this.billing_info, ...this.shipping_info};
                    payload['shipping_method'] = 1;
                }
                if (sel_fulfillment.val() === 'pickup') {
                    payload = {...this.billing_info, ...this.shipping_info};
                    let location_id = $(RentMy.globalSelector).find('.rentmy-pickup-location-list input[type=radio]:checked').val();
                    payload['delivery'] = $(RentMy.globalSelector).find('.rentmy-pickup-location-list input[type=radio]:checked').data('delivery');
                    payload['rm_instore_loc'] = location_id;

                }
                let sel_payment = $(RentMy.globalSelector).find('.rentmy-checkout-payment input[name="rentmy-payment-method"]:checked');

                payload['gateway_id'] = sel_payment.data('id');
                payload['payment_gateway_type'] = sel_payment.data('gateway_type');
                payload['payment_gateway_id'] = sel_payment.data('id');
                payload['payment_gateway_name'] = sel_payment.data('name');
                let payment_content = $('#rentmy-payment-content-' + payload['gateway_id']);
                if (sel_payment.data('gateway_type') === 'offline') {
                    if (sel_payment.data('is_paid') == 1) {
                        payload['amount'] = payment_content.find('input[name=amount_to_pay]').val();
                    }
                    payload['note'] = payment_content.find('input[name=note]').val();
                } else {
                    payload['amount'] = payment_content.find('input[name=amount_to_pay]').val();
                    payload['card_name'] = payment_content.find('input[name=card_name]').val();
                    payload['card_no'] = payment_content.find('input[name=card_number]').val();
                    payload['exp_month'] = payment_content.find('select[name=card_exp_month]').val();
                    payload['exp_year'] = payment_content.find('select[name=card_exp_year]').val();
                    payload['cvv'] = payment_content.find('input[name=card_cvv2]').val();
                }
                payload['action_type'] = 'createOrder';
                payload['type'] = 2;
                payload['signature'] = this.signature_pad != '' ? this.signature_pad.toDataURL('image/jpeg', 0.5) : '';

                const responseRaw = await RentMy.helpers.ajaxPost(payload)
                try {
                    let data = JSON.parse(responseRaw);
                    window.location = ref.base_url + '/page/order-complete';
                } catch (e) {}
            }
        },
        bindBasicErrors: function (errors) {
            let list = `<ul class="rentmy-error">`;
            errors.forEach(error => {
                list += `<li>${error}</li>`;
            });
            list += `</ul>`;
            $(RentMy.globalSelector).find('.rentmy-ordersummery-checkbox .rentmy-all-error').html(list);
        },
        fulfillmentValidation: function () {
            this.fulfillment_errors = [];
            let element = $(RentMy.globalSelector).find('.rentmy-fulfillment');
            let selected_method = element.find('input[type=radio]:checked');
            let is_fulfillment_selected = selected_method.length;
            if (is_fulfillment_selected <= 0) {
                this.fulfillment_errors.push("Please Select a fulfillment method");
            } else {
                if (selected_method.val() == 'pickup') {
                    if ($(RentMy.globalSelector).find('.rentmy-pickup-location-list input[type=radio]:checked').length <= 0) {
                        this.fulfillment_errors.push("Please Select a pickup location");
                    }

                }
                if (selected_method.val() == 'shipping') {
                    $(RentMy.globalSelector).find('.renmty-checkout-shipping input,select').map(function () {
                        if ($(this).attr('name') != undefined)
                            RentMy.checkout.shipping_info[$(this).attr('name')] = $(this).val();
                    });
                    let shipping_error_length = this.shippingValidation();
                    if ((shipping_error_length <= 0) && ($(RentMy.globalSelector).find('.rentmy-shipping-methods input[type=radio]:checked').length <= 0)) {
                        this.fulfillment_errors.push("Please select a shipping method");
                    }

                }
                if (selected_method.val() == 'delivery') {
                    $(RentMy.globalSelector).find('.renmty-checkout-delivery input,select').map(function () {
                        if ($(this).attr('name') != undefined)
                            RentMy.checkout.delivery_info[$(this).attr('name')] = $(this).val();
                    });
                    let shipping_error_length = this.deliveryValidation();
                    if (this.delivery_settings.charge_by_zone) {
                        if ((shipping_error_length <= 0) && ($(RentMy.globalSelector).find('.rentmy-delivery-cost input[type=radio]:checked').length <= 0)) {
                            this.fulfillment_errors.push("Please select delevery cost");
                        }
                    } else {
                        if ($(RentMy.globalSelector).find('#rentmy_delivery').length == 0) {
                            this.fulfillment_errors.push("Please Click on get delivery cost");
                        }
                    }
                }
            }

            return this.fulfillment_errors.length;
        },

        paymentValidation: function () {
            this.payment_errors = [];
            let element = $(RentMy.globalSelector).find('.rentmy-checkout-payment');
            let selected_method = element.find('input[name="rentmy-payment-method"]:checked');

            let is_payment_selected = selected_method.length;
            let gateway_id = selected_method.data('id');
            let selected_content = $(RentMy.globalSelector).find(`#rentmy-payment-content-${gateway_id}`);
            if (is_payment_selected <= 0) {
                this.payment_errors.push("Please Select a payment method");
            } else {
                let type = selected_method.data('type');
                if (type == 1) {
                    let amount_to_pay = selected_content.find('input[name="amount_to_pay"]').val();
                    let card_name = element.find('input[name="card_name"]').val();
                    let card_number = element.find('input[name="card_number"]').val();
                    let card_exp_month = element.find('select[name="card_exp_month"]').val();
                    let card_exp_year = element.find('select[name="card_exp_year"]').val();
                    let card_cvv2 = element.find('input[name="card_cvv2"]').val();
                    if (card_name == '') {
                        this.payment_errors.push("Name on your card is required");
                    }
                    if (card_number == '') {
                        this.payment_errors.push("Card Number is required");
                    }
                    if (card_exp_month == '' || card_exp_year == '') {
                        this.payment_errors.push("Card expiry month and year is required");
                    }
                    if (card_cvv2 == '') {
                        this.payment_errors.push("CVV number is required");
                    }
                    if (amount_to_pay == '') {
                        this.payment_errors.push("Amount to pay is required");
                    }
                }

                if (type == 2) {
                    is_paid = selected_method.data('is_paid');
                    if (is_paid) {
                        let amount_to_pay = selected_content.find('input[name="amount_to_pay"]').val();
                        if (amount_to_pay === '') {
                            this.payment_errors.push("Please enter some amount to pay");
                        }
                    }
                }

            }
            return this.payment_errors.length;
        },
        bindBillingErrors: function () {
            let list = `<ul class="rentmy-error">`;
            this.billing_error.forEach(error => {
                list += `<li>${error}</li>`;
            });
            list += `</ul>`;
            $(RentMy.globalSelector).find('.rentmy-billing-address .rentmy-billing-info-error').html(list);
        },
        bindPaymentError: function () {
            let list = `<ul class="rentmy-error">`;
            this.payment_errors.forEach(error => {
                list += `<li>${error}</li>`;
            });
            list += `</ul>`;
            $(RentMy.globalSelector).find('.rentmy-checkout-payment .rentmy-payment-error').html(list);
        },
        // Helper Functions
        priceFormat: function (priceVal) {
            return parseFloat(priceVal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        },
        imageLink: function (cart_item) {
            try {
                var imageLink = this.base_file_url + this.store_id + '/' + cart_item.product_id + '/' + cart_item.product.images[0].image_small;
            } catch (e) {
                var imageLink = this.asset_url + '/assets/img/default.jpg';
            }
            return imageLink;
        },
    },
    contact: {
        isInit: false,
        sendEmailFromContact: async function (data) {
            const responseRaw = await RentMy.helpers.ajaxPost(data)
            try {
                let response = JSON.parse(responseRaw);
                if (response.status === 'OK') {
                    $message = 'Thank you for contacting us.  We will be in touch shortly.';
                    RentMy.alert.successAlert($message);
                } else {
                    $message = 'The message may not have sent.  Please call us.';
                    RentMy.alert.errorAlert($message);
                }
            } catch (e) {
            }
        },
        isContactFromValid: function (data) {
            if (data.first_name.length === 0) {
                RentMy.alert.errorAlert('First name is empty');
                return false;
            }
            if (data.last_name.length === 0) {
                RentMy.alert.errorAlert('Last name is empty');
                return false;
            }
            if (data.phone.length === 0) {
                RentMy.alert.errorAlert('Phone is empty');
                return false;
            }
            if (data.phone.length) {
                let pattern = /^[- +()]*[0-9][- +()0-9]*$/;
                if (!pattern.test($('#phone').val())) {
                    RentMy.alert.errorAlert('Phone format is not valid');
                    return false;
                }
            }
            if (data.email.length === 0) {
                RentMy.alert.errorAlert('Email is empty');
                return false;
            }
            if (data.email.length) {
                let pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
                if (!pattern.test($('#email').val())) {
                    RentMy.alert.errorAlert('Email format is not valid');
                    return false;
                }
            }
            if (data.message.length === 0) {
                RentMy.alert.errorAlert('Message is empty');
                return false;
            }

            return true;
        },

        init: function () {
            this.isInit = true;

            //define a custom event
            window.dispatchEvent(new CustomEvent('rentMy.page.contact.init', {
                bubbles: true,
                detail: {
                    contact : this,
                }
            }))

            $(RentMy.globalSelector)
                .on('click', '#email-submit', function (e) {
                    const data = {
                        first_name: $('#first_name').val().trim(),
                        last_name: $('#last_name').val().trim(),
                        email: $('#email').val().trim(),
                        phone: $('#phone').val().trim(),
                        tempPhone: $('#phone').val().trim(),
                        message: $('#message').val().trim(),
                        action_type: 'send_contact_email',
                    };

                    if (RentMy.contact.isContactFromValid(data)) {
                        RentMy.contact.sendEmailFromContact(data)
                    }
                })
        }
    },
}

window.addEventListener('rentMy.cart.quantityUpdate', function (e){
    console.log(e)
})

RentMy.init(PAGE || 'home')
