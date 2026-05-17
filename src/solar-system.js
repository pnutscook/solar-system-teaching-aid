import * as THREE from 'three'
import { OrbitControls } from '../vendor/OrbitControls.js'
import { GLTFLoader } from '../vendor/loaders/GLTFLoader.js'

const teachingConfig = {
  title: '太阳系小学课堂教具',
  showRealValuesByDefault: false,
  autoMotionByDefault: true,
  defaultStepId: 'overview',
}

const nasaEarthModelPath = './assets/models/nasa-earth/earth_1_12756.glb'
const earthCutawayPhiStart = THREE.MathUtils.degToRad(90)
const earthCutawayPhiLength = THREE.MathUtils.degToRad(270)
const earthStructureCenter = new THREE.Vector3(-1.05, -0.18, 0)
const earthStructureExplodeDirection = new THREE.Vector3(0.42, 0.03, 0.28).normalize()
const focusedBodyCenter = new THREE.Vector3(0, 0, 0)

export const bodies = [
  {
    id: 'sun',
    name: '太阳',
    type: '恒星',
    color: '#f8c663',
    emissive: '#f19a3e',
    classroomRadius: 0.94,
    compareRadius: 2.18,
    orbitRadius: 0,
    orbitSpeed: 0,
    rotationSpeed: 0.08,
    angle: 0,
    order: 0,
    realDiameter: '约 139 万千米',
    realOrbit: '太阳系中心',
    note: '太阳会发光发热，是太阳系里最重要的能量来源。',
  },
  {
    id: 'mercury',
    name: '水星',
    type: '行星',
    color: '#a8a29a',
    classroomRadius: 0.15,
    compareRadius: 0.15,
    orbitRadius: 2.05,
    orbitSpeed: 0.82,
    rotationSpeed: 0.04,
    angle: 0.2,
    order: 1,
    realDiameter: '约 4880 千米',
    realOrbit: '离太阳最近',
    note: '水星最靠近太阳，看起来很小，表面温差很大。',
  },
  {
    id: 'venus',
    name: '金星',
    type: '行星',
    color: '#d7b06f',
    classroomRadius: 0.24,
    compareRadius: 0.34,
    orbitRadius: 2.85,
    orbitSpeed: 0.55,
    rotationSpeed: -0.025,
    angle: 1.15,
    order: 2,
    realDiameter: '约 1.21 万千米',
    realOrbit: '第二颗行星',
    note: '金星有厚厚的大气，天空中的金星常常非常明亮。',
  },
  {
    id: 'earth',
    name: '地球',
    type: '行星',
    color: '#4aa3df',
    secondaryColor: '#68c6a8',
    classroomRadius: 0.27,
    compareRadius: 0.36,
    orbitRadius: 3.75,
    orbitSpeed: 0.34,
    rotationSpeed: 0.92,
    angle: 2.0,
    order: 3,
    axialTilt: 23.5,
    realDiameter: '约 1.27 万千米',
    realOrbit: '绕太阳一圈约 1 年',
    note: '地球有空气、水和生命。白天黑夜来自地球自转。',
  },
  {
    id: 'moon',
    name: '月球',
    type: '卫星',
    color: '#d7dce1',
    classroomRadius: 0.085,
    compareRadius: 0.10,
    orbitRadius: 0.62,
    orbitSpeed: 1.8,
    rotationSpeed: 0.04,
    angle: 0.6,
    order: 3.1,
    parent: 'earth',
    realDiameter: '约 3474 千米',
    realOrbit: '绕地球运动',
    note: '月球自己不会发光，我们看到的是它反射的太阳光。',
  },
  {
    id: 'mars',
    name: '火星',
    type: '行星',
    color: '#ce6f4c',
    classroomRadius: 0.21,
    compareRadius: 0.22,
    orbitRadius: 4.65,
    orbitSpeed: 0.24,
    rotationSpeed: 0.62,
    angle: 2.75,
    order: 4,
    realDiameter: '约 6790 千米',
    realOrbit: '第四颗行星',
    note: '火星表面含有很多铁锈一样的物质，所以常被叫作红色星球。',
  },
  {
    id: 'jupiter',
    name: '木星',
    type: '行星',
    color: '#d8a66d',
    classroomRadius: 0.58,
    compareRadius: 1.15,
    orbitRadius: 6.15,
    orbitSpeed: 0.13,
    rotationSpeed: 1.05,
    angle: 3.45,
    order: 5,
    realDiameter: '约 14.3 万千米',
    realOrbit: '最大的行星',
    note: '木星是太阳系最大的行星，身上有明显的条纹。',
  },
  {
    id: 'saturn',
    name: '土星',
    type: '行星',
    color: '#d9c489',
    classroomRadius: 0.50,
    compareRadius: 1.02,
    orbitRadius: 7.55,
    orbitSpeed: 0.09,
    rotationSpeed: 0.88,
    angle: 4.1,
    order: 6,
    hasRing: true,
    realDiameter: '约 12.1 万千米',
    realOrbit: '有明显光环',
    note: '土星最容易认出，因为它有一圈漂亮的光环。',
  },
  {
    id: 'uranus',
    name: '天王星',
    type: '行星',
    color: '#8fd5db',
    classroomRadius: 0.38,
    compareRadius: 0.54,
    orbitRadius: 8.85,
    orbitSpeed: 0.055,
    rotationSpeed: 0.48,
    angle: 4.75,
    order: 7,
    hasVerticalRing: true,
    realDiameter: '约 5.1 万千米',
    realOrbit: '第七颗行星',
    note: '天王星颜色偏蓝绿色，自转轴很倾斜，所以课堂模型把它的环竖起来表现。',
  },
  {
    id: 'neptune',
    name: '海王星',
    type: '行星',
    color: '#4978d5',
    classroomRadius: 0.37,
    compareRadius: 0.52,
    orbitRadius: 10.05,
    orbitSpeed: 0.04,
    rotationSpeed: 0.50,
    angle: 5.45,
    order: 8,
    realDiameter: '约 4.95 万千米',
    realOrbit: '第八颗行星',
    note: '海王星离太阳很远，看起来是深蓝色。',
  },
]

export const lessonSteps = [
  {
    id: 'overview',
    title: '认识太阳系与行星顺序',
    shortTitle: '认识太阳系',
    prompt: '太阳、行星和顺序',
    narration: '太阳系是以太阳为中心的大家庭。八大行星从离太阳最近到最远依次是水星、金星、地球、火星、木星、土星、天王星、海王星；地球排第三，木星最大，海王星离太阳最远。',
    facts: [
      '太阳占了太阳系绝大部分质量，是光和热的主要来源。',
      '八大行星从近到远是：水星、金星、地球、火星、木星、土星、天王星、海王星。',
      '课堂里可以用“水金地火木土天海”快速记住顺序；火星和木星之间有小行星带。',
    ],
    highlights: ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
    focusBodies: ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
    camera: { position: [0, 9.2, 10.8], target: [0, 0, 0], fov: 52 },
  },
  {
    id: 'earthMotion',
    title: '地球运动与月相',
    shortTitle: '地球运动',
    prompt: '自转、公转和月相',
    narration: '地球自转形成昼夜交替，地球斜着绕太阳公转，太阳直射点会在南北回归线之间移动并带来四季变化。月球绕地球运动，太阳照亮月球的一半，我们看到亮面大小变化，就形成月相。',
    facts: [
      '地球自转一圈大约是 24 小时，面向太阳的一侧是白天，背向太阳的一侧是夜晚。<span class="metric">真实数值：约 23 小时 56 分。</span>',
      '太阳直射点最北到北回归线附近，最南到南回归线附近。',
      '月球自己不会发光，它反射太阳光；月相是我们看到的月球亮面发生变化。',
    ],
    highlights: ['sun', 'earth', 'moon'],
    focusBodies: ['sun', 'earth', 'moon'],
    showPhases: true,
    camera: { position: [0, 2.65, 7.5], targetFocus: true, fov: 45 },
  },
  {
    id: 'earthAnalysis',
    title: '地球解析',
    shortTitle: '地球解析',
    prompt: '内部结构与大气层',
    narration: '把地球做成独立剖面模型来观察。地球内部从外到内有地壳、地幔、外核和内核，外面包着大气层；大气层又可以分为对流层、平流层、中间层、热层和散逸层。',
    facts: [
      '地壳是最外层，平均厚度约 5-70 千米；地幔厚约 2900 千米，是地球内部最厚的一层。',
      '外核厚约 2260 千米，主要是液态铁镍；内核半径约 1220 千米，温度很高、密度大。',
      '大气层从近地面向外依次包括对流层、平流层、中间层、热层和散逸层。<span class="metric">地球平均直径约 12742 千米。</span>',
    ],
    highlights: [],
    focusBodies: ['earth'],
    camera: { position: [0.2, 1.45, 8.2], targetFocus: true, fov: 43 },
  },
]

const state = {
  activeStepId: teachingConfig.defaultStepId,
  compareMode: false,
  motionEnabled: teachingConfig.autoMotionByDefault,
  showRealValues: teachingConfig.showRealValuesByDefault,
  selectedBodyId: '',
  focusedBodyId: '',
  selectedStructurePartId: '',
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,
  topPanelCollapsed: false,
  narrationPlaying: false,
  elapsed: 0,
  cameraMoveUntil: 0,
}

const bodyById = new Map(bodies.map((body) => [body.id, body]))
const objectById = new Map()
const focusLayouts = {
  earthMotion: {
    bodyIds: new Set(['sun', 'earth', 'moon']),
    radii: { sun: 0.96, earth: 0.58, moon: 0.18 },
    positions: {
      sun: new THREE.Vector3(0, 0, -0.08),
    },
    earthOrbit: { radius: 2.04, depth: 0.96, speed: 0.08, angle: 0.05 },
    moonOrbit: { radius: 0.46, speed: 1.7, angle: 0.6 },
    cameraTarget: new THREE.Vector3(0, 0.05, 0),
    orbitFocusBody: 'earth',
  },
  earthAnalysis: {
    bodyIds: new Set(),
    radii: {},
    positions: {},
    guidePosition: new THREE.Vector3(0, 0.0, 0),
    cameraTarget: new THREE.Vector3(0.05, 0.05, 0),
    orbitFocusBody: '',
  },
}
const compareSlots = {
  sun: -8.0,
  mercury: -4.65,
  venus: -3.95,
  earth: -3.15,
  moon: -2.55,
  mars: -1.95,
  jupiter: -0.42,
  saturn: 1.48,
  uranus: 3.18,
  neptune: 4.42,
}
const earthStructureParts = {
  crust: {
    title: '地壳',
    narration: '地壳是地球最外面的坚硬外壳，平均厚度约五到七十千米。大陆地壳更厚，海洋地壳更薄，我们生活的陆地和海底都在这一层上。',
  },
  mantle: {
    title: '地幔',
    narration: '地幔位于地壳下面，厚度约两千九百千米，是地球内部最厚的一层。它由高温岩石组成，缓慢流动会推动板块运动。',
  },
  outerCore: {
    title: '外核',
    narration: '外核包在内核外面，厚度约两千二百六十千米，主要由液态铁和镍组成。液态金属的运动和地球磁场有重要关系。',
  },
  innerCore: {
    title: '内核',
    narration: '内核位于地球中心，半径约一千二百二十千米，温度非常高，压力也很大，所以主要铁镍物质保持为固态。',
  },
  atmosphere: {
    title: '大气层',
    narration: '大气层包围在地球外面，从近地面向外依次包括对流层、平流层、中间层、热层和散逸层。它能保护生命，也形成天气和气候。',
  },
  exosphere: {
    title: '散逸层',
    narration: '散逸层是大气最外层，大约从七百千米延伸到一万千米附近，空气极其稀薄，逐渐过渡到外太空。',
  },
  thermosphere: {
    title: '热层',
    narration: '热层大约位于八十到七百千米高度，空气稀薄，极光常在这里发生，一些人造卫星也在这一高度范围运行。',
  },
  mesosphere: {
    title: '中间层',
    narration: '中间层大约位于五十到八十千米高度，进入大气的许多流星体会在这里燃烧。',
  },
  stratosphere: {
    title: '平流层',
    narration: '平流层大约位于十二到五十千米高度，空气较稳定，臭氧层也主要分布在这一层，能吸收紫外线。',
  },
  troposphere: {
    title: '对流层',
    narration: '对流层最接近地表，大约从地面到十二千米高度。云、雨、风等天气现象主要发生在这一层。',
  },
  ozone: {
    title: '臭氧层',
    narration: '臭氧层大约位于十五到三十五千米高度，能吸收大量紫外线，对地表生命有保护作用。',
  },
}

const stepList = document.querySelector('#stepList')
const lessonTitle = document.querySelector('#lessonTitle')
const lessonKicker = document.querySelector('#lessonKicker')
const stepHeading = document.querySelector('#stepHeading')
const stepNarration = document.querySelector('#stepNarration')
const factList = document.querySelector('#factList')
const focusBodies = document.querySelector('#focusBodies')
const phaseSection = document.querySelector('#phaseSection')
const scaleToggle = document.querySelector('#scaleToggle')
const motionToggle = document.querySelector('#motionToggle')
const factsToggle = document.querySelector('#factsToggle')
const narrationToggle = document.querySelector('#narrationToggle')
const resetView = document.querySelector('#resetView')
const fullscreenToggle = document.querySelector('#fullscreenToggle')
const leftPanelToggle = document.querySelector('#leftPanelToggle')
const rightPanelToggle = document.querySelector('#rightPanelToggle')
const topPanelToggle = document.querySelector('#topPanelToggle')
const scaleNote = document.querySelector('#scaleNote')
const sceneCaption = document.querySelector('#sceneCaption')
const sceneHost = document.querySelector('#sceneHost')
const appShell = document.querySelector('.app-shell')

