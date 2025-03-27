import { registerView } from "../viewRegistry";
import { VIEW_IDS } from "./viewIds";
import DayChecklist from "../components/DayChecklist";
import FeedbackForm from "../components/FeedbackForm";
import Credits from "../components/Credits";
import StandUpTimer from "../components/StandUpTimer";
import Stats from "../components/Stats";

export function registerAllViews(helpers) {
  registerView(VIEW_IDS.HOME, () => (
    <>
      {helpers.dayData && <DayChecklist dayData={helpers.dayData} />}
      <div className="text-center mt-6">
        <button
          onClick={() => helpers.setActiveView(VIEW_IDS.FEEDBACK)}
          className="bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg backdrop-blur-md shadow-md transition"
        >
          Programm anpassen
        </button>
      </div>
    </>
  ));

  registerView(VIEW_IDS.FEEDBACK, () => (
    <FeedbackForm
      onCancel={() => helpers.setActiveView(VIEW_IDS.HOME)}
      onSave={(resetToday = false) => {
        helpers.setShowMessage(true);
        helpers.refreshPlanAfterFeedback(resetToday);
        helpers.setActiveView(VIEW_IDS.HOME);
        setTimeout(() => helpers.setShowMessage(false), 3000);
      }}
    />
  ));

  registerView(VIEW_IDS.CREDITS, () => <Credits />);
  registerView(VIEW_IDS.STANDUP, () => <StandUpTimer />);
  registerView(VIEW_IDS.STATS, () => <Stats />);
}
