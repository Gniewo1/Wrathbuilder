from django.test import TestCase
from django.urls import reverse
from django.http import JsonResponse
from .models import Class, Skill, Alignment

from .models import Class, Skill, Alignment

class ClassListViewTest(TestCase):

    def setUp(self):
        """
        Set up test data.
        Create a few Class objects to be used in the test.
        """
        # Create some class skills
        skill_1 = Skill.objects.create(name="Lore (Nature)")
        skill_2 = Skill.objects.create(name="Arcana")
        skill_3 = Skill.objects.create(name="Stealth")

        # Create some alignments with unique codes
        alignment_1 = Alignment.objects.create(name="Lawful", code="L01")
        alignment_2 = Alignment.objects.create(name="Neutral", code="N01")
        alignment_3 = Alignment.objects.create(name="Chaotic", code="C01")

        # Create some classes
        paladin = Class.objects.create(id=1, name="Paladin", hit_die=10, skill_points=2)
        paladin.class_skills.set([skill_1])  # Correct way to assign many-to-many field
        paladin.allowed_alignments.set([alignment_1, alignment_2])  # Correct way to assign many-to-many field

        mage = Class.objects.create(id=2, name="Mage", hit_die=6, skill_points=4)
        mage.class_skills.set([skill_2])
        mage.allowed_alignments.set([alignment_2, alignment_3])

        rogue = Class.objects.create(id=3, name="Rogue", hit_die=8, skill_points=6)
        rogue.class_skills.set([skill_3])
        rogue.allowed_alignments.set([alignment_1, alignment_3])

    def test_class_list(self):
        """
        Test that the class list is returned properly as JSON.
        """
        # URL for the view (adjust to the actual URL name for the class list)
        url = reverse('class-list')  # Assuming your URL name is 'class-list'
        
        # Make a GET request to the view
        response = self.client.get(url)
        
        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)
        
        # Check that the response content type is JSON
        self.assertEqual(response['Content-Type'], 'application/json')


        
        # Check the content of the response
        response_data = response.json()

        print(response_data)
        
        # Check that the data matches what we created
        self.assertEqual(len(response_data), 3)
        self.assertEqual(response_data[0]['name'], "Paladin")
        self.assertEqual(response_data[1]['hit_die'], 6)
        self.assertEqual(response_data[2]['allowed_alignments'], ["Lawful", "Neutral"])  # Check that allowed_alignments is returned correctly

    def tearDown(self):
        """
        Clean up after the test.
        """
        Class.objects.all().delete()
        Skill.objects.all().delete()
        Alignment.objects.all().delete()  # Clean up the Alignment objects
