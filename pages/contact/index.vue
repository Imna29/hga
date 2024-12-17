<script lang="ts" setup>

const { defineField } = useForm();

const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [email, emailAttrs] = defineField('email');
const [message, messageAttrs] = defineField('message');

const faqs = ref([
  {
    title: 'What is minifigure grading?',
    content: 'Minifigure grading is the process of evaluating, authenticating, and preserving your LEGO minifigures. Our experts assess each figure\'s condition based on comprehensive criteria, assign them a grade, and encapsulate them in custom-designed acrylic cases for protection and display.',
    value: '0'
  },
  {
    title: 'Why should I get my minifigures graded?',
    content: 'Grading enhances the value and appeal of your minifigure collection by providing an objective assessment of each figure\'s condition. It also protects your figures from damage, ensuring they remain in pristine condition for years to come.',
    value: '1'
  },
  {
    title: 'How does the grading process work?',
    content: 'Our team utilizes detailed imaging and years of expertise to compare your minifigures against our meticulous grading criteria. We assess factors like print quality, figure integrity, wear, and overall appearance to assign an accurate grade.',
    value: '2'
  },
  {
    title: 'What grading scale do you use?',
    content: 'We use a carefully crafted grading scale that prioritizes objectivity. Each minifigure is evaluated based on specific criteria to ensure consistent and precise assessments.',
    value: '3'
  },
  {
    title: 'What types of minifigures do you grade?',
    content: 'We currently only offer grading services for standard sized minifigures. in the future we will accept tall figures and big figures (big figs) as well. Each category has specific size dimensions, and figures must fit within these dimensions, including any accessories.',
    value: '4'
  },
  {
    title: 'Can I submit minifigures with accessories?',
    content: 'Yes, you can submit minifigures with wearable accessories such as hats, hair, helmets, and other items, as long as they fit within the specified dimensions for their category.',
    value: '5'
  },
  {
    title: 'How do I submit my minifigures for grading?',
    content: 'To submit your minifigures, please follow the submission guidelines on our website. Start and complete a submission form and ship your figure(s) to us to be assessed and graded. Ensure your figures are securely packaged to prevent damage during shipping and include a completed submission form.',
    value: '6'
  },
  {
    title: 'How long does the grading process take?',
    content: 'Processing times may vary based on demand and the number of figures submitted. Please refer to our website or contact our customer service team for the most current turnaround times.',
    value: '7'
  },
  {
    title: 'How much does grading cost?',
    content: 'Pricing varies depending on the type of submission. For instance, bulk submissions offer a discounted price per figure. For detailed pricing information, please visit our services page or contact us directly.',
    value: '8'
  },
  {
    title: 'Do you accept international submissions?',
    content: 'Yes, we accept submissions from collectors worldwide. Please be aware that international shipping costs and customs regulations may apply.',
    value: '9'
  }
]);
</script>


<template>
  <div>

    <div class="text-5xl font-bold text-center mt-10">
      Contact Us
    </div>
    <div class="text-center mt-10 w-3/4 mx-auto text-lg font-sem">
      Reach out with any HAN questions, we're here to help. 
    </div>
    <div class="mt-10 md:w-1/2 w-full mx-auto flex flex-col gap-8">
      <div class="grid grid-cols-2 gap-4">
        <div class="w-full">
          <FloatLabel>
            <InputText id="firstName" class="w-full" v-model="firstName" />
            <label for="firstName">First Name</label>
          </FloatLabel>
        </div>
        <div class="w-full">
          <FloatLabel>
            <InputText id="lastName" class="w-full" v-model="lastName" />
            <label for="lastName">Last Name</label>
          </FloatLabel>
        </div>
      </div>
      <div class="w-full">
        <FloatLabel>
          <InputText id="email" class="w-full" v-model="email" />
          <label for="email">Email</label>
        </FloatLabel>
      </div>
      <div class="w-full">
        <FloatLabel>
          <Textarea id="message" class="w-full" v-model="message" />
          <label for="message">Message</label>
        </FloatLabel>
      </div>
      <div>
        <Button type="submit" label="Submit" class="w-full" />
      </div>
    </div>
    <div class="text-5xl font-bold text-center mt-10 mb-4"><a id="faq"></a>Frequently Asked Questions</div>
    <Accordion value="0">
      <AccordionPanel v-for="faq in faqs" :key="faq.value" :value="faq.value">
        <AccordionHeader>{{ faq.title }}</AccordionHeader>
        <AccordionContent>
          <p class="m-0">{{ faq.content }}</p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>


<style></style>
