$.response.contentType = 'application/json';
var output = {};
var permitNumber = $.request.parameters.get("permitNumber");
var conn = $.db.getConnection();

// function decodeReqData(value){
//	 if (value) {
//		 var updateValue = decodeURIComponent(value);
////		 updateValue.split("'")[1]
//		 return updateValue;
//	}
//	 return value;
// }
 
var TOJSAHEADER = conn.prepareStatement(' select distinct PERMITNUMBER, JSAPERMITNUMBER,HASCWP,HASHWP,HASCSE,TASKDESCRIPTION,IDENTIFYMOSTSERIOUSPOTENTIALINJURY,ISACTIVE,STATUS from "IOP"."JSAHEADER" where PERMITNUMBER = ?');
TOJSAHEADER.setString(1, permitNumber);
var rs = TOJSAHEADER.executeQuery();
var res=[];
while (rs.next()) {
	output={};
	   output.permitNumber = rs.getInteger(1);
	   output.jsapermitNumber = rs.getString(2);
	   output.hasCWP = rs.getInteger(3);
	   output.hasHWP= rs.getInteger(4);
	   output.hasCSE= rs.getInteger(5);
	   output.taskDescription= rs.getString(6);
	   output.identifyMostSeriousPotentialInjury= rs.getString(7);
	   output.isActive= rs.getInteger(8);
	   output.status= rs.getString(9);
}

var permitNo = output.permitNumber;

var TOJSAREVIEW = conn.prepareStatement(' select distinct PERMITNUMBER, CREATEDBY,CREATEDDATE,APPROVEDBY,APPROVEDDATE,LASTUPDATEDBY,LASTUPDATEDDATE from "IOP"."JSAREVIEW" where PERMITNUMBER = ?');
TOJSAREVIEW.setInteger(1, permitNo);
var rs = TOJSAREVIEW.executeQuery();
var viewOutput={};
while (rs.next()) {
	viewOutput={};
	viewOutput.permitNumber = rs.getInteger(1);
	viewOutput.createdBy = rs.getString(2);
	viewOutput.createdDate = rs.getString(3).split('.')[0];
	viewOutput.approvedBy= rs.getString(4);
	viewOutput.approvedDate= rs.getString(5).split('.')[0];
	viewOutput.lastUpdatedBy= rs.getString(6);
	viewOutput.lastUpdatedDate= rs.getString(7).split('.')[0];
}

var TOJSARISKASS = conn.prepareStatement(' select distinct PERMITNUMBER, MUSTMODIFYEXISTINGWORKPRACTICE,HASCONTINUEDRISK from "IOP"."JSARISKASSESMENT" where PERMITNUMBER = ?');
TOJSARISKASS.setInteger(1, permitNo);
var rs = TOJSARISKASS.executeQuery();
var sariskassOutput={};
while (rs.next()) {
	sariskassOutput={};
	sariskassOutput.permitNumber = rs.getInteger(1);
	sariskassOutput.mustModifyExistingWorkPractice = rs.getInteger(2);
	sariskassOutput.hasContinuedRisk = rs.getInteger(3);
}
var TOJSE_PPE = conn.prepareStatement(' select distinct PERMITNUMBER, HARDHAT,SAFETYBOOT,GOGGLES,FACESHIELD,SAFETYGLASSES,SINGLEEAR,DOUBLEEARS,RESPIRATORTYPEDESCRIPTION,NEEDSCBA,NEEDDUSTMASK,COTTONGLOVE,LEATHERGLOVE,IMPACTPROTECTION,GLOVEDESCRIPTION,CHEMICALGLOVEDESCRIPTION,FALLPROTECTION,FALLRESTRAINT,CHEMICALSUIT,APRON,FLAMERESISTANTCLOTHING,OTHERPPEDESCRIPTION,NEEDFOULWEATHERGEAR,HAVECONSENTOFTASKLEADER,COMPANYOFTASKLEADER from "IOP"."JSA_PPE" where PERMITNUMBER = ?');
TOJSE_PPE.setInteger(1, permitNo);
var rs = TOJSE_PPE.executeQuery();
var ppeOutput={};
while (rs.next()) {
	ppeOutput={};
	ppeOutput.permitNumber = rs.getInteger(1);
	ppeOutput.hardHat = rs.getInteger(2);
	ppeOutput.safetyBoot = rs.getInteger(3);
	ppeOutput.goggles = rs.getInteger(4);
	ppeOutput.faceShield = rs.getInteger(5);
	ppeOutput.safetyGlasses = rs.getInteger(6);
	ppeOutput.singleEar = rs.getInteger(7);
	ppeOutput.doubleEars = rs.getInteger(8);
	ppeOutput.respiratorTypeDescription = rs.getString(9);
	ppeOutput.needSCBA = rs.getInteger(10);
	ppeOutput.needDustMask = rs.getInteger(11);
	ppeOutput.cottonGlove = rs.getInteger(12);
	ppeOutput.leatherGlove = rs.getInteger(13);
	ppeOutput.impactProtection = rs.getInteger(14);
	ppeOutput.gloveDescription = rs.getString(15);
	ppeOutput.chemicalGloveDescription = rs.getString(16);
	ppeOutput.fallProtection = rs.getInteger(17);
	ppeOutput.fallRestraint = rs.getInteger(18);
	ppeOutput.chemicalSuit = rs.getInteger(19);
	ppeOutput.apron = rs.getInteger(20);
	ppeOutput.flameResistantClothing = rs.getInteger(21);
	ppeOutput.otherPPEDescription = rs.getString(22);
	ppeOutput.needFoulWeatherGear = parseInt(rs.getString(23));
	ppeOutput.haveConsentOfTaskLeader = rs.getInteger(24);
	ppeOutput.companyOfTaskLeader = rs.getString(25);
}

