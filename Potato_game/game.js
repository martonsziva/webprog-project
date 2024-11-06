//Created by: Sziva Márton(FKJJ7E)

//ALL DATA
const rows = 11
const cols = 11
const SEASON_LENGTH = 7
const MAXIMUM_MISSIONS = 12
const types = ['base', 'mountain', 'water', 'forest', 'farm', 'town']
const seasons = ['spring', 'summer', 'fall', 'winter']
let currSeason = seasons[0]
let remTime = 28
let pointsSum = 0
let matrix = []
let gameEnded = false

const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]

const missions = 
{
  "basic": [
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
    }
  ],
  "extra": [
    {
      "title": "Fasor",
      "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
    },
    {
      "title": "Gazdag város",
      "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
    },
    {
      "title": "Öntözőcsatorna",
      "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte."
    },
    {
      "title": "Mágusok völgye",
      "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz."
    },
    {
      "title": "Üres telek",
      "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz."
    },
    {
      "title": "Sorház",
      "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
    },
    {
      "title": "Páratlan silók",
      "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz."
    },
    {
      "title": "Gazdag vidék",
      "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz."
    }
  ],
}

let randomNum2;
let currMissions = []
let activeMissions = []
let seasonScores = []
let usedElements = []

let randomNum = Math.floor(Math.random() * elements.length) 
let currentElement = elements[randomNum]

//SELECTORS

const table = document.querySelector("#mainTable")
const nextTileTable = document.querySelector("#nextTile")
const missionsTable = document.querySelector("#missionTable")
const seasonTable = document.querySelector("#seasonTable")
const rotateBtn = document.querySelector("#rotatebtn")
const mirrorBtn = document.querySelector("#mirrorbtn")
const nextTileLabel = document.querySelector("#lblNextTile")
const currSeasonText = document.querySelector("#currSeasonH")
const remSeasonText = document.querySelector("#remSeasonH")
const missionLabels = document.querySelectorAll(".label")
const gameEndText = document.querySelector("#gameEndMsg")
const totalScoreText = document.querySelector("#totalScore")

//coordinates where mountains are
const mountCoord = [[2, 2], [4, 9], [6, 4], [9, 10], [10, 6]]

//EVENT LISTENERS for the main buttons
rotateBtn.addEventListener("click", () => {
    rotateElement(currentElement)
})

mirrorBtn.addEventListener("click", () => {
    mirrorElement(currentElement)
})

//MAIN - start
createUI()
updateTable()

//CREATING UI
function createUI() {
    createTable()
    showNextTile(currentElement)
    createMountains()
    createMissions()
    updateSeason()
    setNewACtiveMissions('spring')
    setSeasonColor()
}

//CREATING UI
function setSeasonColor() {
    const colors = ["#7EAC4C", "#DEC20B", "#af4522", "#48b7d3"]
    for(let i = 0; i < colors.length; i++){
        let x = Math.floor(i/2)
        let y = i % 2
        const cell = seasonTable.rows[x].cells[y]
        cell.style.backgroundColor = colors[i]
    }
}

function createTable() {
    for(let i = 0; i < rows; i++) {
        matrix[i] = []
        const row = table.insertRow()
        for(let j = 0; j < cols; j++) {
            const cell = row.insertCell()
            matrix[i][j] = 'base'
            cell.addEventListener("click", () => {
                handleClick(i, j)
            })
            cell.addEventListener("onmouseover", () => {
                onHover()
            })
        }
    }
}

function paintCell(cell, type) {
    switch(type) {
        case 'base': //base
            cell.style.backgroundColor = "#fdee48"
            cell.style.backgroundImage = "url(./img/assets/tiles/base_tile.png)"
            cell.style.borderColor = "#ffffff"
            cell.style.backgroundSize = "cover"
            break;
        case 'mountain': //mountain
            cell.style.backgroundColor = "brown"
            cell.style.backgroundImage = "url(./img/assets/tiles/mountain_tile.png)"
            cell.style.borderColor = "#ffffff"
            cell.style.backgroundSize = "cover"
            break;
        case 'water': // water
            cell.style.backgroundColor = "blue"
            cell.style.backgroundImage = "url(./img/assets/tiles/water_tile.png)"
            cell.style.borderColor = "#ffffff"
            cell.style.backgroundSize = "cover"
            break;
        case 'forest': //forest
            cell.style.backgroundColor = "darkgreen"
            cell.style.backgroundImage = "url(./img/assets/tiles/forest_tile.png)"
            cell.style.borderColor = "#ffffff"
            cell.style.backgroundSize = "cover"
            break;
        case 'farm': //plains
            cell.style.backgroundColor = "lightgreen"
            cell.style.backgroundImage = "url(./img/assets/tiles/plains_tile.png)"
            cell.style.borderColor = "#ffffff"
            cell.style.backgroundSize = "cover"
            break;
        case 'town': //village
            cell.style.backgroundColor = "red"
            cell.style.backgroundImage = "url(./img/assets/tiles/village_tile.png)"
            cell.style.borderColor = "#ffffff"
            cell.style.backgroundSize = "cover"
            break;
    }
}

