export interface FormStepProps {
	onNext: () => void;
	onPrevious: () => void;
	isFirstStep: boolean;
	isLastStep: boolean;
}

export interface ValidationError {
	field: string;
	message: string;
}

export type FormMode = "create" | "edit" | "view";
