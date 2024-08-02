import dynamic from "next/dynamic";
import { LatLngTuple } from 'leaflet';
import Head from 'next/head';
import Three from '../components/Three'

const Home: React.FC = () => {
  const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
  });

  const positions: LatLngTuple[] = [
    [-7.80166, 112.51804],
    [-7.808751, 112.517536],
    [-7.805427, 112.515759],
    [-7.803838, 112.515297],
    [-7.803475, 112.515869],
    [-7.801844, 112.513771],
  ];

  return (
    <div>
      <Head>
        <script src="https://threejs.org/build/three.js"></script>
      </Head>
      <Map positions={positions} zoom={17} />
      <Three/>
    </div>
  );
};

export default Home;
