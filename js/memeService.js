'use strict'
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

var gImgs = [
  { id: 1, url: '1.jpg', keywords: ['Trump', 'Angry'] },
  { id: 2, url: '2.jpg', keywords: ['Dog', 'Cute'] },
]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 40,
      align: 'center',
      color: 'white',
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
  console.log('selectedLine', selectedLine)
}

function getImgs() {
  return gImgs
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setMemeColor(userColor) {
  const selecetedLine = getSelectedLine()
  selecetedLine.color = userColor
}

function addNewLine() {
  //* Push a new Line
  gMeme.lines.push({
    txt: 'New Line',
    size: 40,
    align: 'center',
    color: 'white',
  })

  //* Select the new Line
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function RemoveLastLine() {
  //* Remove Last Line
  gMeme.lines.pop()
  //* Select the new Line
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function changeSelectedLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}
