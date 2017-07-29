const sortedContainers = sortable(".js-sortable-items", {
  forcePlaceholderSize: true,
  connectWith: 'connected'
});

const sortedContainerLists = sortable(".js-sortable-lists", {
  forcePlaceholderSize: true,
  placeholderClass: "sortable-lists-placeholder"
});

var manualSubmit = function(form){
  var $currentForm = $(form);
  var save = $currentForm.find("span.save");
  save.toggleClass("hidden");
  console.log("toggle save message", save);
  data = $currentForm.serializeArray();
  console.log("ajax with data", data);
  $.ajax({
    url: $currentForm.attr("action"),
    method: $currentForm.attr("method"),
    data: data,
    success: function(e){
      console.log("ajax success");
      save.toggleClass("hidden");
    },
    error: function(e){
      alert("ajax error");
      save.toggleClass("hidden");
    }
  });
};

sortedContainers[0].addEventListener("sortupdate", function(e) {    
    // save & submit form 1
    $startForm = $(e.detail.startparent).parents("form");
    console.log("submitting startForm", $startForm)
    // $startForm.submit();
    manualSubmit($startForm);

    // save & submit form 2
    $endForm = $(e.detail.endparent).parents("form");
    console.log("submitting endForm", $endForm)
    // $endForm.submit();
    manualSubmit($endForm);
});

sortedContainerLists[0].addEventListener("sortupdate", function(e) {    
    console.log("reordered lists");

    Array.from($("form.update-all")).forEach(function(elem, index) {
        form = $(elem);
        // update list id based on the new ordering
        form.find(".list-id").val(index);
        manualSubmit(form);
    });
});

var myClick = function(){
  $(".add-list-inputs").toggleClass("hidden");
  $(".add-a-list").toggleClass("hidden");
}

$(".js-add-a-list").click(myClick)

var myClick2 = function(){
  $(".add-list-inputs").toggleClass("hidden");
  $(".js-add-a-list").toggleClass("hidden");
}

$(".js-cancel-input").click(myClick2)

$(".width").click(function(event) {
  if (event.target == event.currentTarget) {
      $(".add-list-inputs").addClass("hidden");
      $(".js-add-a-list").removeClass("hidden");
  }
});

var addItemFn = function(event) {
  console.log("submitting the form", event.target);
  event.preventDefault();
  var $currentForm = $(event.target);
  data = $currentForm.serializeArray();
  console.log("ajax with data", data);
  $.ajax({
    url: $currentForm.attr("action"),
    method: $currentForm.attr("method"),
    data: data
  });

  newItem = $currentForm.find("input.new-item").val();
  newItemLi = `<li class="undone">${newItem}<input type="hidden" value="${newItem}" name="items[][name]"><input type="hidden" value="undone" name="items[][status]"><button type="submit" name="toggle" value="${newItem}" class="toggle undone">Done</button></li>`;

  $currentForm.siblings("form.update-all").children("ul.js-sortable-items").append(newItemLi);
  
  var currentInput = $currentForm.children("input.new-item");
  currentInput.val("");
};

$("form.add-item").on("submit", addItemFn);

var listTitle = function(event){
  
  var target = $( event.target );
  console.log("clicked on title", target);
  target.parents(".list").find("input.list-name-change").toggleClass("hidden");
  target.toggleClass("hidden");
};

$("div.list-header").click(listTitle);
