import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  const particlesInit = useRef(null);

  useEffect(() => {
    loadSlim(particlesInit.current);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={(engine) => {
        particlesInit.current = engine;
      }}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 50 },
          size: { value: 4 },
          color: { value: ["#e91e63", "#9c27b0", "#03a9f4"] },
          opacity: { value: 0.5 },
          move: { enable: true, speed: 1 },
          shape: { type: "circle" },
        },
      }}
    />
  );
};

export default ParticlesBackground;