var TOJSAHAZARDPRESS = conn.prepareStatement(' select distinct PERMITNUMBER, PRESURIZEDEQUIPMENT,PERFORMISOLATION,DEPRESSURIZEDRAIN,RELIEVETRAPPEDPRESSURE,DONOTWORKINLINEOFFIRE,ANTICIPATERESIDUAL,SECUREALLHOSES from "IOP"."JSAHAZARDSPRESSURIZED" where PERMITNUMBER = ?');
TOJSAHAZARDPRESS.setInteger(1, permitNo);
var rs = TOJSAHAZARDPRESS.executeQuery();
var hazPresrOutput={};
while (rs.next()) {
	hazPresrOutput={};
	hazPresrOutput.permitNumber = rs.getInteger(1);
	hazPresrOutput.presurizedEquipment = rs.getInteger(2);
	hazPresrOutput.performIsolation = rs.getInteger(3);
	hazPresrOutput.depressurizeDrain= rs.getInteger(4);
	hazPresrOutput.relieveTrappedPressure= rs.getInteger(5);
	hazPresrOutput.doNotWorkInLineOfFire= rs.getInteger(6);
	hazPresrOutput.anticipateResidual= rs.getInteger(7);
	hazPresrOutput.secureAllHoses= rs.getInteger(8);
}

var TOJSAHAZARDVISIBLE = conn.prepareStatement(' select distinct PERMITNUMBER, POORLIGHTING,PROVIDEALTERNATELIGHTING,WAITUNTILVISIBILITYIMPROVE,DEFERUNTILVISIBILITYIMPROVE,KNOWDISTANCEFROMPOLES from "IOP"."JSAHAZARDSVISIBILITY" where PERMITNUMBER = ?');
TOJSAHAZARDVISIBLE.setInteger(1, permitNo);
var rs = TOJSAHAZARDVISIBLE.executeQuery();
var visiOutput={};
while (rs.next()) {
	visiOutput={};
	visiOutput.permitNumber = rs.getInteger(1);
	visiOutput.poorLighting = rs.getInteger(2);
	visiOutput.provideAlternateLighting = rs.getInteger(3);
	visiOutput.waitUntilVisibilityImprove= rs.getInteger(4);
	visiOutput.deferUntilVisibilityImprove= rs.getInteger(5);
	visiOutput.knowDistanceFromPoles= rs.getInteger(6);
}

var TOJSAHAZARDPERSON = conn.prepareStatement(' select distinct PERMITNUMBER, PERSONNEL,PERFORMINDUCTION,MENTORCOACHSUPERVISE,VERIFYCOMPETENCIES,ADDRESSLIMITATIONS,MANAGELANGUAGEBARRIERS,WEARSEATBELTS from "IOP"."JSAHAZARDSPERSONNEL" where PERMITNUMBER = ?');
TOJSAHAZARDPERSON.setInteger(1, permitNo);
var rs = TOJSAHAZARDPERSON.executeQuery();
var persnOutput={};
while (rs.next()) {
	persnOutput={};
	persnOutput.permitNumber = rs.getInteger(1);
	persnOutput.personnel = rs.getInteger(2);
	persnOutput.performInduction = rs.getInteger(3);
	persnOutput.mentorCoachSupervise= rs.getInteger(4);
	persnOutput.verifyCompetencies= rs.getInteger(5);
	persnOutput.addressLimitations= rs.getInteger(6);
	persnOutput.manageLanguageBarriers= rs.getInteger(7);
	persnOutput.wearSeatBelts= rs.getInteger(8);
}
// ------------------------------ Need to Update the Select Query 
var TOJSAHAZARDCSE = conn.prepareStatement(' select distinct PERMITNUMBER, CONFINEDSPACEENTRY,DISCUSSWORKPRACTICE,CONDUCTATMOSPHERICTESTING,MONITORACCESS,PROTECTSURFACES,PROHIBITMOBILEENGINE,PROVIDEOBSERVER,DEVELOPRESCUEPLAN from "IOP"."JSAHAZARDSCSE" where PERMITNUMBER = ?');
TOJSAHAZARDCSE.setInteger(1, permitNo);
var rs = TOJSAHAZARDCSE.executeQuery();
var dcseOutput={};
while (rs.next()) {
	dcseOutput={};
	dcseOutput.permitNumber = rs.getInteger(1);
	dcseOutput.confinedSpaceEntry = rs.getInteger(2);
	dcseOutput.discussWorkPractice = rs.getInteger(3);
	dcseOutput.conductAtmosphericTesting= rs.getInteger(4);
	dcseOutput.monitorAccess= rs.getInteger(5);
	dcseOutput.protectSurfaces= rs.getInteger(6);
	dcseOutput.prohibitMobileEngine= rs.getInteger(7);
	dcseOutput.provideObserver= rs.getInteger(8);
	dcseOutput.developRescuePlan= rs.getInteger(9);
}

var TOJSAHAZARDSIMULTAN = conn.prepareStatement(' select distinct PERMITNUMBER, SIMULTANEOUSOPERATIONS,FOLLOWSIMOPSMATRIX,MOCREQUIREDFOR,INTERFACEBETWEENGROUPS,USEBARRIERSAND,HAVEPERMITSIGNED from "IOP"."JSAHAZARDSSIMULTANEOUS" where PERMITNUMBER = ?');
TOJSAHAZARDSIMULTAN.setInteger(1, permitNo);
var rs = TOJSAHAZARDSIMULTAN.executeQuery();
var simuOutput={};
while (rs.next()) {
	simuOutput={};
	simuOutput.permitNumber = rs.getInteger(1);
	simuOutput.simultaneousOperations = rs.getInteger(2);
	simuOutput.followSimopsMatrix = rs.getInteger(3);
	simuOutput.mocRequiredFor= rs.getInteger(4);
	simuOutput.interfaceBetweenGroups= rs.getInteger(5);
	simuOutput.useBarriersAnd= rs.getInteger(6);
	simuOutput.havePermitSigned= rs.getInteger(7);
}

var TOJSAHAZARDIGNITION = conn.prepareStatement(' select distinct PERMITNUMBER,IGNITIONSOURCES,REMOVECOMBUSTIBLEMATERIALS,PROVIDEFIREWATCH,IMPLEMENTABRASIVEBLASTINGCONTROLS,CONDUCTCONTINUOUSGASTESTING,EARTHFORSTATICELECTRICITY from "IOP"."JSAHAZARDSIGNITION" where PERMITNUMBER = ?');
TOJSAHAZARDIGNITION.setInteger(1, permitNo);
var rs = TOJSAHAZARDIGNITION.executeQuery();
var signOutput={};
while (rs.next()) {
	signOutput={};
	signOutput.permitNumber = rs.getInteger(1);
	signOutput.ignitionSources = rs.getInteger(2);
	signOutput.removeCombustibleMaterials = rs.getInteger(3);
	signOutput.provideFireWatch= rs.getInteger(4);
	signOutput.implementAbrasiveBlastingControls= rs.getInteger(5);
	signOutput.conductContinuousGasTesting= rs.getInteger(6);
	signOutput.earthForStaticElectricity= rs.getInteger(7);
}

