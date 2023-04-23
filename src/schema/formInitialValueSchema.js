const initialValuesSignup = {
  name: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const initialValuesExpenditure = {
  name: "",
  price: 0,
  description: "",
};

const initialValuesTask = {
  name: "",
  description: "",
  isCompleted: false,
  level: "normal",
};

const initialValuesPeopleMemo = {
  name: "",
  organization: "",
  place: "",
  description: "",
};

module.exports = {
  initialValuesSignup,
  initialValuesLogin,
  initialValuesExpenditure,
  initialValuesTask,
  initialValuesPeopleMemo,
};
