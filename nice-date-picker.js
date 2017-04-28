/**
 * nice date picker
 * Created by ollie on 2017/4/27.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.niceDatePicker = factory());
}(this, function () {
    'use strict';

    var niceDatePicker = function ($params) {
        this.$warpper = null;
        this.monthData = null;
        this.$params = $params;
        this.init(this.$params);
    };

    niceDatePicker.prototype.getMonthData = function (year, month) {
        var year, month;
        var ret = [];

        if (!year || !month) {

            var today = new Date();

            year = today.getFullYear();

            month = today.getMonth() + 1;
        }
        var firstDay = new Date(year, month - 1, 1);//当月的第一天

        var firstDayWeekDay = firstDay.getDay();//当月第一天是周几

        if (firstDayWeekDay === 0) {

            firstDayWeekDay = 7;
        }

        year = firstDay.getFullYear();

        month = firstDay.getMonth() + 1;


        var lastDayOfLastMonth = new Date(year, month - 1, 0);//上个月的最后一天

        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();//上个月最后一天是几号

        var preMonthDayCount = firstDayWeekDay - 1;//需要显示上个月几个日期

        var lastDay = new Date(year, month, 0);//当月的最后一天

        var lastDate = lastDay.getDate()//当月最后天是几号
        var styleCls = '';
        for (var i = 0; i < 7 * 6; i++) {

            var date = i + 1 - preMonthDayCount;

            var showDate = date;

            var thisMonth = month;

            if (date <= 0) {
                //上个月
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
                styleCls = 'nice-gray';

            } else if (date > lastDate) {
                thisMonth = month + 1;
                showDate = showDate - lastDate;
                styleCls = 'nice-gray';
            } else {
                var today = new Date();
                if (showDate === today.getDate() && thisMonth === today.getMonth() + 1) {
                    styleCls = 'nice-normal nice-current';
                } else {
                    styleCls = 'nice-normal';
                }


            }

            if (thisMonth === 13) {
                thisMonth = 1;
            }
            if (thisMonth === 0) {
                thisMonth = 12;
            }

            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate,
                styleCls: styleCls
            });
        }
        return {
            year: year,
            month: month,
            date: ret
        };
    };

    niceDatePicker.prototype.buildUi = function (year, month) {
        this.monthData = this.getMonthData(year, month);
        this.dayWords = [['一', '二', '三', '四', '五', '六', '日'], ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']];
        this.enMonthsWords = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


        var html = '<div class="nice-date-picker-warpper">' +
            '<div class="nice-date-picker-header">' +
            '<a href="javascript:;" class="prev-date-btn">&lt;</a>';

        if (!this.$params.mode) {
            this.$params.mode = 'zh';
            html += '<span class="nice-date-title">' + this.monthData.year + '年 - ' + this.monthData.month + '月</span>';
        } else if (this.$params.mode === 'en') {
            html += '<span class="nice-date-title">' + this.enMonthsWords[this.monthData.month - 1] + ',' + this.monthData.year + '</span>';
        } else if (this.$params.mode === 'zh') {
            html += '<span class="nice-date-title">' + this.monthData.year + '年 - ' + this.monthData.month + '月</span>';
        }

        html += '<a href="javascript:;" class="next-date-btn">&gt;</a>' +
            '</div>' +
            '<div class="nice-date-picker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>';
        if (!this.$params.mode) {
            this.$params.mode = 'zh';
            for (var i = 0; i < this.dayWords[0].length; i++) {
                html += '<th>' + this.dayWords[0][i] + '</th>';
            }
        } else if (this.$params.mode === 'en') {
            for (var i = 0; i < this.dayWords[1].length; i++) {
                html += '<th>' + this.dayWords[1][i] + '</th>';
            }
        } else if (this.$params.mode === 'zh') {
            for (var i = 0; i < this.dayWords[0].length; i++) {
                html += '<th>' + this.dayWords[0][i] + '</th>';
            }
        }
        html += '</tr>' +
            '</thead>' +
            '<tbody>';

        for (var i = 0; i < this.monthData.date.length; i++) {
            if (i % 7 === 0) {
                html += '<tr>';
            }
            html += '<td class="' + this.monthData.date[i].styleCls + '" data-date="' + this.monthData.year + '/' + this.monthData.month + '/' + this.monthData.date[i].showDate + '">' + this.monthData.date[i].showDate + '</td>';
            if (i % 7 === 6) {
                html += '</tr>';
            }
        }

        html += '</tbody>' +
            '</table>' +
            '</div>' +
            '</div>';


        return html;

    };

    niceDatePicker.prototype.render = function (direction, $params) {
        var year, month;
        if (this.monthData) {

            year = this.monthData.year;
            month = this.monthData.month;

        } else {
            year = $params.year;
            month = $params.month;
        }
        if (direction === 'prev') {
            month--;
            if (month === 0) {
                month = 12;
                year--;
            }
        }
        if (direction === 'next') {
            month++;

        }
        var html = this.buildUi(year, month);
        this.$warpper.innerHTML = html;
    };
    niceDatePicker.prototype.init = function ($params) {
        this.$warpper = $params.dom;
        this.render('', $params);
        var _this = this;
        this.$warpper.addEventListener('click', function (e) {
            var $target = e.target;
            if ($target.classList.contains('prev-date-btn')) {

                _this.render('prev');

            }
            if ($target.classList.contains('next-date-btn')) {

                _this.render('next');

            }
            if ($target.classList.contains('nice-normal')) {

                $params.onClickDate($target.getAttribute('data-date'));

            }
        }, false);
        this.$warpper.addEventListener('mouseover', function (e) {
            var $target = e.target;
            if ($target.classList.contains('nice-normal')) {

                $target.classList.add('nice-active');
            }
        }, false);
        this.$warpper.addEventListener('mouseout', function (e) {
            var $target = e.target;
            if ($target.classList.contains('nice-normal')) {

                $target.classList.remove('nice-active');
            }

        }, false);

    };
    return niceDatePicker;
}));