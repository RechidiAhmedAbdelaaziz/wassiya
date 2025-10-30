import { jsPDF } from "jspdf";
import type { WillData } from "../types/will";

export const generateWillPDF = (willData: Partial<WillData>): void => {
	const doc = new jsPDF();
	let yPosition = 20;
	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	const margin = 20;
	const contentWidth = pageWidth - 2 * margin;

	// Helper function to check if we need a new page
	const checkNewPage = (requiredSpace: number = 20) => {
		if (yPosition + requiredSpace > pageHeight - 30) {
			doc.addPage();
			yPosition = 20;
			return true;
		}
		return false;
	};

	// Helper function to add text with word wrap
	const addText = (
		text: string,
		fontSize: number = 11,
		isBold: boolean = false,
		align: "left" | "center" | "right" = "left"
	) => {
		doc.setFontSize(fontSize);
		doc.setFont("helvetica", isBold ? "bold" : "normal");
		doc.setTextColor(0, 0, 0);

		const lines = doc.splitTextToSize(text, contentWidth);
		lines.forEach((line: string) => {
			checkNewPage();
			if (align === "center") {
				doc.text(line, pageWidth / 2, yPosition, { align: "center" });
			} else if (align === "right") {
				doc.text(line, pageWidth - margin, yPosition, { align: "right" });
			} else {
				doc.text(line, margin, yPosition);
			}
			yPosition += fontSize * 0.45;
		});
		yPosition += 3;
	};

	// Helper function to add a section title
	const addSection = (title: string) => {
		checkNewPage(25);
		yPosition += 6;
		doc.setFillColor(220, 38, 38); // Primary red color
		doc.rect(margin, yPosition - 5, contentWidth, 8, "F");
		doc.setTextColor(255, 255, 255);
		doc.setFontSize(12);
		doc.setFont("helvetica", "bold");
		doc.text(title, margin + 3, yPosition);
		yPosition += 10;
		doc.setTextColor(0, 0, 0);
	};

	// ===== DOCUMENT HEADER =====
	doc.setFillColor(220, 38, 38);
	doc.rect(0, 0, pageWidth, 40, "F");

	doc.setTextColor(255, 255, 255);
	doc.setFontSize(22);
	doc.setFont("helvetica", "bold");
	doc.text("TESTAMENT ISLAMIQUE", pageWidth / 2, 18, { align: "center" });
	doc.setFontSize(14);
	doc.text("(WASSIYA)", pageWidth / 2, 28, { align: "center" });

	yPosition = 50;

	// Date
	const dateCreated = willData.dateCreated
		? new Date(willData.dateCreated).toLocaleDateString("fr-FR", {
				day: "numeric",
				month: "long",
				year: "numeric",
		  })
		: new Date().toLocaleDateString("fr-FR", {
				day: "numeric",
				month: "long",
				year: "numeric",
		  });
	doc.setTextColor(100, 100, 100);
	doc.setFontSize(10);
	doc.text(`Document créé le ${dateCreated}`, pageWidth - margin, yPosition, { align: "right" });
	yPosition += 15;

	// ===== PERSONAL INFORMATION =====
	if (willData.personalInfo) {
		addSection("INFORMATIONS PERSONNELLES");
		const pi = willData.personalInfo;

		if (pi.firstName && pi.lastName) {
			addText(`Je soussigné(e), ${pi.firstName} ${pi.lastName},`, 11, true);
		}

		if (pi.birthDate && pi.birthCity && pi.birthCountry) {
			const birthDateFormatted = new Date(pi.birthDate).toLocaleDateString("fr-FR", {
				day: "numeric",
				month: "long",
				year: "numeric",
			});
			addText(`Né(e) le ${birthDateFormatted} à ${pi.birthCity}, ${pi.birthCountry}`);
		}

		if (pi.fatherFirstName || pi.fatherLastName || pi.motherFirstName || pi.motherLastName) {
			const fatherName = [pi.fatherFirstName, pi.fatherLastName].filter(Boolean).join(" ");
			const motherName = [pi.motherFirstName, pi.motherLastName].filter(Boolean).join(" ");

			if (fatherName && motherName) {
				addText(`Fils/Fille de ${fatherName} et ${motherName}`);
			} else if (fatherName) {
				addText(`Fils/Fille de ${fatherName}`);
			} else if (motherName) {
				addText(`Fils/Fille de ${motherName}`);
			}
		}

		yPosition += 3;
	}

	// ===== RELIGIOUS DECLARATIONS =====
	if (willData.religiousDeclarations && willData.religiousDeclarations.length > 0) {
		const selectedDeclarations = willData.religiousDeclarations.filter((d) => d.isSelected);
		if (selectedDeclarations.length > 0) {
			addSection("DÉCLARATIONS RELIGIEUSES");
			addText("Je déclare solennellement :", 11, true);
			yPosition += 2;
			selectedDeclarations.forEach((decl) => {
				checkNewPage(15);
				doc.setFontSize(10);
				doc.setFont("helvetica", "normal");
				doc.text("•", margin + 2, yPosition);
				const lines = doc.splitTextToSize(decl.text, contentWidth - 8);
				lines.forEach((line: string, index: number) => {
					doc.text(line, margin + 8, yPosition);
					if (index < lines.length - 1) {
						yPosition += 5;
						checkNewPage();
					}
				});
				yPosition += 8;
			});
		}
	}

	// ===== FUNERAL PREFERENCES =====
	if (willData.funeralPreferences) {
		const fp = willData.funeralPreferences;
		if (fp.washedBy || fp.washedByContact) {
			addSection("PRÉFÉRENCES POUR LA PRÉPARATION FUNÉRAIRE");
			addText("Conformément à la tradition islamique, je demande que :");
			yPosition += 2;
			if (fp.washedBy) {
				addText(`Personne désignée pour le lavage mortuaire : ${fp.washedBy}`, 11, true);
				if (fp.washedByContact) {
					addText(`Coordonnées : ${fp.washedByContact}`, 10);
				}
			}
			yPosition += 3;
		}
	}

	// ===== JANAZA PREFERENCES =====
	if (willData.janazaPreferences) {
		const jp = willData.janazaPreferences;
		if (jp.janazaLeader || jp.janazaLeaderContact) {
			addSection("PRIÈRE FUNÉRAIRE (SALAT AL-JANAZA)");
			if (jp.janazaLeader) {
				addText(`Imam ou guide spirituel préféré : ${jp.janazaLeader}`, 11, true);
				if (jp.janazaLeaderContact) {
					addText(`Coordonnées : ${jp.janazaLeaderContact}`, 10);
				}
			}
			yPosition += 3;
		}
	}

	// ===== BURIAL PREFERENCES =====
	if (willData.burialPreferences) {
		const bp = willData.burialPreferences;
		if (bp.preferredCemetery || bp.preferredLocation || bp.graveSite || bp.customRequests) {
			addSection("PRÉFÉRENCES D'ENTERREMENT");

			if (bp.preferredCemetery) {
				addText(`Cimetière préféré : ${bp.preferredCemetery}`, 11, true);
			}
			if (bp.preferredLocation) {
				addText(`Emplacement souhaité : ${bp.preferredLocation}`);
			}
			if (bp.graveSite) {
				const siteLabels = {
					family: "Caveau familial existant",
					new: "Nouvel emplacement",
					specific: "Emplacement spécifique",
				};
				addText(`Type de sépulture : ${siteLabels[bp.graveSite]}`);
			}
			if (bp.customRequests) {
				addText(`Demandes particulières :`, 11, true);
				addText(bp.customRequests);
			}
			yPosition += 3;
		}
	}

	// ===== DEBTS =====
	if (willData.debts && willData.debts.length > 0) {
		addSection("DETTES ET OBLIGATIONS");
		addText(
			"Conformément à la loi islamique, je demande que les dettes suivantes soient réglées en priorité avant la distribution de mon héritage :",
			10
		);
		yPosition += 3;

		willData.debts.forEach((debt, index) => {
			checkNewPage(20);
			addText(`${index + 1}. ${debt.description}`, 11, true);
			if (debt.amount) {
				addText(`   Montant : ${debt.amount.toLocaleString("fr-FR")} €`);
			}
			if (debt.creditor) {
				addText(`   Créancier : ${debt.creditor}`);
			}
			if (debt.notes) {
				addText(`   Notes : ${debt.notes}`, 9);
			}
			yPosition += 2;
		});
		yPosition += 3;
	}

	// ===== ASSETS =====
	if (willData.assets && willData.assets.length > 0) {
		addSection("BIENS ET ACTIFS");
		addText("Pour information, voici mes principaux biens et actifs :", 10);
		yPosition += 3;

		willData.assets.forEach((asset, index) => {
			checkNewPage(20);
			addText(`${index + 1}. ${asset.description}`, 11, true);
			if (asset.estimatedValue) {
				addText(`   Valeur estimée : ${asset.estimatedValue.toLocaleString("fr-FR")} €`);
			}
			if (asset.location) {
				addText(`   Localisation : ${asset.location}`);
			}
			if (asset.notes) {
				addText(`   Notes : ${asset.notes}`, 9);
			}
			yPosition += 2;
		});
		yPosition += 3;
	}

	// ===== FINAL SUPPLICATION =====
	if (willData.finalSupplication && willData.finalSupplication.trim()) {
		addSection("MESSAGE ET SUPPLICATIONS FINALES");
		addText(willData.finalSupplication, 10);
		yPosition += 5;
	}

	// ===== SIGNATURE SECTION =====
	checkNewPage(60);
	addSection("SIGNATURES ET TÉMOINS");
	yPosition += 5;

	addText("Fait à _____________________________, le _____________________________", 11);
	yPosition += 15;

	addText("Signature du testateur :", 11, true);
	yPosition += 20;

	addText("Témoins (requis pour la validité islamique) :", 11, true);
	yPosition += 10;

	addText("1. Nom et prénom : ____________________________");
	yPosition += 5;
	addText("   Signature : ____________________________");
	yPosition += 10;

	addText("2. Nom et prénom : ____________________________");
	yPosition += 5;
	addText("   Signature : ____________________________");
	yPosition += 15;

	// ===== ISLAMIC NOTE =====
	checkNewPage(30);
	doc.setFillColor(250, 250, 250);
	const noteHeight = 25;
	doc.rect(margin, yPosition - 3, contentWidth, noteHeight, "F");
	doc.setDrawColor(220, 38, 38);
	doc.setLineWidth(0.5);
	doc.rect(margin, yPosition - 3, contentWidth, noteHeight);

	doc.setFontSize(9);
	doc.setTextColor(60, 60, 60);
	doc.setFont("helvetica", "italic");
	yPosition += 3;
	addText(
		"Note islamique : Ce testament (wassiya) doit respecter les limites imposées par la Charia. Les legs testamentaires (wassiya) ne peuvent excéder un tiers (1/3) de la succession après règlement des dettes. Les héritiers légaux conservent leurs parts prescrites par le Coran.",
		8
	);

	// ===== FOOTER =====
	const footerY = pageHeight - 15;
	doc.setFontSize(8);
	doc.setTextColor(100, 100, 100);
	doc.setFont("helvetica", "normal");
	doc.text(
		"Document généré par Wassiya.fr - Testament Islamique en ligne",
		pageWidth / 2,
		footerY,
		{
			align: "center",
		}
	);
	doc.text(`Page ${doc.getCurrentPageInfo().pageNumber}`, pageWidth - margin, footerY, {
		align: "right",
	});

	// ===== SAVE PDF =====
	const fileName = `Testament_Islamique_${willData.personalInfo?.lastName || "Wassiya"}_${
		new Date().toISOString().split("T")[0]
	}.pdf`;
	doc.save(fileName);
};
