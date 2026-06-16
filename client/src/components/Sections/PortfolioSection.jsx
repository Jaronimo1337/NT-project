import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { API_URL } from '../../config/api';

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%239ca3af'%3E%F0%9F%8F%A0%3C/text%3E%3C/svg%3E";

const HouseCard = ({ house, delay, index, onClick }) => {
  const firstImage = house.images && house.images.length > 0 ? house.images[0] : null;
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return PLACEHOLDER;
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/')) return `${API_URL}${imageUrl}`;
    return `${API_URL}/uploads/houses/${imageUrl}`;
  };

const imageSrc = firstImage ? getImageUrl(firstImage.imageUrl) : PLACEHOLDER;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('lt-LT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'parduodamas': return 'bg-green-600';
      case 'rezervuotas': return 'bg-orange-600';
      case 'parduotas': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'parduodamas': return 'Parduodamas';
      case 'rezervuotas': return 'Rezervuotas';
      case 'parduotas': return 'Parduotas';
      default: return status;
    }
  };

  return (
    <div
      className="house-card group relative overflow-hidden rounded-lg shadow-lg animate-fade-in-up h-64 sm:h-72 lg:h-80 cursor-pointer transform transition-transform hover:scale-105"
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
    >
      <img
        src={imageSrc}
        alt={house.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => { e.target.src = PLACEHOLDER; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end mobile-p-4 p-4 sm:p-6 transition-opacity duration-300">
        <div className="mb-2 flex justify-between items-start">
          <span className={`${getStatusColor(house.status)} text-white px-2 py-1 rounded text-xs font-medium`}>
            {getStatusText(house.status)}
          </span>
          {house.images && house.images.length > 1 && (
            <span className="bg-gray-600/80 text-white px-2 py-1 rounded text-xs">
              +{house.images.length - 1} nuotr.
            </span>
          )}
        </div>
        <h3 className="text-responsive-lg sm:text-responsive-xl font-semibold text-white mb-1">{house.title}</h3>
        <p className="text-responsive-sm text-gray-300 mb-2">{house.address}</p>
        <div className="flex justify-between items-center">
          <span className="text-responsive-base sm:text-responsive-lg font-bold text-white">{formatPrice(house.price)}</span>
          <div className="text-responsive-xs sm:text-responsive-sm text-gray-300">
            {house.area && `${house.area} ${house.houseType === 'sklypas' ? 'a' : 'm²'}`}
            {house.rooms && ` • ${house.rooms} k.`}
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = ({ registerSection, scrollToSection }) => {
  const { t } = useSiteContent();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fetchAttempted, setFetchAttempted] = useState(false);
  // Touch handling for swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const handleHouseClick = (house) => {
    setSelectedHouse(house);
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHouse(null);
    setCurrentImageIndex(0);
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedHouse?.images?.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === selectedHouse.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedHouse?.images?.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedHouse.images.length - 1 : prev - 1
      );
    }
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  const modalOpen = showModal || showImageModal;

  // Lock page scroll while a modal is open (main is the scroll container, not body)
  useEffect(() => {
    if (!modalOpen) return;

    const main = document.querySelector('main.main-scroll');
    const scrollTop = main?.scrollTop ?? 0;

    if (main) {
      main.style.overflow = 'hidden';
    }
    const prevBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      if (main) {
        main.style.overflow = '';
        main.scrollTop = scrollTop;
      }
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [modalOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        if (showImageModal) {
          handleCloseImageModal();
        } else if (showModal) {
          handleCloseModal();
        }
        return;
      }

      if (showImageModal && selectedHouse?.images?.length > 1) {
        if (e.key === 'ArrowLeft') {
          const newIndex =
            currentImageIndex === 0 ? selectedHouse.images.length - 1 : currentImageIndex - 1;
          setCurrentImageIndex(newIndex);
          setSelectedImage(selectedHouse.images[newIndex]);
        } else if (e.key === 'ArrowRight') {
          const newIndex =
            currentImageIndex === selectedHouse.images.length - 1 ? 0 : currentImageIndex + 1;
          setCurrentImageIndex(newIndex);
          setSelectedImage(selectedHouse.images[newIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [modalOpen, showImageModal, showModal, currentImageIndex, selectedHouse]);

  const fetchHouses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/houses`);
      const data = await response.json();

      if (data.success) {
        setHouses(data.data);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
      setFetchAttempted(true);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('lt-LT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'parduodamas': return 'bg-green-600';
      case 'rezervuotas': return 'bg-orange-600';
      case 'parduotas': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'parduodamas': return 'Parduodamas';
      case 'rezervuotas': return 'Rezervuotas';
      case 'parduotas': return 'Parduotas';
      default: return status;
    }
  };

  const getHouseTypeText = (type) => {
    switch (type) {
      case 'namas': return 'Namas';
      case 'butas': return 'Butas';
      case 'sklypas': return 'Sklypas';
      case 'vila': return 'Vila';
      case 'kotedžas': return 'Kotedžas';
      case 'dupleksas': return 'Dupleksas';
      case 'kita': return 'Kita';
      default: return type;
    }
  };

  return (
    <section 
      id="portfolio" 
      ref={(el) => registerSection('portfolio', el)}
      className="page-section section-reveal min-h-screen w-full flex items-start bg-[#f4f7f6] pb-12 sm:pb-16 lg:pb-20"
    >
      <div className="section-container w-full mobile-padding px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-responsive-3xl sm:text-responsive-4xl font-bold mb-3 sm:mb-4 animate-fade-in-up text-[#1a3335]">
            {t('portfolio.title', 'Parduodami Projektai')}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-blue-400 mx-auto mb-4 sm:mb-6 lg:mb-8 animate-fade-in-up"></div>
          <p className="text-responsive-base sm:text-responsive-lg text-[#3d5a5c] max-w-2xl mx-auto animate-fade-in-up leading-relaxed">
            {t('portfolio.subtitle', '')}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32 sm:h-48 lg:h-64">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-b-2 border-[#325b5d]"></div>
          </div>
        ) : houses.length > 0 ? (
          <div className="responsive-grid-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mobile-gap-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {houses.map((house, index) => (
              <HouseCard
                key={house.id || index}
                house={house}
                index={index}
                delay={index * 0.2}
                onClick={() => handleHouseClick(house)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <h3 className="text-responsive-xl sm:text-responsive-2xl font-semibold text-gray-600 mb-3 sm:mb-4">{t('portfolio.emptyTitle', '')}</h3>
            <p className="text-responsive-base text-gray-500">{t('portfolio.emptyText', '')}</p>
          </div>
        )}
      </div>

      {showModal &&
        selectedHouse &&
        createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overscroll-none"
          onClick={handleCloseModal}
          onWheel={(e) => e.preventDefault()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
        >
          <div
            className="modal-container bg-white rounded-2xl max-w-[67.2rem] w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 flex justify-between items-start gap-4 px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100 bg-[#f8faf9]">
              <div className="min-w-0 pr-2">
                <h3 id="portfolio-modal-title" className="text-lg sm:text-2xl font-bold text-[#1a3335] truncate">{selectedHouse.title}</h3>
                {selectedHouse.address && (
                  <p className="text-sm sm:text-base text-gray-500 mt-0.5">{selectedHouse.address}</p>
                )}
              </div>
              <button
                onClick={handleCloseModal}
                className="flex-shrink-0 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Uždaryti"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              {selectedHouse.images && selectedHouse.images.length > 0 ? (
                <div className="bg-gray-900">
                  <div
                    className="relative w-full aspect-[16/10] sm:aspect-video"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <img
                      src={`${API_URL}${selectedHouse.images[currentImageIndex]?.imageUrl}`}
                      alt={selectedHouse.images[currentImageIndex]?.caption || selectedHouse.title}
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => handleImageClick(selectedHouse.images[currentImageIndex], currentImageIndex)}
                      onError={(e) => { e.target.src = PLACEHOLDER; }}
                    />
                    {selectedHouse.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                        >
                          →
                        </button>
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2.5 py-1 rounded-full text-xs">
                          {currentImageIndex + 1} / {selectedHouse.images.length}
                        </div>
                      </>
                    )}
                  </div>
                  {selectedHouse.images.length > 1 && (
                    <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-gray-900/95">
                      {selectedHouse.images.map((image, index) => (
                        <button
                          key={image.id || index}
                          type="button"
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                            index === currentImageIndex ? 'ring-2 ring-blue-400 opacity-100' : 'opacity-60 hover:opacity-90'
                          }`}
                        >
                          <img
                            src={`${API_URL}${image.imageUrl}`}
                            alt=""
                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Nuotraukų nėra</p>
                </div>
              )}

              <div className="px-5 sm:px-6 py-5 sm:py-6 space-y-5">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-[#1a3335]">{formatPrice(selectedHouse.price)}</p>
                    <span className={`inline-block mt-2 ${getStatusColor(selectedHouse.status)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                      {getStatusText(selectedHouse.status)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Tipas: </span>
                    {getHouseTypeText(selectedHouse.houseType)}
                  </div>
                </div>

                {selectedHouse.description && (
                  <div className="rounded-xl bg-[#f4f7f6] border border-[#325b5d]/10 p-4 sm:p-5">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-[#325b5d] mb-2">Aprašymas</h4>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedHouse.description}
                    </p>
                  </div>
                )}

                <div className={`grid gap-3 ${selectedHouse.houseType === 'sklypas' ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
                  {selectedHouse.area && (
                    <div className="bg-white border border-gray-100 p-3 rounded-lg text-center shadow-sm">
                      <h5 className="text-xs text-gray-500 mb-1">Plotas</h5>
                      <p className="font-semibold text-[#1a3335]">
                        {selectedHouse.area} {selectedHouse.houseType === 'sklypas' ? 'a' : 'm²'}
                      </p>
                    </div>
                  )}
                  {selectedHouse.houseType !== 'sklypas' && selectedHouse.rooms && (
                    <div className="bg-white border border-gray-100 p-3 rounded-lg text-center shadow-sm">
                      <h5 className="text-xs text-gray-500 mb-1">Kambariai</h5>
                      <p className="font-semibold text-[#1a3335]">{selectedHouse.rooms}</p>
                    </div>
                  )}
                  {selectedHouse.houseType !== 'sklypas' && selectedHouse.bedrooms && (
                    <div className="bg-white border border-gray-100 p-3 rounded-lg text-center shadow-sm">
                      <h5 className="text-xs text-gray-500 mb-1">Miegamieji</h5>
                      <p className="font-semibold text-[#1a3335]">{selectedHouse.bedrooms}</p>
                    </div>
                  )}
                  {selectedHouse.houseType !== 'sklypas' && selectedHouse.bathrooms && (
                    <div className="bg-white border border-gray-100 p-3 rounded-lg text-center shadow-sm">
                      <h5 className="text-xs text-gray-500 mb-1">Vonios</h5>
                      <p className="font-semibold text-[#1a3335]">{selectedHouse.bathrooms}</p>
                    </div>
                  )}
                </div>

                {(selectedHouse.yearBuilt || (selectedHouse.floor && selectedHouse.houseType !== 'sklypas')) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {selectedHouse.yearBuilt && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Statybos metai</span>
                        <span className="font-medium">{selectedHouse.yearBuilt}</span>
                      </div>
                    )}
                    {selectedHouse.floor && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Aukštas</span>
                        <span className="font-medium">
                          {selectedHouse.floor}
                          {selectedHouse.totalFloors && ` / ${selectedHouse.totalFloors}`}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 px-5 sm:px-6 py-4 border-t border-gray-100 bg-white flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  handleCloseModal();
                  scrollToSection('contact');
                }}
                className="flex-1 btn-brand py-3 px-6 rounded-lg font-medium text-sm"
              >
                Susidomėjau
              </button>
              <button
                type="button"
                onClick={() => {
                  handleCloseModal();
                  scrollToSection('contact');
                }}
                className="flex-1 btn-brand-outline py-3 px-6 rounded-lg font-medium text-sm"
              >
                Susisiekti
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Full Screen Image Modal */}
      {showImageModal &&
        selectedImage &&
        createPortal(
        <div
          className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center mobile-padding p-2 sm:p-4 overscroll-none"
          onClick={handleCloseImageModal}
          onWheel={(e) => e.preventDefault()}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={handleCloseImageModal}
              className="absolute top-2 sm:top-6 right-2 sm:right-6 text-white text-2xl sm:text-4xl font-bold z-10 hover:text-gray-300 bg-black/50 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
              aria-label="Uždaryti nuotrauką"
            >
              ×
            </button>
            
            <img
              src={`${API_URL}${selectedImage.imageUrl}`}
              alt={selectedImage.caption || 'Namo nuotrauka'}
              className="max-w-full max-h-full object-contain cursor-default"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => { e.target.src = PLACEHOLDER; }}
            />
            
            {/* Navigation arrows for full screen */}
            {selectedHouse?.images && selectedHouse.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                    const newIndex = currentImageIndex === 0 ? selectedHouse.images.length - 1 : currentImageIndex - 1;
                    setSelectedImage(selectedHouse.images[newIndex]);
                  }}
                  className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-2 sm:p-3 rounded-full hover:bg-black/90 transition-all text-lg sm:text-2xl"
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                    const newIndex = currentImageIndex === selectedHouse.images.length - 1 ? 0 : currentImageIndex + 1;
                    setSelectedImage(selectedHouse.images[newIndex]);
                  }}
                  className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-2 sm:p-3 rounded-full hover:bg-black/90 transition-all text-lg sm:text-2xl"
                >
                  →
                </button>
              </>
            )}
            
            {/* Image info overlay */}
            {selectedImage.caption && (
              <div className="absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg max-w-md text-center">
                <p className="text-responsive-xs sm:text-responsive-sm">{selectedImage.caption}</p>
              </div>
            )}
            
            {/* Image counter */}
            {selectedHouse?.images && selectedHouse.images.length > 1 && (
              <div className="absolute top-2 sm:top-6 left-2 sm:left-6 bg-black/70 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-responsive-xs sm:text-responsive-sm">
                {currentImageIndex + 1} / {selectedHouse.images.length}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default PortfolioSection;