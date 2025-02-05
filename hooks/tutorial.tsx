import { useReducer } from "react";

type State = {
  firstModalIsOpen: boolean;
  secondModalIsOpen: boolean;
};

type Action =
  | { type: "SET_FIRST_MODAL_STATE"; payload: boolean }
  | { type: "SET_SECOND_MODAL_STATE"; payload: boolean };

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FIRST_MODAL_STATE":
      return {
        ...state,
        firstModalIsOpen: action.payload,
      };

    case "SET_SECOND_MODAL_STATE":
      return {
        ...state,
        secondModalIsOpen: action.payload,
      };
    default:
      return { ...state };
  }
};

const useTutorial = (startTutorial: boolean) => {
  const [tutorial, setForm] = useReducer(formReducer, {
    firstModalIsOpen: startTutorial,
    secondModalIsOpen: false,
  });

  const toggleFirstModalState = (state: boolean) => {
    setForm({type:'SET_FIRST_MODAL_STATE', payload:state})
  };

  const toggleSecondModalState = (state: boolean) => {
    setForm({type:'SET_SECOND_MODAL_STATE', payload:state})
  };

  const finishTutorial = () => {
    setForm({type:'SET_SECOND_MODAL_STATE', payload:false})
  };

  return {
    tutorial,
    toggleFirstModalState,
    toggleSecondModalState,
    finishTutorial,
  };
};

export default useTutorial;
