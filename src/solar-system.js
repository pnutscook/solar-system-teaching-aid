import * as THREE from 'three'
import { OrbitControls } from '../vendor/OrbitControls.js'

const teachingConfig = {
  title: '太阳系小学课堂教具',
  showRealValuesByDefault: false,
  autoMotionByDefault: true,
  defaultStepId: 'overview',
}

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
    title: '认识太阳系',
    shortTitle: '认识太阳系',
    prompt: '太阳、行星和轨道',
    narration: '太阳系是以太阳为中心的大家庭。这里有八大行星、许多卫星、小行星、彗星和尘埃。地球是从太阳向外数的第三颗行星，木星最大，海王星离太阳最远。',
    facts: [
      '太阳占了太阳系绝大部分质量，是光和热的主要来源。',
      '八大行星从近到远是：水星、金星、地球、火星、木星、土星、天王星、海王星。',
      '火星和木星之间有小行星带；木星、土星、天王星、海王星都是外侧的大行星。',
    ],
    highlights: ['sun', 'earth', 'jupiter', 'saturn'],
    focusBodies: ['sun', 'earth', 'jupiter', 'saturn'],
    camera: { position: [0, 7.0, 12.5], target: [0, 0, 0], fov: 48 },
  },
  {
    id: 'order',
    title: '行星顺序',
    shortTitle: '行星顺序',
    prompt: '从太阳向外数',
    narration: '从离太阳最近到最远，八大行星依次是：水星、金星、地球、火星、木星、土星、天王星、海王星。',
    facts: [
      '水星最靠近太阳，海王星离太阳最远。',
      '木星最大，地球排在第三位。',
      '课堂里可以用“水金地火木土天海”快速记住顺序。',
    ],
    highlights: ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
    focusBodies: ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
    camera: { position: [0, 9.2, 10.8], target: [0, 0, 0], fov: 52 },
  },
  {
    id: 'rotation',
    title: '地球自转与昼夜',
    shortTitle: '地球自转',
    prompt: '亮的一面是白天',
    narration: '地球像陀螺一样不停自转。面向太阳的一侧是白天，背向太阳的一侧是夜晚。',
    facts: [
      '地球自转一圈大约是 24 小时。<span class="metric">真实数值：约 23 小时 56 分。</span>',
      '昼夜交替不是太阳绕着地球跑，而是地球自己在转。',
      '地球上的不同地方，会在不同时间迎来白天和夜晚。',
    ],
    highlights: ['sun', 'earth', 'moon'],
    focusBodies: ['sun', 'earth', 'moon'],
    camera: { position: [0.2, 2.35, 6.2], targetFocus: true, fov: 42 },
  },
  {
    id: 'seasons',
    title: '公转、倾角与四季',
    shortTitle: '四季变化',
    prompt: '地球斜着绕太阳走',
    narration: '地球绕太阳公转时，自转轴一直保持倾斜。阳光照到地面的角度和时间不同，就会形成季节变化。',
    facts: [
      '地球绕太阳公转一圈大约是 1 年。',
      '四季主要和地球倾角有关，不是因为夏天离太阳最近。',
      '同一时间，南北半球可能处在不同季节。',
    ],
    highlights: ['sun', 'earth'],
    focusBodies: ['sun', 'earth'],
    camera: { position: [0.25, 2.45, 6.4], targetFocus: true, fov: 42 },
  },
  {
    id: 'moon',
    title: '月球与月相',
    shortTitle: '月相',
    prompt: '月亮形状为什么会变',
    narration: '月球绕地球运动。太阳总是照亮月球的一半，但我们在地球上看到的亮面大小会变化，所以出现不同月相。',
    facts: [
      '月球是地球的卫星，会绕地球运动。',
      '月球自己不会发光，它反射太阳光。',
      '月相是我们看到的月球亮面发生变化。',
    ],
    highlights: ['sun', 'earth', 'moon'],
    focusBodies: ['sun', 'earth', 'moon'],
    showPhases: true,
    camera: { position: [0.2, 2.35, 6.2], targetFocus: true, fov: 42 },
  },
  {
    id: 'earthAnalysis',
    title: '地球解析',
    shortTitle: '地球解析',
    prompt: '地心到大气层',
    narration: '把地球剖开来看，从中心到外面依次有内核、外核、地幔、地壳，最外面包着大气层。地表有海洋和陆地，大气层保护着地球上的生命。',
    facts: [
      '地心附近有内核和外核，温度很高，主要由铁和镍等物质组成。',
      '地幔位于地壳下面，是地球内部最厚的一层。',
      '地壳很薄，外面还有大气层。<span class="metric">地球平均直径约 12742 千米。</span>',
    ],
    highlights: ['earth'],
    focusBodies: ['earth'],
    camera: { position: [0.12, 1.55, 6.0], targetFocus: true, fov: 42 },
  },
]

