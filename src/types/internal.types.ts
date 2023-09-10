export interface CTATrainTimes {
	/**  yyyyMMdd HH:mm:ss format local to CHI */
	timePredictionGenerated: string;
	errorCode: string;
	errorDescription: any;
	etaList: TrainEta[];
}

export interface TrainEta {
	stationId: string;
	stopId: string;
	stationName: string;
	platformName: string;
	trainRunNumber: number;
	abbreviatedRouteName: string;
	destinationStationId: string;
	destinationStationName: string;
	trainDirectionCode: string;
	/**  yyyyMMdd HH:mm:ss format local to CHI */
	timePredictionGenerated: string;
	/**  yyyyMMdd HH:mm:ss format local to CHI */
	arrivalTime: string;
	/**  if train is approaching or "Due" */
	isApproaching: boolean;
	/**  if this is using */
	isBasedOnSchedule: boolean;
	/**  if the train is considered delayed */
	isDelayed: boolean;
	/**  if fault has been detected, no idea what this is, description has a broken link */
	hasFault: boolean;
	latitude?: number;
	longitude?: number;
	/**  what directional degree the train is heading */
	directionDegree?: number;
}
