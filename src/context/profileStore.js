let profile = {
  businessName: "",
  contactPerson: "",
  mobile: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  gstNumber: "",
};

const listeners = new Set();

export const getProfile = () => {
  return profile;
};

export const updateProfile = (data) => {
  profile = {
    ...profile,
    ...data,
  };

  listeners.forEach((listener) => listener(profile));
};

export const subscribeToProfile = (listener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};