const state = {
  activeStepId: teachingConfig.defaultStepId,
  compareMode: false,
  motionEnabled: teachingConfig.autoMotionByDefault,
  showRealValues: teachingConfig.showRealValuesByDefault,
  selectedBodyId: '',
  focusedBodyId: '',
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
  rotation: {
    bodyIds: new Set(['sun', 'earth', 'moon']),
    radii: { sun: 0.98, earth: 0.78, moon: 0.24 },
    positions: {
      sun: new THREE.Vector3(-1.32, 0, -0.08),
    },
    earthOrbit: { radius: 2.22, speed: 0.30, angle: 0.08 },
    moonOrbit: { radius: 1.08, speed: 1.7, angle: 0.6 },
    orbitFocusBody: 'earth',
  },
  seasons: {
    bodyIds: new Set(['sun', 'earth']),
    radii: { sun: 0.98, earth: 0.86 },
    positions: {
      sun: new THREE.Vector3(-1.28, 0, -0.08),
    },
    earthOrbit: { radius: 2.32, speed: 0.34, angle: 0.38 },
    orbitFocusBody: 'earth',
  },
  moon: {
    bodyIds: new Set(['sun', 'earth', 'moon']),
    radii: { sun: 0.98, earth: 0.72, moon: 0.32 },
    positions: {
      sun: new THREE.Vector3(-1.32, 0, -0.08),
    },
    earthOrbit: { radius: 2.22, speed: 0.30, angle: 0.08 },
    moonOrbit: { radius: 1.12, speed: 1.7, angle: 0.6 },
    orbitFocusBody: 'earth',
  },
  earthAnalysis: {
    bodyIds: new Set(['earth']),
    radii: { earth: 0.82 },
    positions: {
      earth: new THREE.Vector3(-1.18, 0, 0),
    },
    guidePosition: new THREE.Vector3(0.68, 0.0, 0),
    cameraTarget: new THREE.Vector3(0.18, 0, 0),
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
let orbitGroup
let labelGroup
let earthLayerGroup
let starField
let sunLight
let ambientLight
let lastFrameTime = performance.now()
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

  ambientLight = new THREE.AmbientLight('#b8c9d9', 0.62)
  scene.add(ambientLight)

  sunLight = new THREE.PointLight('#fff1bd', 5.2, 50, 1.35)
  sunLight.position.set(0, 0, 0)
  scene.add(sunLight)

  solarSystem = new THREE.Group()
  orbitGroup = new THREE.Group()
  labelGroup = new THREE.Group()
  scene.add(solarSystem, orbitGroup, labelGroup)

  starField = createStarField()
  scene.add(starField)

  createOrbitRings()
  createBodies()
  earthLayerGroup = createEarthLayerGuide()
  scene.add(earthLayerGroup)
  window.addEventListener('resize', resizeRenderer)
}

function bindEvents() {
  scaleToggle.addEventListener('click', () => {
    state.compareMode = !state.compareMode
    clearBodyFocus()
    scaleToggle.setAttribute('aria-pressed', String(state.compareMode))
    scaleNote.textContent = state.compareMode
      ? '大小对比：只比较天体大小，不表示真实距离。'
      : '课堂比例：每颗行星都被放大，方便在投屏上看清。'
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
      renderStepButtons()
      renderTeachingPanel()
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
  const utterance = new SpeechSynthesisUtterance(getNarrationText())
  utterance.lang = 'zh-CN'
  utterance.rate = 0.88
  utterance.pitch = 1.02
  utterance.volume = 1
  const voice = getChineseVoice()
  if (voice) utterance.voice = voice
  utterance.onend = () => {
    state.narrationPlaying = false
    syncNarrationState()
  }
  utterance.onerror = () => {
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
  const picked = pickBodyFromEvent(event)
  if (!picked) return

  state.selectedBodyId = picked.body.id
  state.focusedBodyId = picked.body.id
  stopNarration()
  renderTeachingPanel()
  setCameraForBody(picked.body)
  sceneCaption.textContent = `已聚焦：${picked.body.name}。星球已放大并居中，方便课堂讲解。`
}

function handleScenePointerMove(event) {
  renderer.domElement.style.cursor = pickBodyFromEvent(event) ? 'pointer' : 'grab'
}

function pickBodyFromEvent(event) {
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
  const hadFocus = Boolean(state.focusedBodyId || state.selectedBodyId)
  state.focusedBodyId = ''
  state.selectedBodyId = ''
  if (hadFocus) renderTeachingPanel()
}

function setCameraForBody(body) {
  const entry = objectById.get(body.id)
  if (!entry) return

  const target = entry.group.position.clone()
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
      const nightShade = createNightShade()
      const daylight = createLightHemisphere('#fff0a8', 0.28, 1.032)
      group.add(nightShade)
      group.add(daylight)
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
  group.name = '地球拆解层'
  group.visible = false

  const layers = [
    { name: '地心', color: '#ffe66f', radius: 0.18, x: -0.68, labelY: -0.62, opacity: 0.96 },
    { name: '外核', color: '#f4a43f', radius: 0.28, x: -0.28, labelY: -0.62, opacity: 0.88 },
    { name: '地幔', color: '#d96845', radius: 0.40, x: 0.24, labelY: -0.62, opacity: 0.78 },
    { name: '地壳', color: '#8eb96a', radius: 0.50, x: 0.88, labelY: -0.62, opacity: 0.58 },
    { name: '大气层', color: '#93dfff', radius: 0.62, x: 1.62, labelY: -0.62, opacity: 0.26, wireframe: true },
  ]

  const axisMaterial = new THREE.LineBasicMaterial({ color: '#d9e8ef', transparent: true, opacity: 0.45 })
  const axisGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(layers[0].x - 0.25, 0, 0),
    new THREE.Vector3(layers[layers.length - 1].x + 0.78, 0, 0),
  ])
  group.add(new THREE.Line(axisGeometry, axisMaterial))

  layers.forEach((layer) => {
    const material = new THREE.MeshBasicMaterial({
      color: layer.color,
      transparent: true,
      opacity: layer.opacity,
      wireframe: Boolean(layer.wireframe),
      depthWrite: false,
    })
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(layer.radius, 40, 20), material)
    sphere.position.set(layer.x, 0, 0)
    group.add(sphere)

    const label = createLayerLabel(layer.name, layer.color)
    label.position.set(layer.x, layer.labelY, 0)
    group.add(label)
  })

  const title = createLayerLabel('地球拆解', '#f7f5ed', 1.35)
  title.position.set(0.46, 0.82, 0)
  group.add(title)

  return group
}

function createLayerLabel(text, color, scale = 0.88) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 72
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'rgba(14, 17, 24, 0.76)'
  roundRect(context, 18, 14, 220, 44, 14)
  context.fill()
  context.strokeStyle = color
  context.lineWidth = 3
  context.stroke()
  context.fillStyle = '#f7f5ed'
  context.font = '600 25px system-ui, PingFang SC, Microsoft YaHei, sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, 128, 37)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(0.78 * scale, 0.22 * scale, 1)
  return sprite
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
  const focusLayout = getActiveFocusLayout()
  const visible = activeStep.id === 'earthAnalysis' && Boolean(focusLayout)
  earthLayerGroup.visible = visible
  if (!visible) return

  earthLayerGroup.position.lerp(focusLayout.guidePosition || new THREE.Vector3(), 0.2)
  earthLayerGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.16)
}

