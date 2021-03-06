/**
 * Created by Yiming on 3/15/2016.
 */
var sliders=[]
function createSlider(){
    if ($('.ui-slider').length > 0) {
        $('.ui-slider').each(function () {
            var step=0;
            if ($(this).attr('data-step')) {
                step = parseInt($(this).attr('data-step'));
            }
            var valueMin = parseInt($(this).attr('data-value-min'));
            var valueMax = parseInt($(this).attr('data-value-max'));
            $(this).noUiSlider({
                start: [valueMin, valueMax],
                connect: true,
                range: {
                    'min': valueMin,
                    'max': valueMax
                },
                step: step
            });
            $(this).Link('lower').to($(this).children('.values').children('.value-min'), null, wNumb({decimals: 0}));
            $(this).Link('upper').to($(this).children('.values').children('.value-max'), null, wNumb({decimals: 0}));
            sliders.push($(this))
        });
    }
}

$(document).ready(function ($) {

    $(".select2-select").each(function () {
        var name = $(this).attr("name")
        var input = $(this)
        $.ajax({
            url: '/film/getSuggestion',
            method: 'get',
            dataType: 'json',
            data: {'field': $(this).attr('name')},
            success: function (data) {
                var items = data.items
                input.select2({
                    minimumInputLength: 2,
                    data: items,
                    allowClear: true,
                    placeholder: 'ALL'
                });
            },
            error: function () {
                input.select2({
                    minimumInputLength: 2,
                    allowClear: true,
                    placeholder: 'ALL'
                });
            }
        })
    })


    //  No UI Slider ------------------------------------------
    createSlider()


    // Bootstrap Animated Tabs --------------------------------
    var activeTab;
    var transitionParent;

    $('body').find('a[data-toggle="collapse"]').click(function () {
        var where = $(this).attr('href');
        activeTab = $(this).attr('data-tab');
        $(activeTab).addClass('active');
        $(where + ' a[href="' + activeTab + '"]').tab('show');
        transitionParent = $(this).attr('data-transition-parent');
    });




});