var TOJSAHAZARDSUBS = conn.prepareStatement(' select distinct PERMITNUMBER, HAZARDOUSSUBSTANCES,DRAINEQUIPMENT,FOLLOWSDSCONTROLS,IMPLEMENTHEALTHHAZARDCONTROLS,TESTMATERIAL from "IOP"."JSAHAZARDSSUBSTANCES" where PERMITNUMBER = ?');
TOJSAHAZARDSUBS.setInteger(1, permitNo);
var rs = TOJSAHAZARDSUBS.executeQuery();
var subsOutput={};
while (rs.next()) {
	subsOutput={};
	subsOutput.permitNumber = rs.getInteger(1);
	subsOutput.hazardousSubstances = rs.getInteger(2);
	subsOutput.drainEquipment = rs.getInteger(3);
	subsOutput.followSdsControls= rs.getInteger(4);
	subsOutput.implementHealthHazardControls= rs.getInteger(5);
	subsOutput.testMaterial= rs.getInteger(6);
}

var TOJSAHAZARDSPILL = conn.prepareStatement(' select distinct PERMITNUMBER, POTENTIALSPILLS,DRAINEQUIPMENT,CONNECTIONSINGOODCONDITION,SPILLCONTAINMENTEQUIPMENT,HAVESPILLCLEANUPMATERIALS,RESTRAINHOSESWHENNOTINUSE from "IOP"."JSAHAZARDSSPILLS" where PERMITNUMBER = ?');
TOJSAHAZARDSPILL.setInteger(1, permitNo);
var rs = TOJSAHAZARDSPILL.executeQuery();
var pillOutput={};
while (rs.next()) {
	pillOutput={};
	pillOutput.permitNumber = rs.getInteger(1);
	pillOutput.potentialSpills = rs.getInteger(2);
	pillOutput.drainEquipment = rs.getInteger(3);
	pillOutput.connectionsInGoodCondition= rs.getInteger(4);
	pillOutput.spillContainmentEquipment= rs.getInteger(5);
	pillOutput.haveSpillCleanupMaterials= rs.getInteger(6);
	pillOutput.restrainHosesWhenNotInUse= rs.getInteger(7);
}

var TOJSAHAZARDWEATHER = conn.prepareStatement(' select distinct PERMITNUMBER, WEATHER,CONTROLSFORSLIPPERYSURFACE,HEATBREAK,COLDHEATERS,LIGHTNING from "IOP"."JSAHAZARDSWEATHER" where PERMITNUMBER = ?');
TOJSAHAZARDWEATHER.setInteger(1, permitNo);
var rs = TOJSAHAZARDWEATHER.executeQuery();
var wtherOutput={};
while (rs.next()) {
	wtherOutput={};
	wtherOutput.permitNumber = rs.getInteger(1);
	wtherOutput.weather = rs.getInteger(2);
	wtherOutput.controlsForSlipperySurface = rs.getInteger(3);
	wtherOutput.heatBreak= rs.getInteger(4);
	wtherOutput.coldHeaters= rs.getInteger(5);
	wtherOutput.lightning= rs.getInteger(6);
}

var TOJSAHAZARDNOISE = conn.prepareStatement(' select distinct PERMITNUMBER, HIGHNOISE,WEARCORRECTHEARING,MANAGEEXPOSURETIMES,SHUTDOWNEQUIPMENT,USEQUIETTOOLS,SOUNDBARRIERS,PROVIDESUITABLECOMMS from "IOP"."JSAHAZARDSHIGHNOISE" where PERMITNUMBER = ?');
TOJSAHAZARDNOISE.setInteger(1, permitNo);
var rs = TOJSAHAZARDNOISE.executeQuery();
var noiseOutput={};
while (rs.next()) {
	noiseOutput={};
	noiseOutput.permitNumber = rs.getInteger(1);
	noiseOutput.highNoise = rs.getInteger(2);
	noiseOutput.wearCorrectHearing = rs.getInteger(3);
	noiseOutput.manageExposureTimes= rs.getInteger(4);
	noiseOutput.shutDownEquipment= rs.getInteger(5);
	noiseOutput.useQuietTools= rs.getInteger(6);
	noiseOutput.soundBarriers= rs.getInteger(7);
	noiseOutput.provideSuitableComms= rs.getInteger(8);
}

var TOJSAHAZARDDROPPED = conn.prepareStatement(' select distinct PERMITNUMBER, DROPPEDOBJECTS,MARKRESTRICTENTRY,USELIFTINGEQUIPMENTTORAISE,SECURETOOLS from "IOP"."JSAHAZARDSDROPPED" where PERMITNUMBER = ?');
TOJSAHAZARDDROPPED.setInteger(1, permitNo);
var rs = TOJSAHAZARDDROPPED.executeQuery();
var dropedOutput={};
while (rs.next()) {
	dropedOutput={};
	dropedOutput.permitNumber = rs.getInteger(1);
	dropedOutput.droppedObjects = rs.getInteger(2);
	dropedOutput.markRestrictEntry = rs.getInteger(3);
	dropedOutput.useLiftingEquipmentToRaise= rs.getInteger(4);
	dropedOutput.secureTools= rs.getInteger(5);
}

var TOJSAHAZARDLIFT = conn.prepareStatement(' select distinct PERMITNUMBER, LIFTINGEQUIPMENT,CONFIRMEQUIPMENTCONDITION,OBTAINAPPROVALFORLIFTS,HAVEDOCUMENTEDLIFTPLAN from "IOP"."JSAHAZARDSLIFTING" where PERMITNUMBER = ?');
TOJSAHAZARDLIFT.setInteger(1, permitNo);
var rs = TOJSAHAZARDLIFT.executeQuery();
var liftOutput={};
while (rs.next()) {
	liftOutput={};
	liftOutput.permitNumber = rs.getInteger(1);
	liftOutput.liftingEquipment = rs.getInteger(2);
	liftOutput.confirmEquipmentCondition = rs.getInteger(3);
	liftOutput.obtainApprovalForLifts= rs.getInteger(4);
	liftOutput.haveDocumentedLiftPlan= rs.getInteger(5);
}

