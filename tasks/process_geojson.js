'use strict';

const fs = require('fs');
//const path = require('path');
const json = require('big-json');
const { features } = require('process');
//const uniqueCrimeObj = require('./uniqueCrimeObj.json');

let path =
  // '../public/data/Tucson_Police_Calls_for_Service_2018_2020_Open_Data4326_api_merge.geojson';
  '../public/data/Tucson_Police_incidents_2018_2020_Open_Data_api_merged.geojson';
// '../public/data/Tucson_Police_Calls_for_Service_2018_4326_esri.geojson';
// '../public/data/Tucson_Police_Calls_for_Service_2018_2020_Open_Data4326_selected.geojson';
// '../public/data/Tucson_Police_Incidents__2018_1.json'  //esri original

const readStream = fs.createReadStream(path);
const parseStream = json.createParseStream();

let uniqueCrimeObj = {
  1001: {
    STATUTDESC: 'FORGERY & COUNTERFEITING/FORGERY',
    CrimeType: 'Forgery & Counterfeiting',
    CrimeCategory: 'Property',
  },
  1002: {
    STATUTDESC: 'FORGERY & COUNTERFEITING/COUNTERFEITING',
    CrimeType: 'Forgery & Counterfeiting',
    CrimeCategory: 'Property',
  },
  1101: {
    STATUTDESC: 'FRAUD/BOGUS CHECKS',
    CrimeType: 'Fraud',
    CrimeCategory: 'Property',
  },
  1102: {
    STATUTDESC: 'FRAUD/DEFRAUDING',
    CrimeType: 'Fraud',
    CrimeCategory: 'Property',
  },
  1103: {
    STATUTDESC: 'FRAUD/CONFIDENCE GAME',
    CrimeType: 'Fraud',
    CrimeCategory: 'Property',
  },
  1104: {
    STATUTDESC: 'FRAUD/OTHER',
    CrimeType: 'Fraud',
    CrimeCategory: 'Property',
  },
  1105: {
    STATUTDESC: 'FRAUD/IDENTITY THEFT',
    CrimeType: 'Fraud',
    CrimeCategory: 'Property',
  },
  1106: {
    STATUTDESC: 'FRAUD/PRESCRIPTION FRAUD',
    CrimeType: 'Fraud',
    CrimeCategory: 'Property',
  },
  1201: {
    STATUTDESC: 'EMBEZZLEMENT/RENTAL PROPERTY',
    CrimeType: 'Embezzlement',
    CrimeCategory: 'Property',
  },
  1202: {
    STATUTDESC: 'EMBEZZLEMENT/FROM EMPLOYER',
    CrimeType: 'Embezzlement',
    CrimeCategory: 'Property',
  },
  1203: {
    STATUTDESC: 'EMBEZZLEMENT/MORTGAGED PROPERTY',
    CrimeType: 'Embezzlement',
    CrimeCategory: 'Property',
  },
  1204: {
    STATUTDESC: 'EMBEZZLEMENT/OTHER',
    CrimeType: 'Embezzlement',
    CrimeCategory: 'Property',
  },
  1302: {
    STATUTDESC: 'STOLEN PROPERTY/RECEIVING',
    CrimeType: 'Stolen Property',
    CrimeCategory: 'Property',
  },
  1303: {
    STATUTDESC: 'STOLEN PROPERTY/POSSESSION',
    CrimeType: 'Stolen Property',
    CrimeCategory: 'Property',
  },
  1401: {
    STATUTDESC: 'CRIMINAL DAMAGE/MALICIOUS MISCHIEF',
    CrimeType: 'Criminal Damage',
    CrimeCategory: 'Property',
  },
  1402: {
    STATUTDESC: 'CRIMINAL DAMAGE/INTENTIONAL VANDALISM',
    CrimeType: 'Criminal Damage',
    CrimeCategory: 'Property',
  },
  1403: {
    STATUTDESC: 'CRIMINAL DAMAGE/GRAFFITI',
    CrimeType: 'Criminal Damage',
    CrimeCategory: 'Property',
  },
  1412: {
    STATUTDESC: 'CRIMINAL DAMAGE/INTENTIONAL VANDALISM - DOM VIOL',
    CrimeType: 'Criminal Damage',
    CrimeCategory: 'Property',
  },
  1501: {
    STATUTDESC: 'WEAPONS/CARRYING CONCEALED',
    CrimeType: 'Weapons Violation',
    CrimeCategory: 'Violation',
  },
  1502: {
    STATUTDESC: 'WEAPONS/FURNISHING TO MINOR',
    CrimeType: 'Weapons Violation',
    CrimeCategory: 'Violation',
  },
  1503: {
    STATUTDESC: 'WEAPONS/ILLEGAL',
    CrimeType: 'Weapons Violation',
    CrimeCategory: 'Violation',
  },
  1504: {
    STATUTDESC: 'WEAPONS/OTHER',
    CrimeType: 'Weapons Violation',
    CrimeCategory: 'Violation',
  },
  1601: {
    STATUTDESC: 'PROSTITUTION',
    CrimeType: 'Commercialized Sex',
    CrimeCategory: 'Quality of Life',
  },
  1602: {
    STATUTDESC: 'COMMERCIALIZED SEX/PANDERING',
    CrimeType: 'Commercialized Sex',
    CrimeCategory: 'Quality of Life',
  },
  1604: {
    STATUTDESC: 'COMMERCIALIZED SEX/OTHER',
    CrimeType: 'Commercialized Sex',
    CrimeCategory: 'Quality of Life',
  },
  1701: {
    STATUTDESC: 'SEX OFFENSES/MOLESTING',
    CrimeType: 'Sex Offense',
    CrimeCategory: 'Violent',
  },
  1702: {
    STATUTDESC: 'SEX OFFENSES/CHILD MOLESTING',
    CrimeType: 'Sex Offense',
    CrimeCategory: 'Violent',
  },
  1703: {
    STATUTDESC: 'SEX OFFENSES/EXPOSURE',
    CrimeType: 'Sex Offense',
    CrimeCategory: 'Violent',
  },
  1704: {
    STATUTDESC: 'SEX OFFENSES/OBSCENE PHONE CALLS',
    CrimeType: 'Sex Offense',
    CrimeCategory: 'Violent',
  },
  1705: {
    STATUTDESC: 'SEX OFFENSES/LEWD & LASCIVIOUS ACTS',
    CrimeType: 'Sex Offense',
    CrimeCategory: 'Violent',
  },
  1706: {
    STATUTDESC: 'SEX OFFENSES/OTHER (ADULTRY,INCEST,STAT RAPE,ETC)',
    CrimeType: 'Sex Offense',
    CrimeCategory: 'Violent',
  },
  1707: {
    STATUTDESC: 'SEX OFFENSES/PEEPING TOM',
    CrimeType: 'Sex Offense',
    CrimeCategory: 'Violent',
  },
  1801: {
    STATUTDESC: 'NARCOTIC DRUG LAWS/POSSESSION',
    CrimeType: 'Drug Offense',
    CrimeCategory: 'Quality of Life',
  },
  1802: {
    STATUTDESC: 'NARCOTIC DRUG LAWS/SALE',
    CrimeType: 'Drug Offense',
    CrimeCategory: 'Quality of Life',
  },
  1803: {
    STATUTDESC: 'NARCOTIC DRUG LAWS/POSSESSION OF PARAPHERNALIA',
    CrimeType: 'Drug Offense',
    CrimeCategory: 'Quality of Life',
  },
  1804: {
    STATUTDESC: 'NARCOTIC DRUG LAWS/PAINT OR GLUE SNIFFING',
    CrimeType: 'Drug Offense',
    CrimeCategory: 'Quality of Life',
  },
  1901: {
    STATUTDESC: 'GAMBLING/LOTTERY VIOLATIONS',
    CrimeType: 'Gambling',
    CrimeCategory: 'Quality of Life',
  },
  2001: {
    STATUTDESC: 'OFFENSES AGAINST FAMILY & CHILDREN/PHYSICAL ABUSE',
    CrimeType: 'Offense Against Family/Children',
    CrimeCategory: 'Violent',
  },
  2002: {
    STATUTDESC: 'OFFENSES AGAINST FAMILY & CHILDREN/NEGLECT',
    CrimeType: 'Offense Against Family/Children',
    CrimeCategory: 'Violent',
  },
  2003: {
    STATUTDESC: 'OFFENSES AGAINST FAMILY & CHILDREN/NON-SUPPORT',
    CrimeType: 'Offense Against Family/Children',
    CrimeCategory: 'Violent',
  },
  2004: {
    STATUTDESC: 'OFFENSES AGNST FAMILY & CHLDRN/DESERTION-ABANDON',
    CrimeType: 'Offense Against Family/Children',
    CrimeCategory: 'Violent',
  },
  2005: {
    STATUTDESC: 'OFFENSES AGNST FAMILY & CHLDRN/CUSTODIAL INTERFERE',
    CrimeType: 'Offense Against Family/Children',
    CrimeCategory: 'Violent',
  },
  2006: {
    STATUTDESC: 'OFFENSES AGAINST FAMILY & CHILDREN/OTHER',
    CrimeType: 'Offense Against Family/Children',
    CrimeCategory: 'Violent',
  },
  2015: {
    STATUTDESC: 'OFFENSES AGNST FAMILY & CHLDRN/CSTDL INTRFRNCE DV',
    CrimeType: 'Offense Against Family/Children',
    CrimeCategory: 'Violent',
  },
  2101: {
    STATUTDESC: 'DUI/FATAL ACCIDENT',
    CrimeType: 'DUI',
    CrimeCategory: 'Quality of Life',
  },
  2102: {
    STATUTDESC: 'DUI/PERSONAL INJURY ACCIDENT',
    CrimeType: 'DUI',
    CrimeCategory: 'Quality of Life',
  },
  2103: {
    STATUTDESC: 'DUI/PROPERTY DAMAGE ONLY ACCIDENT',
    CrimeType: 'DUI',
    CrimeCategory: 'Quality of Life',
  },
  2104: {
    STATUTDESC: 'DUI/NON-ACCIDENT',
    CrimeType: 'DUI',
    CrimeCategory: 'Quality of Life',
  },
  2201: {
    STATUTDESC: 'LIQUOR LAWS/FURNISHING LIQUOR TO MINOR',
    CrimeType: 'Liquor Laws',
    CrimeCategory: 'Quality of Life',
  },
  2202: {
    STATUTDESC: 'LIQUOR LAWS/MINOR IN POSSESSION',
    CrimeType: 'Liquor Laws',
    CrimeCategory: 'Quality of Life',
  },
  2203: {
    STATUTDESC: 'LIQUOR LAWS/DRINKING IN PUBLIC',
    CrimeType: 'Liquor Laws',
    CrimeCategory: 'Quality of Life',
  },
  2204: {
    STATUTDESC: 'LIQUOR LAWS/OTHER',
    CrimeType: 'Liquor Laws',
    CrimeCategory: 'Quality of Life',
  },
  2301: {
    STATUTDESC: 'INTOXICATION/DRUNK IN PUBLIC',
    CrimeType: 'Drunkenness',
    CrimeCategory: 'Quality of Life',
  },
  2302: {
    STATUTDESC: 'INTOXICATION/TRANSPORTED TO LARC',
    CrimeType: 'Drunkenness',
    CrimeCategory: 'Quality of Life',
  },
  2303: {
    STATUTDESC: 'INTOXICATION/OTHER',
    CrimeType: 'Drunkenness',
    CrimeCategory: 'Quality of Life',
  },
  2401: {
    STATUTDESC: 'DISORDERLY CONDUCT/DISTURBING THE PEACE',
    CrimeType: 'Disorderly Conduct',
    CrimeCategory: 'Quality of Life',
  },
  2402: {
    STATUTDESC: 'DISORDERLY CONDUCT/FIGHTING',
    CrimeType: 'Disorderly Conduct',
    CrimeCategory: 'Quality of Life',
  },
  2403: {
    STATUTDESC: 'DISORDERLY CONDUCT/FAMILY FIGHT',
    CrimeType: 'Disorderly Conduct',
    CrimeCategory: 'Quality of Life',
  },
  2404: {
    STATUTDESC: 'DISORDERLY CONDUCT/OBSTRUCTING AN OFFICER',
    CrimeType: 'Disorderly Conduct',
    CrimeCategory: 'Quality of Life',
  },
  2405: {
    STATUTDESC: 'DISORDERLY CONDUCT/DISCHARGING FIREARMS OR FIREWKS',
    CrimeType: 'Disorderly Conduct',
    CrimeCategory: 'Quality of Life',
  },
  2406: {
    STATUTDESC: 'DISORDERLY CONDUCT/OTHER (TRESPASSING)',
    CrimeType: 'Disorderly Conduct',
    CrimeCategory: 'Quality of Life',
  },
  2407: {
    STATUTDESC: 'RED TAG ISSUED',
    CrimeType: 'Disorderly Conduct',
    CrimeCategory: 'Quality of Life',
  },
  2411: {
    STATUTDESC: 'DISORDERLY CONDUCT/DISTURBING THE PEACE DV',
    CrimeType: 'Disorderly Conduct',
    CrimeCategory: 'Quality of Life',
  },
  2416: {
    STATUTDESC: 'DISORDERLY CONDUCT/OTHER (TRESPASSING) DV',
    CrimeType: 'Disorderly Conduct',
    CrimeCategory: 'Quality of Life',
  },
  2501: {
    STATUTDESC: 'VAGRANCY/BEGGING',
    CrimeType: 'Vagrancy',
    CrimeCategory: 'Quality of Life',
  },
  2502: {
    STATUTDESC: 'VAGRANCY/LOITERING',
    CrimeType: 'Vagrancy',
    CrimeCategory: 'Quality of Life',
  },
  2503: {
    STATUTDESC: 'VAGRANCY/OTHER',
    CrimeType: 'Vagrancy',
    CrimeCategory: 'Quality of Life',
  },
  2601: {
    STATUTDESC: 'OTHER OFFENSES/ESCAPE',
    CrimeType: 'Other Felony/Misdemeanor',
    CrimeCategory: 'Violent',
  },
  2602: {
    STATUTDESC: 'OTHER OFFENSES/PHONE CALLS',
    CrimeType: 'Other Felony/Misdemeanor',
    CrimeCategory: 'Violent',
  },
  2603: {
    STATUTDESC: 'OTHER OFFENSES/BOMB THREATS',
    CrimeType: 'Other Felony/Misdemeanor',
    CrimeCategory: 'Violent',
  },
  2604: {
    STATUTDESC: 'OTHER OFFENSES/OTHER FELONIES',
    CrimeType: 'Other Felony/Misdemeanor',
    CrimeCategory: 'Violent',
  },
  2605: {
    STATUTDESC: 'OTHER OFFENSES/OTHER MISDEMEANORS',
    CrimeType: 'Other Felony/Misdemeanor',
    CrimeCategory: 'Violent',
  },
  2606: {
    STATUTDESC: 'OTHER OFFENSES/KIDNAPPING',
    CrimeType: 'Other Felony/Misdemeanor',
    CrimeCategory: 'Violent',
  },
  2607: {
    STATUTDESC: 'OTHER OFFENSES/ANIMAL ABUSE OR NEGLECT',
    CrimeType: 'Other Felony/Misdemeanor',
    CrimeCategory: 'Violent',
  },
  2614: {
    STATUTDESC: 'OTHER OFFENSES/OTHER FELONIES DV',
    CrimeType: 'Other Felony/Misdemeanor',
    CrimeCategory: 'Violent',
  },
  2615: {
    STATUTDESC: 'OTHER OFFENSES/OTHER MISDEMEANORS DV',
    CrimeType: 'Other Felony/Misdemeanor',
    CrimeCategory: 'Violent',
  },
  2617: {
    STATUTDESC: 'OTHER OFFENSES/STALKING',
    CrimeType: 'Other Felony/Misdemeanor',
    CrimeCategory: 'Violent',
  },
  2701: {
    STATUTDESC: 'ARREST FOR OTHER JURISDICTION/FELONY WARRANT',
    CrimeType: 'Assist Other Agency/Jurisdiction',
    CrimeCategory: 'Assist',
  },
  2702: {
    STATUTDESC: 'ARREST FOR OTHER JURISDICTION/MISD CRIMINL WARRANT',
    CrimeType: 'Assist Other Agency/Jurisdiction',
    CrimeCategory: 'Assist',
  },
  2703: {
    STATUTDESC: 'ARREST FOR OTHER JURISDICTION/MISD TRAFFIC WARRANT',
    CrimeType: 'Assist Other Agency/Jurisdiction',
    CrimeCategory: 'Assist',
  },
  2704: {
    STATUTDESC: 'ARREST FOR OTHER JURISDICTION/OTHER (OUTSIDE RAJ)',
    CrimeType: 'Assist Other Agency/Jurisdiction',
    CrimeCategory: 'Assist',
  },
  2801: {
    STATUTDESC: 'JUVENILE VIOLATIONS/CURFEW',
    CrimeType: 'Juvenile Violation',
    CrimeCategory: 'Violation',
  },
  2802: {
    STATUTDESC: 'JUVENILE VIOLATIONS/HEALTH, WELFARE, MORALS',
    CrimeType: 'Juvenile Violation',
    CrimeCategory: 'Violation',
  },
  2803: {
    STATUTDESC: 'JUVENILE VIOLATIONS/OTHER',
    CrimeType: 'Juvenile Violation',
    CrimeCategory: 'Violation',
  },
  2901: {
    STATUTDESC: 'RUNAWAY JUVENILE/FROM PARENT OR GUARDIAN',
    CrimeType: 'Juvenile Violation',
    CrimeCategory: 'Violation',
  },
  2902: {
    STATUTDESC: 'RUNAWAY JUVENILE/FROM INSTITUTION OR FOSTER HOME',
    CrimeType: 'Juvenile Violation',
    CrimeCategory: 'Violation',
  },
  2903: {
    STATUTDESC: 'RUNAWAY JUVENILE/ESCAPEE FROM INSTITUTION',
    CrimeType: 'Juvenile Violation',
    CrimeCategory: 'Violation',
  },
  3001: {
    STATUTDESC: 'TRAFFIC ACCIDENT/FATAL/PEDESTRIAN',
    CrimeType: 'Traffic Accident (Fatal)',
    CrimeCategory: 'Accident',
  },
  3002: {
    STATUTDESC: 'TRAFFIC ACCIDENT/FATAL/OTHER MOTOR VEHC',
    CrimeType: 'Traffic Accident (Fatal)',
    CrimeCategory: 'Accident',
  },
  3004: {
    STATUTDESC: 'TRAFFIC ACCIDENT/FATAL/BICYCLE',
    CrimeType: 'Traffic Accident (Fatal)',
    CrimeCategory: 'Accident',
  },
  3006: {
    STATUTDESC: 'TRAFFIC ACCIDENT/FATAL/FIXED OBJECT',
    CrimeType: 'Traffic Accident (Fatal)',
    CrimeCategory: 'Accident',
  },
  3007: {
    STATUTDESC: 'TRAFFIC ACCIDENT/FATAL/OTHER',
    CrimeType: 'Traffic Accident (Fatal)',
    CrimeCategory: 'Accident',
  },
  3011: {
    STATUTDESC: 'TRAFFIC ACCIDENT/FATAL/HIT-AND-RUN/PEDESTRIAN',
    CrimeType: 'Traffic Accident (Fatal)',
    CrimeCategory: 'Accident',
  },
  3012: {
    STATUTDESC: 'TRAFFIC ACCIDENT/FATAL/HIT-AND-RUN/AUTOMOBILE',
    CrimeType: 'Traffic Accident (Fatal)',
    CrimeCategory: 'Accident',
  },
  3014: {
    STATUTDESC: 'TRAFFIC ACCIDENT/FATAL/HIT-AND-RUN/BICYCLE',
    CrimeType: 'Traffic Accident (Fatal)',
    CrimeCategory: 'Accident',
  },
  3101: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/PEDESTRIAN',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3102: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/OTHER MOTOR VEHC',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3104: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/BICYCLE',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3105: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/ANIMAL',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3106: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/FIXED OBJECT',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3107: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/OTHER',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3111: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/HIT-AND-RUN/PEDESTRIAN',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3112: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/HIT-AND-RUN/OTHER MOTOR VEHC',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3113: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/HIT-AND-RUN/RR TRAIN',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3114: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/HIT-AND-RUN/BICYCLE',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3116: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/HIT-AND-RUN/FIXED OBJECT',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3117: {
    STATUTDESC: 'TRAFFIC ACCIDENT/INJURY/HIT-AND-RUN/OTHER',
    CrimeType: 'Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3201: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/PEDESTRIAN',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3202: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/OTHER MOTOR VEHC',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3203: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/RR TRAIN',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3204: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/BICYCLE',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3205: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/ANIMAL',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3206: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/FIXED OBJECT',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3207: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/OTHER',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3211: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/HIT-AND-RUN/PEDESTRIAN',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3212: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/HIT-AND-RUN/MOTOR VEHC',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3213: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/HIT-AND-RUN/RR TRAIN',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3214: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/HIT-AND-RUN/BICYCLE',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3215: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/HIT-AND-RUN/WITH ANIMAL',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3216: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/HIT-AND-RUN/FIXED OBJECT',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3217: {
    STATUTDESC: 'TRAFFIC ACCIDENT/PRP DMG/HIT-AND-RUN/OTHER',
    CrimeType: 'Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3301: {
    STATUTDESC: 'NON-TRAFFIC ACCIDENT/FATAL',
    CrimeType: 'Non-Traffic Accident (Fatal)',
    CrimeCategory: 'Accident',
  },
  3302: {
    STATUTDESC: 'NON-TRAFFIC ACCIDENT/PERSONAL INJURY',
    CrimeType: 'Non-Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3303: {
    STATUTDESC: 'NON-TRAFFIC ACCIDENT/PROPERTY DAMAGE',
    CrimeType: 'Non-Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3311: {
    STATUTDESC: 'NON-TRAFFIC ACCIDENT/FATAL-LEAVING THE SCENE',
    CrimeType: 'Non-Traffic Accident (Fatal)',
    CrimeCategory: 'Accident',
  },
  3312: {
    STATUTDESC: 'NON-TRAFFIC ACCIDENT/PRSNL INJURY-LEAVING SCENE',
    CrimeType: 'Non-Traffic Accident (Injury)',
    CrimeCategory: 'Accident',
  },
  3313: {
    STATUTDESC: 'NON-TRAFFIC ACCIDENT/PRPRTY DMG-LEAVING SCENE',
    CrimeType: 'Non-Traffic Accident (Property)',
    CrimeCategory: 'Accident',
  },
  3401: {
    STATUTDESC: 'OTHER VEHICLE ACCIDENTS/RAILROAD ACCIDENTS',
    CrimeType: 'Non-Traffic Accident (Other)',
    CrimeCategory: 'Accident',
  },
  3402: {
    STATUTDESC: 'OTHER VEHICLE ACCIDENTS/BICYCLE ACCIDENTS',
    CrimeType: 'Non-Traffic Accident (Other)',
    CrimeCategory: 'Accident',
  },
  3404: {
    STATUTDESC: 'OTHER VEHICLE ACCIDENTS/OTHER',
    CrimeType: 'Non-Traffic Accident (Other)',
    CrimeCategory: 'Accident',
  },
  3501: {
    STATUTDESC: 'TRAFFIC & MOTOR VEHC LAWS/MOVING VIOLATIONS',
    CrimeType: 'Traffic Violation',
    CrimeCategory: 'Violation',
  },
  3502: {
    STATUTDESC: 'TRAFFIC & MOTOR VEHC LAWS/LICENSE & REGISTRATION',
    CrimeType: 'Traffic Violation',
    CrimeCategory: 'Violation',
  },
  3503: {
    STATUTDESC: 'TRAFFIC & MOTOR VEHC LAWS/PARKING VIOLATIONS',
    CrimeType: 'Traffic Violation',
    CrimeCategory: 'Violation',
  },
  3504: {
    STATUTDESC: 'TRAFFIC & MOTOR VEHC LAWS/ABANDONED VEHICLE',
    CrimeType: 'Traffic Violation',
    CrimeCategory: 'Violation',
  },
  3505: {
    STATUTDESC: 'TRAFFIC & MOTOR VEHC LAWS/OTHER',
    CrimeType: 'Traffic Violation',
    CrimeCategory: 'Violation',
  },
  3511: {
    STATUTDESC: 'TRAFFIC & MOTOR VEHC LAWS/ROAD RAGE',
    CrimeType: 'Traffic Violation',
    CrimeCategory: 'Violation',
  },
  4001: {
    STATUTDESC: 'DEATH/NATURAL',
    CrimeType: 'Death',
    CrimeCategory: 'Quality of Life',
  },
  4002: {
    STATUTDESC: 'DEATH/ACCIDENTAL',
    CrimeType: 'Death',
    CrimeCategory: 'Quality of Life',
  },
  4003: {
    STATUTDESC: 'DEATH/SUICIDE',
    CrimeType: 'Death',
    CrimeCategory: 'Quality of Life',
  },
  4004: {
    STATUTDESC: 'DEATH/UNKNOWN CAUSES',
    CrimeType: 'Death',
    CrimeCategory: 'Quality of Life',
  },
  4101: {
    STATUTDESC: 'MENTAL CASES/TRANSPORTED TO TREATMENT FACILITY',
    CrimeType: 'Mental Case',
    CrimeCategory: 'Quality of Life',
  },
  4102: {
    STATUTDESC: 'MENTAL CASES/OTHER',
    CrimeType: 'Mental Case',
    CrimeCategory: 'Quality of Life',
  },
  4201: {
    STATUTDESC: 'SICK CARED FOR/TRANSPORTED TO MEDICAL FACILITY',
    CrimeType: 'Sick/Cared For',
    CrimeCategory: 'Quality of Life',
  },
  4202: {
    STATUTDESC: 'SICK CARED FOR/ATTEMPTED SUICIDE',
    CrimeType: 'Sick/Cared For',
    CrimeCategory: 'Quality of Life',
  },
  4203: {
    STATUTDESC: 'SICK CARED FOR/OTHER',
    CrimeType: 'Sick/Cared For',
    CrimeCategory: 'Quality of Life',
  },
  4301: {
    STATUTDESC: 'ANIMAL BITES/DOG',
    CrimeType: 'Animal Bite',
    CrimeCategory: 'Quality of Life',
  },
  4302: {
    STATUTDESC: 'ANIMAL BITES/OTHER DOMESTIC ANIMAL',
    CrimeType: 'Animal Bite',
    CrimeCategory: 'Quality of Life',
  },
  4303: {
    STATUTDESC: 'ANIMAL BITES/OTHER',
    CrimeType: 'Animal Bite',
    CrimeCategory: 'Quality of Life',
  },
  4402: {
    STATUTDESC: 'FIREARM ACCIDENT/HOME',
    CrimeType: 'Firearm Accident',
    CrimeCategory: 'Accident',
  },
  4403: {
    STATUTDESC: 'FIREARM ACCIDENT/OTHER',
    CrimeType: 'Firearm Accident',
    CrimeCategory: 'Accident',
  },
  4501: {
    STATUTDESC: 'PERSONAL INJURY ACCIDENTS/RESIDENTIAL',
    CrimeType: 'Personal Injury Accident',
    CrimeCategory: 'Accident',
  },
  4502: {
    STATUTDESC: 'PERSONAL INJURY ACCIDENTS/OCCUPATIONAL',
    CrimeType: 'Personal Injury Accident',
    CrimeCategory: 'Accident',
  },
  4503: {
    STATUTDESC: 'PERSONAL INJURY ACCIDENTS/PUBLIC PROPERTY',
    CrimeType: 'Personal Injury Accident',
    CrimeCategory: 'Accident',
  },
  4504: {
    STATUTDESC: 'PERSONAL INJURY ACCIDENTS/OTHER',
    CrimeType: 'Personal Injury Accident',
    CrimeCategory: 'Accident',
  },
  4601: {
    STATUTDESC: 'DISASTER/EXPLOSION',
    CrimeType: 'Disaster',
    CrimeCategory: 'Emergency',
  },
  4602: {
    STATUTDESC: 'DISASTER/FLOOD',
    CrimeType: 'Disaster',
    CrimeCategory: 'Emergency',
  },
  4603: {
    STATUTDESC: 'DISASTER/OTHER',
    CrimeType: 'Disaster',
    CrimeCategory: 'Emergency',
  },
  4701: {
    STATUTDESC: 'PUBLIC HAZARD/NATURAL GAS LEAK',
    CrimeType: 'Public Hazard',
    CrimeCategory: 'Emergency',
  },
  4702: {
    STATUTDESC: 'PUBLIC HAZARD/CHEMICAL SPILLS',
    CrimeType: 'Public Hazard',
    CrimeCategory: 'Emergency',
  },
  4703: {
    STATUTDESC: 'PUBLIC HAZARD/DOWN POWER LINE',
    CrimeType: 'Public Hazard',
    CrimeCategory: 'Emergency',
  },
  4704: {
    STATUTDESC: 'PUBLIC HAZARD/TRAFFIC',
    CrimeType: 'Public Hazard',
    CrimeCategory: 'Emergency',
  },
  4705: {
    STATUTDESC: 'PUBLIC HAZARD/OTHER',
    CrimeType: 'Public Hazard',
    CrimeCategory: 'Emergency',
  },
  4706: {
    STATUTDESC: 'PUBLIC HAZARD/JUNKED MOTOR VEHICLE',
    CrimeType: 'Public Hazard',
    CrimeCategory: 'Emergency',
  },
  5001: {
    STATUTDESC: 'FIRE/RESIDENTIAL STRUCTURE (FIRE NOT ARSON)',
    CrimeType: 'Fire',
    CrimeCategory: 'Emergency',
  },
  5002: {
    STATUTDESC: 'FIRE/RESIDENTIAL STRUCTURE (FIRE ORIGIN UNKNOWN)',
    CrimeType: 'Fire',
    CrimeCategory: 'Emergency',
  },
  5003: {
    STATUTDESC: 'FIRE/OTHER STRUCTURE (FIRE NOT ARSON)',
    CrimeType: 'Fire',
    CrimeCategory: 'Emergency',
  },
  5004: {
    STATUTDESC: 'FIRE/VEHICLE (FIRE NOT ARSON)',
    CrimeType: 'Fire',
    CrimeCategory: 'Emergency',
  },
  5005: {
    STATUTDESC: 'FIRE/OTHER (FIRE NOT ARSON)',
    CrimeType: 'Fire',
    CrimeCategory: 'Emergency',
  },
  5012: {
    STATUTDESC: 'FIRE/BUSINESS STRUCTURE (FIRE ORIGIN UNKNOWN)',
    CrimeType: 'Fire',
    CrimeCategory: 'Emergency',
  },
  5013: {
    STATUTDESC: 'FIRE/OTHER STRUCTURE (FIRE ORIGIN UNKNOWN)',
    CrimeType: 'Fire',
    CrimeCategory: 'Emergency',
  },
  5014: {
    STATUTDESC: 'FIRE/VEHICLE (UNKNOWN ORIGIN)',
    CrimeType: 'Fire',
    CrimeCategory: 'Emergency',
  },
  5015: {
    STATUTDESC: 'FIRE/OTHER (UNKNOWN ORIGIN)',
    CrimeType: 'Fire',
    CrimeCategory: 'Emergency',
  },
  5101: {
    STATUTDESC: 'LOST/ADULT',
    CrimeType: 'Lost',
    CrimeCategory: 'Quality of Life',
  },
  5102: {
    STATUTDESC: 'LOST/ANIMAL',
    CrimeType: 'Lost',
    CrimeCategory: 'Quality of Life',
  },
  5103: {
    STATUTDESC: 'LOST/PROPERTY',
    CrimeType: 'Lost',
    CrimeCategory: 'Quality of Life',
  },
  5104: {
    STATUTDESC: 'LOST/JUVENILE',
    CrimeType: 'Lost',
    CrimeCategory: 'Quality of Life',
  },
  5201: {
    STATUTDESC: 'FOUND/ADULT',
    CrimeType: 'Found',
    CrimeCategory: 'Quality of Life',
  },
  5202: {
    STATUTDESC: 'FOUND ANIMAL',
    CrimeType: 'Found',
    CrimeCategory: 'Quality of Life',
  },
  5203: {
    STATUTDESC: 'FOUND/PROPERTY',
    CrimeType: 'Found',
    CrimeCategory: 'Quality of Life',
  },
  5204: {
    STATUTDESC: 'FOUND/JUVENILE',
    CrimeType: 'Found',
    CrimeCategory: 'Quality of Life',
  },
  5301: {
    STATUTDESC: 'PUBLIC ASSIST/MOTORIST',
    CrimeType: 'Public Assist',
    CrimeCategory: 'Assist',
  },
  5302: {
    STATUTDESC: 'PUBLIC ASSIST/DELIVER EMERGENCY MESSAGE',
    CrimeType: 'Public Assist',
    CrimeCategory: 'Assist',
  },
  5303: {
    STATUTDESC: 'PUBLIC ASSIST/CHECK WELFARE',
    CrimeType: 'Public Assist',
    CrimeCategory: 'Assist',
  },
  5304: {
    STATUTDESC: 'PUBLIC ASSIST/OTHER',
    CrimeType: 'Public Assist',
    CrimeCategory: 'Assist',
  },
  5401: {
    STATUTDESC: 'CIVIL MATTER/COURT ORDER ENFORCE',
    CrimeType: 'Civil Matter',
    CrimeCategory: 'Quality of Life',
  },
  5402: {
    STATUTDESC: 'CIVIL MATTER/PRESERVE THE PEACE',
    CrimeType: 'Civil Matter',
    CrimeCategory: 'Quality of Life',
  },
  5403: {
    STATUTDESC: 'CIVIL MATTER/OTHER',
    CrimeType: 'Civil Matter',
    CrimeCategory: 'Quality of Life',
  },
  5501: {
    STATUTDESC: 'FALSE ALARM/BUSINESS-HOLD UP',
    CrimeType: 'False Alarm',
    CrimeCategory: 'Quality of Life',
  },
  5502: {
    STATUTDESC: 'FALSE ALARM/BUSINESS-SILENT',
    CrimeType: 'False Alarm',
    CrimeCategory: 'Quality of Life',
  },
  5503: {
    STATUTDESC: 'FALSE ALARM/BUSINESS-AUDIBLE',
    CrimeType: 'False Alarm',
    CrimeCategory: 'Quality of Life',
  },
  5505: {
    STATUTDESC: 'FALSE ALARM/RESIDENTIAL-AUDIBLE',
    CrimeType: 'False Alarm',
    CrimeCategory: 'Quality of Life',
  },
  5506: {
    STATUTDESC: 'FALSE ALARM/OTHER',
    CrimeType: 'False Alarm',
    CrimeCategory: 'Quality of Life',
  },
  5601: {
    STATUTDESC: 'SUSPICIOUS ACTIVITY/VEHICLE',
    CrimeType: 'Suspicious Activity',
    CrimeCategory: 'Quality of Life',
  },
  5602: {
    STATUTDESC: 'SUSPICIOUS ACTIVITY/PERSON',
    CrimeType: 'Suspicious Activity',
    CrimeCategory: 'Quality of Life',
  },
  5603: {
    STATUTDESC: 'SUSPICIOUS ACTIVITY/OTHER',
    CrimeType: 'Suspicious Activity',
    CrimeCategory: 'Quality of Life',
  },
  5604: {
    STATUTDESC: 'SUSPICIOUS ACTIVITY/UNABLE TO LOCATE',
    CrimeType: 'Suspicious Activity',
    CrimeCategory: 'Quality of Life',
  },
  5701: {
    STATUTDESC: 'DISTURBANCE/UNABLE TO LOCATE',
    CrimeType: 'Disturbance',
    CrimeCategory: 'Quality of Life',
  },
  5702: {
    STATUTDESC: 'DISTURBANCE/NO COMPLAINANT',
    CrimeType: 'Disturbance',
    CrimeCategory: 'Quality of Life',
  },
  5703: {
    STATUTDESC: 'DISTURBANCE/NO CRIMINAL VIOLATION',
    CrimeType: 'Disturbance',
    CrimeCategory: 'Quality of Life',
  },
  5704: {
    STATUTDESC: 'DISTURBANCE/PEACE RESTORED',
    CrimeType: 'Disturbance',
    CrimeCategory: 'Quality of Life',
  },
  5705: {
    STATUTDESC: 'DISTURBANCE/OTHER',
    CrimeType: 'Disturbance',
    CrimeCategory: 'Quality of Life',
  },
  5801: {
    STATUTDESC: 'UNFOUNDED/NO BONAFIDE INCIDENT',
    CrimeType: 'Unfounded',
    CrimeCategory: 'Other',
  },
  5802: {
    STATUTDESC: 'UNFOUNDED/NO VICTIM OR WITNESS FOUND',
    CrimeType: 'Unfounded',
    CrimeCategory: 'Other',
  },
  5803: {
    STATUTDESC: 'UNFOUNDED/NO SUCH ADDRESS',
    CrimeType: 'Unfounded',
    CrimeCategory: 'Other',
  },
  6001: {
    STATUTDESC: 'ASSIST OTHER AGENCY/MUNICIPAL CRIMINAL JUSTICE',
    CrimeType: 'Assist Other Agency/Jurisdiction',
    CrimeCategory: 'Assist',
  },
  6002: {
    STATUTDESC: 'ASSIST OTHER AGENCY/COUNTY CRIMINAL JUSTICE',
    CrimeType: 'Assist Other Agency/Jurisdiction',
    CrimeCategory: 'Assist',
  },
  6003: {
    STATUTDESC: 'ASSIST OTHER AGENCY/STATE CRIMINAL JUSTICE',
    CrimeType: 'Assist Other Agency/Jurisdiction',
    CrimeCategory: 'Assist',
  },
  6004: {
    STATUTDESC: 'ASSIST OTHER AGENCY/FEDERAL CRIMINAL JUSTICE',
    CrimeType: 'Assist Other Agency/Jurisdiction',
    CrimeCategory: 'Assist',
  },
  6005: {
    STATUTDESC: 'ASSIST OTHER AGENCY/OTHER',
    CrimeType: 'Assist Other Agency/Jurisdiction',
    CrimeCategory: 'Assist',
  },
  6006: {
    STATUTDESC: 'ASSIST OTHER AGENCY/IMMIGRATION AUTHORITY',
    CrimeType: 'Assist Other Agency/Jurisdiction',
    CrimeCategory: 'Assist',
  },
  6101: {
    STATUTDESC: 'MISCELLANEOUS/OFFICER',
    CrimeType: 'Miscellaneous',
    CrimeCategory: 'Other',
  },
  6102: {
    STATUTDESC: 'MISCELLANEOUS/PUBLIC',
    CrimeType: 'Miscellaneous',
    CrimeCategory: 'Other',
  },
  6103: {
    STATUTDESC: 'MISCELLANEOUS/PRISONER TRANSPORT - JAIL',
    CrimeType: 'Miscellaneous',
    CrimeCategory: 'Other',
  },
  6105: {
    STATUTDESC: 'MISCELLANEOUS/EXAM NO CRIMINAL PROSECUTION',
    CrimeType: 'Miscellaneous',
    CrimeCategory: 'Other',
  },
  6106: {
    STATUTDESC: 'MISCELLANEOUS/OPERATION DEEP FREEZE',
    CrimeType: 'Miscellaneous',
    CrimeCategory: 'Other',
  },
  7004: {
    STATUTDESC: 'IMMIGRATION/BORDER PATROL CONTACTED RESPONDED',
    CrimeType: 'Immigration',
    CrimeCategory: 'Quality of Life',
  },
  7101: {
    STATUTDESC: 'HUMAN TRAFFICKING/COMMERCIAL SEX ACTS',
    CrimeType: 'Human Trafficking',
    CrimeCategory: 'Violent',
  },
  '0604': {
    STATUTDESC: 'LARCENY/FROM MOTOR VEHICLE',
    CrimeType: 'Larceny',
    CrimeCategory: 'Property',
  },
  '0603': {
    STATUTDESC: 'LARCENY/SHOPLIFTING',
    CrimeType: 'Larceny',
    CrimeCategory: 'Property',
  },
  '0610': {
    STATUTDESC: 'LARCENY/ALL OTHERS',
    CrimeType: 'Larceny',
    CrimeCategory: 'Property',
  },
  '0607': {
    STATUTDESC: 'LARCENY/FROM RESIDENCE',
    CrimeType: 'Larceny',
    CrimeCategory: 'Property',
  },
  '0902': {
    STATUTDESC: 'ASSAULT/NO INJURY',
    CrimeType: 'Assault',
    CrimeCategory: 'Violent',
  },
  '0901': {
    STATUTDESC: 'ASSAULT/MINOR INJURY',
    CrimeType: 'Assault',
    CrimeCategory: 'Violent',
  },
  '0701': {
    STATUTDESC: 'GTA/STOLEN',
    CrimeType: 'MV Theft',
    CrimeCategory: 'Property',
  },
  '0911': {
    STATUTDESC: 'ASSAULT/MINOR INJURY-DOMESTIC VIOLENCE',
    CrimeType: 'Assault',
    CrimeCategory: 'Violent',
  },
  '0402': {
    STATUTDESC: 'ASSAULT, AGGRAVATED/PEACE OFFICER (NON-SERIOUS INJ)',
    CrimeType: 'Agg. Assault',
    CrimeCategory: 'Violent',
  },
  '0502': {
    STATUTDESC: 'BURGLARY/UNLAWFUL ENTRY - NO FORCE',
    CrimeType: 'Burglary',
    CrimeCategory: 'Property',
  },
  '0608': {
    STATUTDESC: 'LARCENY/FROM BUILDING OPEN TO THE PUBLIC',
    CrimeType: 'Larceny',
    CrimeCategory: 'Property',
  },
  '0606': {
    STATUTDESC: 'LARCENY/BICYCLES',
    CrimeType: 'Larceny',
    CrimeCategory: 'Property',
  },
  '0501': {
    STATUTDESC: 'BURGLARY/FORCIBLE ENTRY',
    CrimeType: 'Burglary',
    CrimeCategory: 'Property',
  },
  '0605': {
    STATUTDESC: 'LARCENY/AUTO PARTS & ACCESSORIES',
    CrimeType: 'Larceny',
    CrimeCategory: 'Property',
  },
  '0912': {
    STATUTDESC: 'ASSAULT/NO INJURY - DOMESTIC VIOLENCE',
    CrimeType: 'Assault',
    CrimeCategory: 'Violent',
  },
  '0704': {
    STATUTDESC: 'GTA/RECOVERY FOR OTHR JURISDICTION',
    CrimeType: 'Other',
    CrimeCategory: 'Property',
  },
  '0201': {
    STATUTDESC: 'SEXUAL ASSAULT/FORCIBLE RAPE',
    CrimeType: 'Sex Assault',
    CrimeCategory: 'Violent',
  },
  '0503': {
    STATUTDESC: 'BURGLARY/ATTEMPTED FORCIBLE ENTRY',
    CrimeType: 'Burglary',
    CrimeCategory: 'Property',
  },
  '0413': {
    STATUTDESC: 'ASSAULT, AGGRAVATED/OTHER - DOMESTIC VIOLENCE',
    CrimeType: 'Agg. Assault',
    CrimeCategory: 'Violent',
  },
  '0601': {
    STATUTDESC: 'LARCENY/POCKET PICKING',
    CrimeType: 'Larceny',
    CrimeCategory: 'Property',
  },
  '0301': {
    STATUTDESC: 'ROBBERY/HIGHWAY',
    CrimeType: 'Robbery',
    CrimeCategory: 'Violent',
  },
  '0304': {
    STATUTDESC: 'ROBBERY/CONVENIENCE STORE',
    CrimeType: 'Robbery',
    CrimeCategory: 'Violent',
  },
  '0403': {
    STATUTDESC: 'ASSAULT, AGGRAVATED/OTHER',
    CrimeType: 'Agg. Assault',
    CrimeCategory: 'Violent',
  },
  '0802': {
    STATUTDESC: 'ARSON/BUSINESS STRUCTURE',
    CrimeType: 'Arson',
    CrimeCategory: 'Property',
  },
  '0203': {
    STATUTDESC: 'SEXUAL ASSAULT/ATTEMPTED RAPE',
    CrimeType: 'Sex Assault',
    CrimeCategory: 'Violent',
  },
  '0609': {
    STATUTDESC: 'LARCENY/FROM ANY COIN OPERATED MACHINE',
    CrimeType: 'Larceny',
    CrimeCategory: 'Property',
  },
  '0805': {
    STATUTDESC: 'ARSON/OTHER',
    CrimeType: 'Arson',
    CrimeCategory: 'Property',
  },
  '0611': {
    STATUTDESC: 'LARCENY/METAL THEFT',
    CrimeType: 'Larceny',
    CrimeCategory: 'Property',
  },
  '0307': {
    STATUTDESC: 'ROBBERY/MISCELLANEOUS',
    CrimeType: 'Robbery',
    CrimeCategory: 'Violent',
  },
  '0302': {
    STATUTDESC: 'ROBBERY/COMMERCIAL HOUSE',
    CrimeType: 'Robbery',
    CrimeCategory: 'Violent',
  },
  '0305': {
    STATUTDESC: 'ROBBERY/RESIDENCE',
    CrimeType: 'Robbery',
    CrimeCategory: 'Violent',
  },
  '0308': {
    STATUTDESC: 'ROBBERY/CARJACKING',
    CrimeType: 'Robbery',
    CrimeCategory: 'Violent',
  },
  '0303': {
    STATUTDESC: 'ROBBERY/SERVICE STATION',
    CrimeType: 'Robbery',
    CrimeCategory: 'Violent',
  },
  '0703': {
    STATUTDESC: 'GTA/RECOVERY',
    CrimeType: 'MV Theft - Recovery',
    CrimeCategory: 'Property',
  },
  '0804': {
    STATUTDESC: 'ARSON/VEHICLE',
    CrimeType: 'Arson',
    CrimeCategory: 'Property',
  },
  '0101': {
    STATUTDESC: 'HOMICIDE/MURDER',
    CrimeType: 'Homicide',
    CrimeCategory: 'Violent',
  },
  '0404': {
    STATUTDESC: 'ASSAULT, AGGRAVATED/DRIVEBY SHOOTING',
    CrimeType: 'Agg. Assault',
    CrimeCategory: 'Violent',
  },
  '0306': {
    STATUTDESC: 'ROBBERY/BANKS',
    CrimeType: 'Robbery',
    CrimeCategory: 'Violent',
  },
  '0602': {
    STATUTDESC: 'LARCENY/PURSE SNATCHING',
    CrimeType: 'Larceny',
    CrimeCategory: 'Property',
  },
  '0801': {
    STATUTDESC: 'ARSON/RESIDENTIAL STRUCTURE',
    CrimeType: 'Arson',
    CrimeCategory: 'Property',
  },
  '0102': {
    STATUTDESC: 'HOMICIDE/MANSLAUGHTER',
    CrimeType: 'Homicide',
    CrimeCategory: 'Violent',
  },
  '0803': {
    STATUTDESC: 'ARSON/OTHER STRUCTURE',
    CrimeType: 'Arson',
    CrimeCategory: 'Property',
  },
  '0401': {
    STATUTDESC: 'ASSAULT, AGGRAVATED/PEACE OFFICER (SERIOUS INJURY)',
    CrimeType: 'Agg. Assault',
    CrimeCategory: 'Violent',
  },
};

