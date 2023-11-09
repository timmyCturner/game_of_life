import * as THREE from 'three';
import React, {  useState, useEffect,  useCallback, useRef, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';

import { EffectComposer, Bloom } from  '@react-three/postprocessing'
import { Scene } from './Scene';

import useStore from './store'
// import './css/default.css'
// import './css/fonts.css'
// import './css/layout.css'


export default function App() {

  const M = 15;
  const N = 15;
  const O = 15;
  const cameraRef = useRef();
  const init = useStore((state) => state.init);
  const setInit = useStore((state) => state.setInit);
  const actions = useStore((state) => state.actions)

  const mutation = useStore((state) => state.mutation)

  const fov = 75
  let needsUpdate = true;

  const [intervalId, setIntervalId] = useState(null);
  const intervalTime = 1000; // Initial interval time is 3 seconds
  const [sliderValue, setSliderValue] = useState(20);

  function handleInputChange(event) {
    const newValue = event.target.value;
    setSliderValue(newValue);
    changeIntervalTime(newValue*40)
  }
  function create3DArray(rows, cols, depth) {
    const array3D = new Array(rows);
    for (let i = 0; i < rows; i++) {
      array3D[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        array3D[i][j] = new Array(depth).fill(0);
      }
    }
    return array3D;
  }
  function setRandom(){

    const array = create3DArray(M,N,O)
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < M; j++) {
        for (let k = 1; k < O; k++) {
          var random_boolean = (Math.random() < 0.2)? 1 : 0;

          array[i][j][k]=random_boolean
        }
      }
    }

    mutation.curr_grid = array
  }
  function setCircle(){

    const my3DArray = create3DArray(M,N,O)
    my3DArray[1][3][3] = 1;
    my3DArray[1][4][3] = 1;
    my3DArray[1][5][3] = 1;

    my3DArray[2][2][3] = 1;
    my3DArray[3][2][3] = 1;
    my3DArray[4][2][3] = 1;

    my3DArray[5][3][3] = 1;
    my3DArray[5][4][3] = 1;
    my3DArray[5][5][3] = 1;

    my3DArray[2][6][3] = 1;
    my3DArray[3][6][3] = 1;
    my3DArray[4][6][3] = 1;

    mutation.curr_grid = my3DArray
  }
  function setStairs(){

    const my3DArray = create3DArray(M,N,O)

    my3DArray[2][1][2] = 1;
    my3DArray[1][2][3] = 1;
    my3DArray[1][1][3] = 1;
    my3DArray[2][2][3] = 1;

    my3DArray[12][11][12] = 1;
    my3DArray[11][12][13] = 1;
    my3DArray[11][11][13] = 1;
    my3DArray[12][12][13] = 1;

    my3DArray[2][1][12] = 1;
    my3DArray[1][2][13] = 1;
    my3DArray[1][1][13] = 1;
    my3DArray[2][2][13] = 1;



    mutation.curr_grid = my3DArray
  }
  function setCube(){

    const my3DArray = create3DArray(M,N,O)

    // Set the desired values
    my3DArray[7][5][4] = 1;
    my3DArray[7][7][4] = 1;
    my3DArray[5][7][4] = 1;
    my3DArray[5][5][4] = 1;

    my3DArray[7][8][5] = 1;
    my3DArray[8][7][5] = 1;
    my3DArray[4][5][5] = 1;
    my3DArray[5][4][5] = 1;
    my3DArray[4][7][5] = 1;
    my3DArray[7][4][5] = 1;
    my3DArray[8][7][5] = 1;
    my3DArray[8][5][5] = 1;
    my3DArray[5][8][5] = 1;


      my3DArray[7][8][7] = 1;
      my3DArray[8][7][7] = 1;
      my3DArray[4][5][7] = 1;
      my3DArray[5][4][7] = 1;
      my3DArray[4][7][7] = 1;
      my3DArray[5][4][7] = 1;
      my3DArray[8][7][7] = 1;
      my3DArray[8][5][7] = 1;
        my3DArray[5][8][7] = 1;

        my3DArray[7][5][8] = 1;
        my3DArray[7][7][8] = 1;
        my3DArray[5][7][8] = 1;
        my3DArray[5][5][8] = 1;


    mutation.curr_grid = my3DArray

  }
  function setFactory(){

    const my3DArray = create3DArray(M,N,O)

    // Set the desired values
    my3DArray[7][5][4] = 1;
    my3DArray[7][7][4] = 1;
    my3DArray[5][7][4] = 1;
    my3DArray[5][5][4] = 1;

    my3DArray[7][8][5] = 1;
    my3DArray[8][7][5] = 1;
    my3DArray[4][5][5] = 1;
    my3DArray[5][4][5] = 1;
    my3DArray[4][7][5] = 1;
    my3DArray[7][4][5] = 1;
    my3DArray[8][7][5] = 1;
    my3DArray[8][5][5] = 1;
    my3DArray[5][8][5] = 1;


      my3DArray[7][8][7] = 1;
      my3DArray[8][7][7] = 1;
      my3DArray[4][5][7] = 1;
      my3DArray[5][4][7] = 1;
      my3DArray[4][7][7] = 1;
      my3DArray[5][4][7] = 1;
      my3DArray[8][7][7] = 1;
      my3DArray[8][5][7] = 1;
        my3DArray[5][8][7] = 1;

        my3DArray[7][5][8] = 1;
        my3DArray[7][7][8] = 1;
        my3DArray[5][7][8] = 1;
        my3DArray[5][5][8] = 1;


    mutation.curr_grid = my3DArray

  }
  function setWonky(){

    const my3DArray = create3DArray(M,N,O)

    my3DArray[1][1][2] = 1;

    my3DArray[1][2][3] = 1;
    my3DArray[2][1][3] = 1;
    my3DArray[1][1][3] = 1;
    my3DArray[2][2][3] = 1;

    my3DArray[1][2][5] = 1;
    my3DArray[2][1][5] = 1;
    my3DArray[1][1][5] = 1;
    my3DArray[2][2][5] = 1;

    my3DArray[2][2][4] = 1;

    mutation.curr_grid = my3DArray
  }
  function setInitHelp(value){
    setInit(true)
    mutation.isPlaying=value;

    setSliderValue(20);
    changeIntervalTime(20*40)
  }


  // Function to change the interval time
  const changeIntervalTime = (newTime) => {
    clearInterval(intervalId); // Clear the current interval
    const newIntervalId = setInterval(() => {
      mutation.curr_step+=1
      actions.updateCurrStep(mutation.curr_step)
      //console.log(mutation.curr_step);
    }, newTime);
    setIntervalId(newIntervalId);
  };
  const pause = () => {
    if (mutation.isPlaying == true)
      mutation.isPlaying = false;
  };
  const play = () => {
    if (mutation.isPlaying == false)
      mutation.isPlaying = true;
  };



 // The empty dependency array ensures this effect runs once when the component mounts

  return (

    <div style={{ width: '100vw', height: '100vh' }}>

      <Canvas
        linear
        mode="concurrent"
        dpr={[1, 5]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 100], fov }}


        onCreated={({ gl, camera }) => {

          gl.setClearColor(new THREE.Color('#175d65'))
        }}>
        <fog attach="fog" args={['#070710', 100, 700]} />
        <ambientLight intensity={1} />
        <directionalLight
        intensity={3}
          position={[2, 4, 3]}
          castShadow // Enable shadow casting
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />



        <group  rotation = {[0,0,0]}>

              <Scene cameraRef={cameraRef} />

        </group>

        <EffectComposer>
        <Bloom
          luminanceThreshold={0.1} // Adjust this threshold to control what parts of the scene glow
          luminanceSmoothing={0.1}
          intensity={0.1} // Increase this value to make the bloom effect more intense
          radius={0.05} // Adjust the radius to control the size of the bloom
        />
      </EffectComposer>

      </Canvas>

      {!init && (
        <div className="overlay">
          <div>
            <h1>Game Of Life 3D</h1>
            {true ? (
              <button onClick={() => setInitHelp(true)}>Play</button>
            ) : (
              <div className="loader">Loading…</div>
            )}
          </div>
        </div>
      )}
      <div className="content">
        <div className="range">
          <input type="range" min="1" max="100" value={sliderValue} id="range2" onChange={handleInputChange}/>
          <div className="value3">{(sliderValue*0.04).toFixed(2)} seconds</div>
        </div>
      </div>
      <div className = "presets">
        <button onClick={() => setStairs()}>Stairs Preset</button>
        <button onClick={() => setCircle()}>Circle Preset</button>

        <button onClick={() => setWonky()}>Wonky Preset</button>
        <button onClick={() => setFactory()}>Factory Preset</button>
        <button onClick={() => setRandom()}>Random Preset</button>
      </div>
      <div className = "bottom-buttons">
      <button className="play-pause"  onClick={() => play()} >
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <polygon points="30,20 30,80 80,50" fill="#000"/>
        </svg>
      </button>
      <button className="play-pause"  onClick={() => pause()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <rect x="30" y="20" width="10" height="60" fill="#000"/>
          <rect x="60" y="20" width="10" height="60" fill="#000"/>
        </svg>
      </button>
    </div>



    </div>
  );
}
