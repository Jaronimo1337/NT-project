import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SiteCopyEditor from './SiteCopyEditor';
import {
  LISTING_CATEGORIES,
  getCategoryConfig,
  getCategoryForHouseType
} from '../../constants/listingCategories';
import { API_URL } from '../../config/api';

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
  const [allHouses, setAllHouses] = useState([]);
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
  const [activeTab, setActiveTab] = useState('houses');
  const [listingCategory, setListingCategory] = useState('namai');
  const [editingImages, setEditingImages] = useState([]);
  const [reorderSaving, setReorderSaving] = useState(false);

  const categoryConfig = getCategoryConfig(listingCategory);

  const houses = useMemo(() => {
    const types = categoryConfig.types;
    return allHouses.filter((h) => types.includes(h.houseType));
  }, [allHouses, categoryConfig.types]);

  const upsertHouseInList = useCallback((house) => {
    if (!house?.id) return;
    setAllHouses((prev) => {
      const index = prev.findIndex((h) => h.id === house.id);
      if (index === -1) return [house, ...prev];
      const next = [...prev];
      next[index] = house;
      return next;
    });
  }, []);

  const houseTypeLabels = {
    namas: 'Namas',
    butas: 'Butas',
    sklypas: 'Sklypas',
    vila: 'Vila',
    kotedžas: 'Kotedžas',
    dupleksas: 'Dupleksas',
    kita: 'Kita'
  };

  const houseTypes = categoryConfig.types.map((value) => ({
    value,
    label: houseTypeLabels[value] || value
  }));

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

  const fetchHouses = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        return;
      }

      const response = await axios.get(`${API_URL}/api/houses/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data?.success) {
        setAllHouses(response.data.data || []);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        onLogout();
      } else if (error.response?.status === 429) {
        showToast('Per daug užklausų. Palaukite akimirką ir bandykite dar kartą.', 'error');
      }
    } finally {
      setInitialLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    setInitialLoading(true);
    fetchHouses();
  }, [fetchHouses]);

  const switchListingCategory = (categoryId) => {
    if (categoryId === listingCategory) return;
    setListingCategory(categoryId);
    if (isEditing) {
      resetForm(categoryId);
    } else {
      setFormData((prev) => ({
        ...prev,
        houseType: getCategoryConfig(categoryId).defaultType
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = (categoryId = listingCategory) => {
    const config = getCategoryConfig(categoryId);
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
      houseType: config.defaultType,
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
    setEditingImages([]);
    
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleEdit = (house) => {
    const category = getCategoryForHouseType(house.houseType);
    setListingCategory(category);

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
    const sortedImages = [...(house.images || [])].sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    );
    setEditingImages(sortedImages);
    
    // Clear file input when editing
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const cancelEdit = () => {
    resetForm();
  };

  const moveImage = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= editingImages.length) return;
    setEditingImages((prev) => {
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  };

  const saveImageOrder = async () => {
    if (!editingHouse?.id || editingImages.length === 0) return;
    setReorderSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(
        `${API_URL}/api/houses/${editingHouse.id}/images/reorder`,
        { imageIds: editingImages.map((img) => img.id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.success) {
        showToast('Nuotraukų tvarka išsaugota!', 'success');
        const updated = response.data.data;
        setEditingHouse(updated);
        setEditingImages(updated.images || []);
        upsertHouseInList(updated);
      }
    } catch (error) {
      showToast('Klaida keičiant nuotraukų tvarką', 'error');
    } finally {
      setReorderSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const formDataToSend = new FormData();

      const houseFields = [
        'title',
        'address',
        'price',
        'area',
        'rooms',
        'bedrooms',
        'bathrooms',
        'floor',
        'totalFloors',
        'yearBuilt',
        'houseType',
        'status',
        'description',
        'sortOrder'
      ];

      houseFields.forEach((key) => {
        const value = formData[key];
        if (value !== '' && value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });
      formDataToSend.set('houseType', formData.houseType || categoryConfig.defaultType);
      
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
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new house
        response = await axios.post(`${API_URL}/api/houses`, formDataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      if (response.data && response.data.success) {
        const savedLabel = categoryConfig.label.slice(0, -1).toLowerCase();
        showToast(
          isEditing
            ? `${categoryConfig.label.slice(0, -1)} sėkmingai atnaujintas!`
            : `${savedLabel.charAt(0).toUpperCase() + savedLabel.slice(1)} sėkmingai pridėtas!`,
          'success'
        );
        upsertHouseInList(response.data.data);
        resetForm();
      } else {
        showToast('Klaida: ' + (response.data?.message || 'Nežinoma klaida'), 'error');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        onLogout();
      } else {
        const serverMsg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data?.details?.[0]?.message;
        showToast(
          serverMsg || (isEditing ? 'Klaida atnaujinant' : 'Klaida išsaugant'),
          'error'
        );
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
        setAllHouses((prev) => prev.filter((h) => h.id !== id));
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
            <h1 className="text-2xl font-bold text-gray-900">Administravimas</h1>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setActiveTab('houses')}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    activeTab === 'houses' ? 'bg-white shadow text-teal-800 font-medium' : 'text-gray-600'
                  }`}
                >
                  Projektai
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('copy')}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    activeTab === 'copy' ? 'bg-white shadow text-teal-800 font-medium' : 'text-gray-600'
                  }`}
                >
                  Tekstai
                </button>
              </div>
              <Link
                to="/"
                className="inline-flex items-center border border-[#325b5d]/30 text-[#325b5d] px-4 py-2 rounded hover:bg-[#f0f5f3] transition-colors text-sm font-medium"
              >
                Į svetainę
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
              >
                Atsijungti
              </button>
            </div>
          </div>
          <div className="flex sm:hidden gap-2 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('houses')}
              className={`flex-1 py-2 text-sm rounded-md ${activeTab === 'houses' ? 'bg-teal-700 text-white' : 'bg-gray-100'}`}
            >
              Projektai
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('copy')}
              className={`flex-1 py-2 text-sm rounded-md ${activeTab === 'copy' ? 'bg-teal-700 text-white' : 'bg-gray-100'}`}
            >
              Tekstai
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'copy' ? (
          <SiteCopyEditor showToast={showToast} />
        ) : (
        <>
        <div className="mb-6 flex flex-wrap gap-2">
          {LISTING_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => switchListingCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                listingCategory === cat.id
                  ? 'bg-teal-700 text-white shadow'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-teal-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {isEditing ? categoryConfig.editTitle : categoryConfig.formTitle}
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

                <div className={`grid grid-cols-1 gap-4 ${listingCategory === 'sklypai' ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
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
                    <label className="block text-sm font-medium text-gray-700">
                      {listingCategory === 'sklypai' ? 'Plotas (a)' : 'Plotas (m²)'}
                    </label>
                    <input
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {listingCategory !== 'sklypai' && (
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
                  )}
                </div>

                {listingCategory !== 'sklypai' && (
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
                )}

                {listingCategory === 'butai' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Aukštas</label>
                      <input
                        type="number"
                        name="floor"
                        value={formData.floor}
                        onChange={handleInputChange}
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Aukštų skaičius pastate</label>
                      <input
                        type="number"
                        name="totalFloors"
                        value={formData.totalFloors}
                        onChange={handleInputChange}
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {listingCategory === 'namai' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tipas</label>
                      <select
                        name="houseType"
                        value={formData.houseType}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {houseTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
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
                    <label className="text-sm font-medium text-gray-700">Rekomenduojamas objektas</label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nuotraukos {isEditing ? '(Pridėti naujas)' : '(Kelios)'}
                  </label>
                  {isEditing && editingImages.length > 0 && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-gray-700">Nuotraukų tvarka (pirmoji = pagrindinė)</p>
                        <button
                          type="button"
                          onClick={saveImageOrder}
                          disabled={reorderSaving}
                          className="text-xs bg-teal-700 text-white px-2 py-1 rounded hover:bg-teal-800 disabled:opacity-50"
                        >
                          {reorderSaving ? 'Saugoma...' : 'Išsaugoti tvarką'}
                        </button>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {editingImages.map((img, idx) => (
                          <div key={img.id} className="flex items-center gap-2 bg-white p-2 rounded border">
                            <span className="text-xs text-gray-400 w-5">{idx + 1}.</span>
                            <img
                              className="h-10 w-10 object-cover rounded flex-shrink-0"
                              src={`${API_URL}${img.imageUrl}`}
                              alt=""
                            />
                            <span className="text-xs text-gray-500 flex-1 truncate">
                              {img.caption || `Nuotrauka ${idx + 1}`}
                            </span>
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => moveImage(idx, -1)}
                                disabled={idx === 0}
                                className="px-2 py-1 text-xs border rounded disabled:opacity-30 hover:bg-gray-50"
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                onClick={() => moveImage(idx, 1)}
                                disabled={idx === editingImages.length - 1}
                                className="px-2 py-1 text-xs border rounded disabled:opacity-30 hover:bg-gray-50"
                              >
                                ↓
                              </button>
                            </div>
                          </div>
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
                  {loading
                    ? (isEditing ? 'Atnaujinama...' : 'Išsaugoma...')
                    : (isEditing
                      ? `Atnaujinti ${categoryConfig.label.slice(0, -1).toLowerCase()}`
                      : `Pridėti ${categoryConfig.label.slice(0, -1).toLowerCase()}`)}
                </button>
              </form>
            </div>
          </div>

          {/* Houses List */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {categoryConfig.listTitle} ({houses.length})
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
                  <p className="text-gray-500 text-center py-8">{categoryConfig.listTitle} tuščias</p>
                )}
              </div>
            </div>
          </div>
        </div>

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
                <div className="text-sm text-gray-500">Viso objektų</div>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;