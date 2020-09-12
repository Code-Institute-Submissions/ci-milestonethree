function validateMaterializeSelect() {
  let classValid = {
    "border-bottom": "1px solid #4caf50",
    "box-shadow": "0 1px 0 0 #4caf50",
  };
  let classInvalid = {
    "border-bottom": "1px solid #f44336",
    "box-shadow": "0 1px 0 0 #f44336",
  };
  if ($("select.validate").prop("required")) {
    $("select.validate").css({
      display: "block",
      height: "0",
      padding: "0",
      width: "0",
      position: "absolute",
    });
  }
  $(".select-wrapper input.select-dropdown")
    .on("focusin", function () {
      $(this)
        .parent(".select-wrapper")
        .on("change", function () {
          if (
            $(this)
              .children("ul")
              .children("li.selected:not(.disabled)")
              .on("click", function () {})
          ) {
            $(this).children("input").css(classValid);
          }
        });
    })
    .on("click", function () {
      if (
        $(this)
          .parent(".select-wrapper")
          .children("ul")
          .children("li.selected:not(.disabled)")
          .css("background-color") === "rgba(0, 0, 0, 0.03)"
      ) {
        $(this).parent(".select-wrapper").children("input").css(classValid);
      } else {
        $(".select-wrapper input.select-dropdown").on("focusout", function () {
          if (
            $(this)
              .parent(".select-wrapper")
              .children("select")
              .prop("required")
          ) {
            if ($(this).css("border-bottom") != "1px solid rgb(76, 175, 80)") {
              $(this)
                .parent(".select-wrapper")
                .children("input")
                .css(classInvalid);
            }
          }
        });
      }
    });
}

$(document).ready(function () {
  $(".sidenav").sidenav({ edge: "right" });
  $(".collapsible").collapsible();
  $("select").formSelect();
  $(".modal").modal();
  $("#recipe-display").delegate("i.icon-rotate", "click", function (event) {
    const icon = $(event.target);
    var down = icon.hasClass("fa-caret-down");
    if (down) {
      icon.removeClass("fa-caret-down").addClass("fa-caret-right");
    } else {
      icon.removeClass("fa-caret-right").addClass("fa-caret-down");
    }
  });

  validateMaterializeSelect();

  var ingredientField = $(".ingredients").length;
  $("#add_ingredient").on("click", function () {
    $(".new-ingredient")
      .first()
      .children(".input-field:last")
      .clone()
      .insertAfter(".new-ingredient .input-field:last")
      .find("input[type='text'], select, textarea")
      .val("");
    ingredientField += 1;
  });
  $("#remove_ingredient").on("click", function () {
    if (ingredientField > 1) {
      // only remove the :last item
      $(this)
        .siblings(".ingredient")
        .last()
        .children(".input-field:last")
        .remove();
      // ensure original ingredient line never gets deleted
      ingredientField -= 1;
    }
  });

  var methodField = $(".methods").length;
  // add new cloned item
  $("#add_step").on("click", function () {
    $(".new-step")
      .first()
      .children(".input-field:last")
      .clone()
      .insertAfter(".new-step .input-field:last")
      .find("input[type='text'], select, textarea")
      .val("");
    // increase counter so original direction is never removed
    methodField += 1;
  });
  // delete last cloned item
  $("#remove_step").on("click", function () {
    if (methodField > 1) {
      // only remove the :last item
      $(this).siblings(".method").last().children(".input-field:last").remove();
      // ensure original direction line never gets deleted
      methodField -= 1;
    }
  });
});
