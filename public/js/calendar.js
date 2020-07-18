$(document).ready(function() {
    var currentDate = new Date();
    async function generateCalendar(date) {
      function monthDays(month, year) {
        var result = [];
        var days = new Date(year, month, 0).getDate();
        for (var i = 1; i <= days; i++) {
          result.push(i);
        }
        return result;
      };

      Date.prototype.monthDays = function() {
        var date = new Date(this.getFullYear(), this.getMonth() + 1, 0);
        return date.getDate();
      };

      // 년도, 월 
      var nowYear = date.getFullYear()
      var nowMonth = date.getMonth() + 1

      // Month Calendar 완성 - .monthly-calendar에 요일/일 append
      var details = {
        totalDays: date.monthDays(),
        weekDays: ['일', '월', '화', '수', '목', '금', '토'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      };

      $('#currentMonth').text(`${date.getFullYear()}년 ${details.months[date.getMonth()]}`);

      var start = new Date(date.getFullYear(), date.getMonth()).getDay();
      var cal = [];
      var day = 1;

      var flag = 0;
      var color = 0;

      var currentLast = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      var preMonthDay = currentLast.getDate() - currentLast.getDay();

      for (var i = 0; i <= 6; i++) {
        if (i === 0) {
            cal.push(['<div class="week-day">']);
        } else if (flag === 1){
            break
        } else if (day === 32) {
            break
        } else if (details.totalDays === 30 && day === 31) {
            break
        } else if (details.totalDays === 29 && day === 30) {
            break
        } else {
            cal.push(['<div class="week">']);
        }
        for (var j = 0; j < 7; j++) {
          if (i === 0) {
            cal[i].push('<div class="day-name">' + details.weekDays[j] + '</div>');
          } else if (day > details.totalDays) {
            color = 1
            day = 1
            flag = 1
            cal[i].push('<div class="day"><h3 id="'+ (nowMonth+1) + '-' + '0' + day + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">' + day++ + '</h3></div>');
          } else {
            if (i === 1 && j < start) {
              if ((nowMonth - 1) < 10) {
                cal[i].push('<div class="day"><h3  id="'+ '0' + (nowMonth-1) + '-' + preMonthDay + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">'+ preMonthDay++ +'</h3></div>');
              } else {
                cal[i].push('<div class="day"><h3  id="'+ (nowMonth-1) + '-' + preMonthDay + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">'+ preMonthDay++ +'</h3></div>');
              }
            } else if (color === 1) {
              if ((nowMonth + 1) < 10) {
                cal[i].push('<div class="day"><h3 id="'+ '0' + (nowMonth+1) + '-' + '0' + day + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">' + day++ + '</h3></div>');
              } else {
                cal[i].push('<div class="day"><h3 id="'+ (nowMonth+1) + '-' + '0' + day + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">' + day++ + '</h3></div>');
              }
            } else {
              if (nowMonth < 10) {
                if (day < 10) {
                  cal[i].push('<div class="day"><h3 id="'+ '0' + nowMonth + '-' + '0' + day + '-' + nowYear + '"class="day-label">' + day++ + '</h3></div>');  
                } else {
                  cal[i].push('<div class="day"><h3 id="'+ '0' + nowMonth + '-' + day + '-' + nowYear + '"class="day-label">' + day++ + '</h3></div>');
                }
              } else {
                if (day < 10) {
                  cal[i].push('<div class="day"><h3 id="'+ nowMonth + '-' + '0' + day + '-' + nowYear + '"class="day-label">' + day++ + '</h3></div>');  
                } else {
                  cal[i].push('<div class="day"><h3 id="'+ nowMonth + '-' + day + '-' + nowYear + '"class="day-label">' + day++ + '</h3></div>');  
                }
              }
            }
          }
        }
        cal[i].push('</div>');
      }
      cal = cal.reduce(function(a, b) {
        return a.concat(b);
      }, []).join('');
      $('.monthly-calendar').append(cal);

     
      function dayId(week){
        var weekYear = week.getFullYear()
        var weekMonth = week.getMonth() + 1
        var weekDay = week.getDate() 
        if (weekMonth < 10) {
          weekMonth = '0' + weekMonth
        }
        if (weekDay < 10) {
          weekDay = '0' + weekDay
        }
        var reWeek = weekMonth + '-' + weekDay + '-' + weekYear
        return reWeek
      };

      // 기간 년/월/일 형식
      function period(changeDate){
        var resDate = changeDate[2] + '년 ' + changeDate[0] + '월 ' + changeDate[1] + '일'
        return resDate
      }
      
      // Daily Calendar 완성 - .daily-calendar
      var todayYear = date.getFullYear()
      var todayMonth = date.getMonth() + 1
      var todayDay = date.getDate()
      var todayDate = date.getDay()
      todayDate = details.weekDays[todayDate]

      // today
      $('.daily-name').text(`${todayDay}일 ${todayDate}요일`)

      var data = {
        year: todayYear,
        month: todayMonth,
        day: todayDay
      }

      
      // popover open
      $(function () {
        $('[data-toggle="popover"]').popover().on('inserted.bs.popover')
      });

      String.prototype.replaceAll = function(org, dest) {
        return this.split(org).join(dest);
      }

      // 일정 등록 modal open
      $('.week, .daily-calendar').click(function(e) {
          var todayId = e.target.id
          const year = todayId.split('-')[2]
          const month = todayId.split('-')[0]
          const day = todayId.split('-')[1]
          todayId = `${year}-${month}-${day}`
          var params = {};
          window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
          console.log(params);
          location.href="calendar/create?id=" + params.id + "&today=" + todayId;
      });

      // 동시 modal 방지
      $(".event-consecutive, .event, .event-repeated").click(function(event) {
        event.stopPropagation();
      });
    }

    // today 클릭시, 현재 month calendar로 이동
    $('#today').click(function() {
        currentDate = new Date()
        $('.monthly-calendar').text('');
        $('.daily-schedule').text('');
        generateCalendar(currentDate);
    });

    // '<' 클릭시, 이전 calendar로 이동
    $('#previous').click(function() {
      $('.monthly-calendar').text('');
      $('.daily-schedule').text('');
      if ($( '.nav-link' ).attr( 'aria-selected' ) === 'true') {
        if (currentDate.getMonth() === 0) {
          currentDate = new Date(currentDate.getFullYear() - 1, 11);
        } else {
          currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        }
        generateCalendar(currentDate);
      }
      else {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), Number(currentDate.getDate()) - 1)
        generateCalendar(currentDate);
      }
    });

    // '>' 클릭시, 다음 calendar로 이동
    $('#next').click(function() {
      $('.monthly-calendar').text('');
      $('.daily-schedule').text('');
      if ($( '.nav-link' ).attr( 'aria-selected' ) === 'true') {
        if (currentDate.getMonth() === 11) {
          currentDate = new Date(currentDate.getFullYear() + 1, 0);
        } else {
          currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        }
        generateCalendar(currentDate);
      }
      else {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), Number(currentDate.getDate()) + 1)
        generateCalendar(currentDate)
      }
    });
    // 현재 month 달력 보여주기 (초기 화면)
    generateCalendar(currentDate);
  });

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(function () {
  $('#view li:first-child a').tab('show')
});

$(function () {
    $('#datetimepicker1').datetimepicker({
        format: 'L'
    });
    $('#datetimepicker3').datetimepicker({
        format: 'L'
    });
});

$(function () {
    $('#datetimepicker2').datetimepicker({
        format: 'LT'
    });
    $('#datetimepicker4').datetimepicker({
        format: 'LT'
    });
});

$('#inlineCheckbox2').click(function() {
  if ($('#inlineCheckbox2').is(":checked")) {
    $('[name="start_time"]').attr("readonly", true);
    $('[name="end_time"]').attr("readonly", true);
  } else {
    $('[name="start_time"]').attr("readonly", false);
    $('[name="end_time"]').attr("readonly", false);
  }
});
