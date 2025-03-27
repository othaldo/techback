import { registerAllViews } from "../views/registerAllViews";
import { useTrainingPlan } from "./useTrainingPlan";

export const useViewInitializer = ({ setActiveView, user }) => {
  const {
    dayData,
    showMessage,
    setShowMessage,
    refreshPlan,
    refreshPlanAfterFeedback,
  } = useTrainingPlan(user);

  // direkt synchron aufrufen (nicht useEffect!)
  registerAllViews({
    dayData,
    setActiveView,
    setShowMessage,
    refreshPlan,
    refreshPlanAfterFeedback,
  });

  return { dayData, showMessage, setShowMessage };
};
