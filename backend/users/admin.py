from django.contrib import admin

# Register your models here.

from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, CharacterBuild, Race, AbilityScore, Background, Deity, Alignment, Class, BuildClassLevel, Skill




admin.site.register(CustomUser)
admin.site.register(CharacterBuild)
admin.site.register(Race)
admin.site.register(AbilityScore)
admin.site.register(Background)
admin.site.register(Deity)
admin.site.register(Alignment)
admin.site.register(Class)
admin.site.register(BuildClassLevel)
admin.site.register(Skill)

