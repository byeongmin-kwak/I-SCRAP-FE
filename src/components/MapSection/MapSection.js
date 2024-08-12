import React, { useEffect } from "react";
import "./MapSection.css";

const MapSection = () => {
  const clientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
        zoom: 13,
      };

      const map = new window.naver.maps.Map("map", mapOptions);
    };

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`;
    script.onload = () => initializeMap();
    document.head.appendChild(script);
  }, []);

  return (
    <div className="map-section">
      <div className="map-header">
        <div className="left-text">내 주변 팝업</div>
        <div className="right-text">지도에서 찾기</div>
      </div>
      <div id="map" className="map-container"></div>
    </div>
  );
};

export default MapSection;
