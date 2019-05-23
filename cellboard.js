var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellBoard = function (_React$Component) {
    _inherits(CellBoard, _React$Component);

    function CellBoard(props) {
        _classCallCheck(this, CellBoard);

        var _this = _possibleConstructorReturn(this, (CellBoard.__proto__ || Object.getPrototypeOf(CellBoard)).call(this, props));

        _this.state = {
            boardCell: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            finished: false,
            cellBoard: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]
        };
        _this.changeCellValues = [];
        _this.move = 0;
        for (var i = 0; i < 7; i++) {
            var arr = [];
            for (var j = 0; j < 6; j++) {
                arr.push(_this.changeCellValue.bind(_this, i, j));
            }
            _this.changeCellValues.push(arr);
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
        key: "checkDia",
        value: function checkDia(arr, value) {
            var count = 0;
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++) {
                    if (arr[i][j] === value) {
                        count = 1;
                        //check for dia1
                        var ho = i + 1;
                        var ri = j + 1;
                        while (ho < 7 && ri < 6) {
                            if (arr[ho][ri] === value) {

                                count++;
                                if (count === 4) {
                                    return true;
                                }
                                ho++;
                                ri++;
                            } else {
                                ho = 0;
                                ri = 0;
                                count = 0;
                                break;
                            }
                        }

                        count = 1;
                        ho = i + 1;
                        ri = j - 1;
                        //check for dia2
                        while (ho < 7 && ri >= 0) {
                            if (arr[ho][ri] === value) {

                                ho++;
                                ri--;
                                count++;
                                if (count === 4) {
                                    return true;
                                }
                            } else {
                                ho = 0;
                                ri = 0;
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
            return this.move >= 7 && (this.checkDia(arr, number) || this.checkHo(arr, number) || this.checkVer(arr, number));
        }
    }, {
        key: "winMessage",
        value: function winMessage() {
            if (this.move >= 42) {
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
                ", please select a row"
            );
        }
    }, {
        key: "checkVer",
        value: function checkVer(arr, value) {
            var count = 0;
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 7; j++) {
                    if (arr[j][i] === value) {
                        count++;
                    } else {
                        count = 0;
                    }

                    if (count === 4) {
                        return true;
                    }
                }
                count = 0;
            }

            return false;
        }
    }, {
        key: "checkHo",
        value: function checkHo(arr, value) {
            var count = 0;
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++) {
                    if (arr[i][j] === value) {
                        count++;
                    } else {
                        count = 0;
                    }

                    if (count === 4) {
                        return true;
                    }
                }

                count = 0;
            }
            return false;
        }
    }, {
        key: "changeCellValue",
        value: function changeCellValue(row, colmun) {

            for (var i = 5; i >= 0; i--) {
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

        //<span onClick={this.changeCellValues[rowIndex][colmunIndex]}>{cell}</span>

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var arr = this.state.cellBoard.map(function (item, rowIndex) {
                return React.createElement(
                    "div",
                    { onClick: !_this2.state.finished ? _this2.changeCellValues[rowIndex][0] : function () {}, className: "box" },
                    item.map(function (cell, colmunIndex) {
                        return React.createElement("div", { className: "round " + (cell === 1 ? "white" : cell === 2 ? "black" : "") });
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
