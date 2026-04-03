// pages/calm-library-access.js
import { useEffect, useState } from "react";
import purchasesData from "../purchases.json"; // your JSON database

// Map track numbers to Google Drive streaming links
const TRACK_LINKS = {
  1: "https://drive.google.com/uc?export=stream&id=18fAlAt0ArIWEdCfl1cMjqrN93P_fBzVG",
  2: "https://drive.google.com/uc?export=stream&id=1oyCSDZGNaV2LDYCKCyGo6yZo8DSFdFUw",
  3: "https://drive.google.com/uc?export=stream&id=1kFjYM9rnl0UZk0Ooto2JXnlkzfri8jXO",
  4: "https://drive.google.com/uc?export=stream&id=1e-JP9VP0yTNsBlXm3uUY5w5l4qmqvf6R",
  5: "https://drive.google.com/uc?export=stream&id=1d_0CyZ3kyzOsIqBAZvcMiGu4L63l_y6Y",
  6: "https://drive.google.com/uc?export=stream&id=1fG7Qjw5bwqa3TPgsPbCyT4PpjTk9lMhv",
  7: "https://drive.google.com/uc?export=stream&id=1zPR_dWWdtPIS3adiSPgTMl2qFn-HdMg6",
  8: "https://drive.google.com/uc?export=stream&id=1w7VvXPhYANZ8_81ZrXWP9rB3RHPYhYlx",
  9: "https://drive.google.com/uc?export=stream&id=1VSNW5iMzb8nI-ERYsFD5e0fb8mHBNSR-",
  10: "https://drive.google.com/uc?export=stream&id=1xonkp7Peh4z8bK94je-oRAft-kA7KR6E",
  11: "https://drive.google.com/uc?export=stream&id=1HIK7yNmqc_SItkrgG19fenlLaBfNWcqs",
  12: "https://drive.google.com/uc?export=stream&id=1ZYp3hRMx0ZLE3F8-VRjlwkxbBV8scYeQ",
  13: "https://drive.google.com/uc?export=stream&id=1mNIgp6hCe5KPXKYpsf4gXzBAYSTyXs-v"
};

export default function CalmLibraryAccess() {
  const [tracks, setTracks] = useState([]);
  const [expired, setExpired] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); // get token from URL

    if (!token) {
      setInvalid(true);
      return;
    }

    // Find purchase record with token
    const purchase = purchasesData.find(p => p.token === token);
    if (!purchase) {
      setInvalid(true);
      return;
    }

    // Check 30-day expiry
    const purchaseDate = new Date(purchase.timestamp);
    const now = new Date();
    const diffDays = (now - purchaseDate) / (1000 * 60 * 60 * 24);

    if (diffDays > 30) {
      setExpired(true);
      return;
    }

    // Map selected tracks to Google Drive links
    const selectedTracks = purchase.tracks.map(t => ({
      number: t,
      link: TRACK_LINKS[t]
    }));

    setTracks(selectedTracks);
  }, []);

  // -----------------------------
  // UI messages
  // -----------------------------
  if (invalid) return <p>Invalid or missing token. Please contact support.</p>;
  if (expired) return <p>Your 30-day access has expired. Please repurchase to regain access.</p>;
  if (tracks.length === 0) return <p>No tracks found for this token.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h2>Your Calm Within Me Meditation Library</h2>
      <p>Access expires 30 days after purchase.</p>

      {tracks.map(track => (
        <div key={track.number} style={{ marginBottom: "1.5rem" }}>
          <h4>Track {track.number}</h4>
          <audio controls style={{ width: "100%" }}>
            <source src={track.link} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
}