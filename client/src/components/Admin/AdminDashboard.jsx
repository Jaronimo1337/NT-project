import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Toast component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 
                  type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{message}</span>
        <button 
          onClick={onClose}
          className="ml-3 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }) => {
  const [houses, setHouses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    price: '',
    area: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    floor: '',
    totalFloors: '',
    yearBuilt: '',
    houseType: 'namas',
    status: 'parduodamas',
    description: '',
    features: '',
    location: '',
    sortOrder: '0',
    isFeatured: false
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [editingHouse, setEditingHouse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const houseTypes = [
    { value: 'namas', label: 'Namas' },
    { value: 'butas', label: 'Butas' },
    { value: 'vila', label: 'Vila' },
    { value: 'kotedžas', label: 'Kotedžas' },
    { value: 'dupleksas', label: 'Dupleksas' },
    { value: 'kita', label: 'Kita' }
  ];

  const statusOptions = [
    { value: 'parduodamas', label: 'Parduodamas', color: 'bg-green-100 text-green-800' },
    { value: 'rezervuotas', label: 'Rezervuotas', color: 'bg-orange-100 text-orange-800' },
    { value: 'parduotas', label: 'Parduotas', color: 'bg-red-100 text-red-800' }
  ];

  // Show toast notification
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Close toast
  const closeToast = () => {
    setToast(null);
  };

  // Setup axios defaults ONCE
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Simple fetch houses function - NO LOOPS, NO CALLBACKS
  const fetchHouses = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        return;
      }

      const response = await axios.get(`${API_URL}/api/houses`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.success) {
        setHouses(response.data.data || []);
      }
    } catch (error) {
      // SILENT ERROR - no console spam
      if (error.response?.status === 401) {
        onLogout();
      }
    } finally {
      setInitialLoading(false);
    }
  };

  // Load houses ONLY ONCE when component mounts
  useEffect(() => {
    fetchHouses();
  }, []); // Empty dependency array = run only once

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      address: '',
      price: '',
      area: '',
      rooms: '',
      bedrooms: '',
      bathrooms: '',
      floor: '',
      totalFloors: '',
      yearBuilt: '',
      houseType: 'namas',
      status: 'parduodamas',
      description: '',
      features: '',
      location: '',
      sortOrder: '0',
      isFeatured: false
    });
    setImageFiles([]);
    setEditingHouse(null);
    setIsEditing(false);
    
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleEdit = (house) => {
    setFormData({
      title: house.title || '',
      address: house.address || '',
      price: house.price || '',
      area: house.area || '',
      rooms: house.rooms || '',
      bedrooms: house.bedrooms || '',
      bathrooms: house.bathrooms || '',
      floor: house.floor || '',
      totalFloors: house.totalFloors || '',
      yearBuilt: house.yearBuilt || '',
      houseType: house.houseType || 'namas',
      status: house.status || 'parduodamas',
      description: house.description || '',
      features: house.features || '',
      location: house.location || '',
      sortOrder: house.sortOrder || '0',
      isFeatured: house.isFeatured || false
    });
    setEditingHouse(house);
    setIsEditing(true);
    setImageFiles([]);
    
    // Clear file input when editing
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const cancelEdit = () => {
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (value !== '' && value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });
      
      // Add images if any
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach(file => {
          formDataToSend.append('images', file);
        });
      }

      let response;
      if (isEditing && editingHouse) {
        // Update existing house
        response = await axios.put(`${API_URL}/api/houses/${editingHouse.id}`, formDataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new house
        response = await axios.post(`${API_URL}/api/houses`, formDataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      if (response.data && response.data.success) {
        showToast(isEditing ? 'Namas sėkmingai atnaujintas!' : 'Namas sėkmingai pridėtas!', 'success');
        resetForm();
        // Manually refresh houses list
        fetchHouses();
      } else {
        showToast('Klaida: ' + (response.data?.message || 'Nežinoma klaida'), 'error');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        onLogout();
      } else {
        showToast(isEditing ? 'Klaida atnaujinant namą' : 'Klaida išsaugant namą', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ar tikrai norite ištrinti šį namą?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.delete(`${API_URL}/api/houses/${id}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.success) {
        showToast('Namas ištrintas!', 'success');
        // Manually refresh houses list
        fetchHouses();
      } else {
        showToast('Klaida trinant namą', 'error');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        onLogout();
      } else {
        showToast('Klaida trinant namą', 'error');
      }
    }
  };

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return 'N/A';
    return new Intl.NumberFormat('lt-LT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStatusStyle = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.label : status;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toast notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast} 
        />
      )}

      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Namų Administravimas</h1>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Atsijungti
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add House Form */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {isEditing ? 'Redaguoti Namą' : 'Pridėti Naują Namą'}
              </h3>
              
              {isEditing && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">
                      Redaguojate: <strong>{editingHouse?.title}</strong>
                    </span>
                    <button
                      onClick={cancelEdit}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Atšaukti
                    </button>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pavadinimas *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Adresas</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Kaina (EUR) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="1"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Plotas (m²)</label>
                    <input
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Kambariai</label>
                    <input
                      type="number"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Miegamieji</label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Vonios</label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Statybos metai</label>
                    <input
                      type="number"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleInputChange}
                      min="1800"
                      max={new Date().getFullYear()}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipas</label>
                    <select
                      name="houseType"
                      value={formData.houseType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {houseTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Statusas</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Miestas/Rajonas</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Aprašymas</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rodymo tvarka</label>
                    <input
                      type="number"
                      name="sortOrder"
                      value={formData.sortOrder}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">Rekomenduojamas namas</label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nuotraukos {isEditing ? '(Pridėti naujas)' : '(Kelios)'}
                  </label>
                  {isEditing && editingHouse?.images?.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-600 mb-2">Dabartinės nuotraukos:</p>
                      <div className="flex flex-wrap gap-2">
                        {editingHouse.images.map((img, idx) => (
                          <img
                            key={idx}
                            className="h-12 w-12 object-cover rounded border"
                            src={`${API_URL}${img.imageUrl}`}
                            alt={`Nuotrauka ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {imageFiles.length > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      {isEditing ? 'Bus pridėta' : 'Pasirinkta'} {imageFiles.length} nuotrauka(-ų)
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (isEditing ? 'Atnaujinama...' : 'Išsaugoma...') : (isEditing ? 'Atnaujinti Namą' : 'Pridėti Namą')}
                </button>
              </form>
            </div>
          </div>

          {/* Houses List */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Namų Sąrašas ({houses.length})
                </h3>
                <button
                  onClick={fetchHouses}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200"
                >
                  Atnaujinti
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {initialLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : houses.length > 0 ? (
                  houses.map((house) => (
                    <div key={house.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {house.images && house.images.length > 0 ? (
                              <div className="flex -space-x-2 mr-3">
                                {house.images.slice(0, 3).map((img, idx) => (
                                  <img
                                    key={idx}
                                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                                    src={`${API_URL}${img.imageUrl}`}
                                    alt={`${house.title} ${idx + 1}`}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                ))}
                                {house.images.length > 3 && (
                                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                                    +{house.images.length - 3}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">📷</span>
                              </div>
                            )}
                            
                            <div>
                              <h4 className="font-medium text-gray-900">{house.title}</h4>
                              <p className="text-sm text-gray-500">{house.address || 'Adresas nenurodytas'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="font-semibold text-blue-600">
                              {formatPrice(house.price)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(house.status)}`}>
                              {getStatusLabel(house.status)}
                            </span>
                            {house.area && (
                              <span>{house.area} m²</span>
                            )}
                            {house.rooms && (
                              <span>{house.rooms} k.</span>
                            )}
                            {house.isFeatured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                ⭐ Rekomenduojamas
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(house)}
                            className="text-blue-600 hover:text-blue-900 text-sm hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                          >
                            Redaguoti
                          </button>
                          <button
                            onClick={() => handleDelete(house.id)}
                            className="text-red-600 hover:text-red-900 text-sm hover:bg-red-50 px-2 py-1 rounded transition-colors"
                          >
                            Ištrinti
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">Namų sąrašas tuščias</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Statistika</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {houses.filter(h => h.status === 'parduodamas').length}
                </div>
                <div className="text-sm text-gray-500">Parduodami</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {houses.filter(h => h.status === 'rezervuotas').length}
                </div>
                <div className="text-sm text-gray-500">Rezervuoti</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {houses.filter(h => h.status === 'parduotas').length}
                </div>
                <div className="text-sm text-gray-500">Parduoti</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {houses.length}
                </div>
                <div className="text-sm text-gray-500">Viso namų</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;