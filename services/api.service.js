import * as https from 'https'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'
import axios from 'axios'

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
            return '🏁';
        case '02':
            return '🏃';
		case '03':
            return '🏄';
		case '04':
            return '🏆';
		case '05':
            return '🏅';
		case '06':
            return '🏇';
		case '07':
            return '🏉';
		case '08':
            return '🏊';
		case '09':
            return '🏋';
		case '10':
            return '🏍';
		
	}
}

const getWeather = async () => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)
	const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)

	if (!token) {
		throw new Error('token is empty, use -t [API_KEY]')
	}
	if (!city) {
		throw new Error('city is empty, use -s [CITY]')
	}

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid:token,
			lang:'ru',
			units:'metric'
		}
	}) 
	//console.log(data)
	return data
		
		/*
		const url = new URL('https://api.openweathermap.org/data/2.5/weather')
		url.searchParams.append('q', city)
		url.searchParams.append('appid', token)
		url.searchParams.append('lang', 'ru')
		url.searchParams.append('units', 'metric')

		https.get(url, (response) => {
			let res = ''
			response.on('data', (chunk) => {
                res += chunk
			})

			response.on('end', () => {
				console.log(res)
			})
		})
*/
}

export  {getWeather, getIcon}
