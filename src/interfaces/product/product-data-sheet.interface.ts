import { DataSheet } from "../data-sheet/data-sheet.interface";

export interface ProductDataSheet {
	id: number;
	title: string;
	dataSheetId: number;
	dataSheet?: DataSheet;
	isActive: boolean;
}