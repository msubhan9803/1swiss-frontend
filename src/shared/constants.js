/* eslint-disable react-hooks/exhaustive-deps */
import { Animated } from "react-animated-css";
import MemberLevelStep1 from 'components/WizardLevels/Members/Step1';
import MemberLevelStep2 from 'components/WizardLevels/Members/Step2';
import MemberLevelStep3 from 'components/WizardLevels/Members/Step3';
import MemberLevelStep4 from 'components/WizardLevels/Members/Step4';
import MemberLevelStep5 from 'components/WizardLevels/Members/Step5';
import MemberLevelStep6 from 'components/WizardLevels/Members/Step6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

export const scoreValues = {
    Minimum: 1,
    Moyen: 2,
    Fort: 3,
    Maximum: 4
}

export const sideProgressTrackerList = [
    "Adhérents",
    "Contrat",
    "Besoins",
    "Coordonnées",
]
export const subscriptionForList = [
    {
        imgSrc: "img/people@2x.png",
        title: "Un adulte",
        hasPartner: false,
        hasChildren: false,
        width: 20,
        height: 20,
    },
    {
        imgSrc: "img/people-1@2x.png",
        title: "Un adulte + enfant(s)",
        hasPartner: false,
        hasChildren: true,
        width: 50,
        height: 50,
    },
    {
        imgSrc: "img/people-1@2x.png",
        title: "Un couple",
        hasPartner: true,
        hasChildren: false,
        width: 50,
        height: 50,
    },
    {
        imgSrc: "img/union-1@2x.png",
        title: "Un couple + enfant(s)",
        hasPartner: true,
        hasChildren: true,
        width: 60,
        height: 60,
    }
]
export const genderList = [
    {
        title: "Un homme",
        value: "Homme",
        width: 20,
        height: 20,
        icon: <FontAwesomeIcon icon={faMars} size='2x' color='#d5d5d5' />,
    },
    {
        title: "Une femme",
        value: "Femme",
        width: 50,
        height: 50,
        icon: <FontAwesomeIcon icon={faVenus} size='2x' color='#d5d5d5' />,
    },
]

export const getMemberStepComponent = (
    step,
    subscriberState,
    _handleSecondStepChange,
    memberLevelStep2Ref,
    handleSubscriberFieldUpdate,
    _hanldeDobInput,
    _handleDobContinue,
    errors,
    memberLevelStep4ContinueBtn,
    _handleProfessionContinue,
    _handleSocialContinue,
    _handleRevertToFirstStep
) => {
    switch (step) {
        case 2:
            return (
                <>
                    <Animated
                        animationIn="bounceInRight"
                        animationOut="bounceOutDown"
                        animationInDuration={1000}
                        animationOutDuration={1000}
                        className="animated-custom"
                        style={{
                            "-webkit-transform-origin": "100% 50%"
                        }}
                    >
                        <MemberLevelStep2
                            state={subscriberState}
                            handleSubscriberFieldUpdate={_handleSecondStepChange}
                        />
                    </Animated>
                    <span className='mt-10' ref={memberLevelStep2Ref}></span>
                </>
            )

        case 3:
            return (
                <Animated
                    animationIn="bounceInRight"
                    animationOut="bounceOutDown"
                    animationInDuration={1000}
                    animationOutDuration={1000}
                    className="animated-custom"
                    style={{
                        "-webkit-transform-origin": "100% 50%"
                    }}
                >
                    <MemberLevelStep3
                        state={subscriberState.dateOfBirth}
                        _hanldeDobInput={_hanldeDobInput}
                        _handleDobContinue={_handleDobContinue}
                        errors={errors.dateOfBirth}
                    />
                </Animated>
            )

        case 4:
            return (
                <>
                    <Animated
                        animationIn="bounceInRight"
                        animationOut="bounceOutDown"
                        animationInDuration={1000}
                        animationOutDuration={1000}
                        className="animated-custom"
                        style={{
                            "-webkit-transform-origin": "100% 50%"
                        }}
                    >
                        <MemberLevelStep4
                            state={subscriberState}
                            _hanldeDobInput={_hanldeDobInput}
                            _handleProfessionContinue={_handleProfessionContinue}
                            errors={errors.dateOfBirth}
                            handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
                        />
                    </Animated>
                    <span className='mt-10' ref={memberLevelStep4ContinueBtn}></span>
                </>
            )

        case 5:
            return (
                <Animated
                    animationIn="bounceInRight"
                    animationOut="bounceOutDown"
                    animationInDuration={1000}
                    animationOutDuration={1000}
                    className="animated-custom"
                    style={{
                        "-webkit-transform-origin": "100% 50%"
                    }}
                >
                    <MemberLevelStep5
                        state={subscriberState}
                        _hanldeDobInput={_hanldeDobInput}
                        _handleSocialContinue={_handleSocialContinue}
                        errors={errors.dateOfBirth}
                        handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
                    />
                </Animated>
            )

        case 6:
            return (
                <>
                    <Animated
                        animationIn="bounceInRight"
                        animationOut="bounceOutDown"
                        animationInDuration={1000}
                        animationOutDuration={1000}
                        className="animated-custom"
                        style={{
                            "-webkit-transform-origin": "100% 50%"
                        }}
                    >
                        <MemberLevelStep6
                            state={subscriberState}
                            _handleRevertToFirstStep={_handleRevertToFirstStep}
                        />
                    </Animated>
                </>
            )

        default:
            break;
    }
}

