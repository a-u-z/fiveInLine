import React from 'react';
import Unit from './Unit';
import {
  Row,
  Wrapper,
  Navbar,
  Title,
  OtherInformation,
  RestartButton,
  ChessBoard,
  WinnerMetal,
  HistoryArea,
  HistoryBlackArea,
  HistoryWhiteArea,
  Steps,
  HistoryTitle,
  BlackTurn,
  WhiteTurn,
  HintArea,
} from './components';
const { useState, useEffect } = React;

function App() {
  const SIZE = 19;
  const [board, setBoard] = useState(Array(SIZE).fill(Array(SIZE).fill(null))); // 設置棋盤
  const [currentY, setCurrentY] = useState(0); // 當前或是下一手的位置
  const [currentX, setCurrentX] = useState(0); // 當前或是下一手的位置
  const [winner, setWinner] = useState('');
  const [historyData, setHistoryData] = useState([]);
  const [steps, setSteps] = useState(1);
  const addChess = (y, x) => {
    if (board[y][x] !== null) return;
    const newBoard = JSON.parse(JSON.stringify(board)); // array.fill([1,2]) 的話，裡面的陣列會是同一個，指向同一個記憶體的，所以 === 的話會是 true ，因此必須使用「深拷貝」，也就是`JSON.pare(JSON.stringify(array))`才可以
    setCurrentY(y);
    setCurrentX(x);
    if (steps % 2) {
      newBoard[y][x] = 'black';
    } else {
      newBoard[y][x] = 'white';
    }
    setHistoryData(prev => {
      return [...prev, [steps, [y, x], JSON.parse(JSON.stringify(newBoard))]];
    });
    setSteps(steps + 1);
    setBoard(newBoard);
  };
  function checkWinneer() {
    if (
      countSame(direction.right) + countSame(direction.left) === 4 ||
      countSame(direction.up) + countSame(direction.down) === 4 ||
      countSame(direction.leftUp) + countSame(direction.rightDown) === 4 ||
      countSame(direction.rightUp) + countSame(direction.leftDown) === 4
    ) {
      setWinner(steps % 2 ? '白棋' : '黑棋');
    }
  }
  const direction = {
    right: [0, 1],
    left: [0, -1],
    up: [-1, 0],
    down: [1, 0],
    leftUp: [-1, -1],
    rightDown: [1, 1],
    rightUp: [-1, 1],
    leftDown: [1, -1],
  };
  function countSame(direction) {
    const [yDirection, xDirection] = direction; // yDirection, xDirection 是要檢查的方向
    let willCheckX = currentX + xDirection; // currentX 是拿來定位剛剛下在哪裡的
    let willCheckY = currentY + yDirection; // currentY 是拿來定位剛剛下在哪裡的
    let checkColor = null; // checkColor 是上一手的顏色， nextColor 是正在思考要下哪裡的顏色
    let counter = 0; // 看有幾個相同
    steps % 2 ? (checkColor = 'white') : (checkColor = 'black'); // 設定 checkColor
    while (
      willCheckX >= 0 &&
      willCheckY >= 0 &&
      willCheckX < 19 &&
      willCheckY < 19
    ) {
      if (board[willCheckY][willCheckX] === checkColor) {
        // 被檢查的顏色，和上一手相同那就計數器＋＋
        counter++; // 這個方向已經找到一個相同的了，就繼續找看還有沒有相同的
        willCheckX = willCheckX + xDirection; // 設定下一次的要搜尋的 x
        willCheckY = willCheckY + yDirection; // 設定下一次的要搜尋的 y
      } else {
        // 如果不是相同的，那就沒有必要找下去，終止這個 while loop
        break; // 退出循環
      }
    }
    return counter; // 回傳「這個方向」總共數到幾個相同的棋子
  }
  function handleRestartClick() {
    setCurrentY(0);
    setCurrentX(0);
    setWinner('');
    setHistoryData([]);
    setSteps(1);
    setBoard(Array(SIZE).fill(Array(SIZE).fill(null)));
  }
  useEffect(() => {
    checkWinneer();
    // eslint-disable-next-line
  }, [steps]);
  function goBack(data) {
    if (winner) return; // 判斷出勝負後，就封鎖此功能
    if (data[0] === 1) window.location.reload(); // 如果點擊第一步的話，那就重新整理，整盤重來
    setBoard(historyData[data[0] - 2][2]);
    setSteps(data[0]);
    setHistoryData(prev => {
      prev.splice(data[0] - 1, prev.length);
      return prev;
    });
  }
  return (
    <div className="App">
      <Wrapper>
        <ChessBoard winner={winner}>
          {board.map((row, y) => {
            return (
              <Row key={y} y={y}>
                {row.map((noUse, x) => {
                  return (
                    <Unit
                      key={x}
                      y={y}
                      x={x}
                      addChess={addChess}
                      board={board}
                      historyData={historyData}
                    />
                  );
                })}
              </Row>
            );
          })}
        </ChessBoard>
        <Navbar>
          <Title>超級五子棋</Title>
          <OtherInformation>
            <BlackTurn winner={winner} steps={steps}>
              黑棋，換你～
            </BlackTurn>
            <WhiteTurn winner={winner} steps={steps}>
              白棋，換你～
            </WhiteTurn>
          </OtherInformation>
          <WinnerMetal winner={winner}>
            {winner ? `恭喜${winner}獲勝🎊🎉🥳這是一盤精采的對戰` : ``}
          </WinnerMetal>
          <RestartButton winner={winner} onClick={handleRestartClick}>
            不算啦！重來一次，下一盤我一定要贏你～
          </RestartButton>
          <HistoryArea>
            <HistoryBlackArea color="black" steps={steps}>
              <HistoryTitle color="white">黑棋區</HistoryTitle>
              {historyData.map((data, index) => {
                if (index % 2 === 0) {
                  return (
                    <Steps
                      color="white"
                      key={data[0]}
                      onClick={() => goBack(data)}
                    >
                      第 {index + 1} 步
                    </Steps>
                  );
                }
              })}
            </HistoryBlackArea>
            <HistoryWhiteArea color="white" steps={steps}>
              <HistoryTitle color="black">白棋區</HistoryTitle>
              {historyData.map((data, index) => {
                if (index % 2 === 1) {
                  return (
                    <Steps
                      color="black"
                      key={data[0]}
                      onClick={() => goBack(data)}
                    >
                      第 {index + 1} 步
                    </Steps>
                  );
                }
              })}
            </HistoryWhiteArea>
          </HistoryArea>
          <HintArea winner={winner}>H i n t :</HintArea>
          <HintArea winner={winner}>
            可以點擊黑棋區或是白棋區當中的第 n 步，即可重新決定該步的落子位置
          </HintArea>
        </Navbar>
      </Wrapper>
    </div>
  );
}

export default App;
