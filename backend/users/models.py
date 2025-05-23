from django.contrib.auth.models import AbstractUser
from django.db import models


# User model
class CustomUser(AbstractUser):
    verified = models.BooleanField(default=False)

# Model which create new build
class CharacterBuild(models.Model):
    MYTHICPATH_CHOICES = [
        ("Aeon", "Aeon"),
        ("Angel", "Angel"),
        ("Azata", "Azata"),
        ("Demon", "Demon"),
        ("Devil", "Devil"),
        ("Gold Dragon", "Gold Dragon"),
        ("Legend", "Legend"),
        ("Lich", "Lich"),
        ("Trickster", "Trickster"),
        ("Swarm-That-Walks", "Swarm-That-Walks"),
    ]
        
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='builds')
    name = models.CharField(max_length=100)
    race = models.ForeignKey('Race', on_delete=models.SET_NULL, null=True)
    first_class = models.ForeignKey('Class', on_delete=models.SET_NULL, null=True)
    alignment = models.ForeignKey('Alignment', on_delete=models.SET_NULL, null=True)
    background = models.ForeignKey('Background', on_delete=models.SET_NULL, null=True)
    deity = models.ForeignKey('Deity', on_delete=models.SET_NULL, null=True, blank=True)
    mythic_path = models.CharField(max_length=16, choices=MYTHICPATH_CHOICES, blank=True)
    backstory = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    image = models.ImageField(upload_to='character_images/', blank=True, null=True)

    def __str__(self):
        return self.name


class Race(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    strength_bonus = models.IntegerField(default=0)
    dexterity_bonus = models.IntegerField(default=0)
    constitution_bonus = models.IntegerField(default=0)
    intelligence_bonus = models.IntegerField(default=0)
    wisdom_bonus = models.IntegerField(default=0)
    charisma_bonus = models.IntegerField(default=0)

    # True if race can choose ability score bounus
    choose_bonus = models.BooleanField(default=False)
    #image to represent race
    image = models.ImageField(upload_to='race_images/', blank=True, null=True)

    def __str__(self):
        return self.name
    
class AbilityScore(models.Model):
    build = models.OneToOneField(CharacterBuild, on_delete=models.CASCADE, related_name='ability_scores')
    strength = models.IntegerField()
    dexterity = models.IntegerField()
    constitution = models.IntegerField()
    intelligence = models.IntegerField()
    wisdom = models.IntegerField()
    charisma = models.IntegerField()

    def __str__(self):
        return (self.build.name + " abilities scores")

class Background(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    
class Deity(models.Model):
    # ALIGNMENT_CHOICES = [
    #     ("LG", "Lawful Good"),
    #     ("NG", "Neutral Good"),
    #     ("CG", "Chaotic Good"),
    #     ("LN", "Lawful Neutral"),
    #     ("TN", "True Neutral"),
    #     ("CN", "Chaotic Neutral"),
    #     ("LE", "Lawful Evil"),
    #     ("NE", "Neutral Evil"),
    #     ("CE", "Chaotic Evil"),
    # ]

    name = models.CharField(max_length=100, unique=True)
    allowed_alignments = models.ManyToManyField('Alignment', related_name='deities')
    description = models.TextField(blank=True)

    image = models.ImageField(upload_to='deity_images/', blank=True, null=True)

    def __str__(self):
        return self.name
    
class Alignment(models.Model):
    code = models.CharField(max_length=2, unique=True)  # e.g., "LG"
    name = models.CharField(max_length=50)              # e.g., "Lawful Good"

    def __str__(self):
        return self.name


class Skill(models.Model):
    ABILITY_CHOICES = [
        ("STR", "Strength"),
        ("DEX", "Dexterity"),
        ("INT", "Intelligence"),
        ("WIS", "Wisdom"),
        ("CHA", "Charisma"),
    ]
        
    name = models.CharField(max_length=50) 
    ability_link = models.CharField(max_length=16, choices=ABILITY_CHOICES, default="Dexterity")
    description = models.TextField()

    def __str__(self):
        return self.name

# Classes available
class Class(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    hit_die = models.IntegerField()
    skill_points = models.IntegerField()
    class_skills =  models.ManyToManyField('Skill', related_name='classes')

    # if alignment is empty that mean there is not restrictions 
    allowed_alignments = models.ManyToManyField('Alignment', related_name='classes', default=None, blank=True)

    def __str__(self):
        return self.name



# Classes choosen to build
class BuildClassLevel(models.Model):
    build = models.ForeignKey(CharacterBuild, on_delete=models.CASCADE, related_name='class_levels')
    char_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    level = models.PositiveIntegerField()