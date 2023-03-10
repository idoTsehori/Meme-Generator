'use strict'
let gCanvas
let gCtx
// let isDownload = false
let gStartPos

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gCanvas = document.querySelector('#canvas')
  gCtx = gCanvas.getContext('2d')
  renderGallery()
  addListeners()
}

function renderMeme(isDownload = false) {
  const meme = getMeme()
  const memeLines = meme.lines
  const memeImg = getImgById(meme.selectedImgId)
  let img = new Image()
  img.src = `imgs/memes-square/${memeImg}`

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    memeLines.forEach((memeLine, idx) => {
      //* Text Lines Draw:
      const memeIsSelected = idx === meme.selectedLineIdx
      drawTxt(memeLine, memeIsSelected, isDownload)
    })
  }
}

function drawEmoji(emoji) {
  gCtx.fillText(emoji.emoji, emoji.x, emoji.y)
}

function drawTxt(memeLine, isSelected, isDownload) {
  const { txt, font, size, color, align, x, y } = memeLine

  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = color
  gCtx.textAlign = align
  gCtx.font = `${size}px ${font}`
  var textWidth = gCtx.measureText(txt).width
  var lineHeight = size * 1.286
  gCtx.textBaseline = 'middle'
  var xDiff = x - textWidth / 2 - 10
  var yDiff = y - lineHeight / 2
  gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.

  //* If the Text Line is Selected- focus it:

  if (!isDownload && isSelected) {
    gCtx.strokeStyle = 'grey'
    gCtx.strokeRect(xDiff, yDiff, textWidth + 20, lineHeight)
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
  // Focus the text Input:
  document.querySelector('.editor #txt').focus()
  document.querySelector('.editor #txt').value = getSelectedLine().txt
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

// on Align Btns click:
function allignLeft() {
  const selectedline = getSelectedLine()
  console.log('selectedline', selectedline)
  var textWidth = gCtx.measureText(selectedline.txt).width
  console.log('textWidth', textWidth)
  // var lineHeight = selectedline.size * 1.286
  // console.log('lineHeight', lineHeight)
  // selectedline.x = textWidth
  selectedline.x -= 100
  renderMeme()
}

function allignRight() {
  const selectedline = getSelectedLine()
  console.log('selectedline', selectedline)
  var textWidth = gCtx.measureText(selectedline.txt).width
  console.log('textWidth', textWidth)
  // var lineHeight = selectedline.size * 1.286
  // console.log('lineHeight', lineHeight)
  // selectedline.x = textWidth
  selectedline.x += 100
  renderMeme()
}
function allignCenter() {
  const selectedline = getSelectedLine()
  selectedline.x = gCanvas.width / 2
  renderMeme()
}

//*Handle the listeners
// TODO Drag n Drop
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  //Listen for resize ev
  window.addEventListener('resize', () => {
    reziseCanvas()
  })
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  // Note: changing the canvas dimension this way clears the canvas
  gCanvas.width = elContainer.offsetWidth
  gCanvas.height = elContainer.offsetWidth
  renderMeme()
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
  const pos = getEvPos(ev)
  const selectedLineIdx = getLineClickedIdx(pos)
  console.log('selectedLineIdx', selectedLineIdx)

  // * If its equal to -1 means there's no clicked line idx
  if (selectedLineIdx === -1) {
    unSelectTxt()
    renderMeme()
    return
  }
  // Select the line with rect:
  getMeme().selectedLineIdx = selectedLineIdx
  // Change input to Selected Line Text
  document.querySelector('.editor #txt').value = getMeme().lines[selectedLineIdx].txt
  renderMeme()
  // Set the line drag prop to true:
  setLineDrag(selectedLineIdx, true)
  // change the cursor:
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

function onMove(ev) {
  if (currDragLineIdx === null) return
  const selecetedLine = getMeme().lines[currDragLineIdx]
  const pos = getEvPos(ev)
  selecetedLine.x = pos.x
  selecetedLine.y = pos.y
  renderMeme()
}

function onUp() {
  if (currDragLineIdx === null) return
  setLineDrag(currDragLineIdx, false)
  currDragLineIdx = null
  document.body.style.cursor = 'grab'
}

// *Emoji click
function onEmojiClick(emojiName, emoji) {
  addNewLine(emoji)
  renderMeme()
}

// * On Download clcik
function downloadImg(elLink) {
  renderMeme(true)
  const imgContent = gCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}
