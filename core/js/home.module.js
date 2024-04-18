import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Home {
  constructor() {
    this.getGames("mmorpg");
    // active link & get data
    document.querySelectorAll("nav .nav-link").forEach((item) => {
      item.addEventListener("click", (e) => {
        document.querySelector(".menu .active").classList.remove("active");
        e.target.classList.add("active");
        this.getGames(e.target.dataset.category);
      });
    });
    document.getElementById("goTop").addEventListener("click", function () {
      window.scrollTo(0, 0);
    });
    this.ui = new Ui();
  }

  async getGames(gategoryName) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");
    const apiLink = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "1eec5fe155msha4a970d9fe7f046p1a64f3jsn2d588d7c2b1c",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const response = await fetch(apiLink + `${gategoryName}`, options);
    const finalResponse = await response.json();
    this.ui.displayDataGame(finalResponse);
    loading.classList.add("d-none");
    this.startEvent();
  }

  startEvent() {
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("click", () => {
        const gameID = item.dataset.id;
        this.showDetails(gameID);
      });
    });
  }

  showDetails(gameID) {
    new Details(gameID);
    document.querySelector(".home").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
}