let renderer
let scene
let camera
let controls
let solarSystem
let earthMotionGroup
let orbitGroup
let labelGroup
let earthLayerGroup
let asteroidBeltGroup
let seasonSunbeam
let starField
let sunLight
let ambientLight
let lastFrameTime = performance.now()
let narrationRequestId = 0
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
let cameraGoal = {
  position: new THREE.Vector3(0, 7, 12),
  target: new THREE.Vector3(0, 0, 0),
}

init()

function init() {
  renderStepButtons()
  renderTeachingPanel()
  syncSceneNotes()
  initScene()
  bindEvents()
  syncPanelState()
  syncToolbarState()
  syncNarrationState()
  resizeRenderer()
  setCameraFromStep(true)
  renderer.setAnimationLoop(animate)
}

function initScene() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color('#1d2936')

  camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120)
  camera.position.set(0, 7, 12)

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.shadowMap.enabled = false
  sceneHost.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 1.4
  controls.maxDistance = 26
  controls.enablePan = false
  controls.addEventListener('start', () => {
    state.cameraMoveUntil = 0
  })

  ambientLight = new THREE.AmbientLight('#b8c9d9', 0.62)
  scene.add(ambientLight)

  sunLight = new THREE.PointLight('#fff1bd', 5.2, 50, 1.35)
  sunLight.position.set(0, 0, 0)
  scene.add(sunLight)

  solarSystem = new THREE.Group()
  earthMotionGroup = createEarthMotionGuide()
  orbitGroup = new THREE.Group()
  labelGroup = new THREE.Group()
  scene.add(solarSystem, earthMotionGroup, orbitGroup, labelGroup)

  starField = createStarField()
  scene.add(starField)

  createOrbitRings()
  createBodies()
  asteroidBeltGroup = createAsteroidBelt()
  solarSystem.add(asteroidBeltGroup)
  earthLayerGroup = createEarthLayerGuide()
  scene.add(earthLayerGroup)
  seasonSunbeam = createSeasonSunbeam()
  scene.add(seasonSunbeam)
  window.addEventListener('resize', resizeRenderer)
}

function bindEvents() {
  scaleToggle.addEventListener('click', () => {
    if (['earthAnalysis', 'earthMotion'].includes(getActiveStep().id)) {
      state.compareMode = false
      scaleToggle.setAttribute('aria-pressed', 'false')
      syncSceneNotes()
      setCameraFromStep()
      return
    }

    state.compareMode = !state.compareMode
    clearBodyFocus()
    scaleToggle.setAttribute('aria-pressed', String(state.compareMode))
    syncSceneNotes()
    setCameraFromStep()
  })

  motionToggle.addEventListener('click', () => {
    state.motionEnabled = !state.motionEnabled
    motionToggle.setAttribute('aria-pressed', String(state.motionEnabled))
  })

  factsToggle.addEventListener('click', () => {
    state.showRealValues = !state.showRealValues
    factsToggle.setAttribute('aria-pressed', String(state.showRealValues))
    document.body.classList.toggle('show-values', state.showRealValues)
  })

  narrationToggle.addEventListener('click', toggleNarration)

  resetView.addEventListener('click', () => {
    clearBodyFocus()
    setCameraFromStep()
  })

  fullscreenToggle.addEventListener('click', toggleFullscreen)
  document.addEventListener('fullscreenchange', () => {
    syncFullscreenState()
    window.setTimeout(resizeRenderer, 80)
  })

  leftPanelToggle.addEventListener('click', () => {
    state.leftPanelCollapsed = !state.leftPanelCollapsed
    syncPanelState()
    window.setTimeout(resizeRenderer, 220)
  })

  rightPanelToggle.addEventListener('click', () => {
    state.rightPanelCollapsed = !state.rightPanelCollapsed
    syncPanelState()
    window.setTimeout(resizeRenderer, 220)
  })

  topPanelToggle.addEventListener('click', () => {
    state.topPanelCollapsed = !state.topPanelCollapsed
    syncToolbarState()
    window.setTimeout(resizeRenderer, 220)
  })

  renderer.domElement.addEventListener('click', handleSceneClick)
  renderer.domElement.addEventListener('pointermove', handleScenePointerMove)
}

function renderStepButtons() {
  stepList.replaceChildren()
  lessonSteps.forEach((step, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = step.id === state.activeStepId ? 'step-button active' : 'step-button'
    button.innerHTML = `
      <span class="step-index">${index + 1}</span>
      <span>
        <strong>${step.shortTitle}</strong>
        <small>${step.prompt}</small>
      </span>
    `
    button.addEventListener('click', () => {
      stopNarration()
      clearBodyFocus()
      state.activeStepId = step.id
      if (['earthAnalysis', 'earthMotion'].includes(step.id)) state.compareMode = false
      scaleToggle.setAttribute('aria-pressed', String(state.compareMode))
      renderStepButtons()
      renderTeachingPanel()
      syncSceneNotes()
      setCameraFromStep()
    })
    stepList.appendChild(button)
  })
}

function renderTeachingPanel() {
  const step = getActiveStep()
  const index = lessonSteps.findIndex((item) => item.id === step.id) + 1
  const focusedBody = getFocusedBody()
  const content = focusedBody ? getBodyTeachingContent(focusedBody) : null

  lessonTitle.textContent = content?.title || step.title
  lessonKicker.textContent = content ? '单独讲解' : `第 ${index} 步`
  stepHeading.textContent = content?.title || step.title
  stepNarration.textContent = content?.narration || step.narration
  phaseSection.hidden = content ? focusedBody.id !== 'moon' : !step.showPhases

  factList.replaceChildren()
  ;(content?.facts || step.facts).forEach((fact) => {
    const item = document.createElement('li')
    item.innerHTML = fact
    factList.appendChild(item)
  })

  focusBodies.replaceChildren()
  ;(content?.focusBodies || step.focusBodies).forEach((bodyId) => {
    const body = bodyById.get(bodyId)
    if (!body) return

    const chip = document.createElement('span')
    chip.className = 'body-chip'
    chip.style.setProperty('--chip-color', body.color)
    chip.textContent = `${body.name} · ${body.type}`
    focusBodies.appendChild(chip)
  })
}

function syncSceneNotes() {
  const step = getActiveStep()
  if (step.id === 'earthAnalysis') {
    scaleNote.textContent = '独立地球剖面模型：地壳、地幔、外核、内核与大气层分开展示。'
    sceneCaption.textContent = '只点击各层讲解框播放讲解；点击地球模型、剖面或轨道线不会触发讲解。'
    return
  }

  if (step.id === 'earthMotion') {
    scaleNote.textContent = '地球运动示意：昼夜、四季直射点和月相合并在同一画面。'
    sceneCaption.textContent = '观察地球亮暗面、太阳直射点移动和月球绕地球形成的月相变化。'
    return
  }

  scaleNote.textContent = state.compareMode
    ? '大小对比：只比较天体大小，不表示真实距离。'
    : '课堂比例：每颗行星都被放大，方便在投屏上看清。'
  sceneCaption.textContent = '拖动画面可以换角度，滚轮可以放大缩小。'
}

function getActiveStep() {
  return lessonSteps.find((step) => step.id === state.activeStepId) || lessonSteps[0]
}

function getFocusedBody() {
  return state.focusedBodyId ? bodyById.get(state.focusedBodyId) : null
}

function getBodyTeachingContent(body) {
  return {
    title: `${body.name} · ${body.type}`,
    narration: body.note,
    facts: [
      getBodyPositionFact(body),
      `大小：${body.realDiameter}。`,
      getBodyObservationFact(body),
    ],
    focusBodies: [body.id],
  }
}

function getBodyPositionFact(body) {
  if (body.parent === 'earth') return `${body.name}绕地球运动，是地球的天然卫星。`
  if (body.id === 'sun') return '太阳位于模型中心，是会发光发热的恒星。'
  return `${body.name}是从太阳向外数的第 ${body.order} 颗行星。`
}

function getBodyObservationFact(body) {
  if (body.id === 'earth') return '观察点：蓝色代表海洋，绿色代表陆地，外圈蓝色辉光表示大气层，斜线表示地球自转轴。'
  if (body.id === 'jupiter') return '观察点：木星有明显条纹，还有一个红色大斑。'
  if (body.id === 'saturn') return '观察点：土星有宽宽的光环，很容易认出来。'
  if (body.id === 'uranus') return '观察点：天王星的环在课堂模型里竖起来，表示它很倾斜。'
  if (body.id === 'mars') return '观察点：火星偏红色，像被铁锈染过一样。'
  if (body.id === 'moon') return '观察点：月球表面有很多坑坑洼洼的环形山。'
  if (body.id === 'sun') return '观察点：太阳表面用了明亮斑纹，表示它释放强烈光和热。'
  return `观察点：${body.name}在模型中用${body.colorText || '自己的颜色'}表现，方便和其他天体区分。`
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    if (!appShell.requestFullscreen) {
      scaleNote.textContent = '当前浏览器不支持全屏，可以使用系统投屏或浏览器菜单全屏。'
      return
    }

    await appShell.requestFullscreen().catch(() => {
      scaleNote.textContent = '全屏被浏览器阻止，请在课堂投屏窗口中再次点击全屏。'
    })
    return
  }

  await document.exitFullscreen().catch(() => {})
}

function syncFullscreenState() {
  const isFullscreen = document.fullscreenElement === appShell
  fullscreenToggle.setAttribute('aria-pressed', String(isFullscreen))
  fullscreenToggle.lastChild.textContent = isFullscreen ? ' 退出全屏' : ' 全屏'
}

function syncPanelState() {
  document.body.classList.toggle('sidebar-left-collapsed', state.leftPanelCollapsed)
  document.body.classList.toggle('sidebar-right-collapsed', state.rightPanelCollapsed)
  leftPanelToggle.setAttribute('aria-pressed', String(state.leftPanelCollapsed))
  rightPanelToggle.setAttribute('aria-pressed', String(state.rightPanelCollapsed))
  leftPanelToggle.querySelector('.toggle-label').textContent = state.leftPanelCollapsed ? '展开步骤栏' : '收起步骤栏'
  rightPanelToggle.querySelector('.toggle-label').textContent = state.rightPanelCollapsed ? '展开讲解栏' : '收起讲解栏'
}

function syncToolbarState() {
  document.body.classList.toggle('toolbar-collapsed', state.topPanelCollapsed)
  topPanelToggle.setAttribute('aria-pressed', String(state.topPanelCollapsed))
  topPanelToggle.querySelector('.toggle-label').textContent = state.topPanelCollapsed ? '展开顶部栏' : '收起顶部栏'
}

function toggleNarration() {
  if (state.narrationPlaying) {
    stopNarration()
    return
  }

  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    sceneCaption.textContent = '当前浏览器不支持讲解音频，可以换用 Chrome 或 Edge 播放。'
    return
  }

  window.speechSynthesis.cancel()
  const requestId = narrationRequestId + 1
  narrationRequestId = requestId
  const utterance = new SpeechSynthesisUtterance(getNarrationText())
  utterance.lang = 'zh-CN'
  utterance.rate = 0.88
  utterance.pitch = 1.02
  utterance.volume = 1
  const voice = getChineseVoice()
  if (voice) utterance.voice = voice
  utterance.onend = () => {
    if (requestId !== narrationRequestId) return
    state.narrationPlaying = false
    syncNarrationState()
  }
  utterance.onerror = () => {
    if (requestId !== narrationRequestId) return
    state.narrationPlaying = false
    syncNarrationState()
    sceneCaption.textContent = '讲解音频没有播放成功，请检查浏览器声音设置。'
  }

  state.narrationPlaying = true
  syncNarrationState()
  sceneCaption.textContent = `正在播放：${getFocusedBody()?.name || getActiveStep().title}`
  window.speechSynthesis.speak(utterance)
}

function stopNarration() {
  narrationRequestId += 1
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  state.narrationPlaying = false
  syncNarrationState()
}

function syncNarrationState() {
  narrationToggle.setAttribute('aria-pressed', String(state.narrationPlaying))
  narrationToggle.lastChild.textContent = state.narrationPlaying ? ' 停止讲解' : ' 播放讲解'
}

function getChineseVoice() {
  return window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang?.toLowerCase().startsWith('zh') || voice.name.includes('Chinese') || voice.name.includes('中文'))
}

function getNarrationText() {
  const focusedBody = getFocusedBody()
  if (focusedBody) {
    const content = getBodyTeachingContent(focusedBody)
    const facts = formatNarrationFacts(content.facts)
    return formatNarrationText([
      `现在单独讲解${focusedBody.name}`,
      content.narration,
      `关键事实：${facts}`,
    ])
  }

  const step = getActiveStep()
  const facts = formatNarrationFacts(step.facts)
  return formatNarrationText([
    step.title,
    step.narration,
    `关键事实：${facts}`,
  ])
}

