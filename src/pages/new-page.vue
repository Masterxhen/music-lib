<template>
  <q-page class="q-ma-xl">
    <!-- {{$store.getters.getMusicList}} -->
    <div class="row">
      <div class="col">
        <q-list bordered class="bg-grey-6">
          <q-item clickable v-ripple v-for="(music, index) in $store.getters['musicStore/getMusicList']" :key="index">
            <q-item-section>{{music.singer}}</q-item-section>
            <q-item-section>{{music.name}}</q-item-section>
            <q-item-section avatar>
              <q-btn round @click="editMusic(music, index)" color="primary" icon="edit" />
              <q-btn round @click="delMusic(index)" color="red" icon="delete" />
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn @click="$router.push('/')" label="Go to root page"></q-btn>
        <!-- <ul style="color: red;">
          <li class="text-subtitle1" v-for="(music, index) in musicList" v-bind:key="index" >
            {{index}}: {{music.name}} by {{music.singer}}
            <button @click="editMusic(music, index)">Edit</button>
            <button @click="delMusic(index)">Delete</button>
          </li>
        </ul> -->
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-12">
        <input type="text" name="" v-model="text" placeholder="Name" id="">
      </div>
      <div class="col-12">
        <input type="text" name="" v-model="singer" placeholder="Artist" id="">
      </div>
      <button @click="edit ? updateMusic() : addMusic()">{{edit ? "Update Music" : "Add Music"}}</button>
      2nd way
      <button v-if="edit" @click="updateMusic()">Update Music</button>
      <button v-else @click="addMusic()">Add Music</button>
      <button @click="cleartext()">Cancel</button>
    </div> -->
    <q-dialog v-model="showfrm" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 350px">
        <q-card-section>
          <div class="text-h6">{{edit ? "Update Music" : "Add Music"}}</div>
        </q-card-section>

        <q-card-section>
          <q-input standout="bg-teal text-white" v-model="text" label="Name of Music" />
          <q-input standout="bg-teal text-white" v-model="singer" label="Name of Artist" />
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat :label="edit ? 'Update Music' : 'Add Music' " @click="edit ? updateMusic() : addMusic()"/>
          <q-btn flat label="cancel" @click="cleartext()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="showfrm = true" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      // comes from the database
      musicList: [
        {name: "Manok na Pula", singer: "Vic Desucatan"},
        {name: "Just Another Woman in Love", singer: "Anne Murray"}
      ],
      text: "",
      singer: "",
      edit: false,
      index: null,
      showfrm: false
    }
  },
  mounted () {
    console.log(this.$store.getters)
  },
  methods: {
    addMusic () {
      this.$store.dispatch('musicStore/ADD_MUSIC', {
        name: this.text,
        singer: this.singer
      })
      this.cleartext()
    },
    cleartext() {
      this.edit = false
      this.text = ""
      this.singer = ""
      this.showfrm = false
    },
    editMusic (music, index) {
      // console.log(this.$store.getters)
      console.log(music)
      this.showfrm = true
      this.index = index
      this.edit = true
      this.text = music.name
      this.singer = music.singer
    },
    delMusic (index) {
      this.$store.dispatch('musicStore/DEL_MUSIC',index)
      alert("Music data has been deleted!")
    },
    updateMusic () {
      console.log('Edit index', this.index)
      this.$store.dispatch('musicStore/UPDATE_MUSIC', {
        name: this.text,
        singer: this.singer,
        // i add the index inside since vuex accepts one parameter
        index: this.index
      }, this.index)
      this.cleartext()
    }
  }
}
</script>
