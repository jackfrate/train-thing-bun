import { Ctatt, Eum } from "./CTA.types";
import { CTATrainTimes, TrainEta } from "./internal.types";

export function makeTrainTimesTypeNotSuck(trainTimes: Ctatt): CTATrainTimes {
	const betterTrainTimes: Partial<CTATrainTimes> = {};

	const betterEtas = trainTimes.eta.map(makeEtaTypeNotSuck);
	betterTrainTimes.etaList = betterEtas;

	betterTrainTimes.errorCode = trainTimes.errCd;
	betterTrainTimes.errorDescription = trainTimes.errNm;
	betterTrainTimes.timePredictionGenerated = trainTimes.tmst;

	// we got all the keys we need, so this cast is 100% valid
	return betterTrainTimes as CTATrainTimes;
}

export function makeEtaTypeNotSuck(eta: Eum): TrainEta {
	// doing a loop over entries would be nice, but would not catch
	// the cases where we have to convert types
	// going the manual way here :(

	const betterEtaType = {} as Partial<TrainEta>;

	betterEtaType.stationId = eta.staId;
	betterEtaType.stopId = eta.stpId;
	betterEtaType.stationName = eta.staNm;
	betterEtaType.platformName = eta.stpDe;
	betterEtaType.trainRunNumber = Number(eta.rn);
	betterEtaType.abbreviatedRouteName = eta.rt;
	betterEtaType.destinationStationId = eta.destSt;
	betterEtaType.destinationStationName = eta.destNm;
	betterEtaType.trainDirectionCode = eta.trDr;
	betterEtaType.timePredictionGenerated = eta.prdt;
	betterEtaType.arrivalTime = eta.arrT;
	betterEtaType.isApproaching = eta.isApp === "1";
	betterEtaType.isBasedOnSchedule = eta.isSch === "1";
	betterEtaType.isDelayed = eta.isDly === "1";
	betterEtaType.hasFault = eta.isFlt === "1";
	betterEtaType.latitude = eta.lat ? Number(eta.lat) : undefined;
	betterEtaType.longitude = eta.lon ? Number(eta.lon) : undefined;
	betterEtaType.directionDegree = eta.heading
		? Number(eta.heading)
		: undefined;

	// we got all the keys we need, so this cast is 100% valid
	return betterEtaType as TrainEta;
}