function playStructureNarration(part) {
  if (!part) return
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    sceneCaption.textContent = `当前浏览器不支持语音讲解：${part.title}。`
    return
  }

  window.speechSynthesis.cancel()
  const requestId = narrationRequestId + 1
  narrationRequestId = requestId
  const utterance = new SpeechSynthesisUtterance(formatNarrationText([
    `现在讲解${part.title}`,
    part.narration,
  ]))
  utterance.lang = 'zh-CN'
  utterance.rate = 0.88
  utterance.pitch = 1.02
  utterance.volume = 1
  const voice = getChineseVoice()
  if (voice) utterance.voice = voice
  utterance.onend = () => {
    if (requestId !== narrationRequestId) return
    state.narrationPlaying = false
    syncNarrationState()
  }
  utterance.onerror = () => {
    if (requestId !== narrationRequestId) return
    state.narrationPlaying = false
    syncNarrationState()
    sceneCaption.textContent = `${part.title}的语音讲解没有播放成功，请检查浏览器声音设置。`
  }

  state.narrationPlaying = true
  syncNarrationState()
  window.speechSynthesis.speak(utterance)
}

function formatNarrationFacts(facts) {
  return facts
    .map((fact) => normalizeNarrationPart(stripHtml(fact)))
    .filter(Boolean)
    .join('。')
}

function formatNarrationText(parts) {
  return parts
    .map((part) => normalizeNarrationPart(part))
    .filter(Boolean)
    .join('。')
    .concat('。')
}

function normalizeNarrationPart(value) {
  return String(value).trim().replace(/[。！？；;，,、\s]+$/u, '')
}

function stripHtml(value) {
  const element = document.createElement('div')
  element.innerHTML = value
  return element.textContent || element.innerText || ''
}

function handleSceneClick(event) {
  if (getActiveStep().id === 'earthAnalysis') {
    const part = pickEarthStructureFromEvent(event)
    if (!part) return

    state.selectedStructurePartId = part.id
    playStructureNarration(part)
    sceneCaption.textContent = `正在讲解：${part.title}。拖动模型后视角会保持在你松手的位置。`
    return
  }

  const picked = pickBodyFromEvent(event)
  if (!picked) return

  state.selectedBodyId = picked.body.id
  state.focusedBodyId = picked.body.id
  stopNarration()
  renderTeachingPanel()
  setCameraForBody(picked.body)
  sceneCaption.textContent = `已聚焦：${picked.body.name}。星球已放大、居中并暂停自转，方便课堂讲解。`
}

function handleScenePointerMove(event) {
  if (getActiveStep().id === 'earthAnalysis') {
    renderer.domElement.style.cursor = pickEarthStructureFromEvent(event) ? 'pointer' : 'grab'
    return
  }
  renderer.domElement.style.cursor = pickBodyFromEvent(event) ? 'pointer' : 'grab'
}

function pickEarthStructureFromEvent(event) {
  if (!earthLayerGroup?.visible) return null

  const rect = renderer.domElement.getBoundingClientRect()
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(pointer, camera)

  const pickable = []
  earthLayerGroup.traverse((object) => {
    if (object.userData?.structureLabelHitbox) pickable.push(object)
  })
  const hits = raycaster
    .intersectObjects(pickable, true)
    .filter((item) => item.object.userData.structureLabelHitbox)
  const hit = hits[0]
  if (!hit) return null

  const id = hit.object.userData.structurePartId
  const part = earthStructureParts[id]
  return part ? { id, ...part, object: hit.object } : null
}

function pickBodyFromEvent(event) {
  if (['earthAnalysis', 'earthMotion'].includes(getActiveStep().id)) return null
  if (state.focusedBodyId) return null

  const rect = renderer.domElement.getBoundingClientRect()
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(pointer, camera)

  const meshes = bodies
    .map((body) => objectById.get(body.id)?.mesh)
    .filter(Boolean)
  const intersections = raycaster.intersectObjects(meshes, false)
  const hit = intersections.find((item) => item.object.userData.bodyId)
  if (!hit) return null

  const body = bodyById.get(hit.object.userData.bodyId)
  return body ? { body, object: hit.object } : null
}

function clearBodyFocus() {
  const hadFocus = Boolean(state.focusedBodyId || state.selectedBodyId || state.selectedStructurePartId)
  state.focusedBodyId = ''
  state.selectedBodyId = ''
  state.selectedStructurePartId = ''
  if (hadFocus) renderTeachingPanel()
}

function setCameraForBody(body) {
  const entry = objectById.get(body.id)
  if (!entry) return

  const target = focusedBodyCenter.clone()
  const radius = getBodyDisplayRadius(body)
  const distance = THREE.MathUtils.clamp(radius * 5.8, 2.4, body.id === 'sun' ? 9.2 : 7.2)
  const height = THREE.MathUtils.clamp(radius * 1.8, 0.8, 3.2)
  const side = body.id === 'sun' ? 0.8 : 1.15
  const position = target.clone().add(new THREE.Vector3(distance * side, height, distance))

  cameraGoal = { position, target }
  camera.fov = body.id === 'sun' ? 42 : 38
  camera.updateProjectionMatrix()
  state.cameraMoveUntil = performance.now() + 1600
}

function createOrbitRings() {
  bodies
    .filter((body) => body.orbitRadius > 0)
    .forEach((body) => {
      const points = []
      const segments = 160
      for (let index = 0; index < segments; index += 1) {
        const angle = (index / segments) * Math.PI * 2
        points.push(new THREE.Vector3(Math.cos(angle) * body.orbitRadius, 0, Math.sin(angle) * body.orbitRadius))
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: '#aee7ff',
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const line = new THREE.LineLoop(geometry, material)
      line.userData.bodyId = body.id
      line.userData.parentId = body.parent || ''
      orbitGroup.add(line)
    })
}

function createAsteroidBelt() {
  const group = new THREE.Group()
  group.name = '火星和木星之间的小行星带'

  const count = 720
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const random = seededRandom('asteroid-belt')
  const palettes = ['#d5bd8d', '#a98b68', '#e3d0a8', '#8a7b6a']

  for (let index = 0; index < count; index += 1) {
    const angle = random() * Math.PI * 2
    const radius = 5.22 + (random() - 0.5) * 0.72
    const y = (random() - 0.5) * 0.08
    const base = index * 3
    positions[base] = Math.cos(angle) * radius
    positions[base + 1] = y
    positions[base + 2] = Math.sin(angle) * radius

    const color = new THREE.Color(palettes[Math.floor(random() * palettes.length)])
    colors[base] = color.r
    colors[base + 1] = color.g
    colors[base + 2] = color.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const material = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
  })
  const points = new THREE.Points(geometry, material)
  points.name = '小行星颗粒'
  group.add(points)

  group.add(createAsteroidBeltRing(4.84, 0.26))
  group.add(createAsteroidBeltRing(5.60, 0.20))

  const label = createLabel('小行星带', '#d5bd8d')
  label.position.set(0, 0.62, -5.28)
  label.scale.set(1.06, 0.36, 1)
  group.add(label)

  return group
}

function createAsteroidBeltRing(radius, opacity) {
  const points = []
  for (let index = 0; index <= 220; index += 1) {
    const angle = (index / 220) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
  }

  const material = new THREE.LineBasicMaterial({
    color: '#d7b985',
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  return new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), material)
}

function createBodies() {
  bodies.forEach((body) => {
    const group = new THREE.Group()
    group.name = body.name
    solarSystem.add(group)

    const mesh = createBodyMesh(body)
    const outline = createOutlineMesh(body)
    const label = createLabel(body.name, body.color)
    group.add(mesh, outline)

    if (body.id === 'sun') {
      group.add(createSunGlow())
    }

    if (body.id === 'earth') {
      group.add(createEarthAxis())
      group.add(createEarthLandMarks())
      group.add(createEarthAtmosphere())
      const seasonGuide = createSeasonGuide()
      group.add(seasonGuide)
      const nightShade = createNightShade()
      const daylight = createLightHemisphere('#fff0a8', 0.28, 1.032)
      group.add(nightShade)
      group.add(daylight)
      objectById.set('earth-season-guide', { group: seasonGuide, body })
      objectById.set('earth-night-shade', { mesh: nightShade, body })
      objectById.set('earth-daylight', { mesh: daylight, body })
    }

    if (body.id === 'moon') {
      const moonLight = createLightHemisphere('#f7fbff', 0.55, 1.05)
      const moonShade = createNightShade(1.04, 0.34)
      group.add(moonLight, moonShade)
      objectById.set('moon-daylight', { mesh: moonLight, body })
      objectById.set('moon-night-shade', { mesh: moonShade, body })
    }

    if (body.hasRing) {
      group.add(createSaturnRing())
    }

    if (body.hasVerticalRing) {
      group.add(createUranusVerticalRings())
    }

    labelGroup.add(label)
    objectById.set(body.id, { body, group, mesh, outline, label })
  })
}

function createEarthMotionGuide() {
  const group = new THREE.Group()
  group.name = '独立地球运动模型'
  group.visible = false
  const layout = focusLayouts.earthMotion

  const sunBody = bodyById.get('sun')
  const earthBody = bodyById.get('earth')
  const moonBody = bodyById.get('moon')

  const sunGroup = new THREE.Group()
  sunGroup.name = '地球运动太阳'
  const sunMesh = createBodyMesh(sunBody)
  sunGroup.add(sunMesh, createSunGlow())
  group.add(sunGroup)

  const earthGroup = new THREE.Group()
  earthGroup.name = '地球运动地球'
  earthGroup.rotation.z = THREE.MathUtils.degToRad(earthBody.axialTilt)
  const earthMesh = createBodyMesh(earthBody)
  const earthShade = createNightShade()
  const earthDaylight = createLightHemisphere('#fff0a8', 0.30, 1.032)
  const seasonGuide = createSeasonGuide()
  earthGroup.add(earthMesh, createEarthAxis(), createEarthLandMarks(), createEarthAtmosphere(), earthShade, earthDaylight, seasonGuide)
  group.add(earthGroup)

  const moonGroup = new THREE.Group()
  moonGroup.name = '地球运动月球'
  const moonMesh = createBodyMesh(moonBody)
  const moonShade = createNightShade(1.04, 0.34)
  const moonDaylight = createLightHemisphere('#f7fbff', 0.55, 1.05)
  moonGroup.add(moonMesh, moonShade, moonDaylight)
  group.add(moonGroup)

  const earthOrbit = createMotionOrbitLine(layout.earthOrbit.radius, layout.earthOrbit.depth, '#ffdf6e', 0.46)
  earthOrbit.name = '地球公转示意轨道'
  const moonOrbit = createMotionOrbitLine(layout.moonOrbit.radius, layout.moonOrbit.radius, '#f7fbff', 0.42)
  moonOrbit.name = '月球绕地轨道'
  group.add(earthOrbit, moonOrbit)

  const sunLabel = createMotionLabel('太阳', '#f8c663')
  const earthLabel = createMotionLabel('地球', '#4aa3df')
  const moonLabel = createMotionLabel('月球', '#d7dce1')
  group.add(sunLabel, earthLabel, moonLabel)

  group.userData = {
    sunGroup,
    earthGroup,
    moonGroup,
    sunMesh,
    earthMesh,
    moonMesh,
    earthShade,
    earthDaylight,
    moonShade,
    moonDaylight,
    seasonGuide,
    earthOrbit,
    moonOrbit,
    sunLabel,
    earthLabel,
    moonLabel,
  }

  return group
}

function createMotionOrbitLine(radiusX, radiusZ, color, opacity) {
  const points = []
  for (let index = 0; index < 192; index += 1) {
    const angle = (index / 192) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * radiusX, 0, Math.sin(angle) * radiusZ))
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  return new THREE.LineLoop(geometry, material)
}

function createMotionLabel(text, color) {
  const label = createLabel(text, color)
  label.scale.set(0.62, 0.21, 1)
  return label
}

function createBodyMesh(body) {
  const geometry = new THREE.SphereGeometry(1, body.id === 'sun' ? 64 : 42, body.id === 'sun' ? 32 : 24)
  const texture = createPlanetTexture(body)
  texture.colorSpace = THREE.SRGBColorSpace

  if (body.id === 'sun') {
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture, color: '#fff2b0' }))
    mesh.userData.bodyId = body.id
    return mesh
  }

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: ['jupiter', 'saturn'].includes(body.id) ? 0.82 : 0.68,
    metalness: 0.02,
    emissive: body.id === 'moon' ? '#5d6671' : body.color,
    emissiveIntensity: body.id === 'moon' ? 0.16 : 0.11,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.userData.bodyId = body.id
  return mesh
}

