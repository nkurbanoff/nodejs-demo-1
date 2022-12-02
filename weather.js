#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather, getIcon } from './services/api.service.js'
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'


const saveCity = async (city) => {
	if (!city.length){
		printError('City is empty')
		return
	}

	try{
		await saveKeyValue(TOKEN_DICTIONARY.city, city)
		printSuccess('City saved successfully')
	}catch(e) {
		printError(e.message)
	}
}

const saveToken = async (token) => {
	if (!token.length){
		printError('Token is empty')
		return
	}

	try{
		await saveKeyValue(TOKEN_DICTIONARY.token, token)
		printSuccess('Token saved successfully')
	}catch(e) {
		printError(e.message)
	}
}

const getForecast = async () => {
	try{
		const weather = await getWeather()
		printWeather(weather, getIcon(weather.weather[0].icon))
	} catch(e) {
		if (e?.response?.status == 404) {
			printError('City wrong')
		} else if (e?.response?.status == 401) {
			printError('Token wrong')
		} else {
			printError(e.message)
		}
	}
}

const initCLI = () => {
	const args = getArgs(process.argv)

	if (args.h) {
		// get helpers 
		return printHelp()
	}
	if (args.s) {
		// save city 
		return saveCity(args.s)
	}
	if (args.t) {
		// save token
		return saveToken(args.t)
	}
	return getForecast();
}

initCLI();
