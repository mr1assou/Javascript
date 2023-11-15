
// select items
const body=document.querySelector('.body')
const gameBoard=document.getElementById('game-board')
const startPieces=
    [rook,knight,bishop,king,queen,bishop,knight,rook,pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,rook,knight,bishop,king,queen,bishop,knight,rook]

function squareColor(element,index){
    const row=Math.floor((63-index)/8)+1
    gameBoard.append(element)
    if(row%2===0){
        index%2===0?element.classList.add('black'):element.classList.add('white')     
    }
    else{
        index%2===0?element.classList.add('white'):element.classList.add('black')
    }
}

function createSquares(){
    startPieces.forEach((piece,index)=>{
        const element=document.createElement('div')
        element.classList.add('square')
        element.setAttribute('data-square',index)
        element.setAttribute('draggable',true)
        element.innerHTML=piece
        squareColor(element,index)
        if(index<16){
            element.firstChild.classList.add('grey')
        }
        if(index>47){
            element.firstChild.classList.add('brown')
        }
        gameBoard.append(element)
    })  
}
createSquares()
const player=document.querySelector('.player')
let startElementDragger;
let startPositionId
function dragStart(e){
    const item=e.target
    const checkPlayer= item.hasChildNodes()?item.firstElementChild.classList.contains(player.textContent):false
    if(checkPlayer){
    startElementDragger=e.target.firstChild
    startPositionId=e.target.dataset.square
    }
    else{
        e.preventDefault()
    }
} 
function dragOver(e){
    e.preventDefault()
}
function switchPlayer(){
    if(player.textContent==='grey'){
        player.textContent='brown'
        player.style.color='brown'
    }
    else{
        player.textContent='grey'
        player.style.color='grey'
    }
}
function switchId(array){
    if(player.textContent==='brown'){
        array.forEach((square,index)=>{
            square.setAttribute('data-square',63-index)
        })
    }
    else{
        array.forEach((square,index)=>{
            square.setAttribute('data-square',index)
        })
    }
}