function createPlanetTexture(body) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const context = canvas.getContext('2d')
  context.fillStyle = body.color
  context.fillRect(0, 0, canvas.width, canvas.height)

  const random = seededRandom(body.id)
  const width = canvas.width
  const height = canvas.height

  if (body.id === 'sun') {
    const gradient = context.createRadialGradient(width * 0.5, height * 0.5, 8, width * 0.5, height * 0.5, width * 0.58)
    gradient.addColorStop(0, '#fff7bc')
    gradient.addColorStop(0.34, '#ffd66f')
    gradient.addColorStop(0.72, '#f28a3f')
    gradient.addColorStop(1, '#d94e35')
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)
    drawSolarGranules(context, random, width, height)
  } else if (body.id === 'earth') {
    drawEarthTexture(context, random, width, height)
  } else if (body.id === 'jupiter') {
    drawBandedGasGiant(context, random, width, height, ['#e8c68a', '#b8794d', '#f2dfbd', '#7c5238'])
    drawOval(context, width * 0.68, height * 0.60, 42, 18, '#b15a42', 0.85)
  } else if (body.id === 'saturn') {
    drawBandedGasGiant(context, random, width, height, ['#f0dba0', '#c7a86a', '#ead39b', '#9e8055'])
  } else if (body.id === 'mars') {
    drawRockyTexture(context, random, width, height, '#b9573a', '#df9a67', '#743a2c')
    drawOval(context, width * 0.52, height * 0.10, 58, 12, '#f1d8c2', 0.8)
  } else if (body.id === 'venus') {
    drawCloudBands(context, random, width, height, '#d7b06f', '#f2d899', '#9c7249')
  } else if (body.id === 'mercury' || body.id === 'moon') {
    drawCrateredTexture(context, random, width, height, body.id === 'moon' ? '#d7dce1' : '#9f9a92')
  } else if (body.id === 'uranus') {
    drawIceGiantTexture(context, random, width, height, '#8fd5db', '#c9f1f0', '#5faeb7')
  } else if (body.id === 'neptune') {
    drawIceGiantTexture(context, random, width, height, '#4978d5', '#84a9ff', '#1f3f9b')
    drawOval(context, width * 0.64, height * 0.58, 34, 12, '#1d2f75', 0.5)
  }

  return new THREE.CanvasTexture(canvas)
}

function seededRandom(seedText) {
  let seed = 2166136261
  for (let index = 0; index < seedText.length; index += 1) {
    seed ^= seedText.charCodeAt(index)
    seed = Math.imul(seed, 16777619)
  }
  return () => {
    seed += 0x6D2B79F5
    let value = seed
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function drawSolarGranules(context, random, width, height) {
  for (let index = 0; index < 140; index += 1) {
    const x = random() * width
    const y = random() * height
    const radius = 6 + random() * 20
    context.fillStyle = random() > 0.45 ? 'rgba(255, 245, 160, 0.18)' : 'rgba(221, 80, 36, 0.2)'
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }
}

function drawEarthTexture(context, random, width, height) {
  const ocean = context.createLinearGradient(0, 0, 0, height)
  ocean.addColorStop(0, '#2b8bcf')
  ocean.addColorStop(0.46, '#0f5f9f')
  ocean.addColorStop(1, '#0a356c')
  context.fillStyle = ocean
  context.fillRect(0, 0, width, height)

  context.fillStyle = 'rgba(255,255,255,0.08)'
  for (let index = 0; index < 7; index += 1) {
    const y = (0.18 + index * 0.105) * height
    context.fillRect(0, y, width, 1)
  }

  const lands = [
    [0.18, 0.39, 0.18, 0.16, -0.30, '#5fae63'],
    [0.30, 0.61, 0.08, 0.22, 0.20, '#4f9d58'],
    [0.51, 0.54, 0.12, 0.20, -0.12, '#70aa61'],
    [0.64, 0.39, 0.27, 0.15, 0.10, '#6ab46a'],
    [0.74, 0.52, 0.11, 0.12, 0.18, '#8fb96b'],
    [0.82, 0.66, 0.08, 0.055, 0.08, '#77a85d'],
    [0.35, 0.22, 0.07, 0.035, -0.10, '#9bb88e'],
    [0.50, 0.94, 0.42, 0.045, 0, '#eef5f8'],
    [0.04, 0.38, 0.08, 0.13, -0.2, '#5fae63'],
  ]
  lands.forEach(([x, y, sx, sy, rotation, color]) => {
    drawContinentBlob(context, x * width, y * height, sx * width, sy * height, rotation, color)
  })

  for (let index = 0; index < 16; index += 1) {
    drawOval(context, random() * width, (0.18 + random() * 0.62) * height, 48 + random() * 68, 5 + random() * 10, 'rgba(238, 248, 255, 0.32)', 1)
  }
  for (let index = 0; index < 8; index += 1) {
    drawOval(context, random() * width, (0.22 + random() * 0.54) * height, 110 + random() * 90, 3 + random() * 5, 'rgba(255,255,255,0.18)', 1)
  }
  context.fillStyle = '#f6fbff'
  context.fillRect(0, 0, width, 14)
  context.fillRect(0, height - 14, width, 14)
}

function drawContinentBlob(context, x, y, width, height, rotation, color) {
  context.save()
  context.translate(x, y)
  context.rotate(rotation)
  context.fillStyle = 'rgba(229, 202, 129, 0.40)'
  drawBlob(context, 0, 0, width * 1.04, height * 1.06, 12)
  context.fillStyle = color
  drawBlob(context, 0, 0, width, height, 12)
  context.fillStyle = 'rgba(34, 93, 54, 0.28)'
  drawBlob(context, -width * 0.08, height * 0.02, width * 0.58, height * 0.44, 8)
  context.restore()
}

function drawBandedGasGiant(context, random, width, height, palette) {
  let y = 0
  while (y < height) {
    const bandHeight = 12 + random() * 24
    context.fillStyle = palette[Math.floor(random() * palette.length)]
    context.fillRect(0, y, width, bandHeight)
    context.fillStyle = 'rgba(255,255,255,0.10)'
    context.fillRect(0, y + bandHeight * 0.25, width, 2)
    y += bandHeight
  }
  for (let index = 0; index < 18; index += 1) {
    drawOval(context, random() * width, random() * height, 40 + random() * 80, 4 + random() * 10, 'rgba(255,255,255,0.13)', 1)
  }
}

function drawRockyTexture(context, random, width, height, base, highlight, shadow) {
  context.fillStyle = base
  context.fillRect(0, 0, width, height)
  for (let index = 0; index < 90; index += 1) {
    drawOval(context, random() * width, random() * height, 8 + random() * 28, 4 + random() * 16, random() > 0.5 ? highlight : shadow, 0.35)
  }
}

function drawCloudBands(context, random, width, height, base, light, dark) {
  context.fillStyle = base
  context.fillRect(0, 0, width, height)
  for (let index = 0; index < 18; index += 1) {
    const y = (index / 18) * height
    drawOval(context, width * 0.5, y + random() * 12, width * (0.65 + random() * 0.45), 8 + random() * 16, random() > 0.5 ? light : dark, 0.34)
  }
}

function drawCrateredTexture(context, random, width, height, base) {
  context.fillStyle = base
  context.fillRect(0, 0, width, height)
  for (let index = 0; index < 84; index += 1) {
    const x = random() * width
    const y = random() * height
    const radius = 3 + random() * 13
    context.fillStyle = 'rgba(45, 49, 54, 0.22)'
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
    context.strokeStyle = 'rgba(255,255,255,0.20)'
    context.lineWidth = 1
    context.stroke()
  }
}

function drawIceGiantTexture(context, random, width, height, base, light, dark) {
  const gradient = context.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, light)
  gradient.addColorStop(0.45, base)
  gradient.addColorStop(1, dark)
  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)
  for (let index = 0; index < 10; index += 1) {
    drawOval(context, width * 0.5, random() * height, width * 0.7, 4 + random() * 8, 'rgba(255,255,255,0.14)', 1)
  }
}

function drawBlob(context, x, y, width, height, points) {
  context.beginPath()
  for (let index = 0; index <= points; index += 1) {
    const angle = (index / points) * Math.PI * 2
    const wave = 0.76 + Math.sin(angle * 3.1) * 0.12 + Math.cos(angle * 5.2) * 0.08
    const px = x + Math.cos(angle) * width * wave
    const py = y + Math.sin(angle) * height * wave
    if (index === 0) context.moveTo(px, py)
    else context.lineTo(px, py)
  }
  context.closePath()
  context.fill()
}

function drawOval(context, x, y, radiusX, radiusY, color, alpha) {
  context.save()
  context.globalAlpha = alpha
  context.fillStyle = color
  context.beginPath()
  context.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
  context.fill()
  context.restore()
}

function createOutlineMesh(body) {
  const geometry = new THREE.SphereGeometry(1.09, 42, 20)
  const material = new THREE.MeshBasicMaterial({
    color: body.color,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  })
  const outline = new THREE.Mesh(geometry, material)
  outline.visible = false
  return outline
}

function createSunGlow() {
  const geometry = new THREE.SphereGeometry(1.22, 48, 24)
  const material = new THREE.MeshBasicMaterial({
    color: '#f8c663',
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  return new THREE.Mesh(geometry, material)
}

function createEarthAxis() {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, -1.75, 0),
    new THREE.Vector3(0, 1.75, 0),
  ])
  const material = new THREE.LineBasicMaterial({ color: '#f7f5ed', transparent: true, opacity: 0.72 })
  const line = new THREE.Line(geometry, material)
  line.rotation.z = THREE.MathUtils.degToRad(23.5)
  return line
}

function createEarthLandMarks() {
  const group = new THREE.Group()
  const material = new THREE.MeshBasicMaterial({ color: '#6fc69a', transparent: true, opacity: 0.46 })
  const patches = [
    { scale: [0.30, 0.13, 0.035], position: [-0.18, 0.28, 0.98], rotation: 0.4 },
    { scale: [0.18, 0.09, 0.035], position: [0.34, -0.16, 0.96], rotation: -0.5 },
    { scale: [0.16, 0.07, 0.035], position: [-0.38, -0.26, 0.92], rotation: 0.2 },
  ]
  patches.forEach((patch) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 10), material)
    mesh.scale.set(...patch.scale)
    mesh.position.set(...patch.position)
    mesh.rotation.z = patch.rotation
    group.add(mesh)
  })
  return group
}

function createEarthAtmosphere() {
  const geometry = new THREE.SphereGeometry(1.075, 48, 24)
  const material = new THREE.MeshBasicMaterial({
    color: '#8bd7ff',
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  })
  const atmosphere = new THREE.Mesh(geometry, material)
  atmosphere.name = '大气层辉光'
  return atmosphere
}

function createSeasonGuide() {
  const group = new THREE.Group()
  group.name = '四季阳光直射示意'
  group.visible = false

  const rings = [
    { name: '北回归线', latitude: 23.5, color: '#ffdf6e', opacity: 0.92 },
    { name: '赤道', latitude: 0, color: '#f7fbff', opacity: 0.72 },
    { name: '南回归线', latitude: -23.5, color: '#ffdf6e', opacity: 0.92 },
  ]
  rings.forEach((ring) => {
    const line = createLatitudeLine(ring.latitude, 1.045, ring.color, ring.opacity)
    line.name = ring.name
    group.add(line)

    const label = createSeasonTextSprite(ring.name, ring.color, 0.72)
    label.position.set(1.18, Math.sin(THREE.MathUtils.degToRad(ring.latitude)), 0.06)
    group.add(label)
  })

  const directBand = createLatitudeLine(0, 1.075, '#ffef85', 1)
  directBand.name = '阳光直射纬线'
  directBand.userData.dynamicLatitude = true
  group.add(directBand)

  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 24, 12),
    new THREE.MeshBasicMaterial({
      color: '#fff6a6',
      transparent: true,
      opacity: 0.96,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  )
  marker.name = '阳光直射点'
  marker.userData.seasonMarker = true
  group.add(marker)

  const markerGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.115, 24, 12),
    new THREE.MeshBasicMaterial({
      color: '#ffd45c',
      transparent: true,
      opacity: 0.30,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  )
  markerGlow.name = '直射点光晕'
  markerGlow.userData.seasonMarkerGlow = true
  group.add(markerGlow)

  const markerLabel = createSeasonTextSprite('阳光直射点', '#fff3a0', 0.86)
  markerLabel.name = '阳光直射点标签'
  markerLabel.userData.seasonMarkerLabel = true
  group.add(markerLabel)

  const statusLabel = createSeasonStatusLabel()
  statusLabel.name = '四季状态标签'
  statusLabel.position.set(-0.08, 1.58, 0.18)
  group.add(statusLabel)

  return group
}

function createSeasonSunbeam() {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(30), 3))
  const material = new THREE.LineBasicMaterial({
    color: '#ffdf6e',
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  })
  const rays = new THREE.LineSegments(geometry, material)
  rays.name = '四季阳光束'
  rays.visible = false
  return rays
}

function createLatitudeLine(latitudeDeg, radius, color, opacity) {
  const points = []
  const latitude = THREE.MathUtils.degToRad(latitudeDeg)
  const y = Math.sin(latitude) * radius
  const ringRadius = Math.cos(latitude) * radius
  for (let index = 0; index <= 160; index += 1) {
    const angle = (index / 160) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * ringRadius, y, Math.sin(angle) * ringRadius))
  }

  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
  })
  return new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), material)
}

function createSeasonTextSprite(text, color, scale = 1) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 72
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'rgba(8, 16, 28, 0.78)'
  roundRect(context, 18, 14, 220, 44, 14)
  context.fill()
  context.strokeStyle = color
  context.lineWidth = 3
  context.stroke()
  context.fillStyle = '#f7fbff'
  context.font = '700 24px system-ui, PingFang SC, Microsoft YaHei, sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, 128, 37)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(0.58 * scale, 0.17 * scale, 1)
  return sprite
}

function createSeasonStatusLabel() {
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, depthTest: false }))
  sprite.scale.set(1.38, 0.40, 1)
  return sprite
}

