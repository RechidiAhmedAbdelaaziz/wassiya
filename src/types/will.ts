export interface PersonalInfo {
	lastName: string;
	firstName: string;
	birthDate: string;
	birthCity: string;
	birthCountry: string;
	fatherLastName: string;
	fatherFirstName: string;
	motherLastName: string;
	motherFirstName: string;
}

export interface ReligiousDeclaration {
	id: string;
	text: string;
	isSelected: boolean;
	category: "shahada" | "faith" | "other";
}

export interface FuneralPreferences {
	washedBy?: string;
	washedByContact?: string;
}

export interface JanazaPreferences {
	janazaLeader?: string;
	janazaLeaderContact?: string;
}

export interface BurialPreferences {
	preferredCemetery?: string;
	preferredLocation?: string;
	graveSite?: "family" | "new" | "specific";
	customRequests?: string;
}

export interface Debt {
	id: string;
	type: "loan" | "unpaidZakat" | "hajj" | "other";
	description: string;
	amount?: number;
	creditor?: string;
	notes?: string;
}

export interface Asset {
	id: string;
	type: "property" | "vehicle" | "savings" | "business" | "other";
	description: string;
	estimatedValue?: number;
	location?: string;
	notes?: string;
}

export interface Heir {
	id: string;
	name: string;
	relationship: string;
	contactInfo?: string;
}

export interface WasiyyaBequest {
	id: string;
	description: string;
	beneficiary: string;
	amount?: number;
	percentage?: number;
}

export interface WillData {
	personalInfo: PersonalInfo;
	religiousDeclarations: ReligiousDeclaration[];
	funeralPreferences: FuneralPreferences;
	janazaPreferences: JanazaPreferences;
	burialPreferences: BurialPreferences;
	debts: Debt[];
	assets: Asset[];
	heirs: Heir[];
	wasiyyaBequests: WasiyyaBequest[];
	finalSupplication?: string;
	witnessNames?: string[];
	dateCreated: string;
	lastModified: string;
}

export interface FormStep {
	id: number;
	title: string;
	description: string;
	isComplete: boolean;
}