function updateTable() {
    for(let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = table.rows[i].cells[j]
            paintCell(cell, matrix[i][j])
        }
    }
}

function createMountains() {
    for(let i = 0; i < mountCoord.length; i++) {
        const[row, col] = mountCoord[i]
        matrix[row-1][col-1] = 'mountain'
    }
}

//PLACING ELEMENTS
function handleClick(row, col) {
    if(gameEnded) return
    placeElement(row, col, currentElement)
}

function isPlaceable(row, col, element) {
    let offSetRow = -1
    let offSetCol = 0
    let minX = element.shape.length
    let minY = element.shape[0].length
    let maxX = 0
    let maxY = 0
    let firstField = false
    for(let i = 0; i < element.shape.length; i++) { //columns
        if(!firstField) {
            offSetRow++
            offSetCol = 0
        }
        for(let j = 0; j < element.shape[i].length; j++) { //rows
            if(element.shape[i][j] == 1) {
                firstField = true
                if(j < minX) minX = j
                if(j > maxX) maxX = j
                if(i < minY) minY = i
                if(i > maxY) maxY = i

            }
            if(!firstField) offSetCol++
        }
    }
    if(col - offSetCol + minX < 0) {
        return false
    }
    if(col - offSetCol + maxX >= cols) {
        return false
    }
    if(row - offSetRow + minY < 0) {
        return false
    }
    if(row - offSetRow + maxY >= rows) {
        return false
    }
    for(let i = 0; i < element.shape.length; i++) {
        for(let j = 0; j < element.shape[i].length; j++) {
            if(element.shape[i][j] == 1) {
                if(matrix[i + row - offSetRow][j + col - offSetCol] != 'base') {
                    return false
                }
                
            }
        }
    }
    return true

}

function placeElement(row, col, element) {
    if(!isPlaceable(row, col, element)) return
    let offSetRow = -1
    let offSetCol = 0
    let firstField = false
    for(let i = 0; i < element.shape.length; i++) {
        if(!firstField){
            offSetRow++
            offSetCol = 0
        } 
        for(let j = 0; j < element.shape[i].length; j++) {
            if(element.shape[i][j] == 1) {
                firstField = true
                matrix[i + row - offSetRow][j + col - offSetCol] = element.type
            }
            if(!firstField) offSetCol++
        }
    }
    remTime = remTime - element.time
    usedElements.push(element)

    updateSeason()
    prepareNewElement()
    updateTable()
    if(remTime <= 0) {
        endGame()
        return
    }
    showNextTile(currentElement)
}

function prepareNewElement() {
    let found = false
    while(!found) {
        randomNum = Math.floor(Math.random() * elements.length)
        currentElement = elements[randomNum]
        if(!usedElements.includes(currentElement)) found = true
    }
}

function showNextTile(element) {
    let first = false
    for(let i = 0; i < element.shape.length; i++) {
        for(let j = 0; j < element.shape[i].length; j++) {
            const cell = nextTileTable.rows[i].cells[j]
            if(element.shape[i][j] == 1) {
                paintCell(cell, element.type)
                if(!first) {
                    cell.style.borderColor = "#8e3a59"
                    first = true
                }
            } else {
                paintCell(cell, 'base')
            }
        }
    }
    nextTileLabel.innerHTML = element.time
}

//Rotating element, if rotate button is pressed
function rotateElement(element) {
    if(gameEnded) return
    temp = [[0,0,0],[0,0,0],[0,0,0]]
    for(let i = 0; i < element.shape.length; i++) {
        for(let j = 0; j < element.shape[i].length; j++) {
            temp[i][j] = element.shape[j][i]
        }
    }
    for(let i = 0; i < element.shape.length; i++) {
        for(let j = 0; j < element.shape[i].length; j++) {
            element.shape[i][j] = temp[i][2-j]
        }
    }
    showNextTile(element)
    return element
}

//Mirroring current element, if mirror button is pressed
function mirrorElement(element) {
    if(gameEnded) return
    temp = [[0,0,0],[0,0,0],[0,0,0]]
    for(let i = 0; i < element.shape.length; i++) {
        for(let j = 0; j < element.shape[i].length; j++) {
            temp[i][j] = element.shape[i][2-j]
        }
    }
    element.shape = temp
    showNextTile(element)
    return element
}

