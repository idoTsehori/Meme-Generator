'use strict'
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gImgs = [
  { id: 1, url: '1.jpg', keywords: ['Trump', 'Angry'] },
  { id: 2, url: '2.jpg', keywords: ['Dog', 'Cute'] },
  { id: 3, url: '3.jpg', keywords: ['Dog', 'Baby'] },
  { id: 4, url: '4.jpg', keywords: ['Cat', 'Computer'] },
  { id: 5, url: '5.jpg', keywords: ['Baby', 'Funny'] },
  { id: 6, url: '6.jpg', keywords: ['Funny', 'Guy'] },
  { id: 7, url: '7.jpg', keywords: ['Funny', 'Baby'] },
  { id: 8, url: '8.jpg', keywords: ['Creepy', 'Funny'] },
  { id: 9, url: '9.jpg', keywords: ['Funny', 'Baby'] },
  { id: 10, url: '10.jpg', keywords: ['Funny', 'Obama'] },
  { id: 11, url: '11.jpg', keywords: ['Kiss', 'WWE'] },
  { id: 12, url: '12.jpg', keywords: ['You', 'Old Man'] },
  { id: 13, url: '13.jpg', keywords: ['Drink', 'Cheers'] },
  { id: 14, url: '14.jpg', keywords: ['Matrix', 'Dramatic'] },
  { id: 15, url: '15.jpg', keywords: ['One Thing', 'Funny'] },
  { id: 16, url: '16.jpg', keywords: ['Laughing', 'Funny'] },
  { id: 17, url: '17.jpg', keywords: ['Putin', 'Two'] },
  { id: 18, url: '18.jpg', keywords: ['Toy Story', 'Look'] },
]

let currDragLineIdx = null

const elCanvas = document.querySelector('canvas')
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  // emojis: [],
  lines: [
    {
      txt: 'Write Something Crazy',
      size: 40,
      align: 'center',
      color: 'white',
      x: elCanvas.width / 2,
      y: 30,
      font: 'impact',
      isDrag: false,
    },
  ],
}

function getMeme() {
  return gMeme
}

function getImgById(selectedImgId) {
  //*Get Meme Img by ID
  const img = gImgs.find((img) => img.id === selectedImgId)
  return img.url
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function setLineTxt(userTxt) {
  const selectedLine = getSelectedLine()
  selectedLine.txt = userTxt
}

function getImgs() {
  return gImgs
}

function setSelectedFont(font) {
  const selectedLine = getSelectedLine()
  selectedLine.font = font
}

function getSelectedFont() {
  return gSelectedFont
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setMemeColor(userColor) {
  const selecetedLine = getSelectedLine()
  selecetedLine.color = userColor
}

function addNewLine(txt = 'New Line') {
  // * Get prev line Y:
  let prevY
  var prevText = gMeme.lines[gMeme.lines.length - 1]
  if (!prevText) prevY = 0
  else prevY = prevText.y

  //* Push a new Line
  gMeme.lines.push({
    txt,
    size: 40,
    align: 'center',
    color: 'white',
    font: 'impact',
    x: gCanvas.width / 2,
    y: prevY + 40,
    isDrag: false,
  })

  //* Select the new Line
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function RemoveLastLine() {
  //* Remove Last Line
  gMeme.lines.pop()
  //* Select the new Line
  gMeme.selectedLineIdx = gMeme.lines.length - 1

  console.log('gMeme', gMeme)
  console.log('gMeme.lines', gMeme.lines)
}

function changeSelectedLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
  console.log('gMeme', gMeme)
  console.log('gMeme.lines', gMeme.lines)
}

function getLineClickedIdx(clickedPos) {
  const lineIdx = gMeme.lines.findIndex((line) => {
    const lineMetrics = gCtx.measureText(line.txt)
    const lineX = line.x
    const lineY = line.y
    return (
      clickedPos.x >= lineX - lineMetrics.actualBoundingBoxLeft &&
      clickedPos.x <= lineX + lineMetrics.actualBoundingBoxRight &&
      clickedPos.y >= lineY - lineMetrics.actualBoundingBoxDescent &&
      clickedPos.y <= lineY + lineMetrics.actualBoundingBoxAscent
    )
  })
  return lineIdx
}

function setLineDrag(selectedLineIdx, isDrag) {
  currDragLineIdx = selectedLineIdx
  gMeme.lines[selectedLineIdx].isDrag = isDrag
}
