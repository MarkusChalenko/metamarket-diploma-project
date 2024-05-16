import { FC } from "react";
import { default as ReduxToastrLibrary } from "react-redux-toastr";

export const ReduxToastr: FC = (): JSX.Element => {
  return (
    <ReduxToastrLibrary
      newestOnTop={false}
      position="bottom-right"
      preventDuplicates
      progressBar
      closeOnToastrClick
      timeOut={4000}
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
  );
};
