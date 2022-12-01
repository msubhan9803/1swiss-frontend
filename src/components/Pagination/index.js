



import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Pagination({ recordsCount, pageIndex, recordsPerPage, handler }) {

    const pagesCount = Math.ceil(recordsCount / recordsPerPage);

    const pager = () => {










        let pagination = [], i = 1;

        while (i <= recordsCount) {
            if (i <= 3 || //the first three pages
                i >= recordsCount - 2 || //the last three pages
                i >= pageIndex - 1 && i <= pageIndex + 1) { //the pageIndex, the page before and after
                pagination.push({
                    elem: <a>{i}</a>,
                    index: i
                });
                i++;
            } else { //any other page should be represented by ...
                pagination.push({
                    elem: <div>...</div>,
                    index: i
                });
                //jump to the next page to be linked in the navigation
                i = i < pageIndex ? pageIndex - 1 : recordsCount - 2;
            }
        }
        console.log("pagination; ", pagination)
        return pagination;
    }

    return (
        <div className="ltn__pagination-area text-center my-8">
            {recordsCount > 0 ?
                <div className="ltn__pagination">
                    <ul>
                        {pageIndex !== 1 &&
                            <li>
                                <a role="button" onClick={() => handler(pageIndex - 1)}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </a>
                            </li>
                        }
                        {
                            [...Array(pagesCount)]?.map((elementInArray, index) => {
                                if (index < pageIndex + 3 && index > pageIndex - 5) {
                                    return (
                                        <li key={index} className={pageIndex === index + 1 && "active"}>
                                            <a onClick={() => handler(index + 1)} role="button">{index + 1}</a>
                                        </li>
                                    )
                                }
                            })}

                        {pageIndex !== pagesCount &&
                            <li>
                                <a role="button" onClick={() => handler(pageIndex + 1)}>
                                    <FontAwesomeIcon icon={faChevronRight} />

                                </a>
                            </li>
                        }

                    </ul>
                </div>
                : ""}
        </div>)
}

export default Pagination;