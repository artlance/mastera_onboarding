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

    //-----------------------------------------//

    //done panel toggle
    $(document).on('click', '.done-panel-toggle', function (event) {
        event.preventDefault();
        $('.done-panel, .done-panel-push').fadeIn(300);
    });

    //------------------------------------------------------------------------//

});//document ready