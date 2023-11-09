import * as THREE from 'three';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { mapRange, lerp } from 'canvas-sketch-util/math';
import Random from 'canvas-sketch-util/random';
import useStore from './store'
// Function to print next generation
function nextGeneration(grid, M, N,O ){

    //console.log(grid);
    let future = new Array(M);
    for(let i = 0; i < M; i++){
      future[i] = new Array(N);
      for (let j = 0; j < N; j++) {
        future[i][j] = new Array(O).fill(0);
      }
        //future[i] = new Array(N).fill(0);
    }

    // Loop through every cell
    for(let l=0;l<M;l++){
        for(let m=0;m<N;m++){
          for (let h = 0; h < O; h++) {
            // finding no Of Neighbours that are alive
            let aliveNeighbours = 0
            for(let i = -1; i < 2; i++)
            {
                for(let j = -1; j < 2; j++)
                {
                  for(let k = -1; k < 2; k++)
                  {
                    if ((l + i >= 0 && l + i < M) && (m + j >= 0 && m + j < N) && (k+h >= 0 && k+h < O))
                        aliveNeighbours += grid[l + i][m + j][k+h]
                    }
                }
            }

            // The cell needs to be subtracted from
            // its neighbours as it was counted before
            aliveNeighbours -= grid[l][m][h]

            // Implementing the Rules of Life

            // Cell is lonely and dies
            if ((grid[l][m][h] == 1) && (aliveNeighbours < 4))
                future[l][m][h] = 0

            // Cell dies due to over population
            else if ((grid[l][m][h] == 1) && (aliveNeighbours > 6))
                future[l][m][h] = 0

            // A new cell is born
            else if ((grid[l][m][h] == 0) && (aliveNeighbours == 4))
                future[l][m][h] = 1

            // Remains the same
            else
                future[l][m][0] = grid[l][m][0]
        }
      }
    }
    //console.log(future);
    //console.log(future,grid);
    return future
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
function gridInit(M,N,O){
  const my3DArray = create3DArray(M, N,O);


  // Set the desired values
  // my3DArray[7][5][4] = 1;
  // my3DArray[7][7][4] = 1;
  // my3DArray[5][7][4] = 1;
  // my3DArray[5][5][4] = 1;
  //
  // my3DArray[7][8][5] = 1;
  // my3DArray[8][7][5] = 1;
  // my3DArray[4][5][5] = 1;
  // my3DArray[5][4][5] = 1;
  // my3DArray[4][7][5] = 1;
  // my3DArray[7][4][5] = 1;
  // my3DArray[8][7][5] = 1;
  // my3DArray[8][5][5] = 1;
  // my3DArray[5][8][5] = 1;
  //
  //
  //   my3DArray[7][8][7] = 1;
  //   my3DArray[8][7][7] = 1;
  //   my3DArray[4][5][7] = 1;
  //   my3DArray[5][4][7] = 1;
  //   my3DArray[4][7][7] = 1;
  //   my3DArray[5][4][7] = 1;
  //   my3DArray[8][7][7] = 1;
  //   my3DArray[8][5][7] = 1;
  //     my3DArray[5][8][7] = 1;
  //
  //     my3DArray[7][5][8] = 1;
  //     my3DArray[7][7][8] = 1;
  //     my3DArray[5][7][8] = 1;
  //     my3DArray[5][5][8] = 1;

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




  return my3DArray

}




export function Stars({ count, offset, grid }) {
  const group = useRef();
  const mat = useRef();
  let [particles, setParticles] = useState([]);
  const { size, viewport } = useThree();
  const actions = useStore((state) => state.actions)

  const mutation = useStore((state) => state.mutation)


    let M = 15,N = 15,O=15

    useEffect(() => {

      if(mutation.isPlaying){
        // Update the grid and particles when the mutation or action updates
        if(mutation.curr_step>0){
          //console.log(mutation.curr_step>1);
            //console.log(grid);
            // if (!grid){
            //   grid = mutation.curr_grid
            // }
            // console.log(mutation.curr_grid);
            grid = nextGeneration(mutation.curr_grid, M, N,O);

            mutation.curr_grid=grid
            actions.updateGrid(mutation.curr_grid)
            //mutation.grid =
            //console.log(grid);
        }
        //console.log(particles);

        const newParticles = particles.map((particle, index) => {

          const h = index % M;
          const j = Math.floor(index / M)%N;
          const i = Math.floor(index / M/N)%O;

          //console.log(grid);
          //console.log(i,j);
          //console.log(i,j,h);
          const color = "white"//grid[i][j][h] === 1 ? "white" : "black";
          const opacity = 1//grid[i][j][h] === 1 ? 1 : 0;
          const scale = particle.scale
          const targetScale = grid[i][j][h] === 1 ? 1 : 0;
          return { ...particle, color,opacity,scale,targetScale };
        });
        //console.log(grid);
        // Use setParticles to update the state
        // console.log(newParticles);
        setParticles(newParticles);
      }
    }, [mutation.curr_step, actions.updateCurrStep]);
    useEffect(() => {
      //console.log('hit');

      grid = mutation.grid
      mutation.curr_step = 0;
      //console.log(grid, mutation.grid);
    }, [mutation.grid]);
      //
      useFrame(() => {
        // Gradually update the scale in each frame
        const newParticles = particles.map((particle, index) => {


            // Smoothly transition the scale over time
            const newScale = THREE.MathUtils.lerp(particle.scale, particle.targetScale, 0.5);



          return { ...particle, scale: newScale };
        });

        setParticles(newParticles);
      });
      // Generate particles with initial positions (if not already initialized)
      useEffect(() => {

        if(!grid){
          console.log('none');
          grid = gridInit(M,N,O)
        }
        // /console.log(grid);

          const temp = [];
          actions.updateGrid(grid)

          for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
              for (let h = 0; h < O; h++) {

                 const xFactor = j * 3;
                 const yFactor = (M) - (i * 3);
                 const zFactor = (O * 3) - (h * 3);
                const emission = Math.random() * 5 + 1;
                const color = "white"//grid[i][j][h] === 1 ? "white" : "black";
                const opacity = 1//grid[i][j][h] === 1 ? 1 : 0;
                const scale = grid[i][j][h] === 1 ? 1 : 0;
                const targetScale = grid[i][j][h] === 1 ? 1 : 0;
                temp.push({ xFactor, yFactor, zFactor, emission, color,opacity,scale,targetScale });
              }
            }
          }
          //console.log(temp);
          setParticles(temp); // Initialize or update particles state


      }, []);


   return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh key={index} scale = {particle.scale} position={[particle.xFactor, particle.yFactor, particle.zFactor]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshPhysicalMaterial ref={mat} color="gold" emissive={particle.color} emissiveIntensity={0.25} transparent={true} opacity ={particle.opacity} roughness = {0.1}  metalness ={0.5}/>
        </mesh>
      ))}
    </group>
  );
}
