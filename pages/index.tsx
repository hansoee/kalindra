import dynamic from "next/dynamic";
import { LatLngTuple } from 'leaflet';

const Home: React.FC = () => {
  const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
  });

  const positions: LatLngTuple[] = [
    [-7.80166, 112.51804],
    [-24.63744117850105, 113.24092548920918],
    [-24.634748305662095, 113.23909861990798],
    [-24.633230409962335, 113.23862018694673],
    [-24.632889321076148, 113.2392011329192],
    [-24.630923805470143, 113.23785731138456],
    [-24.631396217618788, 113.23688869490068],
  ];

  return (
    <div>
      <Map positions={positions} zoom={17} />
    </div>
  );
};

export default Home;
