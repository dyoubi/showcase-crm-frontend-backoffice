import { useCallback } from "react";
import { useToaster } from "./useToaster";
import { formatApiError, isApiError } from "../domains/api";

export const useHandleError = () => {
  const toaster = useToaster();

  return useCallback((error: unknown) => {
    console.error(error);

    if (!isApiError(error)) {
      toaster({
        color: 'danger',
        content: 'An unknown error occurred, please check the tech team.',
      });

      return;
    }

    const apiError = formatApiError(error);

    toaster({
      color: 'danger',
      content: `An unknown API error occurred, please check with the dev team: ${apiError.message}`,
    });
  }, [toaster])
}