export const professionList = [
    "Salarié(e) non-cadre",
    "Recherche d'emploi",
    "Retraité(e)",
    "Sans profession",
    "Salarié(e) cadre",
    "Enseignant(e)",
    "Fonctionnaire d'état",
    "Fonctionnaire territorial",
    "Fonctionnaire hospitalier",
    "Chef(fe) d'entreprise",
    "Commerçant(e)",
    "Artisan",
    "Agriculteur(trice)",
    "Profession libérale",
    "Etudiant(e)",
]

export const socialPlanList = [
    "Général",
    "Travailleur Non Salarié",
    "Agricole",
    "Alsace-Moselle",
]

export const currentlyInsuredList = [
    "Oui",
    "Non"
];

export const offerRatesApprovalOptions = [
    "Oui, ça m'intéresse",
    "Non merci !"
];

export const newsletterOptions = [
    "Oui",
    "Non"
];

export const childrenList = [
    {
        title: "Un(e) seul(e)",
        value: 1
    },
    {
        title: "Deux",
        value: 2
    },
    {
        title: "Trois",
        value: 3
    },
    {
        title: "Quatre",
        value: 4
    },
    {
        title: "Cinq",
        value: 5
    },
    {
        title: "Six",
        value: 6
    },
    {
        title: "Sept",
        value: 7
    },
    {
        title: "Huit",
        value: 8
    },
    {
        title: "Neuf",
        value: 9
    },
]

export const isAllChildrenProfessionSame = [
    "Oui",
    "Non"
];

export const siteContactConfig = {
    phoneNumber: "01 84 60 00 20",
    mondayToFriday: "9AM to 7pm",
    saturday: "9AM to 7pm",
}

export const familySituation = [
    "Célibataire",
    "Concubin(e)",
    "Divorcé(e)",
    "Veuf(ve)",
    "Marié(e)",
    "Pacsé(e)",
]

export const departmentOfBirth = [
    "Aïn",
    "aisne",
    "Combine",
    "Alpes de Haute Provence",
    "Alpes-Maritimes",
    "Ardeche",
    "Ardennes",
    "Ariege",
    "Dawn",
    "Aude",
    "Aveyron",
    "Lower Rhine",
    "Bouches du Rhone",
    "Calvados",
    "Cantal",
    "Charente",
    "Charente Maritime",
    "Expensive",
    "Correze",
    "South Corsica",
    "Golden Coast",
    "Cotes d'Armor",
    "Dig",
    "Two Sevres",
    "Dordogne",
    "Doubs",
    "Drome",
    "Essone",
    "Eure",
    "Eure and Loir",
    "Finistere",
    "Gard",
    "Gers",
    "Gironde",
    "High Rhine",
    "Upper Corsica",
    "Upper Garonne",
    "Upper Loire",
    "High Marne",
    "Haute-Savoie",
    "Upper Vienna",
    "High mountains",
    "Hautes Pyrenees",
    "Hauts de Seine",
    "Herault",
    "Ille et Vilaine",
    "Indre",
    "Indre and Loire",
    "Isere",
    "Jura",
    "Landes",
    "Loire",
    "loire Atlantique",
    "Loir and Cher",
    "Loiret",
    "Batch",
    "Lot and Garonne",
    "Lozere",
    "Maine and Loire",
    "Sleeve",
    "Marl",
    "Mayenne",
    "Meurthe and Moselle",
    "Meuse",
    "Morbihan",
    "Moselle",
    "Nievre",
    "North",
    "oise",
    "adorns",
    "Paris",
    "Pas de Calais",
    "Puy de Dome",
    "Atlantic Pyrenees",
    "Eastern Pyrenees",
    "Rhone",
    "Metropolis of Lyon",
    "Saone and Loire",
    "Haute Saone",
    "Sarthe",
    "Savoy",
    "Seine et Marne",
    "Seine-Maritime",
    "Seine-Saint-Denis",
    "Sum",
    "Tarn",
    "Tarn and Garonne",
    "Territory of Belfort",
    "Val d'Oise",
    "Val de Marne",
    "Var",
    "Vaucluse",
    "Vendee",
    "Vienna",
    "Vosges",
    "Yonne",
    "Yvelines"
]