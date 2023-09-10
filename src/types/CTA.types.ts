export interface ArrivalsResponse {
	ctatt: Ctatt;
}

export interface Ctatt {
	tmst: string;
	errCd: string;
	errNm: any;
	eta: Eum[];
}

export interface Eum {
	staId: string;
	stpId: string;
	staNm: string;
	stpDe: string;
	rn: string;
	rt: string;
	destSt: string;
	destNm: string;
	trDr: string;
	prdt: string;
	arrT: string;
	isApp: string;
	isSch: string;
	isDly: string;
	isFlt: string;
	flags: any;
	lat?: string;
	lon?: string;
	heading?: string;
}
