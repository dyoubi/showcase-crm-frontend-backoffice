export const getDateValue = (value: Date | string | undefined = '') => {
    const defaultDate = new Date();
  
    if (!value) {
      return undefined;
    }
  
    try {
      const date = new Date(value);
      if (date.toString() === 'Invalid Date') {
        return undefined;
      }
  
      return date;
    } catch (ex) {
      return defaultDate;
    }
  };
  