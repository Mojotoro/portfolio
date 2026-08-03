import * as THREE from "three";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const stage = document.querySelector("[data-model-viewer]");

if (stage) {
  window.__modelViewerStarted = true;
  const canvas = stage.querySelector("canvas");
  const loading = stage.querySelector(".model-loading");
  const progress = stage.querySelector("[data-model-progress]");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 10000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const controls = new OrbitControls(camera, canvas);
  const modelRoot = new THREE.Group();
  const neutralLighting = Boolean(stage.dataset.glb);
  let autoRotate = !matchMedia("(prefers-reduced-motion: reduce)").matches;

  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = neutralLighting ? 1.4 : 1.15;
  scene.add(modelRoot);
  scene.add(new THREE.HemisphereLight(neutralLighting ? 0xffffff : 0xfff7ed, neutralLighting ? 0x8f8b85 : 0x6f6257, neutralLighting ? 3.6 : 2.8));

  const key = new THREE.DirectionalLight(0xffffff, neutralLighting ? 4.2 : 3.2);
  key.position.set(4, 7, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(neutralLighting ? 0xffffff : 0xe79a54, neutralLighting ? 2.1 : 1.4);
  fill.position.set(-5, 2, -3);
  scene.add(fill);

  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.autoRotateSpeed = 0.7;
  controls.enablePan = false;

  function updateProgress(event) {
    const expectedBytes = Number(stage.dataset.modelBytes) || 0;
    const total = event.total || expectedBytes;
    if (!total) {
      progress.textContent = "กำลังรับข้อมูล…";
      return;
    }
    progress.textContent = `${Math.min(99, Math.round((event.loaded / total) * 100))}%`;
  }

  function frameModel(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxSize = Math.max(size.x, size.y, size.z);
    object.position.sub(center);
    const fitSize = Math.max(size.y, size.x / Math.max(camera.aspect, 1));
    const distance = fitSize / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    camera.position.set(distance * 0.32, distance * 0.2, distance * 1.48);
    camera.near = Math.max(maxSize / 1000, 0.01);
    camera.far = distance * 20;
    camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0);
    controls.minDistance = maxSize * 0.45;
    controls.maxDistance = maxSize * 3;
    controls.update();
  }

  function prepareModel(object) {
    object.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = false;
      child.receiveShadow = false;
      const list = Array.isArray(child.material) ? child.material : [child.material];
      list.forEach((material) => {
        material.side = THREE.DoubleSide;
        if (material.map) material.map.colorSpace = THREE.SRGBColorSpace;
      });
    });
    modelRoot.add(object);
    frameModel(modelRoot);
    progress.textContent = "100%";
    loading.classList.add("is-done");
    stage.classList.add("is-ready");
  }

  if (stage.dataset.glb) {
    new GLTFLoader().load(stage.dataset.glb, (gltf) => prepareModel(gltf.scene), updateProgress, showError);
  } else {
    const materialLoader = new MTLLoader();
    materialLoader.load(stage.dataset.mtl, (materials) => {
    materials.preload();
    const objectLoader = new OBJLoader();
    objectLoader.setMaterials(materials);
    objectLoader.load(stage.dataset.obj, prepareModel, updateProgress, showError);
    }, updateProgress, showError);
  }

  function showError(error) {
    console.error("3D model failed to load", error);
    loading.querySelector("strong").textContent = "ไม่สามารถโหลดโมเดล 3D ได้";
    progress.textContent = "ลองรีเฟรชหน้าอีกครั้ง";
    loading.classList.add("has-error");
  }

  window.setTimeout(() => {
    if (stage.classList.contains("is-ready") || loading.classList.contains("has-error")) return;
    loading.querySelector("strong").textContent = "โมเดลใช้เวลาโหลดนานกว่าปกติ";
    progress.textContent = "กำลังลองโหลดต่อ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต";
  }, 30000);

  function resize() {
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  resize();
  canvas.addEventListener("dblclick", () => { autoRotate = !autoRotate; });

  function draw() {
    controls.autoRotate = autoRotate;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  }
  draw();
}
