export function getFormattedDate(date: Date) {
	const month = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	/*let hours = date.getHours();
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12;
	const minutes = date.getMinutes();
	const minuteString = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minuteString + ampm;*/

	/* e.g. "13 Nov 2016 11:00pm" */
	return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}

export default getFormattedDate;