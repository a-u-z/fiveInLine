import styled from 'styled-components';

const Row = styled.div`
  clear: both;
  content: '';
  display: flex;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Navbar = styled.div`
  margin-left: 50px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 80px;
  color: black;
`;
const OtherInformation = styled.div`
  display: flex;
  font-size: 35px;
  margin-top: 20px;
  justify-content: space-around;
`;
const RestartButton = styled.button`
  width: 480px;
  color: white;
  font-size: 23px;
  padding: 6px;
  background: #fc6586;
  border-radius: 10px;
  border: #fc3251 solid 2px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  display: none;
  justify-content: center;
  ${props => props.winner && 'display:flex'}
`;

const ChessBoard = styled.div`
  position: relative;
  margin-top: 19px;
  width: 690px;
  margin-left: 150px;
  border: 2px solid black;
  padding-top: 38px;
  padding-left: 38px;
  ${(
    props // shake1 shake2 是因為如果是同一個名字的話，只會觸發第一次而已
  ) => props.nextColor === 'white' && `animation: shake1 100ms ease-in-out;`}
  ${props =>
    props.nextColor === 'black' && `animation: shake2 100ms ease-in-out;`}
  @keyframes shake1 {
    0% {
    }
    50% {
      transform: scale(0.995);
    }
    100% {
    }
  }
  @keyframes shake2 {
    0% {
    }
    50% {
      transform: scale(0.996);
    }
    100% {
    }
  }
  ${props =>
    props.winner &&
    `&::after {
    content:'';
    display:block;
    width:100%;
    height:100%;
    background-color: rgba(252,101,134,0.35);
    position:absolute;
    top:0;
    left:0;
    z-index:2;
  }`}
`;
const WinnerMetal = styled.div`
  ${props =>
    props.winner &&
    `color: black;
font-size: 40px;
width:460px;
text-align:center;
border: solid #fc3251 4px;
border-radius: 20px;
padding: 10px;
animation: metalPop ease-in-out 800ms;

`}
  @keyframes metalPop {
    10%,
    90% {
      transform: scale(1.1);
    }
    20%,
    80% {
      transform: translate3d(+2px, 0, 0);
    }
    30%,
    70% {
      transform: scale(1.25);
    }
    40%,
    60% {
      transform: translate3d(+2px, 0, 0);
    }
    50% {
      transform: scale(1.3);
    }
  }
`;
const HistoryArea = styled.div`
  display: flex;
  justify-content: space-around;
  width: 490px;
  height: auto;
  margin-top: 20px;
`;
const HistoryBlackArea = styled.div`
  border: 5px solid transparent;
  border-radius: 10px;
  padding-top: 20px;
  color: white;
  background: black;
  width: 200px;
  height: 300px;
  overflow-y: scroll;
  text-align: center;
  ${props =>
    props.steps % 2 === 1 &&
    `border: #fc6586 5px solid;
    `}
`;
const HistoryWhiteArea = styled.div`
  border: 5px solid transparent;
  border-radius: 10px;
  padding-top: 20px;
  background: white;
  width: 200px;
  height: 300px;
  overflow-y: scroll;
  text-align: center;
  ${props =>
    props.steps % 2 === 0 &&
    `border: #fc6586 5px solid;
    `}
`;
const Steps = styled.div`
  ${props =>
    props.color === 'black' &&
    `
      color: black;
      cursor: pointer;
      margin-top:10px;
      `}
  ${props =>
    props.color === 'white' &&
    `
      color: white;
      cursor: pointer;
      margin-top:10px;
      `}
`;
const HistoryTitle = styled.div`
  width: 140px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 8px;
  ${props => props.color === 'white' && `border-bottom:solid white 2px`}
  ${props => props.color === 'black' && `border-bottom:solid black 2px`}
`;
const BlackTurn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 200px;
  height: 50px;
  border: #fc6586 4px solid;
  border-radius: 15px;
  ${props => props.steps % 2 === 0 && `visibility:hidden;`};
  ${props => props.winner && `display:none;`};
`;
const WhiteTurn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 200px;
  height: 50px;
  border: #fc6586 4px solid;
  border-radius: 15px;
  ${props => props.steps % 2 === 1 && `visibility:hidden;`}
  ${props => props.winner && `display:none;`};
`;
const HintArea = styled.div`
  width: 450px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  padding-left: 25px;
  padding-right: 25px;
  letter-spacing: 2px;
  font-size: 25px;
  ${props => props.winner && 'display:none'}
`;
export {
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
};