function createNightShade(radius = 1.025, opacity = 0.46) {
  const geometry = new THREE.SphereGeometry(radius, 36, 18, 0, Math.PI)
  const material = new THREE.MeshBasicMaterial({
    color: '#060910',
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
  const shade = new THREE.Mesh(geometry, material)
  shade.name = '昼夜阴影'
  shade.visible = true
  return shade
}

function createLightHemisphere(color, opacity, radius) {
  const geometry = new THREE.SphereGeometry(radius, 36, 18, 0, Math.PI)
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
  const light = new THREE.Mesh(geometry, material)
  light.name = '阳光亮面'
  light.visible = false
  return light
}

function createSaturnRing() {
  const geometry = new THREE.TorusGeometry(1.58, 0.055, 10, 120)
  const material = new THREE.MeshBasicMaterial({
    color: '#ead8a1',
    transparent: true,
    opacity: 0.68,
    side: THREE.DoubleSide,
  })
  const ring = new THREE.Mesh(geometry, material)
  ring.rotation.x = Math.PI / 2
  ring.rotation.z = 0.32
  return ring
}

function createUranusVerticalRings() {
  const group = new THREE.Group()
  const material = new THREE.MeshBasicMaterial({
    color: '#bdeff2',
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const outerRing = new THREE.Mesh(new THREE.TorusGeometry(1.46, 0.028, 8, 120), material)
  const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.018, 8, 120), material.clone())
  innerRing.material.opacity = 0.38

  for (const ring of [outerRing, innerRing]) {
    ring.rotation.y = Math.PI / 2
    ring.rotation.z = THREE.MathUtils.degToRad(14)
    group.add(ring)
  }

  return group
}

function createLabel(text, color) {
  const canvas = document.createElement('canvas')
  canvas.width = 384
  canvas.height = 128
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'rgba(14, 17, 24, 0.72)'
  roundRect(context, 50, 32, 284, 64, 20)
  context.fill()
  context.strokeStyle = color
  context.lineWidth = 4
  context.stroke()
  context.fillStyle = '#f7f5ed'
  context.font = '600 34px system-ui, PingFang SC, Microsoft YaHei, sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, 192, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false })
  const sprite = new THREE.Sprite(material)
  sprite.userData.baseScale = new THREE.Vector3(0.92, 0.31, 1)
  sprite.userData.largeScale = new THREE.Vector3(1.62, 0.55, 1)
  sprite.scale.copy(sprite.userData.baseScale)
  return sprite
}

function createEarthLayerGuide() {
  const group = new THREE.Group()
  group.name = '独立地球内部结构与大气层模型'
  group.visible = false

  const earth = new THREE.Group()
  earth.name = '地球3/4剖面球体'
  earth.position.copy(earthStructureCenter)
  earth.rotation.y = THREE.MathUtils.degToRad(-12)
  group.add(earth)

  const surface = createEarthStructureSurface(1.55)
  const layerMeshes = [
    createCutawayLayer({
      id: 'innerCore',
      name: '内核',
      innerRadius: 0,
      outerRadius: 0.40,
      color: '#ffe15f',
      highlight: '#fff8af',
      shadow: '#f08d14',
      emissive: '#ffbf23',
      includeOuter: false,
      includeInner: false,
      explodeDistance: 0.36,
    }),
    createCutawayLayer({
      id: 'outerCore',
      name: '外核',
      innerRadius: 0.415,
      outerRadius: 0.74,
      color: '#f37a16',
      highlight: '#ffd05c',
      shadow: '#a5330c',
      emissive: '#d94f10',
      includeOuter: false,
      includeInner: false,
      explodeDistance: 0.34,
    }),
    createCutawayLayer({
      id: 'mantle',
      name: '地幔',
      innerRadius: 0.755,
      outerRadius: 1.42,
      color: '#c53a24',
      highlight: '#ff7b34',
      shadow: '#551515',
      emissive: '#7d1d13',
      includeOuter: false,
      includeInner: false,
      explodeDistance: 0.30,
    }),
    createCutawayLayer({
      id: 'crust',
      name: '地壳',
      innerRadius: 1.435,
      outerRadius: 1.55,
      color: '#6a5139',
      highlight: '#d6aa77',
      shadow: '#241a12',
      emissive: '#3f2b1a',
      opacity: 0.98,
      includeOuter: false,
      includeInner: false,
      explodeDistance: 0.38,
    }),
  ]
  layerMeshes.forEach((mesh, index) => {
    mesh.renderOrder = index + 3
    earth.add(mesh)
  })

  const atmosphereShell = createTransparentSphere(1.72, '#85d9ff', 0.15, 'atmosphere')
  atmosphereShell.renderOrder = 8
  earth.add(surface, atmosphereShell)
  earth.add(createCutawayEdgeLines())

  const internalCallouts = [
    {
      id: 'crust',
      title: '地壳',
      detail: '最外层，平均厚度约5-70千米',
      color: '#d8b17c',
      labelPosition: new THREE.Vector3(-1.86, 1.35, 1.36),
      targetPosition: getStructureTarget(-0.18, 1.26, 1.08),
      labelScale: 0.90,
    },
    {
      id: 'mantle',
      title: '地幔',
      detail: '厚度约2900千米，由高温岩石组成',
      color: '#ff7448',
      labelPosition: new THREE.Vector3(-1.86, 0.42, 1.36),
      targetPosition: getStructureTarget(-0.04, 0.45, 0.92),
      labelScale: 0.90,
    },
    {
      id: 'outerCore',
      title: '外核',
      detail: '厚度约2260千米，主要为液态铁镍',
      color: '#ff9c32',
      labelPosition: new THREE.Vector3(-1.86, -0.45, 1.36),
      targetPosition: getStructureTarget(0.02, -0.26, 0.66),
      labelScale: 0.90,
    },
    {
      id: 'innerCore',
      title: '内核',
      detail: '半径约1220千米，温度高、密度大',
      color: '#ffe766',
      labelPosition: new THREE.Vector3(-1.86, -1.28, 1.36),
      targetPosition: getStructureTarget(0.10, -0.10, 0.36),
      labelScale: 0.90,
    },
  ]
  internalCallouts.forEach((callout) => group.add(createStructureCallout(callout)))

  createAtmosphereBands(group)
  group.add(createSatelliteIcon(new THREE.Vector3(1.38, 1.18, 1.2)))
  group.add(createMeteorIcon(new THREE.Vector3(1.72, 0.36, 1.2)))
  group.add(createCloudIcon(new THREE.Vector3(1.58, -1.36, 1.15)))

  return group
}

function getStructureTarget(localX, localY, z) {
  return new THREE.Vector3(
    earthStructureCenter.x + localX,
    earthStructureCenter.y + localY,
    z,
  )
}

function createEarthStructureSurface(radius) {
  const earthBody = bodyById.get('earth')
  const texture = createPlanetTexture(earthBody)
  texture.colorSpace = THREE.SRGBColorSpace
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.76,
    metalness: 0.02,
    emissive: '#1d6f9d',
    emissiveIntensity: 0.10,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(createCutawaySurfaceGeometry(radius, 112, 56), material)
  mesh.name = 'NASA真实地表'
  mesh.userData.structurePartId = 'crust'
  registerStructureMesh(mesh, 'crust', 0.14)
  loadNasaEarthSurfaceTexture(material)
  return mesh
}

function loadNasaEarthSurfaceTexture(targetMaterial) {
  const loader = new GLTFLoader()
  loader.load(
    nasaEarthModelPath,
    (gltf) => {
      const nasaMaterial = findFirstMappedMaterial(gltf.scene)
      const nasaMap = nasaMaterial?.map
      if (!nasaMap) return
      targetMaterial.map?.dispose()
      const texture = nasaMap.clone()
      texture.colorSpace = THREE.SRGBColorSpace
      texture.needsUpdate = true
      targetMaterial.map = texture
      targetMaterial.needsUpdate = true
    },
    undefined,
    () => {
      targetMaterial.needsUpdate = true
    },
  )
}

function findFirstMappedMaterial(root) {
  let mappedMaterial = null
  root.traverse((object) => {
    if (mappedMaterial || !object.isMesh) return
    const materials = Array.isArray(object.material) ? object.material : [object.material]
    mappedMaterial = materials.find((material) => material?.map) || null
  })
  return mappedMaterial
}

function createCutawaySurfaceGeometry(radius, widthSegments, heightSegments) {
  return createCutawayShellGeometry({
    innerRadius: 0,
    outerRadius: radius,
    widthSegments,
    heightSegments,
    includeInner: false,
    includeCutFaces: false,
  })
}

function createTransparentSphere(radius, color, opacity, structurePartId = '') {
  const mesh = new THREE.Mesh(
    createCutawayShellGeometry({
      innerRadius: 0,
      outerRadius: radius,
      widthSegments: 96,
      heightSegments: 48,
      includeInner: false,
      includeCutFaces: false,
    }),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  )
  if (structurePartId) {
    mesh.userData.structurePartId = structurePartId
    registerStructureMesh(mesh, structurePartId, structurePartId === 'atmosphere' ? 0.30 : 0.18)
  }
  return mesh
}

function createCutawayLayer({
  id,
  name,
  innerRadius,
  outerRadius,
  color,
  highlight,
  shadow,
  emissive,
  opacity = 1,
  includeOuter = true,
  includeInner = innerRadius > 0,
  explodeDistance = 0.16,
}) {
  const geometry = createCutawayShellGeometry({
    innerRadius,
    outerRadius,
    widthSegments: 104,
    heightSegments: 52,
    includeOuter,
    includeInner,
    includeCutFaces: true,
  })
  const material = new THREE.MeshStandardMaterial({
    map: createLayerTexture(name, color, highlight, shadow),
    color,
    emissive,
    emissiveIntensity: name === '内核' ? 0.62 : 0.36,
    roughness: 0.54,
    metalness: 0.02,
    side: THREE.DoubleSide,
    transparent: true,
    opacity,
    depthWrite: false,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = name
  mesh.userData.structurePartId = id
  registerStructureMesh(mesh, id, explodeDistance)
  return mesh
}

function registerStructureMesh(mesh, structurePartId, explodeDistance) {
  mesh.userData.structurePartId = structurePartId
  mesh.userData.structureMesh = true
  mesh.userData.basePosition = mesh.position.clone()
  mesh.userData.explodeDirection = earthStructureExplodeDirection.clone()
  mesh.userData.explodeDistance = explodeDistance
  getSelectionMaterials(mesh).forEach((material) => {
    material.userData.baseEmissiveIntensity = material.emissiveIntensity || 0
    material.userData.baseOpacity = material.opacity ?? 1
  })
}

function registerStructureEmphasis(object, structurePartId, {
  explodeDirection = earthStructureExplodeDirection,
  explodeDistance = 0.14,
  selectedScale = 1.08,
} = {}) {
  object.userData.structurePartId = structurePartId
  object.userData.structureEmphasis = true
  object.userData.basePosition = object.position.clone()
  object.userData.emphasisBaseScale = object.scale.clone()
  object.userData.explodeDirection = explodeDirection.clone()
  object.userData.explodeDistance = explodeDistance
  object.userData.selectedScale = selectedScale
  getSelectionMaterials(object).forEach((material) => {
    material.userData.baseEmissiveIntensity = material.emissiveIntensity || 0
    material.userData.baseOpacity = material.opacity ?? 1
  })
}

function createCutawayShellGeometry({
  innerRadius,
  outerRadius,
  widthSegments,
  heightSegments,
  includeOuter = true,
  includeInner = innerRadius > 0,
  includeCutFaces = true,
}) {
  const positions = []
  const normals = []
  const uvs = []
  const indices = []
  const phiStart = earthCutawayPhiStart
  const phiLength = earthCutawayPhiLength

  function addVertex(position, normal, uvX, uvY) {
    positions.push(position.x, position.y, position.z)
    normals.push(normal.x, normal.y, normal.z)
    uvs.push(uvX, uvY)
    return positions.length / 3 - 1
  }

  function point(radius, phi, theta) {
    const sinTheta = Math.sin(theta)
    return new THREE.Vector3(
      Math.cos(phi) * sinTheta * radius,
      Math.cos(theta) * radius,
      Math.sin(phi) * sinTheta * radius,
    )
  }

  function surfaceNormal(phi, theta, inward = false) {
    const normal = point(1, phi, theta).normalize()
    return inward ? normal.multiplyScalar(-1) : normal
  }

  function addSphericalSurface(radius, inward) {
    const grid = []
    for (let y = 0; y <= heightSegments; y += 1) {
      const row = []
      const v = y / heightSegments
      const theta = v * Math.PI
      for (let x = 0; x <= widthSegments; x += 1) {
        const u = x / widthSegments
        const phi = phiStart + u * phiLength
        row.push(addVertex(point(radius, phi, theta), surfaceNormal(phi, theta, inward), u, 1 - v))
      }
      grid.push(row)
    }

    for (let y = 0; y < heightSegments; y += 1) {
      for (let x = 0; x < widthSegments; x += 1) {
        const a = grid[y][x]
        const b = grid[y][x + 1]
        const c = grid[y + 1][x]
        const d = grid[y + 1][x + 1]
        if (inward) indices.push(a, b, c, b, d, c)
        else indices.push(a, c, b, b, c, d)
      }
    }
  }

  function addRadialCutFace(phi, flip) {
    const grid = []
    const planeNormal = new THREE.Vector3(-Math.sin(phi), 0, Math.cos(phi)).normalize()
    if (flip) planeNormal.multiplyScalar(-1)
    for (let y = 0; y <= heightSegments; y += 1) {
      const theta = (y / heightSegments) * Math.PI
      grid.push([
        addVertex(point(innerRadius, phi, theta), planeNormal, 0, y / heightSegments),
        addVertex(point(outerRadius, phi, theta), planeNormal, 1, y / heightSegments),
      ])
    }
    for (let y = 0; y < heightSegments; y += 1) {
      const a = grid[y][0]
      const b = grid[y][1]
      const c = grid[y + 1][0]
      const d = grid[y + 1][1]
      if (flip) indices.push(a, c, b, b, c, d)
      else indices.push(a, b, c, b, d, c)
    }
  }

  if (includeOuter) addSphericalSurface(outerRadius, false)
  if (includeInner && innerRadius > 0) addSphericalSurface(innerRadius, true)
  if (includeCutFaces) {
    addRadialCutFace(phiStart, false)
    addRadialCutFace(phiStart + phiLength, true)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeBoundingSphere()
  return geometry
}

function createCutawayEdgeLines() {
  const group = new THREE.Group()
  group.name = '剖面边界线'
  const radii = [
    { radius: 0.40, color: '#fff3a6', opacity: 0.50 },
    { radius: 0.74, color: '#ffb45a', opacity: 0.45 },
    { radius: 1.42, color: '#ff7448', opacity: 0.40 },
    { radius: 1.55, color: '#f3d7aa', opacity: 0.54 },
    { radius: 1.72, color: '#9fe7ff', opacity: 0.34 },
  ]
  const boundaryAngles = [earthCutawayPhiStart, earthCutawayPhiStart + earthCutawayPhiLength]
  radii.forEach((entry) => {
    boundaryAngles.forEach((phi) => {
      group.add(createMeridianLine(entry.radius, phi, entry.color, entry.opacity))
    })
  })
  return group
}

function createMeridianLine(radius, phi, color, opacity) {
  const points = []
  for (let index = 0; index <= 96; index += 1) {
    const theta = (index / 96) * Math.PI
    const sinTheta = Math.sin(theta)
    points.push(new THREE.Vector3(
      Math.cos(phi) * sinTheta * radius,
      Math.cos(theta) * radius,
      Math.sin(phi) * sinTheta * radius,
    ))
  }
  return createGuideLine(points, color, opacity, 1.8)
}

function createLayerTexture(seedText, base, highlight, shadow) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')
  const random = seededRandom(`earth-layer-${seedText}`)
  const gradient = context.createRadialGradient(128, 128, 8, 128, 128, 150)
  gradient.addColorStop(0, highlight)
  gradient.addColorStop(0.48, base)
  gradient.addColorStop(1, shadow)
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (let index = 0; index < 88; index += 1) {
    const x = random() * canvas.width
    const y = random() * canvas.height
    const rx = 4 + random() * 22
    const ry = 3 + random() * 12
    drawOval(context, x, y, rx, ry, random() > 0.5 ? highlight : shadow, 0.18 + random() * 0.18)
  }

  context.strokeStyle = 'rgba(255, 238, 174, 0.22)'
  context.lineWidth = 1.4
  for (let index = 0; index < 18; index += 1) {
    context.beginPath()
    context.moveTo(random() * canvas.width, random() * canvas.height)
    context.lineTo(random() * canvas.width, random() * canvas.height)
    context.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function createAtmosphereBands(group) {
  const bands = [
    { id: 'exosphere', title: '散逸层', detail: '约700-10,000千米，与外太空过渡', color: '#a9caff', label: new THREE.Vector3(2.42, 1.58, 1.22), rx: 3.02, ry: 1.68 },
    { id: 'thermosphere', title: '热层', detail: '约80-700千米，极光和卫星轨道', color: '#8ad8ff', label: new THREE.Vector3(2.45, 0.94, 1.22), rx: 2.72, ry: 1.36 },
    { id: 'mesosphere', title: '中间层', detail: '约50-80千米，流星体在此燃烧', color: '#75c4ff', label: new THREE.Vector3(2.46, 0.30, 1.22), rx: 2.42, ry: 1.08 },
    { id: 'stratosphere', title: '平流层', detail: '约12-50千米，含臭氧层', color: '#63b5f4', label: new THREE.Vector3(2.43, -0.35, 1.22), rx: 2.12, ry: 0.82 },
    { id: 'troposphere', title: '对流层', detail: '约0-12千米，云、雨、风等天气', color: '#9fe7ff', label: new THREE.Vector3(2.42, -1.00, 1.22), rx: 1.84, ry: 0.60 },
  ]

  bands.forEach((band, index) => {
    const arc = createAtmosphereArc(-1.05, -0.18, band.rx, band.ry, band.color, 0.72 - index * 0.08)
    registerStructureEmphasis(arc, band.id, {
      explodeDirection: new THREE.Vector3(0.54, 0.10 + index * 0.025, 0.16).normalize(),
      explodeDistance: 0.28,
      selectedScale: 1.08,
    })
    group.add(arc)
    group.add(createStructureCallout({
      id: band.id,
      title: band.title,
      detail: band.detail,
      color: band.color,
      labelPosition: band.label,
      targetPosition: new THREE.Vector3(0.72 + index * 0.10, -0.18 + band.ry * 0.72, 1.10),
      labelScale: 0.98,
      side: 'right',
    }))
  })

  const ozone = createInfoLabel('臭氧层', '约15-35千米，吸收紫外线', '#2d8cff', 0.78)
  ozone.position.set(2.27, -0.68, 1.28)
  ozone.userData.structurePartId = 'ozone'
  ozone.userData.structureLabelHitbox = true
  registerStructureEmphasis(ozone, 'ozone', {
    explodeDirection: new THREE.Vector3(0.62, -0.08, 0.12).normalize(),
    explodeDistance: 0.22,
    selectedScale: 1.16,
  })
  group.add(ozone)
}

function createAtmosphereArc(centerX, centerY, radiusX, radiusY, color, opacity) {
  const group = new THREE.Group()
  group.position.set(centerX, centerY, 0)
  const points = []
  for (let index = 0; index <= 130; index += 1) {
    const angle = THREE.MathUtils.degToRad(10 + index * 160 / 130)
    points.push(new THREE.Vector3(
      Math.cos(angle) * radiusX,
      Math.sin(angle) * radiusY,
      0.55,
    ))
  }

  const curve = new THREE.CatmullRomCurve3(points)
  const ribbon = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 96, 0.012, 8, false),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: Math.min(0.30, opacity * 0.42),
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    }),
  )
  const line = createGuideLine(points, color, opacity, 2.4)
  group.add(ribbon, line)
  return group
}

function createStructureCallout({ id, title, detail, color, labelPosition, targetPosition, labelScale = 1, side = 'left' }) {
  const group = new THREE.Group()
  const emphasisDirection = labelPosition.clone().sub(targetPosition)
  if (emphasisDirection.lengthSq() < 0.0001) {
    emphasisDirection.set(side === 'left' ? -1 : 1, 0, 0.12)
  }
  emphasisDirection.normalize()
  const labelExplodeDistance = side === 'right' ? 0.10 : 0.20
  const guideExplodeDistance = side === 'right' ? 0.08 : 0.14
  const dotExplodeDistance = side === 'right' ? 0.08 : 0.12
  const labelSelectedScale = side === 'right' ? 1.08 : 1.14

  const label = createInfoLabel(title, detail, color, labelScale)
  label.userData.structurePartId = id
  label.userData.structureLabelHitbox = true
  label.position.copy(labelPosition)
  registerStructureEmphasis(label, id, {
    explodeDirection: emphasisDirection,
    explodeDistance: labelExplodeDistance,
    selectedScale: labelSelectedScale,
  })
  group.add(label)

  const labelEdge = labelPosition.clone().add(new THREE.Vector3(side === 'left' ? 0.72 * labelScale : -0.72 * labelScale, 0, 0))
  const guide = createGuideLine([labelEdge, targetPosition], color, 0.82, 2)
  registerStructureEmphasis(guide, id, {
    explodeDirection: emphasisDirection,
    explodeDistance: guideExplodeDistance,
    selectedScale: 1,
  })
  group.add(guide)

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 16, 8),
    new THREE.MeshBasicMaterial({ color, depthTest: false }),
  )
  dot.userData.structurePartId = id
  dot.position.copy(targetPosition)
  registerStructureEmphasis(dot, id, {
    explodeDirection: emphasisDirection,
    explodeDistance: dotExplodeDistance,
    selectedScale: 1.75,
  })
  group.add(dot)
  return group
}

