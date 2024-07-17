import * as L from 'leaflet';

declare module 'leaflet' {
  namespace GeoJSON {
    class AJAX extends L.GeoJSON {
      constructor(url: string | string[], options?: GeoJSONOptions);
      addUrl(url: string | string[]): this;
    }
  }
}
