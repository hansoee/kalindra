import { useState } from 'react';
import dynamic from 'next/dynamic';
import { LatLngTuple } from 'leaflet';
import Head from 'next/head';
import Three from '../components/Three';
import Cetak from '../components/Cetak'; 

const Home: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState('interactive');

  const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
  });

  const positions: LatLngTuple[] = [
    [-7.80166, 112.51804],
    [-7.803475, 112.515869],
    [-7.803838, 112.515297],
    [-7.805427, 112.515759],
    [-7.808751, 112.517536],
    [-7.801844, 112.513771],
  ];

  const handleMapChange = (mapType: string) => {
    if (mapType === '3d') {
      window.location.href = 'https://www.google.com/maps/d/edit?mid=1rZc_tseYA-dXxHQFkQ7HSPKPbOrFq_k&usp=sharing';
    } else {
      setSelectedMap(mapType);
    }
  };

  return (
    <div>
      <Head>
        <script src="https://threejs.org/build/three.js"></script>
      </Head>
      <label>
        <input 
          type="radio" 
          name="mapType" 
          value="interactive" 
          checked={selectedMap === 'interactive'} 
          onChange={() => handleMapChange('interactive')}
        />
        Peta Interaktif
      </label>
      <label>
        <input 
          type="radio" 
          name="mapType" 
          value="printable" 
          checked={selectedMap === 'printable'} 
          onChange={() => handleMapChange('printable')}
        />
        Peta Cetak
      </label>
      <label>
        <input 
          type="radio" 
          name="mapType" 
          value="3d" 
          checked={selectedMap === '3d'} 
          onChange={() => handleMapChange('3d')}
        />
        Peta 3D
      </label>

      {selectedMap === 'interactive' && <Map positions={positions} zoom={17} />}
      {selectedMap === 'printable' && <Cetak />}
      {selectedMap === '3d' && <Three />}
    </div>
  );
};

export default Home;