//MISSIONS
//Randomizing 
function createMissions() {
    alreadyUsed = []
    let i = 0;
    while(i < 4) {
        randomNum2 = Math.floor(Math.random() * MAXIMUM_MISSIONS)
        if(alreadyUsed.includes(randomNum2)) continue
        if(randomNum2 < 4) {
            currMissions[i] = missions.basic[randomNum2]
        } else {
            currMissions[i] = missions.extra[randomNum2 - 4]
        }
        alreadyUsed[i] = randomNum2
        showMissions(currMissions[i], i)
        i++
    }
    activeMissions = [currMissions[0], currMissions[1]]

}

//ALL 12 currently implemented missions - counts the score and returns the value
function borderlandMission() {
    let isFull = true
    let score = 0
    //rows
    for(let i = 0; i < rows; i++) {
        isFull = true
        for(let j = 0; j < cols;  j++) {
            if(matrix[i][j] == 'base') isFull = false
        }
        if(isFull) score += 6
    }
    //cols
    for(let j = 0; j < cols; j++) {
        isFull = true
        for(let i = 0; i < rows;  i++) {
            if(matrix[i][j] == 'base') isFull = false
        }
        if(isFull) score += 6
    }
    return score
}

function eotfMission() {
    let score = 0
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            if((i == 0 || j == 0 || i == rows - 1 || j == cols - 1) && matrix[i][j] == 'forest') {
                score++
            }
        }
    }
    return score
}

function sleepyValleyMission() {
    let score = 0
    let forestNum = 0
    for(let i = 0; i < rows; i++) {
        forestNum = 0
        for(let j = 0; j < cols; j++) {
            if(matrix[i][j] == 'forest') forestNum++
        }
        if(forestNum == 3) score += 4
    }
    return score
}

function isSurroundedByElement(row, col, element) {  
    if(row - 1 >= 0  && matrix[row-1][col] == element) {
        return true
    }
    if(row + 1 < rows && matrix[row+1][col] == element) {
        return true
    }
    if(col - 1 >= 0 && matrix[row][col-1] == element) {
        return true
    }
    if(col + 1 < cols && matrix[row][col+1] == element) {
        return true
    }
    return false
}

function wateringPotatoesMission() {
    let score = 0
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            if(matrix[i][j] == 'water') {
                 if(isSurroundedByElement(i, j, 'farm'))  {
                    score += 2
                 }
            }
        }
    }
    return score

}

function treeLineMission() {
    let score = 0
    let maxTrees = 0
    for(let i = 0; i < cols; i++) {
        let trees = 0
        for(let j = 0; j < rows; j++) {
            if(matrix[j][i] == 'forest') {
                trees++
            } else {
                if(trees > maxTrees) {
                    maxTrees = trees
                }
                trees = 0
            }
        }
        if(trees > maxTrees) maxTrees = trees
    }
    score = maxTrees * 2
    return score
}

function isSurroundedBy3Types(row, col) {
    let diffNum = 0
    let seenElements = ['base']
    if(row - 1 >= 0  && !seenElements.includes(matrix[row-1][col])) {
        seenElements.push(matrix[row-1][col])
        diffNum++
    }
    if(row + 1 < rows && !seenElements.includes(matrix[row+1][col])) {
        seenElements.push(matrix[row+1][col])
        diffNum++
    }
    if(col - 1 >= 0 && !seenElements.includes(matrix[row][col-1])) {
        seenElements.push(matrix[row][col-1])
        diffNum++
    }
    if(col + 1 < cols && !seenElements.includes(matrix[row][col+1])) {
        seenElements.push(matrix[row][col+1])
        diffNum++
    }
    if(diffNum >= 3) return true
    return false
}

function wealthyTownMission() {
    let score = 0
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            if(matrix[i][j] != "town") continue
            if(isSurroundedBy3Types(i, j)) score += 3
        }
    }
    return score
}

function wateringCanalMission() {
    let score = 0
    for (let i = 0; i < cols; i++) {
        let waterCount = 0
        let farmCount = 0
        for ( let j = 0; j < rows; j++) {
            if(matrix[j][i] == 'water') waterCount++
            if(matrix[j][i] == 'farm') farmCount++
        }
        if(farmCount == 0 || waterCount == 0) continue
        if(farmCount == waterCount) score += 4
    }
    return score
}

