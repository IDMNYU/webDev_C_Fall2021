console.log("js!!");

$('h3').on("click", function(){
    console.log("hello?");
    $('body').css("background-color", "yellow")
})


$("#theButton").on("click", potato);

let theP = "yr the hero!!"

function potato(){
    console.log("potato clicked!");
    $('h3').append("<p>" + theP + "</p>")
}
// https://stackoverflow.com/questions/4283141/jquery-change-background-color
$('#clickHere').click(function() {
    console.log("yellow click");
    $('#other').text("now the green text is this");
    $('div').css("background-color", "red")
    $('body').css("background-color", "blue");
    $('h3').remove(":contains('hello')");

})