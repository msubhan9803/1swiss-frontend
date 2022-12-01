import React, { useState } from 'react'
import Subtitle from 'components/Subtitle';
import { isAllChildrenProfessionSame, childrenList } from 'shared/constants';
import TextView from 'components/controls/TextView';
import TextView2 from 'components/controls/TextView2';

export default function Step1({
    handleNumOfChildren,
    numOfChildren,
    isAllChildrensProffessionSame,
    errors,
    handleIsAllChildrenSame,
    handleContinue
}) {
    const [showAll, setShowAll] = useState(false);

    return (
        <>
            <Subtitle
                subtitle="Combien d'enfants avez-vous ?"
            />

            <div className='px-2 mt-4'>
                {
                    !showAll ?
                        childrenList.slice(0, 4).map((elem, index) => (
                            <TextView
                                key={index}
                                name="professionOrActivity"
                                text={elem.title}
                                selected={numOfChildren === elem.value}
                                handleSubscriberFieldUpdate={() => handleNumOfChildren(elem.value)}
                            />
                        ))
                        : childrenList.map((elem, index) => (
                            <TextView
                                key={index}
                                name="professionOrActivity"
                                text={elem.title}
                                selected={numOfChildren === elem.value}
                                handleSubscriberFieldUpdate={() => handleNumOfChildren(elem.value)}
                            />
                        ))
                }
                {
                    !showAll && (
                        <TextView2
                            key={Math.random()}
                            text="Voir plus..."
                            onClickHandler={() => setShowAll(!showAll)}
                            className="justify-center"
                        />
                    )
                }
                {errors.NumOfChildren && <p className='text-red-400'>{errors.NumOfChildren}</p>}
            </div>

            <div className='text-center my-4'>
                <button
                    className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                    onClick={handleContinue}
                >
                    Continuer
                </button>
            </div>
        </>
    )
}