var TOJSAHAZARDHEIGHT = conn.prepareStatement(' select distinct PERMITNUMBER, WORKATHEIGHTS,DISCUSSWORKINGPRACTICE,VERIFYFALLRESTRAINT,USEFULLBODYHARNESS,USELOCKTYPESNAPHOOOKS from "IOP"."JSAHAZARDSHEIGHTS" where PERMITNUMBER = ?');
TOJSAHAZARDHEIGHT.setInteger(1, permitNo);
var rs = TOJSAHAZARDHEIGHT.executeQuery();
var hightOutput={};
while (rs.next()) {
	hightOutput={};
	hightOutput.permitNumber = rs.getInteger(1);
	hightOutput.workAtHeights = rs.getInteger(2);
	hightOutput.discussWorkingPractice = rs.getInteger(3);
	hightOutput.verifyFallRestraint= rs.getInteger(4);
	hightOutput.useFullBodyHarness= rs.getInteger(5);
	hightOutput.useLockTypeSnaphoooks= rs.getInteger(6);
}

var TOJSAHAZARDELECTRICAL = conn.prepareStatement(' select distinct PERMITNUMBER, PORTABLEELECTRICALEQUIPMENT,INSPECTTOOLSFORCONDITION,IMPLEMENTGASTESTING,PROTECTELECTRICALLEADS,IDENTIFYEQUIPCLASSIFICATION from "IOP"."JSAHAZARDSELECTRICAL" where PERMITNUMBER = ?');
TOJSAHAZARDELECTRICAL.setInteger(1, permitNo);
var rs = TOJSAHAZARDELECTRICAL.executeQuery();
var elctricalOutput={};
while (rs.next()) {
	elctricalOutput={};
	elctricalOutput.permitNumber = rs.getInteger(1);
	elctricalOutput.portableElectricalEquipment = rs.getInteger(2);
	elctricalOutput.inspectToolsForCondition = rs.getInteger(3);
	elctricalOutput.implementGasTesting= rs.getInteger(4);
	elctricalOutput.protectElectricalLeads= rs.getInteger(5);
	elctricalOutput.identifyEquipClassification= rs.getInteger(6);
}

var TOJSAHAZARDMOVING = conn.prepareStatement(' select distinct PERMITNUMBER, MOVINGEQUIPMENT,CONFIRMMACHINERYINTEGRITY,PROVIDEPROTECTIVEBARRIERS,OBSERVERTOMONITORPROXIMITYPEOPLEANDEQUIPMENT,LOCKOUTEQUIPMENT,DONOTWORKINLINEOFFIRE from "IOP"."JSAHAZARDSMOVING" where PERMITNUMBER = ?');
TOJSAHAZARDMOVING.setInteger(1, permitNo);
var rs = TOJSAHAZARDMOVING.executeQuery();
var movOutput={};
while (rs.next()) {
	movOutput={};
	movOutput.permitNumber = rs.getInteger(1);
	movOutput.movingEquipment = rs.getInteger(2);
	movOutput.confirmMachineryIntegrity = rs.getInteger(3);
	movOutput.provideProtectiveBarriers= rs.getInteger(4);
	movOutput.observerToMonitorProximityPeopleAndEquipment= rs.getInteger(5);
	movOutput.lockOutEquipment= rs.getInteger(6);
	movOutput.doNotWorkInLineOfFire= rs.getInteger(7);
}

//-------------------------- need to update the Query----------------------------
var TOJSAHAZARDMANUAL = conn.prepareStatement(' select distinct PERMITNUMBER, MANUALHANDLING,ASSESSMANUALTASK,LIMITLOADSIZE,PROPERLIFTINGTECHNIQUE,CONFIRMSTABILITYOFLOAD,GETASSISTANCEORAID from "IOP"."JSAHAZARDSMANUAL" where PERMITNUMBER = ?');
TOJSAHAZARDMANUAL.setInteger(1, permitNo);
var rs = TOJSAHAZARDMANUAL.executeQuery();
var manuOutput={};
while (rs.next()) {
	manuOutput={};
	manuOutput.permitNumber = rs.getInteger(1);
	manuOutput.manualHandling = rs.getInteger(2);
	manuOutput.assessManualTask = rs.getInteger(3);
	manuOutput.limitLoadSize= rs.getInteger(4);
	manuOutput.properLiftingTechnique= rs.getInteger(5);
	manuOutput.confirmStabilityOfLoad= rs.getInteger(6);
	manuOutput.getAssistanceOrAid= rs.getInteger(7);
}


var TOJSAHAZARDTOOLS = conn.prepareStatement(' select distinct PERMITNUMBER, EQUIPMENTANDTOOLS,INSPECTEQUIPMENTTOOL,BRASSTOOLSNECESSARY,USEPROTECTIVEGUARDS,USECORRECTTOOLS,CHECKFORSHARPEDGES,APPLYHANDSAFETYPRINCIPLE from "IOP"."JSAHAZARDSTOOLS" where PERMITNUMBER = ?');
TOJSAHAZARDTOOLS.setInteger(1, permitNo);
var rs = TOJSAHAZARDTOOLS.executeQuery();
var toolOutput={};
while (rs.next()) {
	toolOutput={};
	toolOutput.permitNumber = rs.getInteger(1);
	toolOutput.EquipmentAndTools = rs.getInteger(2);
	toolOutput.inspectEquipmentTool = rs.getInteger(3);
	toolOutput.brassToolsNecessary= rs.getInteger(4);
	toolOutput.useProtectiveGuards= rs.getInteger(5);
	toolOutput.useCorrectTools= rs.getInteger(6);
	toolOutput.checkForSharpEdges= rs.getInteger(7);
	toolOutput.applyHandSafetyPrinciple= rs.getInteger(8);
}

var TOJSAHAZARDFALLS = conn.prepareStatement(' select distinct PERMITNUMBER, SLIPSTRIPSANDFALLS,IDENTIFYPROJECTIONS,FLAGHAZARDS,SECURECABLES,CLEANUPLIQUIDS,BARRICADEHOLES from "IOP"."JSAHAZARDSFALLS" where PERMITNUMBER = ?');
TOJSAHAZARDFALLS.setInteger(1, permitNo);
var rs = TOJSAHAZARDFALLS.executeQuery();
var fallOutput={};
while (rs.next()) {
	fallOutput={};
	fallOutput.permitNumber = rs.getInteger(1);
	fallOutput.slipsTripsAndFalls = rs.getInteger(2);
	fallOutput.identifyProjections = rs.getInteger(3);
	fallOutput.flagHazards= rs.getInteger(4);
	fallOutput.secureCables= rs.getInteger(5);
	fallOutput.cleanUpLiquids= rs.getInteger(6);
	fallOutput.barricadeHoles= rs.getInteger(7);
}

