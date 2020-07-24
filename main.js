
var formElem = document.getElementById('inputForm');

formElem.addEventListener('submit', saveEvent);

function saveEvent(ev) {
    console.log('saveEvent called');

    var eventDesc = document.getElementById('eventInput').value;
    var eventTime = document.getElementById('eventTimeInput').value;
    var eventId = Math.random();
    var eventStatus = 'Not Done';
    var eventOpacity = 'bright';

    var event = {
        id: eventId,
        eventDescription: eventDesc,
        time: eventTime,
        status: eventStatus,
        eveOpacity: eventOpacity
    }

    if (localStorage.getItem('events') == null) {
        var events = [];
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    } else {
        var events = JSON.parse(localStorage.getItem('events'));
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    }

    formElem.reset();

    fetchEvents();

    ev.preventDefault();
    
}

function closeStatus(id) {
    console.log('Close Status Called')
    var events = JSON.parse(localStorage.getItem('events'));

    for (var i = 0; i < events.length; i++) {
       if (events[i].id == id) {
           events[i].status = 'Event Done';
           events[i].eveOpacity = 'dull';
           
       } 
    }
    

    localStorage.setItem('events', JSON.stringify(events));

    fetchEvents();
}

function deleteEvent(id) {
    var events = JSON.parse(localStorage.getItem('events'));

    for (var i = 0; i < events.length; i++) {
       if (events[i].id == id) {
           events.splice(i, 1);
       } 
    }

    localStorage.setItem('events', JSON.stringify(events));

    fetchEvents();
}

function fetchEvents() { 
    console.log('fetch events called');
   
   
    var events = JSON.parse(localStorage.getItem('events'));
    var issueList = document.getElementById('issuesList');

    console.log(events);
    console.log(issueList);
    
    issueList.innerHTML = '';

    for (var i = 0; i < events.length; i++) {
        
        var id = events[i].id;
        var desc = events[i].eventDescription;
        var startTime = events[i].time;
        var status = events[i].status;
        var eveOpacity = events[i].eveOpacity;

        console.log(id);
        console.log(desc);
        console.log(status);
        console.log(startTime); 

        issueList.innerHTML += '<div class="issueItem ' + eveOpacity + '">'+
                               '<h6>Event ID: ' + id + '</h6>'+
                               '<p class="status"><span class="btn">' + status + '</span></p>'+
                               '<h3>Event Description:' + desc + '</h3>'+
                               '<div class="statCont">'+
                               '<p>Start Time:' + startTime + '</p>'+
                               '</div>'+
                               '<a href="#" onclick="closeStatus(\''+id+'\')" class="btn">Check</a>'+
                               '<a href="#" onclick="deleteEvent(\''+id+'\')" class="btn btn-red">Delete</a>'+
                               '</div>';
    }

    // localStorage.clear();
}