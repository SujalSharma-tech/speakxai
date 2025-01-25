import React, { useState, useEffect } from "react";
import { QuestionServiceClient } from "./proto/question_grpc_web_pb";
import { QueryRequest } from "./proto/question_pb";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import refreshicon from "./refresh.png";
import QuestionCarousel from "./Components/CarouselComponent/QuestionCarousel";

function App() {
  const [selectedTypes, setSelectedTypes] = useState(["ALL"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalQues, setTotalQues] = useState(0);
  const [ques, setQues] = useState([]);
  const [showRefresh, setShowRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleType = (type) => {
    if (type === "ALL") {
      setSelectedTypes(["ALL"]);
    } else {
      setSelectedTypes((prevTypes) => {
        const isActive = prevTypes.includes(type);
        const updatedTypes = isActive
          ? prevTypes.filter((t) => t !== type)
          : [...prevTypes.filter((t) => t !== "ALL"), type];

        return updatedTypes.length === 0 ? ["ALL"] : updatedTypes;
      });
    }
  };

  const fetchData = async (query) => {
    setLoading(true);
    const EnvoyURL = process.env.REACT_APP_ENVOY_URL;
    const client = new QuestionServiceClient(EnvoyURL);
    const request = new QueryRequest();
    request.setTitle(query);
    request.setPage(currentPage);
    request.setLimit(20);
    request.setTypes(
      selectedTypes.includes("ALL") ? "" : selectedTypes.join(",")
    );

    client.searchQuestions(request, {}, (err, response) => {
      if (err) {
        console.error("Error:", err);
        setLoading(false);
      } else {
        setQues(response.toObject().questionsList);
        setTotalPages(response.toObject().totalpages);
        setTotalQues(response.toObject().totalcount);
        setLoading(false);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData(searchQuery);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageIndex = Array.from({ length: totalPages }, (_, indx) => indx + 1);

  useEffect(() => {
    fetchData(searchQuery);
  }, [currentPage]);

  return (
    <div className="app">
      <header className="header">
        <h1 style={{ fontSize: "30px" }}>Welcome to SPEAKXAI</h1>
        <p>Enter your Search Query below and find questions in one click!</p>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="Enter your search query here"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <button className="submit-btn" type="submit">
            <FaSearch size={22} />
          </button>
        </div>
      </form>
      <div className="types-container">
        {["ALL", "MCQ", "CONTENT_ONLY", "READ_ALONG", "ANAGRAM"].map((type) => (
          <div
            key={type}
            className={`type ${selectedTypes.includes(type) ? "active" : ""}`}
            onClick={() => {
              toggleType(type);
              setCurrentPage(1);
              setShowRefresh(true);
            }}
          >
            {type.replace(/_/g, " ")}
          </div>
        ))}
        {showRefresh && (
          <button
            onClick={() => {
              fetchData(searchQuery);
              setShowRefresh(false);
            }}
            className="refreshbtn"
          >
            See Results
          </button>
        )}
      </div>
      {ques && <h3>Total Questions Found: {totalQues}</h3>}

      <div className="question-list">
        {loading ? (
          <Skeleton
            count={3}
            height={90}
            borderRadius={10}
            style={{ margin: "5px 0" }}
          />
        ) : ques && ques.length > 0 ? (
          ques.map((question, index) => (
            <QuestionCarousel
              key={question.id}
              question={question}
              index={index}
              currentPage={currentPage}
            />
          ))
        ) : (
          <div style={{ fontSize: "20px", margin: "10px 0" }}>
            <p className="incorrect">No Result Found!</p> Try Updating Filter or
            Changing Query
          </div>
        )}
      </div>
      {loading ? (
        ""
      ) : (
        <div className="pagination">
          <button
            className="pagination-btn prev-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className={`pagination-number ${currentPage === 1 ? "active" : ""}`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          <span className="pagination-dots">...</span>
          {pageIndex
            .slice(
              Math.max(1, currentPage - 2),
              Math.min(totalPages - 1, currentPage + 3)
            )
            .map((page) => (
              <button
                key={page + 1}
                className={`pagination-number ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          <span className="pagination-dots">...</span>
          <button
            className={`pagination-number ${
              currentPage === totalPages ? "active" : ""
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
          <button
            className="pagination-btn next-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
