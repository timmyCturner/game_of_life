import * as THREE from 'three';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { mapRange, lerp } from 'canvas-sketch-util/math';
import Random from 'canvas-sketch-util/random';
import useStore from './store'
// Function to print next generation
function nextGeneration(grid, M, N){

    //console.log(grid);
    let future = new Array(M);
    for(let i = 0; i < M; i++){
        future[i] = new Array(N).fill(0);
    }

    // Loop through every cell
    for(let l=0;l<M;l++){
        for(let m=0;m<N;m++){

            // finding no Of Neighbours that are alive
            let aliveNeighbours = 0
            for(let i = -1; i < 2; i++)
            {
                for(let j = -1; j < 2; j++)
                {
                    if ((l + i >= 0 && l + i < M) && (m + j >= 0 && m + j < N))
                        aliveNeighbours += grid[l + i][m + j]
                }
            }

            // The cell needs to be subtracted from
            // its neighbours as it was counted before
            aliveNeighbours -= grid[l][m]

            // Implementing the Rules of Life

            // Cell is lonely and dies
            if ((grid[l][m] == 1) && (aliveNeighbours < 2))
                future[l][m] = 0

            // Cell dies due to over population
            else if ((grid[l][m] == 1) && (aliveNeighbours > 3))
                future[l][m] = 0

            // A new cell is born
            else if ((grid[l][m] == 0) && (aliveNeighbours == 3))
                future[l][m] = 1

            // Remains the same
            else
                future[l][m] = grid[l][m]
        }
    }
    //console.log(future);
    //console.log(future);
    return future
}






export function Stars({ count, offset, grid }) {
  const group = useRef();
  const mat = useRef();
  let [particles, setParticles] = useState([]);
  const { size, viewport } = useThree();
  const actions = useStore((state) => state.actions)

  const mutation = useStore((state) => state.mutation)


    let M = 10,N = 10

    useEffect(() => {
        // Update the grid and particles when the mutation or action updates
        if(mutation.curr_step>0){
          //console.log(mutation.curr_step>1);
            //console.log(grid);
            grid = nextGeneration(mutation.curr_grid, M, N);
            mutation.curr_grid=grid
            actions.updateGrid(mutation.curr_grid)
            //mutation.grid =
            //console.log(grid);
        }

        const newParticles = particles.map((particle, index) => {
          const i = Math.floor(index / N);
          const j = index % N;
          const color = grid[i][j] === 0 ? "white" : "black";
          return { ...particle, color };
        });
        //console.log(grid);
        // Use setParticles to update the state
        setParticles(newParticles);
      }, [mutation.curr_step, actions.updateCurrStep]);

      // Generate particles with initial positions (if not already initialized)
      useEffect(() => {
        const temp = [];
        actions.updateGrid(grid)
        //console.log(grid);
        for (let i = 0; i < M; i++) {
          for (let j = 0; j < N; j++) {
            const xFactor = j * 3;
            const yFactor = (M * 3) - (i * 3);
            const zFactor = 0;
            const emission = Math.random() * 5 + 1;
            let color = grid[i][j] === 0 ? "white" : "black";

            temp.push({ xFactor, yFactor, zFactor, emission, color });
          }
        }

        setParticles(temp); // Initialize or update particles state
      }, []);


   return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh key={index} position={[particle.xFactor, particle.yFactor, particle.zFactor]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhysicalMaterial ref={mat} color="gold" emissive={particle.color} emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}
