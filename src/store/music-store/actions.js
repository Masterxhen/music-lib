export function ADD_MUSIC (context, data) {
  context.commit('addMusic', data)
}
export function UPDATE_MUSIC (context, data, index) {
  // i tested on console but nothing is passed in the 3rd parameter
  console.log('index in actions: ',  index)
  context.commit('updateMusic', data)
}
export function DEL_MUSIC (context, index) {
  console.log(index)
  context.commit('deleteMusic', index)
}