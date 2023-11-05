
function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString(
    "en-EN", 
    { year: 'numeric',
      month: 'long',  
      day: 'numeric'
    }
  )
}

export { formatDate}