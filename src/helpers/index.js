export const getAuth = () => {
  return {
    transportOptions: {
      polling: {
        extraHeaders: {
          'authorization': `Bearer ${localStorage.getItem('chatToken') || ''}`
        }
      }
    }
  }
}