'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { RiSearchLine, RiMapPin2Fill, RiLoader4Line } from 'react-icons/ri';

interface PlaceSuggestion {
  placeId: string;
  mainText: string;
  secondaryText: string;
  types: string[];
}

interface PlaceSearchInputProps {
  onSelect: (place: {
    placeId: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    primaryType: string;
    primaryTypeDisplayName: string;
  }) => void;
}

export default function PlaceSearchInput({ onSelect }: PlaceSearchInputProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSelectingDetails, setIsSelectingDetails] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sessionTokenRef = useRef(crypto.randomUUID());

  const fetchSuggestions = useCallback(async (input: string) => {
    if (input.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/audit/search-place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input,
          sessionToken: sessionTokenRef.current,
        }),
      });
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        setSuggestions(data.results);
        setIsOpen(true);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    } catch (err) {
      console.error('Autocomplete error:', err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
      setSelectedIndex(-1);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(query), 300);
    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  async function handleSelect(place: PlaceSuggestion) {
    setQuery(place.mainText);
    setIsOpen(false);
    setIsSelectingDetails(true);

    try {
      const res = await fetch(`/api/audit/place-details?place_id=${place.placeId}`);
      const details = await res.json();

      if (details.error) {
        throw new Error(details.error);
      }

      sessionTokenRef.current = crypto.randomUUID();

      onSelect({
        placeId: details.placeId,
        name: details.name,
        address: details.address,
        lat: details.lat,
        lng: details.lng,
        primaryType: details.primaryType,
        primaryTypeDisplayName: details.primaryTypeDisplayName,
      });
    } catch (err) {
      console.error('Place details error:', err);
      onSelect({
        placeId: place.placeId,
        name: place.mainText,
        address: place.secondaryText,
        lat: 48.8566,
        lng: 2.3522,
        primaryType: place.types[0] ?? '',
        primaryTypeDisplayName: place.types[0] ?? '',
      });
    } finally {
      setIsSelectingDetails(false);
    }
  }

  return (
    <div className="relative w-full">
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center group-focus-within:bg-accent-light transition-colors">
          <RiSearchLine className="w-[18px] h-[18px] text-warm-600" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder="Entrez le nom de votre établissement..."
          className="w-full pl-[4.5rem] pr-14 py-5 text-lg rounded-full border border-warm-200 bg-white shadow-card focus:border-warm-400 focus:ring-4 focus:ring-accent/10 outline-none transition-all duration-200 placeholder:text-warm-400"
          autoComplete="off"
          disabled={isSelectingDetails}
        />
        {(isLoading || isSelectingDetails) && (
          <RiLoader4Line className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400 animate-spin" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-elevated border border-warm-100 overflow-hidden z-50"
        >
          {suggestions.map((place, i) => (
            <button
              key={place.placeId}
              onClick={() => handleSelect(place)}
              className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-150 ${
                i === selectedIndex ? 'bg-accent-light' : 'hover:bg-warm-50'
              } ${i > 0 ? 'border-t border-warm-100/60' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center shrink-0">
                <RiMapPin2Fill className="w-[18px] h-[18px] text-warm-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-warm-900 truncate">{place.mainText}</p>
                <p className="text-sm text-warm-500 truncate">{place.secondaryText}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
