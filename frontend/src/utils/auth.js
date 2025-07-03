// Authentication utility functions

export const validateGoogleToken = async (accessToken) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.ok) {
      const userInfo = await response.json()
      return { valid: true, userInfo }
    } else {
      return { valid: false, userInfo: null }
    }
  } catch (error) {
    console.error('Token validation error:', error)
    return { valid: false, userInfo: null }
  }
}

export const getStoredUser = () => {
  try {
    const userInfo = localStorage.getItem('userInfo')
    return userInfo ? JSON.parse(userInfo) : null
  } catch (error) {
    console.error('Error parsing stored user:', error)
    return null
  }
}

export const setStoredUser = (userInfo) => {
  try {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  } catch (error) {
    console.error('Error storing user info:', error)
  }
}

export const clearStoredUser = () => {
  localStorage.removeItem('googleAccessToken')
  localStorage.removeItem('userInfo')
}

export const isTokenExpired = (token) => {
  // Google OAuth tokens typically expire in 1 hour
  // For now, we'll rely on the API response to determine validity
  // In a production app, you might want to store token expiry time
  return false
} 