<template>
  <div class="mt-8" v-for="template in json.consentTemplates" :key="template.templateId">
    <div class="shadow sm:rounded-md sm:overflow-hidden">
      <div class=" bg-white p-6">
        <h1 class="text-2xl">{{ template._meta.name }}</h1>
        <div>Version: <span class="text-gray-500 text-sm">{{ template.version }}</span></div>
        <div>Category: <span class="text-gray-500 text-sm">{{ template.categorySlug }}</span></div>
        <div>templateId: <span class="text-gray-500 text-sm">{{ template.templateId }}</span></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VueUsercentricsData',
  props: {
    json: {
      type: Object,
      required: true
    }
  }
}
</script>
