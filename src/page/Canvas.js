import React, { Component } from "react";

import { Stage, Layer } from "react-konva";

import CircleComponent from "../component/CircleComponent";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strokeStyle: "#000",
      strokeWidth: 5,
      fillStyle: "rgba(0, 0, 0, 0)",
      lineWidth: "2",
      tool: "cursor",
      pointer: "",
      canvasList: [],
      canvasItems: [{ type: "canvas", canvasDatas: [{ empty: "empty" }] }],
      selectItemIndex: 0,
      canvasDatas: [{ empty: "empty" }],
      isDrawing: false,
      selectedId: null,
      clientWidth: 1250,
      clientHeight: 750,
      scale: 100,
    };
  }

  componentDidMount = () => {
    this.initCircleHandler();
    this.initCursorHandler();
  };

  handleMouseDown = (e) => {
    if (this.state.tool == "cursor") {
      this.cursorHandler.mousedown(e);
    } else if (this.state.tool == "circle") {
      this.circleHandler.mousedown(e);
    }
  };

  handleMouseMove = (e) => {
    if (this.state.tool == "cursor") {
      this.cursorHandler.mousemove(e);
    } else if (this.state.tool == "circle") {
      this.circleHandler.mousemove(e);
    }
  };

  handleMouseUp = (e) => {
    if (this.state.tool == "cursor") {
      this.cursorHandler.mouseup(e);
    } else if (this.state.tool == "circle") {
      this.circleHandler.mouseup(e);
    }
  };

  selectTool = (tool) => {
    this.setState({
      tool: tool,
    });
  };

  initCircleHandler = () => {
    this.circleHandler = {
      mousedown: (e) => {
        this.setState({
          isDrawing: true,
        });
        let stage = e.target.getStage();
        const pos = stage.getPointerPosition();
        let x = pos.x;
        let y = pos.y;

        let canvasDatas = this.state.canvasDatas;
        let tool = this.state.tool;
        let stroke = this.state.strokeStyle;
        let fill = this.state.fillStyle;

        canvasDatas.push({
          tool: tool,
          x: x,
          y: y,
          fill: "rgba(0, 0, 0, 0)",
          stroke: stroke,
          strokeWidth: 4,
          radiusX: 60,
          radiusY: 60,
          id: `circle${canvasDatas.length}`,
          width: 100,
          height: 100,
        });

        this.setState(
          {
            canvasDatas: canvasDatas,
          },
          () => {}
        );
      },
      mouseup: (e) => {
        e.evt.preventDefault();
        this.setState(
          {
            isDrawing: false,
          },
          () => {}
        );
      },
      mousemove: (e) => {
        e.evt.preventDefault();
        this.setState({
          isDrawing: false,
        });
      },
    };
  };

  initCursorHandler = () => {
    this.cursorHandler = {
      mousedown: (e) => {
        this.setState({
          isDrawing: false,
        });
      },
      mouseup: (e) => {
        this.setState({
          isDrawing: false,
        });
      },
      mousemove: (e) => {
        this.setState({
          isDrawing: false,
        });
      },
    };
  };

  onChangeFigure = (i, newAttrs) => {
    const items = this.state.canvasDatas.slice();
    items[i] = newAttrs;
    this.setState({ canvasDatas: items }, () => {});
  };

  _canvasDataRander = () => {
    if (this.state.canvasDatas) {
      return this.state.canvasDatas.map((item, i) => {
        return (
          <>
            <CircleComponent
              key={i}
              shapeProps={item}
              tool={this.state.tool}
              isSelected={item.id === this.state.selectedId}
              onSelect={() => {
                this.setState({ selectedId: item.id });
              }}
              onChange={(newAttrs) => this.onChangeFigure(i, newAttrs)}
            />
          </>
        );
      });
    }
  };

  render() {
    return (
      <>
        <div>
          <button onClick={() => this.selectTool("circle")}>circle</button>
          <button onClick={() => this.selectTool("cursor")}>cursor</button>
        </div>
        <Stage
          className="stage-container"
          width={1250}
          height={750}
          onMouseDown={this.handleMouseDown}
          onMousemove={this.handleMouseMove}
          onMouseup={this.handleMouseUp}
          onTouchStart={this.handleMouseDown}
          onTouchMove={this.handleMouseMove}
          onTouchEnd={this.handleMouseUp}
        >
          <Layer>{this._canvasDataRander()}</Layer>
        </Stage>
      </>
    );
  }
}

export default Canvas;
