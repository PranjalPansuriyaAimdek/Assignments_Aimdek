
//#region declare variables
var counter = 0;
var score = 0;
//#endregion declare variables

//#region function:document.ready 
$(document).ready(function () {
    $("#questionCard").hide();
    $("#img").show();
    $("#finishpage").hide();
});
//#endregion function:document.ready 


//#region btnStartNow : onclick
$("#btnStartNow").click(function () {
    $("#img").hide();
    $("#homepage").hide();
    $("#questionCard").show();

    loadQuestion();

});
//#endregion btnStartNow : onclick


//#region region function:loadQuestion 
function loadQuestion() {
    $.getJSON('data.json', function (data) {

        //get obj from data
        var obj = data[counter];

        //make all the checkboxes unchecked
        $('input:radio[name=optionGroup]').each(function () { $(this).prop('checked', false); });


        //get data and put it into our elements
        $("#questionNumber").text("Question " + (counter + 1));
        $("#question").text(obj.Question);
        $("#lbloption1").text(obj.options[0]);
        $("#lbloption2").text(obj.options[1]);
        $("#lbloption3").text(obj.options[2]);
        $("#lbloption4").text(obj.options[3]);

        //make btnNextQuestion disable 
        $("#btnNextQuestion").addClass("disabled");

        //onchange method for input checkboxes
        $("input[type=radio][name='optionGroup']").change(function () {
            $("#btnNextQuestion").removeClass("disabled");

        });


    })
}
//#endregion function:loadQuestion 


//#region btnNextQuestion :onclick
$("#btnNextQuestion").click(function () {

    //get index of which option is selected
    var index = $("input[name='optionGroup']:checked").val() - 1;
   

    $.getJSON('data.json', function (data) {
        var obj = data[counter];

        //check for correctness of answer
        if (obj.answer == obj.options[index]) {
            score = score + 1;
        }

        //next question
        counter++;
        //check for the question limit
        if(counter==5){
            
            //hide and show elements
            $("#questionCard").hide();
            $("#finishpage").show();

            //this is all about percentage and score
            $("#gainedScore").text(score);
            $("#totalScore").text(counter);

            var percentage = score/counter*100;


            if(percentage<50) {
                $("#percentage").addClass("text-danger");
                $("#resultSentance").text("Try hard next time!");
                $("#resultSentance").addClass("text-danger");
            }
            else{
                $("#percentage").addClass("text-success");
                $("#resultSentance").text("Great Achievement!");
                $("#resultSentance").addClass("text-success");
            }
            $("#percentage").text("  ("+parseInt(percentage)+"%)");
        }

        //load new question
        else{
            loadQuestion();
        }
        
    });


});
//#endregion btnNextQuestion :onclick


//#region btnStartAgain : onclick
$("#btnStartAgain").click(function(){
    location.reload();
});
//#endregion btnStartAgain : onclick