function magicianValleyMission() {
    let score = 0
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            if(matrix[i][j] == 'mountain') {
                let waterNum = 0
                if(matrix[i-1][j] == 'water') {
                    waterNum++
                }
                if(matrix[i+1][j] == 'water') {
                    waterNum++
                }
                if(matrix[i][j-1] == 'water') {
                    waterNum++
                }
                if(matrix[i][j+1] == 'water') {
                    waterNum++
                }
                score += waterNum*3
            }
        }
    }
    return score
}

function emptySiteMission() {
    let score = 0
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if(matrix[i][j] != 'base') continue
            if(isSurroundedByElement(i, j, 'town')) score += 2
        }
    }
    return score
}

function rowOfHousesMission() {
    let score = 0
    let maxTowns = 0
    for(let i = 0; i < rows; i++) {
        let towns = 0
        for(let j = 0; j < cols; j++) {
            if(matrix[i][j] == 'town') {
                towns++
            } else {
                if(towns > maxTowns) {
                    maxTowns = towns
                }
                towns = 0
            }
        }
    }
    for(let i = 0; i < rows; i++) {
        let towns = 0
        for(let j = 0; j < cols; j++) {
            if(matrix[i][j] == 'town') {
                towns++
            } else {
                if(towns == maxTowns) score += (maxTowns * 2)
                towns = 0
            }
        }
        if(towns == maxTowns) score += (maxTowns * 2)
    }
    return score
}

function oddNumberedSilos() {
    let score = 0
    for(let i = 0; i < cols; i += 2) {
        let isFull = true
        for(let j = 0; j < rows; j++) {
            if(matrix[j][i] == 'base') {
                isFull = false
            }
        }
        if(isFull) score += 10
    }
    return score
}

function richCountrysideMission() {
    let score = 0
    for(let i = 0; i < rows; i++) {
        let diffNum = 0
        let seenElements = ['base']
        for(let j = 0; j < cols; j++) {
            if(!seenElements.includes(matrix[i][j])) {
                diffNum++
                seenElements.push(matrix[i][j])
            }
        }
        if(diffNum >= 5) score += 4
    }
    return score
}

function showMissions(mission, num) {
    i = Math.floor(num/2)
    j = num % 2
    const cell = missionsTable.rows[i].cells[j]
    switch(mission.title) {
        case 'Az erdő széle':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/EOTF.png)"
            cell.style.backgroundSize = "cover"
            cell
            break
        case 'Álmos-völgy':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/SleepyValley.png)"
            cell.style.backgroundSize = "cover"
            break
        case 'Krumpliöntözés':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/WateringPot.png)"
            cell.style.backgroundSize = "cover"
            break
        case 'Határvidék':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/BorderlandsM.png)"
            cell.style.backgroundSize = "cover"
            break
        case 'Fasor':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/TreeLine.png)"
            cell.style.backgroundSize = "cover"
            break
        case 'Gazdag város':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/WealthyTown.png)"
            cell.style.backgroundSize = "cover"
            break
        case 'Öntözőcsatorna':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/WateringCan.png)"
            cell.style.backgroundSize = "cover"
            break
        case 'Mágusok völgye':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/MagicianVal.png)"
            cell.style.backgroundSize = "cover"
            break
        case 'Üres telek':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/EmptySite.png)"
            cell.style.backgroundSize = "cover"
            break
        case 'Sorház':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/RowOfHouses.png)"
            cell.style.backgroundSize = "cover"
            break
        case 'Páratlan silók':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/OddNumSil.png)"
            cell.style.backgroundSize = "cover"
            break
        case 'Gazdag vidék':
            cell.style.backgroundImage = "url(./img/assets/missions_eng/RichCount.png)"
            cell.style.backgroundSize = "cover"
            break
    }
}

function evalMission(mission) {
    let score = 0
    switch (mission.title) {
        case 'Az erdő széle':
            score = eotfMission()
            break
        case 'Álmos-völgy':
            score = sleepyValleyMission()
            break
        case 'Krumpliöntözés':
            score = wateringPotatoesMission()
            break
        case 'Határvidék':
            score = borderlandMission()
            break
        case 'Fasor':
            score = treeLineMission()
            break
        case 'Gazdag város':
            score = wealthyTownMission()
            break
        case 'Öntözőcsatorna':
            score = wateringCanalMission()
            break
        case 'Mágusok völgye':
            score = magicianValleyMission()
            break
        case 'Üres telek':
            score = emptySiteMission()
            break
        case 'Sorház':
            score = rowOfHousesMission()
            break
        case 'Páratlan silók':
            score = oddNumberedSilos()
            break
        case 'Gazdag vidék':
            score = richCountrysideMission()
            break
    }
    return score
}

