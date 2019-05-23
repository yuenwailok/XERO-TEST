const ROW = 7;
const COLUMN = 6;
const MATCH = 4;

class CellBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            cellBoard: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]
        };
        this.changeCellValues = [];
        this.move = 0;
        for (let i = 0; i < ROW; i++) {
            this.changeCellValues.push(this.changeCellValue.bind(this, i));
        }

        this.winMessage = this.winMessage.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    resetGame() {
        let arr = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
        this.setState({
            cellBoard: [...arr],
            finished: false
        });
        this.move = 0;
    }

    playerName(move) {
        if (move % 2 === 0) {
            return "Player 1";
        }
        return "Player 2";
    }

    checkDiagonal(arr, value) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] === value) {
                    count = 1;
                    //check for dia1
                    let rowIndex = i + 1;
                    let columnIndex = j + 1;
                    while (rowIndex < ROW && columnIndex < COLUMN) {
                        if (arr[rowIndex][columnIndex] === value) {

                            count++;
                            if (count === MATCH) {
                                return true;
                            }
                            rowIndex++;
                            columnIndex++;
                        }
                        else {
                            rowIndex = 0;
                            columnIndex = 0;
                            count = 0;
                            break;
                        }
                    }

                    count = 1;
                    rowIndex = i + 1;
                    columnIndex = j - 1;
                    //check for dia2
                    while (rowIndex < ROW && columnIndex >= 0) {
                        if (arr[rowIndex][columnIndex] === value) {

                            rowIndex++;
                            columnIndex--;
                            count++;
                            if (count === MATCH) {
                                return true;
                            }
                        }
                        else {
                            rowIndex = 0;
                            columnIndex = 0;
                            count = 1;
                            break;
                        }
                    }
                }
            }
        }
        return false;
    }

    win(arr, number) {
        return this.move >= 7 && (this.checkDiagonal(arr, number) ||
            this.checkHo(arr, number) ||
            this.checkVer(arr, number));
    }

    winMessage() {
        if (this.move >= 42) {
            return <p className="greytext margintop">It's a tie, no one wins!</p>
        }
        if (this.win(this.state.cellBoard, 1)) {

            return <div><div className="marcen round white"></div><p className="whitetext margintop">White (player 1) win!</p></div>
        }

        if (this.win(this.state.cellBoard, 2)) {
            return <div><div className="marcen round black"></div><p className="blacktext margintop">Black (player 2) win!</p></div>
        }
        return <p className={this.move % 2 === 0 ? "whitetext margintop" : "blacktext margintop"}>{this.playerName(this.move)}, please select a column</p>;
    }

    checkVer(arr, value) {
        let count = 0;
        for (let i = 0; i < COLUMN; i++) {
            for (let j = 0; j < ROW; j++) {
                if (arr[j][i] === value) {
                    count++;
                }
                else {
                    count = 0;
                }

                if (count === MATCH) {
                    return true;
                }
            }
            count = 0;
        }

        return false;
    }

    checkHo(arr, value) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] === value) {
                    count++;
                }
                else {
                    count = 0;
                }

                if (count === MATCH)
                    return true;
                }
            }

            count = 0;
            
            return false;
        }
    

    changeCellValue(row) {
        
        if (this.state.finished) {
            return;
        }

        for (let i = COLUMN-1; i >= 0;i--) {
            if (this.state.cellBoard[row][i] === 0) {
                let arr = this.state.cellBoard.map((row) => {
                    return row.map((colmun) => {
                        return colmun;
                    })
                });

                if (this.move % 2 === 0) {
                    arr[row][i] = 1;
                }
                else {
                    arr[row][i] = 2;
                }

                this.move++;
                this.setState({
                    cellBoard: arr
                });
                
                if (this.win(arr, 1) || this.win(arr, 2) || this.move >= 42) {
                    this.setState({
                        finished: true
                    });
                }

                break;
            }
        }

        

    }

    render() {
        let arr = this.state.cellBoard.map((item, rowIndex) => {
            return <div key={rowIndex} onClick={this.changeCellValues[rowIndex]} className="box">{item.map((cell, colmunIndex) => { return <div key={colmunIndex} className={"round " + (cell === 1 ? "white" : cell === 2 ? "black" : "")}></div> })}</div>
        });
        return <div className="h-100"><div className="center"><div className="padding flex">{this.winMessage()}</div><div className="inline">{arr}</div></div><div className="center margintop"><button onClick={this.resetGame}>Reset Game</button></div></div>
    }
}

ReactDOM.render(<CellBoard />, document.getElementById('cellboard'));
