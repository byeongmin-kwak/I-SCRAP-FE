import React, { useEffect, useState } from "react";
import styles from "./MapPage.module.css";
import { AiOutlineSearch } from "react-icons/ai";

const MapPage = () => {
  const clientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
  const [searchQuery, setSearchQuery] = useState("");
  const [isBookmarkActive, setIsBookmarkActive] = useState(false);
  const [activeStatus, setActiveStatus] = useState(""); // 진행중 진행예정

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

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // 검색 로직 추가
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleBookmarkClick = () => {
    setIsBookmarkActive(!isBookmarkActive);
  };

  const handleStatusClick = (status) => {
    setActiveStatus(status);
  };

  return (
    <div className={styles.MapPage}>
      <div className={styles.mainContainer}>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="내 주변 팝업을 검색해보세요!"
            onKeyDown={(e) => activeEnter(e)}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            <AiOutlineSearch />
          </button>
        </div>
        <div id="map" className={styles.mapContainer}>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.button} ${
                isBookmarkActive ? styles.active : ""
              }`}
              onClick={handleBookmarkClick}
            >
              북마크
            </button>

            <button
              className={`${styles.button} ${
                activeStatus === "진행중" ? styles.active : ""
              }`}
              onClick={() => handleStatusClick("진행중")}
            >
              진행중
            </button>

            <button
              className={`${styles.button} ${
                activeStatus === "진행예정" ? styles.active : ""
              }`}
              onClick={() => handleStatusClick("진행예정")}
            >
              진행예정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