var TOJSAHAZARDVOLTAGE = conn.prepareStatement(' select distinct PERMITNUMBER, HIGHVOLTAGE,RESTRICTACCESS,DISCHARGEEQUIPMENT,OBSERVESAFEWORKDISTANCE,USEFLASHBURN,USEINSULATEDGLOVES from "IOP"."JSAHAZARDSVOLTAGE" where PERMITNUMBER = ?');
TOJSAHAZARDVOLTAGE.setInteger(1, permitNo);
var rs = TOJSAHAZARDVOLTAGE.executeQuery();
var volOutput={};
while (rs.next()) {
	volOutput={};
	volOutput.permitNumber = rs.getInteger(1);
	volOutput.highVoltage = rs.getInteger(2);
	volOutput.restrictAccess = rs.getInteger(3);
	volOutput.dischargeEquipment= rs.getInteger(4);
	volOutput.observeSafeWorkDistance= rs.getInteger(5);
	volOutput.useFlashBurn= rs.getInteger(6);
	volOutput.useInsulatedGloves= rs.getInteger(7);
}

var TOJSAHAZARDEXCAVATION = conn.prepareStatement(' select distinct PERMITNUMBER, EXCAVATIONS,HAVEEXCAVATIONPLAN,LOCATEPIPESBYHANDDIGGING,DEENERGIZEUNDERGROUND,CSECONTROLS from "IOP"."JSAHAZARDSEXCAVATION" where PERMITNUMBER = ?');
TOJSAHAZARDEXCAVATION.setInteger(1, permitNo);
var rs = TOJSAHAZARDEXCAVATION.executeQuery();
var vacOutput={};
while (rs.next()) {
	vacOutput={};
	vacOutput.permitNumber = rs.getInteger(1);
	vacOutput.excavations = rs.getInteger(2);
	vacOutput.haveExcavationPlan = rs.getInteger(3);
	vacOutput.locatePipesByHandDigging= rs.getInteger(4);
	vacOutput.deEnergizeUnderground= rs.getInteger(5);
	vacOutput.cseControls= rs.getInteger(6);
}

var TOJSAHAZARDMOBILE = conn.prepareStatement(' select distinct PERMITNUMBER, MOBILEEQUIPMENT,ASSESSEQUIPMENTCONDITION,CONTROLACCESS,MONITORPROXIMITY,MANAGEOVERHEADHAZARDS,ADHERETORULES from "IOP"."JSAHAZARDSMOBILE" where PERMITNUMBER = ?');
TOJSAHAZARDMOBILE.setInteger(1, permitNo);
var rs = TOJSAHAZARDMOBILE.executeQuery();
var mobOutput={};
while (rs.next()) {
	mobOutput={};
	mobOutput.permitNumber = rs.getInteger(1);
	mobOutput.mobileEquipment = rs.getInteger(2);
	mobOutput.assessEquipmentCondition = rs.getInteger(3);
	mobOutput.controlAccess= rs.getInteger(4);
	mobOutput.monitorProximity= rs.getInteger(5);
	mobOutput.manageOverheadHazards= rs.getInteger(6);
	mobOutput.adhereToRules= rs.getInteger(7);
}

var TOJSASTEPS = conn.prepareStatement(' select  SERIALNO,PERMITNUMBER, TASKSTEPS,POTENTIALHAZARDS,HAZARDCONTROLS,PERSONRESPONSIBLE from "IOP"."JSASTEPS" where PERMITNUMBER = ?');
TOJSASTEPS.setInteger(1, permitNo);
var rs = TOJSASTEPS.executeQuery();
var stepOutput={};
var stepAllData = [];
while (rs.next()) {
	stepOutput={};
	stepOutput.serialNo = rs.getInteger(1);
	stepOutput.permitNumber = rs.getInteger(2);
	stepOutput.taskSteps = rs.getString(3);
	stepOutput.potentialHazards = rs.getString(4);
	stepOutput.hazardControls= rs.getString(5);
	stepOutput.personResponsible= rs.getString(6);
	stepAllData.push(stepOutput);
}


var TOJSASTOP = conn.prepareStatement(' select  SERIALNO,PERMITNUMBER, LINEDESCRIPTION from "IOP"."JSASTOPTRIGGER" where PERMITNUMBER = ?');
TOJSASTOP.setInteger(1, permitNo);
var rs = TOJSASTOP.executeQuery();
var stopOutput={};
var stopAllData = [];
while (rs.next()) {
	stopOutput={};
	stopOutput.serialNo = rs.getInteger(1);
	stopOutput.permitNumber = rs.getInteger(2);
	stopOutput.lineDescription = rs.getString(3);
	stopAllData.push(stopOutput);
}

var TOJSALOCATION = conn.prepareStatement(' select  SERIALNO,PERMITNUMBER, FACILTYORSITE,HIERARCHYLEVEL,FACILITY,MUWI from "IOP"."JSA_LOCATION" where PERMITNUMBER = ?');
TOJSALOCATION.setInteger(1, permitNo);
var rs = TOJSALOCATION.executeQuery();
var locOutput={};
var locationAllData = [];
while (rs.next()) {
	locOutput={};
	locOutput.serialNo = rs.getInteger(1);
	locOutput.permitNumber = rs.getInteger(2);
	locOutput.facilityOrSite = rs.getString(3);
	locOutput.hierachyLevel = rs.getString(4);
	locOutput.facility = rs.getString(5);
	locOutput.muwi = rs.getString(6);
	locationAllData.push(locOutput);
}

