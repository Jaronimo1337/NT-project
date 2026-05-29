import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { API_URL } from '../../config/api';

const GROUP_LABELS = {
  nav: 'Navigacija',
  hero: 'Pagrindinis (Hero)',
  about: 'Apie mane',
  services: 'Paslaugos',
  portfolio: 'Projektai',
  experience: 'Patirtis',
  contact: 'Kontaktai',
  footer: 'Poraštė',
  general: 'Kita'
};

const SiteCopyEditor = ({ showToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeGroup, setActiveGroup] = useState('nav');

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/site-content/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data?.success) {
        setItems(response.data.data || []);
      }
    } catch (error) {
      showToast?.('Klaida kraunant tekstus', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const groups = [...new Set(items.map((item) => item.group || item.content_group || 'general'))];

  const handleChange = (key, value) => {
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, value } : item))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const payload = items.map((item) => ({
        key: item.key,
        value: item.value,
        group: item.group || item.content_group,
        label: item.label
      }));
      const response = await axios.put(
        `${API_URL}/api/site-content`,
        { items: payload },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.success) {
        showToast?.('Tekstai išsaugoti!', 'success');
      }
    } catch (error) {
      showToast?.('Klaida išsaugant tekstus', 'error');
    } finally {
      setSaving(false);
    }
  };

  const filteredItems = items.filter(
    (item) => (item.group || item.content_group || 'general') === activeGroup
  );

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-700" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Svetainės tekstai</h3>
            <p className="text-sm text-gray-500 mt-1">
              Redaguokite visus matomus tekstus svetainėje. Pakeitimai matomi iškart po išsaugojimo (perkraukite svetainę).
            </p>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 disabled:opacity-50 text-sm font-medium"
          >
            {saving ? 'Saugoma...' : 'Išsaugoti visus'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[480px]">
        <div className="lg:w-48 border-b lg:border-b-0 lg:border-r border-gray-100 p-3 flex lg:flex-col gap-1 overflow-x-auto">
          {groups.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => setActiveGroup(group)}
              className={`px-3 py-2 rounded-md text-sm whitespace-nowrap text-left transition-colors ${
                activeGroup === group
                  ? 'bg-teal-50 text-teal-800 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {GROUP_LABELS[group] || group}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 sm:p-6 space-y-4 max-h-[600px] overflow-y-auto">
          {filteredItems.map((item) => (
            <div key={item.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {item.label || item.key}
              </label>
              {item.value?.length > 120 ? (
                <textarea
                  rows={3}
                  value={item.value || ''}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={item.value || ''}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              )}
              <p className="text-xs text-gray-400 mt-0.5 font-mono">{item.key}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiteCopyEditor;
