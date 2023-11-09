import * as THREE from 'three'

import { addEffect } from '@react-three/fiber'
import create from 'zustand'


// import * as audio from './audio'



const useStore = create((set, get) => {

  let isPlaying = true
  let initStart = false;
  let startTime =  0

  let length = 10;
  let curr_index = 0;
  return {

    camera: undefined,
    points: 0,
    init: false,


    setInit: () =>
      set(() => {
        initStart= true
        startTime = Date.now()

        //console.log(initStart=true);
        return { init: true };
      }),
      // Main function to handle both play and pause operations

    mutation: {
      t: 0,
      isPlaying: isPlaying,
      position: new THREE.Vector3(),
      startTime: startTime,
      originalStartTime: Date.now(),
      //rings: randomRings(10, track),
      curr_index: 0,
      curr_step: 0,
      curr_grid:null,
      particles: null,

      scale: 1,
      fov: 60,
      hits: false,
      looptime: 10 * 1000,
      binormal: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      clock: new THREE.Clock(false),
      mouse: new THREE.Vector2(-250, 50),
      speedFactor:1,

      // Re-usable objects
      dummy: new THREE.Object3D(),
    },

    actions: {
      init(camera) {
        //console.log(camera);
        const { mutation, actions } = get()

        set({ camera })
        mutation.clock.start()
        //actions.toggleSound(get().sound)
        addEffect(() => {

          // /console.log(mutation);
          let t = mutation.t
          //console.log(mutation.curr_index,mutation.needsAnimation,mutation.isPlaying,"=",isPlaying,mutation.waitingForAnimation);


          // else{



          //   //console.log('not isPlaying');
          //   if (mutation.waitingForAnimation) {
          //       //mutation.isPlaying = isPlaying = true;
          //       setTimeout(() => {
          //         //console.log('hit');
          //         // Change mutation.waitingForAnimation to false after 300 milliseconds
          //
          //         mutation.isPlaying = isPlaying = true;
          //
          //       }, 300);
          //     }
          // }
        })
      },
      updateCurrStep: (newStep) => {
        //console.log('updateCurrStep');
        set((state) => ({
          mutation: {
            ...state.mutation,
            curr_step: newStep,
          },
        }))
      },
      updateGrid: (newGrid) => {
        //console.log(newGrid);
        //console.log('updateCurrStep');
        set((state) => ({
          mutation: {
            ...state.mutation,
            curr_grid: newGrid,
          },
        }))
      },
      // updateWaitingForAnimation: (newBool) => {
      //   set((state) => ({
      //     mutation: {
      //       ...state.mutation,
      //       waitingForAnimation: newBool,
      //     },
      //   }))
      // },

    }
  }

})




export default useStore
// export { audio, playAudio }