var TOPTWPEOPLE = conn.prepareStatement(' select  SERIALNO,PERMITNUMBER, FIRSTNAME,LASTTNAME,CONTACTNUMBER,HASSIGNEDJSA,HASSIGNEDCWP,HASSIGNEDHWP,HASSIGNEDCSE from "IOP"."PTWPEOPLE" where PERMITNUMBER = ?');
TOPTWPEOPLE.setInteger(1, permitNo);
var rs = TOPTWPEOPLE.executeQuery();
var peoOutput={};
var peoAllData = [];
while (rs.next()) {
	peoOutput={};
	peoOutput.serialNo = rs.getInteger(1);
	peoOutput.permitNumber = rs.getInteger(2);
	peoOutput.firstName = rs.getString(3);
	peoOutput.lastName = rs.getString(4);
	peoOutput.contactNumber = rs.getString(5);
	peoOutput.hasSignedJSA = rs.getInteger(6);
	peoOutput.hasSignedCWP = rs.getInteger(7);
	peoOutput.hasSignedHWP = rs.getInteger(8);
	peoOutput.hasSignedCSE = rs.getInteger(9);
	peoAllData.push(peoOutput);
}

//var TOPTWHEADER = conn.prepareStatement(' select  PERMITNUMBER,PTWPERMITNUMBER, ISCWP,ISHWP,ISCSE,PLANNEDDATETIME,LOCATION,CREATEDBY,CONTRACTORPERFORMINGWORK,ESTIMATEDTIMEOFCOMPLETION,EQUIPMENTID,WORKORDERNUMBER,STATUS from "IOP"."PTWHEADER" where PERMITNUMBER = ?');
//TOPTWHEADER.setInteger(1, permitNo);
//var rs = TOPTWHEADER.executeQuery();
//var ptwheaderOutput={};
//var ptwhdrAllData = [];
//while (rs.next()) {
//	peoOutput={};
//	ptwheaderOutput.permitNumber = rs.getInteger(1);
//	ptwheaderOutput.ptwPermitNumber = rs.getString(2);
//	ptwheaderOutput.isCWP = rs.getInteger(3);
//	ptwheaderOutput.isHWP = rs.getInteger(4);
//	ptwheaderOutput.isCSE = rs.getInteger(5);
//	ptwheaderOutput.plannedDateTime = rs.getString(6);
//	ptwheaderOutput.location = rs.getString(7);
//	ptwheaderOutput.createdBy = rs.getString(8);
//	ptwheaderOutput.contractorPerformingWork = rs.getString(9);
//	ptwheaderOutput.estimatedTimeOfCompletion = rs.getString(10);
//	ptwheaderOutput.equipmentID = rs.getString(11);
//	ptwheaderOutput.workOrderNumber = rs.getString(12);
//	ptwheaderOutput.status = rs.getString(13);
//	ptwhdrAllData.push(ptwheaderOutput);
//}