function updateBodies() {
  const activeStep = getActiveStep()
  const earthObject = objectById.get('earth')
  const moonObject = objectById.get('moon')
  const sunObject = objectById.get('sun')
  const focusLayout = getActiveFocusLayout()

  bodies.forEach((body) => {
    const entry = objectById.get(body.id)
    if (!entry) return

    const targetRadius = getBodyDisplayRadius(body)
    entry.group.scale.lerp(new THREE.Vector3(targetRadius, targetRadius, targetRadius), 0.15)
    entry.mesh.rotation.y += body.rotationSpeed * 0.015 * (state.motionEnabled ? 1 : 0)

    if (focusLayout?.bodyIds.has(body.id)) {
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

  updateOrbitVisibility()
  updateSunLight(sunObject)
  updateLightOverlays(earthObject, moonObject, sunObject)
}

function getFocusLayoutPosition(body, focusLayout) {
  const sunPosition = focusLayout.positions.sun || new THREE.Vector3()

  if (body.id === 'earth' && focusLayout.earthOrbit) {
    const orbit = focusLayout.earthOrbit
    const angle = orbit.angle + state.elapsed * orbit.speed
    return sunPosition.clone().add(new THREE.Vector3(
      Math.cos(angle) * orbit.radius,
      0,
      Math.sin(angle) * orbit.radius,
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
  if (!focusLayout) return 1
  return focusLayout.bodyIds.has(body.id) ? 1 : 0.055
}

function setObjectOpacity(object, opacityMultiplier) {
  object.traverse((child) => {
    if (!child.material) return
    setMaterialOpacity(child.material, opacityMultiplier)
  })
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
  orbitGroup.visible = !state.compareMode
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
    showShade: ['rotation', 'seasons', 'moon'].includes(step.id),
    showLight: step.id === 'rotation',
  })

  updateBodyLightOverlay({
    bodyObject: moonObject,
    worldSun,
    shadeEntry: objectById.get('moon-night-shade'),
    lightEntry: objectById.get('moon-daylight'),
    showShade: step.id === 'moon',
    showLight: step.id === 'moon',
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

function shouldShowLabel(body, activeStep) {
  if (state.selectedBodyId === body.id) return true
  if (state.compareMode) return true
  if (activeStep.id === 'earthAnalysis') return false
  const focusLayout = getActiveFocusLayout()
  if (focusLayout) return focusLayout.bodyIds.has(body.id)
  if (activeStep.id === 'order') return body.id !== 'moon'
  if (activeStep.highlights.includes(body.id)) return true
  return ['sun', 'earth'].includes(body.id)
}

function updateHighlights() {
  const step = getActiveStep()
  bodies.forEach((body) => {
    const entry = objectById.get(body.id)
    if (!entry) return

    const highlighted = step.highlights.includes(body.id)
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
  if (state.focusedBodyId) {
    const body = bodyById.get(state.focusedBodyId)
    const entry = objectById.get(state.focusedBodyId)
    if (body && entry) {
      const target = entry.group.position.clone()
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
    const target = getStepTarget(step)
    cameraGoal.target = target
    cameraGoal.position = target.clone().add(getStepCameraOffset(step))
  }

  if (!dynamicCamera && performance.now() > state.cameraMoveUntil) return
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
