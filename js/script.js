/*Скрипт плавного перемещения по якорям*/

$(document).ready(function() {
  $("#page-header").on("click", "a", function(event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
});


$(document).ready(function() {
  var $menu = $(".nav-list");

  $(window).scroll(function() {
    if ($(this).scrollTop() > 20 && $menu.hasClass("nav-list--default")) {
      $menu.removeClass("nav-list--default").addClass("nav-list--active");
    } else if ($(this).scrollTop() <= 20 && $menu.hasClass("nav-list--active")) {
      $menu.removeClass("nav-list--active").addClass("nav-list--default");
    }
  });
});


$(document).ready(function() {

  function Scroll_block() {
    var scroll_top = $(document).scrollTop();
    $(".nav-list .list-item__link").each(function() {
      var hash = $(this).attr("href");
      var target = $(hash);
      if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
        $(".nav-list li .list-item__link--active").parent().removeClass("list-item__link--active");
        $(this).parent().addClass("list-item__link--active");
      } else {
        $(this).parent().removeClass("list-item__link--active");
      }
    });
  }

  $(document).on("scroll", Scroll_block);

  $("a[href^=#]").click(function(e) {
    e.preventDefault();

    $(document).off("scroll");
    $(".nav-list li .list-item__link--active").parent().removeClass("list-item__link--active");
    $(this).parent().addClass("list-item__link--active");
    var hash = $(this).attr("href");
    var target = $(hash);

    $("html, body").animate({
      scrollTop: target.offset().top
    }, 500, function() {
      window.location.hash = hash;
      $(document).on("scroll", Scroll_block);
    });
  });
});


var overlay = document.querySelector(".overlay");
var modal = document.querySelector(".call");
var modalButton = document.querySelector(".call__submit");
var buyButton = document.querySelectorAll(".nav-contacts__callback");

if (overlay) {
  for (var i = 0; i < buyButton.length; i++) buyButton[i].addEventListener("click", function(event) {
    event.preventDefault();
    overlay.classList.add("overlay--on");
  });

  overlay.addEventListener("click", function() {
    overlay.classList.remove("overlay--on");
  });

  modal.addEventListener("click", function(event) {
    event.stopPropagation();
  });

  modalButton.addEventListener("submit", function() {
    overlay.classList.remove("overlay--on");
  });

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      overlay.classList.remove("overlay--on");
    }
  });
}
//скрипт найден и адаптирован под необходимые условия задачи, попутно разобрался как стилизовать нужные компоненты
$(document).ready(function() {
  $('input#name, input#surname, input#phone').unbind().blur(function() {
    var id = $(this).attr('id');
    var val = $(this).val();

    switch (id) {
      case 'name':
        var rv_name = /^[a-zA-Zа-яА-Я]+$/;
        if (val.length > 2 && val != '' && rv_name.test(val)) {
          $(this).addClass('not_error')
            .css('border', '2px solid green');
          $(this).next('.call-list__error')
            .css('display', 'none');
        } else {
          $(this).removeClass('not_error').addClass('error')
            .css('border', '2px solid red');
          $(this).next('.call-list__error').html('поле "Имя" обязательно для заполнения,<br>длина имени должна составлять не менее 2 символов,<br> поле должно содержать только русские или латинские буквы')
            .css('color', 'red')
            .animate({
              'paddingLeft': '10px'
            }, 400)
            .animate({
              'paddingLeft': '5px'
            }, 400);
        }
        break;

      case 'surname':
        var rv_surname = /^[a-zA-Zа-яА-Я]+$/;
        if (val.length > 2 && val != '' && rv_surname.test(val)) {
          $(this).addClass('not_error')
            .css('border', '2px solid green');
          $(this).next('.call-list__error')
            .css('display', 'none');
        } else {
          $(this).removeClass('not_error').addClass('error')
            .css('border', '2px solid red');
          $(this).next('.call-list__error').html('поле "Фамилия" обязательно для заполнения<br>, длина фамилии должна быть не менее 1 символа<br>')
            .css('color', 'red')
            .animate({
              'paddingLeft': '10px'
            }, 400)
            .animate({
              'paddingLeft': '5px'
            }, 400);
        }
        break;

      case 'phone':
        var rv_phone = /^\d[\d\(\)\ -]{4,14}\d$/;
        if (val.length > 7 && val != '' && rv_phone.test(val)) {
          $(this).addClass('not_error')
            .css('border', '2px solid green');
          $(this).next('.call-list__error')
            .css('display', 'none');
        } else {
          $(this).removeClass('not_error').addClass('error')
            .css('border', '2px solid red');
          $(this).next('.call-list__error').html('поле "Номер телефона обязателен к заполнению')
            .css('color', 'red')
            .animate({
              'paddingLeft': '10px'
            }, 400)
            .animate({
              'paddingLeft': '5px'
            }, 400);
        }
        break;
    }
  });

  $('form#call-popup').submit(function(e) {
    e.preventDefault();
    if ($('.not_error').length == 3) {
      $.ajax({
        url: '../send.php',
        type: 'post',
        data: $(this).serialize(),

        beforeSend: function(xhr, textStatus) {
          $('form#call-popup :input').attr('disabled', 'disabled');
        },

        success: function(response) {
          $('form#call-popup :input').removeAttr('disabled');
          $('form#call-popup :text').val('').removeClass().next('.call-list__error').text('');
          alert(response);
        }
      });
    } else {
      return false;
    }
  });
});