//var TOPTWCWPWORK = conn.prepareStatement(' select  PERMITNUMBER,CRITICALORCOMPLEXLIFT, CRANEORLIFTINGDEVICE,GROUNDDISTURBANCEOREXCAVATION,HANDLINGHAZARDOUSCHEMICALS,WORKINGATHEIGHT,PAINTINGORBLASTING,WORKINGONPRESSURIZEDSYSTEMS,ERECTINGORDISMANTLINGSCAFFOLDING,BREAKINGCONTAINMENTOFCLOSEDOPERATINGSYSTEM,WORKINGINCLOSETOHAZARDOUSENERGY,REMOVALOFIDLEEQUIPMENTFORREPAIR,HIGHERRISKELECTRICALWORK,OTHERTYPEOFWORK,DESCRIPTIONOFWORKTOBEPERFORMED from "IOP"."PTW_CWP_WORK_TYPE" where PERMITNUMBER = ?');
//TOPTWCWPWORK.setInteger(1, permitNo);
//var rs = TOPTWCWPWORK.executeQuery();
//var ptwcwpOutput={};
////var ptwcwpAllData = [];
//while (rs.next()) {
//	ptwcwpOutput={};
//	ptwcwpOutput.permitNumber = rs.getInteger(1);
//	ptwcwpOutput.criticalOrComplexLift = rs.getInteger(2);
//	ptwcwpOutput.craneOrLiftingDevice = rs.getInteger(3);
//	ptwcwpOutput.groundDisturbanceOrExcavation = rs.getInteger(4);
//	ptwcwpOutput.handlingHazardousChemicals = rs.getInteger(5);
//	ptwcwpOutput.workingAtHeight = rs.getInteger(6);
//	ptwcwpOutput.paintingOrBlasting = rs.getInteger(7);
//	ptwcwpOutput.workingOnPressurizedSystems = rs.getInteger(8);
//	ptwcwpOutput.erectingOrDismantlingScaffolding = rs.getInteger(9);
//	ptwcwpOutput.breakingContainmentOfClosedOperatingSystem = rs.getInteger(10);
//	ptwcwpOutput.workingInCloseToHazardousEnergy = rs.getInteger(11);
//	ptwcwpOutput.removalOfIdleEquipmentForRepair = rs.getInteger(12);
//	ptwcwpOutput.higherRiskElectricalWork = rs.getInteger(13);
//	ptwcwpOutput.otherTypeOfWork = rs.getString(14);
//	ptwcwpOutput.descriptionOfWorkToBePerformed = rs.getString(15);
//	//ptwcwpAllData.push(ptwcwpOutput);
//}
//
//var TOPTWREQDOC = conn.prepareStatement(' select SERIALNO,PERMITNUMBER,ISCWP, ISHWP,ISCSE,ATMOSPHERICTESTRECORD,LOTO,PROCEDURE,PANDIDORDRAWING,CERTIFICATE,TEMPORARYDEFEAT,RESCUEPLAN,SDS,OTHERWORKPERMITDOCS,FIREWATCHCHECKLIST,LIFTPLAN,SIMOPDEVIATION,SAFEWORKPRACTICE from "IOP"."PTWREQUIREDDOCUMENT" where PERMITNUMBER = ?');
//TOPTWREQDOC.setInteger(1, permitNo);
//var rs = TOPTWREQDOC.executeQuery();
//var ptwreqdocOutput={};
//var ptwreqAllData = [];
//while (rs.next()) {
//	ptwreqdocOutput={};
//	ptwreqdocOutput.serialNo = rs.getInteger(1);
//	ptwreqdocOutput.permitNumber = rs.getInteger(2);
//	ptwreqdocOutput.isCWP = rs.getInteger(3);
//	ptwreqdocOutput.isHWP = rs.getInteger(4);
//	ptwreqdocOutput.isCSE = rs.getInteger(5);
//	ptwreqdocOutput.atmosphericTestRecord = rs.getInteger(6);
//	ptwreqdocOutput.loto = rs.getInteger(7);
//	ptwreqdocOutput.procedure = rs.getInteger(8);
//	ptwreqdocOutput.pAndIdOrDrawing = rs.getInteger(9);
//	ptwreqdocOutput.certificate = rs.getString(10);
//	ptwreqdocOutput.temporaryDefeat = rs.getInteger(11);
//	ptwreqdocOutput.rescuePlan = rs.getInteger(12);
//	ptwreqdocOutput.sds = rs.getInteger(13);
//	ptwreqdocOutput.otherWorkPermitDocs = rs.getString(14);
//	ptwreqdocOutput.fireWatchChecklist = rs.getInteger(15);
//	ptwreqdocOutput.liftPlan = rs.getInteger(16);
//	ptwreqdocOutput.simopDeviation = rs.getInteger(17);
//	ptwreqdocOutput.safeWorkPractice = rs.getInteger(18);
//	ptwreqAllData.push(ptwreqdocOutput);
//}
//
//
//var TOPTWAPPROVAL = conn.prepareStatement(' select SERIALNO,PERMITNUMBER,ISCWP, ISHWP,ISCSE,ISWORKSAFETOPERFORM,PREJOBWALKTHROUGHBY,APPROVEDBY,APPROVALDATE,CONTROLBOARDDISTRIBUTION,WORKSITEDISTRIBUTION,SIMOPSDISTRIBUTION,OTHERDISTRIBUTION,PICNAME,PICDATE,SUPERITENDENTNAME,SUPERITENDENTDATE from "IOP"."PTWAPPROVAL" where PERMITNUMBER = ?');
//TOPTWAPPROVAL.setInteger(1, permitNo);
//var rs = TOPTWAPPROVAL.executeQuery();
//var ptwaprvOutput={};
//var ptwappAllData = [];
//while (rs.next()) {
//	ptwaprvOutput={};
//	ptwaprvOutput.serialNo = rs.getInteger(1);
//	ptwaprvOutput.permitNumber = rs.getInteger(2);
//	ptwaprvOutput.isCWP = rs.getInteger(3);
//	ptwaprvOutput.isHWP = rs.getInteger(4);
//	ptwaprvOutput.isCSE = rs.getInteger(5);
//	ptwaprvOutput.isWorkSafeToPerform = rs.getInteger(6);
//	ptwaprvOutput.prejobWalkthroughBy = rs.getString(7);
//	ptwaprvOutput.approvedBy = rs.getString(8);
//	ptwaprvOutput.approvalDate = rs.getString(9);
//	ptwaprvOutput.controlBoardDistribution = rs.getInteger(10);
//	ptwaprvOutput.worksiteDistribution = rs.getInteger(11);
//	ptwaprvOutput.simopsDistribution = rs.getInteger(12);
//	ptwaprvOutput.otherDistribution = rs.getString(13);
//	ptwaprvOutput.picName = rs.getString(14);
//	ptwaprvOutput.picDate = rs.getString(15);
//	ptwaprvOutput.superitendentName = rs.getString(16);
//	ptwaprvOutput.superitendentDate = rs.getString(17);
//	ptwappAllData.push(ptwaprvOutput);
//}
//
//var TOPTWATESTRES = conn.prepareStatement(' select SERIALNO,PERMITNUMBER,ISCWP, ISHWP,ISCSE,PRESTARTORWORKTEST,OXYGENPERCENTAGE,TOXICTYPE,TOXICRESULT,FLAMMABLEGAS,OTHERSTYPE,OTHERSRESULT,DATE,TIME from "IOP"."PTWTESTRESULTS" where PERMITNUMBER = ?');
//TOPTWATESTRES.setInteger(1, permitNo);
//var rs = TOPTWATESTRES.executeQuery();
//var ptwresultOutput={};
//var ptwresAllData = [];
//while (rs.next()) {
//	ptwresultOutput={};
//	ptwresultOutput.serialNo = rs.getInteger(1);
//	ptwresultOutput.permitNumber = rs.getInteger(2);
//	ptwresultOutput.isCWP = rs.getInteger(3);
//	ptwresultOutput.isHWP = rs.getInteger(4);
//	ptwresultOutput.isCSE = rs.getInteger(5);
//	ptwresultOutput.preStartOrWorkTest = rs.getString(6);
//	ptwresultOutput.oxygenPercentage = rs.getInteger(7);
//	ptwresultOutput.toxicType = rs.getString(8);
//	ptwresultOutput.toxicResult = rs.getInteger(9);
//	ptwresultOutput.flammableGas = rs.getString(10);
//	ptwresultOutput.othersType = rs.getString(11);
//	ptwresultOutput.othersResult = rs.getInteger(12);
//	ptwresultOutput.date = rs.getString(13);
//	ptwresultOutput.time = rs.getString(14);
//
//	ptwresAllData.push(ptwresultOutput);
//}
//
//var TOPTWCLOSEOUT = conn.prepareStatement(' select SERIALNO,PERMITNUMBER,ISCWP, ISHWP,ISCSE,PICNAME,WORKCOMPLETED,CLOSEDBY,CLOSEDDATE,WORKSTATUSCOMMENT from "IOP"."PTWCLOSEOUT" where PERMITNUMBER = ?');
//TOPTWCLOSEOUT.setInteger(1, permitNo);
//var rs = TOPTWCLOSEOUT.executeQuery();
//var ptwclsOutOutput={};
//var ptwclsAllData = [];
//while (rs.next()) {
//	ptwclsOutOutput={};
//	ptwclsOutOutput.serialNo = rs.getInteger(1);
//	ptwclsOutOutput.permitNumber = rs.getInteger(2);
//	ptwclsOutOutput.isCWP = rs.getInteger(3);
//	ptwclsOutOutput.isHWP = rs.getInteger(4);
//	ptwclsOutOutput.isCSE = rs.getInteger(5);
//	ptwclsOutOutput.picName = rs.getString(6);
//	ptwclsOutOutput.workCompleted = rs.getInteger(7);
//	ptwclsOutOutput.closedBy = rs.getString(8);
//	ptwclsOutOutput.closedDate = rs.getString(9);
//	ptwclsOutOutput.workStatusComments = rs.getString(10);
//	
//	ptwclsAllData.push(ptwclsOutOutput);
//}
//
//
//var TOPTWHWPWORK = conn.prepareStatement(' select PERMITNUMBER,CUTTING, WIELDING,ELECTRICALPOWEREDEQUIPMENT,GRINDING,ABRASIVEBLASTING,OTHERTYPEOFWORK,DESCRIPTIONOFWORKTOBEPERFORMED from "IOP"."PTW_HWP_WORK_TYPE" where PERMITNUMBER = ?');
//TOPTWHWPWORK.setInteger(1, permitNo);
//var rs = TOPTWHWPWORK.executeQuery();
//var ptwhwpOutput={};
//while (rs.next()) {
//	ptwhwpOutput={};
//	ptwhwpOutput.permitNumber = rs.getInteger(1);
//	ptwhwpOutput.cutting = rs.getInteger(2);
//	ptwhwpOutput.wielding = rs.getInteger(3);
//	ptwhwpOutput.electricalPoweredEquipment = rs.getInteger(4);
//	ptwhwpOutput.grinding = rs.getInteger(5);
//	ptwhwpOutput.abrasiveBlasting = rs.getInteger(6);
//	ptwhwpOutput.otherTypeOfWork = rs.getString(7);
//	ptwhwpOutput.descriptionOfWorkToBePerformed = rs.getString(8);
//	
//	
//}
//
//var TOPTWCSEWORK = conn.prepareStatement(' select PERMITNUMBER,TANK, VESSEL,EXCAVATION,PIT,TOWER,OTHER,REASONFORCSE from "IOP"."PTW_CSE_WORK_TYPE" where PERMITNUMBER = ?');
//TOPTWCSEWORK.setInteger(1, permitNo);
//var rs = TOPTWCSEWORK.executeQuery();
//var ptwcseOutput={};
//while (rs.next()) {
//	ptwcseOutput={};
//	ptwcseOutput.permitNumber = rs.getInteger(1);
//	ptwcseOutput.tank = rs.getInteger(2);
//	ptwcseOutput.vessel = rs.getInteger(3);
//	ptwcseOutput.excavation = rs.getInteger(4);
//	ptwcseOutput.pit = rs.getInteger(5);
//	ptwcseOutput.tower = rs.getInteger(6);
//	ptwcseOutput.other = rs.getString(7);
//	ptwcseOutput.reasonForCSE = rs.getString(8);
//	
//	
//}
//
//
//
//




