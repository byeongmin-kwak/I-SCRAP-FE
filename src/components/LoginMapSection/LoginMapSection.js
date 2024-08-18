import React, { useEffect } from "react";
import styless from "./LoginMapSection.module.css";
import bottomImage from "../../assets/image4.svg";

const LoginMapSection = () => {
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
    <div className={styless.mapSection}>
      <div className={styless.mainContainer}>
        <div className={styless.mapHeader}>
          <div className={styless.leftText}>내 주변 팝업</div>
          <div className={styless.rightText}>지도에서 찾기</div>
        </div>
        <div id="map" className={styless.mapContainer}></div>
      </div>
    </div>
  );
};

export default LoginMapSection;
