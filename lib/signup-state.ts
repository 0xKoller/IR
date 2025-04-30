import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserData } from "@/types/signup.types";

const SIGNUP_STATE_KEY = ["signup-state"];

const initialState = {
  currentStep: 1,
  userData: {
    username: "",
    email: "",
    fullName: "",
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    governmentId: {
      type: "passport",
      number: "",
      expiryDate: "",
    },
  } as UserData,
  globalError: null as string | null,
};

export function useSignupState() {
  const queryClient = useQueryClient();

  const { data: state = initialState } = useQuery({
    queryKey: SIGNUP_STATE_KEY,
    queryFn: () => initialState,
    staleTime: Infinity,
  });

  const setSignupState = useMutation({
    mutationFn: async (newState: Partial<typeof initialState>) => {
      queryClient.setQueryData(SIGNUP_STATE_KEY, (old: any) => ({
        ...old,
        ...newState,
      }));
      return newState;
    },
  });

  return {
    state,
    setSignupState: setSignupState.mutate,
  };
}