function createInfoLabel(title, detail, color, scale = 1) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 150
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'rgba(9, 19, 35, 0.80)'
  roundRect(context, 16, 14, 480, 122, 18)
  context.fill()
  context.strokeStyle = color
  context.lineWidth = 4
  context.stroke()

  context.fillStyle = '#f7fbff'
  context.font = '700 38px system-ui, PingFang SC, Microsoft YaHei, sans-serif'
  context.textAlign = 'left'
  context.textBaseline = 'top'
  context.fillText(title, 42, 26)

  context.fillStyle = '#c9d5df'
  context.font = '500 25px system-ui, PingFang SC, Microsoft YaHei, sans-serif'
  wrapCanvasText(context, detail, 42, 76, 420, 31, 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(1.42 * scale, 0.42 * scale, 1)
  return sprite
}

function wrapCanvasText(context, text, x, y, maxWidth, lineHeight, maxLines) {
  let line = ''
  let lineCount = 0
  Array.from(text).forEach((character) => {
    const candidate = `${line}${character}`
    if (context.measureText(candidate).width > maxWidth && line) {
      context.fillText(line, x, y + lineCount * lineHeight)
      line = character
      lineCount += 1
    } else {
      line = candidate
    }
  })
  if (line && lineCount < maxLines) context.fillText(line, x, y + lineCount * lineHeight)
}

function createGuideLine(points, color, opacity = 0.75, lineWidth = 1) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    linewidth: lineWidth,
    depthTest: false,
    depthWrite: false,
  })
  return new THREE.Line(geometry, material)
}

function createSatelliteIcon(position) {
  const group = new THREE.Group()
  group.position.copy(position)
  group.rotation.z = -0.25
  const bodyMaterial = new THREE.MeshBasicMaterial({ color: '#f7fbff' })
  const panelMaterial = new THREE.MeshBasicMaterial({ color: '#2b76d2', transparent: true, opacity: 0.88 })
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.08), bodyMaterial)
  const leftPanel = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.10, 0.025), panelMaterial)
  const rightPanel = leftPanel.clone()
  leftPanel.position.x = -0.26
  rightPanel.position.x = 0.26
  group.add(body, leftPanel, rightPanel)
  return group
}

function createMeteorIcon(position) {
  const group = new THREE.Group()
  group.position.copy(position)
  const material = new THREE.LineBasicMaterial({ color: '#ff9a3c', transparent: true, opacity: 0.85, depthTest: false })
  for (let index = 0; index < 3; index += 1) {
    const y = index * 0.12
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.16, y, 0),
        new THREE.Vector3(0.26, y + 0.24, 0),
      ]),
      material,
    )
    group.add(line)
  }
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 6), new THREE.MeshBasicMaterial({ color: '#ffd36e' }))
  head.position.set(-0.18, -0.02, 0)
  group.add(head)
  return group
}

function createCloudIcon(position) {
  const group = new THREE.Group()
  group.position.copy(position)
  const material = new THREE.MeshBasicMaterial({ color: '#f7fbff', transparent: true, opacity: 0.86, depthWrite: false })
  const puffs = [
    [-0.16, 0, 0, 0.12],
    [0, 0.04, 0, 0.16],
    [0.18, 0, 0, 0.11],
    [0.04, -0.04, 0, 0.12],
  ]
  puffs.forEach(([x, y, z, radius]) => {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 8), material)
    puff.position.set(x, y, z)
    group.add(puff)
  })
  return group
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath()
  context.moveTo(x + radius, y)
  context.arcTo(x + width, y, x + width, y + height, radius)
  context.arcTo(x + width, y + height, x, y + height, radius)
  context.arcTo(x, y + height, x, y, radius)
  context.arcTo(x, y, x + width, y, radius)
  context.closePath()
}

function createStarField() {
  const count = 680
  const positions = new Float32Array(count * 3)
  for (let index = 0; index < count; index += 1) {
    const radius = 26 + Math.random() * 18
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(THREE.MathUtils.randFloatSpread(2))
    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[index * 3 + 1] = radius * Math.cos(phi) * 0.62
    positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const material = new THREE.PointsMaterial({
    color: '#f3fbff',
    size: 0.052,
    transparent: true,
    opacity: 0.96,
  })
  return new THREE.Points(geometry, material)
}

function animate() {
  const now = performance.now()
  const delta = Math.min((now - lastFrameTime) / 1000, 0.033)
  lastFrameTime = now
  if (state.motionEnabled) state.elapsed += delta

  updateBodies()
  updateHighlights()
  updateCamera()
  controls.update()
  updateEarthLayerGuide()
  renderer.render(scene, camera)
}

function updateEarthLayerGuide() {
  if (!earthLayerGroup) return

  const activeStep = getActiveStep()
  const focusLayout = focusLayouts.earthAnalysis
  const visible = activeStep.id === 'earthAnalysis'
  earthLayerGroup.visible = visible
  if (!visible) return

  earthLayerGroup.position.lerp(focusLayout.guidePosition || new THREE.Vector3(), 0.2)
  earthLayerGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.16)
  updateEarthStructureSelection()
}

