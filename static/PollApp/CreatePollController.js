app.controller('CreatePollController', ['$scope', '$timeout', 'pollService', function ($scope, $timeout, pollService) {
	$scope.createPollResponse = new PollResponse();
	$scope.loading_gif = '/static/PollApp/ajax-loader.gif';
	$scope.poll = {
		choices : initializeChoices(),
		question : '',
		isMultiSelect : false,
		link : ''
	};

	$scope.hasCreated = false;

	$scope.addChoice = function(index) {
		if (index < ($scope.poll.choices.length - 1))
			return;

		$scope.poll.choices.push(new Choice());
	}

	$scope.createPoll = function() {
		$scope.createPollResponse.status = 'loading';
		pollService.save(null, createFormatedPollData($scope.poll), function() {
			$scope.createPollResponse.status = "created";
		});
	}
}]);

function PollResponse() {
    this.status = 'creating';
    this.url = 'http://testurl.com/12345'
}


function createFormatedPollData(poll) {
	var pollData = {};
	pollData.question = poll.question;
	pollData.isMultiSelect = poll.multiSelect;
	pollData.choices = getNonEmptyPollChoices(poll.choices);
	
	return pollData;
}

function getNonEmptyPollChoices(choices) {
	var nonEmptyChoices = [];
	for (var i = 0; i < choices.length; i++) {
		
		if (choices[i].text)
			nonEmptyChoices.push(choices[i]);
	}
	
	return nonEmptyChoices;
}

function initializeChoices() {
	var choices = [];

	for (var i = 0; i < 4; i++) {
		choices.push(new Choice());
	}

	return choices;
}

function Choice() {
	this.isSelected = false;
	this.text = undefined;
}

function Poll() {
	this.choices = [];
	this.question = '';
	this.isMultiSelect = false;
}