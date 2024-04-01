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
    if (!data.succes) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const GetServices = async () => {
  const response = await fetch(`${root}auth/services`);
  const data = await response.json();
  return data.data;
};

export const GetUsers = async () => {
  const token = JSON.parse(localStorage.getItem("passport")).token;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${root}users`, options);
  const data = await response.json();
  console.log(data, "respuesta");
  return data;
};

export const GetProfile = async (token) => {
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
    console.log(token);
    return data;
  } catch (error) {
    return error;
  }
};

export const UpdateProfile = async (token, data) => {
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

    if (!data.success) {
      throw new Error("data.message");
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const DeleteUser = async (userId) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
  };
  try {
    const response = await fetch(`${root}users/${userId}`, options);
    console.log(response, "response");
    const data = await response.json();
    return data;
  } catch (error) {}
};

export const CreateAppointment = async (token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${root}appointments`, options);

    const data = await response.json();
    if (!data.succes) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const GetAppointments = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${root}appointments`, options);
    const data = await response.json();

    if (!data.success) {
      throw new Error("data.message");
    }
    return data;
  } catch (error) {}
};
