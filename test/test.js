let expect = require('chai').expect;
let request = require('request');
let url = 'http://localhost:3000/api/Activity'

//Ender
//Activity page functionalities testing
describe("Get all activities test", function () {
    it('return status code of 200', function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('return success message', function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body);
            expect(body.message).to.contain('Successfully');
            done();
        });
    });

    it('return an array', function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body);
            expect(body.data).to.be.a('array')
            done();
        });
    });
});

describe('Post a activity test', function () {
    let newProject = {
        email: '123@gmail.com',
        time: '6:00',
        event: 'post Test',
    };

    it('return status code of 200', function (done) {
        request({ url: url, method: 'POST', json: newProject }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('return successfully added message', function (done) {
        request({ url: url, method: 'POST', json: newProject }, function (error, response, body) {
            expect(body.message).to.be.equal('project successfully added');
            done();
        });
    });
});

describe('Update a activity test', function () {
    let projectId = '647465e0aeddc9267e8c3cc6';
    let updatedData = {time: '7:00',event: 'Update Description Test'};

    it('return status code of 200', function (done) {
        request({ url: url, method: 'PUT', json: { id: projectId, ...updatedData } }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body.message).to.be.equal('Successfully updated');
            done();
        });
    });

    it('return successfully updated message', function (done) {
        request({ url: url, method: 'PUT', json: { id: projectId, ...updatedData } }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body.message).to.be.equal('Successfully updated');
            done();
        });
    });
});

describe('Remove activity test', function () {
    let projectId = '647465e0aeddc9267e8c3cc6';

    it('return status code of 200', function (done) {
        request({ url: url, method: 'DELETE', json: { id: projectId } }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body.message).to.be.equal('Successfully removed');
            done();
        });
    });

    it('return successfully removed message', function (done) {
        request({ url: url, method: 'DELETE', json: { id: projectId } }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body.message).to.be.equal('Successfully removed');
            done();
        });
    });
});



describe('Remind Event Start Test', function () {
    // Refactored remindEventStart
    function remindEventStart(currentDate) {
        var storedContentString = localStorage.getItem('storedContent');
        var storedContent = JSON.parse(storedContentString);
        var alertMessage = '';

        for (var i = 0; i < storedContent.length; i++) {
            var eventTime = new Date(storedContent[i].time);
            var timeDifference = eventTime.getTime() - currentDate.getTime();

            if (timeDifference > 0 && timeDifference <= 120000) {
                var eventName = storedContent[i].event;
                var eventStartTime = eventTime;

                if (!storedContent[i].reminded) {
                    alertMessage = 'Event will start at ' + eventStartTime.getHours() + ':' + eventStartTime.getMinutes() + ' Activity ' + eventName;
                    storedContent[i].reminded = true;
                }
            } else {
                if (storedContent[i].reminded) {
                    storedContent.splice(i, 1);
                    i--;
                }
            }
        }
        localStorage.setItem('storedContent', JSON.stringify(storedContent));
        return alertMessage;
    }
    
    beforeEach(() => {
        // mock localStorage
        global.localStorage = {
            getItem: function (key) { return this[key]; },
            setItem: function (key, value) { this[key] = value; },
        };
    });

    it('should return alert message for upcoming event', function () {
        const upcomingEvent = {
            time: new Date(2023, 4, 29, 10, 1, 0).toString(),
            event: 'Test Event',
            reminded: false,
        };
        localStorage.setItem('storedContent', JSON.stringify([upcomingEvent]));
        const alertMessage = remindEventStart(new Date(2023, 4, 29, 10, 0, 0));
        expect(alertMessage).to.include('Event will start at 10:1 Activity Test Event');
    });

    it('should not return alert message for past event', function () {
        const pastEvent = {
            time: new Date(2023, 4, 29, 9, 0, 0).toString(),
            event: 'Test Event',
            reminded: false,
        };
        localStorage.setItem('storedContent', JSON.stringify([pastEvent]));
        const alertMessage = remindEventStart(new Date(2023, 4, 29, 10, 0, 0));
        expect(alertMessage).to.be.empty;
    });
});