//Setting missions according to the new season
function setNewACtiveMissions(season) {
    for(let i = 0; i < 2; i++) {
        for(let j = 0; j < 2; j++) {
            const cell = missionsTable.rows[i].cells[j]
            cell.style.opacity = 0.5
        }
    }
    let cell = missionsTable.rows[0].cells[0]
    switch (season) {
        case 'spring':
            activeMissions = [currMissions[0], currMissions[1]]
            cell = missionsTable.rows[0].cells[0]
            cell.style.opacity = 1
            cell = missionsTable.rows[0].cells[1]
            cell.style.opacity = 1
            break
        case 'summer': 
            activeMissions = [currMissions[1], currMissions[2]]
            cell = missionsTable.rows[0].cells[1]
            cell.style.opacity = 1
            cell = missionsTable.rows[1].cells[0]
            cell.style.opacity = 1
            break
        case 'fall':
            activeMissions = [currMissions[2], currMissions[3]]
            cell = missionsTable.rows[1].cells[0]
            cell.style.opacity = 1
            cell = missionsTable.rows[1].cells[1]
            cell.style.opacity = 1
            break
        case 'winter':
            activeMissions = [currMissions[3], currMissions[0]]
            cell = missionsTable.rows[1].cells[1]
            cell.style.opacity = 1
            cell = missionsTable.rows[0].cells[0]
            cell.style.opacity = 1
            break
    }
}

//UPDATE SEASON - counting mission scores and season scores(changes season if necessary)
function updateSeason() {
    let remTimeFromSeason = SEASON_LENGTH
    let seasonScore = 0
    if(remTime % SEASON_LENGTH == 0) {
        remTimeFromSeason = SEASON_LENGTH
    } else {
        remTimeFromSeason = (remTime % SEASON_LENGTH)
    }
    let seasonNum = Math.floor(4 - (remTime / SEASON_LENGTH))
    if(currSeason != seasons[seasonNum]) {
        for(let i = 0; i < activeMissions.length; i++) {
            mission = activeMissions[i]
            const evalScore = evalMission(mission)
            seasonScore += evalScore
            for(let j = 0; j < currMissions.length; j++) {
                if(currMissions[j].title == activeMissions[i].title) {
                    const prev = missionLabels[j].innerHTML
                    const prevNum = parseInt(prev)
                    const missionTotal = prevNum + evalScore
                    missionLabels[j].innerHTML = missionTotal
                }
                    
            }
        }
        currSeason = seasons[seasonNum]
        setNewACtiveMissions(currSeason)
        seasonScores.push(seasonScore)
        i = Math.floor((seasonNum - 1)/2)
        j = (seasonNum - 1) % 2
        const cell = seasonTable.rows[i].cells[j]
        cell.innerHTML = seasons[seasonNum-1] + ": " + seasonScore
        usedElements = []
    }
    currSeasonText.innerHTML = "Current season: " + currSeason
    remSeasonText.innerHTML = "Remaining time from the season: " + remTimeFromSeason + "/" + SEASON_LENGTH
}

//COUNTING TOTAL POINTS - AT THE END OF THE GAME
function checkMountSurrounding(row, col) {
    if(matrix[row-1][col] == 'base') {
        return false
    }
    if(matrix[row+1][col] == 'base') {
        return false
    }
    if(matrix[row][col-1] == 'base') {
        return false
    }
    if(matrix[row][col+1] == 'base') {
        return false
    }
    return true
}

//Evaluates the hidden mountain mission(only at the end of the game)
function evalMountainScore() {
    let score = 0
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            if(matrix[i][j] == 'mountain') {
                if(checkMountSurrounding(i, j)) score ++
            }
        }
    }
    return score
}

//Counts the total score from all the seasons, and the mountain mission
function countTotalScore() {
    let totalScore = 0
    for(let i = 0; i < seasonScores.length; i++) {
        totalScore += seasonScores[i]
    }
    totalScore += evalMountainScore()
    return totalScore
}

//Shows the end score on the UI
function endGame() {
    totalScoreText.innerHTML = "Your final score: " + countTotalScore()
    totalScoreText.style.display = "block"
    gameEndText.style.display = "block"
    remSeasonText.style.display = "none"
    currSeasonText.style.display = "none"
    nextTileTable.style.display = "none"
    nextTileLabel.style.display = "none"
    mirrorBtn.style.display = "none"
    rotateBtn.style.display = "none"
    for(let i = 0; i < 2; i++) {
        for(let j = 0; j < 2; j++) {
            const cell = missionsTable.rows[i].cells[j]
            cell.style.opacity = 1
        }
    }
    gameEnded = true
}