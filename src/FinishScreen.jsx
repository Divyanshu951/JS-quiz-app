import React, { useState, useEffect, useRef } from "react";
import "./FinishScreen.css";

const API_URL = "https://699badac110b5b738cc07f41.mockapi.io/leaderboard";

function FinishScreen({
  points,
  selectedUserDetals,
  totalPoints,
  isSimple = false,
}) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW STATE: Tracks if the modal is open in simple mode
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (isSimple) {
      const fetchOnly = async () => {
        try {
          setIsLoading(true);
          const getRes = await fetch(API_URL);
          if (!getRes.ok) throw new Error("Failed to fetch leaderboard.");
          const data = await getRes.json();
          const sorted = data.sort((a, b) => b.points - a.points);
          setLeaderboard(sorted);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOnly();
      return;
    }

    if (!selectedUserDetals) {
      setError("No user details provided.");
      setIsLoading(false);
      return;
    }

    const percentage = totalPoints ? (points / totalPoints) * 100 : 0;

    const syncLeaderboard = async () => {
      try {
        setIsLoading(true);

        const newResult = {
          githubId: selectedUserDetals.id,
          username: selectedUserDetals.login,
          name: selectedUserDetals.name || selectedUserDetals.login,
          avatar: selectedUserDetals.avatar_url,
          points: points,
          totalPoints: totalPoints,
          html_url: selectedUserDetals.html_url,
          percentage: Number(percentage.toFixed(2)),
          timestamp: new Date().toISOString(),
        };

        if (!hasSubmitted.current) {
          hasSubmitted.current = true;
          const postRes = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newResult),
          });
          if (!postRes.ok) throw new Error("Failed to save score.");
        }

        const getRes = await fetch(API_URL);
        const data = await getRes.json();
        const sortedLeaderboard = data.sort((a, b) => b.points - a.points);
        setLeaderboard(sortedLeaderboard);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    syncLeaderboard();
  }, [isSimple, points, selectedUserDetals, totalPoints]);

  // ==========================================
  // RENDER: Simple Mode (Bottom Bar + Modal)
  // ==========================================
  if (isSimple) {
    return (
      <>
        {/* The Bottom Bar */}
        <div className="simple-leaderboard">
          {/* Arrow Button to open Modal */}
          <button
            className="modal-toggle-btn"
            onClick={() => setIsModalOpen(true)}
            title="Open Leaderboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>

          <span className="simple-title">🏆 Top Scores:</span>
          {isLoading && <span className="simple-text">Loading...</span>}
          {!isLoading &&
            leaderboard.slice(0, 3).map((user, i) => (
              <div key={user.id || i} className="simple-item">
                <span className="simple-rank">#{i + 1}</span>
                <img src={user.avatar} alt="avatar" className="simple-avatar" />
                <span className="simple-name">
                  <a
                    style={{ textDecoration: "none" }}
                    href={user.html_url}
                    target="_blank"
                  >
                    {user.username}
                  </a>
                </span>
                <span className="simple-score">{user.points} pts</span>
              </div>
            ))}
        </div>

        {/* The Modal Overlay (Only renders if isModalOpen is true) */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            {/* Modal Content Box (stopPropagation prevents closing when clicking inside the box) */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>🏆 Top 10 Leaderboard</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <ul className="leaderboard-list">
                  {/* Slices the top 10 users for the modal */}
                  {leaderboard.slice(0, 10).map((user, index) => (
                    <li key={user.id || index} className="leaderboard-item">
                      <div className="rank-and-user">
                        <span className="rank">#{index + 1}</span>
                        <img
                          src={user.avatar}
                          alt="avatar"
                          className="user-avatar-small"
                        />
                        <div className="user-info">
                          <span className="user-name">{user.name}</span>
                          <span className="user-username">
                            <a href={user.html_url} target="_blank">
                              @{user.username}
                            </a>
                          </span>
                        </div>
                      </div>
                      <div className="user-score">
                        <strong>{user.points}</strong> pts
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // ==========================================
  // RENDER: Full Finish Screen Mode
  // ==========================================
  const percentage = totalPoints ? (points / totalPoints) * 100 : 0;
  const topThree = leaderboard.slice(0, 3);
  const restOfLeaderboard = leaderboard.slice(3);

  return (
    <div className="finish-screen-container">
      <div className="result-card">
        <h2>Quiz Complete! 🎉</h2>
        <img
          src={selectedUserDetals?.avatar_url}
          alt="avatar"
          className="user-avatar-large"
        />
        <h3>{selectedUserDetals?.name || selectedUserDetals?.login}</h3>
        <p className="score-text">
          You scored <strong>{points}</strong> out of{" "}
          <strong>{totalPoints}</strong>
        </p>
        <p className="percentage-text">({Math.ceil(percentage)}%)</p>
      </div>

      <div className="leaderboard-container">
        <h3>🏆 Global Leaderboard</h3>
        {isLoading && <p className="loading-text">Syncing scores...</p>}
        {error && <p className="error-text">Error: {error}</p>}

        {!isLoading && !error && (
          <>
            {/* OLYMPIC PODIUM */}
            {topThree.length > 0 && (
              <div className="podium-wrapper">
                {topThree[1] && (
                  <div className="podium-step step-2">
                    <img
                      src={topThree[1].avatar}
                      alt="2nd"
                      className="podium-avatar"
                    />
                    <span className="podium-name">{topThree[1].username}</span>
                    <span className="podium-score">{topThree[1].points}</span>
                    <div className="podium-block bg-silver">🥈</div>
                  </div>
                )}

                {topThree[0] && (
                  <div className="podium-step step-1">
                    <img
                      src={topThree[0].avatar}
                      alt="1st"
                      className="podium-avatar"
                    />
                    <span className="podium-name">{topThree[0].username}</span>
                    <span className="podium-score">{topThree[0].points}</span>
                    <div className="podium-block bg-gold">🥇</div>
                  </div>
                )}

                {topThree[2] && (
                  <div className="podium-step step-3">
                    <img
                      src={topThree[2].avatar}
                      alt="3rd"
                      className="podium-avatar"
                    />
                    <span className="podium-name">{topThree[2].username}</span>
                    <span className="podium-score">{topThree[2].points}</span>
                    <div className="podium-block bg-bronze">🥉</div>
                  </div>
                )}
              </div>
            )}

            {/* REST OF LIST */}
            <ul className="leaderboard-list mt-top">
              {restOfLeaderboard.map((user, index) => {
                const actualRank = index + 4;
                const isCurrentUser =
                  user.githubId === selectedUserDetals?.id &&
                  user.points === points;

                return (
                  <li
                    key={user.id || index}
                    className={`leaderboard-item ${isCurrentUser ? "current-user-highlight" : ""}`}
                  >
                    <div className="rank-and-user">
                      <span className="rank">#{actualRank}</span>
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="user-avatar-small"
                      />
                      <div className="user-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-username">
                          <a href={user.html_url} target="_blank">
                            @{user.username}
                          </a>
                        </span>
                      </div>
                    </div>
                    <div className="user-score">
                      <strong>{user.points}</strong> / {user.totalPoints}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default FinishScreen;
