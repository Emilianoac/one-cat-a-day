<script setup>
  import {ref} from "vue"
  import { useRoute } from "vue-router"
  import db from "@/firebase/config"
  import {collection, getDocs, query, where } from "firebase/firestore"
  import {formatDate} from "../composables/useFormatDate"

  import Skeleton from "../components/Skeleton.vue"

  const route = useRoute()
  const catData = ref(false)
  const imageLoaded = ref(false)

  async function getData() {
    try {
      const q = query(collection(db,"images"), where("slug", "==", route.params.id))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        querySnapshot.forEach( doc => {
          let data = doc.data()
          data.id = doc.id
          catData.value = data
      
          catData.value.formatDate = formatDate(catData.value.date)
          document.title = `${catData.value.title} | One cat a day`  
        })
      } else {
        throw new Error('Esta imagen no existe')
      }
    }
    catch(err) {
      console.log(err)
    }
  }
  getData()

  function handleLoad() {
    imageLoaded.value = true
  }
</script>

<template>
  <div class="container my-4">  
    <div class="gato-perfil">
      <div class="row mb-4">
        <div class="col-12">
          <RouterLink class="btn btn-link text-dark p-0" to="/"><i class="fas fa-arrow-left"></i> Return to home</RouterLink>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8">
          <h1 class="gato-titulo fw-bold text-uppercase d-block d-lg-none mb-4">{{ catData.title }}</h1>
          <p class="small d-block d-lg-none">{{ catData.formatDate }}</p>
          <Skeleton v-show="!imageLoaded" width="100%" height="500px"/>
          <img 
            v-if="catData"
            class="gato-imagen img-fluid" 
            :src="catData.url" 
            :title="catData.title"
            @load="handleLoad()"
          />
        </div>
        <div class="col-lg-4">
          <Skeleton v-if="!catData" width="100%" height="500px"/>
          <div v-else class="gato-informacion">
            <p class="small d-none d-lg-block">{{ catData.formatDate }}</p>
            <h1 class="gato-titulo fw-bold text-uppercase d-none d-lg-block">{{ catData.title }}</h1>
            <dl class="mt-4">
              <dt>Model</dt>
              <dd>{{ catData.params.model }}</dd>
              
              <dt>Seed</dt>
              <dd>{{ catData.params.seed }}</dd>
  
              <dt>Steps</dt>
              <dd>{{ catData.params.steps }}</dd>
  
              <dt>Dimensions</dt>
              <dd>{{ catData.params.dimensions.width }} x {{ catData.params.dimensions.height }}</dd>
  
              <dt>CFG scale</dt>
              <dd>{{  catData.params.cfg_scale }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">

  .gato-perfil {

    .gato-titulo {
      font-size: 1.5em;
    }

    .gato-imagen {
      border-radius: 10px;
    }
    
    .gato-informacion {

      dl dd {
        background-color: #f0efef;
        padding: 0.6em;
        border-radius: 4px;
      }
    }
  }

  @media(max-width: 575px) {

    .gato-perfil {

      .gato-titulo {
        font-size: 1.3em;
      }
    }
  }
</style>