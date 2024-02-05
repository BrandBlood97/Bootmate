var studentInfo = {
    "student": [
        {
            "firstName": "Dan",
            "lastName": "Hengel",
            "phoneNumber": "952-484-6566",
            "emailAddress": "d.hengel@yahoo.com",
            "employment": "",
            "collaboration": "Yes",
           
        },
        {
            "firstName": "Brandon",
            "lastName": "Bloodsworth",
            "phoneNumber": "229-457-2384",
            "emailAddress": "brandon1bloodsworth@gmail.com",
            "employment": "No",
            "collaboration": "",
            
        },
    ]
}

$(document).ready(function(){
    var studentTemplate = $("#student-template").html();
    var compiledStudentTemplate = Handlebars.compile(studentTemplate);
    $(".student-list-container").html(compiledStudentTemplate(studentInfo));
});