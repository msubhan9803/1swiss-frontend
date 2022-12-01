import React, { useEffect, useRef } from 'react'
import Member from './common/Member';
import Contract from './common/Contract';
import Needs from './common/Needs';
import ContactInfo from './common/ContactInfo';
import Final from './common/Final';
import MainLayout from 'layout/MainLayout';
import useContractForm from 'hooks/useContractForm';
import PoliciesLoading from 'components/PoliciesLoading';
import PartnerInfo from './common/PartnerInfo.js';
import ChildrenInfo from './common/ChildrenInfo';
import useGenericForm from 'hooks/useGenericForm';

export default function Home() {
  const memberLevelStep2Ref = useRef(null);
  const memberLevelStep4ContinueBtn = useRef(null);
  const contractLevelStepRef = useRef(null);
  const contactInfoLevelStepRef = useRef(null);

  const errorRef = {
    postalCodeRef: useRef(null),
  };

  const {
    levels,
    subscriberState,
    loadingPolicies
  } = useContractForm(
    contractLevelStepRef);
  const { setupErrorReferences, goBackFromLoading } = useGenericForm();

  useEffect(() => {
    setupErrorReferences(errorRef);
  }, []);

  return (
    <>
      {
        loadingPolicies ?
          <PoliciesLoading goBackFromLoading={goBackFromLoading} />
          : (
            <MainLayout>
              <Member
                memberLevelStep2Ref={memberLevelStep2Ref}
                memberLevelStep4ContinueBtn={memberLevelStep4ContinueBtn}
              />

              {
                levels.partner.show && (
                  <PartnerInfo />
                )
              }

              {
                levels.children.show && (
                  <ChildrenInfo />
                )
              }

              {
                levels.contract.show && (
                  <Contract
                    state={subscriberState}
                    contractLevelStepRef={contractLevelStepRef}
                  />
                )
              }

              {
                levels.needs.show && (
                  <Needs
                    state={subscriberState}
                  />
                )
              }

              {
                levels.contactInformation.show && (
                  <ContactInfo
                    state={subscriberState}
                    contactInfoLevelStepRef={contactInfoLevelStepRef}
                  />
                )
              }

              {
                levels.final.show && (
                  <Final
                    state={subscriberState}
                  />
                )
              }
            </MainLayout>
          )
      }
    </>
  )
}
