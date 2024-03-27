const root = "http://localhost:4000/api/";

export const RegisterUser = async (user) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(`${root}register`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const LoginUser = async (credenciales) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciales),
  };
  try {
    const response = await fetch(`${root}auth/login`, options);

    const data = await response.json();
    console.log(data);
    if (!data.succes) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const getServices = async () => {
  const response = await fetch(`${root}auth/services`);
  const data = await response.json();
  console.log(data);
  return data.data;
};

export const getProfile = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${root}users/profile`, options);

    const data = await response.json();

    if (!data.succes) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (token, data) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${root}users/profile`, options);

    const data = await response.json();

    if (!data.succes) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};
