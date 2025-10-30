import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
	WillData,
	PersonalInfo,
	ReligiousDeclaration,
	FuneralPreferences,
	JanazaPreferences,
	BurialPreferences,
	Debt,
	Asset,
	Heir,
	WasiyyaBequest,
} from "../types/will";

interface WillStore {
	willData: Partial<WillData>;
	currentStep: number;

	// Actions
	setPersonalInfo: (info: PersonalInfo) => void;
	setReligiousDeclarations: (declarations: ReligiousDeclaration[]) => void;
	setFuneralPreferences: (preferences: FuneralPreferences) => void;
	setJanazaPreferences: (preferences: JanazaPreferences) => void;
	setBurialPreferences: (preferences: BurialPreferences) => void;
	setDebts: (debts: Debt[]) => void;
	setAssets: (assets: Asset[]) => void;
	setHeirs: (heirs: Heir[]) => void;
	setWasiyyaBequests: (bequests: WasiyyaBequest[]) => void;
	setFinalSupplication: (text: string) => void;
	setCurrentStep: (step: number) => void;
	nextStep: () => void;
	previousStep: () => void;
	resetWill: () => void;
	updateLastModified: () => void;
}

const initialState: Partial<WillData> = {
	religiousDeclarations: [],
	debts: [],
	assets: [],
	heirs: [],
	wasiyyaBequests: [],
	dateCreated: new Date().toISOString(),
	lastModified: new Date().toISOString(),
};

export const useWillStore = create<WillStore>()(
	persist(
		(set) => ({
			willData: initialState,
			currentStep: 0,

			setPersonalInfo: (info) =>
				set((state) => ({
					willData: { ...state.willData, personalInfo: info },
				})),

			setReligiousDeclarations: (declarations) =>
				set((state) => ({
					willData: { ...state.willData, religiousDeclarations: declarations },
				})),

			setFuneralPreferences: (preferences) =>
				set((state) => ({
					willData: { ...state.willData, funeralPreferences: preferences },
				})),

			setJanazaPreferences: (preferences) =>
				set((state) => ({
					willData: { ...state.willData, janazaPreferences: preferences },
				})),

			setBurialPreferences: (preferences) =>
				set((state) => ({
					willData: { ...state.willData, burialPreferences: preferences },
				})),

			setDebts: (debts) =>
				set((state) => ({
					willData: { ...state.willData, debts },
				})),

			setAssets: (assets) =>
				set((state) => ({
					willData: { ...state.willData, assets },
				})),

			setHeirs: (heirs) =>
				set((state) => ({
					willData: { ...state.willData, heirs },
				})),

			setWasiyyaBequests: (bequests) =>
				set((state) => ({
					willData: { ...state.willData, wasiyyaBequests: bequests },
				})),

			setFinalSupplication: (text) =>
				set((state) => ({
					willData: { ...state.willData, finalSupplication: text },
				})),

			setCurrentStep: (step) => set({ currentStep: step }),

			nextStep: () =>
				set((state) => ({
					currentStep: Math.min(state.currentStep + 1, 9),
				})),

			previousStep: () =>
				set((state) => ({
					currentStep: Math.max(state.currentStep - 1, 0),
				})),

			updateLastModified: () =>
				set((state) => ({
					willData: {
						...state.willData,
						lastModified: new Date().toISOString(),
					},
				})),

			resetWill: () =>
				set({
					willData: initialState,
					currentStep: 0,
				}),
		}),
		{
			name: "wassiya-storage",
		}
	)
);
