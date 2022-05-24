$(document).ready(function () {

    //fakelink
    $(document).on('click', 'a[href="#"]', function (event) {
        event.preventDefault();
    });

    //------------------------------------------------------------------------//

    //intro video
    $(document).on('click', '.intro-video-play', function (event) {
        event.preventDefault();
        $(this).fadeOut(300);
        $(this).parents('.intro-video').find('video')[0].play();
    });

    //------------------------------------------------------------------------//

    //drop
    activePop = null;
    function closeInactivePop() {
        $('.drop').each(function (index) {
            if ($(this).hasClass('open') && index != activePop) {
                $(this).removeClass('open');
            }
        });
        return false;
    }
    $(document).on('mouseover', '.drop', function () {
        activePop = $('.drop').index(this);
    });
    $(document).on('mouseout', '.drop', function () {
        activePop = null;
    });
    $(document.body).on('click', function (event) {
        closeInactivePop();
    });
    $(document).on('click', '.drop-toggle', function (event) {
        event.preventDefault();
        $(this).parent('.drop').toggleClass('open');
    });

    //------------------------------------------------------------------------//

    //done panel toggle
    $(document).on('click', '.done-panel-toggle', function (event) {
        event.preventDefault();
        $('.done-panel, .done-panel-push').fadeIn(300);
    });

    //------------------------------------------------------------------------//

    //datepicker
    $('.mask-date').mask('99/99/9999', { placeholder: 'mm/dd/yyyy' });
    $('.datepicker').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: "mm/dd/yy",
    });

    //------------------------------------------------------------------------//

    //toggle active
    $(document).on('click', '.toggle-active li:not(.active)', function (event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });

    //------------------------------------------------------------------------//

    //tab
    $('.tabs').delegate('li:not(.active)', 'click', function () { $(this).addClass('active').siblings().removeClass('active').parents('.tab').find('.box').hide().eq($(this).index()).fadeIn(250); });

    //------------------------------------------------------------------------//

    //maxlength
    $(document).on('keydown keyup keypress', '.symbols-maxlength', function () {
        var thisValue = $(this).val(),
            currentText = $(this).parents('.content-form-textarea').find('.symbols-maxlength-current');
        if (thisValue.length) {
            currentText.text(thisValue.length);
        } else {
            currentText.text('0');
        }
    });

    //------------------------------------------------------------------------//

    //emotions
    $(document).on('click', '.emotions-list button', function (event) {
        event.preventDefault();
        var thisText = $(this).text();
        var thisDataTarget = $(this).parents('.emotions-list').data('emotions-textarea');
        var thisTextarea = $('[data-textarea=' + thisDataTarget + ']');
        var thisTextareaVal = thisTextarea.val();
        thisTextarea.val(thisTextareaVal + ' ' + thisText);
    });

    //------------------------------------------------------------------------//

    //content form color
    $(document).on('click', '.content-form-color-list li:not(.content-form-color-palette)', function (event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });

    //------------------------------------------------------------------------//

    //content form benefits
    $('.content-form-benefits-list').sortable({
        connectWith: ".content-form-benefit",
        handle: ".content-form-benefit-drag",
        placeholder: "content-form-benefit-placeholder"
    });

    //------------------------------------------------------------------------//

    //tags
    $(document).on('keydown', '.tags-new-input', function (event) {
        if (event.which == 13) {
            var thisValue = $(this).val();
            if (thisValue != '') {
                var thisParent = $(this).parents('.tags-wrapper');
                $('<div class="tags-item">' + thisValue + '<a href="#" class="tags-item-delete"></a></div>').appendTo(thisParent.find('.tags-pull'));
                $(this).val('');
            }
        }
    });

    $(document).on('click', '.tags-item-delete', function (event) {
        event.preventDefault();
        $(this).parents('.tags-item').fadeOut('150', function () {
            $(this).remove();
        });
    });

    //------------------------------------------------------------------------//

    //multi select
    $('.multi-select').multiSelect();

    //------------------------------------------------------------------------//

});//document ready