rs.close();
TOJSAHEADER.close();
conn.close();
//var resp = JSON.stringify([{TOJSAHEADER:output}]);

var allData = {
		TOJSAHEADER :output,
		TOJSAREVIEW:viewOutput,
		TOJSARISKASS:sariskassOutput,
		TOJSE_PPE:ppeOutput,
		TOJSAHAZARDPRESS:hazPresrOutput,
		TOJSAHAZARDVISIBLE:visiOutput,
		TOJSAHAZARDPERSON:persnOutput,
		TOJSAHAZARDCSE:dcseOutput,
		TOJSAHAZARDSIMULTAN:simuOutput,
		TOJSAHAZARDIGNITION:signOutput,
		TOJSAHAZARDSUBS:subsOutput,
		TOJSAHAZARDSPILL:pillOutput,
		TOJSAHAZARDWEATHER:wtherOutput,
		TOJSAHAZARDNOISE:noiseOutput,
		TOJSAHAZARDDROPPED:dropedOutput,
		TOJSAHAZARDLIFT:liftOutput,
		TOJSAHAZARDHEIGHT:hightOutput,
		TOJSAHAZARDELECTRICAL:elctricalOutput,
		TOJSAHAZARDMOVING:movOutput,
		TOJSAHAZARDMANUAL:manuOutput,
		TOJSAHAZARDTOOLS:toolOutput,
		TOJSAHAZARDFALLS:fallOutput,
		TOJSAHAZARDVOLTAGE:volOutput,
		TOJSAHAZARDEXCAVATION:vacOutput,
		TOJSAHAZARDMOBILE:mobOutput,
		TOJSASTEPS:stepAllData,
		TOJSASTOP:stopAllData,
		TOJSALOCATION:locationAllData,
		TOPTWPEOPLE:peoAllData,
//		TOPTWHEADER:ptwhdrAllData,
//		TOPTWCWPWORK:ptwcwpOutput,
//		TOPTWREQDOC:ptwreqAllData,
//		TOPTWAPPROVAL:ptwappAllData,
//		TOPTWATESTRES:ptwresAllData,
//		TOPTWCLOSEOUT:ptwclsAllData,
//		TOPTWHWPWORK:ptwhwpOutput,
//		TOPTWCSEWORK:ptwcseOutput
		
		
		
		
};
var resp=JSON.stringify(allData);

//var resp=JSON.stringify({TOJSAHEADER :output},{TOJSAREVIEW:viewOutput},{TOJSARISKASS:sariskassOutput},{TOJSE_PPE:ppeOutput},{TOJSAHAZARDPRESS:hazPresrOutput},{TOJSAHAZARDVISIBLE:visiOutput},{TOJSAHAZARDPERSON:persnOutput},{TOJSAHAZARDCSE:dcseOutput},{TOJSAHAZARDSIMULTAN:simuOutput},{TOJSAHAZARDIGNITION:signOutput},
//                         {TOJSAHAZARDSUBS:subsOutput},{TOJSAHAZARDSPILL:pillOutput},{TOJSAHAZARDWEATHER:wtherOutput},{TOJSAHAZARDNOISE:noiseOutput},{TOJSAHAZARDDROPPED:dropedOutput},{TOJSAHAZARDLIFT:liftOutput},
//                         {TOJSAHAZARDHEIGHT:hightOutput},{TOJSAHAZARDELECTRICAL:elctricalOutput},{TOJSAHAZARDMOVING:movOutput},{TOJSAHAZARDMANUAL:manuOutput},{TOJSAHAZARDTOOLS:toolOutput},{TOJSAHAZARDFALLS:fallOutput},{TOJSAHAZARDVOLTAGE:volOutput},{TOJSAHAZARDEXCAVATION:vacOutput},
//                         {TOJSAHAZARDMOBILE:mobOutput},{TOJSASTEPS:stepAllData},{TOJSASTOP:stopAllData},{TOJSALOCATION:locationAllData},{TOPTWPEOPLE:peoAllData},{TOPTWHEADER:ptwhdrAllData},{TOPTWCWPWORK:ptwcwpAllData},{TOPTWREQDOC:ptwreqAllData},{TOPTWAPPROVAL:ptwappAllData}]);
$.response.setBody(resp);