function checkColorOpponent(endElement){
    checkChild=endElement.hasChildNodes()
    if(checkChild){
        const checkChildColor=endElement.firstElementChild.classList.contains(player.textContent)
        if(!checkChildColor){
            return true
        }
    }
    else{
        return true
    }
}
const allSquares=document.querySelectorAll('.square')
function checkMouvement(ElementDragger,element){
    const checkPiece=startElementDragger.classList.contains('piece')
    const startId=parseInt(startElementDragger.parentElement.dataset.square)
    verticalIndexes=[63,55,47,49,31,23,15,7]
    const substraction=(element.dataset.square)-startId
    const checkOpponent=element.hasChildNodes()
    checkEnemyColor=checkColorOpponent(element)
    switch (ElementDragger){
        case 'pawn': 
                const currentSquare=startId+8
                const pawnSquareBetween=document.querySelector(`[data-square="${currentSquare}"]`)
                if((element.dataset.square-startId===16 || element.dataset.square-startId===8) && startElementDragger.classList.contains('piece') && !pawnSquareBetween.hasChildNodes()){
                    startElementDragger.classList.remove('piece')
                    return true
                }
                if(element.dataset.square-startId===8 && !checkOpponent){
                    return true
                }
                if((element.dataset.square-startId===7 || element.dataset.square-startId===9)&& checkOpponent && checkEnemyColor){
                    return true
                }

                break;
        case 'rook':
            const rowDiff=Math.abs(Math.floor(startId/8) -Math.floor(element.dataset.square/8))
            const colDiff=Math.abs(Math.floor(startId%8) -Math.floor(element.dataset.square%8))
            if(rowDiff===0){
                const colDirection=Math.sign(element.dataset.square - startId)
                let currentCol=startId+colDirection
                while(currentCol!=element.dataset.square){
                    const squareBetween = document.querySelector(`[data-square="${currentCol}"]`);
                    currentCol+=colDirection
                    if(squareBetween.hasChildNodes()){
                        switchPlayer()
                        return false
                    }
                }
                if(checkOpponent && checkEnemyColor){
                    return true
                }
                if(!checkOpponent){
                    return true
                }
            }
            if(colDiff===0){
                const rowDirection=Math.sign(element.dataset.square - startId)
                let currentRow
                if(rowDirection===1){
                    currentRow=startId+8
                }
                if(rowDirection===-1){
                    currentRow=startId-8
                }
                while(currentRow!=element.dataset.square){
                    const squareBetween = document.querySelector(`[data-square="${currentRow}"]`);
                    if(squareBetween.hasChildNodes()){
                        switchPlayer()
                        return false
                    }
                    if(currentRow<element.dataset.square){
                        currentRow+=8
                    }
                    if(currentRow>element.dataset.square){
                        currentRow-=8
                    }
                }
                if(checkOpponent && checkEnemyColor){
                    return true
                }
                if(!checkOpponent){
                    return true
                }
            }
            if(rowDiff!==0 && colDiff!==0){
                switchPlayer()
                    return false
                }
            break;
        case 'knight':
            const rowDistance = Math.abs(Math.floor(startId / 8) - Math.floor(element.dataset.square / 8));
            const colDistance = Math.abs(startId % 8 - element.dataset.square % 8);
            if ((rowDistance === 2 && colDistance === 1) || (rowDistance === 1 && colDistance === 2)) {
            const isOpponentPiece = element.hasChildNodes();
            const isEnemyColor = checkColorOpponent(element);
            if (isOpponentPiece && isEnemyColor) {
                return true;
                }
            if(!isOpponentPiece){
                return true
            }
            }
            break;            
        case 'king':
            if((substraction===7 || substraction===8 || substraction===9 || substraction===1 || substraction===-1 || substraction===-7 || substraction===-8 || substraction===-9) && checkOpponent && checkEnemyColor){
                return true
            }
            if(!checkOpponent && (substraction===7 || substraction===8 || substraction===9 || substraction===1 || substraction===-1 || substraction===-7 || substraction===-8 || substraction===-9)){
                return true
            }
            break;
        case 'bishop':
            // ascendant
            let bishopDirection;
            if(element.dataset.square>startId){
                bishopDirection=1
            }
            // descendant
            if(element.dataset.square<startId){
                bishopDirection=-1
            }
            let currentPositionSevenSteps;
            let currentPositionNineSteps;
            if(bishopDirection===1){
                currentPositionSevenSteps=startId+7
                currentPositionNineSteps=startId+9
            }
            let currentPositionMinusSevenSteps;
            let currentPositionMinusNineSteps;
            if(bishopDirection===-1){
                currentPositionMinusSevenSteps=startId-7
                currentPositionMinusNineSteps=startId-9
            }
            while( bishopDirection===1 && currentPositionNineSteps!=element.dataset.square && (element.dataset.square-startId)%9===0){
                if(bishopDirection===1){
                const squareBetween=document.querySelector(`[data-square="${currentPositionNineSteps}"]`)
                    if(squareBetween.hasChildNodes()){
                    switchPlayer()
                    return false
                    }
                }
                currentPositionNineSteps+=9; 
            }
            while( bishopDirection===-1 && currentPositionMinusNineSteps!=element.dataset.square && (element.dataset.square-startId)%9===0){
                if(bishopDirection===-1){
                const squareBetween=document.querySelector(`[data-square="${currentPositionMinusNineSteps}"]`)
                    if(squareBetween.hasChildNodes()){
                    switchPlayer()
                    return false
                    }
                }
                currentPositionMinusNineSteps-=9; 
            }
            if((element.dataset.square-startId)%9===0 && checkEnemyColor && checkOpponent){
                return true
            }            
            if((element.dataset.square-startId)%9===0 && !checkOpponent){
                return true
            }
            while(bishopDirection===1 && currentPositionSevenSteps!=element.dataset.square && (element.dataset.square-startId)%7===0){
                if(bishopDirection===1){
                const squareBetween=document.querySelector(`[data-square="${currentPositionSevenSteps}"]`)
                    if(squareBetween.hasChildNodes()){
                    switchPlayer()
                    return false
                    }
                }
                currentPositionSevenSteps+=7; 
            }
            while( bishopDirection===-1 && currentPositionMinusSevenSteps!=element.dataset.square && (element.dataset.square-startId)%7===0){
                if(bishopDirection===-1){
                const squareBetween=document.querySelector(`[data-square="${currentPositionMinusSevenSteps}"]`)
                    if(squareBetween.hasChildNodes()){
                    switchPlayer()
                    return false
                    }
                }
                currentPositionMinusSevenSteps-=7; 
            }
            if((element.dataset.square-startId)%7===0 && checkEnemyColor && checkOpponent){
                return true
            }            
            if((element.dataset.square-startId)%7===0 && !checkOpponent){
                return true
            }
            break
        case 'queen':
            // ascendant
            let queenDirection;
            if(element.dataset.square>startId){
                queenDirection=1
            }
            // descendant
            if(element.dataset.square<startId){
                queenDirection=-1
            }
            let queenCurrentPositionSevenSteps;
            let queenCurrentPositionNineSteps;
            if(queenDirection===1){
                queenCurrentPositionSevenSteps=startId+7
                queenCurrentPositionNineSteps=startId+9
            }
            let queenCurrentPositionMinusSevenSteps;
            let queenCurrentPositionMinusNineSteps;
            if(queenDirection===-1){
                queenCurrentPositionMinusSevenSteps=startId-7
                queenCurrentPositionMinusNineSteps=startId-9
            }
            while(queenDirection===1 && queenCurrentPositionNineSteps!=element.dataset.square && (element.dataset.square-startId)%9===0){
                if(queenDirection===1){
                const squareBetween=document.querySelector(`[data-square="${queenCurrentPositionNineSteps}"]`)
                    if(squareBetween.hasChildNodes()){
                    switchPlayer()
                    return false
                    }
                }
                queenCurrentPositionNineSteps+=9; 
            }
            while(queenDirection===-1 && queenCurrentPositionMinusNineSteps!=element.dataset.square && (element.dataset.square-startId)%9===0){
                if(queenDirection===-1){
                const squareBetween=document.querySelector(`[data-square="${queenCurrentPositionMinusNineSteps}"]`)
                    if(squareBetween.hasChildNodes()){
                    switchPlayer()
                    return false
                    }
                }
                queenCurrentPositionMinusNineSteps-=9; 
            }
            if((element.dataset.square-startId)%9===0 && checkEnemyColor && checkOpponent){
                return true
            }            
            if((element.dataset.square-startId)%9===0 && !checkOpponent){
                return true
            }
            while(queenDirection===1 && queenCurrentPositionSevenSteps!=element.dataset.square && (element.dataset.square-startId)%7===0){
                if(queenDirection===1){
                const squareBetween=document.querySelector(`[data-square="${queenCurrentPositionSevenSteps}"]`)
                    if(squareBetween.hasChildNodes()){
                    switchPlayer()
                    return false
                    }
                }
                queenCurrentPositionSevenSteps+=7; 
            }
            while(queenDirection===-1 && queenCurrentPositionMinusSevenSteps!=element.dataset.square && (element.dataset.square-startId)%7===0){
                if(queenDirection===-1){
                const squareBetween=document.querySelector(`[data-square="${queenCurrentPositionMinusSevenSteps}"]`)
                    if(squareBetween.hasChildNodes()){
                    switchPlayer()
                    return false
                    }
                }
                queenCurrentPositionMinusSevenSteps-=7 
            }
            if((element.dataset.square-startId)%7===0 && checkEnemyColor && checkOpponent){
                return true
            }            
            if((element.dataset.square-startId)%7===0 && !checkOpponent){
                return true
            }
            // part rook
            const queenRowDiff=Math.abs(Math.floor(startId/8) -Math.floor(element.dataset.square/8))
            const queenColDiff=Math.abs(Math.floor(startId%8) -Math.floor(element.dataset.square%8))
            if(queenRowDiff===0){
                const queenColDirection=Math.sign(element.dataset.square - startId)
                let queenCurrentCol=startId+queenColDirection
                while(queenCurrentCol!=element.dataset.square){
                    const squareBetween = document.querySelector(`[data-square="${queenCurrentCol}"]`);
                    queenCurrentCol+=queenColDirection
                    if(squareBetween.hasChildNodes()){
                        switchPlayer()
                        return false
                    }
                }
                if(checkOpponent && checkEnemyColor){
                    return true
                }
                if(!checkOpponent){
                    return true
                }
            }
            if(queenColDiff===0){
                const queenRowDirection=Math.sign(element.dataset.square - startId)
                let queenCurrentRow
                if(queenRowDirection===1){
                    queenCurrentRow=startId+8
                }
                if(queenRowDirection===-1){
                    queenCurrentRow=startId-8
                }
                while(queenCurrentRow!=element.dataset.square){
                    const squareBetween = document.querySelector(`[data-square="${queenCurrentRow}"]`);
                    if(squareBetween.hasChildNodes()){
                        switchPlayer()
                        return false
                    }
                    if(queenCurrentRow<element.dataset.square){
                        queenCurrentRow+=8
                    }
                    if(queenCurrentRow>element.dataset.square){
                        queenCurrentRow-=8
                    }
                }
                if(checkOpponent && checkEnemyColor){
                    return true
                }
                if(!checkOpponent){
                    return true
                }
            }
            if(queenRowDiff!==0 && queenColDiff!==0){
                switchPlayer()
                    return false
                }
            break;
    }
    switchPlayer()
}
const indexesOpponent=[63,62,61,60,59,58,57,56]
const chooseElementArray=document.querySelectorAll('.choose-element')
const choices=document.querySelector('.choices')
async function chooseElement(item){
    choices.style.transform=` translateX(0)`
    choices.style.transform=` translateY(-50%)`
    return new Promise((resolve)=>{
        chooseElementArray.forEach(element=>{
            element.addEventListener('click',e=>{
                const kind=e.currentTarget.textContent
                let createElement;
                allSquares.forEach(square=>{
                    if(square.hasChildNodes()){
                        if(square.firstElementChild.id===kind && square.firstElementChild.classList.contains(player.textContent)){
                            createElement=square.   firstElementChild.cloneNode(true)
                        }
                    }
                })
                item.appendChild(createElement)
                item.removeChild(item.firstElementChild)
                resolve()
            })
        })
    })
}
async function dragDrop(e){
    const item=e.currentTarget
    const checkSquareState=item.hasChildNodes()
    const checkPosition=checkMouvement(startElementDragger.id,e.currentTarget)
    if(!checkSquareState && checkPosition){
        item.appendChild(startElementDragger)
    }
    if(checkSquareState){
        const checkSquareColor=item.firstElementChild.classList.contains(player.textContent)
        if(!checkSquareColor && checkPosition){
            item.appendChild(startElementDragger)
            if(item.firstElementChild.id==='king'){
                body.textContent=`Player ${player.textContent} Win`
            }
            item.removeChild(item.firstElementChild)
        }
    }
    // console.log(item)
    const squareId=parseInt(item.dataset.square)
    let pieceKind;
    if(item.hasChildNodes()){
        pieceKind=item.firstElementChild.id
    }
    if(indexesOpponent.includes(squareId) && pieceKind==='pawn'){
        await chooseElement(item)   
    }
    choices.style.transform=` translateX(-100%)`
    switchPlayer()
    switchId(allSquares)
}
// add Event Listenner
const squares=document.querySelectorAll('.square')
squares.forEach(square=>{
    square.addEventListener('dragstart',dragStart)
    square.addEventListener('dragover',dragOver)
    square.addEventListener('drop',dragDrop)
})

window.addEventListener('DOMContentLoaded',()=>{
    if(player.textContent==='grey'){
        player.style.color='grey'
    }
})
const music = document.getElementById('background-music');
const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
})

const playBtn=document.querySelector('.play')
console.log(playBtn)
const banner=document.querySelector('.banner')
const paragraph=document.querySelector('.paragraph')
playBtn.addEventListener('click',()=>{
    gameBoard.style.display=`block`
    gameBoard.style.display=`flex`
    playBtn.style.display=`none`
    banner.style.backgroundImage=`none`
    playButton.style.display=`block`
    paragraph.style.display=`block`
})

