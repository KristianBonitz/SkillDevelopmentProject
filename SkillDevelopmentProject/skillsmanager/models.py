from django.db import models

# Create your models here.
#
# Users
class User(models.Model):
	"""docstring for User"""
	user_name = models.CharField(max_length=200)
	date_created = models.DateTimeField()
	
	def __str__(self):
		return self.user_name

# Skills
class Skill(models.Model):
	"""
	Skill: 
	To be added: 
	Description === >= <=  ==> -> >

	"""
	skill_name = models.CharField(max_length=200)
	user = models.ForeignKey(User)
	
	def __str__(self):
		return self.skill_name

class SkillTag(models.Model):
	"""docstring for User"""
	tag_name = models.CharField(max_length=200)
	skill = models.ForeignKey(Skill)

	def __str__(self):
		return self.tag_name

class Progress(models.Model):
	"""docstring for User"""
	value = models.Integer()
	skill = models.ForeignKey(Skill)
	user = models.ForeignKey(User)

	def __str__(self):
		return self.tag_name