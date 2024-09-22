import React, { useState, useEffect } from "react";
import styles from "./SearchPage.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiBookmark } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

// 필터 옵션 데이터
const dateOptions = ["오늘", "+1주", "+2주", "직접입력"];
const regionOptions = [
  "전체",
  "잠실",
  "성수",
  "홍대",
  "종로",
  "용산",
  "더현대",
  "경기도",
  "그외",
];
const typeOptions = [
  "전체",
  "캐릭터",
  "드라마",
  "패션",
  "음악",
  "음식",
  "그외",
];

const SearchPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedType, setSelectedType] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [results, setResults] = useState([]);

  const serverURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    fetchFilteredData();
  }, [selectedDate, selectedRegion, selectedType, fromDate, toDate]); // 필터 관련 상태 의존성 배열 추가

  const fetchFilteredData = async () => {
    try {
      // 필요한 쿼리 파라미터 생성
      const params = new URLSearchParams();

      // 날짜 필터 추가
      if (fromDate && toDate) {
        params.append("start", fromDate.toISOString().split("T")[0]);
        params.append("end", toDate.toISOString().split("T")[0]);
      }

      // 카테고리 필터 추가 (전체가 아닐 때만)
      if (selectedType && selectedType !== "전체") {
        params.append("category", selectedType);
      }

      // 지역 필터 추가 (전체가 아닐 때만)
      if (selectedRegion && selectedRegion !== "전체") {
        params.append("location", selectedRegion);
      }

      // 검색어 필터 추가
      if (searchQuery) {
        params.append("query", searchQuery);
      }

      // 필터에 맞는 데이터 요청
      const response = await axios.get(
        `${serverURL}/search/popups/filter?${params.toString()}`
      );
      setResults(response.data); // 받은 데이터를 상태로 저장
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const handleSearch = () => {
    fetchFilteredData(); // 검색 버튼을 눌렀을 때 데이터 요청
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? "" : filter);
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="가고 싶은 팝업을 검색해보세요!"
          onKeyDown={(e) => activeEnter(e)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          <AiOutlineSearch />
        </button>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterGroup}>
          <span
            className={styles.filterTitle}
            onClick={() => toggleFilter("날짜")}
          >
            날짜
          </span>
          <div className={styles.filterOptionsContainer}>
            <div className={styles.filterOptions}>
              {dateOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(option)}
                  className={
                    selectedDate === option ? styles.selectedOption : ""
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        {selectedDate === "직접입력" && (
          <div className={styles.filterDetail}>
            <div className={styles.datePickers}>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="From"
                className={styles.datePicker}
              />
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="To"
                className={styles.datePicker}
              />
            </div>
          </div>
        )}
        <div className={styles.filterGroup}>
          <span
            className={styles.filterTitle}
            onClick={() => toggleFilter("지역")}
          >
            지역
          </span>
          <div className={styles.filterOptionsContainer}>
            <div className={styles.filterOptions}>
              {regionOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRegion(option)}
                  className={
                    selectedRegion === option ? styles.selectedOption : ""
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <span
            className={styles.filterTitle}
            onClick={() => toggleFilter("종류")}
          >
            종류
          </span>
          <div className={styles.filterOptionsContainer}>
            <div className={styles.filterOptions}>
              {typeOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedType(option)}
                  className={
                    selectedType === option ? styles.selectedOption : ""
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          {activeFilter === "종류" && (
            <div className={styles.filterDetail}>
              {/* 이 부분에 종류의 세부 옵션 UI를 구현 */}
              <p>종류 세부 옵션</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.button}>
        <button>
          인기순 <IoIosArrowDown />
        </button>
      </div>
      <div className={styles.resultsSection}>
        {results.map((store) => (
          <div key={store.id} className={styles.resultCard}>
            <img src={store.poster} alt="" className={styles.resultImage} />
            <div className={styles.resultDetails}>
              <p>{store.address}</p>
              <h3>
                {store.name.split(" : ")[0]} <br /> {store.name.split(" : ")[1]}
              </h3>
              <p>
                {store.dateRange.start} ~ <br /> {store.dateRange.end}
              </p>
            </div>
            <div className={styles.bookmarkAndTag}>
              <div className={styles.bookmark}>
                <CiBookmark size="30" />
              </div>
              <div className={styles.tag}>{store.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
