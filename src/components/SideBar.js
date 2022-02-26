import CategoryList from './CategoryList';
import Roadmap from './Roadmap';
import './Sidebar.css';

const SideBar = ({
  menuOpen,
  currentCategory,
  changeCategory,
  plannedLength,
  inProgressLength,
  liveLength,
}) => {
  return (
    <div className={`sidebar ${!menuOpen ? 'd-none' : null}`}>
      <CategoryList
        currentCategory={currentCategory}
        changeCategory={changeCategory}
      />
      <Roadmap
        plannedLength={plannedLength}
        inProgressLength={inProgressLength}
        liveLength={liveLength}
      />
    </div>
  );
};

export default SideBar;