function updateEarthStructureSelection() {
  const selectedId = state.selectedStructurePartId
  earthLayerGroup.traverse((object) => {
    const isStructureMesh = object.userData?.structureMesh
    const isEmphasisObject = object.userData?.structureEmphasis
    if (!isStructureMesh && !isEmphasisObject) return

    const selected = object.userData.structurePartId === selectedId
    const basePosition = object.userData.basePosition || new THREE.Vector3()
    const explodeDirection = object.userData.explodeDirection || earthStructureExplodeDirection
    const distance = selected ? object.userData.explodeDistance || 0.16 : 0
    object.position.lerp(basePosition.clone().add(explodeDirection.clone().multiplyScalar(distance)), 0.18)

    if (isEmphasisObject) {
      const baseScale = object.userData.emphasisBaseScale || new THREE.Vector3(1, 1, 1)
      const selectedScale = selected ? object.userData.selectedScale || 1.08 : 1
      object.scale.lerp(baseScale.clone().multiplyScalar(selectedScale), 0.18)
    }

    getSelectionMaterials(object).forEach((material) => {
      const baseEmissive = material.userData.baseEmissiveIntensity || 0
      const targetEmissive = selected ? Math.max(baseEmissive * 1.85, isStructureMesh ? 0.42 : 0.18) : baseEmissive
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetEmissive, 0.18)
      }
      if (material.opacity !== undefined && material.userData.baseOpacity !== undefined) {
        const opacityLift = isEmphasisObject ? 0.26 : 0.08
        const targetOpacity = selected ? Math.min(1, material.userData.baseOpacity + opacityLift) : material.userData.baseOpacity
        material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.16)
      }
    })
  })
}

function updateEarthMotionGuide() {
  if (!earthMotionGroup) return

  const active = getActiveStep().id === 'earthMotion' && !state.compareMode && !state.focusedBodyId
  earthMotionGroup.visible = active
  if (!active) return

  const data = earthMotionGroup.userData
  const layout = focusLayouts.earthMotion
  const orbit = layout.earthOrbit
  const moonOrbit = layout.moonOrbit
  const orbitDepth = orbit.depth ?? orbit.radius
  const sunPosition = layout.positions.sun.clone()
  const earthAngle = orbit.angle + state.elapsed * orbit.speed
  const earthPosition = sunPosition.clone().add(new THREE.Vector3(
    Math.cos(earthAngle) * orbit.radius,
    0,
    Math.sin(earthAngle) * orbitDepth,
  ))
  const moonAngle = moonOrbit.angle + state.elapsed * moonOrbit.speed
  const moonPosition = earthPosition.clone().add(new THREE.Vector3(
    Math.cos(moonAngle) * moonOrbit.radius,
    0.08,
    Math.sin(moonAngle) * moonOrbit.radius,
  ))

  data.sunGroup.position.copy(sunPosition)
  data.sunGroup.scale.setScalar(layout.radii.sun)
  data.earthGroup.position.copy(earthPosition)
  data.earthGroup.scale.setScalar(layout.radii.earth)
  data.moonGroup.position.copy(moonPosition)
  data.moonGroup.scale.setScalar(layout.radii.moon)

  const spinSpeed = state.motionEnabled ? 1 : 0
  data.sunMesh.rotation.y += 0.08 * 0.015 * spinSpeed
  data.earthMesh.rotation.y += 0.92 * 0.015 * spinSpeed
  data.moonMesh.rotation.y += 0.04 * 0.015 * spinSpeed

  data.earthOrbit.position.copy(sunPosition)
  data.moonOrbit.position.copy(earthPosition)
  data.sunLabel.position.copy(sunPosition).add(new THREE.Vector3(0, layout.radii.sun + 0.34, 0))
  data.earthLabel.position.copy(earthPosition).add(new THREE.Vector3(0, layout.radii.earth + 0.38, 0))
  data.moonLabel.position.copy(moonPosition).add(new THREE.Vector3(0, layout.radii.moon + 0.28, 0))

  sunLight.position.copy(sunPosition)
  updateBodyLightOverlay({
    bodyObject: { group: data.earthGroup },
    worldSun: sunPosition,
    shadeEntry: { mesh: data.earthShade },
    lightEntry: { mesh: data.earthDaylight },
    showShade: true,
    showLight: true,
  })
  updateBodyLightOverlay({
    bodyObject: { group: data.moonGroup },
    worldSun: sunPosition,
    shadeEntry: { mesh: data.moonShade },
    lightEntry: { mesh: data.moonDaylight },
    showShade: true,
    showLight: true,
  })
  updateEarthMotionSeasonGuide(data, sunPosition, earthPosition, earthAngle)
}

function updateEarthMotionSeasonGuide(data, worldSun, worldEarth, orbitAngle) {
  const guide = data.seasonGuide
  if (!guide || !seasonSunbeam) return

  guide.visible = true
  seasonSunbeam.visible = true
  const declinationDeg = Math.sin(orbitAngle) * 23.5
  const declination = THREE.MathUtils.degToRad(declinationDeg)
  const sinDeclination = Math.sin(declination)
  const cosDeclination = Math.cos(declination)

  const directBand = guide.getObjectByName('阳光直射纬线')
  if (directBand) {
    directBand.position.y = sinDeclination * 1.075
    directBand.scale.set(cosDeclination, 1, cosDeclination)
  }

  const localSun = data.earthGroup.worldToLocal(worldSun.clone()).normalize()
  const horizontalSun = new THREE.Vector3(localSun.x, 0, localSun.z)
  if (horizontalSun.lengthSq() < 0.0001) horizontalSun.set(1, 0, 0)
  else horizontalSun.normalize()

  const subsolarLocal = new THREE.Vector3(
    horizontalSun.x * cosDeclination,
    sinDeclination,
    horizontalSun.z * cosDeclination,
  ).normalize()

  const marker = guide.getObjectByName('阳光直射点')
  const markerGlow = guide.getObjectByName('直射点光晕')
  const markerLabel = guide.getObjectByName('阳光直射点标签')
  const markerPosition = subsolarLocal.clone().multiplyScalar(1.13)
  if (marker) marker.position.copy(markerPosition)
  if (markerGlow) markerGlow.position.copy(markerPosition)
  if (markerLabel) markerLabel.position.copy(markerPosition).add(new THREE.Vector3(0, 0.24, 0))

  const seasonState = getSeasonState(declinationDeg, Math.cos(orbitAngle) > 0)
  const statusLabel = guide.getObjectByName('四季状态标签')
  if (statusLabel) updateSeasonStatusLabel(statusLabel, seasonState)

  updateSeasonSunbeam(worldSun, data.earthGroup.localToWorld(markerPosition.clone()))
}

function updateBodies() {
  const activeStep = getActiveStep()
  const earthObject = objectById.get('earth')
  const moonObject = objectById.get('moon')
  const sunObject = objectById.get('sun')
  const focusLayout = getActiveFocusLayout()
  const earthStructureMode = activeStep.id === 'earthAnalysis'
  const earthMotionMode = activeStep.id === 'earthMotion'
  const bodyFocusMode = Boolean(state.focusedBodyId) && !earthStructureMode && !earthMotionMode

  solarSystem.visible = !earthStructureMode && !earthMotionMode
  labelGroup.visible = !earthStructureMode && !earthMotionMode

  bodies.forEach((body) => {
    const entry = objectById.get(body.id)
    if (!entry) return

    const isFocusedBody = state.focusedBodyId === body.id
    const targetRadius = getBodyDisplayRadius(body)
    entry.group.scale.lerp(new THREE.Vector3(targetRadius, targetRadius, targetRadius), 0.15)
    entry.mesh.rotation.y += body.rotationSpeed * 0.015 * (state.motionEnabled && !isFocusedBody ? 1 : 0)

    if (bodyFocusMode && isFocusedBody) {
      entry.group.position.lerp(focusedBodyCenter, 0.22)
      entry.group.rotation.z = body.id === 'earth' ? THREE.MathUtils.degToRad(body.axialTilt || 0) : 0
    } else if (focusLayout?.bodyIds.has(body.id)) {
      entry.group.position.lerp(getFocusLayoutPosition(body, focusLayout), 0.2)
      entry.group.rotation.z = body.id === 'earth' ? THREE.MathUtils.degToRad(body.axialTilt || 0) : 0
    } else if (state.compareMode) {
      const x = compareSlots[body.id] ?? 0
      entry.group.position.lerp(new THREE.Vector3(x, body.id === 'moon' ? 0.34 : 0, 0), 0.16)
      entry.group.rotation.z = body.id === 'earth' ? THREE.MathUtils.degToRad(body.axialTilt || 0) : 0
    } else if (body.parent) {
      const parentEntry = objectById.get(body.parent)
      const parentPosition = parentEntry?.group.position || new THREE.Vector3()
      const angle = body.angle + state.elapsed * body.orbitSpeed
      const position = new THREE.Vector3(
        parentPosition.x + Math.cos(angle) * body.orbitRadius,
        0.05,
        parentPosition.z + Math.sin(angle) * body.orbitRadius,
      )
      entry.group.position.lerp(position, 0.24)
    } else {
      const angle = body.angle + state.elapsed * body.orbitSpeed
      const position = new THREE.Vector3(
        Math.cos(angle) * body.orbitRadius,
        0,
        Math.sin(angle) * body.orbitRadius,
      )
      entry.group.position.lerp(position, 0.16)
      entry.group.rotation.z = body.id === 'earth' ? THREE.MathUtils.degToRad(body.axialTilt || 0) : 0
    }

    setObjectOpacity(entry.group, getBodyOpacity(body, focusLayout))

    const labelLift = getBodyDisplayRadius(body) + (body.id === 'sun' ? 0.55 : 0.32)
    entry.label.position.copy(entry.group.position).add(new THREE.Vector3(0, labelLift, 0))
    entry.label.visible = shouldShowLabel(body, activeStep)
    const labelTarget = state.selectedBodyId === body.id ? entry.label.userData.largeScale : entry.label.userData.baseScale
    entry.label.scale.lerp(labelTarget, 0.2)
  })

  updateAsteroidBelt()
  updateOrbitVisibility()
  updateSunLight(sunObject)
  updateLightOverlays(earthObject, moonObject, sunObject)
  updateSeasonGuide(earthObject, sunObject)
  updateEarthMotionGuide()
}

function getFocusLayoutPosition(body, focusLayout) {
  const sunPosition = focusLayout.positions.sun || new THREE.Vector3()

  if (body.id === 'earth' && focusLayout.earthOrbit) {
    const orbit = focusLayout.earthOrbit
    const angle = orbit.angle + state.elapsed * orbit.speed
    return sunPosition.clone().add(new THREE.Vector3(
      Math.cos(angle) * orbit.radius,
      0,
      Math.sin(angle) * (orbit.depth ?? orbit.radius),
    ))
  }

  if (body.id === 'moon' && focusLayout.moonOrbit) {
    const earth = bodyById.get('earth')
    const earthPosition = earth ? getFocusLayoutPosition(earth, focusLayout) : sunPosition
    const orbit = focusLayout.moonOrbit
    const angle = orbit.angle + state.elapsed * orbit.speed
    return earthPosition.clone().add(new THREE.Vector3(
      Math.cos(angle) * orbit.radius,
      0.08,
      Math.sin(angle) * orbit.radius,
    ))
  }

  return focusLayout.positions[body.id] || new THREE.Vector3()
}

function getBodyDisplayRadius(body) {
  const baseRadius = state.compareMode ? body.compareRadius : body.classroomRadius
  const focusLayout = getActiveFocusLayout()
  if (focusLayout?.bodyIds.has(body.id)) return focusLayout.radii[body.id]
  if (state.focusedBodyId !== body.id) return baseRadius

  const focusScale = body.id === 'sun' ? 1.28 : body.id === 'moon' ? 2.4 : 1.9
  return Math.min(baseRadius * focusScale, body.id === 'sun' ? 2.8 : 1.9)
}

function getActiveFocusLayout() {
  if (state.compareMode || state.focusedBodyId) return null
  return focusLayouts[getActiveStep().id] || null
}

function getBodyOpacity(body, focusLayout) {
  if (state.focusedBodyId) return state.focusedBodyId === body.id ? 1 : 0
  if (!focusLayout) return 1
  return focusLayout.bodyIds.has(body.id) ? 1 : 0.055
}

function updateAsteroidBelt() {
  if (!asteroidBeltGroup) return

  asteroidBeltGroup.visible = getActiveStep().id === 'overview' && !state.compareMode && !state.focusedBodyId
  if (asteroidBeltGroup.visible && state.motionEnabled) {
    asteroidBeltGroup.rotation.y += 0.0012
  }
}

function setObjectOpacity(object, opacityMultiplier) {
  object.traverse((child) => {
    if (!child.material) return
    setMaterialOpacity(child.material, opacityMultiplier)
  })
}

function getObjectMaterials(object) {
  if (!object.material) return []
  return Array.isArray(object.material) ? object.material : [object.material]
}

function getSelectionMaterials(object) {
  const materials = []
  object.traverse((child) => {
    getObjectMaterials(child).forEach((material) => {
      if (!materials.includes(material)) materials.push(material)
    })
  })
  return materials
}

function setMaterialOpacity(materialOrArray, opacityMultiplier) {
  const materials = Array.isArray(materialOrArray) ? materialOrArray : [materialOrArray]
  materials.forEach((material) => {
    if (material.userData.baseOpacity === undefined) {
      material.userData.baseOpacity = material.opacity
      material.userData.baseTransparent = material.transparent
      material.userData.baseDepthWrite = material.depthWrite
    }

    const nextOpacity = material.userData.baseOpacity * opacityMultiplier
    const nextTransparent = material.userData.baseTransparent || nextOpacity < 0.999
    const nextDepthWrite = nextOpacity < 0.999 ? false : material.userData.baseDepthWrite
    const needsProgramUpdate = material.transparent !== nextTransparent || material.depthWrite !== nextDepthWrite

    material.opacity = nextOpacity
    material.transparent = nextTransparent
    material.depthWrite = nextDepthWrite
    if (needsProgramUpdate) material.needsUpdate = true
  })
}

