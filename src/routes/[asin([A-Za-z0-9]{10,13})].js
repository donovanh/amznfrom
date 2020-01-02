import { amazinUrl } from '../helpers/amazin-url'
import fetch from 'node-fetch'

export async function get(req, res) {
  const ip = req.headers['x-forwarded-for']
  const key = process.env.GEO_KEY
  console.log('KEY: ', key)
  const APIUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${key}&ip=${ip}`
  let iso_code

  if (ip) {
    const result = await fetch(APIUrl)
    const geoInfo = await result.json()
    iso_code = geoInfo.country_code2 ? geoInfo.country_code2 : null
  }

  const { asin } = req.params
  const { tag } = req.query

  const url = amazinUrl(iso_code, asin, tag)
  res.redirect(301, url)

}