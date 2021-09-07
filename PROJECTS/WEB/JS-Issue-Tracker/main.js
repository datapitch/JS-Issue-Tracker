//Save Issues object to local storage on form submit
document.getElementById('formInput').addEventListener('submit', saveIssue);

function saveIssue(e)  {
    var issueDesc = document.getElementById('inputDescription').value;
    var issueSeverity = document.getElementById('inputSeverity').value;
    var issueAssignedTo = document.getElementById('inputPerson').value;
    var status = 'Open';
    var issueID = chance.guid();

    var issueObj = {
        id: issueID,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: status
    }

    if(localStorage.getItem('issues') == null) {
        //Push data into array
        var issues = [];
        issues.push(issueObj);
        localStorage.setItem('issues', JSON.stringify(issues));

    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issueObj);
        localStorage.setItem('issues', JSON.stringify(issues));

    }

    document.getElementById('formInput').reset();

    fetchIssues();

    e.preventDefault();

}

//Fetch Issues function
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class=well>' +
                                '<h6> Issues ID: ' + id + '</h6>' +
                                '<p><span class="label label-info">' + status + '</span></label' +
                                '<h3>' + desc + '</h3'> +
                                '<p> <span>class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
                                '<p> <span>class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning"> Close </a>' +
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-danger"> Delete </a>' +
                                '</div>';
    }  
}
