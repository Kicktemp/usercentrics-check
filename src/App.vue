<template>
  <div>
    <div v-if="spinner"
         class="flex fixed justify-center items-center bottom-0 top-0 left-0 right-0 bg-black bg-opacity-30">
      <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="lg:text-center">
        <a class="text-base text-indigo-600 font-semibold tracking-wide uppercase" href="https://kicktemp.com"
           target="_blank ">by Kicktemp</a>
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Usercentrics Checker
        </p>
      </div>
      <div class=" md:col-span-2 mt-10">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class=" bg-white p-6">
            <div class="block text-sm font-medium text-gray-700">
              Usercentrics
            </div>
            <div class="grid grid-cols-4 gap-6 mt-0">
              <div class="col-span-4 sm:col-span-1">
                <div class="mt-1 flex rounded-md shadow-sm">
                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Settings ID
                    </span>
                  <input type="text" id="github-owser" placeholder="######"
                         v-model="settingid"
                         class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                </div>
              </div>
            </div>

            <div class="mt-6 flex rounded-md shadow-sm">
              <span
                  class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                Usercentrics Url
              </span>
              <input type="text" readonly v-model="usercentrics"
                     class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300 bg-gray-50 cursor-not-allowed"/>
              <a :href="usercentrics" target="_blank"
                 class="inline-flex items-center px-3 rounded-r-md border border-l-0 rounded-none rounded-r-md border-gray-300 bg-gray-50 text-gray-500 text-sm">
                <ExternalLinkIcon class="h-5 w-5 text-gray-500"/>
              </a>
            </div>
            <div v-if="errormessage != null" class="text-red-500 mt-6">{{ errormessage }}</div>
          </div>
          <div v-if="showButton" class="px-4 py-3 bg-gray-50 text-center sm:px-6">
            <button @click="fetchJson"
                    class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Get Json
            </button>
          </div>
        </div>
      </div>
      <VueUsercentricsData v-if="json" :json="json"/>
    </div>
  </div>
</template>

<script>
import VueUsercentricsData from './components/VueUsercentricsData.vue'
import moment from 'moment'
import { ExternalLinkIcon } from '@heroicons/vue/solid'

export default {
  name: 'App',
  components: {
    VueUsercentricsData,
    ExternalLinkIcon
  },
  data: () => {
    return {
      ratelimit: null,
      json: null,
      fetchTime: null,
      spinner: false,
      showButton: true,
      errormessage: null,
      settingid: '######'
    }
  },
  computed: {
    usercentrics () {
      return `https://api.usercentrics.eu/settings/${this.settingid}/latest/de.json`
    }
  },
  created () {
    moment.locale('de-DE')
    const uri = window.location.search.substring(1)
    const params = new URLSearchParams(uri)
    if (params.get('settingid') !== null) {
      this.settingid = params.get('settingid')
    }

    this.errormessage = null
    this.json = null
  },
  methods: {
    fetchJson (url) {
      this.spinner = true
      this.json = null
      this.errormessage = null
      fetch(this.usercentrics, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json'
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('HTTP status ' + response.status)
          }
          return response.json()
        })
        .then(json => {
          this.json = json
          this.spinner = false
          this.showButton = false
        })
        .catch((error) => {
          this.errormessage = error
          this.spinner = false
          this.showButton = true
        })
    }
  }
}
</script>

<style>
.loader {
  border-top-color: #3498db !important;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
