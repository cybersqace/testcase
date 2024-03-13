const FACT_API_URL = 'https://catfact.ninja/fact';

export const getFact = async () => {
  try {
    const response = await fetch(FACT_API_URL)
    const data = await response.json()
    return data;
  }
  catch (error) {
    console.log(error);
  }
}
