import React, { useState, useEffect } from 'react';
import './MusicMain.css';
import collaboratorsData from './collaborators.json';

const Collaborators = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);
    const [columns, setColumns] = useState(window.innerWidth < 768 ? 1 : 3);

    useEffect(() => {
        const handleResize = () => {
            setColumns(window.innerWidth < 768 ? 1 : 3);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Group collaborators into rows based on the columns value.
    const rows = [];
    for (let i = 0; i < collaboratorsData.length; i += columns) {
        rows.push(collaboratorsData.slice(i, i + columns));
    }

    const handleCollabClick = (globalIndex) => {
        if (selectedIndex === globalIndex) {
            setSelectedIndex(null);
        } else {
            setSelectedIndex(globalIndex);
            setCurrentPage(0);
        }
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (selectedIndex === null) return;
        if (currentPage > 0) {
            setSlideDirection("prev");
            setCurrentPage((prev) => Math.max(prev - 1, 0));
        }
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (selectedIndex === null) return;
        const pages = collaboratorsData[selectedIndex].pages || [];
        if (currentPage < pages.length - 1) {
            setSlideDirection("next");
            setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
        }
    };

    // Clear slideDirection after animation duration
    useEffect(() => {
        if (slideDirection) {
            const timer = setTimeout(() => setSlideDirection(null), 300);
            return () => clearTimeout(timer);
        }
    }, [slideDirection]);

    return (
        <div className="collaborators-container">
            {rows.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    <div className="collab-grid">
                        {row.map((collab, index) => {
                            const globalIndex = rowIndex * columns + index;
                            return (
                                <div
                                    key={collab.id}
                                    className="collab-item"
                                    onClick={() => handleCollabClick(globalIndex)}
                                >
                                    <img src={collab.img} alt={collab.name} />
                                    <div className="collab-item-name">{collab.name}</div>
                                    <div className="collab-item-role">{collab.role}</div>
                                </div>
                            );
                        })}
                    </div>
                    {selectedIndex !== null &&
                        Math.floor(selectedIndex / columns) === rowIndex && (
                            <div className="collab-expanded-row">
                                <div className="collab-expanded">
                                    {columns > 1 ? (
                                        <>
                                            <div className="collab-nav-arrow left" onClick={handlePrev}>
                                                &#9664;
                                            </div>
                                            <div className={`slide-container ${slideDirection ? "slide-" + slideDirection : ""}`}>
                                                {(() => {
                                                    const currentPageData = collaboratorsData[selectedIndex].pages[currentPage];
                                                    const currentImageSource = currentPageData.img
                                                        ? currentPageData.img
                                                        : collaboratorsData[selectedIndex].detailImg;
                                                    return (
                                                        <>
                                                            <img
                                                                src={currentImageSource}
                                                                alt={collaboratorsData[selectedIndex].name}
                                                            />
                                                            <div className="collab-expanded-text">
                                                                <div className="collab-header">
                                                                    <h3>
                                                                        {currentPageData.title || collaboratorsData[selectedIndex].name}
                                                                    </h3>
                                                                </div>
                                                                {currentPageData.socialLinks && (
                                                                    <div className="collab-social-links">
                                                                        {Object.keys(currentPageData.socialLinks).map(platform => (
                                                                            <a key={platform}
                                                                               href={currentPageData.socialLinks[platform]}
                                                                               target="_blank"
                                                                               rel="noopener noreferrer">
                                                                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                                                            </a>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                <p>
                                                                    {currentPageData.content || collaboratorsData[selectedIndex].description}
                                                                </p>
                                                            </div>
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                            <div className="collab-nav-arrow right" onClick={handleNext}>
                                                &#9654;
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={`slide-container ${slideDirection ? "slide-" + slideDirection : ""}`}>
                                                {(() => {
                                                    const currentPageData = collaboratorsData[selectedIndex].pages[currentPage];
                                                    const currentImageSource = currentPageData.img
                                                        ? currentPageData.img
                                                        : collaboratorsData[selectedIndex].detailImg;
                                                    return (
                                                        <>
                                                            <img
                                                                src={currentImageSource}
                                                                alt={collaboratorsData[selectedIndex].name}
                                                            />
                                                            <div className="collab-expanded-text">
                                                                <div className="collab-header">
                                                                    <h3>
                                                                        {currentPageData.title || collaboratorsData[selectedIndex].name}
                                                                    </h3>
                                                                </div>
                                                                {currentPageData.socialLinks && (
                                                                    <div className="collab-social-links">
                                                                        {Object.keys(currentPageData.socialLinks).map(platform => (
                                                                            <a key={platform}
                                                                               href={currentPageData.socialLinks[platform]}
                                                                               target="_blank"
                                                                               rel="noopener noreferrer">
                                                                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                                                            </a>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                <p>
                                                                    {currentPageData.content || collaboratorsData[selectedIndex].description}
                                                                </p>
                                                            </div>
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                            <div className="collab-nav-arrows-mobile">
                                                <div className="collab-nav-arrow" onClick={handlePrev}>
                                                    &#9664;
                                                </div>
                                                <div className="collab-nav-arrow" onClick={handleNext}>
                                                    &#9654;
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Collaborators;