import ToDo from "./Components/ToDo"
import sun from "./assets/icon-sun.svg"
import moon from "./assets/icon-moon.svg"
import "./App.css"

function App() {

  const handleClick = (e) => {
    const r = document.querySelector(':root');
    if (e.target.alt === "sun") {
      r.style.setProperty("--bg-color", "hsl(236, 33%, 92%)");
      r.style.setProperty("--bg-img", "url(/src/assets/bg-desktop-light.jpg) no-repeat top left");
      r.style.setProperty("--todo-bg", "hsl(0, 0%, 98%)");
      r.style.setProperty("--text-color", "hsl(235, 19%, 35%)");
      r.style.setProperty("--hover", "hsl(235, 19%, 35%)");
      r.style.setProperty("--footer", "hsl(236, 9%, 61%)");
      r.style.setProperty("--border", "hsl(233, 11%, 84%)");
      r.style.setProperty("--item-border", "hsl(233, 11%, 84%)");
      r.style.setProperty("--shadow", "hsl(233, 11%, 84%)");
      e.target.src = moon;
      e.target.alt = "moon";
    } else {
      r.style.setProperty("--bg-color", "hsl(235, 21%, 11%)");
      r.style.setProperty("--bg-img", "url(/src/assets/bg-desktop-dark.jpg) no-repeat top left");
      r.style.setProperty("--todo-bg", "hsl(235, 24%, 19%)");
      r.style.setProperty("--text-color", "hsl(234, 39%, 85%)");
      r.style.setProperty("--hover", "hsl(236, 33%, 92%)");
      r.style.setProperty("--footer", "hsl(234, 11%, 52%)");
      r.style.setProperty("--border", "hsl(237, 14%, 26%)");
      r.style.setProperty("--item-border", "hsl(233, 14%, 35%)");
      r.style.setProperty("--shadow", "hsla(0, 0%, 0%, 0.4)");
      e.target.src = sun;
      e.target.alt = "sun";
    }
  }

  return (
    <>
      <div className="form">
        <div className="title">
          <p>Todo</p>
          <img src={sun} onClick={handleClick} alt="sun" />
        </div>
        <ToDo />
        <p className="dnd">Drag and drop to reorder list</p>
      </div>
      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded by <a href="https://github.com/savchrisostomidhs">savchrisostomidhs</a>.
      </div>
    </>
  )
}

export default App