function updateOrbitVisibility() {
  orbitGroup.visible = !state.compareMode && !state.focusedBodyId && !['earthAnalysis', 'earthMotion'].includes(getActiveStep().id)
  orbitGroup.children.forEach((orbitLine) => {
    const activeStep = getActiveStep()
    const focusLayout = getActiveFocusLayout()
    const related = focusLayout
      ? orbitLine.userData.bodyId === focusLayout.orbitFocusBody || Boolean(focusLayout.moonOrbit && orbitLine.userData.bodyId === 'moon')
      : activeStep.highlights.includes(orbitLine.userData.bodyId)
    const body = bodyById.get(orbitLine.userData.bodyId)
    const parentEntry = orbitLine.userData.parentId ? objectById.get(orbitLine.userData.parentId) : null

    orbitLine.position.set(0, 0, 0)
    orbitLine.scale.setScalar(1)

    if (parentEntry) {
      orbitLine.position.copy(parentEntry.group.position)
    }

    if (focusLayout && related && body?.parent && body.orbitRadius && focusLayout.moonOrbit) {
      orbitLine.scale.setScalar(focusLayout.moonOrbit.radius / body.orbitRadius)
    } else if (focusLayout && related && body?.orbitRadius && focusLayout.earthOrbit) {
      orbitLine.position.copy(focusLayout.positions.sun || new THREE.Vector3())
      orbitLine.scale.setScalar(focusLayout.earthOrbit.radius / body.orbitRadius)
    }

    orbitLine.material.color.set(related ? '#ffe59a' : '#aee7ff')
    orbitLine.material.opacity = focusLayout
      ? related ? 0.58 : 0.045
      : related ? 0.86 : 0.44
  })
}

function updateSunLight(sunObject) {
  if (!sunObject) return
  sunLight.position.copy(sunObject.group.position)
}

function updateLightOverlays(earthObject, moonObject, sunObject) {
  const step = getActiveStep()
  const worldSun = sunObject?.group.position.clone()
  if (!worldSun) return

  updateBodyLightOverlay({
    bodyObject: earthObject,
    worldSun,
    shadeEntry: objectById.get('earth-night-shade'),
    lightEntry: objectById.get('earth-daylight'),
    showShade: step.id === 'earthMotion',
    showLight: step.id === 'earthMotion',
  })

  updateBodyLightOverlay({
    bodyObject: moonObject,
    worldSun,
    shadeEntry: objectById.get('moon-night-shade'),
    lightEntry: objectById.get('moon-daylight'),
    showShade: step.id === 'earthMotion',
    showLight: step.id === 'earthMotion',
  })
}

function updateBodyLightOverlay({ bodyObject, worldSun, shadeEntry, lightEntry, showShade, showLight }) {
  if (!bodyObject) return

  const worldBody = bodyObject.group.position.clone()
  const towardSun = worldSun.clone().sub(worldBody).normalize()
  const awayFromSun = worldBody.clone().sub(worldSun).normalize()

  if (shadeEntry) {
    shadeEntry.mesh.visible = showShade
    shadeEntry.mesh.lookAt(worldBody.clone().add(awayFromSun))
  }

  if (lightEntry) {
    lightEntry.mesh.visible = showLight
    lightEntry.mesh.lookAt(worldBody.clone().add(towardSun))
  }
}

function updateSeasonGuide(earthObject, sunObject) {
  const guide = objectById.get('earth-season-guide')?.group
  if (!guide || !seasonSunbeam) return

  const visible = getActiveStep().id === 'earthMotion' && !state.compareMode && !state.focusedBodyId && Boolean(earthObject && sunObject)
  guide.visible = visible
  seasonSunbeam.visible = visible
  if (!visible) return

  const worldSun = sunObject.group.position.clone()
  const worldEarth = earthObject.group.position.clone()
  const orbitVector = worldEarth.clone().sub(worldSun)
  const orbitAngle = Math.atan2(orbitVector.z, orbitVector.x)
  const declinationDeg = Math.sin(orbitAngle) * 23.5
  const declination = THREE.MathUtils.degToRad(declinationDeg)
  const sinDeclination = Math.sin(declination)
  const cosDeclination = Math.cos(declination)

  const directBand = guide.getObjectByName('阳光直射纬线')
  if (directBand) {
    directBand.position.y = sinDeclination * 1.075
    directBand.scale.set(cosDeclination, 1, cosDeclination)
  }

  const localSun = earthObject.group.worldToLocal(worldSun.clone()).normalize()
  const horizontalSun = new THREE.Vector3(localSun.x, 0, localSun.z)
  if (horizontalSun.lengthSq() < 0.0001) horizontalSun.set(1, 0, 0)
  else horizontalSun.normalize()

  const subsolarLocal = new THREE.Vector3(
    horizontalSun.x * cosDeclination,
    sinDeclination,
    horizontalSun.z * cosDeclination,
  ).normalize()

  const marker = guide.getObjectByName('阳光直射点')
  const markerGlow = guide.getObjectByName('直射点光晕')
  const markerLabel = guide.getObjectByName('阳光直射点标签')
  const markerPosition = subsolarLocal.clone().multiplyScalar(1.13)
  if (marker) marker.position.copy(markerPosition)
  if (markerGlow) markerGlow.position.copy(markerPosition)
  if (markerLabel) markerLabel.position.copy(markerPosition).add(new THREE.Vector3(0, 0.24, 0))

  const seasonState = getSeasonState(declinationDeg, Math.cos(orbitAngle) > 0)
  const statusLabel = guide.getObjectByName('四季状态标签')
  if (statusLabel) updateSeasonStatusLabel(statusLabel, seasonState)

  updateSeasonSunbeam(worldSun, earthObject.group.localToWorld(markerPosition.clone()))
}

function getSeasonState(declinationDeg, movingNorth) {
  if (declinationDeg > 18) {
    return {
      title: '直射北回归线',
      detail: '北半球夏季 · 南半球冬季',
      color: '#ffdc69',
    }
  }
  if (declinationDeg < -18) {
    return {
      title: '直射南回归线',
      detail: '北半球冬季 · 南半球夏季',
      color: '#8fd7ff',
    }
  }
  if (movingNorth) {
    return {
      title: '直射点向北移动',
      detail: '北半球春季 · 阳光逐渐变强',
      color: '#91e88e',
    }
  }
  return {
    title: '直射点向南移动',
    detail: '北半球秋季 · 阳光逐渐变弱',
    color: '#ffb36b',
  }
}

function updateSeasonStatusLabel(sprite, seasonState) {
  const key = `${seasonState.title}|${seasonState.detail}`
  if (sprite.userData.labelKey === key) return
  sprite.userData.labelKey = key

  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 150
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'rgba(8, 16, 28, 0.82)'
  roundRect(context, 18, 16, 476, 118, 18)
  context.fill()
  context.strokeStyle = seasonState.color
  context.lineWidth = 4
  context.stroke()
  context.fillStyle = '#f8fbff'
  context.font = '700 36px system-ui, PingFang SC, Microsoft YaHei, sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(seasonState.title, 256, 52)
  context.fillStyle = '#d4e1ec'
  context.font = '600 25px system-ui, PingFang SC, Microsoft YaHei, sans-serif'
  context.fillText(seasonState.detail, 256, 96)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  sprite.material.map?.dispose()
  sprite.material.map = texture
  sprite.material.needsUpdate = true
}

function updateSeasonSunbeam(worldSun, worldSubsolarPoint) {
  const positions = seasonSunbeam.geometry.attributes.position.array
  const beamDirection = worldSubsolarPoint.clone().sub(worldSun).normalize()
  const startCenter = worldSun.clone().add(beamDirection.clone().multiplyScalar(1.02))
  const up = new THREE.Vector3(0, 1, 0)
  const side = beamDirection.clone().cross(up)
  if (side.lengthSq() < 0.0001) side.set(1, 0, 0)
  else side.normalize()

  const offsets = [-0.18, -0.09, 0, 0.09, 0.18]
  offsets.forEach((offset, index) => {
    const shift = side.clone().multiplyScalar(offset)
    const start = startCenter.clone().add(shift)
    const end = worldSubsolarPoint.clone().add(shift.clone().multiplyScalar(0.26))
    const base = index * 6
    positions[base] = start.x
    positions[base + 1] = start.y
    positions[base + 2] = start.z
    positions[base + 3] = end.x
    positions[base + 4] = end.y
    positions[base + 5] = end.z
  })
  seasonSunbeam.geometry.attributes.position.needsUpdate = true
  seasonSunbeam.geometry.computeBoundingSphere()
}

function shouldShowLabel(body, activeStep) {
  if (state.selectedBodyId === body.id) return true
  if (state.focusedBodyId) return false
  if (state.compareMode) return true
  if (activeStep.id === 'earthAnalysis') return false
  const focusLayout = getActiveFocusLayout()
  if (focusLayout) return focusLayout.bodyIds.has(body.id)
  if (activeStep.highlights.includes(body.id)) return true
  return ['sun', 'earth'].includes(body.id)
}

function updateHighlights() {
  const step = getActiveStep()
  bodies.forEach((body) => {
    const entry = objectById.get(body.id)
    if (!entry) return

    if (step.id === 'earthAnalysis') {
      entry.outline.visible = false
      return
    }

    const highlighted = step.highlights.includes(body.id) && (!state.focusedBodyId || state.focusedBodyId === body.id)
    entry.outline.visible = highlighted
    const pulse = 1 + (highlighted ? Math.sin(performance.now() * 0.004) * 0.035 : 0)
    entry.outline.scale.setScalar(pulse)
  })
}

function setCameraFromStep(immediate = false) {
  const step = getActiveStep()
  const target = getStepTarget(step)
  const position = usesDynamicCameraTarget(step)
    ? target.clone().add(getStepCameraOffset(step))
    : new THREE.Vector3(...step.camera.position)

  if (state.compareMode) {
    position.set(0, 3.0, 12.8)
    target.set(-1.1, 0, 0)
  }

  cameraGoal = { position, target }
  camera.fov = step.camera.fov
  camera.updateProjectionMatrix()
  state.cameraMoveUntil = immediate ? performance.now() + 1 : performance.now() + 1200
  if (immediate) {
    camera.position.copy(position)
    controls.target.copy(target)
  }
}

function getStepCameraOffset(step) {
  const offset = new THREE.Vector3(...step.camera.position)
  if (step.id === 'earthAnalysis' && camera.aspect < 1.1) {
    offset.y += 0.2
    offset.z += 2.8
  }
  return offset
}

function usesDynamicCameraTarget(step) {
  return Boolean(step.camera.targetBody || step.camera.targetFocus)
}

function getStepTarget(step) {
  if (step.camera.targetBody) {
    return objectById.get(step.camera.targetBody)?.group.position.clone() || new THREE.Vector3()
  }
  if (step.camera.targetFocus) {
    return getFocusCameraTarget(step)
  }
  return new THREE.Vector3(...step.camera.target)
}

function getFocusCameraTarget(step) {
  const focusLayout = focusLayouts[step.id]
  if (focusLayout?.cameraTarget) return focusLayout.cameraTarget.clone()

  const bodyIds = focusLayout ? Array.from(focusLayout.bodyIds) : step.focusBodies || []
  const positions = bodyIds
    .map((bodyId) => objectById.get(bodyId)?.group.position)
    .filter(Boolean)

  if (!positions.length) return new THREE.Vector3(...(step.camera.target || [0, 0, 0]))

  const target = positions.reduce((sum, position) => sum.add(position), new THREE.Vector3())
  return target.multiplyScalar(1 / positions.length)
}

function updateCamera() {
  const step = getActiveStep()
  const now = performance.now()
  if (state.focusedBodyId) {
    const body = bodyById.get(state.focusedBodyId)
    const entry = objectById.get(state.focusedBodyId)
    if (body && entry) {
      if (now > state.cameraMoveUntil) return
      const target = focusedBodyCenter.clone()
      const radius = getBodyDisplayRadius(body)
      const distance = THREE.MathUtils.clamp(radius * 5.8, 2.4, body.id === 'sun' ? 9.2 : 7.2)
      const height = THREE.MathUtils.clamp(radius * 1.8, 0.8, 3.2)
      const side = body.id === 'sun' ? 0.8 : 1.15
      cameraGoal.target = target
      cameraGoal.position = target.clone().add(new THREE.Vector3(distance * side, height, distance))
      camera.position.lerp(cameraGoal.position, 0.08)
      controls.target.lerp(cameraGoal.target, 0.1)
      return
    }
  }

  const dynamicCamera = usesDynamicCameraTarget(step) && !state.compareMode
  if (dynamicCamera) {
    if (now > state.cameraMoveUntil) return
    const target = getStepTarget(step)
    cameraGoal.target = target
    cameraGoal.position = target.clone().add(getStepCameraOffset(step))
  }

  if (!dynamicCamera && now > state.cameraMoveUntil) return
  camera.position.lerp(cameraGoal.position, 0.08)
  controls.target.lerp(cameraGoal.target, 0.08)
}

function resizeRenderer() {
  if (!renderer || !camera) return
  const rect = sceneHost.getBoundingClientRect()
  const width = Math.max(320, rect.width)
  const height = Math.max(320, rect.height)
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}
