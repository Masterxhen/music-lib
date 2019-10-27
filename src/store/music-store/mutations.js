// import the vue object
// import Vue from 'vue'

export function updateMusic (state, data) {
  // vue update method. Same as the this.$set()
  // Vue.set(state.musicList,index, data)
  state.musicList[data.index] = {
    name: data.name,
    singer: data.singer
  }
}
export function deleteMusic (state, index) {
  console.log(state.musicList[index])
  state.musicList.splice(index, 1)
}
export function addMusic (state, data) {
  state.musicList.push(data)
}
