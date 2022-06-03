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

    //upload file
    $(document).on('click', '.upload-file-list-item-remove', function (event) {
        event.preventDefault();
        $(this).parents('.upload-file-list-item').fadeOut(150);
        $(this).parents('.upload-file').find('.upload-file-input').val('').trigger('change');
    });

    $(document).on('change', '.upload-file-input', function (event) {
        var thisPullTarget = $(this).data('pull');
        var thisPull = $('[data-pull-list="' + thisPullTarget + '"]');
        var thisTemplate = $(this).parents('.upload-file').find('.upload-file-template').html();
        if (thisPull.length) {
            thisPull.html('');
            var files = $(this)[0].files;
            for (var i = 0; i < files.length; i++) {
                var fileHTML = $(thisTemplate);
                if (window.File && window.FileList && fileHTML.hasClass('upload-file-list-item-vs-image')) {
                    var pReader = new FileReader();
                    pReader.addEventListener("load", function (e) {
                        var pic = e.target;
                        fileHTML.css('background-image', 'url(' + pic.result + ')');
                    });
                    pReader.readAsDataURL(files[i]);
                }
                fileHTML.find('.upload-file-list-item-name').text(files[i].name);
                fileHTML.find('.upload-file-list-item-size').text(parseFloat(files[i].size / (1024 * 1024)).toFixed(2) + ' MB');
                thisPull.append(fileHTML);
            }
        }
    });

    //------------------------------------------------------------------------//

    //mask time
    $('.mask-time').mask('99:99 SS', { placeholder: '00:00 am' });

    //------------------------------------------------------------------------//

    //lesson list
    $('.lesson-list').sortable({
        connectWith: ".lesson-item",
        handle: ".lesson-item-drag",
        placeholder: "lesson-item-placeholder"
    });

    //------------------------------------------------------------------------//

    let calendarEl = document.getElementById('appointments-calendar');
    if (calendarEl) {
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'timeGridWeek',
            initialDate: '2022-06-01',
            height: 'auto',
            buttonText: {
                month: 'Monthly',
                week: 'Weekly',
                day: 'Daily'
            },
            headerToolbar: {
                left: '',
                center: 'prev,title,next',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            eventContent: function (arg) {
                let customEvent = document.createElement('div');
                customEvent.classList.add('appointments-item');
                customEvent.style.color = arg.event.textColor;
                customEvent.style.backgroundColor = arg.event.backgroundColor;

                let customHTML = '';

                if (arg.event._def.title) {
                    customHTML += '<span class="appointments-item-title">' + arg.event._def.title + '</span>';
                }
                if (arg.event.extendedProps.time) {
                    customHTML += '<span class="appointments-item-time">' + arg.event.extendedProps.time + '</span>';
                }

                customEvent.innerHTML = customHTML;

                let arrayOfDomNodes = [customEvent]
                return { domNodes: arrayOfDomNodes }
            },
            events: [
                {
                    title: 'Yoga consultation',
                    start: '2022-05-29T00:30:00',
                    end: '2022-05-29T01:30:00',
                    textColor: '#3E7EFF',
                    backgroundColor: '#EBF2FF',
                    time: '00:30-01:30'
                },
                {
                    title: 'Create mockup',
                    start: '2022-05-30T12:00:00',
                    end: '2022-05-30T13:30:00',
                    textColor: '#EF8354',
                    backgroundColor: '#FFEBE4',
                    time: '12:00-13:30'
                },
                {
                    title: 'Diet Consultation',
                    start: '2022-05-31T01:00:00',
                    end: '2022-05-31T03:00:00',
                    textColor: '#5FDCB3',
                    backgroundColor: '#ECFCF7',
                    time: '01:00-03:00'
                },
                {
                    title: 'Yoga consultation',
                    start: '2022-06-01T07:30:00',
                    end: '2022-06-01T09:00:00',
                    textColor: '#3E7EFF',
                    backgroundColor: '#EBF2FF',
                    time: '7:30-9:00'
                },
                {
                    title: 'Visit course',
                    start: '2022-06-02T05:30:00',
                    end: '2022-06-02T07:00:00',
                    textColor: '#FBB0BF',
                    backgroundColor: '#FFEEF2',
                    time: '5:30-7:00'
                },
                {
                    title: 'Diet Consultation',
                    start: '2022-06-02T10:00:00',
                    end: '2022-06-02T11:00:00',
                    textColor: '#5FDCB3',
                    backgroundColor: '#ECFCF7',
                    time: '10:00-11:00'
                },
            ]
        });
        calendar.render();
        calendar.updateSize();
    }

    //------------------------------------------------------------------------//

});//document ready