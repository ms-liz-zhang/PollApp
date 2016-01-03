from PollApp.models import Poll, Choice
from PollApp.utility.UniqueIdGenerator import UniqueIdGenerator

class PollRepository():
	
	def __init__(self):
		self._uniqueIdGenerator = UniqueIdGenerator()
	
	def _getUnusedPollUuid(self):
		while True:
			candidateUuid = self._uniqueIdGenerator.createUrlSafeUniqueId()
			existingPoll = Poll.objects.filter(uniqueId=candidateUuid)
				
			if not existingPoll:
				break
		
		return candidateUuid
	

	def createPoll(self, pollDict, choices):
		poll = Poll(**pollDict)
		poll.uniqueId = self._getUnusedPollUuid()
		poll.save()
		
		for choice in choices:
			Choice.objects.create(poll=poll, **choice)
		return poll
		
	def getPollByUniqueId(self, uniqueId):
		poll = Poll.objects.get(uniqueId=uniqueId)
		return poll