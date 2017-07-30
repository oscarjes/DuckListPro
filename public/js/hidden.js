
$("li").mouseover(function(){
  $(this).children("div.trash").removeClass("hidden");
  $(this).children("div.button").removeClass("hidden");
  }).mouseout( function(){
  $(this).children("div.trash").addClass("hidden");
  $(this).children("div.button").addClass("hidden");
});

$("div.list-header-container").mouseover(function(){
  $(this).children("div.trash-list").removeClass("hidden");
  }).mouseout( function(){
  $(this).children("div.trash-list").addClass("hidden");
});

var listTitle = function(event){
  
  var target = $( event.target );
  console.log("clicked on title", target);
  target.parents(".list").find("input.list-name-change").toggleClass("hidden");
  target.toggleClass("hidden");
};

$("div.list-header").click(listTitle);

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