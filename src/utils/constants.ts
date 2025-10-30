export const FORM_STEPS = [
	{ id: 0, title: "Informations personnelles", key: "personalInfo" },
	{ id: 1, title: "Déclarations religieuses", key: "religiousDeclarations" },
	{ id: 2, title: "Préférences funéraires", key: "funeralPreferences" },
	{ id: 3, title: "Prière funéraire", key: "janazaPreferences" },
	{ id: 4, title: "Préférences d'enterrement", key: "burialPreferences" },
	{ id: 5, title: "Dettes et obligations", key: "debts" },
	{ id: 6, title: "Biens et actifs", key: "assets" },
	{ id: 7, title: "Supplication finale", key: "finalSupplication" },
	{ id: 8, title: "Révision et téléchargement", key: "preview" },
] as const;

export const DEBT_TYPES = {
	loan: "Prêt / Emprunt",
	unpaidZakat: "Zakat impayée",
	hajj: "Hajj non effectué",
	other: "Autre",
} as const;

export const ASSET_TYPES = {
	property: "Bien immobilier",
	vehicle: "Véhicule",
	savings: "Épargne / Compte bancaire",
	business: "Entreprise / Commerce",
	other: "Autre",
} as const;

export const GRAVE_SITE_TYPES = {
	family: "Caveau familial",
	new: "Nouvel emplacement",
	specific: "Emplacement spécifique",
} as const;

export const DEFAULT_RELIGIOUS_DECLARATIONS = [
	{
		id: "1",
		text: "J'atteste qu'il n'y a de divinité digne d'adoration qu'Allah et que Muhammad est Son Messager",
		isSelected: true,
		category: "shahada" as const,
	},
	{
		id: "2",
		text: "Je crois en Allah, en Ses anges, en Ses livres, en Ses messagers, au Jour Dernier et au destin",
		isSelected: true,
		category: "faith" as const,
	},
	{
		id: "3",
		text: "Je demande à Allah de me pardonner mes péchés et d'accepter mes bonnes œuvres",
		isSelected: true,
		category: "other" as const,
	},
	{
		id: "4",
		text: "Je demande pardon à tous ceux que j'ai pu offenser ou léser",
		isSelected: true,
		category: "other" as const,
	},
	{
		id: "5",
		text: "Je pardonne à tous ceux qui m'ont offensé ou lésé",
		isSelected: true,
		category: "other" as const,
	},
];

export const DEFAULT_SUPPLICATIONS = [
	"Ô Allah, pardonne-moi, fais-moi miséricorde et fais-moi rejoindre la plus haute compagnie.",
	"Ô Allah, je témoigne qu'il n'y a de divinité digne d'adoration que Toi. Pardonne mes péchés car nul ne pardonne les péchés si ce n'est Toi.",
	"Ô Allah, aide ma famille et mes proches à supporter mon absence et accorde-leur patience et consolation.",
];

// Quranic verses and Hadiths
export const ISLAMIC_QUOTES = {
	will: {
		verse: "Il vous est prescrit, quand la mort est proche de l'un de vous et s'il laisse des biens, de faire un testament en faveur de ses père et mère et de ses proches, conformément à l'usage. C'est un devoir pour les pieux.",
		reference: "Sourate Al-Baqara (2:180)",
	},
	death: {
		hadith: "Tout musulman possédant des biens à léguer a le devoir de ne pas laisser passer deux nuits sans avoir rédigé son testament.",
		reference: "Sahih al-Bukhari",
	},
	debt: {
		hadith: "L'âme du croyant reste suspendue à sa dette jusqu'à ce qu'elle soit payée.",
		reference: "Hadith authentique",
	},
};
