import ajax from "../utils/ajax";
const Weather = {
	//常规天气数据
	/*
	通过常规天气数据API，可以获取到3-10天天气预报、实况天气、逐小时天气预报以及生活指数。
	https://free-api.heweather.net/s6/weather/{weather-type}?{parameters}

	weather-type 值	描述	授权
	now	实况天气	商业/免费
	forecast	3-10天预报	商业/免费
	hourly	逐小时预报	商业/免费
	lifestyle	生活指数	商业/免费


	 */

	getCgWeather(type, data) {
		data.key = 'c55f3ff2b8764e029a009a0c81fb974a';
		return ajax('https://free-api.heweather.net/s6/weather/'+ type, data, 'get');
	}
}

export default Weather;