"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiFileText,
  FiBell,
  FiCalendar,
  FiMessageSquare,
  FiCloudRain,
  FiSun,
  FiCloud,
  FiCloudSnow,
  FiUsers,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import fetchAPI from "@/utils/api/fetchAPI";

export default function UserOverview() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPermissions: 0,
    pendingPermissions: 0,
    approvedPermissions: 0,
    totalChildren: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/");
          return;
        }

        // Fetch user profile
        const userRes = await fetchAPI.get("/users/profile");
        const userData = userRes.data.data.user;
        setUser({
          name: userData.name || userData.username || "",
          email: userData.email || "",
        });

        // Fetch user statistics
        const [permissionsRes, childrenRes] = await Promise.all([
          fetchAPI.get("/permission-letters").catch(() => ({ data: { data: [] } })),
          fetchAPI.get("/children").catch(() => ({ data: { data: [] } })),
        ]);

        const permissions = permissionsRes.data.data || [];
        const children = childrenRes.data.data || [];

        setStats({
          totalPermissions: permissions.length,
          pendingPermissions: permissions.filter((p) => p.status === "pending").length,
          approvedPermissions: permissions.filter((p) => p.status === "approved").length,
          totalChildren: children.length,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response?.status === 401) {
          localStorage.removeItem("accessToken");
          router.push("/login");
        }
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

        if (!API_KEY) {
          setWeatherLoading(false);
          return;
        }

        // Get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              // Fetch current weather data
              const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=id`,
              );

              if (weatherResponse.ok) {
                const weatherData = await weatherResponse.json();
                setWeather(weatherData);
              }

              // Fetch forecast data (5 day / 3 hour forecast)
              const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=id`,
              );

              if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                setForecast(forecastData);
              }

              setWeatherLoading(false);
            },
            (error) => {
              fetchWeatherByCity("Yogyakarta");
            },
          );
        } else {
          fetchWeatherByCity("Yogyakarta");
        }
      } catch (error) {
        setWeatherLoading(false);
      }
    };

    const fetchWeatherByCity = async (city) => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

        // Fetch current weather
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`,
        );

        if (weatherResponse.ok) {
          const weatherData = await weatherResponse.json();
          setWeather(weatherData);
        }

        // Fetch forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=id`,
        );

        if (forecastResponse.ok) {
          const forecastData = await forecastResponse.json();
          setForecast(forecastData);
        }

        setWeatherLoading(false);
      } catch (error) {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case "rain":
      case "drizzle":
      case "thunderstorm":
        return <FiCloudRain className="text-blue-500" size={48} />;
      case "clear":
        return <FiSun className="text-yellow-500" size={48} />;
      case "clouds":
        return <FiCloud className="text-gray-500" size={48} />;
      case "snow":
        return <FiCloudSnow className="text-blue-300" size={48} />;
      default:
        return <FiCloud className="text-gray-500" size={48} />;
    }
  };

  const isRainy = () => {
    if (!weather) return false;
    const weatherMain = weather.weather?.[0]?.main?.toLowerCase();
    return ["rain", "drizzle", "thunderstorm"].includes(weatherMain);
  };

  const willRainTomorrow = () => {
    if (!forecast || !forecast.list) return false;

    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateString = tomorrow.toISOString().split("T")[0];

    // Check if any forecast for tomorrow predicts rain
    const tomorrowForecasts = forecast.list.filter((item) => {
      const forecastDate = item.dt_txt.split(" ")[0];
      return forecastDate === tomorrowDateString;
    });

    return tomorrowForecasts.some((item) => {
      const weatherMain = item.weather?.[0]?.main?.toLowerCase();
      return ["rain", "drizzle", "thunderstorm"].includes(weatherMain);
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="font-adlam-display-regular min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 px-4 pt-28 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Top Grid Layout */}
        <div className="mb-6 grid grid-cols-1 gap-4">
          {/* Welcome Card with Background Image */}
          <div className="md:col-span-2">
            <div
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-yellow-100 p-8 shadow-lg"
              style={{
                backgroundImage: "url('/assets/homepage/welcome.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="relative z-10 rounded-xl border-4 border-dashed border-yellow-500 bg-white/90 p-6 backdrop-blur-sm">
                <h1 className="text-center text-3xl font-bold text-black">
                  Selamat datang, {user.name}!
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Feedback and Permission Buttons */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Feedback Button with Dino Image */}
          <button
            onClick={() => router.push("/feedback")}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 p-6 shadow-md transition-all hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="mb-1 text-lg font-bold text-black">Beri tahu</h3>
                <h3 className="mb-2 text-lg font-bold text-black">keluhanmu!</h3>
                <span className="inline-block rounded-full bg-blue-800 px-4 py-2 text-sm font-semibold text-white">
                  Isi Feedback →
                </span>
              </div>
              <div className="relative h-32 w-32">
                <img
                  src="/assets/homepage/feedback_dino.webp"
                  alt="Feedback Dino"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </button>

          {/* Permission Button with Dino Image */}
          <button
            onClick={() => router.push("/permission")}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 p-6 shadow-md transition-all hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="mb-1 text-lg font-bold text-gray-800">Si kecil tidak</h3>
                <h3 className="mb-2 text-lg font-bold text-gray-800">bisa berangkat?</h3>
                <span className="inline-block rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
                  Ajukan Izin →
                </span>
              </div>
              <div className="relative h-36 w-36">
                <img
                  src="/assets/homepage/permission_dino.webp"
                  alt="Permission Dino"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </button>
        </div>

        {/* Third Row: Announcement */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/announcement")}
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 p-8 text-left shadow-md transition-all hover:shadow-xl"
          >
            <h3 className="mb-2 text-2xl font-bold text-gray-800">Lihat Pengumuman →</h3>
          </button>
        </div>

        {/* Weather Forecast Card */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Weather Info */}
          <div>
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-md">
              {weatherLoading ? (
                <div className="text-center">
                  <p className="text-gray-600">Memuat data cuaca...</p>
                </div>
              ) : weather ? (
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">Cuaca Hari Ini</h3>
                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-gray-800">
                        {Math.round(weather.main?.temp || 0)} °C
                      </p>
                      <p className="text-lg font-semibold text-gray-700 capitalize">
                        {weather.weather?.[0]?.main || ""}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        Daerah Istimewa {weather.name}
                      </p>
                    </div>
                    {/* Weather Icon */}
                    <div className="flex-shrink-0">
                      {getWeatherIcon(weather.weather?.[0]?.main)}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">Weather API</h3>
                  <p className="text-gray-600">Tidak dapat memuat data cuaca</p>
                  <p className="text-sm text-gray-500">
                    API key belum aktif atau koneksi bermasalah
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Weather Image Card */}
          <div className="overflow-hidden rounded-2xl bg-orange-300 p-8 shadow-md">
            {weatherLoading ? (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
                <div className="text-center">
                  <FiCloud className="mx-auto mb-2 text-gray-400" size={48} />
                  <p className="text-sm text-gray-600">Loading...</p>
                </div>
              </div>
            ) : weather ? (
              <div className="flex gap-8">
                <div className="my-auto">
                  {willRainTomorrow() ? (
                    <h3 className="mb-4 text-xl font-bold text-white">
                      Besok diprediksi hujan! Siapkan payung yuk! 🌧️
                    </h3>
                  ) : (
                    <h3 className="mb-4 text-xl font-bold text-white">
                      Perkiraan cuaca besok cerah! ☀️
                    </h3>
                  )}
                </div>
                <img
                  src={
                    isRainy() || willRainTomorrow()
                      ? "/assets/homepage/cuaca_hujan.webp"
                      : "/assets/homepage/cuaca_cerah.webp"
                  }
                  alt="Weather Illustration"
                  className="h-[8.5rem] w-[8.5rem]"
                />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
                <div className="text-center">
                  <FiCloud className="mx-auto mb-2 text-gray-400" size={48} />
                  <p className="text-sm text-gray-600">Data tidak tersedia</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
