<script setup>
  import {ref} from "vue"
  import db from "../firebase/config"
  import { collection, getDocs } from "firebase/firestore"
  import {formatDate} from "../composables/useFormatDate"

  import Skeleton from "../components/Skeleton.vue"

  const catOfTheDay = ref(false)
  const images = ref([])
  const imageLoaded = ref(false)

  async function getProjects() {
    try {
      let res = await getDocs(collection(db,'images'))
      let data = res.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      images.value = data
      images.value.forEach(img => {
        img.formatDate = formatDate(img.date)
      })
      images.value.sort((a,b) => b.date - a.date)
      catOfTheDay.value = images.value.shift()
    }
    catch(err) {
      console.log(err)
      state.error = err.message
    }  
  }
  getProjects()

  function handleLoad() {
    imageLoaded.value = true
  }
</script>

<template>
  <div class="container my-5">
    <!-- GATO DEL DIA -->
    <article class="gato-del-dia mb-5">
      <Skeleton v-if="!catOfTheDay" width="100%" height="450px"/>
      <RouterLink v-else  :to="{ name: 'catProfile', params: {id: catOfTheDay.slug} }">
        <div class="row g-0">
          <div class="col-lg-4 order-1 order-lg-0">
            <div class="gato-del-dia__info">
              <div>
                <h3 class="fw-bold">CAT OF THE DAY</h3>
                <h4 class="mt-2">{{ catOfTheDay.title }}</h4>
                <p class="small muted mt-2">{{ catOfTheDay.formatDate }}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-8 order-0 order-lg-1">
            <img @load="handleLoad" class="gato-del-dia__imagen img-fluid" :src="catOfTheDay.url"/>
          </div> 
        </div>
      </RouterLink>
    </article>
    <!-- GALERIA DE GATOS -->
    <section class="galeria-gatos">
      <div class="row" v-if="images.length">
        <div class="col-lg-4 mt-4" v-for="(img, i) in images">
          <article class="card-gato">
            <RouterLink :to="{ name: 'catProfile', params: {id: img.slug}, meta: {title: img.title} }">
              <img class="img-fluid" :src="img.url" :title="img.title" loading="lazy"/>
              <h4 class="mt-2 fw-bold small">{{ img.title }}</h4>
              <p class="small muted mt-2">{{ img.formatDate }}</p>
            </RouterLink>
          </article>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-lg-4 mt-4" v-for="img in 7">
          <Skeleton width="100%" height="250px"/>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">

  .gato-del-dia {
    border-radius: 10px;
    overflow: hidden;
    
    a {
      text-decoration: none;
      color: black;
    }

    .gato-del-dia__imagen {
      min-height: 450px;
      max-height: 450px;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    
    .gato-del-dia__info {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 2em;
      background: #f3f3f3;
    }

    &:hover {
      opacity: 0.9;
    }
  }

  .galeria-gatos {

    .card-gato {

      img {
        min-height: 250px;
        width: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0px 0px;
      }

      a {
        text-decoration: none;
        color: black;
      }

      &:hover {
        opacity: 0.9;
      }
    }
  }

  @media(max-width: 990px) {

    .gato-del-dia {

      .skeleton {
        height: 200px !important;
      }

      .gato-del-dia__imagen {
        min-height: unset;
        object-fit: unset;
      }

      .gato-del-dia__info {
        font-size:  0.98em;
      }
    }
  }
</style>
