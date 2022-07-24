import React from "react";
import { Ellipse, Transformer } from "react-konva";

const CircleComponent = ({
  shapeProps,
  tool,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (tool == "cursor" && isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Ellipse
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        strokeScaleEnabled={false}
        {...shapeProps}
        draggable={tool == "cursor"}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;

          let radiusX = Math.floor((node.width() * node.scaleX()) / 2);
          let radiusY = Math.floor((node.height() * node.scaleY()) / 2);

          let param = {
            fill: shapeProps.fill,
            id: shapeProps.id,
            key: shapeProps.key,
            regId: shapeProps.regId,
            stroke: shapeProps.stroke,
            strokeWidth: shapeProps.strokeWidth,
            tool: shapeProps.tool,
            scaleX: 1,
            scaleY: 1,
            x: node.x(),
            y: node.y(),
            rotation: node.attrs.rotation,
            radiusX: radiusX,
            radiusY: radiusY,
          };
          console.log(param);

          onChange(param);

          node.scale({ x: 1, y: 1 });
        }}
      />
      {tool == "cursor" && isSelected && (
        <Transformer
          ref={trRef}
          ignoreStroke
          // centeredScaling={true}
          boundBoxFunc={(oldBox, newBox) => {
            // if (newBox.width < 5 || newBox.height < 5) {
            //   return oldBox;
            // }

            console.log(newBox);

            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default CircleComponent;
