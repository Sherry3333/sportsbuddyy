import badmintonImg from "@/assets/img/sports/badminton.png";
import basketballImg from "@/assets/img/sports/basketball.png";
import tennisImg from "@/assets/img/sports/tennis.png";
import footballImg from "@/assets/img/sports/football.png";
import bicycleImg from "@/assets/img/sports/bicycle.png";
import crewImg from "@/assets/img/sports/crew.png";
import golfImg from "@/assets/img/sports/golf.png";
import walkingImg from "@/assets/img/sports/walking.png";
import yogaImg from "@/assets/img/sports/yoga.png";
import volleyballImg from "@/assets/img/sports/volleyball.png";
import swimmingImg from "@/assets/img/sports/swimming.png";
import runningImg from "@/assets/img/sports/running.png";
import cyclingImg from "@/assets/img/sports/cycling.png";
import defaultImg from "@/assets/img/sports/default.png";

const sportImages = {
  Badminton: badmintonImg,
  Basketball: basketballImg,
  Tennis: tennisImg,
  Football: footballImg,
  bicycleImg: bicycleImg,
  crewImg: crewImg,
  Golf: golfImg,
  Walking: walkingImg,
  Yoga: yogaImg,
  Volleyball: volleyballImg,
  Swimming: swimmingImg,
  Running: runningImg,
  Cycling: cyclingImg,
  default: defaultImg,
};


export const getImage = (sport) => sportImages[sport] || sportImages.default;
