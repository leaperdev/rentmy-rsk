const checkout = {
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
    delivery_location:[],
    delivery_settings:[],
    zone_list:[],
    fulfillment_errors:[],
    billing_error:[],
    payment_errors:[],
    store_config:STORE_CONFIG,
    currency_symbol: '',
    base_file_url:'https://s3.us-east-2.amazonaws.com/images.rentmy.co/products/',
    asset_url:BASE_URL,
    base_url:BASE_URL,
    additional_services:[],
    cartable_additional_services:[],
    store_id: STORE_ID,
    payment_getways:[],
    payment_config:{},
    amount_to_pay: '',
    booking_amount: '',
    cart_total:'',
    signature_pad:'',
    init: function (){
        this.currency_symbol = this.store_config.currency_format.symbol;
        this.billing_info['country'] = 'US';
        this.payment_config = this.store_config.payments;
        this.getLocationList();
        this.getCountries();
        this.getDeliverySettings();
        this.getCartData();
        this.getAdditionalServices();
        this.getPaymentMethods();
        this.signaturePad();


    },
    signaturePad: function (){
        if(this.store_config.signature.active && this.store_config.signature.online) {
            var canvas = document.getElementById("rentmy-signature");
            this.signature_pad = new SignaturePad(canvas, {
                'penColor': 'black',
                'backgroundColor': 'white',
                backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
            });
        }
    },
    getDeliverySettings: function() {
        let ref = this;
        let data = {
            action_type: 'get_delivery_settings',
        };
        $.post('', data)
            .done((response) => {
                try {

                    response = JSON.parse(response);
                    ref.delivery_settings = response.delivery_settings;
                    if(!ref.delivery_settings.instore_pickup){
                        $('.rentmy-fulfillment-pickup').css('display', 'none');
                    }
                    if(!ref.delivery_settings.delivery){
                        $('.rentmy-fulfillment-delivery').css('display', 'none');
                    }
                } catch (e) {
                    console.log(e)
                }

            });
    },

    getCartData: function() {
        let ref = this;
        let data = {
            action_type: 'view_cart_info',
        };
        $.post('', data)
            .done((response) => {
                try {

                    response = JSON.parse(response);
                    if (response.status == 'OK') {
                        ref.bindOrderData(response.result.data);
                        console.log(ref.cart)

                    }

                } catch (e) {
                    console.log(e)
                }

            });
    },
    bindOrderData: function(data) {
        let order_product_list = '';
        let order_summary = '';
        this.cart = data;
        this.amount_to_pay = this.cart.total;
        this.booking_amount = this.cart.booking??0;
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
                                            <p class="rentmy-order-quantity">${this.content.product_details.quantity || 'Quantity'}: ${cart_item.quantity}</p>
                                            <p class="rentmy-order-product-price">${this.content.cart.th_price || 'Price'}: ${this.currency_symbol}${cart_item.sub_total}</p>
                                        </div>
                                    </div>
                                </div>`
        });

        order_summary += `<table>
                                    <tbody>`;
        if (data.additional_charge > 0) {
            order_summary += `<tr>
                                <th>${this.content.cart.lbl_additional_charge || 'Optional Services'} </th>
                                <td>${this.currency_symbol} ${this.priceFormat(data.additional_charge)}</td>
                              </tr>`;
        }
        order_summary += `<tr>
                                    <th>${this.content.cart.th_subtotal || 'Subtotal'}</th>
                                    <td>${this.currency_symbol} ${this.priceFormat(data.sub_total)}</td>
                               </tr>
                               <tr>
                                   <th>${this.content.cart.lbl_shipping || 'Shipping Charge'}</th>
                                   <td>${this.currency_symbol} ${this.priceFormat(data.delivery_charge)}</td>
                               </tr>
                               <tr>
                                    <th>${this.content.cart.lbl_discount || 'Discount'}</th>
                                    <td>${this.currency_symbol} ${this.priceFormat(data.total_discount)}</td>
                               </tr>
                               <tr>
                                    <th>${this.content.cart.lbl_tax || 'Tax'}</th>
                                    <td>${this.currency_symbol} ${this.priceFormat(data.tax)}</td>
                               </tr>

                               <tr>
                                     <th><strong>${this.content.cart.lbl_total || 'Total'}</strong></th>
                                     <td><strong>${this.currency_symbol} ${this.priceFormat(data.total)}</strong></td>
                               </tr>
                             </tbody>
                          </table>`;

        $('.rentmy-checkout-ordersummery').find('.rentmy-ordersummery-list').html(order_product_list);
        $('.rentmy-checkout-ordersummery').find('.rentmy-checkout-order-table').html(order_summary);



    },
    getLocationList: function() {
        let ref = this;
        let data = {
            action_type: 'location_list',
        };
        $.post('', data)
            .done((response) => {
                try {
                    response = JSON.parse(response);
                    ref.locations = response.data;
                    ref.bind_pickup_locations(ref.locations);
                } catch (e) {
                    console.log(e)
                }

            })
    },

    bind_pickup_locations: function(locaions) {
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
        $('.rentmy-fulfillment').find('.rentmy-pickup-location-list').html(list);
    },

    getCountries: function() {
        let ref = this;
        data = {
            action_type: 'countries',
        };
        $.post('', data)
            .done((response) => {
                try {
                    response = JSON.parse(response);
                    ref.countries = response;
                    ref.bind_countries_option(ref.countries);
                } catch (e) {
                    console.log(e)
                }

            })
    },
    bind_countries_option: function(countries) {
        let list = '';
        countries.forEach(country => {
            list += `<option value="${country.code}" ${country.code=='US'?'selected':''}>${country.name}</option>`
        });
        $('.rentmy-checkout-wrapper').find('.rentmy-country').html(list);
    },
    getShippingMethods: function() {
        let ref = this;
        this.fulfillment_errors = [];
        $('.rentmy-fulfillment').find('.rentmy-fulfillment-error').html('');

        let error_length = ref.shippingValidation();
        if (error_length> 0) {
            ref.bindFulfillmentError();
            return;
        }
        let data = {};
        let sp_first_name = this.shipping_info.shipping_name.trim().split(' ')[0];
        let sp_last_name = this.shipping_info.shipping_name.trim().split(' ').filter(function(item) {
            return item != sp_first_name
        });
        data = ref.shipping_info;
        data['action_type'] = 'get_shipping_method';
        data['shipping_first_name'] = sp_first_name;
        data['shipping_last_name'] = sp_last_name.join(" ");
        $.post('', data)
            .done((response) => {
                try {
                    data = JSON.parse(response);
                    if(data.status == 'OK'){
                        ref.bindShippingMethods(data.result);
                    }else{
                        let html = `<ul class="rentmy-error"><li>${data.result.error}</li></ul>`;
                        $('.rentmy-fulfillment').find('.rentmy-shipping-methods').html(html);
                    }
                } catch (e) {
                    console.log(e)
                }

            })
    },
    bindShippingMethods: function(data) {

        let method_list = '';
        if(Object.keys(data).length > 0) {
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
        $('.rentmy-fulfillment').find('.rentmy-shipping-methods').html(method_list);


    },
    // bindShippingError: function() {
    //     let list = `<ul class="rentmy-error">`;
    //     this.fulfillment_errors.forEach(error => {
    //         list += `<li>${error}</li>`;
    //     });
    //     list += `</ul>`;
    //     $('.rentmy-fulfillment').find('.rentmy-fulfillment-error').html(list);
    // },
    // bindDeliveryError: function() {
    //     let list = `<ul class="rentmy-error">`;
    //     this.fulfillment_errors.forEach(error => {
    //         list += `<li>${error}</li>`;
    //     });
    //     list += `</ul>`;
    //     $('.rentmy-fulfillment').find('.rentmy-fulfillment-error').html(list);
    // },
    bindFulfillmentError: function (){
        let list = `<ul class="rentmy-error">`;
        this.fulfillment_errors.forEach(error => {
            list += `<li>${error}</li>`;
        });
        list += `</ul>`;
        $('.rentmy-fulfillment').find('.rentmy-fulfillment-error').html(list);
    },
    getDeliveryCost: function() {
        let ref = this;
        $('.rentmy-fulfillment').find('.rentmy-fulfillment-error').html('');
        this.fulfillment_errors = [];
        let error_length = ref.deliveryValidation();
        if (error_length > 0) {
            ref.bindFulfillmentError();
            return;
        }
        let data = {};
        let sp_first_name = this.delivery_info.shipping_name.trim().split(' ')[0];
        let sp_last_name = this.delivery_info.shipping_name.trim().split(' ').filter(function(item) {
            return item != sp_first_name
        });
        data = ref.delivery_info;
        data['action_type'] = 'get_delivery_cost';
        data['shipping_first_name'] = sp_first_name;
        data['shipping_last_name'] = sp_last_name.join(" ");
        $.post('', data)
            .done((response) => {
                try {
                    data = JSON.parse(response);
                    if (data.status == 'OK') {
                        console.log(data)
                        if (ref.delivery_settings.charge_by_zone) {
                            let list = '';
                            data.result.location.forEach(zone => {
                                list += `<div class="rentmy-radio-inline">
                                        <label class="rentmy-radio">
                                            <input type='radio' value='${ zone.charge }' data-delivery='${JSON.stringify(zone)}' name="delivery_by_zone"/>
                                            ${ zone.name }
                                            <div class="rentmy-list-price">${this.currency_symbol}${ zone.charge }</div>
                                            <span></span>
                                        </label>
                                     </div>`;
                            });
                            $('.rentmy-fulfillment').find('.rentmy-delivery-cost').html(list);
                        } else {
                            let cost = data.result.location[0].charge;
                            let html = `<p>Delivery Cost ${this.currency_symbol}${cost}</p>`;
                            html += `<input type="hidden" id="rentmy_delivery" value='${JSON.stringify(data.result.location[0])}'/>`

                            $('.rentmy-fulfillment').find('.rentmy-delivery-cost').html(html);
                            ref.addShippingToCart(cost, 3);
                        }

                    }else{
                        let html = `<ul class="rentmy-error"><li>${data.result.error}</li></ul>`;
                        $('.rentmy-fulfillment').find('.rentmy-delivery-cost').html(html);
                    }

                } catch (e) {
                    console.log(e)
                }

            })
    },

    addShippingToCart: function(shipping_cost, shipping_method) {
        let ref = this;

        data = {
            action_type: 'shipping_to_cart',
            shipping_cost: shipping_cost,
            shipping_method: shipping_method,
            tax: 0,
            tax_id: null

        }
        $.post('', data)
            .done((response) => {
                try {
                    data = JSON.parse(response);

                    if (data.status == 'OK' && shipping_method != 1) {
                        ref.bindOrderData(data.result.data);
                    }


                } catch (e) {
                    console.log(e)
                }

            })
    },
    billingInfoValidation: function () {
        this.billing_error = [];

        if (!this.billing_info.mobile) {
            this.billing_error.push("Mobile is required.");
        }else{
            if (isNaN(parseInt(this.billing_info.mobile))) {
                this.billing_error.push("Mobile number is not valid.");
            }
        }
        if (!this.billing_info.email) {
            this.billing_error.push("Email is required.");
        }else{
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
    shippingValidation: function() {
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
    deliveryValidation: function() {

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
    getAdditionalServices: function (){
        let ref = this;
        let data = {
            action_type: 'get_additional_services',
            type:'cart',
        };
        $.post('', data)
            .done( (response) => {
                try {

                    response = JSON.parse(response);
                    if(response.status == 'OK'){
                        console.log("Additional Services");
                        ref.additional_services = response.result.data;
                        ref.cartable_additional_services = [];
                        ref.additional_services.forEach(service=>{
                            ref.cartable_additional_services.push({
                                id: service.id,
                                is_selected: service.is_selected,
                                value: service.existing?service.existing.config.user_entered:'',
                                order_additional_charge_id: service.existing?service.existing.id:null,
                                selected_option: null
                            });
                        })
                        this.bindAdditionalServices();
                    }


                }catch (e){
                    console.log(e)
                }

            });
    },
    is_additional_service: function (){
        let ref = this;

        if(ref.additional_services.length == 0){

            return false;
        }
        let i = 0;
        ref.additional_services.forEach(el=>{
            if(el.status){
                i++;
            }
        });

        if(i > 0){
            return true;

        }else{

            return false;
        }
    },
    bindAdditionalServices: function (){
        if(!this.is_additional_service()){
            return;
        }
        let optionalServiceTitle = (this.content.cart && this.content.cart.lbl_consider_optional_services) ? this.content.cart.lbl_consider_optional_services : '';
        let html = `<div class="rentmy-row">
                                    <div class="rentmy-additional-charge-title">`+ optionalServiceTitle +`</div>
                                    <div class="rentmy-column-12">`;
        this.additional_services.forEach(service=>{
            html += `<div class="rentmy-row" id="rentmy-service-${service.id}">
                                            <div class="rentmy-checkbox-inline" >
                                                <label class="rentmy-checkbox" for="rentmy-service-checkbox-${service.id}">
                                                    <input type="checkbox" value="${service.id}" id="rentmy-service-checkbox-${service.id}" ${service.is_required || service.existing?'checked':''} ${service.is_required?'disabled':''}/> ${service.description} <span>&nbsp;&nbsp;</span>
                                                </label>
                                            </div>
                                            <div class="rentmy-optional-service-content" id="rentmy_optional_service_content_${service.id}">
                                                <div class="rentmy-btn-toolbar">
                                                    <div class="rentmy-btn-group">`;
            if(!service.is_required) {
                service.fee.amounts.forEach(amount => {
                    active_class = '';
                    active_input = '';
                    if(service.existing && service.existing.config.user_entered==amount){
                        active_class = 'rentmy-btn-active';
                    }
                    html += `<button type="button" class="rentmy-btn rentmy-btn-amount ${active_class}" data-servie_id="${service.id}" value="${amount}">${service.fee.type != 'percentage'?this.currency_symbol:''}${amount}${service.fee.type == 'percentage'?'%':''}</button>`;

                });
            }else{
                html += `
                        <label style="margin-top:7px ">${service.fee.type != 'percentage'?this.currency_symbol:''}${service.fee.amounts[0]}${service.fee.type == 'percentage'?'%':''}</label>
                      
                    `;
            }
            let custom_inputed_value = '';
            if(service.input_custom == 1 && !service.is_required) {
                let is_exist = false;
                if (service.existing){
                    service.fee.amounts.forEach(amount => {
                        if(service.existing.config.user_entered==amount){
                            is_exist = true;
                        }
                    });
                }
                if(service.existing && !is_exist){
                    custom_inputed_value = service.existing.config.user_entered;
                }

                html += `<button type="button" class="rentmy-btn rentmy-input-amount-btn ${service.existing && !is_exist?'rentmy-btn-active':''}" data-id="${service.id}">Input Amount</button>`;
            }
            html += `</div>`;
            if(service.options != null ) {
                html += `<select data-service_id="${service.id}" id="rentmy_additional_service_option_${service.id}">`;
                html += `<option>--select--</option>`;
                service.options.split(';').forEach(option=>{
                    html += `<option ${(service.existing && (service.existing.config.selected_option == option))?'selected':''}>${option}</option>`;
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
        $('.rentmy-checkout-ordersummery').find('.rentmy-optional-service').html(html);
    },
    update_additional_services: function(service_id, charge_amount=''){
        let ref = this;
        this.cartable_additional_services.map(function (service){
            if(service.id == service_id){
                let service_data = ref.additional_services.filter(additional_service=>{
                    return additional_service.id == service_id;
                });
                service.value = charge_amount!=''?charge_amount:service_data[0].fee.amounts[0];
                service.is_selected = true;
            }
        });
        this.addAdditionalChargeToCart();
    },

    set_additional_services_option: function(service_id, option_value){
        this.cartable_additional_services.map(function (service){
            if(service.id == service_id){
                service.selected_option = option_value;
            }
        });
        this.addAdditionalChargeToCart();
    },
    remove_additional_service_from_cart: function(service_id){
        this.cartable_additional_services.map(function (service){
            if(service.id == service_id){
                return service.is_selected = false;
            }
        });
        checkout.addAdditionalChargeToCart();
    },

    addAdditionalChargeToCart: function (){
        let ref = this;

        data = {
            action_type: 'add_additional_service_to_cart',
            additional_charges: JSON.stringify(ref.cartable_additional_services),

        }
        $.post('', data)
            .done((response) => {
                try {
                    data = JSON.parse(response);
                    console.log(data)
                    ref.getAdditionalServices();
                    ref.getCartData();

                } catch (e) {
                    console.log(e)
                }

            })
    },
    // Payment getways
    getPaymentMethods: function(){
        let ref = this;

        data = {
            action_type: 'get_payment_methods',
        }
        $.post('', data)
            .done((response) => {
                try {
                    data = JSON.parse(response);
                    ref.payment_getways = data.data;
                    ref.bindPaymentMethods();

                } catch (e) {
                    console.log(e)
                }

            });
    },

    isPartialRequired: function(gateway) {
        if((gateway.type!='online') && !gateway.config) return false;
        if((gateway.type!='online') && !gateway.config.is_paid) return false;
        if(!this.payment_config || !this.cart.booking)   return false;
        let pc = this.payment_config;
        return (pc.type=="percent" && pc.booking < 100 && pc.booking > 0) || (pc.type=="fixed" && pc.booking < this.cart.total && pc.booking > 0);
    },
    bindPaymentMethods: function (){
        let ref = this;
        let html = '';
        let down_payment_text = `A ${ref.payment_config.type!='percent'?ref.currency_symbol:''}${ref.payment_config.booking}${ref.payment_config.type=='percent'?'%':''} down payment is required to secure your reservation. Please choose an option and pay to proceed.`;
        ref.payment_getways.forEach(getway=>{
            let is_partial_payment = ref.isPartialRequired(getway);
            if (getway.status == 1){
                if (getway.online_type == 'card'){


                    html += `<div class="rentmy-collaps-item rentmy-payment-collaps-item">
                                        <div class="rentmy-collaps-btn rentmy-payment-collaps-btn">
                                            <div class="rentmy-radio-inline">
                                                <label class="rentmy-radio" for="rentmy-payment-${getway.id}">
                                                    <input type="radio"  id="rentmy-payment-${getway.id}" name="rentmy-payment-method" value="card" data-id="${getway.id}" data-name="${getway.name}" data-type="1" data-gateway_type="${getway.type}"/> Credit Card <span></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="rentmy-collaps-content rentmy-payment-collaps-content" id="rentmy-payment-content-${getway.id}">`;
                    if(is_partial_payment) {
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
                    html+=`<div class="rentmy-payment-form">
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
                }else{
                    html += `<div class="rentmy-collaps-item rentmy-payment-collaps-item">
                                        <div class="rentmy-collaps-btn rentmy-payment-collaps-btn">
                                            <div class="rentmy-radio-inline">
                                                <label class="rentmy-radio" for="rentmy-payment-${getway.id}">
                                                    <input type="radio" id="rentmy-payment-${getway.id}" name="rentmy-payment-method" data-type="2" data-note="${getway.config.add_note??false}" data-is_paid="${getway.config.is_paid??false}" data-id="${getway.id}" data-name="${getway.name}" data-gateway_type="${getway.type}"/>${getway.name} <span></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="rentmy-collaps-content rentmy-payment-collaps-content" id="rentmy-payment-content-${getway.id}">
                                            <div class="renmty-checkout-shipping">
                                                `;
                    if(is_partial_payment) {
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
                    }else if (getway.config.is_paid){
                        html+= `<div className="rentmy-column-12">
                                <div className="rentmy-form-group">
                                    <label> Amount to pay* </label>
                                    <input type="text" name="amount_to_pay" value="${ref.amount_to_pay}"/>
                                </div>
                            </div>`;
                    }
                    if(getway.config.add_note) {
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

        $('.rentmy-checkout-payment').find('.rentmy-collaps').html(html);


    },

    //    Place Order
    placeOrder: function (){
        let errors = [];
        let ref = this;
        let is_billing_error = this.billingInfoValidation();
        if(is_billing_error){
            errors.push('Please fill billing details properly.');
        }
        this.bindBillingErrors();
        let is_payment_error = this.paymentValidation();
        if(is_payment_error){
            errors.push('Please fill payment details properly.');
        }
        this.bindPaymentError();
        let is_fulfillment_error = this.fulfillmentValidation();
        if(is_fulfillment_error){
            errors.push('Please fill fullfillment details properly.');
        }
        this.bindFulfillmentError();
        let is_term_condition = $('.rentmy-ordersummery-checkbox').find('#rentmy-termcondition').prop('checked');
        if(!is_term_condition){
            errors.push('You must accept terms & conditions.');
        }
        this.bindBasicErrors(errors);
        if(is_billing_error <= 0 && is_payment_error <= 0 && is_fulfillment_error <= 0 && is_term_condition){
            let payload = {};
            // let preload = {...this.billing_info, ...this.shipping_info, ...this.delivery_info};
            let sel_fulfillment = $('.rentmy-fulfillment').find('input[name="rentmy_fulfillment"]:checked');
            payload['delivery'] = {};

            if(sel_fulfillment.val() == 'delivery'){
                payload = {...this.billing_info, ...this.delivery_info};
                payload['shipping_method'] = 2;
                if (this.delivery_settings.charge_by_zone) {
                    payload['delivery'] = $('.rentmy-delivery-cost').find('input[type=radio]:checked').data('delivery');
                }else{
                    payload['delivery'] = $('#rentmy_delivery').val();
                }

            }
            if(sel_fulfillment.val() == 'shipping'){
                payload['delivery'] = $('.rentmy-shipping-methods').find('input[type=radio]:checked').data('delivery');
                payload = {...this.billing_info, ...this.shipping_info};
                payload['shipping_method'] = 1;
            }
            if(sel_fulfillment.val() == 'pickup') {
                payload = {...this.billing_info, ...this.shipping_info};
                let location_id = $('.rentmy-pickup-location-list').find('input[type=radio]:checked').val();
                payload['delivery'] = $('.rentmy-pickup-location-list').find('input[type=radio]:checked').data('delivery');
                payload['rm_instore_loc'] = location_id;

            }
            let sel_payment = $('.rentmy-checkout-payment').find('input[name="rentmy-payment-method"]:checked');

            payload['gateway_id'] = sel_payment.data('id');
            payload['payment_gateway_type'] = sel_payment.data('gateway_type');
            payload['payment_gateway_id'] = sel_payment.data('id');
            payload['payment_gateway_name'] = sel_payment.data('name');
            let payment_content = $('#rentmy-payment-content-'+payload['gateway_id']);
            if (sel_payment.data('gateway_type') == 'offline'){

                if (sel_payment.data('is_paid')==1){

                    payload['amount'] = payment_content.find('input[name=amount_to_pay]').val();
                }
                payload['note'] = payment_content.find('input[name=note]').val();
            }else{
                payload['amount'] = payment_content.find('input[name=amount_to_pay]').val();
                payload['card_name'] = payment_content.find('input[name=card_name]').val();
                payload['card_no'] = payment_content.find('input[name=card_number]').val();
                payload['exp_month'] = payment_content.find('select[name=card_exp_month]').val();
                payload['exp_year'] = payment_content.find('select[name=card_exp_year]').val();
                payload['cvv'] = payment_content.find('input[name=card_cvv2]').val();

            }
            payload['action_type'] = 'createOrder';
            payload['type'] = 2;
            payload['signature'] = this.signature_pad!=''?this.signature_pad.toDataURL('image/jpeg', 0.5):'';

            $.post('', payload)
                .done((response) => {
                    try {
                        data = JSON.parse(response);
                        console.log(data);
                        window.location = ref.base_url + '/page/order-complete';

                    } catch (e) {
                        console.log(e)
                    }

                });

        }



    },
    bindBasicErrors: function (errors){
        let list = `<ul class="rentmy-error">`;
        errors.forEach(error => {
            list += `<li>${error}</li>`;
        });
        list += `</ul>`;
        $('.rentmy-ordersummery-checkbox').find('.rentmy-all-error').html(list);
    },
    fulfillmentValidation: function (){
        this.fulfillment_errors = [];
        let element = $('.rentmy-fulfillment');
        let selected_method = element.find('input[type=radio]:checked');
        let is_fulfillment_selected = selected_method.length;
        if(is_fulfillment_selected <= 0){
            this.fulfillment_errors.push("Please Select a fulfillment method");
        }else{
            if(selected_method.val() == 'pickup'){
                if($('.rentmy-pickup-location-list').find('input[type=radio]:checked').length <= 0){
                    this.fulfillment_errors.push("Please Select a pickup location");
                }

            }
            if(selected_method.val() == 'shipping'){
                $('.renmty-checkout-shipping input,select').map(function() {
                    if ($(this).attr('name') != undefined)
                        checkout.shipping_info[$(this).attr('name')] = $(this).val();
                });
                let shipping_error_length = this.shippingValidation();
                if((shipping_error_length <= 0) && ($('.rentmy-shipping-methods').find('input[type=radio]:checked').length <= 0)){
                    this.fulfillment_errors.push("Please select a shipping method");
                }

            }
            if(selected_method.val() == 'delivery'){
                $('.renmty-checkout-delivery input,select').map(function() {
                    if ($(this).attr('name') != undefined)
                        checkout.delivery_info[$(this).attr('name')] = $(this).val();
                });
                let shipping_error_length = this.deliveryValidation();
                if (this.delivery_settings.charge_by_zone) {
                    console.log("delivery 1")
                    if ((shipping_error_length <= 0) && ($('.rentmy-delivery-cost').find('input[type=radio]:checked').length <= 0)) {
                        this.fulfillment_errors.push("Please select delevery cost");
                    }
                }else{
                    console.log("delivery 2")
                    if($('#rentmy_delivery').length == 0){
                        this.fulfillment_errors.push("Please Click on get delivery cost");
                    }
                }
            }
        }

        return this.fulfillment_errors.length;
    },

    paymentValidation: function (){
        this.payment_errors = [];
        let element = $('.rentmy-checkout-payment');
        let selected_method = element.find('input[name="rentmy-payment-method"]:checked');

        let is_payment_selected = selected_method.length;
        let gateway_id = selected_method.data('id');
        let selected_content = $(`#rentmy-payment-content-${gateway_id}`);
        if(is_payment_selected <= 0){
            this.payment_errors.push("Please Select a payment method");
        }else{
            let type = selected_method.data('type');
            console.log(type)
            if(type == 1){
                let amount_to_pay =  selected_content.find('input[name="amount_to_pay"]').val();
                let card_name =  element.find('input[name="card_name"]').val();
                let card_number =  element.find('input[name="card_number"]').val();
                let card_exp_month =  element.find('select[name="card_exp_month"]').val();
                let card_exp_year =  element.find('select[name="card_exp_year"]').val();
                let card_cvv2 =  element.find('input[name="card_cvv2"]').val();
                console.log(card_exp_month);
                if(card_name == ''){
                    this.payment_errors.push("Name on your card is required");
                }
                if(card_number == ''){
                    this.payment_errors.push("Card Number is required");
                }
                if(card_exp_month == '' || card_exp_year == ''){
                    this.payment_errors.push("Card expiry month and year is required");
                }
                if(card_cvv2 == ''){
                    this.payment_errors.push("CVV number is required");
                }
                if(amount_to_pay == ''){
                    this.payment_errors.push("Amount to pay is required");
                }
            }

            if(type == 2){
                is_paid = selected_method.data('is_paid');
                if(is_paid){
                    let amount_to_pay = selected_content.find('input[name="amount_to_pay"]').val();
                    if (amount_to_pay == ''){
                        this.payment_errors.push("Please enter some amount to pay");
                    }
                }
            }

        }
        return this.payment_errors.length;
    },
    bindBillingErrors:function(){
        let list = `<ul class="rentmy-error">`;
        this.billing_error.forEach(error => {
            list += `<li>${error}</li>`;
        });
        list += `</ul>`;
        $('.rentmy-billing-address').find('.rentmy-billing-info-error').html(list);
    },
    bindPaymentError: function (){
        let list = `<ul class="rentmy-error">`;
        this.payment_errors.forEach(error => {
            list += `<li>${error}</li>`;
        });
        list += `</ul>`;
        $('.rentmy-checkout-payment').find('.rentmy-payment-error').html(list);
    },
    // Helper Functions
    priceFormat: function (priceVal) {
        return parseFloat(priceVal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    imageLink: function (cart_item) {

        try {
            var imageLink = this.base_file_url  + this.store_id + '/' + cart_item.product_id + '/' + cart_item.product.images[0].image_small;
        } catch (e) {
            var imageLink = this.asset_url + '/assets/img/default.jpg';
        }

        return imageLink;
    },
};

jQuery(function($) {

    $('body')
        // Getting Billing Data
        .on('keyup', '.rentmy-billing-address input', function(event) {
            checkout.billing_info[event.target.name] = event.target.value;

        })
        .on('change', '.rentmy-billing-address select', function(event) {
            checkout.billing_info[event.target.name] = event.target.value;

        })

    .on('click', '.rentmy-btn-shipping-method', function(event) {
        $('.renmty-checkout-shipping input,select').map(function() {
            if ($(this).attr('name') != undefined)
                checkout.shipping_info[$(this).attr('name')] = $(this).val();
        });

        checkout.getShippingMethods();

    })

    .on('click', '.rentmy-btn-delivery-cost', function(event) {
            $('.renmty-checkout-delivery input,select').map(function() {
                if ($(this).attr('name') != undefined)
                    checkout.delivery_info[$(this).attr('name')] = $(this).val();
            });

            checkout.getDeliveryCost();
        })
        .on('click', '.rentmy-shipping-methods input[type="radio"]', function() {
            checkout.addShippingToCart($(this).val(), 7);
        })
        .on('click', '.rentmy-delivery-cost input[type="radio"]', function() {
            checkout.addShippingToCart($(this).val(), 2);
        })
        .on('click', '.rentmy-fulfillment input[name="rentmy-pickup-location"]', function() {
            checkout.addShippingToCart(0, 1);
            checkout.getCartData();
        })
    //Additional Services
        .on('click', '.rentmy-optional-service-content .rentmy-btn-amount', function (){
            let option_val = $(this).val();
            let service_id = $(this).data('servie_id');

            $('#rentmy-service-'+service_id+ ' button').removeClass('rentmy-btn-active');
            $('#rentmy-service-checkbox-'+service_id).attr('checked', true);
            $(this).addClass('rentmy-btn-active');
            checkout.update_additional_services(service_id, option_val);

        })
        .on('click', '.rentmy-optional-service-content .rentmy-input-amount-btn', function(){
            let service_id = $(this).data('id');
            $('#rentmy_input_amount_area_'+service_id).css('display', 'block');
        })

        .on('click', '.rentmy-optional-service-content .rentmy-optional-cancel-btn', function(){
            let service_id = $(this).data('service_id');
            $('#rentmy_input_amount_area_'+service_id).css('display', 'none');
        })

        .on('click', '.rentmy-optional-service-content .rentmy-optional-ok-btn', function(){
            let service_id = $(this).data('service_id');
            let inputed_value = $('#rentmy_input_amount_area_'+service_id+' input').val();

            checkout.update_additional_services(service_id, inputed_value);
            $('#rentmy_input_amount_area_'+service_id).css('display', 'none');


        })
        .on('change', '.rentmy-optional-service-content select', function(){
            let service_id = $(this).data('service_id');
            let selected_option = $('#rentmy_additional_service_option_'+service_id).val();
            checkout.set_additional_services_option(service_id, selected_option);
        })

        .on('click', '.rentmy-optional-service input:checkbox', function(){
            let service_id = $(this).val();
            console.log(service_id)
            let is_checked = $('#rentmy-service-checkbox-'+service_id).prop('checked');
            if (!is_checked){
                checkout.remove_additional_service_from_cart(service_id);
            }
            else{
                checkout.update_additional_services(service_id);
            }
        })
    //Additonal Service End rentmy-payment-method

        .on('click', '.rentmy-placeorder-btn', function() {
            checkout.placeOrder();
        })

        .on('click', '.rentmy-partial-payments', function (){
            let type = $(this).val();
            if(type == 'partial'){
                checkout.amount_to_pay = checkout.booking_amount;
            }
            if(type == 'full'){

                checkout.amount_to_pay = checkout.cart.total;
            }
            let gateway_id = $(this).data('gateway_id');
            $(`#rentmy-payment-content-${gateway_id}`).find('input[name=amount_to_pay]').val(checkout.amount_to_pay);

        })
        .on('click', '#rentmy-termcondition', function (){
            if(checkout.store_config.signature.active && checkout.store_config.signature.online) {
                if (!$(this).prop('checked')) {
                    $('.rentmy-signature-pad').css('display', 'none');
                } else {
                    $('.rentmy-signature-pad').css('display', 'block');
                }
            }
        })
        .on('click', '.rentmy-signature-pad .rentmy-clear-signature', function (){
            checkout.signature_pad.clear();
        });

    ;


    checkout.init();
});