// csv combined original and merged geojson api
// parseStream.on('data', function (pojo) {
//   // => receive reconstructed POJO
//   let output = { type: 'FeatureCollection', features: [] };
//   output.features = pojo.features.map((d) => {
//     return {
//       properties: {
//         id: d.properties.objectid_1,
//         // date: d.properties.ACTDATE,
//         year: d.properties.ACT_YEAR,
//         // fullDate: d.properties.ACTDATETIME,
//         //eventTypeCode: d.properties.NATURECODE,
//         eventType: d.properties.NatureCodeDesc,
//       },
//       geometry: d.geometry,
//     };
//   });
//   console.log(JSON.stringify(output));
// });

//api geojson for incidents data
parseStream.on('data', function (pojo) {
  //console.log('got data---', data);
  let output = { type: 'FeatureCollection', features: [] };
  output.features = pojo.features
    .map((d, i) => {
      // if (
      //   // uniqueCrimeObj[d.properties.OFFENSE] ||
      //   // d.geometry ||
      //   uniqueCrimeObj[d.properties.OFFENSE].CrimeType ||
      //   uniqueCrimeObj[d.properties.OFFENSE].CrimeCategory
      // ) {
      //if (i % 2 == 0) {
      return {
        type: 'Feature',
        properties: {
          id: d.properties.OBJECTID,
          // date: d.properties.ACTDATE,
          //year: d.properties.YEAR_REPT,
          // fullDate: d.properties.ACTDATETIME,
          year: d.properties.DATE_OCCU.substring(0, 4),
          eventCode: d.properties.OFFENSE,
          eventType: d.properties.STATUTDESC,
          crimeType: uniqueCrimeObj[d.properties.OFFENSE]
            ? uniqueCrimeObj[d.properties.OFFENSE].CrimeType
            : 'NOTYPE',
          crimeCategory: uniqueCrimeObj[d.properties.OFFENSE]
            ? uniqueCrimeObj[d.properties.OFFENSE].CrimeCategory
            : 'NOCATEGORY',
        },
        geometry: d.geometry,
      };
      // }
    })
    .filter((d) => d.geometry);
  //.filter((d) => uniqueCrimeObj[d.properties.OFFENSE].CrimeType);

  console.log(JSON.stringify(output));
});

//esri geojson
// parseStream.on('data', function (pojo) {
//   // => receive reconstructed POJO
//   let output = { type: 'FeatureCollection', features: [] };
//   output.features = pojo.features.map((d) => {
//     return {
//       properties: {
//         id: d.attributes.OBJECTID,
//         // date: d.properties.ACTDATE,
//         year: d.attributes.YEAR_REPT,
//         // fullDate: d.properties.ACTDATETIME,
//         eventType: d.attributes.CrimeType,
//       },
//       geometry: d.geometry,
//     };
//   });
//   console.log(JSON.stringify(output));
// });

readStream.pipe(parseStream);
