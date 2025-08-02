import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { Application, Assets } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { LnlAnimeProps } from "./types";





const LnlAnime: React.FC<LnlAnimeProps> = ({width,height,scale,status}:LnlAnimeProps) => {
  const canvasRef = useRef(null as any);

  const appRef = useRef(null as any); // To store the PixiJS app instance

  const spineBoyRef = useRef(null as any);

  const [spineAsset, setSpineAsset] = useState(null as any);

  useEffect(() => {
    const initPixi = async () => {
      if (!canvasRef.current) return;

      const app = new Application();
      await app.init({
        width,
        height,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        canvas: canvasRef.current, // Pass the canvas element
        backgroundAlpha:0,
        hello: true,
      });

      appRef.current = app; // Store the app instance
      Assets.add({ alias: "spineboyData", src: '../asset/nnl_1.json'});
      Assets.add({ alias: "spineboyAtlas", src: '../asset/nnl_1.atlas' });
      const asset = await Assets.load(["spineboyData", "spineboyAtlas"]);
      console.log(asset);
      setSpineAsset(asset);
    };

    initPixi();
  }, []);

  useEffect(() => {
    if (spineAsset) {
      const spineboy = Spine.from({
        skeleton: "spineboyData",
        atlas: "spineboyAtlas",
        scale: scale,
      });
      spineBoyRef.current = spineboy;

      spineboy.state.data.defaultMix = 0.2;

      spineboy.state.setAnimation(0, status, true);
      spineboy.x = width;
      spineboy.y = height / 2 + spineboy.getBounds().height/2-30;

      appRef.current.stage.addChild(spineboy);
    }
  }, [spineAsset]);
  return <div className="anime"><canvas ref={canvasRef}></canvas></div>;
};

export default LnlAnime;

