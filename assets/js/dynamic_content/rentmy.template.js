// Toggle menu js
$(document).ready(function() {
    //converted as upstair
    $('body')
        .on('click', '.rentmy-mobile-menubar', function() {
            $('body').find(".rentmy-nav-manu ").slideToggle(200);
        });

    $('.rentmy-modalclose, .rentmy-datetime-modal-overlay').click(function() {
        $('.rentmy-datetime-modal-overlay').removeClass('is-open');
    });
    $('.rentmy-modal').on('click', function(e) {
        e.stopPropagation();
    });

    // Product Search
    $('#search-btn').click(function(event) {
        event.preventDefault();
        searchProduct($('#search-product').val());
    });

    $('#search-form').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13 || e.key === 'Enter') {
            e.preventDefault();
            searchProduct($('#search-product').val());
            return false;
        }
    });

    function searchProduct(searchParam) {
        window.location = $('#search-form').attr('action')+'?search='+searchParam;
    }

    // Newsletter subscription
    $("#subscription-email").keyup(function(e) {
        let currentValue = $(this).val();
        if(currentValue.length > 6){
            let pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
            if(!pattern.test(currentValue)){
                $('#subscribe-btn').prop('disabled', true);
                $('#subscribe-btn').addClass('disabled');
            } else {
                $('#subscribe-btn').prop('disabled', false);
                $('#subscribe-btn').removeClass('disabled');
            }
        }else {
            $('#subscribe-btn').prop('disabled', true);
            $('#subscribe-btn').addClass('disabled');
        }
    });

    $('#subscribe-form').on('submit', function (e) {
        e.preventDefault();
        subscribeSubmit();
    });

    $('#subscribe-btn').on('click', function (e) {
        e.preventDefault();
        subscribeSubmit();
    });

    function subscribeSubmit() {
        let data = {
            email: $("#subscription-email").val(),
            action_type: 'newsletter_subscription'
        };
        $.post('', data)
            .done((response) => {
                try {
                    response = JSON.parse(response);
                    console.log(response);
                    if(response.error){
                        rentmyAlert.errorAlert(response.error);
                    }else {
                        rentmyAlert.successAlert(response.message);
                    }
                } catch (e) {
                    console.log(e)
                }
            });
    }
});

// search bar js  
$(function() {
    $('.rentmy-search-bar, .rentmy-search-closebar').on('click', function() {
        $('.rentmy-search-body').toggleClass('rentmy-search-show');
    });
});

$('body')
    .on('click', '.rentmy-fulfillment-collaps-btn', function(e) {

        e.preventDefault();

        var $this = $(this);

        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('.rentmy-fulfillment-collaps-content').removeClass('show');
            $this.parent().parent().find('.rentmy-fulfillment-collaps-content').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });

$(document).ready(function() {
    $('body')
        .on('click', '.rentmy-fulfillment-collaps .rentmy-fulfillment-collaps-item .rentmy-fulfillment-collaps-btn', function(e) {
            // $('.rentmy-collaps .rentmy-collaps-item .rentmy-collaps-btn').click(function() {
            //     $('.rentmy-fulfillment-collaps-item .rentmy-fulfillment-collaps-btn').removeClass("rentmy-active");
            //     $(this).addClass("rentmy-active");
            $(this).find('input[type=radio]').prop('checked', true);
        });
});

$('body')
    .on('click', '.rentmy-payment-collaps-btn', function(e) {

        e.preventDefault();

        var $this = $(this);

        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('.rentmy-payment-collaps-content').removeClass('show');
            $this.parent().parent().find('.rentmy-payment-collaps-content').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });
$(document).ready(function() {
    $('body')
        .on('click', '.rentmy-payment-collaps .rentmy-payment-collaps-item .rentmy-payment-collaps-btn', function(e) {
            // $('.rentmy-collaps .rentmy-collaps-item .rentmy-collaps-btn').click(function() {
            // $('.rentmy-payment-collaps-item .rentmy-payment-collaps-btn').removeClass("rentmy-active");
            // $(this).addClass("rentmy-active");
            $(this).find('input[type=radio]').prop('checked', true);

        });
});

/*
    Helper functions
 */
function getTimeRanges(interval, language = window.navigator.language, startFrom = '8:00 AM') {
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
}

function currencyFormat(amount) {
    amount = parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    const currencyFormat = STORE_CONFIG.currency_format
    if (currencyFormat.pre) {
        return `<span class="pre">${currencyFormat.symbol}</span><span class="amount">${amount}</span>`
    }

    return `<span class="amount">${amount}</span><span class="pre">${currencyFormat.symbol}</span>`
}

function insertURLParam(key, value) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get(key) != undefined && urlParams.get(key).length > 1) {
        urlParams.delete(key)
    }
    urlParams.set(key, value);
    window.location.search = urlParams;
}


const rentmyAlert = {
    $elm: $('.rentmy-alert-message'),
    $parentContainer: $('.rentmy-alert-message div').first(),
    icons: {
        success: 'lni lni-checkmark-circle',
        error: 'lni lni-warning'
    },
    setContent: function(html) {
        this.$elm.find('.rentmy-alert-message-text').html(html)
    },
    error: function() {
        //remove classes
        this.resetClasses()

        //add error classes

        this.$parentContainer.addClass('rentmy-alert-error-message')
        this.$elm.find('.rentmy-alert-message-icon i').addClass(this.icons.error)
    },
    success: function() {
        //remove classes
        this.resetClasses()

        //add success classes
        this.$parentContainer.addClass('rentmy-alert-success-message')
        this.$elm.find('i').addClass(this.icons.success)
    },
    resetClasses: function() {
        this.$parentContainer.removeClass()
        this.$elm.find('i').removeClass()
    },
    open: function() {
        this.$elm.removeClass('rentmy-hide').delay(4000).queue(function() {
            $(this).addClass("rentmy-hide").dequeue();
        });
    },
    errorAlert: function(html) {
        html
        this.setContent(html)
        this.error()
        this.open()
    },
    successAlert: function(html) {
        this.setContent(html)
        this.success()
        this.open()
    }
}

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

Date.prototype.mysqlFormat = function() {
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

Date.prototype.showTime = function() {
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