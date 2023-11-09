import shallow from 'zustand/shallow';
import { OrbitControls} from '@react-three/drei';
import { useState, useEffect } from 'react';

import { Stars } from './Stars';

import {  useFrame } from '@react-three/fiber'

import useStore from './store'

const colors = {

  malevolentIllusion: [
    '#9ac069',
    '#a8de77',
    '#b4df86',
    '#c0d998',
    '#c6eead',
    '#c9f9c6',
],
  sunnyRainbow: [
    '#431C0D',
    '#6E3907',
    '#A85604',
    '#FFB600',
    '#FFD200',
    '#FFE74C',
    '#FFED7D'
  ],
  blackRainbow: [
    '#05070A',
    '#1E2A3A',
    '#3D4D5C',
    '#6E879C',
    '#AAB9C9',
    '#CED8E4',
    '#E4EBF1'
  ],
};
// function create3DArray(rows, cols, depth) {
//   const array3D = new Array(rows);
//   for (let i = 0; i < rows; i++) {
//     array3D[i] = new Array(cols);
//     for (let j = 0; j < cols; j++) {
//       array3D[i][j] = new Array(depth).fill(0);
//     }
//   }
//   return array3D;
// }


export function Scene({ init = true, mouse, cameraRef, jsonData,prevMutation,setPrevMutation }) {

  //const [prevMutation, setPrevMutation] = useState(mutation);

  // let grid = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  //     [ 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ],
  //     [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
  //     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  //     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  //     [ 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ],
  //     [ 0, 0, 1, 1, 0, 0, 0, 0, 0, 0 ],
  //     [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 ],
  //     [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
  //     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  // ]
  // const my3DArray = create3DArray(100, 100, 100);
  //
  // // Set the desired values
  // my3DArray[1][3][3] = 1;
  // my3DArray[1][4][3] = 1;
  // my3DArray[1][5][3] = 1;
  //
  // my3DArray[2][2][3] = 1;
  // my3DArray[3][2][3] = 1;
  // my3DArray[4][2][3] = 1;
  //
  // my3DArray[5][3][3] = 1;
  // my3DArray[5][4][3] = 1;
  // my3DArray[5][5][3] = 1;
  //
  // my3DArray[2][6][3] = 1;
  // my3DArray[3][6][3] = 1;
  // my3DArray[4][6][3] = 1;
  let needsUpdate = true;


  // <Shapes count={10} offset={4}   />
  // <Shapes2 count={10} offset={4}   />

  return (
    <>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableRotate={true}
        enableZoom={true}


      />



      <ambientLight distance={100} intensity={2} color="#e7f7b0" />
      <group >


        <Stars count={10} offset={1}  />





      </group>
    </>
  );
}
