import axios from 'axios';

const CONTACT_API_URL = 'https://html008.pythonanywhere.com/api/v1/contact/';

/**
 * Отправка формы обратной связи на бэкенд
 * @param {Object} contactData - Объекты формы: { full_name, phone, message }
 */
export const sendContactForm = async (contactData) => {
  try {
    const response = await axios.post(CONTACT_API_URL, contactData, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Ошибка при отправке обратной связи:', error);
    return { 
      data: null, 
      error: error.response?.data?.detail || 'Не удалось отправить сообщение' 
    };
  }
};