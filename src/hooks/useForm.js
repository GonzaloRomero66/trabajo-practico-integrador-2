import { useState } from "react";

const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  };
  setForm((prevForm) => {
    (prevForm, [name], value);
  });
  const handleReset = () => {
    setForm(initialValues);
  };
};
