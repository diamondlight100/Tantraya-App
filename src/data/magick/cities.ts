import type { City } from "@/lib/planetary-hours";

// A curated list. Peru cities lead the list since that's the school's
// home base and the sensible fallback; the rest give reasonable global coverage so most
// visitors find something close. Coordinates are city-center approximations, timezone is
// the IANA zone (DST, where it applies, is handled automatically by Intl/the browser).
export const CITIES: City[] = [
  { id: "cusco", name: "Cusco", country: "Peru", lat: -13.532, lon: -71.9675, timeZone: "America/Lima" },
  { id: "lima", name: "Lima", country: "Peru", lat: -12.0464, lon: -77.0428, timeZone: "America/Lima" },
  { id: "pisac", name: "Pisac", country: "Peru", lat: -13.4194, lon: -71.8508, timeZone: "America/Lima" },
  { id: "arequipa", name: "Arequipa", country: "Peru", lat: -16.409, lon: -71.5375, timeZone: "America/Lima" },
  { id: "iquitos", name: "Iquitos", country: "Peru", lat: -3.7437, lon: -73.2516, timeZone: "America/Lima" },

  { id: "bogota", name: "Bogotá", country: "Colombia", lat: 4.711, lon: -74.0721, timeZone: "America/Bogota" },
  { id: "quito", name: "Quito", country: "Ecuador", lat: -0.1807, lon: -78.4678, timeZone: "America/Guayaquil" },
  { id: "santiago", name: "Santiago", country: "Chile", lat: -33.4489, lon: -70.6693, timeZone: "America/Santiago" },
  { id: "buenos-aires", name: "Buenos Aires", country: "Argentina", lat: -34.6037, lon: -58.3816, timeZone: "America/Argentina/Buenos_Aires" },
  { id: "sao-paulo", name: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333, timeZone: "America/Sao_Paulo" },
  { id: "mexico-city", name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332, timeZone: "America/Mexico_City" },

  { id: "new-york", name: "New York", country: "USA", lat: 40.7128, lon: -74.006, timeZone: "America/New_York" },
  { id: "chicago", name: "Chicago", country: "USA", lat: 41.8781, lon: -87.6298, timeZone: "America/Chicago" },
  { id: "denver", name: "Denver", country: "USA", lat: 39.7392, lon: -104.9903, timeZone: "America/Denver" },
  { id: "los-angeles", name: "Los Angeles", country: "USA", lat: 34.0522, lon: -118.2437, timeZone: "America/Los_Angeles" },
  { id: "toronto", name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832, timeZone: "America/Toronto" },

  { id: "london", name: "London", country: "UK", lat: 51.5072, lon: -0.1276, timeZone: "Europe/London" },
  { id: "lisbon", name: "Lisbon", country: "Portugal", lat: 38.7223, lon: -9.1393, timeZone: "Europe/Lisbon" },
  { id: "madrid", name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038, timeZone: "Europe/Madrid" },
  { id: "paris", name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, timeZone: "Europe/Paris" },
  { id: "berlin", name: "Berlin", country: "Germany", lat: 52.52, lon: 13.405, timeZone: "Europe/Berlin" },
  { id: "rome", name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964, timeZone: "Europe/Rome" },
  { id: "athens", name: "Athens", country: "Greece", lat: 37.9838, lon: 23.7275, timeZone: "Europe/Athens" },
  { id: "cairo", name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357, timeZone: "Africa/Cairo" },
  { id: "istanbul", name: "Istanbul", country: "Turkey", lat: 41.0082, lon: 28.9784, timeZone: "Europe/Istanbul" },
  { id: "moscow", name: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173, timeZone: "Europe/Moscow" },

  { id: "cape-town", name: "Cape Town", country: "South Africa", lat: -33.9249, lon: 18.4241, timeZone: "Africa/Johannesburg" },
  { id: "nairobi", name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219, timeZone: "Africa/Nairobi" },

  { id: "dubai", name: "Dubai", country: "UAE", lat: 25.2048, lon: 55.2708, timeZone: "Asia/Dubai" },
  { id: "delhi", name: "New Delhi", country: "India", lat: 28.6139, lon: 77.209, timeZone: "Asia/Kolkata" },
  { id: "kathmandu", name: "Kathmandu", country: "Nepal", lat: 27.7172, lon: 85.324, timeZone: "Asia/Kathmandu" },
  { id: "bangkok", name: "Bangkok", country: "Thailand", lat: 13.7563, lon: 100.5018, timeZone: "Asia/Bangkok" },
  { id: "singapore", name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198, timeZone: "Asia/Singapore" },
  { id: "hong-kong", name: "Hong Kong", country: "China", lat: 22.3193, lon: 114.1694, timeZone: "Asia/Hong_Kong" },
  { id: "tokyo", name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, timeZone: "Asia/Tokyo" },
  { id: "bali", name: "Ubud, Bali", country: "Indonesia", lat: -8.5069, lon: 115.2625, timeZone: "Asia/Makassar" },

  { id: "sydney", name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, timeZone: "Australia/Sydney" },
  { id: "auckland", name: "Auckland", country: "New Zealand", lat: -36.8485, lon: 174.7633, timeZone: "Pacific/Auckland" },
];

export const DEFAULT_CITY_ID = "cusco";
