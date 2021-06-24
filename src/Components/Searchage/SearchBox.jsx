import React from 'react';

import {
    connectSearchBox,
    VoiceSearch,
    connectCurrentRefinements
} from 'react-instantsearch-dom';

import uniqBy from 'lodash.uniqby';

const SearchBox = ({ currentRefinement, refine }) => {
    return (
        <div>
            <div className="searchBox-wrapper">
                <input
                    type="search"
                    value={currentRefinement}
                    onChange={event => refine(event.currentTarget.value)}
                    placeholder="Search..."
                />
                <VoiceSearch searchAsYouSpeak={false} />
            </div>
            <CustomCurrentRefinements />
        </div>
    );
};

// const CurrentRefinements = ({ items }) => (
//     <ul className="refinement-content">
//         {items.map(item => (
//             <li className="refinement-item" key={item.label}>
//                 {item.items ? (
//                     <React.Fragment>
//                         <h3>{item.label}</h3>
//                         <ul className="refinement-results">
//                             {item.items.map(nested => (
//                                 <li key={nested.label}>
//                                     <a className="refinement-filter" href="#">
//                                         {nested.label}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </React.Fragment>
//                 ) : (
//                     <a href="#">{item.label}</a>
//                 )}
//             </li>
//         ))}
//     </ul>
// );

const CurrentRefinements = ({ items, refine }) => {
    console.log('Current refinement', items);
    const unique = uniqBy(items, 'currentRefinement');

    return (
        <ul className="refinement-content">
            {unique.map(item => (
                <li className="refinement-item" key={item.label}>
                    {item.items ? (
                        <React.Fragment>
                            <h3>{item.label}</h3>
                            <ul className="refinement-results">
                                {item.items.map(nested => (
                                    <li key={nested.label}>
                                        <a
                                            className="refinement-filter"
                                            href="#"
                                            onClick={event => {
                                                event.preventDefault();
                                                refine(nested.value);
                                            }}
                                        >
                                            {nested.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </React.Fragment>
                    ) : (
                        <a
                            href="#"
                            onClick={event => {
                                event.preventDefault();
                                refine(item.value);
                            }}
                        >
                            {item.label}
                        </a>
                    )}
                </li>
            ))}
        </ul>
    );
};

const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements);

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
