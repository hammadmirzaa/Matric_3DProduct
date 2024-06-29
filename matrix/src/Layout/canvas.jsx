import React from "react";
import SwatchWrapper from "./swatchWrapper";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import gsap from 'gsap';
import { LinearSRGBColorSpace } from 'three';



class Canvas extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.InitialSetup()
    }
    InitialSetup = ()=>{
        this.container = document.getElementById('container');
        const item =this.container.getBoundingClientRect();
        this.sizes = {
            width: item.width,
            height: item.height,
          };
      
          this.canvas = document.querySelector('canvas.webgl');
          this.scene = new THREE.Scene();
          this.camera = new THREE.PerspectiveCamera(
            45,
            this.sizes.width / this.sizes.height,
            10,
            5000
          );
          this.camera.position.set(150, 20, 100);
          this.scene.add(this.camera);
      
          this.manager = new THREE.LoadingManager();
          this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
            const ProgressVal = (itemsLoaded / itemsTotal) * 100;
            if (ProgressVal === 100) {
              console.log("loaded");
            }
          };
          this.controls = new OrbitControls(this.camera, this.canvas);
          this.controls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN,
          };
          // this.controls.addEventListener('change', () => {});
          // this.controls.maxDistance = 150;
          // this.controls.minDistance = 100;
          this.controls.enableDamping = true;
          this.controls.autoRotate = true;
          this.controls.autoRotateSpeed = 2;
          this.controls.enablePan = false;
          this.controls.enableZoom = false;
          //  this.controls.minPolarAngle = -Math.PI / 2;
          this.controls.maxPolarAngle = Math.PI / 1.9;
      
          this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
          });
          this.renderer.setSize(this.sizes.width, this.sizes.height);
          this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
          this.renderer.toneMappingExposure = 1;
          this.renderer.outputEncoding = THREE.LinearSRGBColorSpace;
          this.renderer.shadowMap.enabled = true;
        this.loadHDR();
    this.addModel();
    window.addEventListener('resize', this.resize);

    const render = () => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(render);
    };
    render();
      
    };
    loadHDR = () =>{};
    addModel = () => {
        const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`;
        const DRACO_LOADER = new DRACOLoader(this.manager).setDecoderPath(
          `${THREE_PATH}/examples/js/libs/draco/gltf/`
        );
    
        const bag = 'bag.glb';
        const GLtfLoader = new GLTFLoader(this.manager).setDRACOLoader(
            DRACO_LOADER
          );
          GLtfLoader.load(bag, (gltf) => {
            this.scene.add(gltf.scene)
          }, undefined, (error) => {
            console.error('Error loading GLB file:', error);
          });
    }
  render() {
    const { activeData, swatchData, handleSwatchClick } = this.props;
    return (
      <div id="container" className="w-full h-3/5 relative z-10 lg:w-1/2 lg:h-full">
      <canvas className="webgl w-full h-full relative z-10"></canvas>

        <SwatchWrapper
          activeData={activeData}
          swatchData={swatchData}
          handleSwatch={handleSwatchClick}
        />
      </div>
    );
  }
}

export default Canvas;


