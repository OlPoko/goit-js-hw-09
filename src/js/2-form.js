const form = document.querySelector('.feedback-form');
const storageKey = 'form-data';


let formData = {
  email: '',
  message: '',
};

const fillFormFields = () => {
  try {
    const savedData = localStorage.getItem(storageKey);

    if (!savedData) return;

    const formDataLs = JSON.parse(savedData);

    for (const key in formDataLs) {
      if (form.elements[key]) {
        form.elements[key].value = formDataLs[key];
        formData[key] = formDataLs[key];
      }
    }

    console.log('Заповнено з локального сховища:', formDataLs);
  } catch (err) {
    console.error('Помилка читання зі сховища:', err);
  }
};


const onFormFieldChange = event => {
  const { name, value } = event.target;
  formData[name] = value.trim(); 
  localStorage.setItem(storageKey, JSON.stringify(formData)); 

  console.log('Оновлено об\'єкт:', formData);
};

const onFormSubmit = event => {
  event.preventDefault(); 

  const { email, message } = formData;

 
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted Data:', formData);


  localStorage.removeItem(storageKey);
  formData = { email: '', message: '' };
  form.reset(); 
};

form.addEventListener('input', onFormFieldChange);
form.addEventListener('submit', onFormSubmit);

fillFormFields();
