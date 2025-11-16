import fetchAPI from "@/utils/api/fetchAPI";

/**
 * Mendaftarkan user baru (Langkah 1: Email + Password)
 * Memanggil: POST /api/users/register
 */
export const registerUser = async (email, password) => {
  try {
    const response = await fetchAPI.post("/users/register", {
      email,
      password,
    });
    const { token, user } = response.data.data;
    if (token) {
      localStorage.setItem("accessToken", token);
    }
    return { success: true, user };
  } catch (error) {
    console.error("Register error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Pendaftaran gagal");
  }
};

/**
 * Melengkapi profil user (Langkah 2: Alur Email)
 * Memanggil: PUT /api/users/complete-profile
 */
export const completeProfile = async (profileData) => {
  try {
    const response = await fetchAPI.put("/users/complete-profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Complete profile error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Gagal melengkapi profil");
  }
};

/**
 * Login user (Email + Password)
 * Memanggil: POST /api/users/login
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetchAPI.post("/users/login", {
      email,
      password,
    });
    const { token, user } = response.data.data;
    if (token) {
      localStorage.setItem("accessToken", token);
    }
    return { success: true, user };
  } catch (error) {
    if (error.response?.data?.code === "PROFILE_INCOMPLETE") {
      const { token } = error.response.data.data;
      if (token) {
        localStorage.setItem("accessToken", token);
      }
      throw new Error("PROFILE_INCOMPLETE");
    }
    console.error("Login error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Email atau password salah");
  }
};

/**
 * Melengkapi profil user (Langkah 2: Alur Google BARU)
 * Memanggil: POST /api/auth/google/registration
 */
export const completeGoogleRegistration = async (profileData) => {
  // profileData = { tempToken, name, phoneNumber, address, childCode }
  try {
    // Kita panggil 'fetch' biasa di sini karena ini endpoint publik
    // yang tidak menggunakan 'Bearer' token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/registration`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registrasi Google gagal");
    }

    // Jika sukses, backend akan mengirim token login penuh
    const { token, user } = data.data;
    if (token) {
      localStorage.setItem("accessToken", token);
    }
    return { success: true, user };
  } catch (error) {
    console.error("Google registration error:", error.message);
    throw error;
  }
};
