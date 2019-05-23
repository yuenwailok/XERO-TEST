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
            finished: false
        };
        _this.changeCellValues = [];
        _this.move = 0;
        for (var i = 0; i < 6; i++) {
            var arr = [];
            for (var j = 0; j < 7; j++) {
                arr.push(_this.changeCellValue.bind(_this, i, j));
            }
            _this.changeCellValues.push(arr);
        }

        _this.winMessage = _this.winMessage.bind(_this);
        return _this;
    }

    _createClass(CellBoard, [{
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
                        while (ho < 6 && ri < 7) {
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
                        while (ho < 6 && ri >= 0) {
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
            if (this.win(this.state.boardCell, 1)) {

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

            if (this.win(this.state.boardCell, 2)) {
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
                "It's ",
                this.playerName(this.move),
                " turn"
            );
        }
    }, {
        key: "checkVer",
        value: function checkVer(arr, value) {
            var count = 0;
            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < 6; j++) {
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
            if (this.state.boardCell[row][colmun] !== 0) {
                return;
            }
            var arr = this.state.boardCell.map(function (row) {
                return row.map(function (colmun) {
                    return colmun;
                });
            });
            if (this.move % 2 === 0) {
                arr[row][colmun] = 1;
            } else {
                arr[row][colmun] = 2;
            }
            this.move++;

            this.setState({
                boardCell: arr
            });

            if (this.win(arr, 1) || this.win(arr, 2) || this.move >= 42) {
                this.setState({
                    finished: true
                });
            }
        }

        //<span onClick={this.changeCellValues[rowIndex][colmunIndex]}>{cell}</span>

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var arr = this.state.boardCell.map(function (item, rowIndex) {
                return React.createElement(
                    "div",
                    { className: "box" },
                    item.map(function (cell, colmunIndex) {
                        return React.createElement("div", { onClick: !_this2.state.finished ? _this2.changeCellValues[rowIndex][colmunIndex] : function () {}, className: "round " + (cell === 1 ? "white" : cell === 2 ? "black" : "") });
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
                    arr
                ),
                React.createElement(
                    "div",
                    { className: "center margintop" },
                    React.createElement(
                        "button",
                        null,
                        "Reset Game"
                    )
                )
            );
        }
    }]);

    return CellBoard;
}(React.Component);

ReactDOM.render(React.createElement(CellBoard, null), document.getElementById('cellboard'));