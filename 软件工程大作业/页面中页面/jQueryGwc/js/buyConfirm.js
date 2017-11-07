XIAOMI.namespace("payment"), XIAOMI.payment = {
    init: function() {
        var a = this;
        $("#payBtn").on("click", function() {
            var b = a.isSelectedBank(),
                c = $("#use_cash_account").val(),
                d = $("#can_pay_all").val(),
                e = $("#useBalance").attr("data-disabled"),
                f = a.getBankName();
            return "1" === c ? "true" === e ? ($("#toPayTip").modal("show"), !0) : ("1" === d ? (a.show(), $("#balancePay").find(".select-other").hide()) : b ? (a.show(), $("#balancePay").find("#bankName").html(f)) : alert("请选择其他支付方式！"), !1) : b ? void $("#toPayTip").modal("show") : (alert("请选择支付方式"), !1)
        }), $("#chooseOther").on("click", function() {
            $("#balancePay").modal("hide"), $(".bank-title,#bankList").show(), $("#showPaymentAll").trigger("click")
        }), $("#toPayTipClose").on("click", function() {
            $("#toPayTip").modal("hide")
        }), $("#showPaymentAll").on("click", function() {
            $("#paymentHistory").hide().siblings().fadeIn(100), "1" === $("#use_cash_account").val() && $("#paymentFenqi").hide();
            for (var a = $("#paymentHistory").siblings().find("input[name='payOnlineBank']"), b = a.length, c = $("input[name='payOnlineBank']:checked").val(), d = 0; b > d; d += 1)
                if (a.eq(d).val() === c) {
                    a.eq(d).prop("checked", !0);
                    break
                }
            return !1
        }), $(".payment-list").find("li").on("click", function() {
            $(this).find("input").prop("checked", !0), $(this).attr("data-isinstalment") || ($(".fenqi-detail").hide(), "1" !== $("#use_cash_account").val() && $("#paymentFenqi").show(), $("#paymentBalance").show(), "alipay" === $(this).find("input").val() ? (has_load_qrcode || ($("#pay-form").attr({
                action: "?pay_mode=1&id=" + order_id,
                target: "alipayqrcodeFrame"
            }), $("#pay-form").submit(), $("#pay-form").attr({
                action: "#",
                target: "_blank"
            }), has_load_qrcode = !0), $("#J_alipayQrcode").slideDown()) : $("#J_alipayQrcode").hide(), "unionpay" === $(this).find("input").val() ? $("#J_eventUnionpay").fadeIn() : $("#J_eventUnionpay").hide())
        }), $("#alipayTrigger").on("click", function() {
            return $("#alipay").prop("checked", !0), $("#pay-form").submit(), !1
        }), $("#useBalance").on("click", function() {
            var a = $(this).attr("data-checked"),
                b = $(this).attr("data-disabled"),
                c = $("#can_pay_all").val();
            return "true" === b ? !1 : ("false" === a ? ($(this).attr("data-checked", "true"), $("#use_cash_account").val("1"), $(this).addClass("selected"), "0" === c ? ($("#titleWrap").animate({
                top: "-50px"
            }, 200, function() {}), $("#paymentFenqi").hide()) : ($(".bank-title").hide(), $("#bankList").hide())) : "true" === a ? ($(this).attr("data-checked", "false"), $("#use_cash_account").val("0"), $(this).removeClass("selected"), $(".bank-title").show(), $("#bankList").show(), "0" === c && $("#titleWrap").animate({
                top: 0
            }, 200, function() {}), $("#paymentFenqi").show()) : alert("参数错误！"), !1)
        }), $("#toPay").on("click", function() {
            a.checkedCode()
        }), a.fenqi()
    },
    show: function() {
        var a = this;
        a.sendAgain(), $("#balancePay").modal("show")
    },
    isSelectedBank: function() {
        var a = $("input[name='payOnlineBank']:checked").length;
        return 0 >= a ? !1 : !0
    },
    getBankName: function() {
        return $("input[name='payOnlineBank']:checked").next().clone()
    },
    checkedCode: function() {
        var a = $.trim($("#verifycode").val());
        $.ajax({
            type: "POST",
            url: "/buy/checkCashAccountSms.php?r=" + Math.random(),
            data: "verifycode=" + a + "&orderid=" + order_id,
            dataType: "json",
            async: !1,
            success: function(a) {
                1 === a.code ? ($("#pay-form").submit(), $("#balancePay").modal("hide"), $("#toPayTip").modal("show")) : $("#checkCodeTip").html(a.msg)
            }
        })
    },
    sendAgain: function() {
        var a = this,
            b = $("#useCashAccountPayLeft").text();
        $.ajax({
            type: "POST",
            url: "/buy/sendCashAccountSms.php?r=" + Math.random(),
            data: "useCashAccountPayLeft=" + b + "&orderid=" + order_id,
            dataType: "json",
            success: function(b) {
                1 === b.code ? a.countdown() : $("#checkCodeTip").html(b.msg)
            }
        })
    },
    countdown: function(a) {
        var b = a || 60,
            c = null,
            d = this;
        $("#sendAgain").off().find("em").html("(" + b + ")"), c = setInterval(function() {
            b -= 1, b > 0 ? $("#sendAgain").find("em").html("(" + b + ")") : (clearInterval(c), $("#checkCodeTip").html("请重新发送验证码!"), $("#sendAgain").on("click", function() {
                $("#checkCodeTip").html("已重新发送验证码，请查收!"), d.sendAgain()
            }).find("em").html(""))
        }, 1e3)
    },
    fenqi: function() {
        $(".payment-list").children('li[data-isinstalment="true"]').on("click", function() {
            var a = $(this).find("input").val();
            $("#installments_list_" + a), $("#installments_list_" + a).show().children(".options").children(".item").on("click", function() {
                var a = $(this).index();
                $(this).children("input").prop("checked", !0), $(this).addClass("selected").siblings().removeClass("selected").parent().siblings(".info").children(".item").eq(a).show().siblings().hide()
            }).eq(0).trigger("click"), $("#paymentBalance").hide()
        })
    }
}, $(function() {
    XIAOMI.payment.init()
});