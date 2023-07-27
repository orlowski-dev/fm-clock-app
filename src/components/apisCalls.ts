
export const getDataFromOpenAI = async () => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Give me a programming quote.' }]
      })
    }).then((res) => res.json())

    if (response.error) {
      console.log(`Error code: ${response.error.code}`)

      return null
    }

    return await response.choices[0]
  } catch (err) {
    console.log(err);

    return null
  }
}

/** @returns Promise<string[content, author] | null> */
export const getQuote = async (): Promise<string[] | null> => {
  const response = await getDataFromOpenAI().then(res => res)
  if (!response) return null

  const msg = response.message.content.replace('- ', '').split("\"")
  return [msg[1], msg[2].trimStart().trimEnd()]
}

export interface IGeoLocation {
  location?: {
    city: string,
    country: string,
    lat: number,
    lng: number,
  }
  abbreviation?: string
}

export const getGeoLocation = async () => {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_GEO_API_KEY}`
  const response = await fetch(url).then(res => res)

  return await response.json()
}

export const getTimezoneInfo = async (lat: number, lng: number) => {
  try {
    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${import.meta.env.VITE_TIMEZONE_DB}&format=json&by=position&lat=${lat}&lng=${lng}`
    const response = await fetch(url).then(res => res)

    return await response.json()
  } catch (error) {
    console.log(error);

    return null
  }
}