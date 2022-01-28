import React, { useState } from "react";
import "./App.css";
import { Scene } from "./canvas/Scene";
import ColorsSlider from "./components/ColorsSlider";
import { OptionsMenu } from "./components/OptionsMenu";
import { COLORS } from "./constants/Colors";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";

const App = () => {
  const [activeOption, setActiveOption] = useState("legs");
  const [newMaterialOpt, setNewMaterialOpt] = useState({
    activeOption,
    newMTL: null
  });

  const selectSwatch = (e) => {
    let color = COLORS[parseInt(e.target.dataset.key)];
    let newMTL;

    if (color.texture) {
      let txt = new THREE.TextureLoader().load(color.texture);

      txt.repeat.set(color.size[0], color.size[1], color.size[2]);
      txt.wrapS = THREE.RepeatWrapping;
      txt.wrapT = THREE.RepeatWrapping;

      newMTL = new THREE.MeshPhongMaterial({
        map: txt,
        shininess: color.shininess ? color.shininess : 10
      });
    } else {
      newMTL = new THREE.MeshPhongMaterial({
        color: parseInt("0x" + color.color),
        shininess: color.shininess ? color.shininess : 10
      });
    }

    return setNewMaterialOpt({
      activeOption,
      newMTL
    });
  };
  return (
    <React.Fragment>
      <OptionsMenu
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      />
      <Canvas id="rtfCanvas">
        <Scene newMaterialOpt={newMaterialOpt} />
      </Canvas>
      <div className="controls">
        <div className="info">
          <div className="info__message">
            <p>
              <strong>&nbsp;Grab&nbsp;</strong> to rotate chair.{" "}
              <strong>&nbsp;Scroll&nbsp;</strong> to zoom.{" "}
              <strong>&nbsp;Drag&nbsp;</strong> swatches to view more.
            </p>
          </div>
        </div>
        <ColorsSlider selectSwatch={selectSwatch} />
      </div>
      <div className="frame">
        <h1 className="frame__title">
          3D Model Color Customizer App with React-three-fiber
        </h1>
      </div>
    </React.Fragment>
  );
};

export default App;
