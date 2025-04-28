import { useLocation } from "wouter";

export function useProductSearch() {
  const [location] = useLocation();
  
  // Parse the URL search params
  const getSearchParams = () => {
    if (typeof window === 'undefined') return new URLSearchParams();
    
    return new URLSearchParams(window.location.search);
  };
  
  // Get current search params
  const searchParams = getSearchParams();
  
  // Helper function to update search params and navigate
  const updateSearch = (
    params: { [key: string]: string | null },
    navigate = true
  ) => {
    const newParams = getSearchParams();
    
    // Update or remove parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    
    // Generate new search string
    const newSearch = newParams.toString();
    const newPath = location.split('?')[0] + (newSearch ? `?${newSearch}` : '');
    
    // Update URL without navigation if requested
    if (navigate) {
      window.history.pushState({}, '', newPath);
    }
    
    return newParams;
  };
  
  // Get a specific parameter value
  const getParam = (key: string) => {
    return searchParams.get(key);
  };
  
  // Set a specific parameter value
  const setParam = (key: string, value: string | null) => {
    return updateSearch({ [key]: value });
  };
  
  // Toggle boolean parameter (used for filters that can be on/off)
  const toggleParam = (key: string) => {
    const currentValue = searchParams.get(key);
    return updateSearch({ [key]: currentValue ? null : 'true' });
  };
  
  // Clear all search parameters
  const clearParams = () => {
    const baseUrl = location.split('?')[0];
    window.history.pushState({}, '', baseUrl);
    return new URLSearchParams();
  };
  
  return [
    searchParams,
    {
      getParam,
      setParam,
      toggleParam,
      updateSearch,
      clearParams
    }
  ] as const;
}
