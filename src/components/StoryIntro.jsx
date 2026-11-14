import { INTRO_STORY } from "../ui-story";
import PlayerAstronaut from "./PlayerAstronaut";

function StoryIntro({ planet, name, color, index, onNext, onSkip }) {
  const slide = INTRO_STORY[index];
  const copy = slide.copy.replace("{planet}", planet);
  return (
    <section className="story-intro panel-glass">
      <div className="story-astronaut"><PlayerAstronaut suitColor={color} mood={slide.mood} /><span className="story-sparkle" aria-hidden="true">✦</span></div>
      <div className="story-copy"><p className="eyebrow">YOUR SPACE STORY · {index + 1} OF {INTRO_STORY.length}</p><h1>{slide.title}</h1><p>{copy}</p><p className="story-name">{name}, you can do this!</p>
        <div className="story-actions"><button className="text-button" type="button" onClick={onSkip}>Skip</button><button className="primary-button" type="button" onClick={onNext}>{index === INTRO_STORY.length - 1 ? "Start day 1" : "Next"}<span>→</span></button></div>
      </div>
    </section>
  );
}

export default StoryIntro;
