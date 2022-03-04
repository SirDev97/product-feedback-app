import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import SuggestionDetails from './pages/SuggestionDetails/SuggestionDetails';
import CreateSuggestion from './pages/CreateSuggestion/CreateSuggestion';
import EditSuggestion from './pages/EditSuggestion/EditSuggestion';

// Components
import RoadmapList from './components/RoadmapList';

// Styles
import './App.css';

// Initial data
import data from './data.json';

const { productRequests } = data;
const { currentUser } = data;

const innerWidth = window.innerWidth;

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(productRequests);
  const [windowWidth, setWindowWidth] = useState(innerWidth);
  const { pathname } = useLocation();

  useEffect(() => {
    window.addEventListener('resize', function () {
      setWindowWidth(window.innerWidth);
    });
  });

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('overflowY-hidden');
  };

  const suggestionStatus = [];
  const planned = [];
  const inProgress = [];
  const live = [];

  suggestions.forEach((suggestion) => {
    if (suggestion.status === 'planned') planned.push(suggestion);
    if (suggestion.status === 'in-progress') inProgress.push(suggestion);
    if (suggestion.status === 'live') live.push(suggestion);
  });

  return (
    <div className={`App ${menuOpen && pathname === '/' ? 'dark' : null}`}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              suggestionRequests={suggestions}
              suggestionStatusLength={suggestionStatus.length}
              plannedLength={planned.length}
              inProgressLength={inProgress.length}
              liveLength={live.length}
              menuOpen={menuOpen}
              handleMenuToggle={handleMenuToggle}
              windowWidth={windowWidth}
            />
          }
        />
        <Route
          path="/suggestion-details/:id/*"
          element={
            <SuggestionDetails
              suggestions={suggestions}
              currentUser={currentUser}
              windowWidth={windowWidth}
            />
          }
        />
        <Route
          path="/create-suggestion"
          element={
            <CreateSuggestion
              suggestions={suggestions}
              setSuggestions={setSuggestions}
            />
          }
        />
        <Route
          path="/edit-suggestion/:id/*"
          element={
            <EditSuggestion
              suggestions={suggestions}
              setSuggestions={setSuggestions}
            />
          }
        />
        <Route
          path="/roadmap-list/*"
          element={
            <RoadmapList
              planned={planned}
              inProgress={inProgress}
              live={live}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
