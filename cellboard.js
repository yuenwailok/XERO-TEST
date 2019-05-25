var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ROW = 7;
var COLUMN = 6;
var MATCH = 4;

var CellBoard = function (_React$Component) {
    _inherits(CellBoard, _React$Component);

    function CellBoard(props) {
        _classCallCheck(this, CellBoard);

        var _this = _possibleConstructorReturn(this, (CellBoard.__proto__ || Object.getPrototypeOf(CellBoard)).call(this, props));

        _this.state = {
            finished: false,
            cellBoard: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]
        };
        _this.changeCellValues = [];
        _this.move = 0;
        for (var i = 0; i < ROW; i++) {
            _this.changeCellValues.push(_this.changeCellValue.bind(_this, i));
        }

        _this.winMessage = _this.winMessage.bind(_this);
        _this.resetGame = _this.resetGame.bind(_this);
        return _this;
    }

    _createClass(CellBoard, [{
        key: "resetGame",
        value: function resetGame() {
            var arr = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
            this.setState({
                cellBoard: [].concat(arr),
                finished: false
            });
            this.move = 0;
        }
    }, {
        key: "playerName",
        value: function playerName(move) {
            if (move % 2 === 0) {
                return "Player 1";
            }
            return "Player 2";
        }
    }, {
        key: "checkDiagonal",
        value: function checkDiagonal(arr, value) {
            var count = 0;
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++) {
                    if (arr[i][j] === value) {
                        count = 1;
                        var rowIndex = i + 1;
                        var columnIndex = j + 1;
                        while (rowIndex < ROW && columnIndex < COLUMN) {
                            if (arr[rowIndex][columnIndex] === value) {

                                count++;
                                if (count === MATCH) {
                                    return true;
                                }
                                rowIndex++;
                                columnIndex++;
                            } else {
                                rowIndex = 0;
                                columnIndex = 0;
                                count = 0;
                                break;
                            }
                        }

                        count = 1;
                        rowIndex = i + 1;
                        columnIndex = j - 1;
                        while (rowIndex < ROW && columnIndex >= 0) {
                            if (arr[rowIndex][columnIndex] === value) {

                                rowIndex++;
                                columnIndex--;
                                count++;
                                if (count === MATCH) {
                                    return true;
                                }
                            } else {
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
    }, {
        key: "win",
        value: function win(arr, number) {
            return this.move >= MATCH * 2 - 1 && (this.checkDiagonal(arr, number) || this.checkHorizontal(arr, number) || this.checkVertical(arr, number));
        }
    }, {
        key: "winMessage",
        value: function winMessage() {
            if (this.move >= ROW * COLUMN) {
                return React.createElement(
                    "p",
                    { className: "greytext margintop" },
                    "It's a tie, no one wins!"
                );
            }
            if (this.win(this.state.cellBoard, 1)) {

                return React.createElement(
                    "div",
                    null,
                    React.createElement("div", { className: "marcen round white" }),
                    React.createElement(
                        "p",
                        { className: "whitetext margintop" },
                        "White (player 1) win!"
                    )
                );
            }

            if (this.win(this.state.cellBoard, 2)) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement("div", { className: "marcen round black" }),
                    React.createElement(
                        "p",
                        { className: "blacktext margintop" },
                        "Black (player 2) win!"
                    )
                );
            }
            return React.createElement(
                "p",
                { className: this.move % 2 === 0 ? "whitetext margintop" : "blacktext margintop" },
                this.playerName(this.move),
                ", please select a column"
            );
        }
    }, {
        key: "checkVertical",
        value: function checkVertical(arr, value) {
            var count = 0;
            for (var i = 0; i < COLUMN; i++) {
                for (var j = 0; j < ROW; j++) {
                    if (arr[j][i] === value) {
                        count++;
                    } else {
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
        //horizontal

    }, {
        key: "checkHorizontal",
        value: function checkHorizontal(arr, value) {
            var count = 0;
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++) {
                    if (arr[i][j] === value) {
                        count++;
                    } else {
                        count = 0;
                    }

                    if (count === MATCH) return true;
                }
            }

            count = 0;

            return false;
        }
    }, {
        key: "changeCellValue",
        value: function changeCellValue(row) {

            if (this.state.finished) {
                return;
            }

            for (var i = COLUMN - 1; i >= 0; i--) {
                if (this.state.cellBoard[row][i] === 0) {
                    var arr = this.state.cellBoard.map(function (row) {
                        return row.map(function (colmun) {
                            return colmun;
                        });
                    });

                    if (this.move % 2 === 0) {
                        arr[row][i] = 1;
                    } else {
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
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var arr = this.state.cellBoard.map(function (item, rowIndex) {
                return React.createElement(
                    "div",
                    { key: rowIndex, onClick: _this2.changeCellValues[rowIndex], className: "box" },
                    item.map(function (cell, colmunIndex) {
                        return React.createElement("div", { key: colmunIndex, className: "round " + (cell === 1 ? "white" : cell === 2 ? "black" : "") });
                    })
                );
            });
            return React.createElement(
                "div",
                { className: "h-100" },
                React.createElement(
                    "div",
                    { className: "center" },
                    React.createElement(
                        "div",
                        { className: "padding flex" },
                        this.winMessage()
                    ),
                    React.createElement(
                        "div",
                        { className: "inline" },
                        arr
                    )
                ),
                React.createElement(
                    "div",
                    { className: "center margintop" },
                    React.createElement(
                        "button",
                        { onClick: this.resetGame },
                        "Reset Game"
                    )
                )
            );
        }
    }]);

    return CellBoard;
}(React.Component);

ReactDOM.render(React.createElement(CellBoard, null), document.getElementById('cellboard'));
