import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const HouseCard = ({ house, delay, index, onClick }) => {
  const firstImage = house.images && house.images.length > 0 ? house.images[0] : null;
  const getImageUrl = (imageUrl) => {
  if (!imageUrl) return `https://picsum.photos/600/400?random=${index}`;
  
  if (imageUrl.startsWith('http')) return imageUrl;
  
  if (imageUrl.startsWith('/')) return `${API_URL}${imageUrl}`;
  
  return `${API_URL}/uploads/houses/${imageUrl}`;
};

const imageSrc = firstImage ? getImageUrl(firstImage.imageUrl) : `https://picsum.photos/600/400?random=${index}`;

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
        onError={(e) => {
          e.target.src = `https://picsum.photos/600/400?random=${index}`;
        }}
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
            {house.area && `${house.area} m²`}
            {house.rooms && ` • ${house.rooms} k.`}
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = ({ registerSection, scrollToSection }) => {
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showImageModal) {
        switch (e.key) {
          case 'Escape':
            handleCloseImageModal();
            break;
          case 'ArrowLeft':
            if (selectedHouse?.images && selectedHouse.images.length > 1) {
              const newIndex = currentImageIndex === 0 ? selectedHouse.images.length - 1 : currentImageIndex - 1;
              setCurrentImageIndex(newIndex);
              setSelectedImage(selectedHouse.images[newIndex]);
            }
            break;
          case 'ArrowRight':
            if (selectedHouse?.images && selectedHouse.images.length > 1) {
              const newIndex = currentImageIndex === selectedHouse.images.length - 1 ? 0 : currentImageIndex + 1;
              setCurrentImageIndex(newIndex);
              setSelectedImage(selectedHouse.images[newIndex]);
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showImageModal, currentImageIndex, selectedHouse]);

  const fetchHouses = async () => {
    if (fetchAttempted) return;
    
    try {
      setFetchAttempted(true);
      console.log('🔄 Fetching houses from:', `${API_URL}/api/houses`);
      
      const response = await fetch(`${API_URL}/api/houses`);
      const data = await response.json();
      
      console.log('📊 API Response:', data);
      
      if (data.success) {
        setHouses(data.data);
        console.log('✅ Houses loaded:', data.data.length);
      } else {
        console.error('❌ API returned error:', data.message);
      }
    } catch (error) {
      console.error('❌ Error fetching houses:', error);
      setFetchAttempted(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
    if (registerSection) {
      registerSection('portfolio', 'Portfelis');
    }
  }, [registerSection]);

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
      className="h-screen mobile-min-h-screen mobile-h-auto w-full snap-start flex items-center bg-gray-50 overflow-y-auto lg:overflow-hidden"
    >
      <div className="section-container w-full mobile-padding px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-responsive-3xl sm:text-responsive-4xl font-bold mb-3 sm:mb-4 animate-fade-in-up">
            Parduodami <span className="text-blue-600">Namai</span>
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6 lg:mb-8 animate-fade-in-up"></div>
          <p className="text-responsive-base sm:text-responsive-lg text-gray-700 max-w-2xl mx-auto animate-fade-in-up leading-relaxed">
            Šiuo metu parduodami objektai - 2025 metai
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32 sm:h-48 lg:h-64">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-b-2 border-blue-600"></div>
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
            <h3 className="text-responsive-xl sm:text-responsive-2xl font-semibold text-gray-600 mb-3 sm:mb-4">Namų kol kas nėra</h3>
            <p className="text-responsive-base text-gray-500">Greitai čia atsiras puikių namų pasiūlymų!</p>
          </div>
        )}
      </div>

      {/* House Detail Modal */}
      {showModal && selectedHouse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 mobile-padding p-2 sm:p-4">
          <div className="modal-container bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mobile-p-4 p-4 sm:p-6 border-b">
              <div>
                <h3 className="text-responsive-lg sm:text-responsive-2xl font-bold text-gray-800">{selectedHouse.title}</h3>
                <p className="text-responsive-sm sm:text-responsive-base text-gray-600">{selectedHouse.address}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl font-bold p-1"
                aria-label="Uždaryti"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-content mobile-p-4 p-4 sm:p-6">
              {/* Image Carousel */}
              {selectedHouse.images && selectedHouse.images.length > 0 ? (
                <div className="mb-4 sm:mb-6">
                  <div 
                    className="modal-image relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <img
                      src={`${API_URL}${selectedHouse.images[currentImageIndex]?.imageUrl}`}
                      alt={selectedHouse.images[currentImageIndex]?.caption || selectedHouse.title}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => handleImageClick(selectedHouse.images[currentImageIndex], currentImageIndex)}
                    />
                    
                    {/* Navigation Arrows */}
                    {selectedHouse.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/70 transition-all text-sm sm:text-base"
                        >
                          ←
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/70 transition-all text-sm sm:text-base"
                        >
                          →
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {selectedHouse.images.length > 1 && (
                      <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm">
                        {currentImageIndex + 1} / {selectedHouse.images.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Navigation */}
                  {selectedHouse.images.length > 1 && (
                    <div className="flex space-x-2 mt-3 sm:mt-4 overflow-x-auto pb-2">
                      {selectedHouse.images.map((image, index) => (
                        <img
                          key={index}
                          src={`${API_URL}${image.imageUrl}`}
                          alt={image.caption || `Nuotrauka ${index + 1}`}
                          className={`w-12 h-12 sm:w-16 sm:h-16 object-cover rounded cursor-pointer flex-shrink-0 ${
                            index === currentImageIndex 
                              ? 'ring-2 ring-blue-500' 
                              : 'opacity-70 hover:opacity-100'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  )}

                  {/* Image Caption */}
                  {selectedHouse.images[currentImageIndex]?.caption && (
                    <p className="text-responsive-sm text-gray-600 mt-2 text-center">
                      {selectedHouse.images[currentImageIndex].caption}
                    </p>
                  )}
                </div>
              ) : (
                <div className="mb-4 sm:mb-6 w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-responsive-sm">Nuotraukų nėra</p>
                </div>
              )}

              {/* House Details */}
              <div className="space-y-4 sm:space-y-6">
                {/* Price and Status */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h4 className="text-responsive-2xl sm:text-responsive-3xl font-bold text-gray-800 mb-2">
                      {formatPrice(selectedHouse.price)}
                    </h4>
                    <span className={`${getStatusColor(selectedHouse.status)} text-white px-3 py-1 rounded-full text-responsive-sm font-medium`}>
                      {getStatusText(selectedHouse.status)}
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <h4 className="text-responsive-base sm:text-responsive-lg font-semibold text-gray-700 mb-1">Tipas</h4>
                    <p className="text-responsive-sm sm:text-responsive-base text-gray-600">{getHouseTypeText(selectedHouse.houseType)}</p>
                  </div>
                </div>

                {/* Property Details Grid */}
                <div className="responsive-grid-2 grid grid-cols-2 lg:grid-cols-4 mobile-gap-4 gap-3 sm:gap-4">
                  {selectedHouse.area && (
                    <div className="bg-gray-50 mobile-p-4 p-3 sm:p-4 rounded-lg text-center">
                      <h5 className="font-medium text-gray-700 mb-1 text-responsive-sm">Plotas</h5>
                      <p className="text-responsive-base sm:text-responsive-lg font-semibold text-gray-800">{selectedHouse.area} m²</p>
                    </div>
                  )}
                  {selectedHouse.rooms && (
                    <div className="bg-gray-50 mobile-p-4 p-3 sm:p-4 rounded-lg text-center">
                      <h5 className="font-medium text-gray-700 mb-1 text-responsive-sm">Kambariai</h5>
                      <p className="text-responsive-base sm:text-responsive-lg font-semibold text-gray-800">{selectedHouse.rooms}</p>
                    </div>
                  )}
                  {selectedHouse.bedrooms && (
                    <div className="bg-gray-50 mobile-p-4 p-3 sm:p-4 rounded-lg text-center">
                      <h5 className="font-medium text-gray-700 mb-1 text-responsive-sm">Miegamieji</h5>
                      <p className="text-responsive-base sm:text-responsive-lg font-semibold text-gray-800">{selectedHouse.bedrooms}</p>
                    </div>
                  )}
                  {selectedHouse.bathrooms && (
                    <div className="bg-gray-50 mobile-p-4 p-3 sm:p-4 rounded-lg text-center">
                      <h5 className="font-medium text-gray-700 mb-1 text-responsive-sm">Vonios</h5>
                      <p className="text-responsive-base sm:text-responsive-lg font-semibold text-gray-800">{selectedHouse.bathrooms}</p>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="responsive-grid-2 grid grid-cols-1 sm:grid-cols-2 mobile-gap-4 gap-3 sm:gap-4">
                  {selectedHouse.yearBuilt && (
                    <div className="bg-gray-50 mobile-p-4 p-3 sm:p-4 rounded-lg">
                      <h5 className="font-medium text-gray-700 mb-1 text-responsive-sm">Statybos metai</h5>
                      <p className="text-responsive-sm sm:text-responsive-base text-gray-600">{selectedHouse.yearBuilt}</p>
                    </div>
                  )}
                  {selectedHouse.floor && (
                    <div className="bg-gray-50 mobile-p-4 p-3 sm:p-4 rounded-lg">
                      <h5 className="font-medium text-gray-700 mb-1 text-responsive-sm">Aukštas</h5>
                      <p className="text-responsive-sm sm:text-responsive-base text-gray-600">
                        {selectedHouse.floor}
                        {selectedHouse.totalFloors && ` iš ${selectedHouse.totalFloors}`}
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                {selectedHouse.description && (
                  <div>
                    <h4 className="text-responsive-base sm:text-responsive-lg font-semibold text-gray-700 mb-2">Aprašymas</h4>
                    <p className="text-responsive-sm sm:text-responsive-base text-gray-600 leading-relaxed">{selectedHouse.description}</p>
                  </div>
                )}

                {/* Call to Action */}
                <div className="mt-4 sm:mt-6 pt-4 border-t">
                  <div className="flex flex-col sm:flex-row mobile-gap-4 gap-3">
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="flex-1 bg-blue-600 text-white py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-responsive-sm sm:text-responsive-base"
                    >
                      Susidomėjau
                    </button>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium text-responsive-sm sm:text-responsive-base"
                    >
                      Susisiekti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Modal */}
      {showImageModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-60 mobile-padding p-2 sm:p-4"
          onClick={handleCloseImageModal}
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
              onError={(e) => {
                console.error('Failed to load image:', selectedImage.imageUrl);
                e.target.src = `https://picsum.photos/800/600?random=${currentImageIndex}`;
              }}
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
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;