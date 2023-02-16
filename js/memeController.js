'use strict'
let gCanvas
let gCtx

// TODO Drag and Drop:
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gCanvas = document.querySelector('#canvas')
  gCtx = gCanvas.getContext('2d')
  renderGallery()
  // addListeners()
}

function renderMeme() {
  const meme = getMeme()
  const memeLines = meme.lines
  const memeImg = getImgById(meme.selectedImgId)
  const img = new Image()
  img.src = `imgs/memes-square/${memeImg}`

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    memeLines.forEach((memeLine, idx) => {
      //* Text Lines Draw:
      const memeIsSelected = idx === meme.selectedLineIdx
      drawTxt(memeLine, memeIsSelected)
    })
  }
}

function drawTxt(memeLine, isSelected) {
  const { txt, font, size, color, align, x, y } = memeLine

  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = color
  gCtx.align = align
  gCtx.font = `${size}px ${font}`
  var textWidth = gCtx.measureText(txt).width
  var lineHeight = size * 1.286
  gCtx.textBaseline = 'top'

  gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.

  //* If the Text Line is Selected- focus it:
  if (isSelected) {
    gCtx.strokeStyle = 'blue'
    gCtx.strokeRect(x, y, textWidth, lineHeight)
  }
}

function onTextInput(userTxt) {
  setLineTxt(userTxt)
  renderMeme()
}

function changeTxtColor(color) {
  setMemeColor(color)
  renderMeme()
}

function changeFontSize(increaseClicked) {
  const selectedLine = getSelectedLine()
  const diff = increaseClicked ? 7 : -7
  selectedLine.size += diff
  //
  renderMeme()
}

function onAddLine() {
  addNewLine()
  renderMeme()
}

function onRemoveLine() {
  RemoveLastLine()
  renderMeme()
}

function onSwitchLine() {
  changeSelectedLine()
  // Change Input Text to Selelcted Line:
  const { txt: lineTxt } = getSelectedLine()
  document.querySelector('.editor #txt').value = lineTxt
  renderMeme()
}

function onFontSelect(font) {
  setSelectedFont(font)
  renderMeme()
}

function onMoveTxtDown() {
  const selectedLine = getSelectedLine()
  selectedLine.y += 30
  renderMeme()
}

function onMoveTxtUp() {
  const selectedLine = getSelectedLine()
  selectedLine.y -= 30
  renderMeme()
}

function onMoveTxtRight() {
  const selectedLine = getSelectedLine()
  selectedLine.x += 30
  renderMeme()
}

function onMoveTxtLeft() {
  const selectedLine = getSelectedLine()
  selectedLine.x -= 30
  renderMeme()
}

function saveLineXY(mimeLine, x, y) {
  mimeLine.x = x
  mimeLine.y = y
  LinesXY.push(mimeLine)
}

//*Handle the listeners
// TODO Drag n Drop
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  //Listen for resize ev
  // window.addEventListener('resize', () => {
  //   onInit()
  // })
}

function addMouseListeners() {
  gCanvas.addEventListener('mousedown', onDown)
  gCanvas.addEventListener('mousemove', onMove)
  gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gCanvas.addEventListener('touchstart', onDown)
  gCanvas.addEventListener('touchmove', onMove)
  gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  // console.log('Down')
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  // console.log('pos', pos)
  if (!isLineClicked(pos, ev)) return

  setCircleDrag(true)
  //Save the pos we start from
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function getEvPos(ev) {
  // Gets the offset pos , the default pos
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
